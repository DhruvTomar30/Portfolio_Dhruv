import { ArrowUp } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { SOCIAL_LABELS, SocialIcon } from "@/components/icons/brand-icons";
import type { Profile } from "@/types/portfolio";

async function getYear() {
	"use cache";
	cacheLife("days");
	return new Date().getFullYear();
}

export async function Footer({ profile }: { profile: Profile }) {
	const year = await getYear();
	return (
		<footer className="relative border-t border-border">
			<div className="container-page flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
				<p className="text-sm text-muted-foreground">
					© {year} {profile.name}. Built with Next.js, Express &amp; MongoDB.
				</p>
				<div className="flex items-center gap-1">
					{profile.socials.map((s) => (
						<a
							key={s.platform}
							href={s.url}
							target="_blank"
							rel="noreferrer"
							aria-label={SOCIAL_LABELS[s.platform] ?? s.platform}
							className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
						>
							<SocialIcon platform={s.platform} className="size-4" />
						</a>
					))}
					<Link
						href="#top"
						aria-label="Back to top"
						className="ml-2 grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
					>
						<ArrowUp className="size-4" />
					</Link>
				</div>
			</div>
		</footer>
	);
}
