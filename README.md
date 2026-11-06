# CampusConnect BU

A university networking and academic collaboration platform for Babcock University students.
Find study partners, join course communities, and access organised past questions.

> Status: Phase 1 in progress (frontend foundation).
> Rule: the academic purpose stays central. We are not building another generic social network.

---

## 1. Problem Statement

Preliminary student feedback (not yet validated university-wide):

1. Students struggle to find past questions.
2. WhatsApp groups are the main source of academic information, and they are disorganised.
3. Students struggle to find study partners and course-mates.
4. Students want to connect with other students.

## 2. Product Concept

| Inspiration | What we take from it |
|---|---|
| LinkedIn | Profiles, department/level, courses, skills, interests, connections |
| Tinder | Discover profiles, express interest, mutual matches (used for study partners) |
| Academic tools | Past Questions Hub, course communities, study groups, discussions |

**Out of scope for MVP:** advanced AI matching, video calls, payments, complex social feeds.

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), JavaScript, CSS |
| Backend | Python, Flask, Flask REST API |
| Database | MySQL |
| Tools | VS Code, GitHub Copilot, Git/GitHub |

## 4. System Architecture

```
[ React (Vite) ]  --HTTP/JSON-->  [ Flask REST API ]  --SQL-->  [ MySQL ]
   :5173                              :5000
   services/api.js                    routes -> services -> models
   Authorization: Bearer <JWT>        validation + auth + file storage
```

### How frontend and backend communicate
- React calls Flask with `fetch` through a single helper in `src/services/api.js`.
- Flask returns JSON with consistent shapes: `{ "data": ... }` or `{ "error": "message" }`.
- Login returns a JWT. React stores it and sends `Authorization: Bearer <token>` on protected requests.
- In development, use the Vite proxy (`/api` -> `http://localhost:5000`) or Flask-CORS to avoid CORS errors.
- Never trust the frontend. Flask validates everything again.

### Frontend structure (create folders only when needed)
```
campusconnect-bu/
  src/
    components/    reusable UI (Navbar, StudentCard, Button, FormInput)
    pages/         one per route (Landing, Register, Login, Discover, Profile, ...)
    layouts/       shared page shells (MainLayout, AuthLayout)
    context/       AuthContext (current user, token)
    hooks/         useAuth, useFetch, useDebounce
    services/      api.js, authService.js, studentService.js
    utils/         validators.js, formatters.js
    data/          sampleStudents.js (dev only, removed once API exists)
    assets/
    App.jsx  main.jsx  index.css
```

### Backend structure
```
campusconnect-api/
  app/
    __init__.py        create_app() factory
    config.py          env-based config
    extensions.py      db, jwt, cors
    models/            SQLAlchemy models
    routes/            blueprints (auth, students, connections, ...)
    services/          business logic (keeps routes thin)
    validators/        input validation
    utils/             helpers, error handlers
  migrations/          Flask-Migrate
  tests/
  .env                 never committed
  requirements.txt
  run.py
```

### Core database entities (designed per feature, not all at once)
Students, Courses, StudentCourses, Interests, StudentInterests, ConnectionRequests,
Connections, StudyGroups, GroupMembers, Posts/Discussions, PastQuestions, Reports.

Rules: primary keys on every table, foreign keys with sensible ON DELETE behaviour,
UNIQUE constraints (email, matric number, one request per pair), indexes on search/filter columns.

## 5. Security and Quality Baseline
- Hash passwords (bcrypt/werkzeug). Never store plain text.
- JWT auth, protected routes on both frontend and backend.
- Validate and sanitise all input. Use SQLAlchemy (no string-built SQL).
- Restrict upload type and size. Store files outside the code folder.
- Secrets in `.env`, with `.env` in `.gitignore`.
- Fictional sample data only. No real student data without consent.
- Accessibility: semantic HTML, labels on inputs, keyboard navigation, visible focus.
- Responsive: mobile first.

