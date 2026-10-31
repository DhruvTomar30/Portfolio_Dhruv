import { createContentController } from "#controllers/content/create-content-controller.js";
import { ExperienceResponseDTO } from "#dtos/experience/index.js";
import { ExperienceService } from "#services/content/index.js";

export const ExperienceController = createContentController({
	service: ExperienceService,
	dto: ExperienceResponseDTO,
	label: "Experience",
	plural: "Experience",
});
