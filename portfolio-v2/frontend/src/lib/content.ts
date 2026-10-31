import { cacheLife, cacheTag } from "next/cache";
import {
	fallbackCertificates,
	fallbackEducation,
	fallbackExperience,
	fallbackProfile,
	fallbackProjects,
	fallbackSkills,
} from "@/data/fallback";
import { CONTENT_CACHE_TAG, siteConfig } from "@/lib/config";
import type { ApiResponse } from "@/types/api";
import type { PortfolioContent } from "@/types/portfolio";

/** Server-only GET against the backend. Returns null on any failure so callers can fall back. */
async function apiGet<T>(path: string): Promise<T | null> {
	try {
		const res = await fetch(`${siteConfig.internalApiUrl}/api${path}`, {
			headers: { Accept: "application/json" },
			signal: AbortSignal.timeout(5000),
		});
		if (!res.ok) return null;
		const body = (await res.json()) as ApiResponse<T>;
		return body.success ? body.data : null;
	} catch {
		return null;
	}
}

/**
 * Everything the public site renders, fetched in parallel and cached for an hour
 * (refreshed immediately after admin edits via updateTag in src/actions/revalidate.ts).
 * Any section the API can't serve falls back to the bundled copy in src/data/fallback.ts.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
	"use cache";
	cacheLife("hours");
	cacheTag(CONTENT_CACHE_TAG);

	const [profile, projects, skills, experience, education, certificates] = await Promise.all([
		apiGet<PortfolioContent["profile"]>("/profile"),
		apiGet<PortfolioContent["projects"]>("/projects"),
		apiGet<PortfolioContent["skills"]>("/skills"),
		apiGet<PortfolioContent["experience"]>("/experience"),
		apiGet<PortfolioContent["education"]>("/education"),
		apiGet<PortfolioContent["certificates"]>("/certificates"),
	]);

	return {
		profile: profile ?? fallbackProfile,
		projects: projects ?? fallbackProjects,
		skills: skills ?? fallbackSkills,
		experience: experience ?? fallbackExperience,
		education: education ?? fallbackEducation,
		certificates: certificates ?? fallbackCertificates,
		usedFallback: [profile, projects, skills, experience, education, certificates].some((v) => v === null),
	};
}
