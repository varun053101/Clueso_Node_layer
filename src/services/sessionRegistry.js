const fs = require("fs");
const path = require("path");

// Default status for old sessions
// Old session files do not have a status field
const DEFAULT_SESSION_STATUS = "COMPLETED";
const RECORDINGS_DIR = path.join(__dirname, "../../recordings");

// In-memory store for sessions
const sessions = new Map();

/**
 * Load all existing session files at startup
 */ 
function loadSessions() {
  if (!fs.existsSync(RECORDINGS_DIR)) {
    return;
  }

  const files = fs.readdirSync(RECORDINGS_DIR);

  files.forEach((file) => {
    if (!file.startsWith("recording_session_")) return;
    if (!file.endsWith(".json")) return;

    try {
      const filePath = path.join(RECORDINGS_DIR, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw);

      if (data.sessionId) {
        sessions.set(data.sessionId, {
          sessionId: data.sessionId,
          filePath: filePath,
          data: data,

          // Every session must have a status
          // If missing we use a safe default
          status: data.status || DEFAULT_SESSION_STATUS,

          loadedAt: Date.now(),
        });
      }
    } catch (err) {
      console.error("Failed to load session file:", file);
    }
  });
}

/**
 * Get session by id
 */
function getSession(sessionId) {
  return sessions.get(sessionId);
}

/**
 * Check if session exists
 */
function sessionExists(sessionId) {
  return sessions.has(sessionId);
}

/**
 * Get all sessions
 */
function getAllSessions() {
  return Array.from(sessions.values());
}

/**
 * Returns the current status of a session
 */
function getSessionStatus(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return null;

  return session.status;
}

/**
 * Updates the status of a session
 * Returns false if session does not exist
 */
function updateSessionStatus(sessionId, newStatus) {
  const session = sessions.get(sessionId);
  if (!session) return false;

  session.status = newStatus;
  return true;
}

module.exports = {
  loadSessions,
  getSession,
  sessionExists,
  getAllSessions,
  getSessionStatus,
  updateSessionStatus,
};