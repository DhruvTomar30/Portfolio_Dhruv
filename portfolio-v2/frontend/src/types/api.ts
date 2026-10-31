/** Backend envelope — mirrors utils/response-handler.js in portfolio-v2/backend */
export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
	requestId?: string;
}

export interface ApiErrorBody {
	success: false;
	message: string;
	errors?: string[];
	fields?: Record<string, string>;
	requestId?: string;
	status?: number;
}

export type ContactStatus = "new" | "read" | "archived";

export interface ContactMessage {
	id: string;
	name: string;
	email: string;
	subject: string;
	message: string;
	status: ContactStatus;
	emailDelivered: boolean;
	createdAt: string;
}

export interface ContactInbox {
	items: ContactMessage[];
	pagination: { page: number; limit: number; total: number; totalPages: number };
	unread: number;
}

export interface AuthUser {
	email: string;
	role: "admin";
}

export interface LoginResult {
	token: string;
	expiresIn: string;
	user: AuthUser;
}
