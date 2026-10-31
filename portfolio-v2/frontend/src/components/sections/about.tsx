import { Code2, Gauge, GraduationCap, Mail, MapPin, Phone, Server } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Accent, Section } from "@/components/shared/section";
import type { Profile } from "@/types/portfolio";

const EXPERTISE_ICONS = [Code2, Server, Gauge];

export function About({ profile }: { profile: Profile }) {
	const info = [
		{ icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
		{ icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
		{ icon: MapPin, label: "Based in", value: profile.location },
		{ icon: GraduationCap, label: "Studying", value: profile.qualification },
	].filter((item) => item.value);

	return (
		<Section
			id="about"
			eyebrow="About me"
			title={
				<>
					Turning ideas into <Accent>fast, delightful</Accent> web products
				</>
			}
			description="I care about the whole journey — from the first conversation with a stakeholder to validated APIs, measurable performance and a polished interface in production."
		>
			<div className="grid gap-4 lg:grid-cols-3">
				{/* Stats */}
				<Reveal className="lg:col-span-2">
					<div className="grid h-full grid-cols-3 divide-x divide-border overflow-hidden rounded-3xl border border-border bg-card">
						{profile.stats.map((stat) => (
							<div key={stat.label} className="flex flex-col justify-center p-5 sm:p-6">
								<span className="text-3xl font-semibold tracking-tight sm:text-4xl">
									<span className="text-gradient">{stat.value}</span>
								</span>
								<span className="mt-2 text-sm text-muted-foreground">{stat.label}</span>
							</div>
						))}
					</div>
				</Reveal>

				{/* Quick info */}
				<Reveal delay={0.1}>
					<div className="h-full rounded-3xl border border-border bg-card p-5 sm:p-6">
						<p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Quick info</p>
						<ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
							{info.map(({ icon: Icon, label, value, href }) => (
								<li key={label} className="flex items-start gap-3">
									<span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
										<Icon className="size-4" />
									</span>
									<div className="min-w-0">
										<p className="text-xs text-muted-foreground">{label}</p>
										{href ? (
											<a href={href} className="block break-words font-medium hover:text-primary">
												{value}
											</a>
										) : (
											<p className="break-words font-medium">{value}</p>
										)}
									</div>
								</li>
							))}
						</ul>
					</div>
				</Reveal>

				{/* Expertise */}
				<div className="grid gap-4 md:grid-cols-3 lg:col-span-3">
					{profile.expertise.slice(0, 3).map((item, i) => {
						const Icon = EXPERTISE_ICONS[i % EXPERTISE_ICONS.length];
						return (
							<Reveal key={item.title} delay={0.12 + i * 0.05} className="h-full">
								<div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
									<div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/15 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
									<Icon className="size-6 text-primary" />
									<h3 className="mt-3 text-base font-semibold">{item.title}</h3>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
								</div>
							</Reveal>
						);
					})}
				</div>
			</div>
		</Section>
	);
}
