import { BaseDTO } from "#dtos/base-dto.js";

export class HealthCheckResponseDTO extends BaseDTO {
	constructor({ status, database, environment, uptime }) {
		super();
		this.status = status;
		this.database = database;
		this.environment = environment;
		this.uptime = uptime;
		this.timestamp = new Date().toISOString();
	}

	static create(data) {
		return new HealthCheckResponseDTO(data).toObject();
	}
}
