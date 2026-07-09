# Backend Migration Documentation

This document provides a comprehensive overview of the current backend architecture used in the **Limitless** React application. It outlines the database schema (currently on Supabase), storage requirements, and the expected REST API endpoints. This will serve as a reference for migrating the backend to a Node.js ecosystem.

---

## 1. Database Schema

The system currently relies on the following relational tables. When migrating to Node.js (e.g., using PostgreSQL, MongoDB, or MySQL), ensure these entities and their relationships are preserved.

### `users` Table
Stores all user information, authentication details, and payment statuses.

| Column Name | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID / String | Primary key. Unique identifier for the user. |
| `name` | String | Full name of the user. |
| `email` | String | User's email address (Unique). |
| `temp_password` | String | A generated temporary password shown to the user on registration. |
| `password_hash` | String | Bcrypt hash of the user's password. |
| `password_reset_required` | Boolean | Flag indicating if the user must reset their password on first login (defaults to `true`). |
| `payment_status` | String | Current payment state (e.g., `'pending'`, `'paid'`). |
| `age` | Integer | User's age. |
| `gender` | String | User's gender (e.g., `'male'`, `'female'`, `'prefer-not-to-say'`). |
| `created_at` | Timestamp | Timestamp of when the user registered. |

### `assessments` Table
Stores the results of the cognitive assessments taken by users. A user can have multiple assessments (1-to-many relationship).

| Column Name | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID / String | Primary key. Unique identifier for the assessment. |
| `user_id` | UUID / String | Foreign key referencing `users.id`. |
| `report_json` | JSON / JSONB | The complete AI-generated analysis report data. |
| `pdf_url` | String | Public URL to the generated PDF report. |
| `created_at` | Timestamp | Timestamp of when the assessment was completed. |

### `plans` Table
Stores subscription or pricing plans (used in the admin dashboard).

| Column Name | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID / String | Primary key. |
| `price` | Numeric | Price of the plan. |
| *(Additional fields)* | Mixed | Name, features, etc. depending on your requirements. |

---

## 2. Storage Buckets

### `pdf-reports`
A cloud storage bucket where the generated PDF reports are saved.
- **Path Structure**: `{user_id}/{file_name}.pdf`
- **Access**: Files in this bucket must be publicly accessible via a URL, which is then saved to the `assessments.pdf_url` column.

---

## 3. Remote Procedure Calls (RPC) / Aggregations

### `get_admin_dashboard_stats`
Currently implemented as a Supabase RPC function.
- **Purpose**: Returns aggregated statistics for the admin dashboard (e.g., total users, total assessments, total revenue).
- **Node.js Migration**: This should be converted into a standard REST endpoint (e.g., `GET /api/admin/stats`) that runs SQL aggregate queries using your Node.js ORM/Query Builder.

---

## 4. Expected REST API Endpoints

The frontend application expects the following API endpoints to interact with the backend logic. In the new Node.js backend, you will need to implement these routes.

### AI / Assessment Logic Endpoints
Currently located under `/api/v1/*`.

**1. Generate Assessment Questions**
- **Endpoint**: `POST /api/v1/generate-questions`
- **Payload**: `{ "age": 30, "gender": "male", "locale": "en" }`
- **Response**: JSON array containing dynamically generated assessment sections and questions based on demographics.

**2. Analyze Assessment Responses**
- **Endpoint**: `POST /api/v1/analyze`
- **Payload**: 
  ```json
  {
    "assessmentId": "string",
    "age": 30,
    "gender": "male",
    "responses": [
      { "itemId": "q1", "value": 4 },
      { "itemId": "q2", "value": 2 }
    ]
  }
  ```
- **Response**: The final analyzed `report_json` object containing overall scores, domains, risks, and cognitive age estimates.

**3. Generate Full PDF Report**
- **Endpoint**: `POST /api/v1/generate-pdf`
- **Payload**: `{ "analysis": { ...report_json }, "brand": { "primaryColor": "...", "accentColor": "..." } }`
- **Response**: A binary PDF `Blob`.

**4. Generate Teaser PDF Report (Unpaid)**
- **Endpoint**: `POST /api/v1/generate-teaser-pdf`
- **Payload**: Same as full PDF generation.
- **Response**: A binary PDF `Blob` with limited/locked information.

### Database Operations (Previously Supabase Client)
The frontend currently uses the Supabase JS client to perform direct database queries. These must be replaced with REST API endpoints in the Node.js backend:

**User Management & Auth**
- `POST /api/auth/register`: Create a new user, hash password via `bcrypt`, return user data.
- `POST /api/auth/login`: Validate credentials, return JWT token and user metadata.
- `GET /api/users/:id`: Fetch a single user along with their assessment history (e.g., `SELECT *, assessments(*) FROM users WHERE id = ?`).
- `PATCH /api/users/:id`: Update user data (e.g., update `payment_status` to `'paid'`).

**Assessments**
- `POST /api/assessments`: Insert a new assessment record (`user_id`, `report_json`).
- `PATCH /api/assessments/:id`: Update an assessment record (e.g., saving the `pdf_url` after generation).

**Admin & Services**
- `GET /api/admin/users`: Fetch all users ordered by `created_at` DESC, including their latest assessments.
- `DELETE /api/admin/users/:id`: Delete a specific user.
- `GET /api/plans`: Fetch available pricing plans ordered by price.

---

## 5. Admin Panel Operations

The frontend admin panel (components: `Admin.jsx`, `AdminUserDetail.jsx`, `AdminLogin.jsx`) performs several specific actions that will need dedicated secure REST API endpoints in the Node.js backend. 

### Admin Authentication
Currently, the admin login uses hardcoded frontend credentials.
- **Migration Recommendation**: Implement a proper `POST /api/admin/login` endpoint that validates admin credentials securely from a database or secure environment variables, and returns an admin-level JWT.

### Fetching All Users (Admin Dashboard)
- **Endpoint**: `GET /api/admin/users`
- **Current Supabase Query**: `supabase.from('users').select('*, assessments(*)').order('created_at', { ascending: false })`
- **Expected Action**: The backend must fetch all users, join their assessment history, and order them by the newest users first. 

### Fetching a Single User Detail
- **Endpoint**: `GET /api/admin/users/:id`
- **Current Supabase Query**: `supabase.from('users').select('*, assessments(*)').eq('id', id).single()`
- **Expected Action**: The backend must fetch the specified user by ID along with all their past assessments to populate the detailed admin view.

### Deleting a User
- **Endpoint**: `DELETE /api/admin/users/:id`
- **Current Supabase Query**: `supabase.from('users').delete().eq('id', userId)`
- **Expected Action**: Delete the user and cascade the deletion to their associated `assessments` records if necessary.

---

## 6. Third-Party Integrations

### Email (EmailJS)
The frontend currently handles sending emails directly via EmailJS (`sendCredentialsEmail` and `sendPdfEmail`).
- **Migration Recommendation**: Move email dispatching logic to the Node.js backend (using libraries like `Nodemailer`, `SendGrid`, or `AWS SES`) for better security and reliability, rather than exposing templates and public keys on the frontend.

### Admin Notifications (FormSubmit.co)
Currently, in `EnquiryModal.jsx`, there is a fire-and-forget `fetch` call to `https://formsubmit.co/ajax/info@limitlessworld.net` to notify the admin of a new registration.
- **Migration Recommendation**: Remove this external frontend fetch. Instead, have the new Node.js registration endpoint (`POST /api/auth/register`) automatically send an internal notification email to the admin using your preferred backend email provider.
