import { LoggerService } from "#utils/logger.js";

const logger = new LoggerService("app");

const isFatalError = (error) =>
	error.code === "EACCES" ||
	error.code === "EADDRINUSE" ||
	error.code === "ENOSPC" ||
	error instanceof TypeError ||
	/[Oo]ut of [Mm]emory/.test(error.message);

const startServer = async () => {
	try {
		const { Server } = await import("#server/index.js");
		await Server.initialize();
		await Server.start();

		process.once("SIGTERM", () => Server.shutdown("SIGTERM"));
		process.once("SIGINT", () => Server.shutdown("SIGINT"));

		process.on("uncaughtException", (error) => {
			logger.error(`Uncaught Exception: ${error.message}`, { meta: { stack: error.stack } });
			if (isFatalError(error)) Server.shutdown("Uncaught Exception");
		});

		process.on("unhandledRejection", (reason) => {
			logger.error(`Unhandled Rejection: ${reason}`);
		});
	} catch (error) {
		logger.error(`Failed to start server: ${error.message}`, { meta: { stack: error.stack } });
		process.exit(1);
	}
};

startServer();
