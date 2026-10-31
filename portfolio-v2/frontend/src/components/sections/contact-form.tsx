"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { parseApiError } from "@/lib/api-error";
import { submitContactMessage } from "@/lib/services/contact";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

const DEFAULTS: ContactFormValues = { name: "", email: "", subject: "", message: "", website: "" };

export function ContactForm() {
	const [sent, setSent] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		reset,
		setError,
		control,
		formState: { errors, isSubmitting },
	} = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema), defaultValues: DEFAULTS });

	const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

	const onSubmit = async (values: ContactFormValues) => {
		try {
			const result = await submitContactMessage(values);
			reset(DEFAULTS);
			setSent(values.name.split(" ")[0]);
			toast.success(result.message);
		} catch (error) {
			const { message, fields } = parseApiError(error, "Couldn't send your message.");
			Object.entries(fields).forEach(([field, msg]) => {
				if (field in DEFAULTS) setError(field as keyof ContactFormValues, { message: msg });
			});
			toast.error(message);
		}
	};

	return (
		<div className="relative rounded-3xl border border-border bg-card p-5 sm:p-6">
			<AnimatePresence mode="wait">
				{sent ? (
					<motion.div
						key="sent"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						className="flex min-h-[360px] flex-col items-center justify-center text-center"
					>
						<CheckCircle2 className="size-14 text-success" />
						<h3 className="mt-5 text-2xl font-semibold">Thanks, {sent}!</h3>
						<p className="mt-2 max-w-sm text-muted-foreground">
							Your message is in my inbox. I usually reply within a day or two.
						</p>
						<Button variant="outline" className="mt-6 rounded-full" onClick={() => setSent(null)}>
							Send another message
						</Button>
					</motion.div>
				) : (
					<motion.form
						key="form"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						className="space-y-4"
					>
						<div className="grid gap-5 sm:grid-cols-2">
							<Field label="Your name" error={errors.name?.message} htmlFor="name">
								<Input id="name" autoComplete="name" placeholder="Jane Doe" aria-invalid={!!errors.name} {...register("name")} />
							</Field>
							<Field label="Email" error={errors.email?.message} htmlFor="email">
								<Input
									id="email"
									type="email"
									autoComplete="email"
									placeholder="jane@company.com"
									aria-invalid={!!errors.email}
									{...register("email")}
								/>
							</Field>
						</div>
						<Field label="Subject" optional error={errors.subject?.message} htmlFor="subject">
							<Input id="subject" placeholder="Project enquiry, job opportunity…" {...register("subject")} />
						</Field>
						<Field label="Message" error={errors.message?.message} htmlFor="message" hint={`${messageLength}/2000`}>
							<Textarea
								id="message"
								rows={5}
								placeholder="Tell me a little about what you're building…"
								aria-invalid={!!errors.message}
								className="resize-none"
								{...register("message")}
							/>
						</Field>

						{/* Honeypot — hidden from humans, bots fill it in */}
						<div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
							<label htmlFor="website">Website</label>
							<input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
						</div>

						<Button type="submit" size="lg" disabled={isSubmitting} className="h-11 w-full rounded-full">
							{isSubmitting ? (
								<>
									<Loader2 className="size-4 animate-spin" /> Sending…
								</>
							) : (
								<>
									Send message <Send className="size-4" />
								</>
							)}
						</Button>
					</motion.form>
				)}
			</AnimatePresence>
		</div>
	);
}

function Field({
	label,
	htmlFor,
	error,
	hint,
	optional,
	children,
}: {
	label: string;
	htmlFor: string;
	error?: string;
	hint?: string;
	optional?: boolean;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<Label htmlFor={htmlFor} className={cn(error && "text-destructive")}>
					{label}
					{optional && <span className="font-normal text-muted-foreground">(optional)</span>}
				</Label>
				{hint && <span className="font-mono text-xs text-muted-foreground">{hint}</span>}
			</div>
			{children}
			{error && (
				<p role="alert" className="text-sm text-destructive">
					{error}
				</p>
			)}
		</div>
	);
}
