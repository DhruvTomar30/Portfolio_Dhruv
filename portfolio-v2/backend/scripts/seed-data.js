/**
 * Single source of truth for the portfolio content (from Dhruv_Tomar_RESUME.pdf + the old site).
 *   pnpm seed           → writes it to MongoDB
 *   pnpm sync-fallback  → copies it to ../frontend/src/data/fallback.json (used if the API is down)
 * Image paths are served by the Next.js frontend from /public/images.
 */
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SIMPLE = "https://cdn.simpleicons.org";

export const profile = {
	key: "main",
	name: "Dhruv Tomar",
	headline: "Software Engineer at Capture A Trip",
	roles: ["Full Stack Developer", "Software Engineer", "MERN Stack Developer", "Next.js Developer"],
	bio: "Full stack developer with 2+ years of production experience in React, TypeScript and Node.js — a core developer of an in-house CRM built from the ground up, spanning finance, payments, analytics and SEO.",
	avatarUrl: "/images/dhruv-headshot.jpg",
	resumeUrl: "https://drive.google.com/file/d/1nM6RXkxTbvbTNlR2dwRhu7wwBcTEUs2z/view?usp=sharing",
	email: "dhruvtomar2025@gmail.com",
	phone: "+91 95993 05251",
	location: "Gurugram, Haryana, India",
	birthDate: "2004-10-15",
	qualification: "MCA, Maharishi Dayanand University (2024 – 2026)",
	availableForWork: true,
	socials: [
		{ platform: "github", url: "https://github.com/DhruvTomar30" },
		{ platform: "linkedin", url: "https://www.linkedin.com/in/dhruvtomar15102004/" },
		{ platform: "instagram", url: "https://www.instagram.com/dhruvtomar_30/" },
		{ platform: "facebook", url: "https://www.facebook.com/dhruv.tomar.5243/" },
	],
	expertise: [
		{
			title: "Frontend Engineering",
			description:
				"React, Next.js and TypeScript interfaces built from reusable components — admin portals, dashboards and high-converting landing pages.",
		},
		{
			title: "Backend & APIs",
			description:
				"30+ validated REST APIs on Node.js and Express with MongoDB/PostgreSQL aggregation pipelines, JWT auth, RBAC and RabbitMQ queues.",
		},
		{
			title: "Performance & SEO",
			description:
				"Cut a homepage render from ~2–3 s to under 100 ms and grew organic traffic ~35% with canonical tags and segmented XML sitemaps.",
		},
	],
	stats: [
		{ label: "Years in production", value: "2+" },
		{ label: "Features shipped", value: "25+" },
		{ label: "REST APIs authored", value: "30+" },
	],
};

