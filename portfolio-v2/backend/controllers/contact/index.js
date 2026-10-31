import HTTP_STATUS from "#constants/http-status.js";
import { ContactCreatedResponseDTO, ContactMessageResponseDTO } from "#dtos/contact/index.js";
import { ContactService } from "#services/contact/index.js";

export class ContactController {
	/** POST /contact — public. */
	static async submit({ reqBody, reqIP, reqHeaders }) {
		// eslint-disable-next-line no-unused-vars
		const { website, ...message } = reqBody; // drop the honeypot
		const doc = await ContactService.submit(message, { ip: reqIP, userAgent: reqHeaders["user-agent"] });
		return {
			status: HTTP_STATUS.CREATED,
			message: "Thanks! Your message has been sent. I'll get back to you soon.",
			data: ContactCreatedResponseDTO.create(doc),
		};
	}

	/** GET /contact — admin inbox. */
	static async list({ reqQuery }) {
		const result = await ContactService.list(reqQuery);
		return {
			status: HTTP_STATUS.OK,
			message: "Messages fetched",
			data: {
				items: ContactMessageResponseDTO.createList(result.items),
				pagination: {
					page: result.page,
					limit: result.limit,
					total: result.total,
					totalPages: result.totalPages,
				},
				unread: result.unread,
			},
		};
	}

	static async updateStatus({ reqParams, reqBody }) {
		const doc = await ContactService.updateStatus(reqParams.id, reqBody.status);
		return { status: HTTP_STATUS.OK, message: "Message updated", data: ContactMessageResponseDTO.create(doc) };
	}

	static async remove({ reqParams }) {
		await ContactService.remove(reqParams.id);
		return { status: HTTP_STATUS.OK, message: "Message deleted", data: { id: reqParams.id } };
	}
}
