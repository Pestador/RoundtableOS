function computePriorityScore(ideaOrId) {
  var idea = typeof ideaOrId === 'string' ? getIdeaById(ideaOrId) : ideaOrId;
  if (!idea) {
    throw new Error('Cannot score a missing idea.');
  }

  var breakdown = computePriorityBreakdown_(idea);
  if (idea.ID) {
    var current = getRecordById_('Ideas', 'ID', idea.ID);
    if (current) {
      var updated = mergeIdeaRecord_(current.record, {
        PriorityScore: roundNumber_(breakdown.priority, 3),
        NextAction: suggestNextAction(breakdown.priority, idea.Stage),
      });
      updateRecordByRow_('Ideas', current.rowIndex, updated);
    }
  }
  return serializeRecord_(breakdown);
}

function computePriorityBreakdown_(idea) {
  var problemLength = clamp01_(String(idea.ProblemSolved || '').trim().length / 220);
  var uniqueLength = clamp01_(String(idea.UniqueValue || '').trim().length / 220);
  var summaryLength = clamp01_(String(idea.Summary || '').trim().length / 180);
  var audienceDefined = idea.TargetUsers ? 1 : 0;
  var tagDensity = clamp01_(splitList_(idea.Tags).length / 5);
  var stageMomentum = computeStageMomentum_(idea.Stage);

  var usefulness = roundNumber_(0.45 * problemLength + 0.25 * summaryLength + 0.2 * audienceDefined + 0.1 * tagDensity, 3);
  var uniqueness = roundNumber_(0.7 * uniqueLength + 0.2 * tagDensity + 0.1 * stageMomentum, 3);
  var priority = roundNumber_(0.5 * usefulness + 0.5 * uniqueness, 3);

  return {
    usefulness: usefulness,
    uniqueness: uniqueness,
    priority: priority,
    nextAction: suggestNextAction(priority, idea.Stage),
  };
}

function suggestNextAction(score, stage) {
  score = Number(score || 0);
  if (stage === 'Paused' || stage === 'Archived' || stage === 'Killed') {
    return 'Decide whether to revive, archive permanently, or close the loop with one last review.';
  }
  if (score < 0.3) {
    return 'Pause and revisit the core problem before spending more energy on the concept.';
  }
  if (score < 0.45) {
    return 'Validate the riskiest assumption with a small user interview or desk research pass.';
  }
  if (score < 0.65) {
    return 'Define the smallest testable version and schedule one validation experiment this week.';
  }
  if (score < 0.8) {
    return 'Build a focused MVP brief with scope, owner, and a success metric.';
  }
  return 'Commit to a seven-day execution sprint and move the strongest idea toward build readiness.';
}

function suggestStageFromScore_(score, currentStage) {
  var currentIndex = IDEA_STAGES.indexOf(currentStage);
  if (currentIndex === -1) {
    return currentStage || 'Spark';
  }

  if (score < 0.3) {
    return currentStage === 'Killed' ? 'Killed' : 'Paused';
  }
  if (score >= 0.75 && currentIndex < IDEA_STAGES.indexOf('Building')) {
    return IDEA_STAGES[Math.min(currentIndex + 1, IDEA_STAGES.indexOf('Building'))];
  }
  if (score >= 0.5 && currentIndex < IDEA_STAGES.indexOf('Validating')) {
    return IDEA_STAGES[Math.min(currentIndex + 1, IDEA_STAGES.indexOf('Validating'))];
  }
  return currentStage;
}

function computeStageMomentum_(stage) {
  switch (stage) {
    case 'Inbox':
      return 0.15;
    case 'Spark':
      return 0.25;
    case 'Exploring':
      return 0.45;
    case 'Validating':
      return 0.6;
    case 'Planned':
      return 0.7;
    case 'Building':
      return 0.8;
    case 'Launched':
      return 1;
    case 'Paused':
      return 0.2;
    case 'Archived':
      return 0.1;
    case 'Killed':
      return 0;
    default:
      return 0.25;
  }
}

function clamp01_(value) {
  value = Number(value || 0);
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}
