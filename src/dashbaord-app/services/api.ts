/**
 * Admin dashboard service layer — talks to the Limitless Node.js backend
 * (MongoDB) through the shared API client. Requires an admin login first
 * (see pages/Login.tsx) which stores the admin JWT.
 */

import {
  adminGetUsers,
  adminGetUser,
  adminDeleteUser,
  adminGetEnquiries,
  adminDeleteEnquiry,
  adminGetStats,
  adminUpdateUserStatus,
  getPlans as fetchPlans,
} from '../../lib/backendApi';

// Users — backend returns them newest-first, each with assessments[] and the
// latest report_json / pdf_url mirrored onto the user object.
export async function getUsers() {
  return adminGetUsers();
}

export async function getUserById(id: string) {
  return adminGetUser(id);
}

export async function updateUserStatus(id: string, status: string) {
  return adminUpdateUserStatus(id, status);
}

export async function deleteUser(id: string) {
  await adminDeleteUser(id);
  return true;
}

// Enquiries (contact/feedback form submissions)
export async function getEnquiries() {
  return adminGetEnquiries();
}

export async function deleteEnquiry(id: string) {
  await adminDeleteEnquiry(id);
  return true;
}

// Subscriptions / Plans
export async function getPlans() {
  return fetchPlans();
}

// Dashboard KPIs (aggregated server-side)
export async function getDashboardStats() {
  return adminGetStats();
}
