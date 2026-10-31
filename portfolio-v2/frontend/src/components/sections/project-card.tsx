"use client";

import { ArrowUpRight, Lock } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Image from "next/image";
import type { MouseEvent } from "react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { Badge } from "@/components/ui/badge";
import { PROJECT_CATEGORY_LABELS, type Project } from "@/types/portfolio";

/** Neutral cover for projects without a public screenshot (e.g. internal tools). */
function ProjectPlaceholder({ project }: { project: Project }) {
	const internal = !project.liveUrl && !project.repoUrl;
	return (
		<div className="relative flex size-full flex-col items-center justify-center gap-3 bg-muted p-5 text-center">
			<div className="bg-grid absolute inset-0 opacity-70" />
			<span className="relative grid size-11 place-items-center rounded-xl border border-border bg-background shadow-sm">
				<Lock className="size-5 text-primary" />
			</span>
			<p className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
				{internal ? "Internal product · not publicly accessible" : "Preview unavailable"}
			</p>
			<div className="relative flex flex-wrap justify-center gap-1.5">
				{project.techStack.slice(0, 4).map((t) => (
					<span key={t} className="rounded-md border border-border bg-background/70 px-2 py-1 font-mono text-[11px]">
						{t}
					</span>
				))}
			</div>
		</div>
	);
}

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
	const reduce = useReducedMotion();
	const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
	const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
	const gx = useMotionValue(50);
	const gy = useMotionValue(50);
	const glow = useMotionTemplate`radial-gradient(400px circle at ${gx}% ${gy}%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 60%)`;

	const onMove = (e: MouseEvent<HTMLElement>) => {
		if (reduce) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width;
		const py = (e.clientY - rect.top) / rect.height;
		ry.set((px - 0.5) * 6);
		rx.set((0.5 - py) * 6);
		gx.set(px * 100);
		gy.set(py * 100);
	};
	const onLeave = () => {
		rx.set(0);
		ry.set(0);
	};

	const primaryHref = project.liveUrl || project.repoUrl;

	return (
		<motion.article
			onMouseMove={onMove}
			onMouseLeave={onLeave}
			style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
			className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/30"
		>
			<motion.div
				aria-hidden
				className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{ background: glow }}
			/>
			<div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-muted">
				{project.imageUrl ? (
					<Image
						src={project.imageUrl}
						alt={`${project.title} screenshot`}
						fill
						priority={priority}
						sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
						className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
					/>
				) : (
					<div className="size-full transition-transform duration-700 group-hover:scale-105">
						<ProjectPlaceholder project={project} />
					</div>
				)}
				<Badge className="absolute left-3 top-3 rounded-full border-white/20 bg-black/60 text-[11px] text-white backdrop-blur">
					{PROJECT_CATEGORY_LABELS[project.category] ?? project.category}
				</Badge>
			</div>

			<div className="relative z-20 flex flex-1 flex-col p-5">
				<div className="flex items-start justify-between gap-4">
					<h3 className="text-base font-semibold tracking-tight">
						{primaryHref ? (
							<a href={primaryHref} target="_blank" rel="noreferrer" className="after:absolute after:inset-0">
								{project.title}
							</a>
						) : (
							project.title
						)}
					</h3>
					{primaryHref && (
						<ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
					)}
				</div>
				<p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">{project.description}</p>

				<div className="mt-4 flex flex-wrap gap-1.5">
					{project.techStack.slice(0, 5).map((t) => (
						<span key={t} className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[11px] text-secondary-foreground">
							{t}
						</span>
					))}
				</div>

				<div className="relative z-30 mt-4 flex items-center gap-4 border-t border-border pt-3 text-[13px]">
					{project.liveUrl && (
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-1 font-medium hover:text-primary"
						>
							{project.category === "professional" ? "Visit site" : "Live demo"} <ArrowUpRight className="size-3.5" />
						</a>
					)}
					{!project.liveUrl && !project.repoUrl && (
						<span className="inline-flex items-center gap-1.5 text-muted-foreground">
							<Lock className="size-3.5" /> Internal tool · code is private
						</span>
					)}
					{project.repoUrl && (
						<a
							href={project.repoUrl}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
						>
							<GithubIcon className="size-3.5" /> Source
						</a>
					)}
				</div>
			</div>
		</motion.article>
	);
}
