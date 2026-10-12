# MediTrack

MediTrack is a full-stack patient management system. It lets you register patients, track their vitals, and automatically computes BMI and a health verdict (Underweight / Normal / Overweight / Obese) for each record. Anyone can browse the patient list and dashboard; adding, editing, or deleting a record requires signing in.

- **Backend:** FastAPI (Python), JWT authentication, JSON file storage
- **Frontend:** React 19, React Router, Tailwind CSS, Vite

## Features

- Dashboard with patient counts and a BMI distribution breakdown — open to everyone
- Sortable, searchable table of all patients (by height, weight, or BMI) — open to everyone
- Add, edit, and delete patient records — requires login
- Automatic BMI and health-verdict calculation on every create/update
- JWT-based authentication: a login page, a token stored client-side, and an interceptor that attaches it to every write request and signs the user out automatically if the token is rejected or expires
- CORS configured via environment variables instead of hardcoded origins, so the frontend's API base URL and the backend's allowed origins are both configurable per environment

## Project structure

```
meditrack/
├── backend/               FastAPI app
│   ├── main.py             Routes, models, JWT auth logic
│   ├── patients.json       Patient data store
│   └── requirements.txt
└── frontend/              React app (Vite)
    └── src/
        ├── api/
        │   ├── axiosClient.js   Shared axios instance: attaches JWT, handles 401s
        │   └── api.js           Patient CRUD calls
        ├── context/
        │   └── AuthContext.jsx  Login/logout state, token persistence
        ├── components/
        │   ├── ProtectedRoute.jsx
        │   ├── Navbar.jsx
        │   ├── Sidebar.jsx
        │   └── PatientTable.jsx
        ├── hooks/
        │   └── usePatients.js   Fetching, sorting, deleting patients
        └── pages/
            ├── Login.jsx
            ├── Dashboard.jsx
            ├── Patients.jsx
            ├── AddPatient.jsx
            └── EditPatient.jsx
```

## Getting started

### Prerequisites

- Python 3.10+
- Node.js 18+

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/` (see `.env.example`):

```
SECRET_KEY=a-long-random-string
FRONTEND_ORIGINS=http://localhost:5173
```

Generate a secret key with:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Run the server:

```bash
uvicorn main:app --reload --port 8000
```

API docs are available at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` (see `.env.example`):

```
VITE_API_BASE_URL=http://localhost:8000
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:5173`.

### Logging in

There's a single hardcoded account, defined in `backend/main.py`:

- **Username:** `admin`
- **Password:** `admin123`

Change this before deploying anywhere real — see `fake_admin` in `main.py`.

## Authentication

- `POST /login` exchanges a username/password for a JWT (1 hour expiry), using OAuth2's password-flow form encoding.
- The frontend stores the token in `localStorage` and attaches it as a `Bearer` token to every request via an axios interceptor.
- If any request comes back `401` (expired or invalid token), the interceptor clears the stored token and the app redirects to `/login`, returning the user to the page they were on once they sign back in.
- Viewing patient data (`/view`, `/patient/{id}`, `/sort`) is public. Creating, editing, and deleting records require a valid token.

## API reference

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| GET | `/` | Health check | No |
| GET | `/about` | API description | No |
| POST | `/login` | Log in, returns a JWT | No |
| GET | `/view` | Get all patients | No |
| GET | `/patient/{id}` | Get a single patient | No |
| GET | `/sort?sort_by=&order=` | Sort patients by `height`, `weight`, or `bmi` | No |
| POST | `/post` | Create a patient | Yes |
| PUT | `/edit/{id}` | Update a patient | Yes |
| DELETE | `/delete/{id}` | Delete a patient | Yes |

## BMI verdict logic

| BMI range | Verdict |
|---|---|
| < 18.5 | Underweight |
| 18.5 – 29.9 | Normal |
| ≥ 30 | Obese |

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `SECRET_KEY` | `backend/.env` | Signs and verifies JWTs. The app refuses to start without it. |
| `FRONTEND_ORIGINS` | `backend/.env` | Comma-separated list of origins allowed by CORS (e.g. your deployed frontend's URL) |
| `VITE_API_BASE_URL` | `frontend/.env` | Base URL the frontend calls for the API (local backend, or your deployed one) |

## Deployment

The backend and frontend deploy independently — there's no build-time coupling between them. Point `VITE_API_BASE_URL` at wherever the backend is hosted, and add that same frontend's deployed URL to the backend's `FRONTEND_ORIGINS` so CORS allows it.

Patient data is stored in `backend/patients.json` on disk, so it resets if the backend's filesystem isn't persistent across restarts/deploys (true of most free-tier PaaS hosting).
