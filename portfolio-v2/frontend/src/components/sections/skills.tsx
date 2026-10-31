/* eslint-disable @next/next/no-img-element -- small remote SVG icons; next/image adds no value here */
import { Braces, Cloud, Code2, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Accent, Section } from "@/components/shared/section";
import type { Skill, SkillGroup } from "@/types/portfolio";

/** Display cards: small groups are merged so every card holds a similar number of skills. */
const CARDS: { title: string; groups: SkillGroup[] }[] = [
	{ title: "Languages & Frontend", groups: ["languages", "frontend"] },
	{ title: "Backend & Databases", groups: ["backend", "database"] },
	{ title: "Integrations & Analytics", groups: ["integrations"] },
	{ title: "Tools & Platforms", groups: ["tools"] },
];

/** Icons for skills that have no brand logo. */
const FALLBACK_ICONS: Record<string, LucideIcon> = {
	"rest apis": Braces,
	joi: ShieldCheck,
	"aggregation pipelines": Workflow,
	"aws s3": Cloud,
};

const INVERT_IN_DARK = ["express", "nextjs", "github", "vercel", "jsonwebtokens"];

function SkillIcon({ skill }: { skill: Skill }) {
	if (!skill.iconUrl) {
		const Icon = FALLBACK_ICONS[skill.name.toLowerCase()] ?? Code2;
		return <Icon className="size-[18px] text-primary" aria-hidden />;
	}
	const invert = INVERT_IN_DARK.some((key) => skill.iconUrl.includes(key));
	return (
		<img
			src={skill.iconUrl}
			alt=""
			width={20}
			height={20}
			loading="lazy"
			className={`size-[18px] object-contain ${invert ? "dark:invert" : ""}`}
		/>
	);
}

export function Skills({ skills }: { skills: Skill[] }) {
	const cards = CARDS.map((card) => ({
		...card,
		items: card.groups.flatMap((group) =>
			skills.filter((s) => s.group === group).sort((a, b) => a.order - b.order)
		),
	})).filter((card) => card.items.length > 0);

	return (
		<Section
			id="skills"
			eyebrow="Toolbox"
			title={
				<>
					The <Accent>stack</Accent> I build with
				</>
			}
			description="From pixel-perfect interfaces to the APIs and databases behind them."
		>
			<div className="grid gap-4 md:grid-cols-2">
				{cards.map(({ title, items }, i) => (
					<Reveal key={title} delay={(i % 2) * 0.05} className="h-full">
						<div className="h-full rounded-3xl border border-border bg-card p-5 sm:p-6">
							<h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
								{title}
								<span className="ml-2 text-primary">{items.length}</span>
							</h3>
							<ul className="mt-4 flex flex-wrap gap-2">
								{items.map((skill) => (
									<li
										key={skill.id}
										className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-background/60 px-3 text-sm font-medium transition-colors hover:border-primary/40"
									>
										<SkillIcon skill={skill} />
										{skill.name}
									</li>
								))}
							</ul>
						</div>
					</Reveal>
				))}
			</div>
		</Section>
	);
}
