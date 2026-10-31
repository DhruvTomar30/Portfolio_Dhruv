"use client";

import { ExternalLink, Loader2, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { refreshPublicContent } from "@/actions/revalidate";
import { ProjectFormDialog } from "@/components/admin/project-form-dialog";
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
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { parseApiError } from "@/lib/api-error";
import { createProject, deleteProject, getAllProjectsAdmin, updateProject } from "@/lib/services/projects";
import type { ProjectFormValues } from "@/lib/validations/project";
import { useAuthStore } from "@/stores/auth-store";
import { PROJECT_CATEGORY_LABELS, type Project } from "@/types/portfolio";

const toPayload = (v: ProjectFormValues) => ({
	...v,
	techStack: v.techStack
		.split(",")
		.map((t) => t.trim())
		.filter(Boolean),
});

export function ProjectsView() {
	const readToken = useAuthStore((s) => s.readToken);
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editing, setEditing] = useState<Project | null>(null);

	const [reloadKey, setReloadKey] = useState(0);
	const load = () => setReloadKey((k) => k + 1);

	useEffect(() => {
		let cancelled = false;
		getAllProjectsAdmin()
			.then((data) => {
				if (!cancelled) setProjects(data);
			})
			.catch((error) => {
				if (!cancelled) toast.error(parseApiError(error, "Couldn't load projects.").message);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, [reloadKey]);

	/** Refresh the cached public pages so edits show up immediately. */
	const publish = async () => {
		const token = readToken();
		if (token) await refreshPublicContent(token);
	};

	const handleSubmit = async (values: ProjectFormValues) => {
		try {
			if (editing) await updateProject(editing.id, toPayload(values));
			else await createProject(toPayload(values));
			toast.success(editing ? "Project updated" : "Project created");
			setDialogOpen(false);
			load();
			await publish();
		} catch (error) {
			const { message, fields } = parseApiError(error);
			toast.error(message);
			return fields;
		}
	};

	const quickToggle = async (project: Project, patch: Partial<Pick<Project, "featured" | "published">>) => {
		setProjects((list) => list.map((p) => (p.id === project.id ? { ...p, ...patch } : p)));
		try {
			await updateProject(project.id, patch);
			await publish();
		} catch (error) {
			toast.error(parseApiError(error).message);
			load();
		}
	};

	const remove = async (project: Project) => {
		try {
			await deleteProject(project.id);
			toast.success(`Deleted ${project.title}`);
			load();
			await publish();
		} catch (error) {
			toast.error(parseApiError(error).message);
		}
	};

	return (
		<div>
			<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
					<p className="text-sm text-muted-foreground">{projects.length} projects</p>
				</div>
				<Button
					className="rounded-full"
					onClick={() => {
						setEditing(null);
						setDialogOpen(true);
					}}
				>
					<Plus className="size-4" /> New project
				</Button>
			</div>

			{loading ? (
				<div className="grid h-64 place-items-center">
					<Loader2 className="size-6 animate-spin text-muted-foreground" />
				</div>
			) : (
				<div className="overflow-hidden rounded-2xl border border-border bg-card">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-12">#</TableHead>
								<TableHead>Project</TableHead>
								<TableHead className="hidden md:table-cell">Category</TableHead>
								<TableHead className="text-center">Featured</TableHead>
								<TableHead className="text-center">Published</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{projects.map((p) => (
								<TableRow key={p.id}>
									<TableCell className="font-mono text-xs text-muted-foreground">{p.order}</TableCell>
									<TableCell>
										<div className="flex items-center gap-2 font-medium">
											{p.featured && <Star className="size-3.5 fill-primary text-primary" />}
											{p.title}
										</div>
										<p className="max-w-xs truncate text-xs text-muted-foreground">{p.techStack.join(", ")}</p>
									</TableCell>
									<TableCell className="hidden md:table-cell">
										<Badge variant="secondary">{PROJECT_CATEGORY_LABELS[p.category]}</Badge>
									</TableCell>
									<TableCell className="text-center">
										<Switch
											checked={p.featured}
											onCheckedChange={(featured) => quickToggle(p, { featured })}
											aria-label={`Feature ${p.title}`}
										/>
									</TableCell>
									<TableCell className="text-center">
										<Switch
											checked={p.published ?? true}
											onCheckedChange={(published) => quickToggle(p, { published })}
											aria-label={`Publish ${p.title}`}
										/>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-1">
											{p.liveUrl && (
												<Button asChild variant="ghost" size="icon" aria-label="Open live site">
													<a href={p.liveUrl} target="_blank" rel="noreferrer">
														<ExternalLink className="size-4" />
													</a>
												</Button>
											)}
											<Button
												variant="ghost"
												size="icon"
												aria-label={`Edit ${p.title}`}
												onClick={() => {
													setEditing(p);
													setDialogOpen(true);
												}}
											>
												<Pencil className="size-4" />
											</Button>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button variant="ghost" size="icon" aria-label={`Delete ${p.title}`} className="text-destructive">
														<Trash2 className="size-4" />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>Delete {p.title}?</AlertDialogTitle>
														<AlertDialogDescription>
															This removes the project from the database and the public site.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction onClick={() => remove(p)}>Delete</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}

			<ProjectFormDialog open={dialogOpen} onOpenChange={setDialogOpen} project={editing} onSubmit={handleSubmit} />
		</div>
	);
}
