import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema(
	{
		platform: { type: String, required: true, trim: true },
		url: { type: String, required: true, trim: true },
	},
	{ _id: false }
);

const ExpertiseSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
	},
	{ _id: false }
);

const StatSchema = new mongoose.Schema(
	{
		label: { type: String, required: true, trim: true },
		value: { type: String, required: true, trim: true },
	},
	{ _id: false }
);

/** Singleton document: there is only ever one profile (key = "main"). */
const ProfileSchema = new mongoose.Schema(
	{
		key: { type: String, default: "main", unique: true, immutable: true },
		name: { type: String, required: true, trim: true },
		headline: { type: String, required: true, trim: true },
		roles: { type: [String], default: [] },
		bio: { type: String, required: true, trim: true },
		avatarUrl: { type: String, default: "" },
		resumeUrl: { type: String, default: "" },
		email: { type: String, required: true, trim: true, lowercase: true },
		phone: { type: String, default: "" },
		location: { type: String, default: "" },
		birthDate: { type: String, default: "" },
		qualification: { type: String, default: "" },
		availableForWork: { type: Boolean, default: true },
		socials: { type: [SocialSchema], default: [] },
		expertise: { type: [ExpertiseSchema], default: [] },
		stats: { type: [StatSchema], default: [] },
	},
	{ timestamps: true, collection: "profiles" }
);

export const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
export default Profile;
