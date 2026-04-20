# Roundtable OS Lightweight — Master Coding Prompt
### For Claude Code / OpenAI Codex / Autonomous Coding Agents

---

## ⚠️ CRITICAL INSTRUCTIONS — READ BEFORE WRITING A SINGLE LINE

Before doing anything else, and before starting any new feature or section, you **MUST**:

1. **Re-read `Idea_Management_System_bible_LW.md`** — this is the architectural authority. All data models, module descriptions, persona definitions, sheet structures, and scoring logic come from here. Do not deviate from it.
2. **Re-read `Idea_Management_System_prd_LW.md`** — this is the product requirements authority. All functional requirements, user stories, acceptance criteria, priorities and milestones come from here.
3. **Re-read `Designcode.md`** — this is the design system authority. All colors, typography, spacing, component patterns, and class names come from here. Do not invent a new design language.
4. **Open the screens ZIP file** — extract and inspect every PNG/image in the screens package. These screens show **real designed states** of specific views. Treat them as ground truth for those views. For views, tabs, modals, and states that are **not** covered by the screens, you must **invent additional UI that is fully consistent** with the design system established in the provided screens and `Designcode.md`. The design is a **foundation to build on, not a ceiling**.

> If at any point you are uncertain whether a UI choice matches the design system, go back to `Designcode.md` and the provided screens before making a decision.

---

## Project Summary

You are building **Roundtable OS Lightweight (RTOS-LW)** — a full-stack idea management and multi-agent brainstorming web application. The backend is **Google Sheets + Google Apps Script**. The frontend is a **web app published via Apps Script's `doGet(e)` handler** (or optionally a standalone HTML/JS frontend that connects to the Apps Script as an API backend, if that is architecturally cleaner).

This system allows a user (or small team) to:
- Capture ideas and track them through a lifecycle (Inbox → Spark → Exploring → Validating → Planned → Building → Launched → Paused → Archived → Killed)
- Run structured brainstorming sessions with six AI personas powered by an external LLM (via the Anthropic API or OpenAI API — configurable)
- Maintain a searchable Resource Vault
- Track tasks on a Kanban board
- Receive automated email reminders for dormant ideas and overdue tasks
- View a personalized dashboard with priority scores, activity feed, and quick actions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Data store | Google Sheets (4 sheets: Ideas, Resources, Sessions, Tasks) |
| Backend / Execution | Google Apps Script (bound to the spreadsheet) |
| HTTP client (in Apps Script) | `UrlFetchApp` for calling the LLM API |
| Frontend | HTML + Tailwind CSS (served via `HtmlService` from Apps Script) OR a static SPA if decoupled |
| Fonts | Manrope (headlines), Inter (body/label) — Google Fonts |
| Icons | Material Symbols Outlined (Google Fonts CDN) |
| UI Framework | Tailwind CSS (loaded from CDN with the exact config defined in `Designcode.md`) |
| Email | Gmail Service (Apps Script built-in) |
| Scheduling | Apps Script time-driven triggers |
| API Key storage | Apps Script `PropertiesService.getScriptProperties()` |

---

## Design System Rules — NON-NEGOTIABLE

Extract the **complete Tailwind config** from `Designcode.md` and use it as-is. Do not add new colors or override values. The key rules are:

### Colors
Use only the semantic tokens defined in the config. The most important ones are:
- **`primary`** `#5148d8` — brand color, active states, CTAs
- **`primary-container`** `#bdbaff` — chip backgrounds, icon containers
- **`on-primary-container`** `#2c18b6` — text on primary containers
- **`secondary`** `#006b62` — secondary actions
- **`secondary-container`** `#91feef` — secondary chips
- **`tertiary`** `#742fe5` — accent / highlight
- **`tertiary-container`** `#c7abff` — accent containers
- **`surface`** `#f7f9fb` — page background
- **`surface-container-lowest`** `#ffffff` — card backgrounds
- **`surface-container-low`** `#f1f4f6` — sidebar background
- **`surface-container`** `#eaeef1` — subtle container
- **`surface-container-high`** `#e3e9ec` — hover state
- **`surface-container-highest`** `#dde3e7` — search input background, dividers
- **`on-surface`** `#2d3337` — primary text
- **`on-surface-variant`** `#596063` — secondary text
- **`outline`** `#757c7f` — icons, placeholder text
- **`outline-variant`** `#acb3b7` — borders, dividers
- **`error`** `#ac3149` — error/destructive states
- **`error-container`** `#f76a80` — error container
- **`on-error-container`** `#68001f` — text on error container

