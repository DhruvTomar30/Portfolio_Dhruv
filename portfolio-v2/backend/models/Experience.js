import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
	{
		role: { type: String, required: true, trim: true },
		company: { type: String, required: true, trim: true },
		companyUrl: { type: String, default: "" },
		employmentType: { type: String, default: "Full-time" },
		location: { type: String, default: "" },
		startDate: { type: String, required: true }, // "YYYY-MM"
		endDate: { type: String, default: "" }, // "" = present
		summary: { type: String, required: true, trim: true },
		highlights: { type: [String], default: [] },
		techStack: { type: [String], default: [] },
		order: { type: Number, default: 0 },
	},
	{ timestamps: true, collection: "experiences" }
);

export const Experience = mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
export default Experience;
