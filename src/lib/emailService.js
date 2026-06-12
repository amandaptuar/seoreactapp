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

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const CREDENTIALS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CREDENTIALS_TEMPLATE_ID;
const PDF_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_PDF_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const sendEmail = async (templateId, templateParams) => {
  if (!SERVICE_ID || !templateId || !PUBLIC_KEY) {
    console.warn('EmailJS not configured — skipping email send.');
    return { success: false, reason: 'not_configured' };
  }
  try {
    const { default: emailjs } = await import('@emailjs/browser');
    await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
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
    username: email,
    temp_password: tempPassword,
    login_url: window.location.origin + '/',
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
    login_url: window.location.origin + '/dashboard',
  });
};
