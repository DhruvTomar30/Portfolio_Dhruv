import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import config from "#config/index.js";
import { apiLimiter } from "#middlewares/rate-limit.js";
import { requestTracker } from "#middlewares/request-tracker.js";
import { CustomError } from "#utils/index.js";

export class MiddlewareManager {
	static addMiddlewares(app) {
		app.use(requestTracker);
		app.use(helmet());
		app.use(compression());
		app.use(
			cors({
				origin(origin, callback) {
					// Allow same-origin / server-to-server (no Origin header) and the configured frontends.
					if (!origin || config.cors.allowedOrigins.includes(origin)) return callback(null, true);
					return callback(new CustomError("Not allowed by CORS", 403));
				},
				credentials: true,
			})
		);
		app.use(express.json({ limit: "100kb" }));
		app.use(express.urlencoded({ extended: false, limit: "100kb" }));
		app.use("/api", apiLimiter);
	}
}

export default MiddlewareManager;
