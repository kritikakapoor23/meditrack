# MediTrack

A full-stack patient management system with JWT-authenticated CRUD and automatic BMI/health-verdict calculation.

## Screenshots

<div align="center">
<table>
<tr>
<td><img src="https://github.com/user-attachments/assets/2c3cc63c-9ee7-41ba-a45e-e204491ac418" width="420" /></td>
<td><img src="https://github.com/user-attachments/assets/ce97c7f2-3bb5-407c-9307-c49b58c7f803" width="420" /></td>
</tr>
<tr>
<td colspan="2" align="center"><img src="https://github.com/user-attachments/assets/7995b9cf-11e2-49af-b05e-9d49e514c997" width="420" /></td>
</tr>
</table>
</div>

---

## Features

- Dashboard — patient counts and BMI distribution breakdown, open to everyone
- Patients table — sortable by height, weight, or BMI, open to everyone
- Add / Edit / Delete — requires login
- Automatic BMI and health-verdict calculation on every create/update
- JWT auth — login page, token persisted client-side, auto-attached to every write request, auto-logout on expiry/rejection
- CORS and API base URL driven entirely by environment variables — no hardcoded hosts

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, React Router, Tailwind CSS, Vite |
| Backend | FastAPI, Python |
| Auth | JWT (python-jose), bcrypt password hashing (passlib) |
| Storage | JSON file |

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows — source venv/bin/activate on Mac/Linux
pip install -r requirements.txt
```

Create `backend/.env` (see `.env.example`):
```
SECRET_KEY=a-long-random-string
FRONTEND_ORIGINS=http://localhost:5173
```

Generate a secret key:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Run it:
```bash
uvicorn main:app --reload --port 8000
```

API docs: `http://localhost:8000/docs`

### Frontend
```bash
cd frontend
npm install
```

Create `frontend/.env` (see `.env.example`):
```
VITE_API_BASE_URL=http://localhost:8000
```

Run it:
```bash
npm run dev
```

Visit `http://localhost:5173`

### Logging in

Single hardcoded account (see `fake_admin` in `backend/main.py` — change before deploying anywhere real):

- **Username:** `admin`
- **Password:** `admin123`

## Authentication

- `POST /login` exchanges username/password for a JWT (1 hour expiry)
- Frontend stores the token in `localStorage`, attaches it as a `Bearer` token to every request via an axios interceptor
- A `401` response clears the token and redirects to `/login`, returning the user to the page they were on after signing back in
- Viewing patient data is public; creating, editing, and deleting records requires a valid token

## API Reference

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/` | Health check | No |
| GET | `/about` | API description | No |
| POST | `/login` | Log in, returns a JWT | No |
| GET | `/view` | Get all patients | No |
| GET | `/patient/{id}` | Get a single patient | No |
| GET | `/sort?sort_by=&order=` | Sort by `height`, `weight`, or `bmi` | No |
| POST | `/post` | Create a patient | Yes |
| PUT | `/edit/{id}` | Update a patient | Yes |
| DELETE | `/delete/{id}` | Delete a patient | Yes |

## BMI Verdict Logic

| BMI range | Verdict |
|---|---|
| < 18.5 | Underweight |
| 18.5 – 29.9 | Normal |
| ≥ 30 | Obese |

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `SECRET_KEY` | `backend/.env` | Signs/verifies JWTs — app refuses to start without it |
| `FRONTEND_ORIGINS` | `backend/.env` | Comma-separated CORS allow-list |
| `VITE_API_BASE_URL` | `frontend/.env` | API base URL the frontend calls |
