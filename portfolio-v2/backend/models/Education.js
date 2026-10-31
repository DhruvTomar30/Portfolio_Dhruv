import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
	{
		degree: { type: String, required: true, trim: true },
		institution: { type: String, required: true, trim: true },
		location: { type: String, default: "" },
		startYear: { type: String, required: true },
		endYear: { type: String, default: "" }, // "" = present
		description: { type: String, default: "" },
		order: { type: Number, default: 0 },
	},
	{ timestamps: true, collection: "education" }
);

export const Education = mongoose.models.Education || mongoose.model("Education", EducationSchema);
export default Education;
