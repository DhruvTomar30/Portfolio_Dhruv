import HTTP_STATUS from "#constants/http-status.js";
import { ProfileResponseDTO } from "#dtos/profile/index.js";
import { ProfileService } from "#services/profile/index.js";

export class ProfileController {
	static async get() {
		const profile = await ProfileService.get();
		return { status: HTTP_STATUS.OK, message: "Profile fetched", data: ProfileResponseDTO.create(profile) };
	}

	static async update({ reqBody }) {
		const profile = await ProfileService.update(reqBody);
		return { status: HTTP_STATUS.OK, message: "Profile updated", data: ProfileResponseDTO.create(profile) };
	}
}
