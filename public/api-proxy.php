<?php
/**
 * API Proxy — Forwards requests to the Limitless backend.
 * Upload this file to your FTP root (same folder as index.html).
 * This bypasses CORS because the request goes server-to-server.
 */

// Allow requests from your site only
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key');
header('Content-Type: application/json');

// Handle OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// The real backend URL for the original model service
define('BACKEND_URL', 'https://limitless-model.160-153-179-249.sslip.io');
define('EXECUTIVE_URL', 'https://limitless-executive.160-153-179-249.sslip.io');
define('COACH_URL', 'https://coach-v1.160-153-179-249.sslip.io');
define('ENGAGEMENT_URL', 'https://engagement-v1.160-153-179-249.sslip.io');
define('SCENARIO_URL', 'https://scenario-v1.160-153-179-249.sslip.io');

// Get the endpoint from query string: ?endpoint=/api/v1/generate-questions
$endpoint = isset($_GET['endpoint']) ? trim($_GET['endpoint']) : '';

// Check if this is a coach API endpoint
$is_coach = strpos($endpoint, '/api/v1/coach/') === 0;

// Check if this is an executive API endpoint
$is_executive = strpos($endpoint, '/api/v1/executive/') === 0 || $endpoint === '/api/v1/executive';

// Check if this is an engagement API endpoint
$is_engagement = strpos($endpoint, '/api/v1/engagement/') === 0;

// Check if this is a scenario API endpoint
$is_scenario = strpos($endpoint, '/api/v1/scenario') === 0 || strpos($endpoint, '/api/v1/levers') === 0;

if ($is_coach) {
    $target_url = COACH_URL . $endpoint;
} elseif ($is_executive) {
    // Strip "/api/v1/executive" and replace with "/v1" for the executive backend
    $target_endpoint = str_replace('/api/v1/executive', '/v1', $endpoint);
    $target_url = EXECUTIVE_URL . $target_endpoint;
} elseif ($is_engagement) {
    // Strip "/api/v1/engagement" and replace with "/api/v1" for the engagement backend
    $target_endpoint = str_replace('/api/v1/engagement', '/api/v1', $endpoint);
    $target_url = ENGAGEMENT_URL . $target_endpoint;
} elseif ($is_scenario) {
    $target_url = SCENARIO_URL . $endpoint;
} else {
    // Which endpoints are allowed to be proxied for the model service
    $allowed_endpoints = [
        '/api/v1/generate-questions',
        '/api/v1/analyze',
        '/api/v1/generate-pdf',
        '/api/v1/generate-teaser-pdf',
        '/api/v1/longitudinal-analysis',
    ];

    if (!in_array($endpoint, $allowed_endpoints)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid or missing endpoint']);
        exit();
    }
    
    $target_url = BACKEND_URL . $endpoint;
}

// Forward any extra query params (like user_id) to the backend
$extra_params = $_GET;
unset($extra_params['endpoint']); // Remove the 'endpoint' param itself
if (!empty($extra_params)) {
    $separator = (strpos($target_url, '?') !== false) ? '&' : '?';
    $target_url .= $separator . http_build_query($extra_params);
}

// Read request body
$body = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];

// Determine if this endpoint returns PDF (binary) or JSON
$is_pdf_endpoint = strpos($endpoint, 'pdf') !== false;

// Build headers
$headers = "Content-Type: application/json\r\nAccept: " . ($is_pdf_endpoint ? 'application/pdf' : 'application/json');

// Forward auth headers
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $headers .= "\r\nAuthorization: " . $_SERVER['HTTP_AUTHORIZATION'];
}
if (isset($_SERVER['HTTP_X_API_KEY'])) {
    $headers .= "\r\nX-API-Key: " . $_SERVER['HTTP_X_API_KEY'];
}

// Forward to backend
$context = stream_context_create([
    'http' => [
        'method'  => $method,
        'header'  => $headers,
        'content' => $body,
        'timeout' => 150,
        'ignore_errors' => true,
    ]
]);

$response = file_get_contents($target_url, false, $context);

// Get the HTTP status from the response headers
$http_status = 200;
if (isset($http_response_header)) {
    foreach ($http_response_header as $header) {
        if (preg_match('/HTTP\/\d\.\d (\d+)/', $header, $matches)) {
            $http_status = intval($matches[1]);
        }
    }
}

http_response_code($http_status);

if ($response === false) {
    echo json_encode(['error' => 'Failed to reach backend server']);
    exit();
}

// For PDF responses, output as binary
if ($is_pdf_endpoint && $http_status === 200) {
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="report.pdf"');
    echo $response;
} else {
    header('Content-Type: application/json');
    echo $response;
}
?>
