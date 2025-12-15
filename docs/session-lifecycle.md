# Session Lifecycle and Status

After adding the session registry, the backend was able to load and track sessions.
However, there was still no information about what stage a session was in.

This step adds a simple lifecycle to every session using a status field.

---

## Problem before this step

Before this change:
- Sessions had no state
- Backend logic had to guess if a session was active or finished
- Frontend had no reliable way to show progress

Sessions existed, but their flow was unclear.

---

## What was added

Each session now has a `status` field.

The supported statuses are:

- CREATED
- RECORDING
- PROCESSING
- COMPLETED
- FAILED

These states are simple and cover the full session flow.

---

## Handling existing sessions

Older session files do not include a status field.

To avoid breaking them:
- A default status of `COMPLETED` is applied
- This keeps all existing sessions usable

---

## Implementation details

The status is stored in memory as part of the session registry.
Two helper functions were added:

- One to read the current status
- One to update the status safely

No routes or frontend logic were changed in this step.

---

## What this step does not change

This step does not:
- change session creation logic
- modify file storage
- add APIs
- affect WebSocket behavior

It only improves how sessions are tracked internally.

---

## Why this step matters

By adding a lifecycle:
- Backend behavior becomes predictable
- Invalid actions can be blocked later
- Frontend can show accurate session state
- Future features become easier to add

This step prepares the system for validation and session APIs.

---

## Summary

This step adds clear lifecycle tracking to sessions while keeping existing behavior intact.
It builds directly on the session registry introduced earlier.
