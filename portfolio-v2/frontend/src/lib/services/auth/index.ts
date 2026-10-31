import { apiRequest } from "@/lib/apiReq";
import { unwrap } from "@/lib/services/unwrap";
import type { AuthUser, LoginResult } from "@/types/api";

export const login = async (email: string, password: string) =>
	unwrap<LoginResult>(
		await apiRequest({ method: "POST", url: "/api/auth/login", data: { email, password }, anonymous: true }),
		"Login failed."
	);

export const getMe = async () => unwrap<AuthUser>(await apiRequest({ url: "/api/auth/me" }), "Session invalid.");
