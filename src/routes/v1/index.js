const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { InfoController } = require("../../controllers");
const sessionRegistry = require("../../services/sessionRegistry");

const router = express.Router();

/**
 * This storage decides where audio files are saved.
 * Audio is always stored inside the session folder.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const sessionId = req.headers["session-id"] || req.query.sessionId;

    if (!sessionId) {
      return cb(new Error("sessionId is required"));
    }

    const sessionFolder = sessionRegistry.ensureSessionFolder(sessionId);
    cb(null, sessionFolder);
  },

  filename: (req, file, cb) => {
    // simple and readable file name
    const fileName = `audio_${Date.now()}.mp3`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

/**
 * Upload audio for a session
 * Expects:
 * - session-id header
 * - audio file in form-data with key "audio"
 */
router.post("/upload-audio", upload.single("audio"), (req, res) => {
  const sessionId = req.headers["session-id"] || req.query.sessionId;

  if (!req.file) {
    return res.status(400).json({ message: "No audio file uploaded" });
  }

  let session = sessionRegistry.getSession(sessionId);

  // if session metadata does not exist yet,
  // create a minimal one
  if (!session) {
    session = {
      sessionId,
      data: {
        sessionId,
        status: "CREATED",
        createdAt: Date.now(),
      },
    };
  }

  // attach audio info to session metadata
  session.data.audioFile = req.file.filename;
  session.data.audioUploadedAt = Date.now();

  sessionRegistry.saveSessionMeta(sessionId, session.data);

  res.json({
    message: "Audio uploaded successfully",
    file: req.file.filename,
    sessionId,
  });
});

router.use("/recording", require("./recording-routes"));
router.use("/frontend", require("./frontend-routes"));
router.use("/python", require("./python-routes"));

router.get("/info", InfoController.info);

module.exports = router;