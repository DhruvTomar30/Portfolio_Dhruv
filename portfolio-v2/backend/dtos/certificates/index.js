import { BaseDTO } from "#dtos/base-dto.js";

export class CertificateResponseDTO extends BaseDTO {
	constructor(doc) {
		super();
		this.id = BaseDTO.idOf(doc);
		this.title = doc.title;
		this.issuer = doc.issuer;
		this.description = doc.description;
		this.imageUrl = doc.imageUrl;
		this.url = doc.url;
		this.issuedOn = doc.issuedOn;
		this.order = doc.order;
	}

	static create(doc) {
		return new CertificateResponseDTO(doc).toObject();
	}

	static createList(docs) {
		return docs.map(CertificateResponseDTO.create);
	}
}
