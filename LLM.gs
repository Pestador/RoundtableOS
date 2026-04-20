var PERSONA_DEFINITIONS = {
  Kai: {
    key: 'Kai',
    role: 'Visionary',
    goal: 'Open up creative possibility space; identify adjacent opportunities and long-term narrative.',
    backstory:
      'Kai thinks in narrative arcs, platform shifts, and second-order opportunities. They are energised by ambitious concepts.',
    accent: 'primary',
  },
  Nova: {
    key: 'Nova',
    role: 'Strategist',
    goal: 'Define a viable business model, market positioning, and go-to-market angle.',
    backstory:
      'Nova has spent years turning promising sparks into defensible market plays and practical launch sequences.',
    accent: 'secondary',
  },
  Rex: {
    key: 'Rex',
    role: 'Builder',
    goal: 'Assess technical feasibility; specify the smallest viable build and tech requirements.',
    backstory:
      'Rex is a pragmatic technical lead who wants the smallest trustworthy version shipped before the perfect one.',
    accent: 'tertiary',
  },
  Sage: {
    key: 'Sage',
    role: 'Critic',
    goal: 'Identify fatal flaws, market risks, competitive threats, and assumptions that could kill this idea.',
    backstory:
      'Sage has reviewed too many fragile ideas to indulge wishful thinking and looks for what breaks first.',
    accent: 'error',
  },
  Luna: {
    key: 'Luna',
    role: 'User Advocate',
    goal: 'Represent the end user emotional journey, unmet needs, and usability concerns.',
    backstory:
      'Luna obsesses over how the user feels before, during, and after using a product, especially where trust is won or lost.',
    accent: 'primary-container',
  },
  Nia: {
    key: 'Nia',
    role: 'Execution Controller',
    goal: 'Prioritise ruthlessly; define the single next action the user should take within the next 7 days.',
    backstory:
      'Nia turns ambiguity into sequencing and removes anything that distracts from momentum this week.',
    accent: 'outline',
  },
};

var BRAINSTORM_MODES = {
  'Full Roundtable': ['Kai', 'Nova', 'Rex', 'Sage', 'Luna', 'Nia'],
  'Quick Spark': ['Kai', 'Rex'],
  'Challenge Mode': ['Sage', 'Luna'],
  'Strategy Deep-Dive': ['Nova', 'Nia'],
};

var IDEA_CATEGORIES = ['Product', 'Service', 'Research', 'Content', 'Tool', 'Other'];

function normalizeBrainstormMode_(mode) {
  return BRAINSTORM_MODES[mode] ? mode : 'Full Roundtable';
}

function getBrainstormPersonas_(mode) {
  mode = normalizeBrainstormMode_(mode);
  var personaProfiles =
    typeof getStoredPersonaProfiles_ === 'function'
      ? getStoredPersonaProfiles_(PropertiesService.getScriptProperties(), { includeAvatarData: false })
      : {};
  return BRAINSTORM_MODES[mode].map(function (key) {
    var persona = {};
    var definition = PERSONA_DEFINITIONS[key] || { key: key };
    Object.keys(definition).forEach(function (field) {
      persona[field] = definition[field];
    });
    persona.displayName =
      personaProfiles[key] && personaProfiles[key].displayName
        ? personaProfiles[key].displayName
        : definition.key;
    return persona;
  });
}

function draftIdeaFromBrief(brief, options) {
  brief = String(brief || '').trim();
  if (!brief) {
    throw new Error('Share a short idea brief before asking the Roundtable to draft the spark.');
  }

  var llmResult = callLLMWithMetadata_(buildIdeaDraftPrompt_(brief), options || {});
  var parsed = parseIdeaDraftResponse_(llmResult.text, brief);

  return {
    ok: llmResult.ok,
    provider: llmResult.provider,
    model: llmResult.model,
    draft: parsed.draft,
    fallbackUsed: parsed.fallbackUsed || !llmResult.ok,
    message: parsed.fallbackUsed || !llmResult.ok ? 'A fallback draft was generated from your brief.' : 'Idea draft generated.',
    error: llmResult.error || '',
  };
}

function runBrainstormSession(ideaId, mode) {
  var session = createSession(ideaId, mode);
  var personas = getBrainstormPersonas_(session.mode);
  var lastResult = null;

  for (var turnIndex = 0; turnIndex < personas.length; turnIndex += 1) {
    lastResult = runNextBrainstormTurn(session.sessionId, ideaId, session.mode, turnIndex);
  }

  return lastResult || getSessionProgress(session.sessionId);
}

