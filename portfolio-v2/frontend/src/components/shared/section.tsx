import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
	id: string;
	eyebrow: string;
	title: ReactNode;
	description?: ReactNode;
	children: ReactNode;
	className?: string;
}

export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
	return (
		<section id={id} className={cn("relative scroll-mt-8 py-12 sm:py-16", className)}>
			<div className="container-page">
				<Reveal className="mb-8 max-w-2xl">
					<p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
						<span className="h-px w-8 bg-primary/60" />
						{eyebrow}
					</p>
					<h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
					{description ? (
						<p className="mt-3 text-pretty text-sm text-muted-foreground sm:text-base">{description}</p>
					) : null}
				</Reveal>
				{children}
			</div>
		</section>
	);
}

/** Italic serif accent for a word inside a heading. */
export function Accent({ children }: { children: ReactNode }) {
	return <span className="font-serif font-normal italic text-gradient pr-1">{children}</span>;
}
