"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<main className="grid min-h-dvh place-items-center px-6 text-center">
			<div>
				<p className="font-mono text-sm text-primary">Something broke</p>
				<h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">An unexpected error occurred</h1>
				<p className="mt-4 text-muted-foreground">Please try again — if it keeps happening, let me know.</p>
				<Button size="lg" className="mt-8 rounded-full" onClick={() => reset()}>
					Try again
				</Button>
			</div>
		</main>
	);
}
