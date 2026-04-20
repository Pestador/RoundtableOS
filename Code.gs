var APP_TITLE = 'Roundtable OS Lightweight';

var SHEET_CONFIG = {
  Ideas: {
    headers: [
      'ID',
      'Name',
      'Summary',
      'Category',
      'ProblemSolved',
      'TargetUsers',
      'UniqueValue',
      'Stage',
      'PriorityScore',
      'NextAction',
      'LastBrainstormed',
      'ParentID',
      'Tags',
    ],
  },
  Resources: {
    headers: [
      'ID',
      'Title',
      'Type',
      'Description',
      'URL',
      'ReleaseDate',
      'Status',
      'Tags',
      'RelatedIdeaIDs',
    ],
  },
  Sessions: {
    headers: ['SessionID', 'IdeaID', 'Turn', 'Agent', 'Content', 'Timestamp'],
  },
  Tasks: {
    headers: ['TaskID', 'IdeaID', 'Title', 'Status', 'Assignee', 'DueDate', 'Tags'],
  },
};

var IDEA_STAGES = [
  'Inbox',
  'Spark',
  'Exploring',
  'Validating',
  'Planned',
  'Building',
  'Launched',
  'Paused',
  'Archived',
  'Killed',
];

var RESOURCE_STATUSES = ['Saved', 'Tested', 'Useful', 'Revisit', 'Deprecated'];
var TASK_STATUSES = ['Todo', 'InProgress', 'Blocked', 'Done'];
var RESOURCE_TYPES = ['App', 'AI Model', 'Book', 'Video', 'Dataset', 'Tool', 'Documentation', 'Design Asset'];

var SETTINGS_DEFAULTS = {
  activeLlmProvider: 'deepseek',
  deepSeekModel: 'deepseek-chat',
  geminiModel: 'gemini-2.5-flash',
  openRouterModel: 'openai/gpt-4o-mini',
  openAiModel: 'gpt-4o',
  anthropicModel: 'claude-sonnet-4-20250514',
  userName: 'Alex',
  userEmail: '',
  avatarColor: 'primary',
  notificationsEnabled: 'true',
  dormantIdeaThreshold: '30',
  darkModeEnabled: 'false',
};

var LLM_PROVIDER_CONFIG = {
  deepseek: {
    label: 'DeepSeek',
    apiKeyProperty: 'DEEPSEEK_API_KEY',
    modelProperty: 'DEEPSEEK_MODEL',
    modelField: 'deepSeekModel',
    keyField: 'deepSeekApiKey',
  },
  gemini: {
    label: 'Gemini',
    apiKeyProperty: 'GEMINI_API_KEY',
    modelProperty: 'GEMINI_MODEL',
    modelField: 'geminiModel',
    keyField: 'geminiApiKey',
  },
  openrouter: {
    label: 'OpenRouter',
    apiKeyProperty: 'OPENROUTER_API_KEY',
    modelProperty: 'OPENROUTER_MODEL',
    modelField: 'openRouterModel',
    keyField: 'openRouterApiKey',
  },
  openai: {
    label: 'OpenAI',
    apiKeyProperty: 'OPENAI_API_KEY',
    modelProperty: 'OPENAI_MODEL',
    modelField: 'openAiModel',
    keyField: 'openAiApiKey',
  },
  anthropic: {
    label: 'Anthropic',
    apiKeyProperty: 'ANTHROPIC_API_KEY',
    modelProperty: 'ANTHROPIC_MODEL',
    modelField: 'anthropicModel',
    keyField: 'anthropicApiKey',
  },
};

var PERSONA_SETTINGS_PROPERTY = 'PERSONA_PROFILES';
var PERSONA_AVATAR_FOLDER_PROPERTY = 'PERSONA_AVATAR_FOLDER_ID';
var PERSONA_PROFILE_KEYS = ['Kai', 'Nova', 'Rex', 'Sage', 'Luna', 'Nia'];
var MAX_PERSONA_AVATAR_DATA_URL_LENGTH = 350000;

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function doGet(e) {
  var template = HtmlService.createTemplateFromFile('index');
  template.appTitle = APP_TITLE;
  template.initialPage = e && e.parameter && e.parameter.page ? e.parameter.page : 'dashboard';
  return template
    .evaluate()
    .setTitle('Roundtable OS')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var action = payload.action;
    var args = payload.args || [];
    var allowed = {
      setupSpreadsheet: setupSpreadsheet,
      addIdea: addIdea,
      draftIdeaFromBrief: draftIdeaFromBrief,
      expandIdeaBrief: expandIdeaBrief,
      updateIdea: updateIdea,
      getIdeas: getIdeas,
      getIdeaById: getIdeaById,
      archiveIdea: archiveIdea,
      addResource: addResource,
      updateResource: updateResource,
      getResources: getResources,
      createSession: createSession,
      addSessionTurn: addSessionTurn,
      getSessionsForIdea: getSessionsForIdea,
      getSessionProgress: getSessionProgress,
      getSessionHistory: getSessionHistory,
      addTask: addTask,
      updateTask: updateTask,
      updateTaskStatus: updateTaskStatus,
      getTasks: getTasks,
      getDashboardData: getDashboardData,
      getIdeaDetailBundle: getIdeaDetailBundle,
      runBrainstormSession: runBrainstormSession,
      runNextBrainstormTurn: runNextBrainstormTurn,
      getSettings: getSettings,
      saveSettings: saveSettings,
      testLLMConnection: testLLMConnection,
      clearAllSessions: clearAllSessions,
      resetScores: resetScores,
      deleteTask: deleteTask,
      checkDormantIdeas: checkDormantIdeas,
      checkOverdueTasks: checkOverdueTasks,
      checkUnfinishedSessions: checkUnfinishedSessions,
      installTriggers: installTriggers,
    };
    if (!allowed[action]) {
      throw new Error('Unsupported action: ' + action);
    }
    var result = allowed[action].apply(null, args);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, result: result })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        error: error && error.message ? error.message : String(error),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function setupSpreadsheet() {
  var spreadsheet = getSpreadsheet_();
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());

  Object.keys(SHEET_CONFIG).forEach(function (sheetName) {
    var sheet = ensureSheet_(spreadsheet, sheetName, SHEET_CONFIG[sheetName].headers);
    sheet.setFrozenRows(1);
  });

  applyColumnValidation_('Ideas', 'Stage', IDEA_STAGES);
  applyColumnValidation_('Resources', 'Status', RESOURCE_STATUSES);
  applyColumnValidation_('Tasks', 'Status', TASK_STATUSES);
  applyFormats_();

  return {
    spreadsheetId: spreadsheet.getId(),
    spreadsheetName: spreadsheet.getName(),
    sheets: Object.keys(SHEET_CONFIG),
  };
}

