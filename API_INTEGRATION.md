# Limitless — Backend API Integration Guide

**For:** Aman (frontend + admin panel) · **From:** Sanchit · **Updated:** 12 July 2026

Supabase has been fully replaced by our own backend. This document is the complete
API reference for integrating **both** the user website and the admin panel.

> ⚡ **Important:** this branch (`mongodb-backend-migration`) already contains the
> full integration — every Supabase call in the site and the embedded admin panel
> (`src/dashbaord-app`) has been replaced and tested end-to-end. You do NOT need to
> re-integrate the existing pages. This doc is the reference for **new features**,
> and for the standalone `dashbaord/` app if you still use it (it's currently stale —
> copy the migrated `src/dashbaord-app/services/api.ts` + `src/lib/backendApi.js` pattern).

---

## 1. Architecture — two services, one rule

| Service | Base URL (production) | What it serves |
|---|---|---|
| **Node.js backend** (MongoDB) | `https://limitless-api.160-153-179-249.sslip.io` | Accounts, auth, assessments storage, admin, enquiries, plans, PDF storage, emails |
| **Python AI model service** | `https://limitless-model.160-153-179-249.sslip.io` | AI endpoints only: `generate-questions`, `analyze`, `generate-pdf`, `generate-teaser-pdf`, `longitudinal-analysis` |

**The rule:**
- **AI endpoints** → call via `getApiUrl()` from `src/lib/apiUtils.js`. The model
  service has **no CORS**, so calls are proxied same-origin automatically
  (Vite proxy in dev → nginx `/api/` on the sslip preview host → `api-proxy.php`
  on the PHP hosting). Never call the model URL directly from the browser.
- **Everything else** → use the helpers in **`src/lib/backendApi.js`**. The Node
  backend has CORS enabled, calls go direct. Base URL comes from `VITE_BACKEND_URL`
  (defaults: `http://localhost:4000` in dev, the sslip API URL in production).

**Live demo of the integrated build:** https://limitless.160-153-179-249.sslip.io

---

## 2. Authentication

Two JWT types, both sent as `Authorization: Bearer <token>`:

| Token | Obtained from | Stored (sessionStorage key) | Expiry |
|---|---|---|---|
| User token | `POST /api/auth/register` or `/api/auth/login` | `authToken` | 7 days |
| Admin token | `POST /api/admin/login` | `adminToken` | 12 hours |

`backendApi.js` stores and attaches tokens automatically. User-scoped endpoints
accept the user's own token **or** an admin token.

