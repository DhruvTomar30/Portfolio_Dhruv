import { CertificatesController } from "#controllers/certificates/index.js";
import { EducationController } from "#controllers/education/index.js";
import { ExperienceController } from "#controllers/experience/index.js";
import { SkillsController } from "#controllers/skills/index.js";
import { createContentRoutes } from "#routes/content/create-content-routes.js";
import { CertificateCreateSchema, CertificateUpdateSchema } from "#validators/certificates/index.js";
import { EducationCreateSchema, EducationUpdateSchema } from "#validators/education/index.js";
import { ExperienceCreateSchema, ExperienceUpdateSchema } from "#validators/experience/index.js";
import { SkillCreateSchema, SkillUpdateSchema } from "#validators/skills/index.js";

export const SkillsRoutes = () =>
	createContentRoutes({
		controller: SkillsController,
		createSchema: SkillCreateSchema,
		updateSchema: SkillUpdateSchema,
	});

export const ExperienceRoutes = () =>
	createContentRoutes({
		controller: ExperienceController,
		createSchema: ExperienceCreateSchema,
		updateSchema: ExperienceUpdateSchema,
	});

export const EducationRoutes = () =>
	createContentRoutes({
		controller: EducationController,
		createSchema: EducationCreateSchema,
		updateSchema: EducationUpdateSchema,
	});

export const CertificatesRoutes = () =>
	createContentRoutes({
		controller: CertificatesController,
		createSchema: CertificateCreateSchema,
		updateSchema: CertificateUpdateSchema,
	});
