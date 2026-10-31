import HTTP_STATUS from "#constants/http-status.js";
import { ProjectResponseDTO } from "#dtos/projects/index.js";
import { ProjectService } from "#services/projects/index.js";

const ADMIN = { includeAdminFields: true };

export class ProjectsController {
	/** GET /projects — public, published only. */
	static async list({ reqQuery }) {
		const projects = await ProjectService.listPublic(reqQuery);
		return { status: HTTP_STATUS.OK, message: "Projects fetched", data: ProjectResponseDTO.createList(projects) };
	}

	/** GET /projects/:slug — public. */
	static async getBySlug({ reqParams }) {
		const project = await ProjectService.findPublicBySlug(reqParams.slug);
		return { status: HTTP_STATUS.OK, message: "Project fetched", data: ProjectResponseDTO.create(project) };
	}

	/** GET /projects/admin/all — admin, includes drafts. */
	static async listAll() {
		const projects = await ProjectService.list();
		return {
			status: HTTP_STATUS.OK,
			message: "Projects fetched",
			data: ProjectResponseDTO.createList(projects, ADMIN),
		};
	}

	static async create({ reqBody }) {
		const project = await ProjectService.create(reqBody);
		return { status: HTTP_STATUS.CREATED, message: "Project created", data: ProjectResponseDTO.create(project, ADMIN) };
	}

	static async update({ reqParams, reqBody }) {
		const project = await ProjectService.update(reqParams.id, reqBody);
		return { status: HTTP_STATUS.OK, message: "Project updated", data: ProjectResponseDTO.create(project, ADMIN) };
	}

	static async remove({ reqParams }) {
		await ProjectService.remove(reqParams.id);
		return { status: HTTP_STATUS.OK, message: "Project deleted", data: { id: reqParams.id } };
	}
}
