import { BaseDTO } from "#dtos/base-dto.js";

export class SkillResponseDTO extends BaseDTO {
	constructor(doc) {
		super();
		this.id = BaseDTO.idOf(doc);
		this.name = doc.name;
		this.group = doc.group;
		this.iconUrl = doc.iconUrl;
		this.order = doc.order;
	}

	static create(doc) {
		return new SkillResponseDTO(doc).toObject();
	}

	static createList(docs) {
		return docs.map(SkillResponseDTO.create);
	}
}
