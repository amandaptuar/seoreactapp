/**
 * Central client for the Limitless Node.js backend (MongoDB).
 * Replaces all direct Supabase calls.
 *
 * Base URL resolution:
 *   1. VITE_BACKEND_URL env var (set in .env / hosting config)
 *   2. localhost dev  -> http://localhost:4000
 *   3. production     -> https://api.limitlessworld.net
 */

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL ||
  (isLocalhost
    ? 'http://localhost:4000'
    : 'https://limitless-api.160-153-179-249.sslip.io')
).replace(/\/+$/, '');

// ── Tokens ───────────────────────────────────────────────────────────────────

export const getToken = () => sessionStorage.getItem('authToken') || '';
export const setToken = (token) => sessionStorage.setItem('authToken', token || '');
export const getAdminToken = () => sessionStorage.getItem('adminToken') || '';
export const setAdminToken = (token) => sessionStorage.setItem('adminToken', token || '');

// ── Low-level request helper ─────────────────────────────────────────────────

const extractError = async (response) => {
  const body = await response.json().catch(() => ({}));
  if (body?.detail?.[0]?.msg) return body.detail[0].msg; // 422 validation shape
  if (body?.error) return body.error;
  return `Request failed (${response.status})`;
};

async function request(method, path, { body, token, retries = 1 } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let lastError;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${BACKEND_URL}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
      if (response.ok) {
        return response.status === 204 ? null : response.json();
      }
      // Don't retry client errors — they won't succeed
      if (response.status < 500) {
        const err = new Error(await extractError(response));
        err.status = response.status;
        throw err;
      }
      lastError = new Error(await extractError(response));
    } catch (err) {
      if (err.status && err.status < 500) throw err;
      lastError = err;
    }
    if (attempt < retries) await new Promise((r) => setTimeout(r, 2000));
  }
  throw lastError || new Error('Network error — please check your connection.');
}

export const apiGet = (path, opts) => request('GET', path, opts);
export const apiPost = (path, body, opts = {}) => request('POST', path, { ...opts, body });
export const apiPatch = (path, body, opts = {}) => request('PATCH', path, { ...opts, body });
export const apiDelete = (path, opts) => request('DELETE', path, opts);

// ── Session helpers ──────────────────────────────────────────────────────────

/** Persist login/registration data in sessionStorage (same keys as before). */
export function applyUserSession({ user, token, tempPassword }) {
  if (token) setToken(token);
  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('userEmail', user.email);
  sessionStorage.setItem('username', user.email);
  sessionStorage.setItem('name', user.name || '');
  sessionStorage.setItem('userId', user.id);
  sessionStorage.setItem('paymentStatus', user.payment_status === 'paid' ? 'yes' : 'no');
  sessionStorage.setItem('passwordResetRequired', user.password_reset_required ? 'true' : 'false');
  if (user.age) sessionStorage.setItem('userAge', String(user.age));
  if (user.gender) sessionStorage.setItem('userGender', user.gender);
  if (tempPassword) sessionStorage.setItem('generatedPassword', tempPassword);
}

// ── Auth ─────────────────────────────────────────────────────────────────────

/**
 * Email a 6-digit verification code (10 min validity, 60s resend cooldown).
 * Throws with .status 409 if the email is already registered.
 */
export const sendOtp = (email, name) =>
  apiPost('/api/auth/send-otp', { email: email.trim().toLowerCase(), name: name || undefined });

/**
 * Verify the emailed code. On success the email is cleared for registration
 * (30-minute window). Throws with the server message on a wrong/expired code.
 */
export const verifyOtp = (email, otp) =>
  apiPost('/api/auth/verify-otp', { email: email.trim().toLowerCase(), otp: String(otp).trim() });

/**
 * Register a new user. The backend generates the temporary password, hashes it,
 * and sends the official welcome email — no client-side bcrypt/EmailJS needed.
 * Throws with .status === 409 when the email is already registered.
 */
