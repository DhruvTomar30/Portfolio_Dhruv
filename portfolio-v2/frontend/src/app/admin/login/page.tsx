"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseApiError } from "@/lib/api-error";
import { login } from "@/lib/services/auth";
import { useAuthStore } from "@/stores/auth-store";

const LoginSchema = z.object({
	email: z.email("Enter a valid email"),
	password: z.string().min(1, "Password is required"),
});
type LoginValues = z.infer<typeof LoginSchema>;

export default function AdminLoginPage() {
	const router = useRouter();
	const setSession = useAuthStore((s) => s.setSession);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginValues>({ resolver: zodResolver(LoginSchema), defaultValues: { email: "", password: "" } });

	const onSubmit = async ({ email, password }: LoginValues) => {
		try {
			const result = await login(email, password);
			setSession(result.token, result.user);
			toast.success("Welcome back!");
			router.replace("/admin");
		} catch (error) {
			toast.error(parseApiError(error, "Login failed.").message);
		}
	};

	return (
		<main className="grid min-h-dvh place-items-center px-4">
			<div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-xl">
				<div className="mb-6 flex flex-col items-center text-center">
					<span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
						<LockKeyhole className="size-5" />
					</span>
					<h1 className="mt-4 text-xl font-semibold">Admin sign in</h1>
					<p className="mt-1 text-sm text-muted-foreground">Manage messages and projects.</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" autoComplete="username" aria-invalid={!!errors.email} {...register("email")} />
						{errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							autoComplete="current-password"
							aria-invalid={!!errors.password}
							{...register("password")}
						/>
						{errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
					</div>
					<Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
						{isSubmitting && <Loader2 className="size-4 animate-spin" />} Sign in
					</Button>
				</form>
				<p className="mt-6 text-center text-sm text-muted-foreground">
					<Link href="/" className="hover:text-foreground">
						← Back to site
					</Link>
				</p>
			</div>
		</main>
	);
}
