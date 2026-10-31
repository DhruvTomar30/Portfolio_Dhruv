import { apiRequest } from "@/lib/apiReq";
import { unwrap } from "@/lib/services/unwrap";
import type { Project } from "@/types/portfolio";

export type ProjectPayload = Omit<Project, "id" | "slug" | "createdAt" | "updatedAt"> & { slug?: string };

export const getAllProjectsAdmin = async () =>
	unwrap<Project[]>(await apiRequest({ url: "/api/projects/admin/all" }), "Couldn't load projects.");

export const createProject = async (payload: ProjectPayload) =>
	unwrap<Project>(
		await apiRequest({ method: "POST", url: "/api/projects", data: payload }),
		"Couldn't create the project."
	);

export const updateProject = async (id: string, payload: Partial<ProjectPayload>) =>
	unwrap<Project>(
		await apiRequest({ method: "PUT", url: `/api/projects/id/${id}`, data: payload }),
		"Couldn't update the project."
	);

export const deleteProject = async (id: string) =>
	unwrap<{ id: string }>(
		await apiRequest({ method: "DELETE", url: `/api/projects/id/${id}` }),
		"Couldn't delete the project."
	);
