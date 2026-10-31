import { About } from "@/components/sections/about";
import { Certificates } from "@/components/sections/certificates";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { siteConfig } from "@/lib/config";
import { getPortfolioContent } from "@/lib/content";

export default async function HomePage() {
	const content = await getPortfolioContent();
	const { profile } = content;

	const personJsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: profile.name,
		jobTitle: profile.headline,
		email: `mailto:${profile.email}`,
		url: siteConfig.url,
		image: `${siteConfig.url}${profile.avatarUrl}`,
		address: { "@type": "PostalAddress", addressLocality: profile.location },
		sameAs: profile.socials.map((s) => s.url),
		knowsAbout: content.skills.map((s) => s.name),
	};

	return (
		<>
			<script
				type="application/ld+json"
				// JSON.stringify output with "<" escaped is safe to inline
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
			/>
			<Hero profile={profile} />
			<About profile={profile} />
			<Experience experience={content.experience} education={content.education} />
			<Skills skills={content.skills} />
			<Projects projects={content.projects} />
			<Certificates certificates={content.certificates} />
			<Contact profile={profile} />
		</>
	);
}
