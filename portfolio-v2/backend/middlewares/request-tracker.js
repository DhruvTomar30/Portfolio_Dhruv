import { randomUUID } from "node:crypto";

/** Attaches a requestId to every request and echoes it in the X-Request-Id header. */
export const requestTracker = (req, res, next) => {
	const incoming = req.headers["x-request-id"];
	req.requestId = typeof incoming === "string" && incoming.length <= 64 ? incoming : randomUUID();
	res.setHeader("X-Request-Id", req.requestId);
	next();
};

export default requestTracker;
