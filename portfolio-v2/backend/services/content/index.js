import { Certificate } from "#models/Certificate.js";
import { Education } from "#models/Education.js";
import { Experience } from "#models/Experience.js";
import { Skill } from "#models/Skill.js";
import { createCrudService } from "#services/content/crud-service.js";

export const SkillService = createCrudService(Skill, { label: "Skill" });

// Most recent role first; `order` lets the admin pin a specific ordering.
export const ExperienceService = createCrudService(Experience, {
	label: "Experience",
	defaultSort: { order: 1, startDate: -1 },
});

export const EducationService = createCrudService(Education, {
	label: "Education",
	defaultSort: { order: 1, startYear: -1 },
});

export const CertificateService = createCrudService(Certificate, { label: "Certificate" });
