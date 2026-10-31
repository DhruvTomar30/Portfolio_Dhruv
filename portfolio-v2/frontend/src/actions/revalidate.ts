"use server";

import { updateTag } from "next/cache";
import { CONTENT_CACHE_TAG, siteConfig } from "@/lib/config";

/**
 * Called by the admin UI after editing content so the public pages show the change immediately.
 * Server Actions are public endpoints, so the caller's token is verified against the backend first.
 */
export async function refreshPublicContent(token: string): Promise<{ ok: boolean }> {
	if (!token) return { ok: false };
	try {
		const res = await fetch(`${siteConfig.internalApiUrl}/api/auth/me`, {
			headers: { Authorization: `Bearer ${token}` },
			signal: AbortSignal.timeout(5000),
		});
		if (!res.ok) return { ok: false };
	} catch {
		return { ok: false };
	}
	updateTag(CONTENT_CACHE_TAG);
	return { ok: true };
}
