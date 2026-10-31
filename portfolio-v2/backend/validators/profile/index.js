import { z } from "zod";
import { urlOrPath } from "#validators/common.js";

export const ProfileUpdateSchema = z
	.object({
		name: z.string().trim().min(2).max(80),
		headline: z.string().trim().min(2).max(120),
		roles: z.array(z.string().trim().min(1).max(60)).max(8),
		bio: z.string().trim().min(10).max(1500),
		avatarUrl: urlOrPath,
		resumeUrl: urlOrPath,
		email: z.email().trim().toLowerCase(),
		phone: z.string().trim().max(20),
		location: z.string().trim().max(80),
		birthDate: z.string().trim().max(20),
		qualification: z.string().trim().max(120),
		availableForWork: z.boolean(),
		socials: z
			.array(z.object({ platform: z.string().trim().min(1).max(30), url: urlOrPath }))
			.max(10),
		expertise: z
			.array(z.object({ title: z.string().trim().min(1).max(60), description: z.string().trim().min(1).max(300) }))
			.max(8),
		stats: z
			.array(z.object({ label: z.string().trim().min(1).max(40), value: z.string().trim().min(1).max(20) }))
			.max(6),
	})
	.partial()
	.refine((v) => Object.keys(v).length > 0, "Provide at least one field to update");
