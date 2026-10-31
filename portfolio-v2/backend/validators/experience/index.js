import { z } from "zod";
import { optionalUrl, orderField, toUpdateSchema } from "#validators/common.js";

const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM format");

const ExperienceBase = z.object({
	role: z.string().trim().min(2).max(80),
	company: z.string().trim().min(2).max(80),
	companyUrl: optionalUrl,
	employmentType: z.string().trim().max(40).default("Full-time"),
	location: z.string().trim().max(80).default(""),
	startDate: yearMonth,
	endDate: z.union([yearMonth, z.literal("")]).default(""),
	summary: z.string().trim().min(10).max(800),
	highlights: z.array(z.string().trim().min(1).max(300)).max(10).default([]),
	techStack: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
	order: orderField,
});

const endAfterStart = (v) => !v.endDate || !v.startDate || v.endDate >= v.startDate;

export const ExperienceCreateSchema = ExperienceBase.refine(endAfterStart, {
	message: "End date must be after start date",
	path: ["endDate"],
});

export const ExperienceUpdateSchema = toUpdateSchema(ExperienceBase).refine(endAfterStart, {
	message: "End date must be after start date",
	path: ["endDate"],
});
