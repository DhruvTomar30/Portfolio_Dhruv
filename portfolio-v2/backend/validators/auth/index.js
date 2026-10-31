import { z } from "zod";

export const LoginSchema = z.object({
	email: z.email({ error: "Enter a valid email" }).trim().toLowerCase(),
	password: z.string({ error: "Password is required" }).min(1, "Password is required").max(200),
});
