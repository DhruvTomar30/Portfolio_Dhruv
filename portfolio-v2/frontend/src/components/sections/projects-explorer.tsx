"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProjectCard } from "@/components/sections/project-card";
import { cn } from "@/lib/utils";
import { PROJECT_CATEGORIES, PROJECT_CATEGORY_LABELS, type Project, type ProjectCategory } from "@/types/portfolio";

type Filter = "all" | ProjectCategory;

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
	const [filter, setFilter] = useState<Filter>("all");
	const available = PROJECT_CATEGORIES.filter((c) => projects.some((p) => p.category === c));
	const filters: Filter[] = ["all", ...available];
	const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

	return (
		<>
			<div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
				{filters.map((f) => {
					const count = f === "all" ? projects.length : projects.filter((p) => p.category === f).length;
					const active = filter === f;
					return (
						<button
							key={f}
							role="tab"
							aria-selected={active}
							onClick={() => setFilter(f)}
							className={cn(
								"relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
								active ? "border-transparent text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
							)}
						>
							{active && (
								<motion.span
									layoutId="project-filter"
									className="absolute inset-0 -z-10 rounded-full bg-primary"
									transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
								/>
							)}
							{f === "all" ? "All" : PROJECT_CATEGORY_LABELS[f]}
							<span className="ml-1.5 font-mono text-xs opacity-70">{count}</span>
						</button>
					);
				})}
			</div>

			<motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				<AnimatePresence mode="popLayout">
					{shown.map((project, i) => (
						<motion.div
							key={project.id}
							layout
							initial={{ opacity: 0, scale: 0.96 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.96 }}
							transition={{ duration: 0.3 }}
							className="h-full"
						>
							<ProjectCard project={project} priority={i < 3} />
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>
		</>
	);
}