### Typography
- **Headlines / titles:** `font-['Manrope']` with `font-extrabold` or `font-bold`, negative tracking (`tracking-tight` or `letter-spacing: -0.02em`)
- **Body text:** `font-['Inter']` with `font-normal` or `font-medium`
- **Labels / captions / chips:** `font-['Inter']` with `font-medium`, `text-xs` or `text-[10px]`, `uppercase tracking-wider`

### Borders & Radius
- Default border radius is **small** (`rounded` = 0.125rem, `rounded-lg` = 0.25rem, `rounded-xl` = 0.5rem)
- Pills and avatars use `rounded-full` = 0.75rem
- Use `ghost-border` class (`border: 1px solid rgba(172, 179, 183, 0.15)`) for subtle card borders
- **Never** use heavy, obvious borders

### Shadows & Elevation
- Cards use `ambient-shadow`: `box-shadow: 0px 12px 32px rgba(45, 51, 55, 0.06)` — subtle, not heavy
- Top bar uses `glass-panel`: `background: rgba(247,249,251,0.7); backdrop-filter: blur(24px)`
- Active nav items use `shadow-[0px_12px_32px_rgba(45,51,55,0.06)]`

### Gradient
- Primary CTA button always uses `.bg-gradient-primary`: `linear-gradient(135deg, #5148d8 0%, #453acc 100%)`

### Dark Mode
- Classes use `dark:` prefix throughout. Implement a toggle. Dark mode uses `bg-slate-900`, `bg-slate-950`, `bg-slate-800`.
- The `html` element gets class `dark` when dark mode is enabled.

---

## Navigation Structure

The sidebar (fixed left, 256px / `w-64`) contains:

```
[Logo: Roundtable OS / Editorial Engine]

- Dashboard          (icon: dashboard)
- Ideas              (icon: lightbulb)
- Brainstorming      (icon: psychology)
- Resource Vault     (icon: inventory_2)
- Task Manager       (icon: checklist)
- Settings           (icon: settings)

[Bottom]
[+ New Spark]  ← gradient CTA button
- Help Center
```

Active nav item: white card with `primary` text color and `ambient-shadow`.
Inactive nav item: `text-outline`, `hover:text-on-surface`, `hover:bg-surface-container-high`.

Mobile: collapsed sidebar with hamburger menu + mobile top bar.

---

## Pages / Views to Build

Build **all** of the following views. For views not covered by a provided screen, design them to be consistent with the design system. Every view must be navigable from the sidebar.

---

### 1. Dashboard (Home)

**Greeted user by name** (pulled from settings or a first-run setup). Example: `"Morning, Alex."`

**Layout:**
- Welcome header with greeting + subtitle ("Here's what the Roundtable is processing today.")
- **Quick Actions Bento Grid** (2×2 on mobile, 4 across on desktop):
  - Add Idea (icon: add, container color: `primary-container`)
  - Start Brainstorm (icon: psychology, container color: `secondary-container`)
  - Add Resource (icon: upload_file, container color: `tertiary-container`)
  - View Tasks (icon: task_alt, container color: `surface-container-highest`)
- **Top Priorities section** (left 2/3 column):
  - List of top 3–5 ideas sorted by `PriorityScore` DESC
  - Each idea card: left accent bar in `primary` color, stage badge, category badge, title (Manrope bold), summary excerpt, priority score badge (right side, large number), `NextAction` label
  - "View all" link
- **Right sidebar column** (1/3):
  - **Idea Pipeline** — horizontal funnel showing count of ideas per stage (Spark, Exploring, Validating, Building, Launched)
  - **Recent Sessions** — last 3 brainstorm sessions with idea name, agents used, date, "Resume" button
  - **Dormant Ideas Alert** — ideas not brainstormed in 30+ days, shown as a warning card with orange/error accent
