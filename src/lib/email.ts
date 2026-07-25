export async function sendWelcomeEmail(toEmail: string, toName: string, referralCode: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey || apiKey === "your_brevo_api_key_here") {
    console.warn("Brevo API key is not configured. Skipping welcome email.");
    return;
  }

  const payload = {
    sender: {
      name: "NatureXpress Partners",
      email: "partners@naturexpress.in",
    },
    to: [
      {
        email: toEmail,
        name: toName,
      },
    ],
    subject: "Welcome to the Elite NX Network \uD83D\uDE80",
    htmlContent: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333333; line-height: 1.6;">
        <h2 style="color: #059669; font-size: 24px; margin-bottom: 20px;">Welcome to NatureXpress, ${toName}!</h2>
        <p style="font-size: 16px;">You've successfully joined the elite partner network. We're thrilled to have you on board.</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 32px 0; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <p style="margin-top: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 800; letter-spacing: 1px;">Your Exclusive Referral Code</p>
          <p style="font-size: 32px; font-weight: 900; color: #0f172a; margin: 16px 0; letter-spacing: 3px; font-family: monospace;">${referralCode}</p>
          <p style="margin-bottom: 0; font-size: 14px; color: #64748b;">Share this code with clinics to start earning recurring commissions.</p>
        </div>

        <h3 style="color: #1e293b; font-size: 18px; margin-top: 32px;">Your Quick-Start Playbook</h3>
        <ol style="padding-left: 20px; font-size: 15px; margin-bottom: 32px;">
          <li style="margin-bottom: 12px;"><strong>Access Command Center:</strong> Log in to your dashboard to track your metrics.</li>
          <li style="margin-bottom: 12px;"><strong>Pitch & Share:</strong> Give clinics your code to unlock their enterprise access.</li>
          <li style="margin-bottom: 12px;"><strong>Earn Lifetime Commisions:</strong> Get paid recursively as your clinics grow.</li>
        </ol>

        <a href="https://partner.naturexpress.in/login" style="display: inline-block; background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Go to Dashboard</a>

        <p style="margin-top: 40px; font-size: 14px; color: #64748b;">
          Let's scale together,<br>
          <strong style="color: #333;">The NatureXpress Team</strong>
        </p>
      </div>
    `,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send welcome email via Brevo:", errorText);
    } else {
      console.log(`Welcome email successfully queued for ${toEmail}`);
    }
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}
