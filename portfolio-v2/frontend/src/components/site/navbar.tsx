"use client";

import { Menu } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/components/site/nav-links";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function useActiveSection(enabled: boolean) {
	const [active, setActive] = useState<string>("");
	useEffect(() => {
		if (!enabled) return;
		const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(
			(el): el is HTMLElement => Boolean(el)
		);
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
		);
		sections.forEach((s) => observer.observe(s));
		return () => observer.disconnect();
	}, [enabled]);
	return enabled ? active : "";
}

export function Navbar({ name }: { name: string }) {
	const pathname = usePathname();
	const onHome = pathname === "/";
	const active = useActiveSection(onHome);
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const { scrollY } = useScroll();
	useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

	const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);
	const firstName = name.split(" ")[0];

	return (
		<header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-5 lg:px-8">
			<motion.nav
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className={cn(
					"flex w-full max-w-[86rem] items-center justify-between rounded-full border px-3 py-2 transition-all duration-300",
					scrolled
						? "border-border bg-background/70 shadow-lg shadow-black/5 backdrop-blur-xl"
						: "border-transparent bg-transparent"
				)}
				aria-label="Main"
			>
				<Link href="/" className="group flex items-center gap-2 rounded-full px-2 py-1" aria-label="Home">
					<span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 font-mono text-sm font-bold text-white shadow-md shadow-brand/30 transition-transform group-hover:rotate-12">
						{firstName[0]}
					</span>
					<span className="font-semibold tracking-tight">
						{firstName}
						<span className="text-primary">.</span>
					</span>
				</Link>

				<ul className="hidden items-center gap-1 md:flex">
					{NAV_LINKS.map(({ id, label }) => (
						<li key={id}>
							<Link
								href={hrefFor(id)}
								className={cn(
									"relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
									active === id && "text-foreground"
								)}
							>
								{active === id && (
									<motion.span
										layoutId="nav-active"
										className="absolute inset-0 -z-10 rounded-full bg-accent"
										transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
									/>
								)}
								{label}
							</Link>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-1">
					<ThemeToggle />
					<Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
						<Link href={hrefFor("contact")}>Hire me</Link>
					</Button>
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-label="Open menu">
								<Menu className="size-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-72">
							<SheetHeader>
								<SheetTitle className="text-left">Menu</SheetTitle>
							</SheetHeader>
							<ul className="flex flex-col gap-1 px-4">
								{NAV_LINKS.map(({ id, label }) => (
									<li key={id}>
										<Link
											href={hrefFor(id)}
											onClick={() => setOpen(false)}
											className="block rounded-lg px-3 py-3 text-lg font-medium transition-colors hover:bg-accent"
										>
											{label}
										</Link>
									</li>
								))}
								<li>
									<Link
										href="/projects"
										onClick={() => setOpen(false)}
										className="block rounded-lg px-3 py-3 text-lg font-medium transition-colors hover:bg-accent"
									>
										All projects
									</Link>
								</li>
							</ul>
						</SheetContent>
					</Sheet>
				</div>
			</motion.nav>
		</header>
	);
}
