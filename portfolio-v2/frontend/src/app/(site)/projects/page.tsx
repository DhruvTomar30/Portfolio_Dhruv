import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { Accent } from "@/components/shared/section";
import { ProjectsExplorer } from "@/components/sections/projects-explorer";
import { getPortfolioContent } from "@/lib/content";

export const metadata: Metadata = {
	title: "Projects",
	description: "Everything Dhruv Tomar has built — MERN stack apps, Next.js sites, client work and more.",
	alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
	const { projects } = await getPortfolioContent();

	return (
		<section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40">
			<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
				<div className="bg-grid mask-radial absolute inset-x-0 top-0 h-[40rem]" />
				<div className="absolute -top-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-brand/20 blur-[120px]" />
			</div>
			<div className="container-page">
				<Reveal>
					<Link
						href="/"
						className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						<ArrowLeft className="size-4" /> Back home
					</Link>
					<h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
						All <Accent>projects</Accent>
					</h1>
					<p className="mt-4 max-w-2xl text-lg text-muted-foreground">
						Full-stack apps, client websites and experiments. Filter by stack to find what you&apos;re looking for.
					</p>
				</Reveal>
				<div className="mt-12">
					<ProjectsExplorer projects={projects} />
				</div>
			</div>
		</section>
	);
}
