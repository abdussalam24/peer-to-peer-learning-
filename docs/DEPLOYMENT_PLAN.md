# Deployment & Real-Time Features Plan

## 1. Real-Time Features Implementation

### Live Chat (Socket.io)
- **Server**: Initialize `socket.io` server attached to Express HTTP server.
- **Client**: Use `socket.io-client` in React.
- **Events**:
  - `join_room`: User joins a room (room ID = `sessionId` or `chatId`).
  - `send_message`: Client sends message -> Server saves to DB -> Server broadcasts to room.
  - `typing`: Broadcast typing status.

### Notifications
- **Mechanism**: Use Socket.io for real-time alerts (toast notifications) when user is online.
- **Offline**: Fallback to storing notifications in DB and showing them on next login.
- **Triggers**: Session request received, Session accepted, New message.

### Video Call Integration
- **Provider**: Zoom API or Google Meet (via Calendar API).
- **Flow**:
  1. When session is "Accepted", backend calls Zoom API to create a meeting.
  2. Meeting URL is stored in the `Session` document.
  3. "Join Meeting" button appears in UI 10 minutes before start time.

## 2. Deployment Plan

### A. Database (MongoDB Atlas)
1. Create M0 Sandbox (Free Tier) cluster.
2. Whitelist IP `0.0.0.0/0` (for cloud access).
3. Create database user and get Connection String.

### B. Backend (Render / Railway)
1. **Build Command**: `npm install`
2. **Start Command**: `node server.js`
3. **Environment Variables**:
   - `MONGO_URI`: Connection string from Atlas.
   - `JWT_SECRET`: Secure random string.
   - `PORT`: 8080 (or default).
   - `CLIENT_URL`: URL of the deployed frontend.

### C. Frontend (Vercel / Netlify)
1. Connect GitHub repository.
2. **Build Command**: `npm run build` (Vite build).
3. **Output Directory**: `dist`.
4. **Environment Variables**:
   - `VITE_API_URL`: URL of the deployed backend.

### D. CI/CD Pipeline (GitHub Actions - Optional)
- Create `.github/workflows/deploy.yml`.
- On push to `main`:
  - Run tests (`npm test`).
  - If pass, trigger deployment webhook for Render/Vercel.

### E. SSL & Domain
- Render/Vercel provide free SSL (HTTPS) automatically.
- Custom domain can be configured in project settings by adding CNAME records.
