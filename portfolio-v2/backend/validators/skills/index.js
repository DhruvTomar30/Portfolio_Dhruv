import { z } from "zod";
import { SKILL_GROUPS } from "#constants/content.js";
import { optionalUrl, orderField, toUpdateSchema } from "#validators/common.js";

export const SkillCreateSchema = z.object({
	name: z.string().trim().min(1, "Name is required").max(40),
	group: z.enum(SKILL_GROUPS, { error: `Group must be one of: ${SKILL_GROUPS.join(", ")}` }),
	iconUrl: optionalUrl,
	order: orderField,
});

export const SkillUpdateSchema = toUpdateSchema(SkillCreateSchema);
