import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { Accent, Section } from "@/components/shared/section";
import { ProjectCard } from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/portfolio";

export function Projects({ projects }: { projects: Project[] }) {
	const visible = projects.filter((p) => p.category !== "upcoming");
	// Featured first, then the rest — fill up to two rows of three.
	const featured = [...visible].sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order).slice(0, 6);

	return (
		<Section
			id="projects"
			eyebrow="Selected work"
			title={
				<>
					Things I&apos;ve <Accent>built</Accent>
				</>
			}
			description="Production systems I build at Capture A Trip, plus personal and client projects."
		>
			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{featured.map((project, i) => (
					<Reveal key={project.id} delay={(i % 3) * 0.06} className="h-full">
						<ProjectCard project={project} priority={i < 3} />
					</Reveal>
				))}
			</div>

			{visible.length > featured.length && (
				<Reveal className="mt-8 flex justify-center">
					<Button asChild variant="outline" size="lg" className="h-11 rounded-full px-6">
						<Link href="/projects">
							View all {visible.length} projects <ArrowRight className="size-4" />
						</Link>
					</Button>
				</Reveal>
			)}
		</Section>
	);
}