- **Stats row** at the bottom: Total Ideas, Active Sessions, Resources Logged, Tasks Pending — each in a small stat card

---

### 2. Ideas (Idea Bank)

**This is the core view.** It has two sub-views toggled by tabs or toggle buttons:

#### 2a. Ideas List View
- Filter bar at the top: Stage filter (pills), search input, sort dropdown (by PriorityScore, LastBrainstormed, Name)
- Each idea row/card shows: Stage badge, Category, Name (bold), Summary (truncated), PriorityScore, Tags, LastBrainstormed date, quick actions (Run Brainstorm, Edit, Archive buttons)
- Group by stage (collapsible sections) or flat list

#### 2b. Ideas Kanban View (pipeline view)
- Horizontal scrollable lanes for each stage (Inbox, Spark, Exploring, Validating, Planned, Building, Launched, Paused, Archived, Killed)
- Each idea is a draggable card showing: Name, Category, PriorityScore, Tags, last activity date
- Column headers show stage name + count
- "Add idea" button at the top of each column

#### Idea Detail Drawer / Modal
When clicking an idea anywhere in the system, open a **right-side drawer** or full modal showing:
- Full idea details (all fields from the Ideas sheet)
- Edit inline (save changes back to sheet via Apps Script)
- PriorityScore with breakdown (Usefulness, Uniqueness)
- `NextAction` with a "Mark Done / Next Step" button
- **Sessions tab** — all brainstorm sessions linked to this idea
- **Tasks tab** — all tasks linked to this idea
- **Related Resources tab** — resources with this idea's ID in RelatedIdeaIDs
- **Run Brainstorm** button (launches brainstorm flow)

#### New Idea Form ("New Spark")
A focused, clean page (not a modal) for capturing a new idea. Fields:
- Name (required)
- Summary (required, textarea)
- Category (dropdown: Product, Service, Research, Content, Tool, Other)
- ProblemSolved (textarea)
- TargetUsers (text)
- UniqueValue (textarea)
- Tags (tag input — comma-separated)
- Stage (defaults to "Spark")

On submit: append row to Ideas sheet, auto-generate ID (timestamp + random suffix), show success toast and redirect to idea detail.

---

### 3. Brainstorming

This is the highest-value feature. Build it carefully.

#### 3a. Brainstorm Session Launcher
- Select an idea from a searchable dropdown (pre-filled if coming from an idea card)
- Select **Brainstorm Mode**:
  - **Full Roundtable** — all 6 personas weigh in sequentially
  - **Quick Spark** — 2 personas (Kai + Rex) only, faster
  - **Challenge Mode** — Sage (Critic) + Luna (User Advocate) only, adversarial
  - **Strategy Deep-Dive** — Nova + Nia only, execution-focused
- "Launch Session" CTA button (gradient primary)

#### 3b. Session View (Live + Replay)
This is a chat-like interface. When a session runs:
1. Show a loading state per persona (avatar + name + "thinking..." animation)
2. Stream or display each persona's response as a styled "message bubble":
   - Each persona has a unique avatar circle with their initial letter and a specific color:
     - **Kai (Visionary)** — `primary-container` / `K`
     - **Nova (Strategist)** — `secondary-container` / `N`
     - **Rex (Builder)** — `tertiary-container` / `R`
     - **Sage (Critic)** — `error-container` / `S`
     - **Luna (User Advocate)** — soft yellow or `surface-container-highest` / `L`
     - **Nia (Execution Controller)** — `outline-variant` / `N`
   - Persona name + role subtitle above each bubble
   - Message content below
3. After all personas respond, show a **Synthesis Card** — a summary of key insights, recommended `NextAction`, and suggested new `Stage`
4. Action buttons: "Accept Recommendation", "Save & Close", "Run Again"
5. All session turns are written to the Sessions sheet in real-time (one row per turn)
6. PriorityScore is recalculated and written back to the Ideas sheet after the session

