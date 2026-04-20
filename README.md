# Roundtable OS Lightweight

Roundtable OS Lightweight is a Google Sheets + Google Apps Script idea management web app with a hash-routed SPA frontend, a sheet-backed CRUD layer, a multi-persona brainstorming engine, reminders, and a design system based on the provided Editorial Engine screens.

## Included Files

- `Code.gs` - spreadsheet setup, CRUD, dashboard queries, settings, and route helpers
- `LLM.gs` - brainstorm engine, persona prompts, provider switching, and synthesis generation
- `Scoring.gs` - heuristic scoring and next-action logic
- `Reminders.gs` - dormant idea, overdue task, and unfinished session reminders plus trigger installation
- `index.html` - SPA shell
- `styles.html` - Tailwind config, fonts, and shared utility classes
- `dashboard.html`, `ideas.html`, `new-spark.html`, `idea-detail.html`, `brainstorm.html`, `resources.html`, `tasks.html`, `settings.html` - route partials
- `api.js.html` - promise-based `google.script.run` wrapper
- `utils.js.html` - router, client state, components, drawers, modals, toasts, and interaction wiring
- `appsscript.json` - Apps Script manifest
- `scripts/validate-app.ps1` - local syntax and manifest validation before any push
- `scripts/push-app-source.ps1` - push local source into the bound Apps Script project without changing the live web app
- `scripts/redeploy-webapp.ps1` - push, version, and redeploy a specific Apps Script web app deployment

## Safe Update Workflow

Use this loop so the live deployment is never your first test:

1. Make the code changes locally in this workspace.
2. Run local validation:
   - `powershell -ExecutionPolicy Bypass -File .\scripts\validate-app.ps1`
3. Push source only into Apps Script when validation is clean:
   - `powershell -ExecutionPolicy Bypass -File .\scripts\push-app-source.ps1`
4. Test in the bound Apps Script project or a non-production deployment.
5. Only after that, redeploy the live web app:
   - `powershell -ExecutionPolicy Bypass -File .\scripts\redeploy-webapp.ps1 -DeploymentId "<your deployment id>" -Description "Short release note"`

The important distinction is:

- `push-app-source.ps1` updates the project source
- `redeploy-webapp.ps1` changes what the live site serves

If you want one command instead of the full sequence, use:

- `powershell -ExecutionPolicy Bypass -File .\scripts\save-and-deploy.ps1 -CommitMessage "short message" -DeploymentId "<your deployment id>" -ReleaseNote "short release note"`

That wrapper runs validation, git save/push, Apps Script source push, and live redeploy in one pass.

## Git And GitHub Setup

Recommended branch model for this lightweight Apps Script repo:

- `main` - mirrors the currently trusted production-ready state
- feature branches - one branch per change before merging back into `main`

Suggested first-time setup:

1. Initialize git locally:
   - `git init -b main`
2. Add the repo files:
   - `git add .`
3. Make the first checkpoint commit:
   - `git commit -m "Initial Roundtable OS source snapshot"`
4. Create an empty GitHub repository in your browser.
5. Connect the local repo to GitHub:
   - `git remote add origin https://github.com/<your-account>/<repo-name>.git`
6. Push the local `main` branch:
   - `git push -u origin main`

Recommended day-to-day flow:

1. `git checkout -b feature/<short-name>`
2. Make changes
3. Run `.\scripts\validate-app.ps1`
4. Commit locally
5. Push the feature branch to GitHub
6. Merge into `main` only when the change is validated
7. Redeploy the live Apps Script deployment from that known-good state

## 1. Create the Spreadsheet

1. Create a new Google Spreadsheet.
2. Name it something like `Roundtable OS Lightweight`.
3. Open `Extensions > Apps Script` to create a bound Apps Script project.

The project expects these sheet tabs:

- `Ideas`
- `Resources`
- `Sessions`
- `Tasks`

You do not need to create them manually if you plan to run `setupSpreadsheet()`, but it is fine if you do.

## 2. Add the Source Files

You can bring the source into Apps Script in either of these ways:

1. Copy and paste each file into the bound Apps Script project.
2. Use `clasp` and push this workspace into the bound project.

Create matching Apps Script files for:

- `.gs` files:
  - `Code`
  - `LLM`
  - `Scoring`
  - `Reminders`
- `.html` files:
  - `index`
  - `styles`
  - `dashboard`
  - `ideas`
  - `new-spark`
  - `idea-detail`
  - `brainstorm`
  - `resources`
  - `tasks`
  - `settings`
  - `api.js`
  - `utils.js`

Also copy the contents of `appsscript.json` into the project manifest.

## 3. Run the Spreadsheet Bootstrap

1. In the Apps Script editor, choose the `setupSpreadsheet` function.
2. Run it once.
3. Approve the requested permissions.

What it does:

- Creates or normalizes the `Ideas`, `Resources`, `Sessions`, and `Tasks` sheets
- Writes the expected header row for each sheet
- Freezes the header row
- Applies data validation to:
  - `Ideas.Stage`
  - `Resources.Status`
  - `Tasks.Status`
- Stores the linked spreadsheet ID in Script Properties

The `Sessions` schema used by this build is:

