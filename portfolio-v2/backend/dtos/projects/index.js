import { BaseDTO } from "#dtos/base-dto.js";

export class ProjectResponseDTO extends BaseDTO {
	constructor(doc, { includeAdminFields = false } = {}) {
		super();
		this.id = BaseDTO.idOf(doc);
		this.title = doc.title;
		this.slug = doc.slug;
		this.description = doc.description;
		this.category = doc.category;
		this.techStack = doc.techStack ?? [];
		this.imageUrl = doc.imageUrl;
		this.liveUrl = doc.liveUrl;
		this.repoUrl = doc.repoUrl;
		this.featured = doc.featured;
		this.order = doc.order;
		if (includeAdminFields) {
			this.published = doc.published;
			this.createdAt = BaseDTO.iso(doc.createdAt);
			this.updatedAt = BaseDTO.iso(doc.updatedAt);
		}
	}

	static create(doc, options) {
		return new ProjectResponseDTO(doc, options).toObject();
	}

	static createList(docs, options) {
		return docs.map((doc) => ProjectResponseDTO.create(doc, options));
	}
}
