const express = require("express");
const sessionRegistry = require("../../services/sessionRegistry");
const validateSession = require("../../middlewares/validateSession");

const router = express.Router();

/**
 * Get all sessions
 */
router.get("/", (req, res) => {
  const sessions = sessionRegistry.getAllSessions();

  const response = sessions.map((s) => ({
    sessionId: s.sessionId,
    status: s.status,
    loadedAt: s.loadedAt,
  }));

  res.json(response);
});

/**
 * Get session details
 */
router.get("/:sessionId", validateSession, (req, res) => {
  const session = sessionRegistry.getSession(req.sessionId);

  res.json({
    sessionId: session.sessionId,
    status: session.status,
    data: session.data,
  });
});

/**
 * Get only session status
 */
router.get("/:sessionId/status", validateSession, (req, res) => {
  const status = sessionRegistry.getSessionStatus(req.sessionId);

  res.json({ status });
});

module.exports = router;
