"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getMe } from "@/lib/services/auth";
import { useAuthStore } from "@/stores/auth-store";

/**
 * Client-side gate for /admin pages (same approach as the CRM's RouteGuard).
 * The backend is the real security boundary — every admin API call is checked there.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { status, setUser, setStatus, logout, readToken } = useAuthStore();

	useEffect(() => {
		if (status === "authenticated") return;
		const token = readToken();
		if (!token) {
			setStatus("anonymous");
			router.replace("/admin/login");
			return;
		}
		setStatus("checking");
		getMe()
			.then(setUser)
			.catch(() => {
				logout();
				router.replace("/admin/login");
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const onUnauthorized = () => {
			logout();
			router.replace("/admin/login");
		};
		window.addEventListener("portfolio:unauthorized", onUnauthorized);
		return () => window.removeEventListener("portfolio:unauthorized", onUnauthorized);
	}, [logout, router]);

	if (status !== "authenticated") {
		return (
			<div className="grid min-h-dvh place-items-center">
				<Loader2 className="size-6 animate-spin text-muted-foreground" />
			</div>
		);
	}
	return <>{children}</>;
}
