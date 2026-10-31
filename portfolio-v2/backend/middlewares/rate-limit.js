import rateLimit from "express-rate-limit";

const handler = (req, res, _next, options) =>
	res.status(options.statusCode).json({
		success: false,
		message: options.message,
		requestId: req.requestId,
	});

export const apiLimiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 120,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: "Too many requests. Please slow down.",
	handler,
});

export const contactLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: "You've sent several messages already. Please try again in a few minutes.",
	handler,
});

export const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: "Too many login attempts. Try again later.",
	handler,
});