function runNextBrainstormTurn(sessionId, ideaId, mode, turnIndex) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    mode = normalizeBrainstormMode_(mode);
    var personas = getBrainstormPersonas_(mode);
    var progress = getSessionProgress(sessionId);
    if (progress.complete) {
      return progress;
    }

    var completedTurns = (progress.turns || []).filter(function (turn) {
      return turn.Agent !== 'Synthesis';
    }).length;
    turnIndex = Number(turnIndex);
    if (isNaN(turnIndex) || turnIndex !== completedTurns) {
      turnIndex = completedTurns;
    }

    if (turnIndex < 0 || turnIndex >= personas.length) {
      throw new Error('Turn index is out of bounds for mode "' + mode + '".');
    }

    var idea = getIdeaById(ideaId);
    if (!idea) {
      throw new Error('Idea not found for brainstorm: ' + ideaId);
    }

    var persona = personas[turnIndex];
    var personaPrompt = buildPersonaPrompt(persona, idea);
    var llmResult = callLLMWithMetadata_(personaPrompt);
    var content = llmResult.text || buildFallbackTurn_(persona, idea);

    appendSessionTurn_({
      sessionId: sessionId,
      ideaId: idea.ID,
      turn: turnIndex + 1,
      agent: persona.key,
      content: content,
    });

    var complete = turnIndex === personas.length - 1;
    var synthesis = null;
    if (complete) {
      synthesis = synthesizeSession_(sessionId, idea, mode);
      var nextData = {
        LastBrainstormed: new Date(),
        NextAction: synthesis.nextAction,
        Stage: synthesis.suggestedStage || idea.Stage,
      };
      var scoring = computePriorityScore(idea.ID);
      nextData.PriorityScore = scoring.priority;
      updateIdea(idea.ID, nextData);
    }

    var updated = getSessionProgress(sessionId);
    updated.lastTurnResult = {
      agent: persona.key,
      ok: llmResult.ok,
      provider: llmResult.provider,
      model: llmResult.model,
      error: llmResult.error || '',
    };
    if (synthesis) {
      updated.generatedSynthesis = synthesis;
    }
    return updated;
  } finally {
    lock.releaseLock();
  }
}

function synthesizeSession_(sessionId, idea, mode) {
  var progress = getSessionProgress(sessionId);
  var prompt = buildSynthesisPrompt_(idea, mode, progress.turns);
  var llmResult = callLLMWithMetadata_(prompt);
  var parsed = parseSynthesisResponse_(llmResult.text, idea);
  if (!parsed.suggestedStage) {
    parsed.suggestedStage = suggestStageFromScore_(computePriorityBreakdown_(idea).priority, idea.Stage);
  }
  appendSessionTurn_({
    sessionId: sessionId,
    ideaId: idea.ID,
    turn: progress.turns.length + 1,
    agent: 'Synthesis',
    content: serializeSynthesisContent_(parsed),
  });
  return parsed;
}

function buildPersonaPrompt(persona, idea) {
  var personaName = persona.displayName || persona.key;
  var identityLine =
    personaName === persona.key
      ? personaName
      : personaName + ' (internally keyed as ' + persona.key + ')';
  return [
    'You are ' + identityLine + ', a ' + persona.role + ' in the Roundtable OS brainstorming system.',
    'Your goal: ' + persona.goal,
    'Your backstory: ' + persona.backstory,
    '',
    'The idea you are evaluating:',
    '- Name: ' + (idea.Name || ''),
    '- Summary: ' + (idea.Summary || ''),
    '- Problem Solved: ' + (idea.ProblemSolved || ''),
    '- Target Users: ' + (idea.TargetUsers || ''),
    '- Unique Value: ' + (idea.UniqueValue || ''),
    '- Current Stage: ' + (idea.Stage || ''),
    '- Tags: ' + (idea.Tags || ''),
    '',
    'Respond as ' + personaName + ' would. Be specific, opinionated, and actionable. Limit your response to 150–250 words.',
  ].join('\n');
}

