import { z } from "zod";

/** Mirrors backend/validators/contact/index.js — keep the two in sync. */
export const contactFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Name must be at least 2 characters")
		.max(80, "Name must be at most 80 characters"),
	email: z.email("Please enter a valid email address").trim().max(120),
	subject: z.string().trim().max(120, "Subject must be at most 120 characters"),
	message: z
		.string()
		.trim()
		.min(10, "Message must be at least 10 characters")
		.max(2000, "Message must be at most 2000 characters"),
	website: z.string().max(0),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
