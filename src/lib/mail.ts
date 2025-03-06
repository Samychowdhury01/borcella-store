
import nodemailer from "nodemailer";


type MailOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Connection Verified ✅", process.env.EMAIL_USER);
  }
});

export async function sendMail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  const mailOptions: MailOptions = {
    from: process.env.EMAIL_USER as string, 
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false;
  }
}
