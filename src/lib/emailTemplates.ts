export function getThankYouEmailTemplate(firstName: string, lastName: string): string {
  const name = `${firstName} ${lastName}`.trim() || 'Valued Client';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Application</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f9f9f7;
      color: #111111;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header { background-color: #ffffff; padding: 0; text-align: center; border-bottom: 2px solid #f0f0f0; }
    .header-image { width: 100%; max-width: 600px; display: block; margin: 0 auto; }
    .content {
      padding: 30px;
    }
    .content p {
      margin-bottom: 20px;
      font-size: 16px;
    }
    .btn-container {
      text-align: center;
      margin: 30px 0;
    }
    .btn {
      display: inline-block;
      background-color: #c5a880;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 16px;
    }
    .footer {
      background-color: #e5e7eb;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }
    @media only screen and (max-width: 600px) {
      .container {
        margin: 20px;
        width: auto;
      }
      .content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://bakerjonesholdings.com/email/header.png" alt="Baker Jones Holdings" class="header-image" />
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      
      <p>Thank you for submitting your application to open an account with Baker Jones Holdings. We are excited about the opportunity to partner with you. We have successfully received your digital application form. Our onboarding team is currently reviewing your submitted information and AML (Anti-Money Laundering) documents to finalize your account setup. This standard verification process typically takes 1 to 2 business days.</p>
      
      <p><strong>What happens next:</strong></p>
      
      <ul>
        <li><strong>Approval & Documentation:</strong> Once your application is approved, we will send over the official transaction and offering documents tailored to your specific investment purchase (such as your designated bonds, IPOs, or fund allocations). <br/></li>
        <li><strong>Advisor Outreach:</strong> Alternatively, your dedicated advisor will be in touch shortly to walk you through the next steps and help complete your transaction.</li>
      </ul>
      
      <p>If you have any immediate questions, please reply directly to this email or contact our advisory desk at <a href="tel:+441182118521">0118 211 8521</a></p>
      
      
      <p>Best regards,<br>
      <strong>Baker Jones Holdings</strong></p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Baker Jones Holdings. All rights reserved.<br>
      Please do not reply to this automated email.
    </div>
  </div>
</body>
</html>
  `;
}

export interface ContactUsData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export function getContactAdminEmailTemplate(data: ContactUsData): string {
  const { firstName, lastName, email, phoneNumber, message } = data;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #ffffff; padding: 0; text-align: center; border-bottom: 2px solid #f0f0f0; }
    .header-image { width: 100%; max-width: 600px; display: block; margin: 0 auto; }
    .content { padding: 20px; background: #f9f9f9; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-top: 5px; background: #fff; padding: 10px; border-radius: 4px; border: 1px solid #eee;}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://bakerjonesholdings.com/email/header.png" alt="Baker Jones Holdings" class="header-image" />
    </div>
    <div style="padding: 20px 20px 0;">
      <h2 style="color: #1e134b; margin: 0;">New Contact Us Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${firstName} ${lastName}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">Phone Number:</div>
        <div class="value">${phoneNumber}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value" style="white-space: pre-wrap;">${message}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export function getContactThankYouEmailTemplate(firstName: string, lastName: string): string {
  const name = `${firstName} ${lastName}`.trim() || 'Valued Client';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f7; color: #111111; line-height: 1.6; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .header { background-color: #ffffff; padding: 0; text-align: center; border-bottom: 2px solid #f0f0f0; }
    .header-image { width: 100%; max-width: 600px; display: block; margin: 0 auto; }
    .content { padding: 30px; }
    .content p { margin-bottom: 20px; font-size: 16px; }
    .footer { background-color: #e5e7eb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://bakerjonesholdings.com/email/header.png" alt="Baker Jones Holdings" class="header-image" />
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to Baker Jones Holdings. We have successfully received your message.</p>
      <p>Our support team will review your inquiry and get back to you as soon as possible.</p>
      <p>Best regards,<br><strong>The Baker Jones Holdings Team</strong></p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Baker Jones Holdings. All rights reserved.<br>
      Please do not reply to this automated email.
    </div>
  </div>
</body>
</html>
  `;
}

export interface CareersData {
  name: string;
  email: string;
  message?: string;
}

export function getCareersAdminEmailTemplate(data: CareersData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background: #fff; }
    h2 { color: #1e134b; }
    .header { background-color: #ffffff; padding: 0; text-align: center; border-bottom: 2px solid #f0f0f0; margin-bottom: 20px; }
    .header-image { width: 100%; max-width: 600px; display: block; margin: 0 auto; }
    .field { margin-bottom: 10px; }
    .label { font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://bakerjonesholdings.com/email/header.png" alt="Baker Jones Holdings" class="header-image" />
    </div>
    <h2>New Career Application</h2>
    <div class="field"><span class="label">Name:</span> ${data.name}</div>
    <div class="field"><span class="label">Email:</span> ${data.email}</div>
    <div class="field"><span class="label">Message:</span><br/>${data.message ? data.message.replace(/\n/g, '<br/>') : 'N/A'}</div>
    <br/>
    <p>Please find the applicant's resume attached to this email.</p>
  </div>
</body>
</html>
  `;
}

export function getCareersThankYouEmailTemplate(name: string): string {
  const firstName = name.split(' ')[0] || 'Applicant';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - Baker Jones Holdings</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f7; color: #111111; line-height: 1.6; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .header { background-color: #ffffff; padding: 0; text-align: center; border-bottom: 2px solid #f0f0f0; }
    .header-image { width: 100%; max-width: 600px; display: block; margin: 0 auto; }
    .content { padding: 30px; }
    .content p { margin-bottom: 20px; font-size: 16px; }
    .footer { background-color: #e5e7eb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://bakerjonesholdings.com/email/header.png" alt="Baker Jones Holdings" class="header-image" />
    </div>
    <div class="content">
      <p>Dear ${firstName},</p>
      
      <p>Thank you for expressing your interest in joining Baker Jones Holdings! We are thrilled to confirm that we have successfully received your career application and resume.</p>
      
      <p>Our talent acquisition team is currently reviewing your profile to determine how your skills and experiences align with our current opportunities. If your qualifications match our needs, a member of our team will reach out to you regarding the next steps.</p>
      
      <p>We appreciate the time you took to apply and your interest in building a career with us.</p>
      
      <p>Best regards,<br>
      <strong>Baker Jones Holdings</strong></p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Baker Jones Holdings. All rights reserved.<br>
      Please do not reply to this automated email.
    </div>
  </div>
</body>
</html>
  `;
}