## 6. Design Direction
Modern and professional. Purple primary (`#6d28d9` family), white/light backgrounds,
consistent spacing scale, readable typography, clear calls to action.

## 7. Working Method (follow for every step)
1. Read the step goal and the concepts.
2. Paste the **Master Context** (below) into Copilot Chat, or save it in `.github/copilot-instructions.md`.
3. Paste the step prompt. Let Copilot **inspect first and propose a plan**.
4. Review the plan, then let it edit.
5. Read every changed file. Be able to explain it.
6. Run the manual test. Fix. Commit with a clear message.
7. Tick the checkbox. Move on only when the step works.

### Master Context (paste before each prompt)
```
Project: CampusConnect BU, a university networking and academic collaboration platform
for Babcock University students. Stack: React (Vite) + JavaScript + CSS frontend,
Python Flask REST API, MySQL.
Rules: inspect existing files before editing. Do not rewrite the whole app. Preserve
working functionality. Reuse existing components and styles. No new dependencies unless
I approve them. Write clean, readable, reusable code with validation and error handling.
Keep layouts responsive and accessible. Use fictional sample data only.
Explain important changes in simple terms. Give me manual test steps.
Add automated tests where appropriate. Do not implement beyond this task.
```

---

## 8. Roadmap and Prompts

Legend: [x] done, [ ] to do

### Phase 0: Prototype (done)
- [x] Vite + React project created
- [x] Landing page (navbar, hero, CTA)
- [x] Student discovery section with 3 hardcoded cards
- [x] useState, .map(), keys, spread-based connect toggle

---

### Phase 1: Foundation (frontend first)

**Step 1.1: Split App.jsx into components** [ ]
Concepts: composition, props, lifting state up.
```
Task: refactor src/App.jsx into Navbar, Hero, StudentCard, StudentList components under
src/components, and move the hardcoded students to src/data/sampleStudents.js.
App keeps the students state and the toggle handler; StudentList and StudentCard receive
data and callbacks via props. No behaviour or visual changes. Show an empty state
("No students found"). Connect button must be a real <button> with aria-pressed.
First inspect App.jsx, App.css and index.css and propose a plan. After editing, explain
the data flow App -> StudentList -> StudentCard.
```
Test: page looks identical, each Connect toggles independently, no key warnings.

**Step 1.2: Routing, layout and pages** [ ]
Concepts: client-side routing, layouts, `<Outlet>`, active nav links.
```
Task: add react-router-dom (approved). Create src/layouts/MainLayout.jsx (Navbar + Outlet +
Footer) and pages: LandingPage, DiscoverPage, RegisterPage, LoginPage, NotFoundPage.
Move the hero to LandingPage and the student list to DiscoverPage. Routes: /, /discover,
/register, /login, *. The Join CampusConnect button links to /register. Navbar uses
NavLink with an active style and has a mobile-friendly menu. Inspect existing files first
and keep current styling.
```
Test: every route loads, refresh on /discover works, unknown URL shows NotFound, mobile menu opens/closes.

**Step 1.3: Registration form with validation** [ ]
Concepts: controlled inputs, form state, validation, error display.
```
Task: build RegisterPage with a reusable FormInput component and src/utils/validators.js.
Fields: full name, Babcock email, matric number, department, level (100-500), password,
confirm password. Validate on blur and on submit: required fields, email format and
@student.babcock.edu.ng domain (make the domain a config constant I can change),
password min 8 chars with a number, passwords match. Show inline accessible errors
(aria-describedby), disable submit while invalid or submitting, and show a success
state. No backend yet: simulate submit with a Promise and console.log nothing sensitive.
```
Test: submit empty, wrong email, mismatched passwords, then a valid form.

**Step 1.4: Login form and mock auth context** [ ]
Concepts: Context API, custom hooks, protected routes.
```
Task: create src/context/AuthContext.jsx and src/hooks/useAuth.js with user, login(),
logout() using MOCK data only (no real security yet, add a comment saying so).
Build LoginPage with validation. Create a ProtectedRoute component and protect
/discover and /profile. Navbar shows Login/Register when logged out and name/Logout
when logged in. Redirect back to the intended page after login.
```
Test: visiting /discover logged out redirects to /login; login then returns you; logout works.

