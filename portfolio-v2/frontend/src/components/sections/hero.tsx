import { ArrowDown, ArrowUpRight, FileText, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LABELS, SocialIcon } from "@/components/icons/brand-icons";
import { Reveal } from "@/components/shared/reveal";
import { RoleRotator } from "@/components/sections/role-rotator";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/types/portfolio";

const FLOATING_CHIPS = [
	{ label: "React", className: "-left-6 top-10 sm:-left-10" },
	{ label: "Node.js", className: "-right-4 top-1/3 sm:-right-8" },
	{ label: "TypeScript", className: "-left-4 bottom-16 sm:-left-8" },
];

export function Hero({ profile }: { profile: Profile }) {
	const [first, ...rest] = profile.name.split(" ");

	return (
		<section id="top" className="relative isolate overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14">
			{/* Background: grid + aurora */}
			<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
				<div className="bg-grid mask-radial absolute inset-0" />
				<div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 animate-aurora rounded-full bg-brand/25 blur-[120px]" />
				<div className="absolute top-40 -right-20 h-[28rem] w-[28rem] animate-aurora rounded-full bg-brand-2/25 blur-[120px] [animation-delay:-6s]" />
			</div>

			<div className="container-page grid items-center gap-14 lg:grid-cols-[1.4fr_1fr]">
				<div>
					<Reveal>
						{profile.availableForWork && (
							<span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium backdrop-blur">
								<span className="relative flex size-2">
									<span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
									<span className="relative inline-flex size-2 rounded-full bg-success" />
								</span>
								Available for new opportunities
							</span>
						)}
					</Reveal>

					<Reveal delay={0.05}>
						<h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
							Hi, I&apos;m {first}{" "}
							<span className="font-serif font-normal italic text-gradient">{rest.join(" ")}</span>
						</h1>
					</Reveal>

					<Reveal delay={0.1}>
						<p className="mt-5 text-xl text-muted-foreground sm:text-2xl">
							<RoleRotator roles={profile.roles.length ? profile.roles : [profile.headline]} />
						</p>
					</Reveal>

					<Reveal delay={0.15}>
						<p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
							{profile.bio}
						</p>
					</Reveal>

					<Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-3">
						<Button asChild size="lg" className="h-12 rounded-full px-6 text-base shadow-lg shadow-primary/25">
							<Link href="#projects">
								View my work <ArrowDown className="size-4" />
							</Link>
						</Button>
						{profile.resumeUrl && (
							<Button asChild size="lg" variant="outline" className="h-12 rounded-full px-6 text-base">
								<a href={profile.resumeUrl} target="_blank" rel="noreferrer">
									<FileText className="size-4" /> Résumé <ArrowUpRight className="size-4 opacity-60" />
								</a>
							</Button>
						)}
					</Reveal>

					<Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
						<div className="flex items-center gap-1">
							{profile.socials.map((s) => (
								<a
									key={s.platform}
									href={s.url}
									target="_blank"
									rel="noreferrer"
									aria-label={SOCIAL_LABELS[s.platform] ?? s.platform}
									className="grid size-10 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
								>
									<SocialIcon platform={s.platform} className="size-4" />
								</a>
							))}
						</div>
						{profile.location && (
							<span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
								<MapPin className="size-4" /> {profile.location}
							</span>
						)}
					</Reveal>
				</div>

				<Reveal delay={0.15} y={40} className="relative mx-auto w-full max-w-sm lg:mr-0 lg:max-w-[440px]">
					<div className="relative">
						<div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-brand via-brand-2/60 to-transparent opacity-70 blur-sm" />
						<div className="relative overflow-hidden rounded-[2rem] border border-border bg-white">
							<Image
								src={profile.avatarUrl || "/images/dhruv-headshot.jpg"}
								alt={`Portrait of ${profile.name}`}
								width={1000}
								height={1000}
								priority
								sizes="(min-width: 1024px) 420px, 90vw"
								className="aspect-[4/5] w-full object-cover object-top"
							/>
							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-16 text-white">
								<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">Currently</p>
								<p className="mt-1 font-medium">{profile.headline}</p>
							</div>
						</div>
						{FLOATING_CHIPS.map((chip) => (
							<span
								key={chip.label}
								className={`glass absolute hidden rounded-full px-3 py-1.5 font-mono text-xs shadow-xl sm:block ${chip.className}`}
							>
								{chip.label}
							</span>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	);
}
