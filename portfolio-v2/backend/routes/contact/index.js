import { Router } from "express";
import { BY_ID_ROUTE, CONTACT_STATUS_ROUTE, ROOT_ROUTE } from "#constants/routes/index.js";
import { ROLES } from "#constants/roles.js";
import { ContactController } from "#controllers/contact/index.js";
import { AuthMiddleware } from "#middlewares/auth.js";
import { contactLimiter } from "#middlewares/rate-limit.js";
import { Utils } from "#utils/index.js";
import { ObjectIdParamSchema } from "#validators/common.js";
import {
	ContactCreateSchema,
	ContactListQuerySchema,
	ContactStatusUpdateSchema,
} from "#validators/contact/index.js";
import { ValidationMiddleware } from "#validators/index.js";

class ContactRoutes {
	static getRoutes() {
		const router = Router();
		const adminOnly = AuthMiddleware.authorize([ROLES.ADMIN]);

		// 1. ROUTE → 2. VALIDATOR → 3. CONTROLLER (→ 4. SERVICE/MODEL → 5. DTO)
		router.post(
			ROOT_ROUTE,
			contactLimiter,
			ValidationMiddleware.validateBody(ContactCreateSchema),
			Utils.wrapController(ContactController.submit)
		);

		router.get(
			ROOT_ROUTE,
			adminOnly,
			ValidationMiddleware.validateQuery(ContactListQuerySchema),
			Utils.wrapController(ContactController.list)
		);

		router.patch(
			CONTACT_STATUS_ROUTE,
			adminOnly,
			ValidationMiddleware.validateParams(ObjectIdParamSchema),
			ValidationMiddleware.validateBody(ContactStatusUpdateSchema),
			Utils.wrapController(ContactController.updateStatus)
		);

		router.delete(
			BY_ID_ROUTE,
			adminOnly,
			ValidationMiddleware.validateParams(ObjectIdParamSchema),
			Utils.wrapController(ContactController.remove)
		);

		return router;
	}
}

export default ContactRoutes.getRoutes;