function addIdea(data) {
  data = data || {};
  validateRequiredFields_(
    data,
    ['Name', 'Summary'],
    'Ideas require at least a Name and Summary.'
  );

  var sheet = getSheet_('Ideas');
  var idea = buildIdeaRecord_(data);
  appendRecord_('Ideas', idea);
  return serializeRecord_(idea);
}

function updateIdea(id, data) {
  if (!id) {
    throw new Error('An idea ID is required.');
  }
  data = data || {};
  var current = getRecordById_('Ideas', 'ID', id);
  if (!current) {
    throw new Error('Idea not found: ' + id);
  }
  var merged = mergeIdeaRecord_(current.record, data);
  updateRecordByRow_('Ideas', current.rowIndex, merged);
  return serializeRecord_(merged);
}

function getIdeas(filters) {
  filters = filters || {};
  var ideas = getAllRecords_('Ideas')
    .map(function (idea) {
      return enrichIdea_(idea);
    })
    .filter(function (idea) {
      return matchesIdeaFilters_(idea, filters);
    });

  var sortBy = filters.sortBy || 'PriorityScore';
  var sortDir = String(filters.sortDir || 'desc').toLowerCase() === 'asc' ? 1 : -1;
  ideas.sort(function (left, right) {
    return compareValues_(left[sortBy], right[sortBy]) * sortDir;
  });

  return ideas.map(serializeRecord_);
}

function getIdeaById(id) {
  var found = getRecordById_('Ideas', 'ID', id);
  return found ? serializeRecord_(enrichIdea_(found.record)) : null;
}

function archiveIdea(id) {
  return updateIdea(id, { Stage: 'Archived' });
}

function addResource(data) {
  data = data || {};
  validateRequiredFields_(data, ['Title', 'Type'], 'Resources require a Title and Type.');
  var record = buildResourceRecord_(data);
  appendRecord_('Resources', record);
  return serializeRecord_(record);
}

function updateResource(id, data) {
  if (!id) {
    throw new Error('A resource ID is required.');
  }
  var current = getRecordById_('Resources', 'ID', id);
  if (!current) {
    throw new Error('Resource not found: ' + id);
  }
  var merged = mergeRecord_(current.record, data, SHEET_CONFIG.Resources.headers);
  merged.Tags = normalizeTagString_(merged.Tags);
  merged.RelatedIdeaIDs = normalizeTagString_(merged.RelatedIdeaIDs);
  updateRecordByRow_('Resources', current.rowIndex, merged);
  return serializeRecord_(merged);
}

function getResources(filters) {
  filters = filters || {};
  var resources = getAllRecords_('Resources')
    .map(function (resource) {
      return enrichResource_(resource);
    })
    .filter(function (resource) {
      return matchesResourceFilters_(resource, filters);
    });
  resources.sort(function (left, right) {
    return compareValues_(right.ReleaseDate, left.ReleaseDate);
  });
  return resources.map(serializeRecord_);
}

function addTask(data) {
  data = data || {};
  validateRequiredFields_(data, ['Title'], 'Tasks require a title.');
  var record = buildTaskRecord_(data);
  appendRecord_('Tasks', record);
  return serializeRecord_(enrichTask_(record));
}

function updateTask(id, data) {
  if (!id) {
    throw new Error('A task ID is required.');
  }
  var current = getRecordById_('Tasks', 'TaskID', id);
  if (!current) {
    throw new Error('Task not found: ' + id);
  }
  var merged = mergeRecord_(current.record, data, SHEET_CONFIG.Tasks.headers);
  merged.Status = TASK_STATUSES.indexOf(merged.Status) === -1 ? current.record.Status : merged.Status;
  merged.Tags = normalizeTagString_(merged.Tags);
  updateRecordByRow_('Tasks', current.rowIndex, merged);
  return serializeRecord_(enrichTask_(merged));
}

function updateTaskStatus(id, status) {
  if (TASK_STATUSES.indexOf(status) === -1) {
    throw new Error('Unsupported task status: ' + status);
  }
  return updateTask(id, { Status: status });
}

function deleteTask(id) {
  var current = getRecordById_('Tasks', 'TaskID', id);
  if (!current) {
    throw new Error('Task not found: ' + id);
  }
  getSheet_('Tasks').deleteRow(current.rowIndex);
  return { deleted: true, id: id };
}

function getTasks(filters) {
  filters = filters || {};
  var tasks = getAllRecords_('Tasks')
    .map(function (task) {
      return enrichTask_(task);
    })
    .filter(function (task) {
      return matchesTaskFilters_(task, filters);
    });

  tasks.sort(function (left, right) {
    return compareValues_(left.DueDate || left.Status, right.DueDate || right.Status);
  });

  return tasks.map(serializeRecord_);
}

function createSession(ideaId, mode) {
  var idea = getIdeaById(ideaId);
  if (!idea) {
    throw new Error('Cannot create a session for a missing idea.');
  }
  mode = normalizeBrainstormMode_(mode);
  var sessionId = Utilities.getUuid();
  storeSessionMeta_(sessionId, {
    ideaId: idea.ID,
    mode: mode,
    createdAt: new Date().toISOString(),
  });
  return {
    sessionId: sessionId,
    ideaId: idea.ID,
    ideaName: idea.Name,
    mode: mode,
    personas: getBrainstormPersonas_(mode).map(function (persona) {
      return serializeRecord_(persona);
    }),
    createdAt: new Date().toISOString(),
  };
}

function addSessionTurn(sessionId, turn, agent, content, ideaId) {
  if (!sessionId) {
    throw new Error('A session ID is required.');
  }
  appendSessionTurn_({
    sessionId: sessionId,
    ideaId: ideaId || inferIdeaIdFromSession_(sessionId),
    turn: turn,
    agent: agent,
    content: content,
  });
  return getSessionProgress(sessionId);
}

function getSessionsForIdea(ideaId) {
  return getSessionHistory({ ideaId: ideaId });
}

