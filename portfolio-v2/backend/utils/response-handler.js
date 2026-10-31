import HTTP_STATUS from "#constants/http-status.js";

const isEmptyPlainObject = (value) =>
	value !== null &&
	typeof value === "object" &&
	!Array.isArray(value) &&
	Object.getPrototypeOf(value) === Object.prototype &&
	Object.keys(value).length === 0;

/**
 * Envelope helpers. Every API response looks like:
 *   success: { success: true,  message, data?, requestId }
 *   error:   { success: false, message, error?, fields?, requestId }
 */
export class ResponseHandler {
	static handleSuccess(req, res, result = {}) {
		const status = result.status || HTTP_STATUS.OK;
		if (status >= 400) return ResponseHandler.handleError(req, res, result);

		if (status === HTTP_STATUS.NO_CONTENT) return res.status(status).end();

		const body = { success: true, message: result.message || "OK" };
		if (result.data !== undefined && !isEmptyPlainObject(result.data)) body.data = result.data;
		body.requestId = req.requestId;
		return res.status(status).json(body);
	}

	static handleError(req, res, { status, message, error, fields, errors } = {}) {
		const code = status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
		const body = { success: false, message: message || "Something went wrong" };
		if (error) body.error = error;
		if (errors) body.errors = errors;
		if (fields) body.fields = fields;
		body.requestId = req.requestId;
		return res.status(code).json(body);
	}
}

export const ErrorResponseHandler = { handle: ResponseHandler.handleError };

export default ResponseHandler;
