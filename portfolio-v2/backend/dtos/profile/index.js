import { BaseDTO } from "#dtos/base-dto.js";

export class ProfileResponseDTO extends BaseDTO {
	constructor(doc) {
		super();
		this.name = doc.name;
		this.headline = doc.headline;
		this.roles = doc.roles ?? [];
		this.bio = doc.bio;
		this.avatarUrl = doc.avatarUrl;
		this.resumeUrl = doc.resumeUrl;
		this.email = doc.email;
		this.phone = doc.phone;
		this.location = doc.location;
		this.birthDate = doc.birthDate;
		this.qualification = doc.qualification;
		this.availableForWork = doc.availableForWork;
		this.socials = (doc.socials ?? []).map(({ platform, url }) => ({ platform, url }));
		this.expertise = (doc.expertise ?? []).map(({ title, description }) => ({ title, description }));
		this.stats = (doc.stats ?? []).map(({ label, value }) => ({ label, value }));
		this.updatedAt = BaseDTO.iso(doc.updatedAt);
	}

	static create(doc) {
		return doc ? new ProfileResponseDTO(doc).toObject() : null;
	}
}
