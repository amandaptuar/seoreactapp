/**
 * Fetch with automatic retry for cold-start backend (Render free tier).
 * Retries up to `retries` times with a small delay between attempts.
 */
export async function fetchWithRetry(url, options = {}, retries = 3, delayMs = 2000) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 150000); // 150s timeout per attempt

      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) return response;

      // If it's a 422 (validation error), don't retry — it won't succeed
      if (response.status === 422) {
        const errBody = await response.json().catch(() => ({}));
        const detail = errBody?.detail?.[0]?.msg || JSON.stringify(errBody);
        throw new Error(`Validation error: ${detail}`);
      }

      // For 5xx errors, log and retry
      const errText = await response.text().catch(() => 'Unknown server error');
      lastError = new Error(`Server error (${response.status}): ${errText}`);
      console.warn(`Attempt ${attempt} failed with ${response.status}. Retrying...`);

    } catch (err) {
      if (err.name === 'AbortError') {
        lastError = new Error('Request timed out. The AI server may be waking up — please try again.');
      } else if (err.message.startsWith('Validation error:')) {
        throw err; // Re-throw validation errors immediately
      } else {
        lastError = err;
        console.warn(`Attempt ${attempt} threw error:`, err.message);
      }
    }

    if (attempt < retries) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  throw new Error(
    `The AI server is busy or starting up. Please wait a moment and try again. (${lastError?.message || 'Connection failed'})`
  );
}

// ─── AI Model Service Routing ────────────────────────────────────────────────
// AI endpoints (generate-questions / analyze / PDFs / longitudinal-analysis)
// are served by the Python model service (limitless-model.*.sslip.io). It has
// no CORS, so requests are proxied same-origin:
//   • local dev        → Vite proxy (see vite.config.js)
//   • VPS preview site → nginx "location /api/" proxy on the same host
//   • PHP web hosting  → /api-proxy.php
// Account/database/admin calls use the Node.js backend instead — lib/backendApi.js.
const host = window.location.hostname;
const hasSameOriginProxy =
  host === 'localhost' || host === '127.0.0.1' || host.endsWith('.sslip.io');

export const getApiUrl = (endpoint) => {
  if (hasSameOriginProxy) {
    return endpoint; // proxied to the model service by Vite (dev) or nginx (VPS)
  }
  // Split endpoint into path and query parts for the PHP proxy
  // e.g. "/api/v1/executive/instrument/pss10?user_id=123" becomes
  //   /api-proxy.php?endpoint=/api/v1/executive/instrument/pss10&user_id=123
  const [path, query] = endpoint.split('?');
  let url = `/api-proxy.php?endpoint=${encodeURIComponent(path)}`;
  if (query) url += `&${query}`;
  return url;
};

/**
 * Calls the generate-questions API with retry support.
 */
export async function generateAssessmentQuestions(age, gender) {
  let normalizedGender = (gender || 'prefer-not-to-say').toString().trim().toLowerCase();
  const validGenders = ['female', 'male', 'other', 'prefer-not-to-say'];
  if (!validGenders.includes(normalizedGender)) {
    normalizedGender = 'prefer-not-to-say';
  }

  const response = await fetchWithRetry(
    getApiUrl('/api/v1/generate-questions'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: parseInt(age, 10) || 30, gender: normalizedGender, locale: 'en' }),
    },
    3,   // 3 retries
    3000 // 3s between retries
  );
  return response.json();
}

/**
 * Calls the generate-pdf API with retry support.
 */
export async function generatePdf(analysisData, teaser = false) {
  const endpoint = teaser ? '/api/v1/generate-teaser-pdf' : '/api/v1/generate-pdf';
  const response = await fetchWithRetry(
    getApiUrl(endpoint),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis: analysisData }),
    },
    2,   // 2 retries for PDF
    3000
  );
  return response;
}

/**
 * Calls the longitudinal-analysis API with retry support.
 */
export async function fetchLongitudinalAnalysis(userId, history) {
  const response = await fetchWithRetry(
    getApiUrl('/api/v1/longitudinal-analysis'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, history }),
    },
    2,
    3000
  );
  return response.json();
}

