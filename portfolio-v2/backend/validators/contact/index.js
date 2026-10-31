import { z } from "zod";
import { CONTACT_STATUSES } from "#constants/content.js";

export const ContactCreateSchema = z.object({
	name: z
		.string({ error: "Name is required" })
		.trim()
		.min(2, "Name must be at least 2 characters")
		.max(80, "Name must be at most 80 characters"),
	email: z.email({ error: "Please enter a valid email address" }).trim().toLowerCase().max(120),
	subject: z.string().trim().max(120, "Subject must be at most 120 characters").optional().default(""),
	message: z
		.string({ error: "Message is required" })
		.trim()
		.min(10, "Message must be at least 10 characters")
		.max(2000, "Message must be at most 2000 characters"),
	// Honeypot: real visitors never see or fill this field.
	website: z.string().max(0, "Spam detected").optional().default(""),
});

export const ContactListQuerySchema = z.object({
	status: z.enum(CONTACT_STATUSES).optional(),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const ContactStatusUpdateSchema = z.object({
	status: z.enum(CONTACT_STATUSES, { error: `Status must be one of: ${CONTACT_STATUSES.join(", ")}` }),
});
