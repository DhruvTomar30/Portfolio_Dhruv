import type { ApiErrorBody } from "@/types/api";

/** Normalises anything thrown by apiRequest into `{ message, fields }` for forms and toasts. */
export function parseApiError(error: unknown, fallback = "Something went wrong."): {
	message: string;
	fields: Record<string, string>;
} {
	if (error && typeof error === "object" && "message" in error) {
		const body = error as Partial<ApiErrorBody>;
		return { message: body.message || fallback, fields: body.fields ?? {} };
	}
	return { message: fallback, fields: {} };
}
