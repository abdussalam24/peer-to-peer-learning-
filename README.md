# Peer-to-Peer Learning & Mentorship Platform

## Project Overview
This is a full-stack MERN application connecting students with peer mentors.

## Project Structure
- `server/`: Node.js + Express Backend
- `client/`: React + Vite Frontend
- `docs/`: Comprehensive Documentation

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed or Atlas URI

### Setup Backend
1. Navigate to server: `cd server`
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Start server: `npm run dev`

### Setup Frontend
1. Navigate to client: `cd client`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

## Documentation
Check the `docs/` folder for detailed design documents:
- [System Architecture](docs/SYSTEM_ARCHITECTURE.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [API Blueprint](docs/API_BLUEPRINT.md)cd
- [Frontend UI/UX](docs/FRONTEND_UI_UX.md)
- [SRS](docs/SRS.md)
