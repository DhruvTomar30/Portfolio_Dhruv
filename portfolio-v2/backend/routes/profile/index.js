import { Router } from "express";
import { ROOT_ROUTE } from "#constants/routes/index.js";
import { ROLES } from "#constants/roles.js";
import { ProfileController } from "#controllers/profile/index.js";
import { AuthMiddleware } from "#middlewares/auth.js";
import { Utils } from "#utils/index.js";
import { ValidationMiddleware } from "#validators/index.js";
import { ProfileUpdateSchema } from "#validators/profile/index.js";

class ProfileRoutes {
	static getRoutes() {
		const router = Router();

		router.get(ROOT_ROUTE, Utils.wrapController(ProfileController.get));

		router.put(
			ROOT_ROUTE,
			AuthMiddleware.authorize([ROLES.ADMIN]),
			ValidationMiddleware.validateBody(ProfileUpdateSchema),
			Utils.wrapController(ProfileController.update)
		);

		return router;
	}
}

export default ProfileRoutes.getRoutes;