**Step 1.5: Profile creation and profile page** [ ]
Concepts: multi-field forms, arrays in state, reusable tag input.
```
Task: create ProfilePage and ProfileForm: bio, department, level, courses (add/remove
tags), skills, interests (add/remove tags, no duplicates, max length). Create a reusable
TagInput component. Hold data in AuthContext for now. Show a profile preview card using
the same StudentCard styling. Validate lengths and show errors.
```
Test: add/remove tags, duplicates blocked, refresh behaviour noted (data is lost until backend).

**Step 1.6: Polish and accessibility pass** [ ]
```
Task: review the whole frontend for responsive layout, focus states, colour contrast,
labels, alt text and consistent spacing using CSS variables for the purple theme.
List issues first, fix only small ones now, and list bigger ones for later.
```

---

### Phase B: Backend foundation (starts after Phase 1 frontend is stable)

**Step B.1: Flask project setup** [ ]
```
Task: create a new folder campusconnect-api with an app factory (create_app), config
from environment variables, extensions.py, a health route GET /api/health, a global JSON
error handler, Flask-CORS limited to http://localhost:5173, and requirements.txt.
Explain the folder structure and how to run it in a virtual environment.
```
Test: GET /api/health returns `{ "data": { "status": "ok" } }`.

**Step B.2: Database connection and Student model** [ ]
```
Task: add Flask-SQLAlchemy and Flask-Migrate with MySQL via .env. Create the Student model
(id, full_name, email unique, matric_number unique, department, level, password_hash,
bio, created_at). Generate and apply the first migration. Do not create other tables yet.
Explain each column and constraint choice.
```
Test: table exists in MySQL with unique constraints.

**Step B.3: Register and login API** [ ]
```
Task: add routes POST /api/auth/register, POST /api/auth/login, GET /api/auth/me using
JWT (Flask-JWT-Extended) and password hashing. Put logic in services/auth_service.py and
validation in validators/. Return consistent JSON errors with correct status codes
(400, 401, 409). Add pytest tests for success and failure cases.
```
Test: Postman/Thunder Client for each case; pytest passes.

**Step B.4: Connect React to the auth API** [ ]
```
Task: create src/services/api.js (base URL from import.meta.env, attaches the JWT,
handles errors) and authService.js. Replace the mock auth in AuthContext with real calls.
Store the token safely, handle expired tokens by logging out, show loading and error
states in the forms. Explain the request/response flow.
```
Test: register in the UI, see the row in MySQL, log in, refresh and stay logged in.

**Step B.5: Profile API** [ ]
```
Task: add GET/PUT /api/students/me, plus tables for interests and student_interests
(many-to-many). Connect ProfileForm to the API with optimistic UI avoided (keep it
simple), validation on both sides, and tests.
```

---

### Phase 2: Student discovery and connections

**Step 2.1: Discover API and live data** [ ]
```
Task: GET /api/students with pagination, excluding the current user. Replace
sampleStudents in DiscoverPage with API data using a useFetch hook (loading, error,
empty states and a retry button).
```

**Step 2.2: Search and filters** [ ]
```
Task: add query params (q, department, level, course, interest) to GET /api/students with
indexed columns. On the frontend add a debounced search box and filter controls, with the
state reflected in the URL query string. Tests for filter combinations.
```

**Step 2.3: Connection requests** [ ]
```
Task: create connection_requests (sender_id, receiver_id, status pending/accepted/rejected,
created_at) with a UNIQUE pair constraint and a CHECK that sender != receiver. Endpoints:
POST /api/connections/requests, GET incoming/outgoing, PATCH accept/reject. Prevent
duplicates and reverse duplicates. Update StudentCard to show Connect / Pending / Connected.
```

