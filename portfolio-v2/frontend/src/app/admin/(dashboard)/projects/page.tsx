import { ProjectsView } from "@/components/admin/projects-view";

// Auth-gated client view: it can't render before the token is checked, so skip instant-navigation validation.
export const instant = false;

export default function AdminProjectsPage() {
	return <ProjectsView />;
}
