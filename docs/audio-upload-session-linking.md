# audio upload and session linking

Audio uploads are now handled in a session-aware way.
Each uploaded audio file is associated with a single session and stored
alongside its metadata.

This change ensures that files created during an upload always belong to
the correct session.

---

## Earlier behavior

Previously, audio files and session metadata were written using different
sources to determine the session identifier.

Because of this mismatch:
- audio files could be saved under one session folder
- metadata could be written under another folder
- folders with incorrect names were created unintentionally

This made it difficult to reason about session data and file ownership.

---

## Current behavior

The session identifier is resolved once per request and reused everywhere.

The same value is used when:
- selecting the destination folder for audio uploads
- creating or locating the session folder
- writing or updating session metadata
- returning the response to the client

This guarantees consistency throughout the upload process.

---

## Storage organization after upload

After an audio upload completes, all files related to that session are kept
together under a single session-specific directory inside `src/recordings`.

That directory contains:
- the uploaded audio file
- the session metadata file

No additional folders are created during the process, and no files are
written outside the session directory.

---

## Session identifier handling

The session identifier is obtained using a fixed order:

- first from the `session-id` request header
- if not present, from the `sessionId` query parameter

Form-data fields are intentionally not used for this purpose, as they are
not available at the time files are written to disk.

---

## Metadata behavior

If metadata for the session already exists, it is updated with audio-related
information.

If no metadata exists yet, a minimal metadata file is created automatically.
This allows audio uploads to work even when no earlier session record has
been created.

---

## Result

Each session now has a predictable and stable storage layout.
Audio files and metadata remain synchronized.
Invalid or unintended session folders are no longer created.
