import nodemailer from 'nodemailer';

// Configure the SMTP carrier for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  tls: {
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2',
  },
  service: 'oclock',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendPasswordResetEmail(email, resetToken) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}`,
    subject: 'Réinitialisation de mot de passe',
    html: `
      <h1>Réinitialisation de mot de passe</h1>
      <h2>Poussez pas derrière</h2>
      <p>Bonjour,</p>
      <p>Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe. :</p>
      <a href="https://pepine-back-ae81.onrender.com/reset-password?token=${resetToken}" style="background-color: #F79323; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Réinitialiser le mot de passe</a>
      <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, ignorez simplement cet e-mail.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export default sendPasswordResetEmail;
