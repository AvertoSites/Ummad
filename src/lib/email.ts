/**
 * email.ts — EmailJS wrapper for UMAD notification emails
 *
 * Two triggers:
 *  1. sendApprovalEmail  → submitter when article is approved & published
 *  2. sendRejectionEmail → submitter when article is rejected (includes reason)
 *
 * Setup: fill in the 4 VITE_EMAILJS_* variables in .env
 * Docs:  https://www.emailjs.com/docs/
 */

import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const TEMPLATE_APPROVED = import.meta.env.VITE_EMAILJS_TEMPLATE_APPROVED as string;
const TEMPLATE_REJECTED = import.meta.env.VITE_EMAILJS_TEMPLATE_REJECTED as string;

/** Returns true if EmailJS credentials are configured */
function isConfigured(): boolean {
  return !!(
    SERVICE_ID &&
    PUBLIC_KEY &&
    SERVICE_ID !== "your_service_id" &&
    PUBLIC_KEY !== "your_public_key"
  );
}

export interface SubmitterInfo {
  title: string;
  authorName: string;
  authorEmail: string;
}

/**
 * Sent to the submitter when their article is approved and published.
 * Template variables: authorName, authorEmail, title, siteUrl
 */
export async function sendApprovalEmail(data: SubmitterInfo): Promise<void> {
  if (!isConfigured()) {
    console.warn("[EmailJS] Not configured — skipping approval email.");
    return;
  }
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_APPROVED,
    {
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      title: data.title,
      siteUrl: "https://ummad.net/news",
    },
    PUBLIC_KEY,
  );
}

/**
 * Sent to the submitter when their article is rejected.
 * Template variables: authorName, authorEmail, title, rejectionReason,
 *                     submitUrl, contactEmail
 */
export async function sendRejectionEmail(
  data: SubmitterInfo,
  rejectionReason: string,
): Promise<void> {
  if (!isConfigured()) {
    console.warn("[EmailJS] Not configured — skipping rejection email.");
    return;
  }
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_REJECTED,
    {
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      title: data.title,
      rejectionReason: rejectionReason || "No specific reason provided.",
      submitUrl: "https://ummad.net/article",
      contactEmail: "info.ummad26@gmail.com",
    },
    PUBLIC_KEY,
  );
}
