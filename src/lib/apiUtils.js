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

// ─── Backend URL Routing ─────────────────────────────────────────────────────
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const getApiUrl = (endpoint) => {
  if (isLocalhost) {
    // Locally, Vite is configured to proxy /api requests to the Render backend
    return endpoint;
  } else {
    // In production (FTP), route through the PHP proxy to avoid CORS
    return `/api-proxy.php?endpoint=${endpoint}`;
  }
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