`SessionID | IdeaID | Turn | Agent | Content | Timestamp`

## 4. Configure Script Properties

Open `Project Settings > Script Properties` and add the active-provider fields plus whichever provider keys you want available:

- `ACTIVE_LLM_PROVIDER`
- `DEEPSEEK_API_KEY`
- `DEEPSEEK_MODEL`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL`

Recommended starting values:

- DeepSeek:
  - `ACTIVE_LLM_PROVIDER = deepseek`
  - `DEEPSEEK_MODEL = deepseek-chat`
- Gemini:
  - `GEMINI_MODEL = gemini-2.5-flash`
- OpenRouter:
  - `OPENROUTER_MODEL = openai/gpt-4o-mini`
- OpenAI:
  - `OPENAI_MODEL = gpt-4o`
- Anthropic:
  - `ANTHROPIC_MODEL = claude-sonnet-4-20250514`

Legacy compatibility is still included through:

- `LLM_API_KEY`
- `LLM_PROVIDER`
- `LLM_MODEL`

Those legacy properties are migration fallbacks only. The current settings UI reads and writes the provider-specific properties instead. You can also configure all of this from the app's `Settings` page after deployment, and raw secrets are never returned to the client.

## 5. Install Reminder Triggers

1. In Apps Script, run `installTriggers()` once.
2. Approve permissions for Gmail and trigger creation.

This installs daily time-driven triggers for:

- `checkDormantIdeas`
- `checkOverdueTasks`
- `checkUnfinishedSessions`

## 6. Deploy the Web App

1. In Apps Script, click `Deploy > New deployment`.
2. Choose `Web app`.
3. Set:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone with the link` or the narrower option your workspace needs
4. Deploy.
5. Open the deployment URL.

The app is a single-page interface with these routes:

- `#dashboard`
- `#ideas`
- `#ideas/new`
- `#ideas/:id`
- `#brainstorm`
- `#brainstorm/history`
- `#resources`
- `#tasks`
- `#settings`

## 7. First-Use Walkthrough

1. Open `Settings` and confirm the active provider, per-provider models, user name, and email.
2. Enter the selected provider key and use `Test Selected Provider` to verify the connection.
3. Create a first idea from `New Spark`.
4. Open the idea detail page and launch a brainstorm.
5. Add at least one resource and one task to confirm the linked flows work.

## Data Model Summary

### Ideas

`ID | Name | Summary | Category | ProblemSolved | TargetUsers | UniqueValue | Stage | PriorityScore | NextAction | LastBrainstormed | ParentID | Tags`

### Resources

`ID | Title | Type | Description | URL | ReleaseDate | Status | Tags | RelatedIdeaIDs`

### Sessions

`SessionID | IdeaID | Turn | Agent | Content | Timestamp`

### Tasks

`TaskID | IdeaID | Title | Status | Assignee | DueDate | Tags`

## Brainstorm Flow

The live brainstorming flow is progressive:

1. `createSession(ideaId, mode)` creates a unique session
2. The client calls `runNextBrainstormTurn(sessionId, ideaId, mode, turnIndex)` once per persona
3. Each turn is written to the `Sessions` sheet immediately
4. After the last persona turn, synthesis is generated and appended
5. The idea's `PriorityScore`, `NextAction`, and `LastBrainstormed` values are updated

Supported visible modes:

- `Full Roundtable`
- `Quick Spark`
- `Challenge Mode`
- `Strategy Deep-Dive`

## Notes on Local Preview

The client-side app relies on `google.script.run`, so the UI is meant to run inside Apps Script's web app environment. The source in this workspace is the importable project source, not a standalone Node or Vite app.

## Runbook

### Missing API key

- Symptom: brainstorm sessions return a fallback note about missing credentials
- Fix: open `Settings`, save a valid key for the active provider, and test that provider again

### Spreadsheet header mismatch

- Symptom: CRUD functions throw missing column or missing sheet errors
- Fix: run `setupSpreadsheet()` again to normalize headers and validations

### LLM API errors or quota failures

- Symptom: brainstorm turns complete with fallback content instead of live persona output
- Fix: check `ACTIVE_LLM_PROVIDER`, the matching provider model property, billing or quota limits, and that the matching provider key is valid

### Trigger installation needs to be refreshed

- Symptom: daily reminder functions do not appear under `Triggers` or stop firing after spreadsheet changes
- Fix: run `installTriggers()` again from Apps Script and remove stale duplicate triggers if they exist

### Reminder triggers missing

- Symptom: no dormant-idea or overdue-task emails arrive
- Fix: run `installTriggers()` again and confirm authorization

### Session history looks stale

- Symptom: recent sessions or dashboard stats do not reflect the latest run immediately
- Fix: refresh the route in the app or reopen the web app; sheet-backed state is persistent

## Verification Checklist

- `setupSpreadsheet()` runs successfully on a blank bound spreadsheet
- `Settings > Test Selected Provider` succeeds with valid credentials
- Creating an idea appends a row to `Ideas`
- Creating a resource appends a row to `Resources`
- Creating and moving tasks updates the `Tasks` sheet
- Brainstorm turns append one row at a time to `Sessions`
- Final synthesis updates the linked idea score and next action
- Reminder functions run manually without throwing errors