**Error shapes** (uniform):
- `401` invalid/missing token or wrong credentials → `{ "error": "..." }`
- `403` valid token, not allowed (e.g. another user's data) → `{ "error": "..." }`
- `409` duplicate (email already registered / already in use) → `{ "error": "..." }`
- `422` validation → `{ "detail": [{ "loc": [...], "msg": "...", "type": "value_error" }] }`
- `503` database unreachable → `{ "error": "Database not available" }`

---

## 3. Node backend — endpoint reference

### 3.1 Auth (public)

**`POST /api/auth/send-otp`** — `{ "email", "name"? }`
Emails a 6-digit verification code. `200 { "sent": true, "expiresInMinutes": 10 }` ·
`409` email already registered · `429` resend within 60s cooldown · code valid 10 min,
max 5 wrong attempts. (In non-production without SMTP, the response includes `devOtp` for testing.)

**`POST /api/auth/verify-otp`** — `{ "email", "otp" }`
→ `200 { "verified": true }` · `400 { "error": "OTP invalid" }` (or expired) · `429` too many attempts.
On success the email is cleared for registration for **30 minutes**.

**`POST /api/auth/register`**
⚠️ **Requires a verified email** — returns `403 { "error": "Please verify your email with the OTP first." }`
otherwise (backend-enforced; can be disabled with `OTP_REQUIRED=false` env). Frontend helpers:
`sendOtp(email, name)` / `verifyOtp(email, otp)` in `backendApi.js`.
```json
{ "name": "Atul Jain", "email": "atul@example.com", "age": 45, "gender": "male",
  "paymentStatus": "demo",            // optional: only "pending" (default) or "demo"
  "passwordResetRequired": false }     // optional, default true
```
→ `201 { "user": {…}, "tempPassword": "8CHARPWD", "token": "jwt…" }` · `409` if email exists.
Side effects: sends the official **welcome email** (subject `Welcome <FirstName> | Limitless World`)
and an admin notification to `info@limitlessworld.net`. No client-side bcrypt or EmailJS anymore.

**`POST /api/auth/login`** — `{ "email", "password" }` (temp or user-set password)
→ `200 { "token", "user": {…}, "latestAssessment": {…}|null }`

**`POST /api/auth/change-password`** — `{ "email", "currentPassword", "newPassword" }`
→ clears the temp password + `password_reset_required` flag.

**User object** (`password_hash` never returned; `temp_password` only in admin responses):
```json
{ "id": "6a4f…", "name": "…", "email": "…", "password_reset_required": true,
  "payment_status": "pending|paid|demo|free|trial|suspended",
  "age": 45, "gender": "male", "created_at": "…", "updated_at": "…" }
```

### 3.2 Users (user's own token or admin token)

- **`GET /api/users/:id`** → user + `"assessments": […]` (newest first)
- **`PATCH /api/users/:id`** → any of `name, email, age, gender, payment_status`.
  Compat: `report_json` / `pdf_url` are accepted and written to the **latest assessment**.
  `409` if the new email is taken; `422` on invalid `payment_status`.

### 3.3 Assessments (user/admin token)

- **`POST /api/assessments`** — `{ "user_id", "report_json", "pdf_url"? }` → `201` record.
  ⚠️ The model service does NOT save reports — after `analyze`, always save via this
  endpoint (see `Question.jsx` / `saveAssessment()`).
- **`PATCH /api/assessments/:id`** — update `report_json` / `pdf_url`.
- Assessment object: `{ id, user_id, report_json, pdf_url, created_at, updated_at }`

### 3.4 PDF reports & files

- **`POST /api/reports/:userId/pdf`** (user/admin token)
  `{ "analysis": <report json>, "teaser": false, "sendEmail": true }`
  One call: generates the PDF server-side, stores it, saves the public URL on the
  latest assessment, optionally emails the link. → `201 { "pdfUrl", "fileName", "assessment" }`
- **`POST /api/files/pdf-reports/:userId?fileName=x.pdf`** — raw `application/pdf` body upload → `201 { "publicUrl" }`
- **`GET /files/pdf-reports/:userId/:fileName`** — public, streams the stored PDF (this is what `pdf_url` points to)

### 3.5 Enquiries (contact / feedback form)

- **`POST /api/enquiries`** (public) — `{ "name", "email", "message" }` → `201`.
  Also emails the admin inbox (replaces formsubmit.co).
- Enquiry object: `{ id, name, email, message, status: "new|read|resolved", created_at }`

### 3.6 Admin (admin token required)

- **`POST /api/admin/login`** — `{ "username", "password" }` → `{ "token" }`.
  Credentials are server-side env vars (same values as the old hardcoded login for now — change on the server, not in code). Rate-limited.
- **`GET /api/admin/users`** — all users newest-first; each includes `assessments: […]`,
  `temp_password`, and the latest `report_json` / `pdf_url` mirrored onto the user
  (same shape the old `select('*, assessments(*)')` produced).
- **`GET /api/admin/users/:id`** — single user, same shape.
- **`DELETE /api/admin/users/:id`** — cascades: deletes the user's assessments **and stored PDFs**.
- **`GET /api/admin/enquiries`** / **`DELETE /api/admin/enquiries/:id`**
- **`GET /api/admin/stats`** →
  ```json
  { "total_users": 0, "paid_users": 0, "pending_users": 0, "demo_users": 0,
    "free_users": 0, "suspended_users": 0, "completed_assessments": 0,
    "users_with_report": 0, "new_users_24h": 0, "mrr": 0, "conversion_rate": 0 }
  ```
- **Bulk actions** (suspend/unsuspend/delete): loop `PATCH /api/users/:id` with
  `payment_status: "suspended" | "paid"` or `DELETE /api/admin/users/:id`
  (see `handleBulkSuspend` in `src/dashbaord-app/pages/Users.tsx`).

### 3.7 Misc

- **`GET /api/plans`** (public) — active plans by price (a $19 "Premium Report" plan is seeded).
- **`GET /health`** — `{ status, features: { database, ai, stripeWebhook, email } }`
- **`POST /api/v1/webhooks/stripe`** — Stripe payment confirmation (server-to-server; needs `STRIPE_WEBHOOK_SECRET`).

---

## 4. AI model service — via `getApiUrl()` only

Same contracts as before (unchanged from the Render days):

- `POST /api/v1/generate-questions` — `{ age, gender, locale }` → `{ assessmentId, sections: [{ id, title, items: [{ id, text }] }] }`
- `POST /api/v1/analyze` — `{ assessmentId, age, gender, responses: [{ itemId, value }] }` → report JSON
  (**remember to persist it via `POST /api/assessments` afterwards**)
- `POST /api/v1/generate-pdf` / `generate-teaser-pdf` — `{ analysis, brand? }` → PDF binary
- `POST /api/v1/longitudinal-analysis` — `{ userId, history: [{ sessionTimestamp, analysis }, …] }` (min 2 items)

`api-proxy.php` on the web hosting must whitelist these endpoints and point
`BACKEND_URL` at `https://limitless-model.160-153-179-249.sslip.io` (already done on this branch).

---

## 5. Frontend conventions already in place

- **`src/lib/backendApi.js`** — the single client for the Node backend: use its
  exported helpers (`registerUser`, `loginUser`, `fetchUserWithAssessments`,
  `adminGetUsers`, `submitEnquiry`, `storeReportPdf`, …) instead of raw `fetch`.
- **sessionStorage contract** (unchanged keys): `authToken, adminToken, isLoggedIn,
  userId, userEmail, username, name, userAge, userGender, generatedPassword,
  paymentStatus, passwordResetRequired, analysisReport, assessmentId, assessmentSections`.
- **Env:** `.env` → `VITE_BACKEND_URL` (leave empty for the defaults). The old
  `VITE_SUPABASE_*` / `VITE_EMAILJS_*` vars are gone.
- **Local dev:** run the backend (`cd backend && npm run dev`, port 4000 — repo:
  the "Limit less backend" project) — or just point `VITE_BACKEND_URL` at the live API.

## 6. Deployment status

| Piece | Status |
|---|---|
| Node backend on VPS (PM2 `limitless-backend`, port 4000, HTTPS) | ✅ live |
| Model service on VPS (port 8001, HTTPS) | ✅ live |
| Migrated frontend preview | ✅ https://limitless.160-153-179-249.sslip.io |
| This branch merged to `main` | ⬜ pending PR review |
| limitlessworld.net (PHP hosting) updated with new `dist/` + `api-proxy.php` | ⬜ pending FTP upload |

Questions → Sanchit.
