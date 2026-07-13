# Task Management App

This project contains a full-stack task management application with a Node.js/TypeScript backend and a React/Vite frontend.

## Prerequisites
- Node.js 18 or newer
- npm

## Install dependencies
Open two terminals and install dependencies in each app:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

## Run the application
### 1) Start the backend
In the first terminal:

```bash
cd backend
npm run dev
```

The backend will run at:
- http://localhost:8080

### 2) Start the frontend
In the second terminal:

```bash
cd frontend
npm run dev
```

The frontend will run at:
- http://localhost:5173

Open http://localhost:5173 in your browser to use the app.

## Production build
Build the backend:

```bash
cd backend
npm run build
```

Build the frontend:

```bash
cd frontend
npm run build
```

To run the built backend:

```bash
cd backend
npm start
```

## Notes
- The frontend expects the backend API at http://localhost:8080/api.
- If you are using Windows PowerShell and run into script execution issues, you can try:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```
