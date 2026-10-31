import type { ApiResponse } from "@/types/api";

export const unwrap = <T>(response: unknown, fallbackMessage: string): T => {
	const envelope = response as Partial<ApiResponse<T>> | undefined;
	if (!envelope || !envelope.success || !("data" in envelope)) throw new Error(fallbackMessage);
	return envelope.data as T;
};
