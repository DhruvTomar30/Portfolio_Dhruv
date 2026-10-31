import { Router } from "express";
import { LOGIN_ROUTE, ME_ROUTE } from "#constants/routes/index.js";
import { ROLES } from "#constants/roles.js";
import { AuthController } from "#controllers/auth/index.js";
import { AuthMiddleware } from "#middlewares/auth.js";
import { loginLimiter } from "#middlewares/rate-limit.js";
import { Utils } from "#utils/index.js";
import { LoginSchema } from "#validators/auth/index.js";
import { ValidationMiddleware } from "#validators/index.js";

class AuthRoutes {
	static getRoutes() {
		const router = Router();

		router.post(
			LOGIN_ROUTE,
			loginLimiter,
			ValidationMiddleware.validateBody(LoginSchema),
			Utils.wrapController(AuthController.login)
		);

		router.get(ME_ROUTE, AuthMiddleware.authorize([ROLES.ADMIN]), Utils.wrapController(AuthController.me));

		return router;
	}
}

export default AuthRoutes.getRoutes;
