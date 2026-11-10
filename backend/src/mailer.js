import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Admin System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      html: `<p>Your verification code is <strong>${code}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification code sent to ${email}`);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to send email");
  }
};

export const sendApprovalNotificationEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"MMUSDA Admin Portal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your MMUSDA Admin Account Has Been Approved",
      html: `
        <h2>Account Approved!</h2>
        <p>Hello ${name || "Church Leader"},</p>
        <p>Your MMUSDA Administrator account request has been reviewed and approved by the Head Administrator.</p>
        <p>You can now log in to the management console:</p>
        <p><a href="https://mmusdaadmin.vercel.app/login" style="background:#1e3a8a;color:#fff;padding:10px 18px;text-decoration:none;border-radius:6px;display:inline-block;">Go to Login</a></p>
        <br/>
        <p>Blessings,<br/>MMUSDA Leadership</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Approval email sent to ${email}`);
  } catch (err) {
    console.error("Failed to send approval email:", err.message);
  }
};