function buildIdeaDraftPrompt_(brief) {
  return [
    'You are the Roundtable OS intake assistant.',
    'Transform the raw idea brief below into a structured idea draft.',
    'Return only JSON with these keys: Name, Summary, Category, ProblemSolved, TargetUsers, UniqueValue, Tags, Stage.',
    'Category must be one of: ' + IDEA_CATEGORIES.join(', ') + '.',
    'Stage must be one of: ' + IDEA_STAGES.join(', ') + '. Use Spark unless the brief clearly indicates a later stage.',
    'Tags must be a comma-separated string with 3 to 6 concise tags.',
    'Name should be 3 to 8 words.',
    'Summary should be 2 to 4 sentences and specific.',
    'ProblemSolved, TargetUsers, and UniqueValue should each be concrete and practical.',
    '',
    'Raw brief:',
    brief,
  ].join('\n');
}

function buildSynthesisPrompt_(idea, mode, turns) {
  var transcript = turns
    .map(function (turn) {
      return turn.Agent + ': ' + turn.Content;
    })
    .join('\n\n');

  return [
    'You are the Roundtable OS synthesis engine.',
    'Summarise the brainstorm below into strict JSON.',
    'Return only JSON with the keys: summary, nextAction, suggestedStage, keyInsights.',
    'summary must be 2-4 sentences.',
    'nextAction must be one concrete action for the next 7 days.',
    'suggestedStage must be one of: ' + IDEA_STAGES.join(', ') + '.',
    'keyInsights must be an array of 3 short strings.',
    '',
    'Idea name: ' + (idea.Name || ''),
    'Current stage: ' + (idea.Stage || ''),
    'Mode: ' + mode,
    '',
    transcript,
  ].join('\n');
}

function parseSynthesisResponse_(responseText, idea) {
  var fallback = {
    summary: 'The Roundtable found meaningful opportunity, but the idea needs a tighter next move before momentum fades.',
    nextAction: suggestNextAction(idea.PriorityScore || 0.5, idea.Stage),
    suggestedStage: idea.Stage,
    keyInsights: ['Clarify the user problem', 'Reduce ambiguity in the first build', 'Validate with a focused experiment'],
  };

  if (!responseText) {
    return fallback;
  }

  var cleaned = String(responseText || '')
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  try {
    var parsed = JSON.parse(cleaned);
    parsed.summary = parsed.summary || fallback.summary;
    parsed.nextAction = parsed.nextAction || fallback.nextAction;
    parsed.suggestedStage = IDEA_STAGES.indexOf(parsed.suggestedStage) > -1 ? parsed.suggestedStage : fallback.suggestedStage;
    parsed.keyInsights = Array.isArray(parsed.keyInsights) && parsed.keyInsights.length ? parsed.keyInsights : fallback.keyInsights;
    return parsed;
  } catch (error) {
    Logger.log('Failed to parse synthesis response: ' + error + '\n' + cleaned);
    return {
      summary: cleaned.slice(0, 500) || fallback.summary,
      nextAction: fallback.nextAction,
      suggestedStage: fallback.suggestedStage,
      keyInsights: fallback.keyInsights,
    };
  }
}

function parseIdeaDraftResponse_(responseText, brief) {
  var fallback = buildIdeaDraftFallback_(brief);
  if (!responseText) {
    return {
      draft: fallback,
      fallbackUsed: true,
    };
  }

  var cleaned = stripJsonResponse_(responseText);
  if (!cleaned) {
    return {
      draft: fallback,
      fallbackUsed: true,
    };
  }

  try {
    return {
      draft: sanitizeIdeaDraft_(JSON.parse(cleaned), fallback),
      fallbackUsed: false,
    };
  } catch (error) {
    Logger.log('Failed to parse idea draft response: ' + error + '\n' + cleaned);
    return {
      draft: fallback,
      fallbackUsed: true,
    };
  }
}

function callLLM(prompt) {
  return callLLMWithMetadata_(prompt).text;
}

