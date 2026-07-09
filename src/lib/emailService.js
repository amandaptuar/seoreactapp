/**
 * Email Service using EmailJS
 * Sends credentials and PDF link emails to users.
 * 
 * Setup: Create a free account at https://emailjs.com
 * Then set these in your .env file:
 *   VITE_EMAILJS_SERVICE_ID=your_service_id
 *   VITE_EMAILJS_CREDENTIALS_TEMPLATE_ID=your_template_id
 *   VITE_EMAILJS_PDF_TEMPLATE_ID=your_pdf_template_id
 *   VITE_EMAILJS_PUBLIC_KEY=your_public_key
 */

import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_c6793c6';
const CREDENTIALS_TEMPLATE_ID = 'template_h7lqd9c';
const PDF_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_PDF_TEMPLATE_ID;
const PUBLIC_KEY = 'iPowivaI-tzAhr6aL';

const sendEmail = async (templateId, templateParams) => {
  if (!SERVICE_ID || !templateId || !PUBLIC_KEY) {
    console.warn('EmailJS not configured — skipping email send.');
    return { success: false, reason: 'not_configured' };
  }
  try {
    const response = await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
    console.log('EmailJS Success:', response.status, response.text);
    return { success: true };
  } catch (err) {
    console.error('EmailJS error:', err);
    return { success: false, error: err };
  }
};

/**
 * Send login credentials to the user after completing the questionnaire.
 */
export const sendCredentialsEmail = async ({ name, email, tempPassword }) => {
  return sendEmail(CREDENTIALS_TEMPLATE_ID, {
    to_name: name,
    to_email: email,
    user_email: email, // Added for compatibility
    email: email, // Added for compatibility
    username: email,
    temp_password: tempPassword,
    login_url: 'https://limitlessworld.net/',
  });
};

/**
 * Send a PDF download link to the user after generating the report.
 */
export const sendPdfEmail = async ({ name, email, pdfUrl }) => {
  return sendEmail(PDF_TEMPLATE_ID, {
    to_name: name,
    to_email: email,
    pdf_url: pdfUrl,
    login_url: 'https://limitlessworld.net/dashboard',
  });
};
