import HTTP_STATUS from "#constants/http-status.js";
import { Profile } from "#models/Profile.js";
import { throwCustomError } from "#utils/index.js";

export class ProfileService {
	static async get() {
		const profile = await Profile.findOne({ key: "main" }).lean();
		if (!profile) throwCustomError("Profile has not been set up yet. Run `pnpm seed`.", HTTP_STATUS.NOT_FOUND);
		return profile;
	}

	static async update(data) {
		const profile = await Profile.findOneAndUpdate(
			{ key: "main" },
			{ $set: data },
			{ returnDocument: "after", runValidators: true }
		).lean();
		if (!profile) throwCustomError("Profile has not been set up yet. Run `pnpm seed`.", HTTP_STATUS.NOT_FOUND);
		return profile;
	}
}

export default ProfileService;