function getSessionProgress(sessionId) {
  if (!sessionId) {
    throw new Error('A session ID is required.');
  }
  var grouped = groupSessionRows_(getAllRecords_('Sessions'));
  var session = grouped[sessionId];
  var meta = getSessionMeta_(sessionId);
  if (!session) {
    return {
      sessionId: sessionId,
      ideaId: meta.ideaId || '',
      idea: meta.ideaId ? getIdeaById(meta.ideaId) : null,
      turns: [],
      complete: false,
      synthesis: null,
      synthesisData: null,
      personas: meta.mode ? getBrainstormPersonas_(meta.mode).map(function (persona) { return persona.key; }) : [],
      mode: meta.mode || '',
    };
  }

  var idea = session.ideaId ? getIdeaById(session.ideaId) : meta.ideaId ? getIdeaById(meta.ideaId) : null;
  return serializeRecord_({
    sessionId: session.sessionId,
    ideaId: session.ideaId || meta.ideaId || '',
    idea: idea,
    turns: session.turns,
    complete: session.complete,
    startedAt: session.startedAt,
    updatedAt: session.updatedAt,
    synthesis: session.synthesis,
    synthesisData: session.synthesisData,
    personas: meta.mode ? getBrainstormPersonas_(meta.mode).map(function (persona) { return persona.key; }) : session.personas,
    mode: meta.mode || '',
    summary: session.summary,
  });
}

function getSessionHistory(filters) {
  filters = filters || {};
  var grouped = groupSessionRows_(getAllRecords_('Sessions'));
  var ideaMap = buildIdeaMap_();
  var sessions = Object.keys(grouped)
    .map(function (sessionId) {
      var session = grouped[sessionId];
      var meta = getSessionMeta_(sessionId);
      session.ideaId = session.ideaId || meta.ideaId || '';
      session.ideaName = ideaMap[session.ideaId] ? ideaMap[session.ideaId].Name : 'Unknown Idea';
      session.mode = meta.mode || detectModeFromPersonasServer_(session.personas);
      if (session.mode) {
        session.personas = getBrainstormPersonas_(session.mode).map(function (persona) {
          return persona.key;
        });
      }
      return session;
    })
    .filter(function (session) {
      if (filters.ideaId && session.ideaId !== filters.ideaId) {
        return false;
      }
      if (filters.sessionId && session.sessionId !== filters.sessionId) {
        return false;
      }
      if (filters.search) {
        var haystack = [
          session.ideaName,
          session.summary,
          session.personas.join(' '),
        ]
          .join(' ')
          .toLowerCase();
        if (haystack.indexOf(String(filters.search).toLowerCase()) === -1) {
          return false;
        }
      }
      return true;
    })
    .sort(function (left, right) {
      return compareValues_(right.updatedAt, left.updatedAt);
    });

  return sessions.map(serializeRecord_);
}

function getDashboardData() {
  var ideas = getIdeas({ sortBy: 'PriorityScore', sortDir: 'desc' });
  var tasks = getTasks({});
  var resources = getResources({});
  var sessions = getSessionHistory({});
  var settings = getSettings();
  var dormantThreshold = Number(settings.dormantIdeaThreshold || 30);
  var dormantIdeas = ideas.filter(function (idea) {
    return isIdeaDormant_(idea, dormantThreshold);
  });

  return {
    greetingName: settings.userName || 'Alex',
    topPriorities: ideas.slice(0, 5),
    pipeline: buildPipelineSummary_(ideas),
    recentSessions: sessions.slice(0, 3),
    recentInsights: buildRecentInsights_(sessions),
    dormantIdeas: dormantIdeas.slice(0, 5),
    stats: {
      totalIdeas: ideas.length,
      activeSessions: sessions.filter(function (session) {
        return !session.complete;
      }).length,
      resourcesLogged: resources.length,
      tasksPending: tasks.filter(function (task) {
        return task.Status !== 'Done';
      }).length,
    },
  };
}

function getIdeaDetailBundle(id) {
  var idea = getIdeaById(id);
  if (!idea) {
    throw new Error('Idea not found: ' + id);
  }

  var scoreBreakdown = computePriorityBreakdown_(idea);
  var sessions = getSessionsForIdea(id);
  var tasks = getTasks({ ideaId: id });
  var resources = getResources({ relatedIdeaId: id });

  return serializeRecord_({
    idea: idea,
    scoreBreakdown: scoreBreakdown,
    sessions: sessions,
    recentSession: sessions.length ? getSessionProgress(sessions[0].sessionId) : null,
    tasks: tasks,
    resources: resources,
  });
}

function getSettings() {
  var properties = PropertiesService.getScriptProperties();
  var activeProvider = getStoredActiveProvider_(properties);
  var settings = {
    activeLlmProvider: activeProvider,
    deepSeekModel: getStoredProviderModel_(properties, 'deepseek'),
    geminiModel: getStoredProviderModel_(properties, 'gemini'),
    openRouterModel: getStoredProviderModel_(properties, 'openrouter'),
    openAiModel: getStoredProviderModel_(properties, 'openai'),
    anthropicModel: getStoredProviderModel_(properties, 'anthropic'),
    userName: properties.getProperty('userName') || SETTINGS_DEFAULTS.userName,
    userEmail: properties.getProperty('userEmail') || SETTINGS_DEFAULTS.userEmail,
    avatarColor: properties.getProperty('avatarColor') || SETTINGS_DEFAULTS.avatarColor,
    notificationsEnabled:
      properties.getProperty('notificationsEnabled') || SETTINGS_DEFAULTS.notificationsEnabled,
    dormantIdeaThreshold:
      properties.getProperty('dormantIdeaThreshold') || SETTINGS_DEFAULTS.dormantIdeaThreshold,
    darkModeEnabled: properties.getProperty('darkModeEnabled') || SETTINGS_DEFAULTS.darkModeEnabled,
  };

  settings.hasDeepSeekApiKey = !!getStoredProviderApiKey_(properties, 'deepseek');
  settings.hasGeminiApiKey = !!getStoredProviderApiKey_(properties, 'gemini');
  settings.hasOpenRouterApiKey = !!getStoredProviderApiKey_(properties, 'openrouter');
  settings.hasOpenAiApiKey = !!getStoredProviderApiKey_(properties, 'openai');
  settings.hasAnthropicApiKey = !!getStoredProviderApiKey_(properties, 'anthropic');
  settings.hasApiKey = !!getStoredProviderApiKey_(properties, activeProvider);
  settings.hasAnyApiKey =
    settings.hasDeepSeekApiKey ||
    settings.hasGeminiApiKey ||
    settings.hasOpenRouterApiKey ||
    settings.hasOpenAiApiKey ||
    settings.hasAnthropicApiKey;
  settings.llmProvider = settings.activeLlmProvider;
  settings.llmModel = getStoredProviderModel_(properties, activeProvider);
  settings.providers = buildProviderSettingsSummary_(properties);
  settings.spreadsheetId = properties.getProperty('SPREADSHEET_ID') || getSpreadsheet_().getId();
  settings.personaProfiles = getStoredPersonaProfiles_(properties, { includeAvatarData: true });

  return serializeRecord_(settings);
}

