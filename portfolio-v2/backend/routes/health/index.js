import { Router } from "express";
import { ROOT_ROUTE } from "#constants/routes/index.js";
import { HealthController } from "#controllers/health/index.js";
import { Utils } from "#utils/index.js";

class HealthRoutes {
	static getRoutes() {
		const router = Router();
		router.get(ROOT_ROUTE, Utils.wrapController(HealthController.check));
		return router;
	}
}

export default HealthRoutes.getRoutes;
