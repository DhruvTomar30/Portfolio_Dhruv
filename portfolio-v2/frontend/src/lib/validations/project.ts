import { z } from "zod";
import { PROJECT_CATEGORIES } from "@/types/portfolio";

const urlOrPath = z
	.string()
	.trim()
	.max(500)
	.refine((v) => v === "" || v.startsWith("/") || /^https?:\/\//i.test(v), "Must be a URL or a /path");

/** Mirrors backend/validators/projects/index.js (ProjectCreateSchema). */
export const projectFormSchema = z.object({
	title: z.string().trim().min(2, "Title is required").max(80),
	description: z.string().trim().min(10, "Description must be at least 10 characters").max(600),
	category: z.enum(PROJECT_CATEGORIES),
	techStack: z.string().trim().max(400), // comma-separated in the form, split before sending
	imageUrl: urlOrPath,
	liveUrl: urlOrPath,
	repoUrl: urlOrPath,
	featured: z.boolean(),
	published: z.boolean(),
	order: z.number().int().min(0).max(10_000),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
