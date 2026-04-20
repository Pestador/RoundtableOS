# Roundtable OS Lightweight – Product Requirements Document

## Objective

Deliver a streamlined version of the Roundtable Operating System (RTOS) using only Google Sheets and Google Apps Script. This lightweight system should capture ideas, support multi‑agent brainstorming via calls to an external LLM, maintain a resource vault, provide basic decision support and send reminders. It is intended for rapid deployment and small teams who want to experiment before investing in a more complex backend.

## Problem Statement

Creative professionals often need a place to store ideas and develop them with feedback. However, building a full stack with databases and orchestration frameworks is overkill for early stages or small projects. A Google Sheets + Apps Script solution can provide essential structure without infrastructure overhead.

## Stakeholders

- **Primary User:** A person who wants to capture and refine ideas but has limited resources for hosting servers or databases.

- **Collaborators:** Team members who will review ideas, participate in brainstorms and manage tasks.

- **Developer:** Person configuring the spreadsheet and writing Apps Script code.

## Success Metrics

- **Adoption:** At least five active users in the first month.

- **Idea Capture:** 90 % of new ideas are captured with at least minimal information.

- **Brainstorm Completion:** 80 % of brainstorm sessions reach a decision (pursue, validate, pause or archive).

- **Reminder Response:** 70 % of dormant ideas receive a follow‑up action within a week of reminders.

- **System Stability:** Apps Script quotas are not exceeded under typical usage.

## User Stories

1. **Add Idea**

1. *As a user, I want to add a new idea using a simple form so that it’s captured in the system.*

1. **Acceptance:** A web form (or custom menu) appends a row to the Ideas sheet with the provided data.

1. **Run Brainstorm**

1. *As a user, I want to run a brainstorm session on an idea using named agents.*

1. **Acceptance:** Selecting an idea and brainstorm mode triggers Apps Script to call the LLM for each agent persona and record responses in the Sessions sheet.

1. **View Ideas**

1. *As a user, I want to see a list of my ideas grouped by stage.*

1. **Acceptance:** The web app displays a table or dashboard summarising ideas by stage.

1. **Log Resources**

1. *As a user, I want to save tools, models and other resources to reuse later.*

1. **Acceptance:** A form inserts a row into the Resources sheet; the resource can be linked to one or more ideas via the RelatedIdeaIDs column.

1. **Receive Reminders**

1. *As a user, I want to get an email when an idea hasn’t been updated in 30 days.*

1. **Acceptance:** A time‑driven trigger checks the LastBrainstormed column and sends emails via Gmail service for stale ideas.

## Functional Requirements

| Requirement | Description | Priority |
| --- | --- | --- |
| **Idea Capture Form** | HTML form served from doGet(e) and custom menu actions to input idea details; writes to Ideas sheet. | High |
| **Sessions Logging** | Functions to create new session IDs and write agent responses to Sessions sheet. | High |
| **Personas Implementation** | Define six personas and assemble prompts for each; call external LLM via URLFetchApp (Apps Script’s HTTP client). | High |
| **Decision Calculation** | Compute basic scores (uniqueness, usefulness, etc.) using heuristics or ask the LLM; store in Ideas sheet. | Medium |
| **Resource Vault** | CRUD operations for resources in Resources sheet; ability to link resources to ideas. | Medium |
| **Tasks Tracker** | Represent tasks in Tasks sheet with status and due dates; send email notifications on due dates. | Medium |
| **Reminders System** | Time‑driven trigger that checks for dormant ideas and unfinished sessions; sends email reminders. | Medium |
| **Web App Deployment** | Implement doGet(e) (and optionally doPost(e)) to serve forms/dashboards and publish as a web app[[1]](https://developers.google.com/apps-script/guides/web#:~:text=,apps%20accessible%20from%20a%20browser). | High |
| **Permissions Management** | Use Google Drive and Apps Script sharing settings to control who can access the sheets and web app. | High |

## Non‑Functional Requirements

- **Scalability:** Must handle up to ~500 ideas, ~500 resources and ~1000 session rows comfortably; beyond that, performance may degrade.

- **Availability:** Dependent on Google infrastructure; users must have a Google account to access the spreadsheet and web app.

- **Data Security:** Access is controlled by Google account permissions. API keys and sensitive data are stored in script properties.

- **Performance:** Brainstorm functions should complete within 30 seconds per agent call, subject to external API latency.

- **Reliability:** Apps Script quotas (daily execution time, HTTP calls) must not be exceeded. Use caching (PropertiesService) where possible.

## Milestones

1. **Setup (Week 1)**

1. Create the spreadsheet with Ideas, Resources, Sessions and Tasks sheets.

1. Set up the Apps Script project and bind it to the sheet.

1. Define the data models and write helper functions for reading/writing rows.

1. **Idea Capture & Display (Week 2)**

1. Build the HTML form for adding ideas and publishing via web app.

1. Create a dashboard to list ideas grouped by stage.

1. **Brainstorm Engine (Week 3)**

1. Implement the persona prompts and call the external LLM via UrlFetchApp.

1. Record sessions in the Sessions sheet. Compute simple scores and update Ideas sheet.

1. **Resources & Tasks (Week 4)**

1. Build forms to add resources and tasks.

1. Link resources to ideas; send notifications for due tasks.

1. **Reminder & Deployment (Week 5)**

1. Implement triggers for dormant ideas and unfinished sessions.

1. Finalise the web app deployment and adjust permissions.

1. **Feedback & Iteration (Week 6+)**

1. Collect user feedback, refine heuristics and improve UI. Consider migrating to the more robust architecture when needed.

## Assumptions & Constraints

- Users have Google accounts and can access Google Sheets and Apps Script.

- External LLM access requires an API key; quotas and costs are the user’s responsibility.

- The system is not intended for high‑volume or mission‑critical use. It serves as an entry‑level tool.

## Appendix

- Apps Script supports publishing scripts with a user interface as web apps; the script must implement doGet(e) or doPost(e) and return an HtmlOutput or TextOutput, and you deploy it via the Deploy menu[[1]](https://developers.google.com/apps-script/guides/web#:~:text=,apps%20accessible%20from%20a%20browser).

[Image omitted]

[[1]](https://developers.google.com/apps-script/guides/web#:~:text=,apps%20accessible%20from%20a%20browser) Web Apps | Apps Script | Google for Developers

[https://developers.google.com/apps-script/guides/web](https://developers.google.com/apps-script/guides/web)
