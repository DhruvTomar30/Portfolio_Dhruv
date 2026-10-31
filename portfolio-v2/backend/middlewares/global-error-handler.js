import HTTP_STATUS from "#constants/http-status.js";
import { LoggerService } from "#utils/logger.js";

const logger = new LoggerService("global-error-handler");

/** Last Express error handler: catches anything thrown outside wrapController (body parser, CORS, …). */
export const globalErrorHandler = (err, req, res, _next) => {
	let status = err.statusCode || err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
	let message = err.message || "Internal server error";

	if (err.type === "entity.parse.failed") {
		status = HTTP_STATUS.BAD_REQUEST;
		message = "Malformed JSON body";
	} else if (err.type === "entity.too.large") {
		message = "Request body too large";
	}

	if (status >= 500) {
		logger.error(`Unhandled error: ${err.message}`, { meta: { stack: err.stack, path: req.originalUrl } });
		message = "Internal server error";
	}

	res.status(status).json({ success: false, message, requestId: req.requestId });
};

export const notFoundHandler = (req, res) => {
	res.status(HTTP_STATUS.NOT_FOUND).json({
		success: false,
		message: `Route ${req.method} ${req.originalUrl} not found`,
		requestId: req.requestId,
	});
};
