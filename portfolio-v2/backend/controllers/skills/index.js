import { createContentController } from "#controllers/content/create-content-controller.js";
import { SkillResponseDTO } from "#dtos/skills/index.js";
import { SkillService } from "#services/content/index.js";

export const SkillsController = createContentController({
	service: SkillService,
	dto: SkillResponseDTO,
	label: "Skill",
	plural: "Skills",
});
