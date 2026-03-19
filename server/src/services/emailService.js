const sgMail = require('@sendgrid/mail');
const config = require('../config');

function isAvailable() {
  return !!config.sendgridApiKey && config.sendgridApiKey.length > 0;
}

async function sendPasswordResetEmail(to, resetLink, firstName) {
  if (!isAvailable()) {
    console.warn('[email] SENDGRID_API_KEY not set - skipping send. Reset link:', resetLink);
    return { ok: true, skipped: true };
  }

  sgMail.setApiKey(config.sendgridApiKey);

  const msg = {
    to,
    from: { email: process.env.SENDGRID_FROM_EMAIL || 'noreply@entangle.app', name: 'Entangle' },
    subject: 'Reset your Entangle password',
    text: `Hi ${firstName || 'there'},\n\nYou requested a password reset. Click the link below (valid 15 minutes):\n\n${resetLink}\n\nIf you didn't request this, ignore this email.\n\n— Entangle`,
    html: `
      <p>Hi ${firstName || 'there'},</p>
      <p>You requested a password reset. Click the button below (valid 15 minutes):</p>
      <p><a href="${resetLink}" style="background:#EF6F5B;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;">Reset Password</a></p>
      <p>Or copy this link: ${resetLink}</p>
      <p>If you didn't request this, ignore this email.</p>
      <p>— Entangle</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return { ok: true };
  } catch (err) {
    console.error('[email] SendGrid error:', err.response?.body || err.message);
    throw err;
  }
}

module.exports = { sendPasswordResetEmail, isAvailable };