#### Persona System Prompt Templates
Each persona must be called with a composed prompt structured like this (implement in Apps Script):

```
You are [PERSONA_NAME], a [ROLE] in the Roundtable OS brainstorming system.
Your goal: [GOAL]
Your backstory: [BACKSTORY]

The idea you are evaluating:
- Name: [idea.Name]
- Summary: [idea.Summary]
- Problem Solved: [idea.ProblemSolved]
- Target Users: [idea.TargetUsers]
- Unique Value: [idea.UniqueValue]
- Current Stage: [idea.Stage]
- Tags: [idea.Tags]

Respond as [PERSONA_NAME] would. Be specific, opinionated, and actionable. Limit your response to 150–250 words.
```

Persona definitions:
- **Kai (Visionary):** Goal: Open up creative possibility space; identify adjacent opportunities and long-term narrative.
- **Nova (Strategist):** Goal: Define a viable business model, market positioning, and go-to-market angle.
- **Rex (Builder):** Goal: Assess technical feasibility; specify the smallest viable build and tech requirements.
- **Sage (Critic):** Goal: Identify fatal flaws, market risks, competitive threats, and assumptions that could kill this idea.
- **Luna (User Advocate):** Goal: Represent the end user's emotional journey, unmet needs, and usability concerns.
- **Nia (Execution Controller):** Goal: Prioritise ruthlessly; define the single next action the user should take within the next 7 days.

#### 3c. Session History
A list of all past sessions, filterable by idea. Each session row shows: idea name, personas used, date, session summary (first 100 chars), "View" button.

---

### 4. Resource Vault

A searchable, filterable library of saved tools, models, books, videos, links, and datasets.

**Views:**
- **Grid view** — cards per resource (Title, Type badge, Description, URL link button, Tags, RelatedIdeaIDs badges)
- **List view** — table rows

**Filters:**
- Type (App, AI Model, Book, Video, Dataset, Tool)
- Status (Saved, Tested, Useful, Revisit, Deprecated)
- Tag filter
- Related Idea filter

**Add Resource form** (modal or right drawer):
- Title, Type (dropdown), Description, URL, ReleaseDate, Status, Tags, RelatedIdeaIDs (multi-select from ideas)

**Resource Detail Drawer:**
- Full details
- Inline edit
- Which ideas link to this resource
- Status update dropdown

---

### 5. Task Manager

A **Kanban board** with four columns:

| Column | Color accent |
|---|---|
| Todo | neutral |
| In Progress | `primary` left border |
| Blocked | `error` left border + warning icon |
| Done | muted / opacity-60 |

