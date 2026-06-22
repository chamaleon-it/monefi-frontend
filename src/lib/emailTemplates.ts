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
    .header {
      background-color: #090A2C;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
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
      <h1>Baker Jones Holdings</h1>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      
      <p>Thank you for submitting your application to Baker Jones Holdings. We are pleased to confirm that we have received it successfully.</p>
      
      <p>Our team is currently reviewing your details. We will process your application shortly and follow up with you regarding the next steps.</p>
      
      <p>If you have any urgent questions or require further assistance, please do not hesitate to contact our support team.</p>
      
      <div class="btn-container">
        <a href="https://bakerjonesholdings.com/contact" class="btn">Contact Support</a>
      </div>
      
      <p>Best regards,<br>
      <strong>The Baker Jones Holdings Team</strong></p>
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
