<?php
/**
 * Simple PHP Proxy for Limitless API
 * This script forwards requests to bypass CORS limitations on the FTP server.
 */
set_time_limit(300); // Allow up to 5 minutes for PDF generation

// Allow CORS if necessary
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$path = isset($_GET['path']) ? ltrim($_GET['path'], '/') : '';
if (empty($path)) {
    http_response_code(400);
    echo json_encode(["error" => "No path provided"]);
    exit();
}

$targetUrl = 'https://limitless-mub2.onrender.com/api/' . $path;
$method = $_SERVER['REQUEST_METHOD'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_TIMEOUT, 300); // 5 minutes timeout for cURL
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Prevent SSL issues on some FTP servers

// Forward the JSON body
if ($method === 'POST' || $method === 'PUT') {
    $body = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    $error = curl_error($ch);
    curl_close($ch);
    http_response_code(500);
    echo json_encode(["error" => "Proxy Error: " . $error]);
    exit();
}

curl_close($ch);

// Set the correct response code and content type
http_response_code($httpCode);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
if ($contentType) {
    header("Content-Type: " . $contentType);
} else {
    header('Content-Type: application/json');
}

echo $response;
