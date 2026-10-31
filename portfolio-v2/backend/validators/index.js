import HTTP_STATUS from "#constants/http-status.js";

/**
 * Turns a ZodError into the same 400 shape the frontend already knows how to read:
 *   { success: false, message, errors: string[], fields: { "path.to.field": "message" } }
 */
const buildValidationError = (zodError, fallbackMessage) => {
	const errors = [];
	const fields = {};
	for (const issue of zodError.issues) {
		const key = issue.path.join(".") || "_root";
		errors.push(issue.message);
		if (!fields[key]) fields[key] = issue.message;
	}
	return {
		success: false,
		message: errors[0] || fallbackMessage,
		errors,
		fields,
	};
};

const validate = (schema, source, fallbackMessage) => (req, res, next) => {
	const result = schema.safeParse(req[source] ?? {});
	if (!result.success) {
		return res
			.status(HTTP_STATUS.BAD_REQUEST)
			.json({ ...buildValidationError(result.error, fallbackMessage), requestId: req.requestId });
	}

	// Express 5 makes req.query a read-only getter, so parsed query values live on req.validatedQuery.
	if (source === "query") req.validatedQuery = result.data;
	else req[source] = result.data;
	return next();
};

export class ValidationMiddleware {
	static validateBody(schema) {
		return validate(schema, "body", "Validation failed");
	}

	static validateParams(schema) {
		return validate(schema, "params", "Invalid URL parameters");
	}

	static validateQuery(schema) {
		return validate(schema, "query", "Invalid query parameters");
	}
}

export default ValidationMiddleware;
