const nodemailer = require("nodemailer");
require("dotenv").config();

// Button styles as reusable constants
const BUTTONS = {
  primary: `
    display: inline-block;
    padding: 16px 32px;
    background: linear-gradient(135deg, #ff8c00, #ff2d55);
    color: white;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin: 15px 5px;
    text-align: center;
  `,
  secondary: `
    display: inline-block;
    padding: 14px 28px;
    background: white;
    color: #ff8c00;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    border-radius: 6px;
    border: 2px solid #ff8c00;
    transition: all 0.3s ease;
    margin: 10px 5px;
    text-align: center;
  `
};

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const generateHeaderFooter = () => {
  return {
    header: `
      <div style="
        background: linear-gradient(135deg, #ff8c00, #ff2d55);
        color: white;
        padding: 40px 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
         
        "></div>
        
        <h1 style="
          font-size: 32px;
          margin: 0;
          padding: 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        ">Welcome to EduQuest 🎓</h1>
        
        <p style="
          font-size: 18px;
          margin: 10px 0 0;
          opacity: 0.9;
        ">Your Learning Adventure Starts Here!</p>
      </div>
    `,
    footer: `
      <div style="
        background: #2c3e50;
        color: white;
        padding: 30px 20px;
        text-align: center;
        border-radius: 0 0 8px 8px;
      ">
        <div style="max-width: 500px; margin: 0 auto;">
          <div style="margin-bottom: 20px;">
            <h3 style="color: #ff8c00; margin-bottom: 15px;">Connect With Us</h3>
            <a href="#" style="color: white; text-decoration: none; margin: 0 10px; font-size: 20px;">📱</a>
            <a href="#" style="color: white; text-decoration: none; margin: 0 10px; font-size: 20px;">🐦</a>
            <a href="#" style="color: white; text-decoration: none; margin: 0 10px; font-size: 20px;">💼</a>
            <a href="#" style="color: white; text-decoration: none; margin: 0 10px; font-size: 20px;">📸</a>
          </div>

          <div style="margin: 20px 0; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1);">
            <p style="margin: 5px 0;">📍 123 Learning Street, Education City, EC 12345</p>
            <p style="margin: 5px 0;">
              <a href="mailto:support@eduquest.com" style="color: #ff8c00; text-decoration: none;">📧 support@eduquest.com</a>
            </p>
            <p style="margin: 5px 0;">
              <a href="tel:+1234567890" style="color: #ff8c00; text-decoration: none;">📞 +1 (234) 567-890</a>
            </p>
          </div>

          <p style="margin: 0; color: #888;">© ${new Date().getFullYear()} EduQuest. All rights reserved.</p>
          <div style="margin-top: 10px;">
            <a href="${process.env.FRONTEND_URL}/privacy" style="color: #ff8c00; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
            <a href="${process.env.FRONTEND_URL}/terms" style="color: #ff8c00; text-decoration: none; margin: 0 10px;">Terms of Service</a>
          </div>
        </div>
      </div>
    `,
  };
};

const sendWelcomeEmail = async (userEmail, userName) => {
  const bodyContent = `
    <div style="padding: 40px 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #ff8c00; font-size: 32px; margin-bottom: 20px;">Welcome, ${userName}! 🎉</h1>
        <p style="font-size: 18px; line-height: 1.6; color: #555; margin-bottom: 30px;">
          You've just joined a community of lifelong learners! Get ready to explore, learn, and grow with EduQuest.
        </p>
        <a href="${process.env.FRONTEND_URL}/home" style="${BUTTONS.primary}">
          🚀 Start Your Learning Journey
        </a>
      </div>

      <div style="margin: 40px 0; text-align: center;">
        <h2 style="color: #ff2d55; font-size: 24px; margin-bottom: 30px;">Your Learning Benefits 🎯</h2>
        
        <div style="
          background: #f8f9fa;
          border-left: 4px solid #ff8c00;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          text-align: left;
        ">
          <h3 style="color: #ff8c00; margin: 0 0 10px 0;">📚 Unlimited Access</h3>
          <p style="margin: 0; color: #666;">Explore thousands of courses across various disciplines, from programming to business.</p>
        </div>

        <div style="
          background: #f8f9fa;
          border-left: 4px solid #ff8c00;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          text-align: left;
        ">
          <h3 style="color: #ff8c00; margin: 0 0 10px 0;">👨‍🏫 Expert Instructors</h3>
          <p style="margin: 0; color: #666;">Learn from industry professionals and thought leaders in their respective fields.</p>
        </div>

        <div style="
          background: #f8f9fa;
          border-left: 4px solid #ff8c00;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          text-align: left;
        ">
          <h3 style="color: #ff8c00; margin: 0 0 10px 0;">🏆 Earn Certificates</h3>
          <p style="margin: 0; color: #666;">Get recognized for your achievements with verified certificates upon course completion.</p>
        </div>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <h2 style="color: #ff2d55; font-size: 24px; margin-bottom: 20px;">Get Started Now 🎯</h2>
        <a href="${process.env.FRONTEND_URL}/" style="${BUTTONS.secondary}">Complete Your Profile</a>
        <a href="${process.env.FRONTEND_URL}/courses" style="${BUTTONS.secondary}">Browse Courses</a>
        <a href="${process.env.FRONTEND_URL}/community" style="${BUTTONS.secondary}">Join Community</a>
      </div>

      <div style="
        background: #fff3cd;
        border-left: 4px solid #ffc107;
        padding: 20px;
        margin: 40px 0;
        border-radius: 8px;
        text-align: center;
      ">
        <p style="margin: 0; color: #856404;">
          💡 Need help getting started? Our support team is available 24/7 to assist you on your learning journey.
        </p>
      </div>
    </div>
  `;
  
  await sendEmail(userEmail, "🎉 Welcome to EduQuest - Your Learning Journey Begins!", bodyContent);
};

