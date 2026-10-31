import { apiRequest } from "@/lib/apiReq";
import { unwrap } from "@/lib/services/unwrap";
import type { ContactFormValues } from "@/lib/validations/contact";
import type { ApiResponse } from "@/types/api";

export const submitContactMessage = async (values: ContactFormValues) => {
	const response = await apiRequest<ApiResponse<{ id: string; name: string; createdAt: string }>>({
		method: "POST",
		url: "/api/contact",
		data: values,
		anonymous: true,
	});
	return { message: response.message, data: unwrap<{ id: string }>(response, "Couldn't send your message.") };
};
