# MediTrack — Patient Management System

A full stack patient management web app built with React and FastAPI. Add, view, edit and delete patient records with automatic BMI calculation and health verdict.

**Live → [meditrack-two-sand.vercel.app](https://meditrack-two-sand.vercel.app)**

> Note: Backend is hosted on Render's free tier and may take ~50 seconds to wake up on first load. Patient data resets on server restart as it uses JSON file storage.

---

## Features

- View all patient records in a sortable table
- Add new patients with auto-calculated BMI and health verdict
- Edit and delete existing records
- Sort patients by BMI, height, or weight
- BMI distribution chart on dashboard
- Responsive design — works on mobile and desktop

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Tailwind CSS, React Router v6 |
| Backend | FastAPI, Python, Pydantic |
| Storage | JSON file |
| Build | Vite |
| Deploy | Vercel (frontend) + Render (backend) |

## Project Structure

```
meditrack/          ← React frontend
├── src/
│   ├── api/
│   │   └── api.js           # Axios API calls
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── PatientTable.jsx
│   ├── hooks/
│   │   └── usePatients.js   # Data fetching + state
│   └── pages/
│       ├── Dashboard.jsx
│       ├── Patients.jsx
│       ├── AddPatient.jsx
│       └── EditPatient.jsx

patient-management-system/   ← FastAPI backend
├── main.py                  # All routes + models
└── patients.json            # Data store
```

## Running Locally

**Backend:**
```bash
cd patient-management-system
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
cd meditrack
npm install
npm run dev
```

Make sure backend is running on `http://localhost:8000` before starting the frontend.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/view` | Get all patients |
| GET | `/patient/{id}` | Get single patient |
| GET | `/sort?sort_by=&order=` | Sort patients |
| POST | `/post` | Create patient |
| PUT | `/edit/{id}` | Update patient |
| DELETE | `/delete/{id}` | Delete patient |

## BMI Verdict Logic

| BMI Range | Verdict |
|---|---|
| < 18.5 | Underweight |
| 18.5 – 24.9 | Normal |
| 25 – 29.9 | Overweight |
| ≥ 30 | Obese |