export const experience = [
	{
		role: "Software Engineer",
		company: "Capture A Trip",
		companyUrl: "https://www.captureatrip.com/",
		employmentType: "Full-time",
		location: "Gurugram, India",
		startDate: "2025-02",
		endDate: "",
		summary:
			"Core developer on the small team that built the company CRM from scratch, driving full-stack development across four products: the website, admin portal, CRM and landing pages.",
		highlights: [
			"Launched 25+ production features across the Website, Admin Portal, CRM and Landing Pages",
			"Designed 4 core CRM modules — Lead Management, Vendor Management, Dashboard Analytics and KYC — used daily by sales, ops and finance",
			"Delivered 3 high-converting landing pages with self-booking payments and server-side conversion tracking (Meta CAPI, GA4)",
			"Slashed homepage render time from ~2–3 s to under 100 ms (95%+ faster) and lifted organic traffic ~35% via canonical tags and segmented XML sitemaps",
		],
		techStack: ["React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "RabbitMQ", "Meta CAPI", "GA4"],
		order: 0,
	},
	{
		role: "Junior Software Developer",
		company: "Holiday Tribe",
		companyUrl: "https://holidaytribe.ai/",
		employmentType: "Full-time",
		location: "India",
		startDate: "2024-08",
		endDate: "2024-12",
		summary: "Revamped the Angular-based Admin Portal, focusing on reusable UI, performance and secure routing.",
		highlights: [
			"Rebuilt the Admin Portal UI with 20+ reusable components across 10+ dashboard screens",
			"Cut portal load time by 40% with lazy loading and API caching",
			"Secured 15+ routes with JWT-based authentication and route protection",
		],
		techStack: ["Angular", "TypeScript", "JWT", "REST APIs"],
		order: 1,
	},
	{
		role: "MERN Stack Intern",
		company: "Flytant Developers Pvt. Ltd.",
		companyUrl: "https://flytant.com/",
		employmentType: "Internship",
		location: "India",
		startDate: "2024-07",
		endDate: "2024-08",
		summary: "Built content and real-estate platforms with Next.js and Tailwind CSS.",
		highlights: [
			"Developed CityConcepts, a Next.js real-estate platform with advanced search and BHK filtering for 10+ US locations",
			"Produced CreativAiGen, a blog platform organising 100+ articles into 8 categories",
		],
		techStack: ["Next.js", "React", "Tailwind CSS", "Node.js"],
		order: 2,
	},
];

export const education = [
	{
		degree: "Master of Computer Applications (MCA)",
		institution: "Maharishi Dayanand University",
		location: "Faridabad, Haryana",
		startYear: "2024",
		endYear: "2026",
		description: "",
		order: 0,
	},
	{
		degree: "Bachelor of Computer Applications (BCA)",
		institution: "Delhi Skill and Entrepreneurship University (DSEU)",
		location: "Delhi",
		startYear: "2021",
		endYear: "2024",
		description: "Graduated with a CGPA of 9.3 / 10.",
		order: 1,
	},
	{
		degree: "Senior Secondary (12th)",
		institution: "MC Gopi Chand Inter College",
		location: "",
		startYear: "2020",
		endYear: "2021",
		description: "",
		order: 2,
	},
];

const GREY = "a1a1aa";
export const skills = [
	// Languages
	["JavaScript", "languages", `${DEVICON}/javascript/javascript-original.svg`],
	["TypeScript", "languages", `${DEVICON}/typescript/typescript-original.svg`],
	// Frontend
	["React", "frontend", `${DEVICON}/react/react-original.svg`],
	["Next.js", "frontend", `${DEVICON}/nextjs/nextjs-original.svg`],
	["Redux Toolkit", "frontend", `${DEVICON}/redux/redux-original.svg`],
	["Zustand", "frontend", `${DEVICON}/zustand/zustand-original.svg`],
	["Tailwind CSS", "frontend", `${DEVICON}/tailwindcss/tailwindcss-original.svg`],
	["shadcn/ui", "frontend", `${SIMPLE}/shadcnui/${GREY}`],
	["Bootstrap", "frontend", `${DEVICON}/bootstrap/bootstrap-original.svg`],
	["HTML5", "frontend", `${DEVICON}/html5/html5-original.svg`],
	["CSS3", "frontend", `${DEVICON}/css3/css3-original.svg`],
	// Backend
	["Node.js", "backend", `${DEVICON}/nodejs/nodejs-original.svg`],
	["Express", "backend", `${DEVICON}/express/express-original.svg`],
	["REST APIs", "backend", ""],
	["Zod", "backend", `${SIMPLE}/zod`],
	["Joi", "backend", ""],
	["JWT Auth", "backend", `${SIMPLE}/jsonwebtokens`],
	["RabbitMQ", "backend", `${DEVICON}/rabbitmq/rabbitmq-original.svg`],
	["Aggregation Pipelines", "backend", ""],
	// Databases
	["PostgreSQL", "database", `${DEVICON}/postgresql/postgresql-original.svg`],
	["MongoDB", "database", `${DEVICON}/mongodb/mongodb-original.svg`],
	["MySQL", "database", `${DEVICON}/mysql/mysql-original.svg`],
	// Integrations & analytics
	["Stripe", "integrations", `${SIMPLE}/stripe`],
	["Razorpay Checkout (frontend)", "integrations", `${SIMPLE}/razorpay`],
	["PhonePe Checkout (frontend)", "integrations", `${SIMPLE}/phonepe`],
	["AWS S3", "integrations", ""],
	["Cloudinary", "integrations", `${SIMPLE}/cloudinary`],
	["Meta CAPI", "integrations", `${SIMPLE}/meta`],
	["GA4", "integrations", `${SIMPLE}/googleanalytics`],
	// Tools
	["Git", "tools", `${DEVICON}/git/git-original.svg`],
	["GitHub", "tools", `${DEVICON}/github/github-original.svg`],
	["Postman", "tools", `${DEVICON}/postman/postman-original.svg`],
	["Jira", "tools", `${DEVICON}/jira/jira-original.svg`],
	["Vercel", "tools", `${DEVICON}/vercel/vercel-original.svg`],
	["Render", "tools", `${SIMPLE}/render/${GREY}`],
].map(([name, group, iconUrl], order) => ({ name, group, iconUrl, order }));

export const projects = [
	{
		title: "Capture A Trip — CRM",
		slug: "capture-a-trip-crm",
		description:
			"Greenfield CRM with 8 modules and 30+ REST APIs: finance & bills ledger with multi-stage approvals and 15+ profitability metrics, lead management for 500+ leads with auto-assignment, vendor management for 100+ vendors, dashboard analytics and an automated 3-stage KYC flow.",
		category: "professional",
		techStack: ["React", "Node.js", "MongoDB", "PostgreSQL", "RabbitMQ", "Joi"],
		imageUrl: "",
		liveUrl: "",
		repoUrl: "",
		featured: true,
		order: 0,
	},
	{
		title: "Capture A Trip — Website & Landing Pages",
		slug: "capture-a-trip-website",
		description:
			"3 high-intent landing pages with enquiry and instant-book journeys, a self-booking flow using JWT-signed links with frontend checkout integration for PhonePe and Razorpay, and server-side Meta CAPI + GA4 tracking for ~100% event coverage.",
		category: "professional",
		techStack: ["React", "TypeScript", "Meta CAPI", "GA4", "JWT"],
		imageUrl: "/images/projects/captureatrip.jpg",
		liveUrl: "https://www.captureatrip.com/",
		repoUrl: "",
		featured: true,
		order: 1,
	},
	{
		title: "FreshPick",
		slug: "freshpick",
		description:
			"Responsive grocery e-commerce store with 50+ products, dual checkout (Cash on Delivery + Stripe), JWT auth for buyers and sellers, and a seller dashboard with real-time stock and order status.",
		category: "mern",
		techStack: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Cloudinary"],
		imageUrl: "/images/projects/freshpick.jpg",
		liveUrl: "https://https-github-com-dhruv-tomar30-fres-beta.vercel.app/",
		repoUrl: "https://github.com/DhruvTomar30/https---github.com-DhruvTomar30-FreshPick",
		featured: true,
		order: 2,
	},
	{
		title: "CityConcepts",
		slug: "cityconcept",
		description:
			"Next.js real-estate platform with advanced search and BHK filtering across 10+ US locations.",
		category: "nextjs",
		techStack: ["Next.js", "Tailwind CSS"],
		imageUrl: "/images/projects/cityconcepts.jpg",
		liveUrl: "https://cityconcepts.netlify.app/",
		repoUrl: "https://github.com/DhruvTomar30/CityConcept",
		featured: true,
		order: 3,
	},
	{
		title: "CreativAiGen",
		slug: "creativaigen",
		description: "Blog platform organising 100+ articles into 8 categories for streamlined reader navigation.",
		category: "nextjs",
		techStack: ["Next.js", "Tailwind CSS"],
		imageUrl: "/images/projects/creativaigen.jpg",
		liveUrl: "https://creativaigen.netlify.app/",
		repoUrl: "https://github.com/DhruvTomar30/CreativAiGen",
		featured: false,
		order: 4,
	},
	{
		title: "KwikNotes",
		slug: "kwiknotes",
		description:
			"A centralised repository of notes and study material for students, with email integration and a fast, simple UI.",
		category: "client",
		techStack: ["HTML", "CSS", "JavaScript", "Bootstrap", "Node.js", "EmailJS"],
		imageUrl: "/images/projects/kwiknotes.jpg",
		liveUrl: "https://kwiknotes.in/",
		repoUrl: "https://github.com/DhruvTomar30/KwikNotes",
		featured: false,
		order: 5,
	},
	{
		title: "Spotify Clone",
		slug: "spotify-clone",
		description: "A front-end Spotify clone offering a seamless, personalised audio-streaming experience.",
		category: "frontend",
		techStack: ["HTML", "CSS", "JavaScript"],
		imageUrl: "/images/projects/spotify.png",
		liveUrl: "",
		repoUrl: "https://github.com/DhruvTomar30/Spotify_Clone",
		featured: false,
		order: 6,
	},
];

export const certificates = [
	{
		title: "Junior Software Developer",
		issuer: "Holiday Tribe",
		description: "Experience certificate for revamping the admin portal UI.",
		imageUrl: "",
		url: "", // add a link to the certificate (e.g. Google Drive)
		issuedOn: "2024-12",
		order: 0,
	},
	{
		title: "MERN Stack Internship",
		issuer: "Flytant Developers Pvt. Ltd.",
		description: "Internship certificate for building CityConcepts and CreativAiGen.",
		imageUrl: "",
		url: "", // add a link to the certificate (e.g. Google Drive)
		issuedOn: "2024-08",
		order: 1,
	},
];
