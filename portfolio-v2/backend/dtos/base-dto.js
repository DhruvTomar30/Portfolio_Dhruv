/** Base for all response DTOs: only the fields a DTO assigns are ever sent to the client. */
export class BaseDTO {
	toObject() {
		return Object.fromEntries(Object.entries(this).filter(([, value]) => value !== undefined));
	}

	/** Mongo `_id` (ObjectId) → plain string id. */
	static idOf(doc) {
		if (!doc) return undefined;
		return String(doc._id ?? doc.id);
	}

	static iso(date) {
		return date ? new Date(date).toISOString() : undefined;
	}
}

export default BaseDTO;
