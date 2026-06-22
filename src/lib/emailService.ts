import nodemailer from 'nodemailer';
import { getThankYouEmailTemplate } from './emailTemplates';

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zeptomail.eu',
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
});

export const sendThankYouEmail = async (
  toEmail: string,
  firstName: string,
  lastName: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const htmlContent = getThankYouEmailTemplate(firstName, lastName);
    const fromName = process.env.SMTP_FROM_NAME || 'Baker Jones Holdings';
    const fromEmail = process.env.SMTP_FROM_EMAIL || 'noreply@bakerjonesholdings.com';

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      subject: 'Thank You for Your Application',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${toEmail}. Message ID: ${info.messageId}`);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending thank you email:', error);
    // Return success: false but do not throw to prevent breaking application flow
    return { success: false, message: 'Failed to send email' };
  }
};

import { ContactUsData, getContactAdminEmailTemplate, getContactThankYouEmailTemplate } from './emailTemplates';

export const sendContactUsEmails = async (data: ContactUsData): Promise<{ success: boolean; message: string }> => {
  try {
    const adminHtmlContent = getContactAdminEmailTemplate(data);
    const clientHtmlContent = getContactThankYouEmailTemplate(data.firstName, data.lastName);
    
    const fromName = process.env.SMTP_FROM_NAME || 'Baker Jones Holdings';
    const fromEmail = process.env.SMTP_FROM_EMAIL || 'noreply@bakerjonesholdings.com';
    const adminEmail = process.env.ADMIN_EMAIL || 'info@bakerjonesholdings.com';

    // 1. Email to Admin
    const adminMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      subject: 'New Contact Us Submission',
      html: adminHtmlContent,
    };

    // 2. Email to Client
    const clientMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: data.email,
      subject: 'Thank You for Contacting Us',
      html: clientHtmlContent,
    };

    // Send both emails concurrently
    const results = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Failed to send email ${index === 0 ? 'to admin' : 'to client'}:`, result.reason);
      } else {
        console.log(`Email successfully sent ${index === 0 ? 'to admin' : 'to client'}. Message ID: ${result.value.messageId}`);
      }
    });

    return { success: true, message: 'Emails processed' };
  } catch (error) {
    console.error('Error in sendContactUsEmails:', error);
    return { success: false, message: 'Failed to process emails' };
  }
};
