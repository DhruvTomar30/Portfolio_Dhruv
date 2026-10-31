import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { getPortfolioContent } from "@/lib/content";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
	const { profile } = await getPortfolioContent();
	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
			>
				Skip to content
			</a>
			<Navbar name={profile.name} />
			<main id="main">{children}</main>
			<Footer profile={profile} />
		</>
	);
}
