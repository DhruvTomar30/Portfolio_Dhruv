import http from "node:http";
import express from "express";
import config from "#config/index.js";
import { globalErrorHandler, notFoundHandler } from "#middlewares/global-error-handler.js";
import { MiddlewareManager } from "#middlewares/index.js";
import { MountAPIs } from "#routes/index.js";
import { DatabaseService } from "#services/database/index.js";
import { LoggerService } from "#utils/logger.js";

const logger = new LoggerService("server");
const SHUTDOWN_TIMEOUT_MS = 15_000;

export class Server {
	static app = express();
	static httpServer = null;
	static shuttingDown = false;

	static async initialize() {
		await DatabaseService.connect();

		const { app } = Server;
		app.disable("x-powered-by");
		// Behind Nginx on the VPS: trust the first proxy hop so req.ip / rate limits use the real client IP.
		app.set("trust proxy", 1);

		MiddlewareManager.addMiddlewares(app);
		app.use("/api", MountAPIs());
		app.use(notFoundHandler);
		app.use(globalErrorHandler);
	}

	static start() {
		return new Promise((resolve) => {
			Server.httpServer = http.createServer(Server.app);
			Server.httpServer.listen(config.port, () => {
				logger.info(`API listening on http://localhost:${config.port}/api (${config.env})`);
				// Tells PM2 (wait_ready: true) that the process is ready to receive traffic.
				if (process.send) process.send("ready");
				resolve();
			});
		});
	}

	static async shutdown(signal) {
		if (Server.shuttingDown) return;
		Server.shuttingDown = true;
		logger.info(`${signal} received — shutting down gracefully`);

		const force = setTimeout(() => {
			logger.error("Forced shutdown after timeout");
			process.exit(1);
		}, SHUTDOWN_TIMEOUT_MS);
		force.unref();

		try {
			if (Server.httpServer) await new Promise((resolve) => Server.httpServer.close(resolve));
			await DatabaseService.disconnect();
			process.exit(0);
		} catch (error) {
			logger.error(`Error during shutdown: ${error.message}`);
			process.exit(1);
		}
	}
}

export default Server;