function callLLMWithMetadata_(prompt, options) {
  var runtime = resolveLLMRuntimeConfig_(options || {});
  var config = getProviderConfig_(runtime.provider);

  if (!runtime.apiKey) {
    return {
      ok: false,
      provider: runtime.provider,
      model: runtime.model,
      text:
        config.label +
        ' is not configured yet. Save a valid API key for the selected provider in Settings before running live brainstorms.',
      error: 'Missing API key',
    };
  }

  try {
    var text = dispatchLLMProviderCall_(runtime.provider, prompt, runtime.apiKey, runtime.model);
    return {
      ok: true,
      provider: runtime.provider,
      model: runtime.model,
      text: text,
      error: '',
    };
  } catch (error) {
    Logger.log('LLM call failed: ' + error);
    return {
      ok: false,
      provider: runtime.provider,
      model: runtime.model,
      text:
        'The upstream language model was unavailable, so the Roundtable recorded a fallback note instead of stopping the session.',
      error: error && error.message ? error.message : String(error),
    };
  }
}

function testLLMConnection(options) {
  var result = callLLMWithMetadata_('Reply with the exact phrase: Roundtable link healthy.', options || {});
  return {
    ok: result.ok,
    provider: result.provider,
    model: result.model,
    message: result.text,
    error: result.error,
  };
}

function resolveLLMRuntimeConfig_(options) {
  var properties = PropertiesService.getScriptProperties();
  var provider = normalizeProviderName_(
    options.activeLlmProvider || options.llmProvider || options.provider || getStoredActiveProvider_(properties)
  );
  var config = getProviderConfig_(provider);
  var model =
    String(
      options[config.modelField] || options.llmModel || options.model || getStoredProviderModel_(properties, provider) || ''
    ).trim() ||
    SETTINGS_DEFAULTS[config.modelField];
  var apiKey = String(
    options[config.keyField] || options.llmApiKey || options.apiKey || getStoredProviderApiKey_(properties, provider) || ''
  ).trim();

  return {
    provider: provider,
    model: model,
    apiKey: apiKey,
  };
}

function dispatchLLMProviderCall_(provider, prompt, apiKey, model) {
  if (provider === 'deepseek') {
    return callDeepSeekAPI_(prompt, apiKey, model);
  }
  if (provider === 'gemini') {
    return callGeminiAPI_(prompt, apiKey, model);
  }
  if (provider === 'openrouter') {
    return callOpenRouterAPI_(prompt, apiKey, model);
  }
  if (provider === 'anthropic') {
    return callAnthropicAPI_(prompt, apiKey, model);
  }
  return callOpenAIAPI_(prompt, apiKey, model);
}

function callDeepSeekAPI_(prompt, apiKey, model) {
  var response = UrlFetchApp.fetch('https://api.deepseek.com/chat/completions', {
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'content-type': 'application/json',
    },
    payload: JSON.stringify({
      model: model || SETTINGS_DEFAULTS.deepSeekModel,
      temperature: 0.8,
      max_tokens: 500,
      messages: [
        {
          role: 'system',
          content: 'You are part of the Roundtable OS idea management system. Be concise, opinionated, and useful.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
    muteHttpExceptions: true,
  });

  var json = JSON.parse(response.getContentText() || '{}');
  if (response.getResponseCode() >= 400) {
    throw new Error(getProviderErrorMessage_(json, 'DeepSeek API returned an error.'));
  }

  var text = extractOpenAIStyleText_(json);
  if (text) {
    return text;
  }

  throw new Error('DeepSeek API returned no text content.');
}

function callGeminiAPI_(prompt, apiKey, model) {
  var endpoint =
    'https://generativelanguage.googleapis.com/v1beta/models/' +
    encodeURIComponent(normalizeGeminiModelName_(model || SETTINGS_DEFAULTS.geminiModel)) +
    ':generateContent?key=' +
    encodeURIComponent(apiKey);
  var response = UrlFetchApp.fetch(endpoint, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 500,
      },
    }),
    muteHttpExceptions: true,
  });

  var json = JSON.parse(response.getContentText() || '{}');
  if (response.getResponseCode() >= 400) {
    throw new Error(getProviderErrorMessage_(json, 'Gemini API returned an error.'));
  }

  var text = extractGeminiText_(json);
  if (text) {
    return text;
  }

  throw new Error('Gemini API returned no text content.');
}

