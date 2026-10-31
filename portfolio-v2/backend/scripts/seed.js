/**
 * Seeds MongoDB with the portfolio content.
 *   pnpm seed            → upserts content (safe to re-run; never touches contact messages)
 *   pnpm seed --reset    → wipes content collections first
 */
import mongoose from "mongoose";
import config from "#config/index.js";
import { Certificate } from "#models/Certificate.js";
import { Education } from "#models/Education.js";
import { Experience } from "#models/Experience.js";
import { Profile } from "#models/Profile.js";
import { Project } from "#models/Project.js";
import { Skill } from "#models/Skill.js";
import { LoggerService } from "#utils/logger.js";
import * as data from "./seed-data.js";

const logger = new LoggerService("seed");
const reset = process.argv.includes("--reset");

const upsertMany = async (Model, docs, key) => {
	const ops = docs.map((doc) => ({
		updateOne: { filter: { [key]: doc[key] }, update: { $set: doc }, upsert: true },
	}));
	const result = await Model.bulkWrite(ops);
	logger.info(`${Model.modelName}: ${result.upsertedCount} inserted, ${result.modifiedCount} updated`);
};

const run = async () => {
	await mongoose.connect(config.mongo.uri, { dbName: config.mongo.dbName });
	logger.info(`Connected to ${config.mongo.dbName}`);

	if (reset) {
		await Promise.all([Profile, Project, Skill, Experience, Education, Certificate].map((M) => M.deleteMany({})));
		logger.info("Content collections cleared");
	}

	await Profile.findOneAndUpdate({ key: "main" }, { $set: data.profile }, { upsert: true });
	logger.info("Profile upserted");
	await upsertMany(Project, data.projects, "slug");
	await upsertMany(Skill, data.skills, "name");
	await upsertMany(Experience, data.experience, "company");
	await Experience.deleteMany({ company: { $nin: data.experience.map((e) => e.company) } });
	await upsertMany(Education, data.education, "degree");
	await upsertMany(Certificate, data.certificates, "issuer");
	await Certificate.deleteMany({ issuer: { $nin: data.certificates.map((c) => c.issuer) } });

	await mongoose.disconnect();
	logger.info("Seed complete");
};

run().catch(async (error) => {
	logger.error(`Seed failed: ${error.message}`);
	await mongoose.disconnect();
	process.exit(1);
});
