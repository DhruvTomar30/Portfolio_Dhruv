import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<main className="relative grid min-h-dvh place-items-center overflow-hidden px-6 text-center">
			<div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
			<div>
				<p className="font-mono text-sm text-primary">404</p>
				<h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
					This page took a <span className="font-serif font-normal italic text-gradient">wrong turn</span>
				</h1>
				<p className="mt-4 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
				<Button asChild size="lg" className="mt-8 rounded-full">
					<Link href="/">Take me home</Link>
				</Button>
			</div>
		</main>
	);
}