export async function registerUser({ name, email, age, gender, paymentStatus, passwordResetRequired }) {
  const data = await apiPost('/api/auth/register', {
    name,
    email,
    age: age ? parseInt(age, 10) : undefined,
    gender: gender || undefined,
    paymentStatus,
    passwordResetRequired,
  });
  applyUserSession(data);
  return data; // { user, tempPassword, token }
}

/** Log in with email + password (temporary or user-set). */
export async function loginUser(email, password) {
  const data = await apiPost('/api/auth/login', { email: email.trim().toLowerCase(), password });
  applyUserSession(data);
  if (data.latestAssessment?.report_json) {
    sessionStorage.setItem('analysisReport', JSON.stringify(data.latestAssessment.report_json));
  }
  return data; // { token, user, latestAssessment }
}

export async function changePassword(email, currentPassword, newPassword) {
  const data = await apiPost('/api/auth/change-password', { email, currentPassword, newPassword });
  sessionStorage.setItem('passwordResetRequired', 'false');
  return data;
}

// ── Users & assessments ──────────────────────────────────────────────────────
// These endpoints accept either the logged-in user's token (own data only)
// or an admin token (any user) — hence the fallback.

const anyToken = () => getToken() || getAdminToken();

/** User + full assessment history (newest first). */
export const fetchUserWithAssessments = (userId) =>
  apiGet(`/api/users/${userId}`, { token: anyToken() });

export const updateUser = (userId, fields) =>
  apiPatch(`/api/users/${userId}`, fields, { token: anyToken() });

export const markUserPaid = (userId) =>
  apiPatch(`/api/users/${userId}`, { payment_status: 'paid' }, { token: anyToken() });

export const saveAssessment = (userId, reportJson) =>
  apiPost('/api/assessments', { user_id: userId, report_json: reportJson }, { token: anyToken() });

/**
 * Server-side one-shot: generates the PDF via the AI model service, stores
 * it, saves the public URL on the given assessment, and (optionally) emails
 * the link to the user. Always pass `assessmentId` when the user has more
 * than one assessment — omitting it falls back to their latest one.
 * Returns { pdfUrl, fileName, assessment }.
 */
export const storeReportPdf = (userId, analysis, { assessmentId, teaser = false, sendEmail = false } = {}) =>
  apiPost(`/api/reports/${userId}/pdf`, {
    analysis,
    assessmentId,
    brand: { primaryColor: '#3B82F6', accentColor: '#6366F1' },
    teaser,
    sendEmail,
  }, { token: anyToken() });

// ── Enquiries (public contact/feedback form) ─────────────────────────────────

export const submitEnquiry = ({ name, email, message }) =>
  apiPost('/api/enquiries', { name, email, message });

// ── Admin ────────────────────────────────────────────────────────────────────

export async function adminLogin(username, password) {
  const data = await apiPost('/api/admin/login', { username, password });
  setAdminToken(data.token);
  sessionStorage.setItem('adminLoggedIn', 'true');
  sessionStorage.setItem('isAuthenticated', 'true');
  return data;
}

export const adminGetUsers = () => apiGet('/api/admin/users', { token: getAdminToken() });
export const adminGetUser = (id) => apiGet(`/api/admin/users/${id}`, { token: getAdminToken() });
export const adminDeleteUser = (id) => apiDelete(`/api/admin/users/${id}`, { token: getAdminToken() });
export const adminGetEnquiries = () => apiGet('/api/admin/enquiries', { token: getAdminToken() });
export const adminDeleteEnquiry = (id) => apiDelete(`/api/admin/enquiries/${id}`, { token: getAdminToken() });
export const adminGetStats = () => apiGet('/api/admin/stats', { token: getAdminToken() });
export const adminUpdateUserStatus = (id, payment_status) =>
  apiPatch(`/api/users/${id}`, { payment_status }, { token: getAdminToken() });

export const getPlans = () => apiGet('/api/plans');

export const createCheckoutSession = () =>
  apiPost('/api/v1/payments/create-checkout-session', {}, { token: anyToken() });
