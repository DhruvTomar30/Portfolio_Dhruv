import jwt from "jsonwebtoken";
import config from "#config/index.js";
import HTTP_STATUS from "#constants/http-status.js";
import { ErrorResponseHandler } from "#utils/response-handler.js";

export class AuthMiddleware {
	/** Verifies `Authorization: Bearer <jwt>` and sets req.user. */
	static authenticate(req, res, next) {
		const header = req.headers.authorization || "";
		const [scheme, token] = header.split(" ");
		if (scheme !== "Bearer" || !token) {
			return ErrorResponseHandler.handle(req, res, {
				status: HTTP_STATUS.UNAUTHORIZED,
				message: "Authentication required",
			});
		}

		try {
			const payload = jwt.verify(token, config.jwt.secret);
			req.user = { email: payload.email, role: payload.role };
			return next();
		} catch {
			return ErrorResponseHandler.handle(req, res, {
				status: HTTP_STATUS.UNAUTHORIZED,
				message: "Session expired. Please log in again.",
			});
		}
	}

	/** Role gate. Use after `authenticate`, or on its own (it authenticates first if needed). */
	static authorize(allowedRoles) {
		const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
		return (req, res, next) => {
			const check = () => {
				if (!roles.includes(req.user?.role)) {
					return ErrorResponseHandler.handle(req, res, {
						status: HTTP_STATUS.FORBIDDEN,
						message: "You don't have permission to access this resource",
					});
				}
				return next();
			};
			if (req.user) return check();
			return AuthMiddleware.authenticate(req, res, check);
		};
	}
}

export default AuthMiddleware;