**Step 2.4: Manage connections** [ ]
```
Task: connections page with tabs: Connections, Incoming, Sent. Accept, reject, cancel and
remove connection actions with confirmation and error handling. Add API tests for
authorisation (users can only act on their own requests).
```

---

### Phase 3: Academic collaboration

**Step 3.1: Courses and enrolment** [ ]
```
Task: courses (code, title, department, level, semester) and student_courses. Seed a small
fictional course list. Let students add/remove their courses on the profile.
```

**Step 3.2: Study partner matching (simple rules, no AI)** [ ]
```
Task: GET /api/study-partners ranks students by shared courses, same level/department and
shared interests using a transparent scoring function in services/matching_service.py with
unit tests. Show "why matched" on each card (e.g. "2 shared courses").
```

**Step 3.3: Course communities** [ ]
```
Task: a community per course, with join/leave, member list, and a community page route
/courses/:id.
```

**Step 3.4: Study groups** [ ]
```
Task: study_groups and group_members (owner, member roles), create/join/leave, capacity
limit, only members see group details. Authorisation tests.
```

**Step 3.5: Discussions** [ ]
```
Task: posts and replies inside a community or group, pagination, edit/delete own posts,
basic length limits and sanitisation. Keep it a simple thread list, not a feed.
```

---

### Phase 4: Past Questions Hub

**Step 4.1: Upload** [ ]
```
Task: past_questions table (course_id, session e.g. 2023/2024, semester, level, file path,
uploaded_by, status pending/approved). POST endpoint with multipart upload: allow PDF/images
only, size limit, random safe filenames, files stored outside the source tree. Upload form
with progress and validation. Include a copyright/terms checkbox.
```

**Step 4.2: Browse, search and download** [ ]
```
Task: list with filters (course, level, semester, session), search, pagination, and
authenticated download endpoint. Show only approved items.
```

**Step 4.3: Moderation** [ ]
```
Task: admin role, approve/reject queue, report a file button, takedown process for
copyright complaints, and an audit field for who approved what.
```

---

### Phase 5: Improvements
- [ ] **5.1 Notifications**: notifications table, bell icon, mark as read, polling first.
- [ ] **5.2 Messaging**: one-to-one chat between connections (polling first, WebSockets later).
- [ ] **5.3 Student verification**: email verification link, verified badge.
- [ ] **5.4 Block and report**: block users, report profiles/posts, admin review.
- [ ] **5.5 Better recommendations**: refine scoring from real usage data.

Prompt template for any Phase 5 step:
```
Task: implement [feature] for CampusConnect BU. First inspect the existing models,
routes and components that it touches and propose a plan including database changes,
API endpoints, frontend components, validation, authorisation and tests. Wait for my
approval before editing. Keep changes minimal and reuse existing patterns.
```

---

### Phase 6: Hardening and launch
- [ ] Automated tests: pytest (API), Vitest + React Testing Library (UI).
- [ ] Rate limiting on auth and upload routes.
- [ ] Error logging and a production config.
- [ ] Deploy: frontend (Vercel/Netlify), backend (Render/Railway/VPS), managed MySQL.
- [ ] Privacy policy and terms; confirm handling of student data.
- [ ] Pilot with a small group at Babcock, collect feedback, validate the original problems.

## 9. Git Workflow
- `main` is always working. Create a branch per step: `feature/1.3-register-form`.
- Small commits with clear messages: `feat: add register form validation`.
- Merge to `main` only after the manual test passes.

## 10. Running the Project
```bash
# frontend
cd campusconnect-bu
npm install
npm run dev          # http://localhost:5173

# backend (after Phase B)
cd campusconnect-api
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
flask --app run run        # http://localhost:5000
```

## 11. Definition of Done (every step)
- Works on desktop and mobile widths.
- Validation and error states handled.
- No console errors or warnings.
- I can explain every line that changed.
- Tests added where appropriate.
- Committed with a clear message.