# Step 3: Session Validation Middleware

After adding session tracking and lifecycle status, the backend still accepted
any sessionId without validation.

This step adds a middleware that validates sessionId before request processing.

---

## Problem before this step

Before this change:
- Routes trusted incoming sessionId blindly
- Invalid sessionIds caused errors later
- Session checks were repeated in controllers
- Error handling was inconsistent

---

## What was added

A middleware called `validateSession` was introduced.

This middleware:
- checks if sessionId is present
- verifies that the session exists
- blocks failed sessions
- stops invalid requests early

---

## How it works

The middleware reads `sessionId` from:
- URL params
- request body
- query string

If the session is invalid, the request is stopped with a clear error response.
If valid, the request continues to the controller.

---

## Why middleware was chosen

Middleware keeps validation logic in one place.
This avoids duplication and keeps controllers simple.

---

## What this step does not change

This step does not:
- modify session creation
- change storage logic
- affect frontend behavior
- add new APIs

It only improves request safety.

---

## Why this step matters

With validation in place:
- Backend fails early and clearly
- Session logic becomes reliable
- Future APIs can assume valid sessions
- Debugging becomes easier

---

## Summary

This step adds a reusable session validation layer that improves safety and
clarity without changing existing behavior.
