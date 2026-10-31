"use client";

import { ExternalLink, FolderKanban, Inbox, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminGuard } from "@/components/admin/admin-guard";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

const NAV = [
	{ href: "/admin", label: "Messages", icon: Inbox },
	{ href: "/admin/projects", label: "Projects", icon: FolderKanban },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const { user, logout } = useAuthStore();

	return (
		<AdminGuard>
			<header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
				<div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
					<Link href="/admin" className="font-semibold tracking-tight">
						Admin<span className="text-primary">.</span>
					</Link>
					<nav className="flex items-center gap-1">
						{NAV.map(({ href, label, icon: Icon }) => (
							<Link
								key={href}
								href={href}
								className={cn(
									"inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
									pathname === href && "bg-accent text-foreground"
								)}
							>
								<Icon className="size-4" /> <span className="hidden sm:inline">{label}</span>
							</Link>
						))}
					</nav>
					<div className="ml-auto flex items-center gap-1">
						<span className="mr-2 hidden text-sm text-muted-foreground md:inline">{user?.email}</span>
						<Button asChild variant="ghost" size="icon" className="rounded-full" aria-label="View site">
							<Link href="/" target="_blank">
								<ExternalLink className="size-4" />
							</Link>
						</Button>
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full"
							aria-label="Log out"
							onClick={() => {
								logout();
								router.replace("/admin/login");
							}}
						>
							<LogOut className="size-4" />
						</Button>
					</div>
				</div>
			</header>
			<main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
		</AdminGuard>
	);
}