function saveSettings(data) {
  data = data || {};
  var properties = PropertiesService.getScriptProperties();
  var activeProvider = normalizeProviderName_(
    data.activeLlmProvider || data.llmProvider || getStoredActiveProvider_(properties)
  );

  properties.setProperty('ACTIVE_LLM_PROVIDER', activeProvider);
  properties.setProperty('llmProvider', activeProvider);
  properties.setProperty('LLM_PROVIDER', activeProvider);

  Object.keys(LLM_PROVIDER_CONFIG).forEach(function (provider) {
    var config = getProviderConfig_(provider);
    var modelValue =
      data[config.modelField] ||
      (provider === activeProvider && typeof data.llmModel !== 'undefined' ? data.llmModel : '');
    var keyValue =
      data[config.keyField] ||
      (provider === activeProvider && typeof data.llmApiKey !== 'undefined' ? data.llmApiKey : '');

    if (typeof modelValue !== 'undefined' && String(modelValue || '').trim()) {
      properties.setProperty(config.modelProperty, String(modelValue).trim());
    }

    if (typeof keyValue !== 'undefined' && String(keyValue || '').trim()) {
      properties.setProperty(config.apiKeyProperty, String(keyValue).trim());
    }
  });

  [
    'userName',
    'userEmail',
    'avatarColor',
    'notificationsEnabled',
    'dormantIdeaThreshold',
    'darkModeEnabled',
  ].forEach(function (key) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      properties.setProperty(key, String(data[key]));
    }
  });

  properties.setProperty('llmModel', getStoredProviderModel_(properties, activeProvider));
  properties.setProperty('LLM_MODEL', getStoredProviderModel_(properties, activeProvider));

  var activeApiKey = getStoredProviderApiKey_(properties, activeProvider);
  if (activeApiKey) {
    properties.setProperty('LLM_API_KEY', activeApiKey);
  } else {
    properties.deleteProperty('LLM_API_KEY');
  }

  if (Object.prototype.hasOwnProperty.call(data, 'personaProfiles')) {
    savePersonaProfiles_(data.personaProfiles, properties);
  }

  properties.setProperty('SPREADSHEET_ID', getSpreadsheet_().getId());

  return getSettings();
}

