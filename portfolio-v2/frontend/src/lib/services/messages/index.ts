import { apiRequest } from "@/lib/apiReq";
import { unwrap } from "@/lib/services/unwrap";
import type { ContactInbox, ContactMessage, ContactStatus } from "@/types/api";

export const getMessages = async (params: { status?: ContactStatus; page?: number; limit?: number } = {}) =>
	unwrap<ContactInbox>(await apiRequest({ url: "/api/contact", params }), "Couldn't load messages.");

export const updateMessageStatus = async (id: string, status: ContactStatus) =>
	unwrap<ContactMessage>(
		await apiRequest({ method: "PATCH", url: `/api/contact/${id}/status`, data: { status } }),
		"Couldn't update the message."
	);

export const deleteMessage = async (id: string) =>
	unwrap<{ id: string }>(
		await apiRequest({ method: "DELETE", url: `/api/contact/${id}` }),
		"Couldn't delete the message."
	);