function callOpenRouterAPI_(prompt, apiKey, model) {
  var response = UrlFetchApp.fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'HTTP-Referer': 'https://script.google.com',
      'X-Title': 'Roundtable OS Lightweight',
      'content-type': 'application/json',
    },
    payload: JSON.stringify({
      model: model || SETTINGS_DEFAULTS.openRouterModel,
      temperature: 0.8,
      max_tokens: 500,
      messages: [
        {
          role: 'system',
          content: 'You are part of the Roundtable OS idea management system. Be concise, opinionated, and useful.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
    muteHttpExceptions: true,
  });

  var json = JSON.parse(response.getContentText() || '{}');
  if (response.getResponseCode() >= 400) {
    throw new Error(getProviderErrorMessage_(json, 'OpenRouter API returned an error.'));
  }

  var text = extractOpenAIStyleText_(json);
  if (text) {
    return text;
  }

  throw new Error('OpenRouter API returned no text content.');
}

function callOpenAIAPI_(prompt, apiKey, model) {
  var response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'content-type': 'application/json',
    },
    payload: JSON.stringify({
      model: model || 'gpt-4o',
      temperature: 0.8,
      max_tokens: 500,
      messages: [
        {
          role: 'system',
          content: 'You are part of the Roundtable OS idea management system. Be concise, opinionated, and useful.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
    muteHttpExceptions: true,
  });

  var json = JSON.parse(response.getContentText() || '{}');
  if (response.getResponseCode() >= 400) {
    throw new Error(getProviderErrorMessage_(json, 'OpenAI API returned an error.'));
  }

  var text = extractOpenAIStyleText_(json);
  if (text) {
    return text;
  }

  throw new Error('OpenAI API returned no text content.');
}

function callAnthropicAPI_(prompt, apiKey, model) {
  var response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    payload: JSON.stringify({
      model: model || SETTINGS_DEFAULTS.anthropicModel,
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    }),
    muteHttpExceptions: true,
  });

  var json = JSON.parse(response.getContentText() || '{}');
  if (response.getResponseCode() >= 400) {
    throw new Error(getProviderErrorMessage_(json, 'Anthropic API returned an error.'));
  }

  if (json.content && json.content.length && json.content[0].text) {
    return json.content[0].text;
  }

  throw new Error('Anthropic API returned no text content.');
}

function normalizeGeminiModelName_(model) {
  return String(model || '')
    .trim()
    .replace(/^models\//i, '');
}

function extractGeminiText_(json) {
  if (!json || !json.candidates || !json.candidates.length) {
    return '';
  }
  var parts = (((json.candidates[0] || {}).content || {}).parts || []).map(function (part) {
    return part && part.text ? part.text : '';
  });
  return parts.join('\n').trim();
}

function extractOpenAIStyleText_(json) {
  if (!json || !json.choices || !json.choices.length) {
    return '';
  }
  var content = (((json.choices[0] || {}).message || {}).content || '');
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .map(function (item) {
        if (typeof item === 'string') {
          return item;
        }
        if (item && typeof item.text === 'string') {
          return item.text;
        }
        return '';
      })
      .join('\n')
      .trim();
  }
  return '';
}

function getProviderErrorMessage_(json, fallback) {
  if (json && json.error) {
    if (typeof json.error === 'string') {
      return json.error;
    }
    if (json.error.message) {
      return json.error.message;
    }
  }
  return fallback;
}

function buildFallbackTurn_(persona, idea) {
  var personaName = persona.displayName || persona.key;
  return [
    personaName +
      ' could not reach the configured model, so this fallback note keeps the session moving: revisit "' +
      idea.Name +
      '" by tightening the user problem, naming the riskiest assumption, and defining one concrete test for the next 7 days.',
  ].join(' ');
}

function serializeSynthesisContent_(parsed) {
  return JSON.stringify({
    summary: parsed.summary || '',
    nextAction: parsed.nextAction || '',
    suggestedStage: parsed.suggestedStage || '',
    keyInsights: parsed.keyInsights || [],
  });
}

function sanitizeIdeaDraft_(draft, fallback) {
  draft = draft || {};
  return {
    Name: sanitizeDraftText_(draft.Name, fallback.Name, 96),
    Summary: sanitizeDraftText_(draft.Summary, fallback.Summary, 700),
    Category: IDEA_CATEGORIES.indexOf(String(draft.Category || '').trim()) > -1 ? String(draft.Category).trim() : fallback.Category,
    ProblemSolved: sanitizeDraftText_(draft.ProblemSolved, fallback.ProblemSolved, 700),
    TargetUsers: sanitizeDraftText_(draft.TargetUsers, fallback.TargetUsers, 220),
    UniqueValue: sanitizeDraftText_(draft.UniqueValue, fallback.UniqueValue, 320),
    Tags: normalizeDraftTags_(draft.Tags || fallback.Tags),
    Stage: IDEA_STAGES.indexOf(String(draft.Stage || '').trim()) > -1 ? String(draft.Stage).trim() : fallback.Stage,
  };
}

