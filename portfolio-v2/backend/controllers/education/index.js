import { createContentController } from "#controllers/content/create-content-controller.js";
import { EducationResponseDTO } from "#dtos/education/index.js";
import { EducationService } from "#services/content/index.js";

export const EducationController = createContentController({
	service: EducationService,
	dto: EducationResponseDTO,
	label: "Education entry",
	plural: "Education",
});
