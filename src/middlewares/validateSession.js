const sessionRegistry = require("../services/sessionRegistry");

/**
 * Middleware to validate sessionId from request
 * Stops the request early if session is invalid
 */
function validateSession(req, res, next) {
  const sessionId =
    req.params.sessionId ||
    req.body.sessionId ||
    req.query.sessionId;

  if (!sessionId) {
    return res.status(400).json({
      error: "sessionId is required",
    });
  }

  if (!sessionRegistry.sessionExists(sessionId)) {
    return res.status(404).json({
      error: "session not found",
    });
  }

  const status = sessionRegistry.getSessionStatus(sessionId);

  if (status === "FAILED") {
    return res.status(409).json({
      error: "session has failed",
    });
  }

  req.sessionId = sessionId;
  next();
}

module.exports = validateSession;
