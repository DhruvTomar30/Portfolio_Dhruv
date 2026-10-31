import { z } from "zod";
import { orderField, toUpdateSchema } from "#validators/common.js";

const year = z.string().regex(/^\d{4}$/, "Use a 4-digit year");

const EducationBase = z.object({
	degree: z.string().trim().min(2).max(120),
	institution: z.string().trim().min(2).max(160),
	location: z.string().trim().max(80).default(""),
	startYear: year,
	endYear: z.union([year, z.literal("")]).default(""),
	description: z.string().trim().max(600).default(""),
	order: orderField,
});

export const EducationCreateSchema = EducationBase;

export const EducationUpdateSchema = toUpdateSchema(EducationBase);
