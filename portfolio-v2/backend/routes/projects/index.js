import { Router } from "express";
import { z } from "zod";
import {
	ADMIN_ALL_PROJECTS_ROUTE,
	PROJECT_BY_ID_ROUTE,
	PROJECT_BY_SLUG_ROUTE,
	ROOT_ROUTE,
} from "#constants/routes/index.js";
import { ROLES } from "#constants/roles.js";
import { ProjectsController } from "#controllers/projects/index.js";
import { AuthMiddleware } from "#middlewares/auth.js";
import { Utils } from "#utils/index.js";
import { ObjectIdParamSchema } from "#validators/common.js";
import { ValidationMiddleware } from "#validators/index.js";
import { ProjectCreateSchema, ProjectListQuerySchema, ProjectUpdateSchema } from "#validators/projects/index.js";

const SlugParamSchema = z.object({ slug: z.string().trim().toLowerCase().min(1).max(80) });

class ProjectsRoutes {
	static getRoutes() {
		const router = Router();
		const adminOnly = AuthMiddleware.authorize([ROLES.ADMIN]);

		// Public
		router.get(
			ROOT_ROUTE,
			ValidationMiddleware.validateQuery(ProjectListQuerySchema),
			Utils.wrapController(ProjectsController.list)
		);

		// Admin — literal paths registered before "/:slug" so they aren't shadowed
		router.get(ADMIN_ALL_PROJECTS_ROUTE, adminOnly, Utils.wrapController(ProjectsController.listAll));

		router.post(
			ROOT_ROUTE,
			adminOnly,
			ValidationMiddleware.validateBody(ProjectCreateSchema),
			Utils.wrapController(ProjectsController.create)
		);

		router.put(
			PROJECT_BY_ID_ROUTE,
			adminOnly,
			ValidationMiddleware.validateParams(ObjectIdParamSchema),
			ValidationMiddleware.validateBody(ProjectUpdateSchema),
			Utils.wrapController(ProjectsController.update)
		);

		router.delete(
			PROJECT_BY_ID_ROUTE,
			adminOnly,
			ValidationMiddleware.validateParams(ObjectIdParamSchema),
			Utils.wrapController(ProjectsController.remove)
		);

		// Public — by slug (last, it's a catch-all param)
		router.get(
			PROJECT_BY_SLUG_ROUTE,
			ValidationMiddleware.validateParams(SlugParamSchema),
			Utils.wrapController(ProjectsController.getBySlug)
		);

		return router;
	}
}

export default ProjectsRoutes.getRoutes;
