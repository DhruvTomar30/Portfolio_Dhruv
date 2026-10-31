import HTTP_STATUS from "#constants/http-status.js";
import { ContactMessage } from "#models/ContactMessage.js";
import { MailService } from "#services/mail/index.js";
import { throwCustomError } from "#utils/index.js";

export class ContactService {
	/** Saves the message, then tries to email it. Email failure never loses the message. */
	static async submit({ name, email, subject, message }, { ip, userAgent }) {
		const doc = await ContactMessage.create({
			name,
			email,
			subject,
			message,
			ip: ip || "",
			userAgent: String(userAgent || "").slice(0, 300),
		});

		const delivered = await MailService.notifyOwner(doc);
		if (delivered) {
			doc.emailDelivered = true;
			await doc.save();
		}
		return doc.toObject();
	}

	static async list({ status, page, limit }) {
		const filter = status ? { status } : {};
		const [items, total, unread] = await Promise.all([
			ContactMessage.find(filter)
				.sort({ createdAt: -1 })
				.skip((page - 1) * limit)
				.limit(limit)
				.lean(),
			ContactMessage.countDocuments(filter),
			ContactMessage.countDocuments({ status: "new" }),
		]);
		return { items, total, unread, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) };
	}

	static async updateStatus(id, status) {
		const doc = await ContactMessage.findByIdAndUpdate(id, { $set: { status } }, { returnDocument: "after" }).lean();
		if (!doc) throwCustomError("Message not found", HTTP_STATUS.NOT_FOUND);
		return doc;
	}

	static async remove(id) {
		const doc = await ContactMessage.findByIdAndDelete(id).lean();
		if (!doc) throwCustomError("Message not found", HTTP_STATUS.NOT_FOUND);
		return doc;
	}
}

export default ContactService;
