import winston from "winston";
import config from "#config/index.js";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const devFormat = printf(({ level, message, timestamp: ts, identifier, meta }) => {
	const extra = meta ? ` ${JSON.stringify(meta instanceof Error ? { message: meta.message, stack: meta.stack } : meta)}` : "";
	return `${ts} [${identifier}] ${level}: ${message}${extra}`;
});

const baseLogger = winston.createLogger({
	level: config.logger.level,
	format: config.isProduction
		? combine(timestamp(), errors({ stack: true }), json())
		: combine(colorize(), timestamp({ format: "HH:mm:ss" }), devFormat),
	transports: [new winston.transports.Console()],
});

/**
 * Small wrapper so every module logs with its own identifier,
 * matching the CRM's `new LoggerService("identifier")` usage.
 */
export class LoggerService {
	constructor(identifier = "app") {
		this.identifier = identifier;
	}

	info(message, options = {}) {
		baseLogger.info(message, { identifier: this.identifier, ...options });
	}

	warning(message, options = {}) {
		baseLogger.warn(message, { identifier: this.identifier, ...options });
	}

	error(message, options = {}) {
		baseLogger.error(message, { identifier: this.identifier, ...options });
	}

	debug(message, options = {}) {
		baseLogger.debug(message, { identifier: this.identifier, ...options });
	}
}

export default LoggerService;