// ─── Limitless Executive AI Coach API ─────────────────────────────────────────

// Use the proxy to avoid CORS issues
const EXECUTIVE_API_BASE = '/api/v1/executive';

async function fetchExecutiveApi(endpoint, token, userId) {
  if (!token) throw new Error("No auth token provided");
  
  const separator = endpoint.includes('?') ? '&' : '?';
  const finalEndpoint = userId ? `${endpoint}${separator}user_id=${userId}` : endpoint;
  
  const response = await fetchWithRetry(
    getApiUrl(`${EXECUTIVE_API_BASE}${finalEndpoint}`),
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-API-Key': 'DXgBpoByl6UvMsD9KgVa4MAJILeiI8JqUDd4YzDPQzs'
      }
    },
    2,
    2000
  );
  return response.json();
}

/**
 * Fetches the Executive Overview (scores, features, streak, etc.)
 */
export async function fetchExecutiveOverview(token, userId) {
  return fetchExecutiveApi('/overview', token, userId);
}

/**
 * Fetches the Cognitive Health Agent insights
 */
export async function fetchCognitiveHealthAgent(token, userId) {
  return fetchExecutiveApi('/agents/cognitive-health', token, userId);
}

/**
 * Fetches the Stress & Burnout Agent insights
 */
export async function fetchStressBurnoutAgent(token, userId) {
  return fetchExecutiveApi('/agents/stress-burnout', token, userId);
}

/**
 * Fetches the initial AI Coach follow-up suggestions based on the analysis.
 */
export async function fetchCoachSuggestions(analysis) {
  const response = await fetchWithRetry(
    getApiUrl('/api/v1/coach/suggestions'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis, locale: 'en' }),
    },
    2,
    2000
  );
  return response.json();
}

/**
 * Sends a chat message to the AI Coach and gets the response along with new suggestions.
 */
export async function fetchCoachChat(analysis, messages) {
  const response = await fetchWithRetry(
    getApiUrl('/api/v1/coach/chat'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis, messages, locale: 'en' }),
    },
    2,
    2000
  );
  return response.json();
}

// ─── Limitless Daily Engagement API ───────────────────────────────────────────

/**
 * Generates a 30-day engagement roadmap from the user's assessment analysis.
 * POST /api/v1/engagement/roadmap
 */
export async function fetchEngagementRoadmap(analysis, taskPolicy = {}) {
  const response = await fetchWithRetry(
    getApiUrl('/api/v1/engagement/roadmap'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis, taskPolicy }),
    },
    2,
    3000
  );
  return response.json();
}

/**
 * Gets the daily engagement summary (wellness state, adherence, trends).
 * POST /api/v1/engagement/summary
 */
export async function fetchEngagementSummary(state, today = null) {
  const body = { state };
  if (today) body.today = today;
  const response = await fetchWithRetry(
    getApiUrl('/api/v1/engagement/summary'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
    2,
    3000
  );
  return response.json();
}

// ─── Limitless What-If Scenario API ───────────────────────────────────────────

/**
 * Fetches the calibrated scenario levers, horizon limits, and model metadata.
 * GET /api/v1/levers
 */
export async function fetchScenarioLevers() {
  const response = await fetchWithRetry(
    getApiUrl('/api/v1/levers'),
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
    2,
    2000
  );
  return response.json();
}

/**
 * Simulates cognitive trajectory projections based on adjusted levers.
 * POST /api/v1/scenario
 * @param {Object} analysis - The AnalyzeResponse held by the client
 * @param {Object} current - Current baseline per lever { sleepHours: 6, ... }
 * @param {Object} target - Target goal per lever { sleepHours: 8, ... }
 * @param {number} horizonWeeks - Projection horizon (default 4.0, max 26.0)
 */
export async function fetchScenarioSimulation(analysis, current = {}, target = {}, horizonWeeks = 4.0) {
  const response = await fetchWithRetry(
    getApiUrl('/api/v1/scenario'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        analysis,
        current,
        target,
        horizonWeeks: Number(horizonWeeks) || 4.0,
      }),
    },
    2,
    2500
  );
  return response.json();
}