function buildIdeaDraftFallback_(brief) {
  var normalizedBrief = collapseWhitespace_(brief);
  var category = inferIdeaCategory_(normalizedBrief);
  var shortSummary = normalizedBrief.length > 320 ? normalizedBrief.slice(0, 317) + '...' : normalizedBrief;
  return {
    Name: inferIdeaNameFromBrief_(normalizedBrief),
    Summary: shortSummary,
    Category: category,
    ProblemSolved: 'This idea appears to address the core friction described in the brief: ' + shortSummary,
    TargetUsers: inferTargetUsersFromBrief_(normalizedBrief),
    UniqueValue: 'The concept stands out by combining the briefed workflow with a clearer, more guided experience for the intended user.',
    Tags: inferDraftTags_(normalizedBrief, category),
    Stage: 'Spark',
  };
}

function stripJsonResponse_(responseText) {
  var cleaned = String(responseText || '')
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();
  if (!cleaned) {
    return '';
  }
  var objectMatch = cleaned.match(/\{[\s\S]*\}/);
  return objectMatch ? objectMatch[0] : cleaned;
}

function sanitizeDraftText_(value, fallback, maxLength) {
  var normalized = collapseWhitespace_(value);
  if (!normalized) {
    normalized = collapseWhitespace_(fallback);
  }
  if (maxLength && normalized.length > maxLength) {
    normalized = normalized.slice(0, maxLength - 3).replace(/\s+\S*$/, '') + '...';
  }
  return normalized;
}

function collapseWhitespace_(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeDraftTags_(value) {
  if (Array.isArray(value)) {
    value = value.join(', ');
  }
  return String(value || '')
    .split(',')
    .map(function (tag) {
      return collapseWhitespace_(tag).replace(/^#/, '');
    })
    .filter(Boolean)
    .slice(0, 6)
    .join(', ');
}

function inferIdeaCategory_(brief) {
  var lower = String(brief || '').toLowerCase();
  if (/(newsletter|course|podcast|video|channel|content|media|blog)/.test(lower)) {
    return 'Content';
  }
  if (/(research|study|analysis|insight|report|dataset)/.test(lower)) {
    return 'Research';
  }
  if (/(agency|service|consulting|done for you|studio)/.test(lower)) {
    return 'Service';
  }
  if (/(tool|assistant|workflow|dashboard|automation|software|platform|app|os)/.test(lower)) {
    return 'Tool';
  }
  return 'Product';
}

function inferIdeaNameFromBrief_(brief) {
  var words = collapseWhitespace_(brief)
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 6)
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  if (!words.length) {
    return 'New Roundtable Spark';
  }
  return words.join(' ');
}

function inferTargetUsersFromBrief_(brief) {
  var lower = String(brief || '').toLowerCase();
  if (/(creator|writer|agency|marketer|founder|startup|small business)/.test(lower)) {
    return 'Founders, operators, and creators who face the workflow described in the brief.';
  }
  if (/(student|teacher|school|learn)/.test(lower)) {
    return 'Students, educators, and people trying to learn or teach more effectively.';
  }
  if (/(developer|engineer|product|design)/.test(lower)) {
    return 'Product teams and technical builders dealing with the workflow described in the brief.';
  }
  return 'People who repeatedly encounter the problem described in the brief and need a simpler outcome.';
}

function inferDraftTags_(brief, category) {
  var lower = String(brief || '').toLowerCase();
  var tags = [String(category || 'Product').toLowerCase(), 'idea'];
  [
    'ai',
    'automation',
    'marketplace',
    'saas',
    'research',
    'content',
    'workflow',
    'analytics',
    'community',
    'mobile',
    'productivity',
    'education',
  ].forEach(function (term) {
    if (tags.length >= 5) {
      return;
    }
    if (lower.indexOf(term) > -1) {
      tags.push(term);
    }
  });
  if (tags.length < 3) {
    tags.push('validation');
  }
  return tags
    .slice(0, 5)
    .map(function (tag) {
      return tag.charAt(0).toUpperCase() + tag.slice(1);
    })
    .join(', ');
}
