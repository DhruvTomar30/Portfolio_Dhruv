import { BaseDTO } from "#dtos/base-dto.js";

/** Returned to the public visitor: only confirms receipt, never echoes the full message back. */
export class ContactCreatedResponseDTO extends BaseDTO {
	constructor(doc) {
		super();
		this.id = BaseDTO.idOf(doc);
		this.name = doc.name;
		this.createdAt = BaseDTO.iso(doc.createdAt);
	}

	static create(doc) {
		return new ContactCreatedResponseDTO(doc).toObject();
	}
}

/** Admin inbox view. ip/userAgent stay server-side. */
export class ContactMessageResponseDTO extends BaseDTO {
	constructor(doc) {
		super();
		this.id = BaseDTO.idOf(doc);
		this.name = doc.name;
		this.email = doc.email;
		this.subject = doc.subject;
		this.message = doc.message;
		this.status = doc.status;
		this.emailDelivered = doc.emailDelivered;
		this.createdAt = BaseDTO.iso(doc.createdAt);
	}

	static create(doc) {
		return new ContactMessageResponseDTO(doc).toObject();
	}

	static createList(docs) {
		return docs.map(ContactMessageResponseDTO.create);
	}
}
