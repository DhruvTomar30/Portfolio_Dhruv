import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { z } from "zod";

const NODE_ENV = process.env.NODE_ENV || "development";

// Load .env.<NODE_ENV> first, then fall back to .env (same order as the CRM backend).
const envSpecific = path.resolve(process.cwd(), `.env.${NODE_ENV}`);
if (fs.existsSync(envSpecific)) dotenv.config({ path: envSpecific, quiet: true });
dotenv.config({ quiet: true });

const csv = (value) =>
	String(value || "")
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean);

const EnvSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	PORT: z.coerce.number().int().positive().default(5050),
	MONGO_URI: z.string().min(1, "MONGO_URI is required"),
	MONGO_DB_NAME: z.string().min(1).default("portfolio"),
	CORS_ORIGINS: z.string().default("http://localhost:3000"),
	JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),
	JWT_EXPIRES_IN: z.string().default("7d"),
	ADMIN_EMAIL: z.email(),
	ADMIN_PASSWORD_HASH: z.string().default(""),
	SMTP_HOST: z.string().default("smtp.gmail.com"),
	SMTP_PORT: z.coerce.number().int().positive().default(465),
	SMTP_USER: z.string().default(""),
	SMTP_PASS: z.string().default(""),
	CONTACT_RECEIVER_EMAIL: z.email().default("dhruvtomar2025@gmail.com"),
	LOG_LEVEL: z.enum(["error", "warn", "info", "http", "debug"]).default("info"),
});

const parsed = EnvSchema.safeParse({ ...process.env, NODE_ENV });

if (!parsed.success) {
	const details = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
	console.error(`Invalid environment configuration:\n${details}`);
	process.exit(1);
}

const env = parsed.data;

export const config = Object.freeze({
	env: env.NODE_ENV,
	isProduction: env.NODE_ENV === "production",
	port: env.PORT,
	mongo: { uri: env.MONGO_URI, dbName: env.MONGO_DB_NAME },
	cors: { allowedOrigins: csv(env.CORS_ORIGINS) },
	jwt: { secret: env.JWT_SECRET, expiresIn: env.JWT_EXPIRES_IN },
	admin: { email: env.ADMIN_EMAIL.toLowerCase(), passwordHash: env.ADMIN_PASSWORD_HASH },
	mail: {
		host: env.SMTP_HOST,
		port: env.SMTP_PORT,
		user: env.SMTP_USER,
		pass: env.SMTP_PASS,
		receiver: env.CONTACT_RECEIVER_EMAIL,
		enabled: Boolean(env.SMTP_USER && env.SMTP_PASS),
	},
	logger: { level: env.LOG_LEVEL },
});

export default config;
