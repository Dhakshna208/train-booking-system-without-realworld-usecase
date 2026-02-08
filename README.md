# Train Booking System (MERN)

This repository uses the following stack:

- **Frontend:** React.js, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT + bcrypt

## Architecture

> Frontend and backend are separated for scalability.

## Folder Structure

```text
train-booking-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   └── tailwind.config.js
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Core Modules Implemented

1. **Authentication**: Register/Login with JWT, localStorage token handling in frontend.
2. **Train Management (Admin)**: Add train route protected by admin middleware.
3. **Search Trains**: Search by from/to/date input in UI and backend search endpoint.
4. **Booking System**: Create booking, reduce seats, generate PNR.
5. **My Bookings**: View tickets, cancel ticket, auto-increment seats on cancellation.

---

## Setup Option 1: Manual (without Docker)

Use this mode when you want to run each service directly on your machine.

### 1) Start MongoDB locally

Ensure MongoDB is running on your system (default local URI shown below).

### 2) Start backend

```bash
cd server
npm install
cp .env.example .env
```

Update `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/train_booking
JWT_SECRET=your_super_secret_key
```

Run backend:

```bash
npm run dev
```

### 3) Start frontend

```bash
cd ../client
npm install
```

Optional `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Manual mode URLs:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`
- Health: `http://localhost:5000/api/health`

---

## Setup Option 2: Docker (single command)

Use this mode when you want the **whole project to depend on Docker** (app + MongoDB together).

### 1) Create Docker env file

```bash
cp .env.docker.example .env.docker
```

Default `.env.docker` values:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/train_booking
JWT_SECRET=your_super_secret_key
```

> Note: In Docker, Mongo URI must use service name `mongo` (not `localhost`).

### 2) Start everything

```bash
docker compose up --build
```

Docker mode URLs:
- App (frontend + backend): `http://localhost:5000`
- Health: `http://localhost:5000/api/health`

### 3) Stop everything

```bash
docker compose down
```

If you also want to remove DB data volume:

```bash
docker compose down -v
```
