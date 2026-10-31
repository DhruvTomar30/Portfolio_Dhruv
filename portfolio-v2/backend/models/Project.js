import mongoose from "mongoose";
import { PROJECT_CATEGORIES } from "#constants/content.js";

const ProjectSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
		description: { type: String, required: true, trim: true },
		category: { type: String, enum: PROJECT_CATEGORIES, required: true, index: true },
		techStack: { type: [String], default: [] },
		imageUrl: { type: String, default: "" },
		liveUrl: { type: String, default: "" },
		repoUrl: { type: String, default: "" },
		featured: { type: Boolean, default: false, index: true },
		published: { type: Boolean, default: true, index: true },
		order: { type: Number, default: 0 },
	},
	{ timestamps: true, collection: "projects" }
);

export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
export default Project;
