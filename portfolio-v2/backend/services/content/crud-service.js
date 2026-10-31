import HTTP_STATUS from "#constants/http-status.js";
import { throwCustomError } from "#utils/index.js";

/**
 * Generic list/create/update/delete for simple ordered content collections
 * (skills, experience, education, certificates). Domain services extend this.
 */
export const createCrudService = (Model, { label, defaultSort = { order: 1, createdAt: -1 } }) => ({
	async list(filter = {}) {
		return Model.find(filter).sort(defaultSort).lean();
	},

	async findById(id) {
		const doc = await Model.findById(id).lean();
		if (!doc) throwCustomError(`${label} not found`, HTTP_STATUS.NOT_FOUND);
		return doc;
	},

	async create(data) {
		const doc = await Model.create(data);
		return doc.toObject();
	},

	async update(id, data) {
		const doc = await Model.findByIdAndUpdate(id, { $set: data }, { returnDocument: "after", runValidators: true }).lean();
		if (!doc) throwCustomError(`${label} not found`, HTTP_STATUS.NOT_FOUND);
		return doc;
	},

	async remove(id) {
		const doc = await Model.findByIdAndDelete(id).lean();
		if (!doc) throwCustomError(`${label} not found`, HTTP_STATUS.NOT_FOUND);
		return doc;
	},
});