function normalizeProviderName_(provider) {
  var normalized = String(provider || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
  if (normalized === 'openrouter') {
    return 'openrouter';
  }
  if (normalized === 'deepseek') {
    return 'deepseek';
  }
  if (normalized === 'openai') {
    return 'openai';
  }
  if (normalized === 'anthropic') {
    return 'anthropic';
  }
  if (normalized === 'gemini' || normalized === 'google') {
    return 'gemini';
  }
  return SETTINGS_DEFAULTS.activeLlmProvider;
}

function getProviderConfig_(provider) {
  return LLM_PROVIDER_CONFIG[normalizeProviderName_(provider)] || LLM_PROVIDER_CONFIG[SETTINGS_DEFAULTS.activeLlmProvider];
}

function hasModernProviderSettings_(properties) {
  if (properties.getProperty('ACTIVE_LLM_PROVIDER')) {
    return true;
  }
  return Object.keys(LLM_PROVIDER_CONFIG).some(function (provider) {
    var config = LLM_PROVIDER_CONFIG[provider];
    return !!properties.getProperty(config.apiKeyProperty) || !!properties.getProperty(config.modelProperty);
  });
}

function getLegacyStoredProvider_(properties) {
  return normalizeProviderName_(
    properties.getProperty('LLM_PROVIDER') || properties.getProperty('llmProvider') || ''
  );
}

function getStoredActiveProvider_(properties) {
  return normalizeProviderName_(
    properties.getProperty('ACTIVE_LLM_PROVIDER') ||
      properties.getProperty('LLM_PROVIDER') ||
      properties.getProperty('llmProvider') ||
      SETTINGS_DEFAULTS.activeLlmProvider
  );
}

function getStoredProviderModel_(properties, provider) {
  var config = getProviderConfig_(provider);
  var stored = properties.getProperty(config.modelProperty);
  if (stored) {
    return stored;
  }

  if (!hasModernProviderSettings_(properties) && getLegacyStoredProvider_(properties) === normalizeProviderName_(provider)) {
    return (
      properties.getProperty('LLM_MODEL') ||
      properties.getProperty('llmModel') ||
      SETTINGS_DEFAULTS[config.modelField]
    );
  }

  return SETTINGS_DEFAULTS[config.modelField];
}

function getStoredProviderApiKey_(properties, provider) {
  var config = getProviderConfig_(provider);
  var stored = properties.getProperty(config.apiKeyProperty);
  if (stored) {
    return stored;
  }

  if (!hasModernProviderSettings_(properties) && getLegacyStoredProvider_(properties) === normalizeProviderName_(provider)) {
    return properties.getProperty('LLM_API_KEY') || '';
  }

  return '';
}

function buildProviderSettingsSummary_(properties) {
  var summary = {};
  Object.keys(LLM_PROVIDER_CONFIG).forEach(function (provider) {
    var config = LLM_PROVIDER_CONFIG[provider];
    summary[provider] = {
      label: config.label,
      model: getStoredProviderModel_(properties, provider),
      hasApiKey: !!getStoredProviderApiKey_(properties, provider),
    };
  });
  return summary;
}

function buildDefaultPersonaProfiles_() {
  var profiles = {};
  PERSONA_PROFILE_KEYS.forEach(function (key) {
    var definition = typeof PERSONA_DEFINITIONS !== 'undefined' && PERSONA_DEFINITIONS[key] ? PERSONA_DEFINITIONS[key] : {};
    profiles[key] = {
      key: key,
      defaultName: key,
      displayName: key,
      role: definition.role || '',
      accent: definition.accent || 'primary',
      avatarFileId: '',
      avatarDataUrl: '',
      hasAvatar: false,
    };
  });
  return profiles;
}

function getStoredPersonaProfiles_(properties, options) {
  properties = properties || PropertiesService.getScriptProperties();
  options = options || {};
  var includeAvatarData = options.includeAvatarData !== false;
  var defaults = buildDefaultPersonaProfiles_();
  var stored = getStoredPersonaMetadata_(properties);

  Object.keys(defaults).forEach(function (key) {
    var current = stored[key] || {};
    var profile = defaults[key];
    profile.displayName = sanitizePersonaDisplayName_(current.displayName, profile.defaultName);
    profile.avatarFileId = String(current.avatarFileId || '').trim();
    profile.hasAvatar = !!profile.avatarFileId;
    profile.avatarDataUrl =
      includeAvatarData && profile.avatarFileId ? readPersonaAvatarDataUrl_(profile.avatarFileId) : '';
    if (includeAvatarData && profile.avatarFileId && !profile.avatarDataUrl) {
      profile.avatarFileId = '';
      profile.hasAvatar = false;
    }
  });

  return defaults;
}

function getStoredPersonaProfile_(key, properties, options) {
  var profiles = getStoredPersonaProfiles_(properties, options);
  return profiles[key] || buildDefaultPersonaProfiles_()[key] || { key: key, displayName: key, avatarDataUrl: '' };
}

function getStoredPersonaMetadata_(properties) {
  var raw = properties.getProperty(PERSONA_SETTINGS_PROPERTY);
  if (!raw) {
    return {};
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    Logger.log('Failed to parse stored persona metadata: ' + error);
    return {};
  }
}

function savePersonaProfiles_(inputProfiles, properties) {
  properties = properties || PropertiesService.getScriptProperties();
  var incoming = normalizeIncomingPersonaProfiles_(inputProfiles);
  var currentProfiles = getStoredPersonaProfiles_(properties, { includeAvatarData: false });
  var nextProfiles = {};

  PERSONA_PROFILE_KEYS.forEach(function (key) {
    var current = currentProfiles[key] || buildDefaultPersonaProfiles_()[key];
    var updates = incoming[key] || {};
    var displayName = sanitizePersonaDisplayName_(updates.displayName, current.displayName || key);
    var avatarFileId = String(current.avatarFileId || '').trim();
    var clearAvatar = toBooleanLike_(updates.clearAvatar);
    var nextAvatarDataUrl = String(updates.avatarDataUrl || '').trim();

    if (clearAvatar && avatarFileId) {
      trashDriveFileSafe_(avatarFileId);
      avatarFileId = '';
    }

    if (nextAvatarDataUrl) {
      avatarFileId = savePersonaAvatarDataUrl_(key, nextAvatarDataUrl, avatarFileId, properties);
    }

    nextProfiles[key] = {
      displayName: displayName,
      avatarFileId: avatarFileId,
    };
  });

  properties.setProperty(PERSONA_SETTINGS_PROPERTY, JSON.stringify(nextProfiles));
}

function normalizeIncomingPersonaProfiles_(inputProfiles) {
  if (!inputProfiles) {
    return {};
  }

  if (typeof inputProfiles === 'string') {
    try {
      inputProfiles = JSON.parse(inputProfiles);
    } catch (error) {
      throw new Error('Persona settings were not valid JSON.');
    }
  }

  if (Array.isArray(inputProfiles)) {
    return inputProfiles.reduce(function (accumulator, item) {
      if (item && item.key) {
        accumulator[item.key] = item;
      }
      return accumulator;
    }, {});
  }

  return inputProfiles && typeof inputProfiles === 'object' ? inputProfiles : {};
}

function sanitizePersonaDisplayName_(value, fallback) {
  var cleaned = String(value || '').replace(/\s+/g, ' ').trim();
  if (!cleaned) {
    return fallback || '';
  }
  return cleaned.slice(0, 40);
}

function toBooleanLike_(value) {
  return value === true || value === 'true' || value === 1 || value === '1';
}

function savePersonaAvatarDataUrl_(personaKey, dataUrl, existingFileId, properties) {
  if (dataUrl.length > MAX_PERSONA_AVATAR_DATA_URL_LENGTH) {
    throw new Error('Avatar image is too large. Use a smaller portrait and try again.');
  }

  var folder = ensurePersonaAvatarFolder_(properties);
  var blob = dataUrlToBlob_(
    dataUrl,
    buildPersonaAvatarFilename_(personaKey, dataUrl)
  );
  var file = folder.createFile(blob);
  if (existingFileId && existingFileId !== file.getId()) {
    trashDriveFileSafe_(existingFileId);
  }
  return file.getId();
}

function ensurePersonaAvatarFolder_(properties) {
  properties = properties || PropertiesService.getScriptProperties();
  var folderId = properties.getProperty(PERSONA_AVATAR_FOLDER_PROPERTY);
  if (folderId) {
    try {
      return DriveApp.getFolderById(folderId);
    } catch (error) {
      Logger.log('Stored persona avatar folder was not available: ' + error);
    }
  }

  var folder = DriveApp.createFolder(APP_TITLE + ' Persona Avatars');
  properties.setProperty(PERSONA_AVATAR_FOLDER_PROPERTY, folder.getId());
  return folder;
}

function readPersonaAvatarDataUrl_(fileId) {
  if (!fileId) {
    return '';
  }
  try {
    var file = DriveApp.getFileById(fileId);
    var blob = file.getBlob();
    return 'data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes());
  } catch (error) {
    Logger.log('Failed to read persona avatar file ' + fileId + ': ' + error);
    return '';
  }
}

function dataUrlToBlob_(dataUrl, fileName) {
  var match = String(dataUrl || '').match(/^data:(image\/[A-Za-z0-9.+-]+);base64,([\s\S]+)$/);
  if (!match) {
    throw new Error('Avatar image data was not in a supported format.');
  }
  return Utilities.newBlob(Utilities.base64Decode(match[2]), match[1], fileName);
}

function buildPersonaAvatarFilename_(personaKey, dataUrl) {
  var mimeMatch = String(dataUrl || '').match(/^data:(image\/[A-Za-z0-9.+-]+);base64,/);
  var mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  var extensionMap = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };
  var extension = extensionMap[mimeType] || 'img';
  return 'persona-' + String(personaKey || 'agent').toLowerCase() + '-' + new Date().getTime() + '.' + extension;
}

function trashDriveFileSafe_(fileId) {
  if (!fileId) {
    return;
  }
  try {
    DriveApp.getFileById(fileId).setTrashed(true);
  } catch (error) {
    Logger.log('Failed to trash persona avatar file ' + fileId + ': ' + error);
  }
}

function clearAllSessions() {
  var sheet = getSheet_('Sessions');
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  }
  clearSessionMeta_();
  return { cleared: true };
}

function resetScores() {
  var ideas = getAllRecords_('Ideas');
  ideas.forEach(function (idea) {
    var cleared = mergeRecord_(idea, { PriorityScore: '', NextAction: '' }, SHEET_CONFIG.Ideas.headers);
    updateRecordByRow_('Ideas', getRecordById_('Ideas', 'ID', idea.ID).rowIndex, cleared);
  });
  return { reset: true, count: ideas.length };
}

