import { Router } from "express";
import {
	BASE_AUTH_ROUTE,
	BASE_CERTIFICATES_ROUTE,
	BASE_CONTACT_ROUTE,
	BASE_EDUCATION_ROUTE,
	BASE_EXPERIENCE_ROUTE,
	BASE_HEALTH_ROUTE,
	BASE_PROFILE_ROUTE,
	BASE_PROJECTS_ROUTE,
	BASE_SKILLS_ROUTE,
} from "#constants/routes/index.js";
import AuthRoutes from "#routes/auth/index.js";
import ContactRoutes from "#routes/contact/index.js";
import { CertificatesRoutes, EducationRoutes, ExperienceRoutes, SkillsRoutes } from "#routes/content/index.js";
import HealthRoutes from "#routes/health/index.js";
import ProfileRoutes from "#routes/profile/index.js";
import ProjectsRoutes from "#routes/projects/index.js";

/** Aggregates every domain router. Mounted at /api by the server. */
export const MountAPIs = () => {
	const router = Router();
	router.use(BASE_HEALTH_ROUTE, HealthRoutes());
	router.use(BASE_AUTH_ROUTE, AuthRoutes());
	router.use(BASE_PROFILE_ROUTE, ProfileRoutes());
	router.use(BASE_PROJECTS_ROUTE, ProjectsRoutes());
	router.use(BASE_SKILLS_ROUTE, SkillsRoutes());
	router.use(BASE_EXPERIENCE_ROUTE, ExperienceRoutes());
	router.use(BASE_EDUCATION_ROUTE, EducationRoutes());
	router.use(BASE_CERTIFICATES_ROUTE, CertificatesRoutes());
	router.use(BASE_CONTACT_ROUTE, ContactRoutes());
	return router;
};

export default MountAPIs;
