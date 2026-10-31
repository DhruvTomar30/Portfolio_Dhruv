import { BaseDTO } from "#dtos/base-dto.js";

export class EducationResponseDTO extends BaseDTO {
	constructor(doc) {
		super();
		this.id = BaseDTO.idOf(doc);
		this.degree = doc.degree;
		this.institution = doc.institution;
		this.location = doc.location;
		this.startYear = doc.startYear;
		this.endYear = doc.endYear || null;
		this.description = doc.description;
		this.order = doc.order;
	}

	static create(doc) {
		return new EducationResponseDTO(doc).toObject();
	}

	static createList(docs) {
		return docs.map(EducationResponseDTO.create);
	}
}
