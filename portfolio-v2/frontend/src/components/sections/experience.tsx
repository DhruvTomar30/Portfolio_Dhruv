import { ArrowUpRight, Briefcase, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Accent, Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { formatDuration, formatYearMonth, monthsBetween } from "@/lib/format";
import type { Education, Experience as ExperienceItem } from "@/types/portfolio";

export function Experience({ experience, education }: { experience: ExperienceItem[]; education: Education[] }) {
	return (
		<Section
			id="experience"
			eyebrow="Journey"
			title={
				<>
					Where I&apos;ve <Accent>worked</Accent> &amp; studied
				</>
			}
		>
			<div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
				{/* Work timeline */}
				<div>
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
						<Briefcase className="size-4" /> Work experience
					</h3>
					<ol className="relative space-y-4 border-l border-border pl-7">
						{experience.map((job, i) => {
							const duration = formatDuration(monthsBetween(job.startDate, job.endDate));
							return (
								<li key={job.id} className="relative">
									<Reveal delay={i * 0.06}>
									<span className="absolute -left-[37px] top-5 grid size-5 place-items-center rounded-full border border-primary/40 bg-background">
										<span className="size-2 rounded-full bg-primary" />
									</span>
									<article className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
										<div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
											<div>
												<h4 className="text-base font-semibold">{job.role}</h4>
												{job.companyUrl ? (
													<a
														href={job.companyUrl}
														target="_blank"
														rel="noreferrer"
														className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
													>
														{job.company} <ArrowUpRight className="size-3.5" />
													</a>
												) : (
													<p className="text-sm text-primary">{job.company}</p>
												)}
											</div>
											<div className="text-right font-mono text-xs text-muted-foreground">
												<p>
													{formatYearMonth(job.startDate)} — {formatYearMonth(job.endDate)}
												</p>
												<p className="mt-0.5">
													{[job.employmentType, duration].filter(Boolean).join(" · ")}
												</p>
											</div>
										</div>
										<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
										{job.highlights.length > 0 && (
											<ul className="mt-3 space-y-1 text-[13px] leading-relaxed">
												{job.highlights.map((h) => (
													<li key={h} className="flex gap-2">
														<span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
														<span>{h}</span>
													</li>
												))}
											</ul>
										)}
										{job.techStack.length > 0 && (
											<div className="mt-4 flex flex-wrap gap-1.5">
												{job.techStack.map((t) => (
													<Badge key={t} variant="secondary" className="rounded-full font-mono text-[11px] font-normal">
														{t}
													</Badge>
												))}
											</div>
										)}
									</article>
									</Reveal>
								</li>
							);
						})}
					</ol>
				</div>

				{/* Education */}
				<div>
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
						<GraduationCap className="size-4" /> Education
					</h3>
					<div className="space-y-3">
						{education.map((edu, i) => (
							<Reveal key={edu.id} delay={0.1 + i * 0.06}>
								<article className="rounded-2xl border border-border bg-card p-5">
									<p className="font-mono text-xs text-muted-foreground">
										{edu.startYear} — {edu.endYear ?? "Present"}
									</p>
									<h4 className="mt-1.5 text-[15px] font-semibold leading-snug">{edu.degree}</h4>
									<p className="mt-1 text-sm text-primary">{edu.institution}</p>
									{edu.description && (
										<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{edu.description}</p>
									)}
								</article>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
