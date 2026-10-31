"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { projectFormSchema, type ProjectFormValues } from "@/lib/validations/project";
import { PROJECT_CATEGORIES, PROJECT_CATEGORY_LABELS, type Project } from "@/types/portfolio";

const EMPTY: ProjectFormValues = {
	title: "",
	description: "",
	category: "mern",
	techStack: "",
	imageUrl: "",
	liveUrl: "",
	repoUrl: "",
	featured: false,
	published: true,
	order: 0,
};

const toFormValues = (p: Project): ProjectFormValues => ({
	title: p.title,
	description: p.description,
	category: p.category,
	techStack: p.techStack.join(", "),
	imageUrl: p.imageUrl,
	liveUrl: p.liveUrl,
	repoUrl: p.repoUrl,
	featured: p.featured,
	published: p.published ?? true,
	order: p.order,
});

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	project: Project | null;
	onSubmit: (values: ProjectFormValues) => Promise<Record<string, string> | void>;
}

export function ProjectFormDialog({ open, onOpenChange, project, onSubmit }: Props) {
	const {
		register,
		control,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<ProjectFormValues>({ resolver: zodResolver(projectFormSchema), defaultValues: EMPTY });

	useEffect(() => {
		if (open) reset(project ? toFormValues(project) : EMPTY);
	}, [open, project, reset]);

	const submit = async (values: ProjectFormValues) => {
		const fieldErrors = await onSubmit(values);
		if (fieldErrors) {
			Object.entries(fieldErrors).forEach(([field, message]) => {
				if (field in EMPTY) setError(field as keyof ProjectFormValues, { message });
			});
		}
	};

	const err = (name: keyof ProjectFormValues) =>
		errors[name]?.message ? <p className="text-sm text-destructive">{errors[name]?.message}</p> : null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>{project ? "Edit project" : "New project"}</DialogTitle>
					<DialogDescription>Changes appear on the public site right after saving.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
					<div className="grid gap-4 sm:grid-cols-[1fr_180px]">
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input id="title" {...register("title")} />
							{err("title")}
						</div>
						<div className="space-y-2">
							<Label>Category</Label>
							<Controller
								control={control}
								name="category"
								render={({ field }) => (
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className="w-full">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{PROJECT_CATEGORIES.map((c) => (
												<SelectItem key={c} value={c}>
													{PROJECT_CATEGORY_LABELS[c]}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea id="description" rows={3} {...register("description")} />
						{err("description")}
					</div>
					<div className="space-y-2">
						<Label htmlFor="techStack">Tech stack (comma-separated)</Label>
						<Input id="techStack" placeholder="React, Node.js, MongoDB" {...register("techStack")} />
						{err("techStack")}
					</div>
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="liveUrl">Live URL</Label>
							<Input id="liveUrl" placeholder="https://…" {...register("liveUrl")} />
							{err("liveUrl")}
						</div>
						<div className="space-y-2">
							<Label htmlFor="repoUrl">Repository URL</Label>
							<Input id="repoUrl" placeholder="https://github.com/…" {...register("repoUrl")} />
							{err("repoUrl")}
						</div>
					</div>
					<div className="grid gap-4 sm:grid-cols-[1fr_120px]">
						<div className="space-y-2">
							<Label htmlFor="imageUrl">Image URL or /images/… path</Label>
							<Input id="imageUrl" placeholder="/images/projects/my-app.png" {...register("imageUrl")} />
							{err("imageUrl")}
						</div>
						<div className="space-y-2">
							<Label htmlFor="order">Order</Label>
							<Input id="order" type="number" min={0} {...register("order", { valueAsNumber: true })} />
							{err("order")}
						</div>
					</div>
					<div className="flex flex-wrap gap-6 pt-2">
						<Controller
							control={control}
							name="featured"
							render={({ field }) => (
								<label className="flex items-center gap-2 text-sm">
									<Switch checked={field.value} onCheckedChange={field.onChange} /> Featured on home page
								</label>
							)}
						/>
						<Controller
							control={control}
							name="published"
							render={({ field }) => (
								<label className="flex items-center gap-2 text-sm">
									<Switch checked={field.value} onCheckedChange={field.onChange} /> Published
								</label>
							)}
						/>
					</div>
					<DialogFooter className="pt-2">
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting && <Loader2 className="size-4 animate-spin" />}
							{project ? "Save changes" : "Create project"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
