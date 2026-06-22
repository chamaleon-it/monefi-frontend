import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zeptomail.eu',
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER || 'emailapikey',
    pass: process.env.SMTP_PASSWORD,
  },
});

async function test() {
  try {
    const info = await transporter.sendMail({
      from: '"Baker Jones Holdings" <noreply@bakerjonesholdings.com>',
      to: 'info@bakerjonesholdings.com',
      subject: 'Test Email via Script',
      html: '<p>Test</p>',
    });
    console.log('Success:', info.messageId);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
