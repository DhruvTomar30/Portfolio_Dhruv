"use client";

import axios, { type AxiosRequestConfig, type Method } from "axios";
import { siteConfig } from "@/lib/config";
import type { ApiErrorBody } from "@/types/api";

export const AUTH_TOKEN_KEY = "portfolio-admin-token";

const client = axios.create({
	baseURL: siteConfig.apiUrl,
	timeout: 15_000,
	headers: { "Content-Type": "application/json" },
});

interface ApiRequestOptions {
	method?: Method;
	url: string;
	data?: unknown;
	params?: Record<string, unknown>;
	headers?: Record<string, string>;
	signal?: AbortSignal;
	/** Skip the bearer token (public endpoints). Defaults to false. */
	anonymous?: boolean;
}

/**
 * Single entry point for browser → backend calls (mirrors crm-frontend-next-js/src/lib/apiReq.ts).
 * Resolves with the backend envelope `{ success, message, data }`.
 * Rejects with the backend error body (`{ message, fields, status }`).
 */
export async function apiRequest<T = unknown>({
	method = "GET",
	url,
	data,
	params,
	headers = {},
	signal,
	anonymous = false,
}: ApiRequestOptions): Promise<T> {
	const finalHeaders: Record<string, string> = { ...headers };
	if (!anonymous && typeof window !== "undefined") {
		const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
		if (token) finalHeaders.Authorization = `Bearer ${token}`;
	}

	const config: AxiosRequestConfig = { method, url, data, params, headers: finalHeaders, signal };

	try {
		const response = await client.request<T>(config);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const status = error.response?.status;
			const body = (error.response?.data ?? {}) as Partial<ApiErrorBody>;

			if (status === 401 && !anonymous && typeof window !== "undefined") {
				window.localStorage.removeItem(AUTH_TOKEN_KEY);
				window.dispatchEvent(new Event("portfolio:unauthorized"));
			}

			const rejection: ApiErrorBody = {
				success: false,
				message:
					body.message ||
					(error.code === "ECONNABORTED"
						? "The request timed out. Please try again."
						: !error.response
							? "Can't reach the server right now. Please try again later."
							: "Something went wrong."),
				errors: body.errors,
				fields: body.fields,
				status,
			};
			throw rejection;
		}
		throw { success: false, message: "Something went wrong." } satisfies ApiErrorBody;
	}
}
