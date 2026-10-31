import { BaseDTO } from "#dtos/base-dto.js";

export class AuthUserResponseDTO extends BaseDTO {
	constructor({ email, role }) {
		super();
		this.email = email;
		this.role = role;
	}

	static create(user) {
		return new AuthUserResponseDTO(user).toObject();
	}
}

export class LoginResponseDTO extends BaseDTO {
	constructor({ token, expiresIn, user }) {
		super();
		this.token = token;
		this.expiresIn = expiresIn;
		this.user = AuthUserResponseDTO.create(user);
	}

	static create(data) {
		return new LoginResponseDTO(data).toObject();
	}
}