Each task card shows:
- Category badge (linked idea name, in idea's stage color)
- Task title
- Due date (red if overdue)
- Assignee avatar circle (persona initial or user avatar)
- Drag handle

Features:
- Drag-and-drop between columns (update `Status` in Tasks sheet on drop)
- Add task button per column
- Task detail drawer: full fields, edit, mark done, delete
- Filter bar: Assignee, Due Date range, Linked Idea
- Overdue tasks shown with `error` styling

---

### 6. Settings

- **API Configuration:** Input for LLM API key (stored via Apps Script PropertiesService). Toggle between Anthropic (claude-sonnet-4-20250514) and OpenAI (gpt-4o). Test connection button.
- **User Profile:** Name (used for dashboard greeting), email, avatar initial color.
- **Notification Preferences:** Toggle email reminders on/off. Set dormant idea threshold (default 30 days).
- **Spreadsheet Link:** Display connected spreadsheet ID. Button to re-link.
- **Dark Mode toggle**
- **Danger Zone:** Clear all sessions, reset scores — with confirmation dialog.

---

## Google Sheets Data Model

Implement exactly the schema defined in `Idea_Management_System_bible_LW.md`. Reproduced here for reference:

### Ideas Sheet
`ID | Name | Summary | Category | ProblemSolved | TargetUsers | UniqueValue | Stage | PriorityScore | NextAction | LastBrainstormed | ParentID | Tags`

- `ID`: UUID generated via `Utilities.getUuid()` in Apps Script
- `Stage` values: `Inbox, Spark, Exploring, Validating, Planned, Building, Launched, Paused, Archived, Killed`
- Apply **data validation** on the Stage column to restrict to these values
- `PriorityScore`: float 0–1, computed by the Decision Engine

### Resources Sheet
`ID | Title | Type | Description | URL | ReleaseDate | Status | Tags | RelatedIdeaIDs`

- `Status` values: `Saved, Tested, Useful, Revisit, Deprecated`
- Apply data validation on Status

### Sessions Sheet
`SessionID | Turn | Agent | Content | Timestamp`

- `SessionID` links to an idea's ID
- One row per persona turn
- Final synthesis row uses Agent = "Synthesis"

### Tasks Sheet
`TaskID | IdeaID | Title | Status | Assignee | DueDate | Tags`

- `Status` values: `Todo, InProgress, Blocked, Done`
- Apply data validation on Status

---

## Apps Script Functions to Implement

All backend logic lives in the Apps Script project. Implement the following named functions:

### Core CRUD
```javascript
// Ideas
function addIdea(data) { /* append row to Ideas sheet */ }
function updateIdea(id, data) { /* find row by ID, update fields */ }
function getIdeas(filters) { /* return array of idea objects */ }
function getIdeaById(id) { /* return single idea */ }
function archiveIdea(id) { /* set Stage to Archived */ }

// Resources
function addResource(data) {}
function updateResource(id, data) {}
function getResources(filters) {}

// Sessions
function createSession(ideaId) { /* generate SessionID, return it */ }
function addSessionTurn(sessionId, turn, agent, content) { /* append row */ }
function getSessionsForIdea(ideaId) {}

// Tasks
function addTask(data) {}
function updateTask(id, data) {}
function updateTaskStatus(id, status) {}
function getTasks(filters) {}
```

### Brainstorm Engine
```javascript
function runBrainstormSession(ideaId, mode) {
  // 1. Fetch idea data
  // 2. Determine which personas to use based on mode
  // 3. For each persona: compose prompt, call LLM, record turn in Sessions sheet
  // 4. Compose synthesis prompt, record synthesis turn
  // 5. Compute scores, update Ideas sheet
  // 6. Return session ID and all turns to the client
}

function callLLM(prompt) {
  // Read API key from PropertiesService
  // Call Anthropic or OpenAI API via UrlFetchApp
  // Return text response
}
```

### Decision Engine
```javascript
function computePriorityScore(idea) {
  // Heuristic scoring. See bible for formula.
  // usefulness based on ProblemSolved length/quality
  // uniqueness based on UniqueValue content
  // combine: priority = 0.5 * usefulness + 0.5 * uniqueness
  // Optionally ask LLM for numeric estimates (0–10) and normalize
  // Update Ideas sheet with score and NextAction suggestion
}

function suggestNextAction(score, stage) {
  // Based on score thresholds and current stage, return string recommendation
  // e.g., score < 0.3 → "Pause and revisit", 0.3–0.6 → "Validate assumptions", > 0.6 → "Build MVP"
}
```

### Reminders & Triggers
```javascript
function checkDormantIdeas() {
  // Find ideas where LastBrainstormed is null or > 30 days ago
  // Send one email digest via GmailApp.sendEmail() listing all dormant ideas
}

function checkOverdueTasks() {
  // Find tasks where DueDate < today and Status != Done
  // Send email reminder
}

function checkUnfinishedSessions() {
  // Find sessions where the last turn is not a Synthesis turn
  // Send reminder email
}

function installTriggers() {
  // Set up daily time-driven trigger for checkDormantIdeas and checkOverdueTasks
  ScriptApp.newTrigger('checkDormantIdeas').timeBased().everyDays(1).create();
  ScriptApp.newTrigger('checkOverdueTasks').timeBased().everyDays(1).create();
}
```

### Web App Handlers
```javascript
function doGet(e) {
  // Route based on e.parameter.page
  // Default: serve main SPA shell
  return HtmlService.createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('Roundtable OS');
}

function doPost(e) {
  // Handle form submissions or API calls from the frontend
  var data = JSON.parse(e.postData.contents);
  // Route by data.action
}
```

---

## Frontend Architecture

The frontend is a single-page application (SPA) served from Apps Script. Use vanilla JS with the Router pattern (hash-based routing: `#dashboard`, `#ideas`, `#brainstorm`, etc.) OR use a lightweight framework if the environment supports it.

### File Structure (Apps Script project)
```
Code.gs              — doGet, doPost, all backend functions
LLM.gs               — callLLM(), buildPersonaPrompt()
Scoring.gs           — computePriorityScore(), suggestNextAction()
Reminders.gs         — checkDormantIdeas(), installTriggers(), etc.
index.html           — Main SPA shell with nav + router outlet
styles.html          — Tailwind config + custom CSS (included via HtmlService template)
dashboard.html       — Dashboard partial
ideas.html           — Ideas list/kanban partial
idea-detail.html     — Idea detail drawer HTML
new-spark.html       — New idea form page
brainstorm.html      — Brainstorm launcher + session view
resources.html       — Resource vault page
tasks.html           — Kanban task board
settings.html        — Settings page
utils.js.html        — Client-side utility functions
api.js.html          — Client-side API wrapper (calls google.script.run)
```

### Client ↔ Apps Script Communication
Use `google.script.run` for all data calls:
```javascript
// Example pattern:
google.script.run
  .withSuccessHandler(function(ideas) { renderIdeas(ideas); })
  .withFailureHandler(function(err) { showError(err.message); })
  .getIdeas({ stage: 'Exploring' });
```

For the brainstorm session (which is slow), use a **polling** pattern: start the session server-side, return a session ID, then poll `getSessionProgress(sessionId)` every 2 seconds to retrieve completed turns and render them progressively.

---

## Component Library (Build These Reusable Components)

Implement these as reusable HTML functions/templates:

| Component | Description |
|---|---|
| `IdeaCard` | Card with accent bar, stage badge, category, title, score, next action |
| `PersonaBubble` | Brainstorm turn with persona avatar circle, name, role, content |
| `ResourceCard` | Grid card with title, type badge, URL, tags |
| `TaskCard` | Kanban card with category badge, title, due date, assignee |
| `StageBadge` | Pill badge with color mapped to stage |
| `StatCard` | Number + label stat tile for dashboard |
| `RightDrawer` | Slide-in right panel for detail views |
| `Modal` | Centered modal with backdrop blur for confirmations |
| `Toast` | Bottom-right success/error notification |
| `LoadingSpinner` | Persona "thinking" animation for brainstorm |
| `TagChip` | Small pill for tag display |
| `ScoreMeter` | Visual bar showing PriorityScore 0–1 |

---

## Stage Color Mapping

Apply consistent colors to Stage badges across all views:

| Stage | Background | Text |
|---|---|---|
| Inbox | `surface-container-highest` | `on-surface-variant` |
| Spark | `primary-container` | `on-primary-container` |
| Exploring | `secondary-container` | `on-secondary-container` |
| Validating | `tertiary-container` | `on-tertiary-container` |
| Planned | `primary-container` | `primary` |
| Building | `primary-container` | `on-primary-container` |
| Launched | `secondary-container` | `secondary` |
| Paused | `surface-container-high` | `outline` |
| Archived | `surface-container-highest` | `on-surface-variant` |
| Killed | `error-container` | `on-error-container` |

---

## UX & Interaction Rules

1. **All data operations must show feedback:** loading spinner while waiting, success toast on completion, error state on failure. Never leave the user wondering if something worked.
2. **Optimistic UI:** Where safe, update the UI immediately and sync to the sheet in the background.
3. **Empty states:** Every list/board must have a designed empty state (illustration + copy + CTA button). Never show a blank page.
4. **Responsive:** The layout must work on tablet (768px+) and desktop (1024px+). Mobile is secondary but the sidebar should collapse to a hamburger.
5. **Hover states:** Every interactive element must have a visible hover state.
6. **Focus states:** All inputs and buttons must have visible focus rings for accessibility.
7. **Transitions:** All sidebar nav transitions, drawer open/close, and card hover effects use `transition-all duration-200 ease-in-out`.
8. **Dark mode:** Every component must have a dark mode variant. Use the `dark:` Tailwind prefix throughout.
9. **No lorem ipsum in shipped code:** Use realistic placeholder content that matches the domain (ideas about content strategies, app concepts, etc.).

---

## LLM API Integration Details

Store the following in `PropertiesService.getScriptProperties()`:
- `LLM_API_KEY` — the API key
- `LLM_PROVIDER` — `"anthropic"` or `"openai"`
- `LLM_MODEL` — e.g., `"claude-sonnet-4-20250514"` or `"gpt-4o"`

**Anthropic API call (Apps Script):**
```javascript
function callAnthropicAPI(prompt) {
  var apiKey = PropertiesService.getScriptProperties().getProperty('LLM_API_KEY');
  var response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    payload: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    }),
    muteHttpExceptions: true
  });
  var json = JSON.parse(response.getContentText());
  return json.content[0].text;
}
```

**Error handling:** If the API call fails (quota exceeded, bad key, timeout), catch the error, log it, and return a graceful fallback message. Do not crash the brainstorm session.

---

## Deployment Steps (Include as README.md in Project)

Generate a `README.md` file that walks a user through:

1. Creating the Google Spreadsheet with the 4 sheets and correct column headers
2. Setting up the Apps Script project (bound to sheet)
3. Pasting/importing the code files
4. Adding their LLM API key via `File > Project Settings > Script Properties`
5. Running `installTriggers()` once to set up the daily reminders
6. Deploying the web app: `Deploy > New deployment > Web App > Execute as: Me > Access: Anyone with link`
7. Copying the web app URL and using it as the app

---

## What to Build First (Recommended Order)

1. **Google Sheets setup + Apps Script skeleton** — create sheets, column headers, data validation
2. **CRUD functions** — `addIdea`, `getIdeas`, `updateIdea` for all 4 sheets
3. **doGet/doPost web app shell** — get a Hello World SPA running in a browser
4. **Design system** — load Tailwind config from `Designcode.md`, implement the sidebar and top bar
5. **Dashboard page** — wire up stats and top priorities from real sheet data
6. **Ideas list + New Spark form** — full idea CRUD in the UI
7. **Brainstorm engine** — LLM calls, persona prompts, session logging, synthesis
8. **Brainstorm UI** — session launcher, live turn rendering, synthesis card
9. **Resource Vault** — CRUD + search/filter
10. **Task Manager Kanban** — drag-and-drop board
11. **Reminders** — triggers and email templates
12. **Settings page** — API key config, profile, dark mode toggle
13. **Polish pass** — empty states, error states, loading states, transitions, dark mode, mobile responsiveness

---

## Design Screens Usage Instructions

The ZIP file contains design screens for specific views. For each screen:
- Match the layout, color usage, component structure, and spacing as closely as possible
- Do not blindly copy placeholder text — use real field names from the data model
- For views/tabs/states NOT shown in the screens, design them yourself using the same visual grammar: same card styles, same color tokens, same typography scale, same shadow/elevation system
- The screens are a **foundation and inspiration**, not an exhaustive specification

---

## Final Quality Checklist

Before considering any section done, verify:

- [ ] All colors come from the Tailwind config in `Designcode.md` — no hardcoded hex values
- [ ] Headlines use Manrope, body text uses Inter
- [ ] Cards use `ambient-shadow` and `rounded-xl`
- [ ] Active nav state uses white card + primary text color + ambient shadow
- [ ] Gradient CTA buttons use `.bg-gradient-primary`
- [ ] All data operations have loading, success, and error states
- [ ] Empty states are designed for every list/board
- [ ] Dark mode works on every component
- [ ] Apps Script functions have try/catch error handling
- [ ] LLM API key is never exposed to the client
- [ ] Sessions sheet is written to in real-time during brainstorm
- [ ] `README.md` has complete setup and deployment instructions
- [ ] All 4 Google Sheets have correct column headers and data validation

---

*End of prompt. Begin with reading the reference files, then start with step 1 of the recommended build order.*
