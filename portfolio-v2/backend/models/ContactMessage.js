import mongoose from "mongoose";
import { CONTACT_STATUSES } from "#constants/content.js";

const ContactMessageSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, lowercase: true },
		subject: { type: String, default: "", trim: true },
		message: { type: String, required: true, trim: true },
		status: { type: String, enum: CONTACT_STATUSES, default: "new", index: true },
		ip: { type: String, default: "" },
		userAgent: { type: String, default: "" },
		emailDelivered: { type: Boolean, default: false },
	},
	{ timestamps: true, collection: "contact_messages" }
);

ContactMessageSchema.index({ createdAt: -1 });

export const ContactMessage =
	mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);
export default ContactMessage;
