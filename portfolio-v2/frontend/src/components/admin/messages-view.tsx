"use client";

import { Archive, Inbox, Loader2, Mail, MailOpen, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseApiError } from "@/lib/api-error";
import { deleteMessage, getMessages, updateMessageStatus } from "@/lib/services/messages";
import { cn } from "@/lib/utils";
import type { ContactInbox, ContactMessage, ContactStatus } from "@/types/api";

type Filter = "all" | ContactStatus;

const formatDate = (iso: string) =>
	new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));

export function MessagesView() {
	const [filter, setFilter] = useState<Filter>("all");
	const [page, setPage] = useState(1);
	const [inbox, setInbox] = useState<ContactInbox | null>(null);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState<ContactMessage | null>(null);

	const [reloadKey, setReloadKey] = useState(0);
	const reload = () => {
		setLoading(true);
		setReloadKey((k) => k + 1);
	};

	useEffect(() => {
		let cancelled = false;
		getMessages({ status: filter === "all" ? undefined : filter, page, limit: 20 })
			.then((data) => {
				if (cancelled) return;
				setInbox(data);
				setSelected((current) => data.items.find((m) => m.id === current?.id) ?? data.items[0] ?? null);
			})
			.catch((error) => {
				if (!cancelled) toast.error(parseApiError(error, "Couldn't load messages.").message);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, [filter, page, reloadKey]);

	const setStatus = async (message: ContactMessage, status: ContactStatus) => {
		try {
			await updateMessageStatus(message.id, status);
			reload();
		} catch (error) {
			toast.error(parseApiError(error).message);
		}
	};

	const open = (message: ContactMessage) => {
		setSelected(message);
		if (message.status === "new") setStatus(message, "read");
	};

	const remove = async (message: ContactMessage) => {
		try {
			await deleteMessage(message.id);
			toast.success("Message deleted");
			setSelected(null);
			reload();
		} catch (error) {
			toast.error(parseApiError(error).message);
		}
	};

	return (
		<div>
			<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
					<p className="text-sm text-muted-foreground">
						{inbox ? `${inbox.pagination.total} total · ${inbox.unread} unread` : "Loading…"}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Tabs
						value={filter}
						onValueChange={(v) => {
							setFilter(v as Filter);
							setPage(1);
							setLoading(true);
						}}
					>
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="new">New</TabsTrigger>
							<TabsTrigger value="read">Read</TabsTrigger>
							<TabsTrigger value="archived">Archived</TabsTrigger>
						</TabsList>
					</Tabs>
					<Button variant="outline" size="icon" onClick={reload} aria-label="Refresh">
						<RefreshCw className={cn("size-4", loading && "animate-spin")} />
					</Button>
				</div>
			</div>

			{loading && !inbox ? (
				<div className="grid h-64 place-items-center">
					<Loader2 className="size-6 animate-spin text-muted-foreground" />
				</div>
			) : !inbox?.items.length ? (
				<div className="grid h-64 place-items-center rounded-2xl border border-dashed border-border text-center">
					<div>
						<Inbox className="mx-auto size-8 text-muted-foreground" />
						<p className="mt-3 text-sm text-muted-foreground">No messages here yet.</p>
					</div>
				</div>
			) : (
				<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
					<ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
						{inbox.items.map((m) => (
							<li key={m.id}>
								<button
									onClick={() => open(m)}
									className={cn(
										"flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-accent/50",
										selected?.id === m.id && "bg-accent"
									)}
								>
									<div className="flex items-center gap-2">
										{m.status === "new" && <span className="size-2 rounded-full bg-primary" />}
										<span className={cn("truncate", m.status === "new" && "font-semibold")}>{m.name}</span>
										<span className="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground">
											{formatDate(m.createdAt)}
										</span>
									</div>
									<p className="truncate text-sm text-muted-foreground">{m.subject || m.message}</p>
								</button>
							</li>
						))}
						{inbox.pagination.totalPages > 1 && (
							<li className="flex items-center justify-between px-4 py-2 text-sm">
								<Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => {
										setLoading(true);
										setPage((p) => p - 1);
									}}>
									Previous
								</Button>
								<span className="text-muted-foreground">
									{page} / {inbox.pagination.totalPages}
								</span>
								<Button
									variant="ghost"
									size="sm"
									disabled={page >= inbox.pagination.totalPages}
									onClick={() => {
										setLoading(true);
										setPage((p) => p + 1);
									}}
								>
									Next
								</Button>
							</li>
						)}
					</ul>

					{selected && (
						<article className="rounded-2xl border border-border bg-card p-6">
							<div className="flex flex-wrap items-start justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold">{selected.subject || "No subject"}</h2>
									<p className="text-sm text-muted-foreground">
										{selected.name} ·{" "}
										<a href={`mailto:${selected.email}`} className="text-primary hover:underline">
											{selected.email}
										</a>
									</p>
									<p className="mt-1 font-mono text-xs text-muted-foreground">{formatDate(selected.createdAt)}</p>
								</div>
								<div className="flex gap-1.5">
									<Badge variant={selected.status === "new" ? "default" : "secondary"} className="capitalize">
										{selected.status}
									</Badge>
									{!selected.emailDelivered && (
										<Badge variant="outline" title="SMTP not configured or delivery failed">
											not emailed
										</Badge>
									)}
								</div>
							</div>
							<p className="mt-6 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
							<div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-4">
								<Button asChild size="sm" className="rounded-full">
									<a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject || "Your message"}`)}`}>
										<Mail className="size-4" /> Reply
									</a>
								</Button>
								{selected.status !== "new" ? (
									<Button size="sm" variant="outline" className="rounded-full" onClick={() => setStatus(selected, "new")}>
										<MailOpen className="size-4" /> Mark unread
									</Button>
								) : null}
								{selected.status !== "archived" && (
									<Button size="sm" variant="outline" className="rounded-full" onClick={() => setStatus(selected, "archived")}>
										<Archive className="size-4" /> Archive
									</Button>
								)}
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button size="sm" variant="ghost" className="ml-auto rounded-full text-destructive">
											<Trash2 className="size-4" /> Delete
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Delete this message?</AlertDialogTitle>
											<AlertDialogDescription>
												The message from {selected.name} will be permanently removed.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction onClick={() => remove(selected)}>Delete</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</article>
					)}
				</div>
			)}
		</div>
	);
}
