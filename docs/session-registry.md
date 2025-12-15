# Session Registry

Before this change, session data already existed in the project, but it was stored only as JSON files inside the `recordings` folder.  
Different parts of the backend accessed these files directly, which made it hard to know:

- what sessions exist
- whether a session is valid
- how many sessions are currently loaded

There was no single place in the backend that managed sessions.

This step introduces a **Session Registry** to solve that problem.

---

### Earlier behavior
- Sessions were stored as individual JSON files
- Controllers and services read files directly
- The backend had no memory of sessions after startup
- There was no way to ask: “Does this session exist?”

### Issues with this approach
- Hard to validate session IDs
- Difficult to extend session logic later
- File access logic spread across the codebase

---

## What was added in this step

A new service called **Session Registry** was added.

The registry:
- Loads all existing session files when the server starts
- Stores basic session data in memory
- Acts as a single source of truth for sessions

This change does **not** modify how sessions are created or written to disk.

---

## New file added

`src/services/sessionRegistry.js`

---

## Verification

To verify this step:
1. Start the backend server
2. Ensure there are no startup errors
3. Confirm existing session files are loaded successfully

If session files already exist, the registry should detect them on startup.

---

## Summary

This step introduces a lightweight session registry that:
- does not break existing behavior
- improves structure
- prepares the backend for proper session management

No functionality was removed or rewritten in this step.
