import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { SOCIAL_LABELS, SocialIcon } from "@/components/icons/brand-icons";
import { Reveal } from "@/components/shared/reveal";
import { Accent, Section } from "@/components/shared/section";
import { ContactForm } from "@/components/sections/contact-form";
import type { Profile } from "@/types/portfolio";

export function Contact({ profile }: { profile: Profile }) {
	const channels = [
		{ icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
		{ icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
		{
			icon: MapPin,
			label: "Location",
			value: profile.location,
			href: `https://maps.google.com/?q=${encodeURIComponent(profile.location)}`,
		},
	].filter((c) => c.value);

	return (
		<Section
			id="contact"
			eyebrow="Contact"
			title={
				<>
					Let&apos;s build something <Accent>together</Accent>
				</>
			}
			description="Have a project in mind, a role to fill, or just want to say hi? My inbox is always open."
		>
			<div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
				<Reveal className="space-y-3">
					{channels.map(({ icon: Icon, label, value, href }) => (
						<a
							key={label}
							href={href}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel="noreferrer"
							className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
						>
							<span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
								<Icon className="size-5" />
							</span>
							<span className="min-w-0 flex-1">
								<span className="block text-xs text-muted-foreground">{label}</span>
								<span className="block truncate font-medium">{value}</span>
							</span>
							<ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
						</a>
					))}

					<div className="rounded-2xl border border-border bg-card p-5">
						<p className="text-xs text-muted-foreground">Find me online</p>
						<div className="mt-3 flex flex-wrap gap-2">
							{profile.socials.map((s) => (
								<a
									key={s.platform}
									href={s.url}
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
								>
									<SocialIcon platform={s.platform} className="size-3.5" />
									{SOCIAL_LABELS[s.platform] ?? s.platform}
								</a>
							))}
						</div>
					</div>
				</Reveal>

				<Reveal delay={0.08}>
					<ContactForm />
				</Reveal>
			</div>
		</Section>
	);
}
