import mongoose from "mongoose";
import config from "#config/index.js";
import { LoggerService } from "#utils/logger.js";

const logger = new LoggerService("database");

export class DatabaseService {
	static async connect() {
		mongoose.set("strictQuery", true);
		mongoose.connection.on("disconnected", () => logger.warning("MongoDB disconnected"));
		mongoose.connection.on("reconnected", () => logger.info("MongoDB reconnected"));

		await mongoose.connect(config.mongo.uri, {
			dbName: config.mongo.dbName,
			serverSelectionTimeoutMS: 10_000,
		});
		logger.info(`MongoDB connected (db: ${config.mongo.dbName})`);
	}

	static isConnected() {
		return mongoose.connection.readyState === 1;
	}

	static async disconnect() {
		await mongoose.connection.close();
		logger.info("MongoDB connection closed");
	}
}

export default DatabaseService;
