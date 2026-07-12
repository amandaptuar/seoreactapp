<?php
/**
 * API Proxy — Forwards requests to the Limitless backend.
 * Upload this file to your FTP root (same folder as index.html).
 * This bypasses CORS because the request goes server-to-server.
 */

// Allow requests from your site only
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// The real backend URL
define('BACKEND_URL', 'https://limitless-model.160-153-179-249.sslip.io');

// Which endpoints are allowed to be proxied
$allowed_endpoints = [
    '/api/v1/generate-questions',
    '/api/v1/analyze',
    '/api/v1/generate-pdf',
    '/api/v1/generate-teaser-pdf',
    '/api/v1/longitudinal-analysis',
];

// Get the endpoint from query string: ?endpoint=/api/v1/generate-questions
$endpoint = isset($_GET['endpoint']) ? trim($_GET['endpoint']) : '';

if (!in_array($endpoint, $allowed_endpoints)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing endpoint']);
    exit();
}

// Read request body
$body = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];

// Determine if this endpoint returns PDF (binary) or JSON
$is_pdf_endpoint = strpos($endpoint, 'pdf') !== false;

// Forward to backend
$context = stream_context_create([
    'http' => [
        'method'  => $method,
        'header'  => "Content-Type: application/json\r\nAccept: " . ($is_pdf_endpoint ? 'application/pdf' : 'application/json'),
        'content' => $body,
        'timeout' => 150,
        'ignore_errors' => true,
    ]
]);

$target_url = BACKEND_URL . $endpoint;
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
