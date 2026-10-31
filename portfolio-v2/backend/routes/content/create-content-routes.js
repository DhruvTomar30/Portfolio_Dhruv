import { Router } from "express";
import { BY_ID_ROUTE, ROOT_ROUTE } from "#constants/routes/index.js";
import { ROLES } from "#constants/roles.js";
import { AuthMiddleware } from "#middlewares/auth.js";
import { Utils } from "#utils/index.js";
import { ObjectIdParamSchema } from "#validators/common.js";
import { ValidationMiddleware } from "#validators/index.js";

/**
 * Standard route set for a simple content domain:
 *   GET    /        public list
 *   POST   /        admin create   (validated)
 *   PUT    /:id     admin update   (validated)
 *   DELETE /:id     admin delete
 */
export const createContentRoutes = ({ controller, createSchema, updateSchema }) => {
	const router = Router();
	const adminOnly = AuthMiddleware.authorize([ROLES.ADMIN]);

	router.get(ROOT_ROUTE, Utils.wrapController(controller.list));

	router.post(
		ROOT_ROUTE,
		adminOnly,
		ValidationMiddleware.validateBody(createSchema),
		Utils.wrapController(controller.create)
	);

	router.put(
		BY_ID_ROUTE,
		adminOnly,
		ValidationMiddleware.validateParams(ObjectIdParamSchema),
		ValidationMiddleware.validateBody(updateSchema),
		Utils.wrapController(controller.update)
	);

	router.delete(
		BY_ID_ROUTE,
		adminOnly,
		ValidationMiddleware.validateParams(ObjectIdParamSchema),
		Utils.wrapController(controller.remove)
	);

	return router;
};
