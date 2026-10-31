import { z } from "zod";
import { PROJECT_CATEGORIES } from "#constants/content.js";
import { optionalUrl, orderField, toUpdateSchema } from "#validators/common.js";

export const ProjectListQuerySchema = z.object({
	category: z.enum(PROJECT_CATEGORIES).optional(),
	featured: z
		.enum(["true", "false"])
		.transform((v) => v === "true")
		.optional(),
});

export const ProjectCreateSchema = z.object({
	title: z.string().trim().min(2, "Title is required").max(80),
	slug: z
		.string()
		.trim()
		.toLowerCase()
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers and dashes")
		.max(80)
		.optional(),
	description: z.string().trim().min(10, "Description must be at least 10 characters").max(600),
	category: z.enum(PROJECT_CATEGORIES, { error: `Category must be one of: ${PROJECT_CATEGORIES.join(", ")}` }),
	techStack: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
	imageUrl: optionalUrl,
	liveUrl: optionalUrl,
	repoUrl: optionalUrl,
	featured: z.boolean().default(false),
	published: z.boolean().default(true),
	order: orderField,
});

export const ProjectUpdateSchema = toUpdateSchema(ProjectCreateSchema);
