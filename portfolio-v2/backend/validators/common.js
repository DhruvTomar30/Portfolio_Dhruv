import { z } from "zod";

export const ObjectIdParamSchema = z.object({
	id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
});

/** Accepts an absolute http(s) URL, a site-relative path ("/images/x.png"), or an empty string. */
export const urlOrPath = z
	.string()
	.trim()
	.max(500)
	.refine((v) => v === "" || v.startsWith("/") || /^https?:\/\//i.test(v), "Must be a URL or a /path");

export const optionalUrl = urlOrPath.optional().default("");

export const orderField = z.coerce.number().int().min(0).max(10_000).default(0);

/**
 * Builds a PATCH/PUT schema from a create schema's shape: every field optional, and
 * `.default()`s removed. (Zod 4 applies defaults even inside `.partial()`, which would
 * silently reset fields the client didn't send.)
 */
export const toUpdateSchema = (objectSchema) => {
	const shape = Object.fromEntries(
		Object.entries(objectSchema.shape).map(([key, field]) => {
			let inner = field;
			while (inner instanceof z.ZodDefault || inner instanceof z.ZodOptional) inner = inner.unwrap();
			return [key, inner.optional()];
		})
	);
	return z
		.object(shape)
		.refine((v) => Object.values(v).some((value) => value !== undefined), "Provide at least one field to update");
};
