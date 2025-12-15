# Session Storage Normalization

Before this step, session data and audio files were stored in different
locations. There was no clear structure that grouped all files belonging
to a single session.

This step introduces a normalized storage layout for sessions.

---

## Problem before this step

Earlier:
- Session metadata was stored as loose JSON files
- Audio files were stored separately
- There was no defined link between them
- Cleanup and debugging were difficult

---

## What was added

Each session now has its own folder under `src/recordings`.

All files related to a session are stored inside that folder.

---

## New session folder structure
-src/recordings/
-session_<sessionId>/
-meta.json
-events.json
-audio.mp3
-processed_audio.json

This structure is used for new or updated sessions.

---

## Backward compatibility

Existing session JSON files are not removed or modified.
The system continues to support older files.

Normalization is applied only when new session data is written.

---

## Implementation details

Helper functions were added to:
- generate session folder paths
- create session folders safely
- store session metadata in a fixed location

No routes or controllers were changed

---

## Why this step matters

With normalized storage:
- session data is easier to manage
- audio and metadata stay in sync
- future cleanup is safe
- system behavior becomes predictable

now we prepared the backend for linking audio uploads directly to sessions.

---

## Summary

This introduces a clean, structured way to store session data on disk
without breaking existing behavior.
