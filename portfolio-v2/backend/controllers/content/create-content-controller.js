import HTTP_STATUS from "#constants/http-status.js";

/**
 * Builds the standard list/create/update/remove controller set for a simple content domain.
 * Each method gets plain data from Utils.wrapController and returns { status, message, data }.
 */
export const createContentController = ({ service, dto, label, plural }) => ({
	async list() {
		const docs = await service.list();
		return { status: HTTP_STATUS.OK, message: `${plural} fetched`, data: dto.createList(docs) };
	},

	async create({ reqBody }) {
		const doc = await service.create(reqBody);
		return { status: HTTP_STATUS.CREATED, message: `${label} created`, data: dto.create(doc) };
	},

	async update({ reqParams, reqBody }) {
		const doc = await service.update(reqParams.id, reqBody);
		return { status: HTTP_STATUS.OK, message: `${label} updated`, data: dto.create(doc) };
	},

	async remove({ reqParams }) {
		await service.remove(reqParams.id);
		return { status: HTTP_STATUS.OK, message: `${label} deleted`, data: { id: reqParams.id } };
	},
});
