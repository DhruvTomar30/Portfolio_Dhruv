import nodemailer from "nodemailer";
import config from "#config/index.js";
import { LoggerService } from "#utils/logger.js";

const logger = new LoggerService("mail");

const escapeHtml = (value = "") =>
	String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");

let transporter = null;
const getTransporter = () => {
	if (!config.mail.enabled) return null;
	if (!transporter) {
		transporter = nodemailer.createTransport({
			host: config.mail.host,
			port: config.mail.port,
			secure: config.mail.port === 465,
			auth: { user: config.mail.user, pass: config.mail.pass },
		});
	}
	return transporter;
};

export class MailService {
	/**
	 * Emails the site owner about a new contact message.
	 * Returns true when delivered, false when mail is disabled or fails (never throws).
	 */
	static async notifyOwner(message) {
		const transport = getTransporter();
		if (!transport) {
			logger.warning("SMTP not configured — contact message saved but no email sent");
			return false;
		}

		const subject = message.subject ? `Portfolio: ${message.subject}` : `New portfolio message from ${message.name}`;
		try {
			await transport.sendMail({
				from: `"Portfolio Contact" <${config.mail.user}>`,
				to: config.mail.receiver,
				replyTo: `"${message.name.replace(/"/g, "")}" <${message.email}>`,
				subject,
				text: `From: ${message.name} <${message.email}>\n\n${message.message}`,
				html: `
					<div style="font-family:system-ui,sans-serif;max-width:560px">
						<h2 style="margin:0 0 12px">New message from your portfolio</h2>
						<p><strong>Name:</strong> ${escapeHtml(message.name)}<br/>
						<strong>Email:</strong> <a href="mailto:${escapeHtml(message.email)}">${escapeHtml(message.email)}</a></p>
						${message.subject ? `<p><strong>Subject:</strong> ${escapeHtml(message.subject)}</p>` : ""}
						<p style="white-space:pre-wrap;background:#f6f6f9;padding:12px;border-radius:8px">${escapeHtml(message.message)}</p>
					</div>`,
			});
			return true;
		} catch (error) {
			logger.error(`Failed to send contact email: ${error.message}`);
			return false;
		}
	}
}

export default MailService;
