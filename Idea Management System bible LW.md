# The Roundtable OS Lightweight Bible

## Vision and Purpose

The **lightweight** version of the Roundtable Operating System (RTOS) delivers the core idea‑capture and brainstorming functionality using familiar Google Workspace tools. It is intended for rapid deployment and low‑complexity environments where a full backend stack is not practical. This version leverages **Google Sheets** as the primary data store and **Google Apps Script** as the execution environment. It provides a persistent idea bank, a resource vault, a multi‑agent brainstorming engine and simple decision support.

This document describes how to design, build and operate the lightweight RTOS. A more robust architecture based on PostgreSQL and LangGraph is also available in the non‑lightweight bible; this version focuses on simplicity and accessibility.

## Core Principles

1. **Zero Infrastructure:** Use only Google Sheets and Apps Script. No separate servers or databases.

1. **Simple Data Model:** Represent ideas, resources, sessions and tasks as rows in dedicated sheets.

1. **Web‑Based Interface:** Publish Apps Script as a web app accessible via URL; provide forms and dashboards[[1]](https://developers.google.com/apps-script/guides/web#:~:text=,apps%20accessible%20from%20a%20browser).

1. **Agent Simulation:** Implement human‑like agents by orchestrating prompts to an external LLM. Store their outputs in Sheets.

1. **Basic Decision Support:** Compute scores and next steps using Apps Script functions. Limit complexity to what can be handled in Sheets.

1. **User Ownership:** Data lives in the user’s Google account. Sharing and permissions are managed through Google Drive.

## High‑Level Architecture

The lightweight RTOS comprises four Google Sheets and an Apps Script project:

- **Ideas Sheet** (Ideas): Stores all ideas with metadata. Each row is an idea.

- **Resources Sheet** (Resources): Contains metadata about tools, AI models, apps, books, videos and other references.

- **Sessions Sheet** (Sessions): Captures brainstorming conversations (each row corresponds to a turn). There may be additional sheets for transcripts.

- **Tasks Sheet** (Tasks): Stores execution tasks and reminders.

An **Apps Script** project bound to the spreadsheet performs the following:

- Provides custom menus for adding ideas, running brainstorm sessions and generating scores.

- Contains functions to call an external LLM (via a REST API) to simulate the personas (Kai, Nova, Rex, Sage, Luna and Nia).

- Implements doGet/doPost handlers and publishes the script as a web app so that users can interact via a browser[[1]](https://developers.google.com/apps-script/guides/web#:~:text=,apps%20accessible%20from%20a%20browser).

- Schedules triggers to send email reminders for dormant ideas and unfinished sessions.

## Detailed Modules

### Idea Bank (Ideas Sheet)

Create a sheet named **Ideas** with the following columns:

| Column | Description |
| --- | --- |
| ID | Unique identifier (e.g., timestamp or Apps Script UUID). |
| Name | One‑line title of the idea. |
| Summary | Brief description. |
| Category | Product, service, research, etc. |
| ProblemSolved | Problem statement. |
| TargetUsers | Intended audience. |
| UniqueValue | What makes the idea different. |
| Stage | Inbox, Spark, Exploring, Validating, Planned, Building, Launched, Paused, Archived, Killed. |
| PriorityScore | Computed numeric score. |
| NextAction | Suggested next step. |
| LastBrainstormed | Date of last session. |
| ParentID | ID of parent idea (for spin‑offs). |
| Tags | Comma‑separated labels. |

When a user captures an idea, Apps Script appends a new row. Edits are done directly in the sheet. Use data validation to restrict the Stage field.

### Resource Vault (Resources Sheet)

Create a sheet named **Resources** with columns:

| Column | Description |
| --- | --- |
| ID | Unique identifier. |
| Title | Name of the resource. |
| Type | App, AI model, book, video, dataset, tool, etc. |
| Description | Short summary. |
| URL | Link to resource (can be a Google Drive link). |
| ReleaseDate | Date of release or discovery. |
| Status | Saved, Tested, Useful, Revisit, Deprecated. |
| Tags | Comma‑separated labels. |
| RelatedIdeaIDs | Comma‑separated list of idea IDs. |

For large files (e.g., PDFs, videos), store them in Google Drive and put the drive URL here. Sharing permissions follow the user’s Drive settings.

### Sessions Sheet

The **Sessions** sheet logs conversation turns. Suggested columns:

| Column | Description |
| --- | --- |
| SessionID | Unique identifier linking to an idea. |
| Turn | Sequential number. |
| Agent | Name of the persona (Kai, Nova, etc.). |
| Content | Text of what the agent said. |
| Timestamp | Date and time. |

When a brainstorm starts, Apps Script writes a new SessionID and records each turn. A separate sheet or cell may store the final summary.

### Tasks Sheet

The **Tasks** sheet acts as the execution tracker. Columns include:

| Column | Description |
| --- | --- |
| TaskID | Unique identifier. |
| IdeaID | ID of the linked idea. |
| Title | Description of the task. |
| Status | Todo, InProgress, Blocked, Done. |
| Assignee | Person responsible. |
| DueDate | Due date. |
| Tags | Labels. |

Apps Script can send task notifications via Gmail service and update statuses.

### Roundtable Engine & Personas

Implement the six personas in Apps Script by composing prompts. Each persona has a role, goal and backstory. For example:

- **Kai (Visionary)**: Adds creative angles and new possibilities.

- **Nova (Strategist)**: Defines business model and market positioning.

- **Rex (Builder)**: Focuses on technical feasibility and MVP features.

- **Sage (Critic)**: Identifies risks and problems.

- **Luna (User Advocate)**: Looks from the end‑user perspective.

- **Nia (Execution Controller)**: Prioritises and assigns next steps.

A brainstorming function executes like this:

1. **Input:** Idea details (name, summary, problem solved, etc.)

1. **For each persona:** Compose a prompt using the persona’s role, goal and the idea details. Call the external LLM API; record the response in the Sessions sheet.

1. **Synthesis:** Optionally compose a final summary and compute scores.

### Decision Engine

For the lightweight version, compute scores in Apps Script using simple heuristics. For example:

function computeScores(problemSolved, uniqueValue) {
// Example: shorter problem statements = higher usefulness
var usefulness = Math.min(1, problemSolved.length / 200);
var uniqueness = Math.min(1, uniqueValue.length / 200);
// Combine scores
var priority = 0.5 * usefulness + 0.5 * uniqueness;
return {usefulness: usefulness, uniqueness: uniqueness, priority: priority};
}

Use similar formulas for revenue and feasibility or ask the LLM to generate numeric estimates. Store scores in the PriorityScore column. Based on the score, suggest a next action (e.g., “Validate”, “Prototype”, “Pause”).

### Reminder & Recall

Apps Script can schedule triggers (e.g., daily or weekly) to run functions. Use them to:

- **Dormant Ideas:** Check ideas where LastBrainstormed is older than 30 days. Send an email via Gmail service reminding the user to revisit.

- **Unfinished Sessions:** Identify sessions without a decision. Send a reminder to complete the brainstorm.

- **Resource Matches:** When a new resource is added, search for matching tags among ideas and send a notification.

### Web App & UI

Publish the Apps Script as a web app with doGet(e) to render an HTML interface and doPost(e) to handle form submissions[[1]](https://developers.google.com/apps-script/guides/web#:~:text=,apps%20accessible%20from%20a%20browser). The interface can include:

- Idea capture form.

- Buttons to start brainstorm sessions (mode selection). Clicking a mode triggers an Apps Script function that calls the LLM and writes to the Sessions sheet.

- Dashboards using Google Charts or Data Studio to visualise idea stages, top scores, resource counts, etc.

To deploy:

1. Open the script editor (Extensions → Apps Script).

1. Implement doGet(e) to return HtmlService.createHtmlOutput(...).

1. Deploy > New deployment > Select type > Web app[[1]](https://developers.google.com/apps-script/guides/web#:~:text=,apps%20accessible%20from%20a%20browser).

1. Set permissions (execute as script owner; anyone with the link or specific users).

### Security & Permissions

Because the lightweight RTOS runs entirely within Google Workspace, data security relies on Google’s existing access controls. Ensure that:

- Only trusted collaborators have edit permissions on the spreadsheet and script.

- External API keys (for LLM) are stored in script properties.

- The web app executes as the owner to access the sheets but restricts who can run it.

### Limitations

- **Scalability:** Google Sheets has a cell limit (~5 million cells per spreadsheet) and performance may degrade with thousands of rows. This version is best for small to medium collections of ideas and resources.

- **Concurrency:** Apps Script has quota limits (execution time, number of function calls). High usage may hit quotas. Heavy tasks (e.g., embedding computations) are not suitable.

- **Similarity Search:** Without pgvector, duplicate detection is limited. You can perform naive text similarity or call an external vector service.

- **Observability:** Logging is limited to Apps Script’s Logs; there is no built‑in tracing like LangGraph. For debugging, use Logger.log() and the execution transcript.

### Future Upgrade Path

When the lightweight system becomes limiting, migrate to the non‑lightweight architecture (PostgreSQL + LangGraph) described in the other bible. Use the same data model as far as possible to ease migration.

[Image omitted]

## Citations

- Google Apps Script can be published as a web app accessible from a browser; the script must include a doGet(e) or doPost(e) function that returns an HtmlOutput or TextOutput and can be deployed via the Deploy menu[[1]](https://developers.google.com/apps-script/guides/web#:~:text=,apps%20accessible%20from%20a%20browser).

[Image omitted]

[[1]](https://developers.google.com/apps-script/guides/web#:~:text=,apps%20accessible%20from%20a%20browser) Web Apps | Apps Script | Google for Developers

[https://developers.google.com/apps-script/guides/web](https://developers.google.com/apps-script/guides/web)
