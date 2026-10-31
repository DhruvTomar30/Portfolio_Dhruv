import config from "#config/index.js";
import HTTP_STATUS from "#constants/http-status.js";
import { HealthCheckResponseDTO } from "#dtos/health/index.js";
import { DatabaseService } from "#services/database/index.js";

export class HealthController {
	static async check() {
		const dbUp = DatabaseService.isConnected();
		return {
			status: dbUp ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE,
			message: dbUp ? "Service healthy" : "Database unavailable",
			data: HealthCheckResponseDTO.create({
				status: dbUp ? "OK" : "DEGRADED",
				database: dbUp ? "connected" : "disconnected",
				environment: config.env,
				uptime: Math.round(process.uptime()),
			}),
		};
	}
}
