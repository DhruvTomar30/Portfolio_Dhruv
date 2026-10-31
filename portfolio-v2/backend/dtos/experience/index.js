import { BaseDTO } from "#dtos/base-dto.js";

export class ExperienceResponseDTO extends BaseDTO {
	constructor(doc) {
		super();
		this.id = BaseDTO.idOf(doc);
		this.role = doc.role;
		this.company = doc.company;
		this.companyUrl = doc.companyUrl;
		this.employmentType = doc.employmentType;
		this.location = doc.location;
		this.startDate = doc.startDate;
		this.endDate = doc.endDate || null;
		this.summary = doc.summary;
		this.highlights = doc.highlights ?? [];
		this.techStack = doc.techStack ?? [];
		this.order = doc.order;
	}

	static create(doc) {
		return new ExperienceResponseDTO(doc).toObject();
	}

	static createList(docs) {
		return docs.map(ExperienceResponseDTO.create);
	}
}
