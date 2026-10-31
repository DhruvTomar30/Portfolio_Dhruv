import HTTP_STATUS from "#constants/http-status.js";
import { AuthUserResponseDTO, LoginResponseDTO } from "#dtos/auth/index.js";
import { AuthService } from "#services/auth/index.js";

export class AuthController {
	static async login({ reqBody }) {
		const result = await AuthService.login(reqBody);
		return { status: HTTP_STATUS.OK, message: "Logged in", data: LoginResponseDTO.create(result) };
	}

	static async me({ reqUser }) {
		return { status: HTTP_STATUS.OK, message: "Authenticated", data: AuthUserResponseDTO.create(reqUser) };
	}
}
