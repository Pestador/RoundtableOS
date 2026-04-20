function checkDormantIdeas() {
  var settings = getSettings();
  if (String(settings.notificationsEnabled) !== 'true') {
    return { sent: false, reason: 'Notifications disabled.' };
  }

  var threshold = Number(settings.dormantIdeaThreshold || 30);
  var dormantIdeas = getIdeas({}).filter(function (idea) {
    return isIdeaDormant_(idea, threshold) && idea.Stage !== 'Archived' && idea.Stage !== 'Killed';
  });

  if (!dormantIdeas.length) {
    return { sent: false, count: 0 };
  }

  sendDigestEmail_(
    'Dormant ideas need attention',
    [
      'These ideas have been dormant for ' + threshold + '+ days:',
      '',
    ]
      .concat(
        dormantIdeas.map(function (idea) {
          return '- ' + idea.Name + ' (' + idea.Stage + '): ' + (idea.NextAction || 'Review the next action');
        })
      )
      .join('\n')
  );

  return { sent: true, count: dormantIdeas.length };
}

function checkOverdueTasks() {
  var settings = getSettings();
  if (String(settings.notificationsEnabled) !== 'true') {
    return { sent: false, reason: 'Notifications disabled.' };
  }

  var overdue = getTasks({}).filter(function (task) {
    return task.IsOverdue;
  });

  if (!overdue.length) {
    return { sent: false, count: 0 };
  }

  sendDigestEmail_(
    'Overdue Roundtable tasks',
    ['The following tasks are overdue:', '']
      .concat(
        overdue.map(function (task) {
          return '- ' + task.Title + ' [' + task.Status + '] for ' + task.IdeaName;
        })
      )
      .join('\n')
  );

  return { sent: true, count: overdue.length };
}

function checkUnfinishedSessions() {
  var settings = getSettings();
  if (String(settings.notificationsEnabled) !== 'true') {
    return { sent: false, reason: 'Notifications disabled.' };
  }

  var unfinished = getSessionHistory({}).filter(function (session) {
    return !session.complete;
  });

  if (!unfinished.length) {
    return { sent: false, count: 0 };
  }

  sendDigestEmail_(
    'Unfinished brainstorm sessions',
    ['The following sessions do not yet have a synthesis:', '']
      .concat(
        unfinished.map(function (session) {
          return '- ' + session.ideaName + ' (' + session.personas.join(', ') + ')';
        })
      )
      .join('\n')
  );

  return { sent: true, count: unfinished.length };
}

function installTriggers() {
  removeTriggersByHandler_('checkDormantIdeas');
  removeTriggersByHandler_('checkOverdueTasks');
  removeTriggersByHandler_('checkUnfinishedSessions');

  ScriptApp.newTrigger('checkDormantIdeas').timeBased().everyDays(1).create();
  ScriptApp.newTrigger('checkOverdueTasks').timeBased().everyDays(1).create();
  ScriptApp.newTrigger('checkUnfinishedSessions').timeBased().everyDays(1).create();

  return { installed: true };
}

function removeTriggersByHandler_(handlerName) {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === handlerName) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

function sendDigestEmail_(subject, body) {
  var settings = getSettings();
  var recipient = settings.userEmail || Session.getActiveUser().getEmail();
  if (!recipient) {
    Logger.log('Skipping email because no recipient is configured.');
    return false;
  }
  GmailApp.sendEmail(recipient, '[Roundtable OS] ' + subject, body);
  return true;
}