function buildIdeaRecord_(data) {
  var now = new Date();
  var base = {
    ID: Utilities.getUuid(),
    Name: String(data.Name || '').trim(),
    Summary: String(data.Summary || '').trim(),
    Category: String(data.Category || 'Other').trim(),
    ProblemSolved: String(data.ProblemSolved || '').trim(),
    TargetUsers: String(data.TargetUsers || '').trim(),
    UniqueValue: String(data.UniqueValue || '').trim(),
    Stage: IDEA_STAGES.indexOf(data.Stage) > -1 ? data.Stage : 'Spark',
    PriorityScore: '',
    NextAction: '',
    LastBrainstormed: data.LastBrainstormed ? coerceDate_(data.LastBrainstormed) : '',
    ParentID: String(data.ParentID || '').trim(),
    Tags: normalizeTagString_(data.Tags),
  };

  var breakdown = computePriorityBreakdown_(base);
  base.PriorityScore = roundNumber_(breakdown.priority, 3);
  base.NextAction = suggestNextAction(base.PriorityScore, base.Stage);
  if (data.LastBrainstormed === 'now') {
    base.LastBrainstormed = now;
  }
  return base;
}

function mergeIdeaRecord_(current, updates) {
  var merged = mergeRecord_(current, updates, SHEET_CONFIG.Ideas.headers);
  merged.Stage = IDEA_STAGES.indexOf(merged.Stage) > -1 ? merged.Stage : current.Stage;
  merged.Tags = normalizeTagString_(merged.Tags);
  merged.LastBrainstormed = merged.LastBrainstormed ? coerceDate_(merged.LastBrainstormed) : '';

  var breakdown = computePriorityBreakdown_(merged);
  merged.PriorityScore = roundNumber_(breakdown.priority, 3);
  merged.NextAction =
    updates && Object.prototype.hasOwnProperty.call(updates, 'NextAction')
      ? updates.NextAction
      : suggestNextAction(merged.PriorityScore, merged.Stage);
  return merged;
}

function buildResourceRecord_(data) {
  return {
    ID: Utilities.getUuid(),
    Title: String(data.Title || '').trim(),
    Type: RESOURCE_TYPES.indexOf(data.Type) > -1 ? data.Type : String(data.Type || 'Tool'),
    Description: String(data.Description || '').trim(),
    URL: String(data.URL || '').trim(),
    ReleaseDate: data.ReleaseDate ? coerceDate_(data.ReleaseDate) : '',
    Status: RESOURCE_STATUSES.indexOf(data.Status) > -1 ? data.Status : 'Saved',
    Tags: normalizeTagString_(data.Tags),
    RelatedIdeaIDs: normalizeTagString_(data.RelatedIdeaIDs),
  };
}

function buildTaskRecord_(data) {
  return {
    TaskID: Utilities.getUuid(),
    IdeaID: String(data.IdeaID || '').trim(),
    Title: String(data.Title || '').trim(),
    Status: TASK_STATUSES.indexOf(data.Status) > -1 ? data.Status : 'Todo',
    Assignee: String(data.Assignee || '').trim(),
    DueDate: data.DueDate ? coerceDate_(data.DueDate) : '',
    Tags: normalizeTagString_(data.Tags),
  };
}

function appendSessionTurn_(params) {
  var record = {
    SessionID: params.sessionId,
    IdeaID: params.ideaId || '',
    Turn: params.turn,
    Agent: params.agent,
    Content: params.content,
    Timestamp: new Date(),
  };
  appendRecord_('Sessions', record);
  return record;
}

function ensureSheet_(spreadsheet, sheetName, headers) {
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (sheet.getLastColumn() < headers.length) {
    sheet.insertColumnsAfter(sheet.getLastColumn(), headers.length - sheet.getLastColumn());
  }
  return sheet;
}

function applyColumnValidation_(sheetName, columnName, allowedValues) {
  var sheet = getSheet_(sheetName);
  var columnIndex = getColumnIndex_(sheetName, columnName);
  var maxRows = Math.max(sheet.getMaxRows() - 1, 1);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(allowedValues, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, columnIndex, maxRows, 1).setDataValidation(rule);
}

function applyFormats_() {
  var ideasSheet = getSheet_('Ideas');
  var resourcesSheet = getSheet_('Resources');
  var tasksSheet = getSheet_('Tasks');
  var sessionsSheet = getSheet_('Sessions');

  ideasSheet.getRange(2, getColumnIndex_('Ideas', 'PriorityScore'), Math.max(ideasSheet.getMaxRows() - 1, 1), 1).setNumberFormat(
    '0.000'
  );
  ideasSheet.getRange(2, getColumnIndex_('Ideas', 'LastBrainstormed'), Math.max(ideasSheet.getMaxRows() - 1, 1), 1).setNumberFormat(
    'yyyy-mm-dd hh:mm'
  );
  resourcesSheet.getRange(2, getColumnIndex_('Resources', 'ReleaseDate'), Math.max(resourcesSheet.getMaxRows() - 1, 1), 1).setNumberFormat(
    'yyyy-mm-dd'
  );
  tasksSheet.getRange(2, getColumnIndex_('Tasks', 'DueDate'), Math.max(tasksSheet.getMaxRows() - 1, 1), 1).setNumberFormat(
    'yyyy-mm-dd'
  );
  sessionsSheet.getRange(2, getColumnIndex_('Sessions', 'Timestamp'), Math.max(sessionsSheet.getMaxRows() - 1, 1), 1).setNumberFormat(
    'yyyy-mm-dd hh:mm'
  );
}

function appendRecord_(sheetName, record) {
  var sheet = getSheet_(sheetName);
  sheet.appendRow(recordToRow_(sheetName, record));
}

function updateRecordByRow_(sheetName, rowIndex, record) {
  var sheet = getSheet_(sheetName);
  sheet.getRange(rowIndex, 1, 1, SHEET_CONFIG[sheetName].headers.length).setValues([recordToRow_(sheetName, record)]);
}

function getRecordById_(sheetName, idColumn, idValue) {
  var rows = getAllRecords_(sheetName, true);
  for (var index = 0; index < rows.length; index += 1) {
    if (String(rows[index].record[idColumn]) === String(idValue)) {
      return rows[index];
    }
  }
  return null;
}

function getAllRecords_(sheetName, includeRowIndex) {
  var sheet = getSheet_(sheetName);
  var headers = SHEET_CONFIG[sheetName].headers;
  if (sheet.getLastRow() < 2) {
    return [];
  }
  var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  return values
    .filter(function (row) {
      return row.join('').trim() !== '';
    })
    .map(function (row, offset) {
      var record = rowToRecord_(headers, row);
      return includeRowIndex ? { record: record, rowIndex: offset + 2 } : record;
    });
}

