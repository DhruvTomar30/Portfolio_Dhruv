import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
	variable: "--font-instrument-serif",
	subsets: ["latin"],
	weight: "400",
	style: ["normal", "italic"],
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: { default: siteConfig.title, template: "%s · Dhruv Tomar" },
	description: siteConfig.description,
	keywords: [
		"Dhruv Tomar",
		"Full Stack Developer",
		"MERN Stack Developer",
		"Next.js Developer",
		"React Developer",
		"Node.js",
		"Delhi",
		"Portfolio",
	],
	authors: [{ name: "Dhruv Tomar", url: siteConfig.url }],
	creator: "Dhruv Tomar",
	openGraph: {
		type: "website",
		locale: "en_IN",
		url: siteConfig.url,
		siteName: "Dhruv Tomar",
		title: siteConfig.title,
		description: siteConfig.description,
	},
	twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
	alternates: { canonical: "/" },
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
		{ media: "(prefers-color-scheme: dark)", color: "#09090b" },
	],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
		>
			<body className="min-h-dvh">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					storageKey="dhruv-portfolio-theme"
					disableTransitionOnChange
				>
					<TooltipProvider delayDuration={150}>
						{children}
						<Toaster richColors position="bottom-right" />
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
