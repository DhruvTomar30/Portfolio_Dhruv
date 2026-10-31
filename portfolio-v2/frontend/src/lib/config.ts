const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const siteConfig = {
	url: stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
	/** Used by the browser (contact form, admin). */
	apiUrl: stripTrailingSlash(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"),
	/** Used by server components; can point at localhost on the VPS. */
	internalApiUrl: stripTrailingSlash(
		process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"
	),
	title: "Dhruv Tomar — Full Stack Developer",
	description:
		"Portfolio of Dhruv Tomar, a full stack developer building fast, beautiful web apps with React, Next.js, Node.js, Express and MongoDB.",
};

export const CONTENT_CACHE_TAG = "portfolio-content";
