import HTTP_STATUS from "#constants/http-status.js";
import { Project } from "#models/Project.js";
import { createCrudService } from "#services/content/crud-service.js";
import { throwCustomError } from "#utils/index.js";

const base = createCrudService(Project, { label: "Project", defaultSort: { featured: -1, order: 1, createdAt: -1 } });

export const slugify = (text) =>
	String(text)
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80);

export const ProjectService = {
	...base,

	/** Public list: only published projects, optionally filtered. */
	async listPublic({ category, featured } = {}) {
		const filter = { published: true };
		if (category) filter.category = category;
		if (featured !== undefined) filter.featured = featured;
		return base.list(filter);
	},

	async findPublicBySlug(slug) {
		const doc = await Project.findOne({ slug, published: true }).lean();
		if (!doc) throwCustomError("Project not found", HTTP_STATUS.NOT_FOUND);
		return doc;
	},

	async create(data) {
		return base.create({ ...data, slug: data.slug || slugify(data.title) });
	},
};

export default ProjectService;
