import mongoose from "mongoose";
import { SKILL_GROUPS } from "#constants/content.js";

const SkillSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, unique: true },
		group: { type: String, enum: SKILL_GROUPS, required: true, index: true },
		iconUrl: { type: String, default: "" },
		order: { type: Number, default: 0 },
	},
	{ timestamps: true, collection: "skills" }
);

export const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
export default Skill;