const sendResetPasswordEmail = async (userEmail, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  const bodyContent = `
    <div style="padding: 40px 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #ff2d55; font-size: 28px; margin-bottom: 20px;">Password Reset Request 🔒</h1>
        <p style="font-size: 18px; line-height: 1.6; color: #555; margin-bottom: 30px;">
          We received a request to reset your password. Use the button below to set a new password.
        </p>
        <a href="${resetLink}" style="${BUTTONS.primary}">
          🔐 Reset Your Password
        </a>
      </div>

      <div style="
        background: #e8f4f8;
        border-left: 4px solid #17a2b8;
        padding: 20px;
        margin: 30px 0;
        border-radius: 8px;
      ">
        <h3 style="color: #0c5460; margin: 0 0 10px 0;">⏰ Time Sensitive</h3>
        <p style="margin: 0; color: #0c5460;">
          For security reasons, this password reset link will expire in 24 hours.
        </p>
      </div>

      <div style="
        background: #fff3cd;
        border-left: 4px solid #ffc107;
        padding: 20px;
        margin: 30px 0;
        border-radius: 8px;
      ">
        <h3 style="color: #856404; margin: 0 0 10px 0;">⚠️ Security Notice</h3>
        <p style="margin: 0; color: #856404;">
          If you didn't request a password reset, please ignore this email or contact our support team immediately if you believe your account has been compromised.
        </p>
      </div>

      <div style="margin: 40px 0; text-align: center;">
        <h2 style="color: #ff2d55; font-size: 24px; margin-bottom: 20px;">Security Tips 🛡️</h2>
        
        <div style="text-align: left; max-width: 400px; margin: 0 auto;">
          <p style="margin: 10px 0; color: #666;">✅ Use a strong, unique password</p>
          <p style="margin: 10px 0; color: #666;">✅ Enable two-factor authentication</p>
          <p style="margin: 10px 0; color: #666;">✅ Never share your password</p>
          <p style="margin: 10px 0; color: #666;">✅ Regularly update your security settings</p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <a href="${process.env.FRONTEND_URL}/help" style="${BUTTONS.secondary}">
          💡 Need Help?
        </a>
        <a href="${process.env.FRONTEND_URL}/security" style="${BUTTONS.secondary}">
          🛡️ Security Settings
        </a>
      </div>
    </div>
  `;

  await sendEmail(userEmail, "🔑 Reset Your Password - EduQuest", bodyContent);
};

// New function for Payment Success Email
const sendPaymentSuccessEmail = async (userEmail, userName) => {
  const bodyContent = `
    <div style="padding: 40px 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #28a745; font-size: 32px; margin-bottom: 20px;">Payment Successful! 🎉</h1>
        <p style="font-size: 18px; line-height: 1.6; color: #555; margin-bottom: 30px;">
          Congratulations, ${userName}! Your payment has been successfully processed.
        </p>
        <p style="font-size: 18px; line-height: 1.6; color: #555; margin-bottom: 30px;">
          You now have full access to all the learning materials.
        </p>
        <a href="${process.env.FRONTEND_URL}/courses" style="${BUTTONS.primary}">
          📚 Start Exploring Courses Now
        </a>
      </div>

      <div style="
        background: #e8f4e8;
        border-left: 4px solid #28a745;
        padding: 20px;
        margin: 30px 0;
        border-radius: 8px;
      ">
        <h3 style="color: #155724; margin: 0 0 10px 0;">Your Access is Active</h3>
        <p style="margin: 0; color: #155724;">
          You can now access the complete library of courses, materials, and resources.
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <a href="${process.env.FRONTEND_URL}/explore" style="${BUTTONS.secondary}">
          My Courses
        </a>
      </div>
    </div>
  `;

  await sendEmail(userEmail, "🎉 Payment Successful - Access Your Learning Materials", bodyContent);
};

const sendEmail = async (userEmail, subject, bodyContent) => {
  try {
    const transporter = createTransporter();
    const { header, footer } = generateHeaderFooter();

    const mailOptions = {
      from: `"EduQuest Team" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f4f4f4; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            ${header}
            ${bodyContent}
            ${footer}
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${userEmail}`);
    console.log(`📧 Subject: ${subject}`);
  } catch (error) {
    console.error(`❌ Error sending email to ${userEmail}:`, error.message);
    throw error;
  }
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
  sendWelcomeEmail,
  sendPaymentSuccessEmail, // New Export for Payment Success
};