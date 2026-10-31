export type SocialPlatform = "github" | "linkedin" | "instagram" | "facebook" | "twitter" | "email" | string;

export interface Social {
	platform: SocialPlatform;
	url: string;
}

export interface Profile {
	name: string;
	headline: string;
	roles: string[];
	bio: string;
	avatarUrl: string;
	resumeUrl: string;
	email: string;
	phone: string;
	location: string;
	birthDate: string;
	qualification: string;
	availableForWork: boolean;
	socials: Social[];
	expertise: { title: string; description: string }[];
	stats: { label: string; value: string }[];
}

export const PROJECT_CATEGORIES = ["professional", "mern", "nextjs", "client", "frontend", "upcoming"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
	professional: "Professional Work",
	mern: "MERN Stack",
	nextjs: "Next.js",
	client: "Client Work",
	frontend: "Frontend",
	upcoming: "Upcoming",
};

export interface Project {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: ProjectCategory;
	techStack: string[];
	imageUrl: string;
	liveUrl: string;
	repoUrl: string;
	featured: boolean;
	order: number;
	published?: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export const SKILL_GROUPS = ["languages", "frontend", "backend", "database", "integrations", "tools"] as const;
export type SkillGroup = (typeof SKILL_GROUPS)[number];

export const SKILL_GROUP_LABELS: Record<SkillGroup, string> = {
	languages: "Languages",
	frontend: "Frontend",
	backend: "Backend",
	database: "Databases",
	integrations: "Integrations & Analytics",
	tools: "Tools & Platforms",
};

export interface Skill {
	id: string;
	name: string;
	group: SkillGroup;
	iconUrl: string;
	order: number;
}

export interface Experience {
	id: string;
	role: string;
	company: string;
	companyUrl: string;
	employmentType: string;
	location: string;
	startDate: string; // YYYY-MM
	endDate: string | null; // null = present
	summary: string;
	highlights: string[];
	techStack: string[];
	order: number;
}

export interface Education {
	id: string;
	degree: string;
	institution: string;
	location: string;
	startYear: string;
	endYear: string | null;
	description: string;
	order: number;
}

export interface Certificate {
	id: string;
	title: string;
	issuer: string;
	description: string;
	imageUrl: string;
	url: string;
	issuedOn: string;
	order: number;
}

export interface PortfolioContent {
	profile: Profile;
	projects: Project[];
	skills: Skill[];
	experience: Experience[];
	education: Education[];
	certificates: Certificate[];
	/** true when one or more sections came from the bundled fallback instead of the API */
	usedFallback: boolean;
}