function getSheet_(sheetName) {
  var spreadsheet = getSpreadsheet_();
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Missing sheet "' + sheetName + '". Run setupSpreadsheet() first.');
  }
  return sheet;
}

function getSpreadsheet_() {
  var properties = PropertiesService.getScriptProperties();
  var spreadsheetId = properties.getProperty('SPREADSHEET_ID');

  if (spreadsheetId) {
    try {
      return SpreadsheetApp.openById(spreadsheetId);
    } catch (error) {
      Logger.log('Failed to open spreadsheet by stored ID: ' + error);
    }
  }

  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    return active;
  }

  throw new Error('No spreadsheet is linked. Set SPREADSHEET_ID or bind this script to a spreadsheet.');
}

function getColumnIndex_(sheetName, columnName) {
  return SHEET_CONFIG[sheetName].headers.indexOf(columnName) + 1;
}

function rowToRecord_(headers, row) {
  var record = {};
  headers.forEach(function (header, index) {
    record[header] = row[index];
  });
  return record;
}

function recordToRow_(sheetName, record) {
  return SHEET_CONFIG[sheetName].headers.map(function (header) {
    return normalizeCellValue_(record[header]);
  });
}

function normalizeCellValue_(value) {
  if (value === null || typeof value === 'undefined') {
    return '';
  }
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  return String(value);
}

function mergeRecord_(current, updates, headers) {
  var merged = {};
  headers.forEach(function (header) {
    if (Object.prototype.hasOwnProperty.call(updates, header)) {
      merged[header] = updates[header];
    } else {
      merged[header] = current[header];
    }
  });
  return merged;
}

function validateRequiredFields_(data, fields, message) {
  var missing = fields.filter(function (field) {
    return !String(data[field] || '').trim();
  });
  if (missing.length) {
    throw new Error(message || 'Missing required fields: ' + missing.join(', '));
  }
}

function normalizeTagString_(value) {
  if (!value) {
    return '';
  }
  var items = Array.isArray(value) ? value : String(value).split(',');
  return items
    .map(function (item) {
      return String(item || '').trim();
    })
    .filter(function (item, index, array) {
      return item && array.indexOf(item) === index;
    })
    .join(', ');
}

function coerceDate_(value) {
  if (!value) {
    return '';
  }
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return value;
  }
  var parsed = new Date(value);
  return isNaN(parsed.getTime()) ? '' : parsed;
}

function serializeRecord_(value) {
  if (Array.isArray(value)) {
    return value.map(serializeRecord_);
  }
  if (!value || typeof value !== 'object') {
    return value;
  }
  var serialized = {};
  Object.keys(value).forEach(function (key) {
    var item = value[key];
    if (Object.prototype.toString.call(item) === '[object Date]') {
      serialized[key] = item.toISOString();
    } else if (Array.isArray(item)) {
      serialized[key] = item.map(serializeRecord_);
    } else if (item && typeof item === 'object') {
      serialized[key] = serializeRecord_(item);
    } else {
      serialized[key] = item;
    }
  });
  return serialized;
}

function compareValues_(left, right) {
  if (left === right) {
    return 0;
  }
  var leftValue = normalizeComparable_(left);
  var rightValue = normalizeComparable_(right);
  if (leftValue > rightValue) {
    return 1;
  }
  if (leftValue < rightValue) {
    return -1;
  }
  return 0;
}

function normalizeComparable_(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return value.getTime();
  }
  if (typeof value === 'string') {
    var parsed = Date.parse(value);
    if (!isNaN(parsed) && /\d{4}-\d{2}-\d{2}/.test(value)) {
      return parsed;
    }
    var asNumber = Number(value);
    return isNaN(asNumber) ? value.toLowerCase() : asNumber;
  }
  if (value === null || typeof value === 'undefined' || value === '') {
    return -1;
  }
  return value;
}

function roundNumber_(value, precision) {
  precision = typeof precision === 'number' ? precision : 2;
  var factor = Math.pow(10, precision);
  return Math.round(Number(value || 0) * factor) / factor;
}

function buildIdeaMap_() {
  var map = {};
  getAllRecords_('Ideas').forEach(function (idea) {
    map[idea.ID] = enrichIdea_(idea);
  });
  return map;
}

function enrichIdea_(idea) {
  var enriched = mergeRecord_(idea, {}, SHEET_CONFIG.Ideas.headers);
  enriched.PriorityScore = Number(enriched.PriorityScore || 0);
  enriched.StageOrder = IDEA_STAGES.indexOf(enriched.Stage);
  enriched.TagsList = splitList_(enriched.Tags);
  enriched.ScorePercent = Math.round(enriched.PriorityScore * 100);
  return enriched;
}

function enrichResource_(resource) {
  var ideas = buildIdeaMap_();
  var enriched = mergeRecord_(resource, {}, SHEET_CONFIG.Resources.headers);
  enriched.TagsList = splitList_(enriched.Tags);
  enriched.RelatedIdeaIDsList = splitList_(enriched.RelatedIdeaIDs);
  enriched.RelatedIdeas = enriched.RelatedIdeaIDsList
    .map(function (ideaId) {
      return ideas[ideaId];
    })
    .filter(Boolean)
    .map(function (idea) {
      return { ID: idea.ID, Name: idea.Name, Stage: idea.Stage };
    });
  return enriched;
}

function enrichTask_(task) {
  var ideas = buildIdeaMap_();
  var enriched = mergeRecord_(task, {}, SHEET_CONFIG.Tasks.headers);
  enriched.TagsList = splitList_(enriched.Tags);
  enriched.Idea = ideas[enriched.IdeaID] || null;
  enriched.IdeaName = enriched.Idea ? enriched.Idea.Name : 'Unlinked';
  enriched.IdeaStage = enriched.Idea ? enriched.Idea.Stage : '';
  enriched.AssigneeInitial = enriched.Assignee ? String(enriched.Assignee).charAt(0).toUpperCase() : 'U';
  enriched.IsOverdue = isTaskOverdue_(enriched);
  return enriched;
}

function matchesIdeaFilters_(idea, filters) {
  if (filters.stage && idea.Stage !== filters.stage) {
    return false;
  }
  if (filters.stages && filters.stages.length && filters.stages.indexOf(idea.Stage) === -1) {
    return false;
  }
  if (filters.id && idea.ID !== filters.id) {
    return false;
  }
  if (filters.ids && filters.ids.length && filters.ids.indexOf(idea.ID) === -1) {
    return false;
  }
  if (filters.search) {
    var search = String(filters.search).toLowerCase();
    var haystack = [idea.Name, idea.Summary, idea.Category, idea.Tags]
      .join(' ')
      .toLowerCase();
    if (haystack.indexOf(search) === -1) {
      return false;
    }
  }
  return true;
}

