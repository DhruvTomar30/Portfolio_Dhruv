import { ZodError } from "zod";
import HTTP_STATUS from "#constants/http-status.js";
import { LoggerService } from "#utils/logger.js";
import { ResponseHandler } from "#utils/response-handler.js";

const logger = new LoggerService("utils");

export class CustomError extends Error {
	constructor(message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, errorData = null) {
		super(message);
		this.name = "CustomError";
		this.statusCode = statusCode;
		this.errorData = errorData;
	}
}

export const throwCustomError = (message, statusCode = 500, errorData = null) => {
	throw new CustomError(message, statusCode, errorData);
};

export class Utils {
	/**
	 * Adapts a plain controller `({ reqBody, reqParams, ... }) => { status, message, data }`
	 * into an Express handler. Controllers never touch req/res directly.
	 */
	static wrapController(controller, controllerData = {}) {
		return async (req, res) => {
			try {
				const result = await controller({
					controllerData,
					reqHeaders: req.headers,
					reqParams: req.params,
					reqQuery: req.validatedQuery ?? req.query,
					reqBody: req.body,
					reqUser: req.user,
					reqIP: req.ip,
					res: controllerData.passResponse ? res : undefined,
				});
				if (res.headersSent) return undefined;
				return ResponseHandler.handleSuccess(req, res, result);
			} catch (error) {
				if (res.headersSent) {
					res.destroy();
					return undefined;
				}
				return Utils.handleControllerError(req, res, error);
			}
		};
	}

	static handleControllerError(req, res, error) {
		if (error instanceof CustomError) {
			return ResponseHandler.handleError(req, res, {
				status: error.statusCode,
				message: error.message,
				error: error.errorData || undefined,
			});
		}

		if (error instanceof ZodError) {
			return ResponseHandler.handleError(req, res, {
				status: HTTP_STATUS.BAD_REQUEST,
				message: error.issues[0]?.message || "Validation failed",
			});
		}

		// Mongoose invalid ObjectId / duplicate key
		if (error?.name === "CastError") {
			return ResponseHandler.handleError(req, res, {
				status: HTTP_STATUS.BAD_REQUEST,
				message: `Invalid ${error.path}`,
			});
		}
		if (error?.code === 11000) {
			return ResponseHandler.handleError(req, res, {
				status: HTTP_STATUS.CONFLICT,
				message: "A record with this value already exists",
			});
		}

		logger.error(`Unhandled controller error: ${error?.message}`, {
			meta: { stack: error?.stack, requestId: req.requestId, path: req.originalUrl },
		});
		return ResponseHandler.handleError(req, res, {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
			message: "Internal server error",
		});
	}
}

export default Utils;
