import nodemailer from "nodemailer";
import path from "path";

type MailerConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

function getMailerConfig(): MailerConfig {
  const host = process.env.BREVO_SMTP_HOST;
  const portStr = process.env.BREVO_SMTP_PORT;
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_PASS;
  const from = process.env.BREVO_MAIL_FROM;
  const to = process.env.BREVO_MAIL_TO;

  if (!host || !portStr || !user || !pass || !from || !to) {
    throw new Error("Missing Brevo SMTP environment variables");
  }

  const port = Number(portStr);
  if (!Number.isFinite(port)) {
    throw new Error("Invalid BREVO_SMTP_PORT");
  }

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
    from,
    to,
  };
}

export async function sendBrevoMail(subject: string, text: string, html?: string) {
  const cfg = getMailerConfig();

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: {
      user: cfg.user,
      pass: cfg.pass,
    },
  });

  try {
    await transporter.sendMail({
      from: cfg.from,
      to: cfg.to,
      subject,
      text,
      ...(html ? { html } : null),
    });
  } catch (error: unknown) {
    console.error("Brevo mail error:", error);
    throw error;
  }
}

export async function sendBrevoMailWithOptions(params: {
  subject: string;
  text: string;
  html?: string;
  attachments?: nodemailer.SendMailOptions["attachments"];
}) {
  const cfg = getMailerConfig();

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: {
      user: cfg.user,
      pass: cfg.pass,
    },
  });

  try {
    await transporter.sendMail({
      from: cfg.from,
      to: cfg.to,
      subject: params.subject,
      text: params.text,
      ...(params.html ? { html: params.html } : null),
      ...(params.attachments ? { attachments: params.attachments } : null),
    });
  } catch (error: unknown) {
    console.error("Brevo mail error:", error);
    throw error;
  }
}

function getEmbeddedLogoAttachment() {
  const logoPath = path.join(process.cwd(), "public", "content", "logo", "geniuslogo.png");
  return {
    filename: "geniuslogo.png",
    path: logoPath,
    cid: "genius-logo",
  } as const;
}

export function buildBrandedHtmlEmail(params: {
  title: string;
  subtitle?: string;
  fields: Array<{ label: string; value: string }>;
}) {
  const logoAttachment = getEmbeddedLogoAttachment();
  const logoCid = logoAttachment.cid;

  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const rowsHtml = params.fields
    .map(
      (f) => `
        <tr>
          <td style="padding:10px 12px; border-bottom:1px solid #eef2f7; width: 180px; color:#475569; font-weight:600; vertical-align:top;">${escapeHtml(
            f.label
          )}</td>
          <td style="padding:10px 12px; border-bottom:1px solid #eef2f7; color:#0f172a;">${escapeHtml(
            f.value || "-"
          )}</td>
        </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0; padding:0; background:#f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
    <div style="max-width:680px; margin:0 auto; padding:24px 12px;">
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; overflow:hidden;">
        <div style="padding:18px 20px; background:#0ea5e9; color:#ffffff;">
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="cid:${logoCid}" alt="Genius Educational Academy" style="height:44px; width:auto; border-radius:8px; background:#ffffff; padding:6px; margin-right:10px;" />
            <div>
              <div style="font-size:16px; font-weight:800; letter-spacing:0.2px;">Genius Educational Academy</div>
              <div style="font-size:12px; opacity:0.95;">${escapeHtml(params.subtitle || "New form submission")}</div>
            </div>
          </div>
        </div>

        <div style="padding:22px 20px;">
          <div style="font-size:18px; font-weight:800; color:#0f172a; margin-bottom:12px;">${escapeHtml(
            params.title
          )}</div>

          <table style="width:100%; border-collapse:collapse; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;">
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div style="margin-top:16px; font-size:12px; color:#64748b;">
            This email was sent automatically from your website forms.
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;

  return {
    html,
    attachments: [logoAttachment],
  };
}