function matchesResourceFilters_(resource, filters) {
  if (filters.type && resource.Type !== filters.type) {
    return false;
  }
  if (filters.status && resource.Status !== filters.status) {
    return false;
  }
  if (filters.relatedIdeaId && splitList_(resource.RelatedIdeaIDs).indexOf(filters.relatedIdeaId) === -1) {
    return false;
  }
  if (filters.search) {
    var search = String(filters.search).toLowerCase();
    var haystack = [resource.Title, resource.Description, resource.Type, resource.Tags]
      .join(' ')
      .toLowerCase();
    if (haystack.indexOf(search) === -1) {
      return false;
    }
  }
  return true;
}

function matchesTaskFilters_(task, filters) {
  if (filters.ideaId && task.IdeaID !== filters.ideaId) {
    return false;
  }
  if (filters.status && task.Status !== filters.status) {
    return false;
  }
  if (filters.assignee && String(task.Assignee || '').toLowerCase() !== String(filters.assignee).toLowerCase()) {
    return false;
  }
  if (filters.search) {
    var haystack = [task.Title, task.Tags, task.Assignee, task.IdeaName].join(' ').toLowerCase();
    if (haystack.indexOf(String(filters.search).toLowerCase()) === -1) {
      return false;
    }
  }
  if (filters.dueFrom && task.DueDate && compareValues_(task.DueDate, filters.dueFrom) < 0) {
    return false;
  }
  if (filters.dueTo && task.DueDate && compareValues_(task.DueDate, filters.dueTo) > 0) {
    return false;
  }
  return true;
}

function splitList_(value) {
  return String(value || '')
    .split(',')
    .map(function (item) {
      return item.trim();
    })
    .filter(Boolean);
}

function buildPipelineSummary_(ideas) {
  var counts = {};
  IDEA_STAGES.forEach(function (stage) {
    counts[stage] = 0;
  });
  ideas.forEach(function (idea) {
    counts[idea.Stage] = (counts[idea.Stage] || 0) + 1;
  });

  return {
    byStage: IDEA_STAGES.map(function (stage) {
      return { stage: stage, count: counts[stage] || 0 };
    }),
    grouped: [
      { label: 'Inbox / Spark', count: (counts.Inbox || 0) + (counts.Spark || 0) },
      { label: 'Exploring / Validating', count: (counts.Exploring || 0) + (counts.Validating || 0) },
      { label: 'Planned / Building', count: (counts.Planned || 0) + (counts.Building || 0) },
      { label: 'Launched', count: counts.Launched || 0 },
      { label: 'Paused / Archived', count: (counts.Paused || 0) + (counts.Archived || 0) },
    ],
  };
}

function buildRecentInsights_(sessions) {
  var insights = [];
  sessions.forEach(function (session) {
    session.turns.forEach(function (turn) {
      if (turn.Agent !== 'Synthesis' && insights.length < 4) {
        insights.push({
          sessionId: session.sessionId,
          ideaId: session.ideaId,
          ideaName: session.ideaName,
          agent: turn.Agent,
          content: String(turn.Content || '').slice(0, 180),
          timestamp: turn.Timestamp,
        });
      }
    });
  });
  return insights;
}

function groupSessionRows_(rows) {
  return rows.reduce(function (accumulator, row) {
    var sessionId = row.SessionID;
    if (!accumulator[sessionId]) {
      accumulator[sessionId] = {
        sessionId: sessionId,
        ideaId: row.IdeaID || '',
        turns: [],
        complete: false,
        startedAt: row.Timestamp,
        updatedAt: row.Timestamp,
        synthesis: null,
        synthesisData: null,
        personas: [],
        summary: '',
      };
    }

    var session = accumulator[sessionId];
    var turn = serializeRecord_(row);
    session.turns.push(turn);
    session.updatedAt = row.Timestamp;
    if (row.Agent === 'Synthesis') {
      session.synthesisData = parseStoredSynthesis_(row.Content);
      session.complete = true;
      session.synthesis = turn;
      session.summary = String(session.synthesisData.summary || row.Content || '').slice(0, 140);
    } else if (session.personas.indexOf(row.Agent) === -1) {
      session.personas.push(row.Agent);
    }

    return accumulator;
  }, {});
}

function inferIdeaIdFromSession_(sessionId) {
  var session = getSessionProgress(sessionId);
  return session && session.ideaId ? session.ideaId : '';
}

function isIdeaDormant_(idea, thresholdDays) {
  if (!idea.LastBrainstormed) {
    return true;
  }
  var lastBrainstormed = new Date(idea.LastBrainstormed);
  if (isNaN(lastBrainstormed.getTime())) {
    return true;
  }
  var now = new Date();
  var deltaDays = (now.getTime() - lastBrainstormed.getTime()) / (1000 * 60 * 60 * 24);
  return deltaDays >= thresholdDays;
}

function isTaskOverdue_(task) {
  if (!task.DueDate || task.Status === 'Done') {
    return false;
  }
  var dueDate = new Date(task.DueDate);
  if (isNaN(dueDate.getTime())) {
    return false;
  }
  return dueDate.getTime() < new Date().getTime();
}

function parseStoredSynthesis_(value) {
  if (!value) {
    return {
      summary: '',
      nextAction: '',
      suggestedStage: '',
      keyInsights: [],
    };
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return {
      summary: String(value),
      nextAction: '',
      suggestedStage: '',
      keyInsights: [],
    };
  }
}

function getSessionMeta_(sessionId) {
  var raw = PropertiesService.getScriptProperties().getProperty('SESSION_META_' + sessionId);
  if (!raw) {
    return {
      ideaId: '',
      mode: '',
      createdAt: '',
    };
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return {
      ideaId: '',
      mode: '',
      createdAt: '',
    };
  }
}

function storeSessionMeta_(sessionId, meta) {
  PropertiesService.getScriptProperties().setProperty('SESSION_META_' + sessionId, JSON.stringify(meta));
}

function clearSessionMeta_() {
  var properties = PropertiesService.getScriptProperties();
  properties
    .getKeys()
    .filter(function (key) {
      return key.indexOf('SESSION_META_') === 0;
    })
    .forEach(function (key) {
      properties.deleteProperty(key);
    });
}

function detectModeFromPersonasServer_(personas) {
  var normalized = (personas || []).slice().sort().join('|');
  var matched = Object.keys(BRAINSTORM_MODES).find(function (mode) {
    return BRAINSTORM_MODES[mode].slice().sort().join('|') === normalized;
  });
  return matched || '';
}
