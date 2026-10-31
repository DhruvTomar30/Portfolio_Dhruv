import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "#config/index.js";
import HTTP_STATUS from "#constants/http-status.js";
import { ROLES } from "#constants/roles.js";
import { throwCustomError } from "#utils/index.js";

// Compared against when the email doesn't match, so response time doesn't reveal which part was wrong.
const DUMMY_HASH = bcrypt.hashSync("timing-equaliser-not-a-real-password", 12);

export class AuthService {
	static async login({ email, password }) {
		if (!config.admin.passwordHash) {
			throwCustomError("Admin login is not configured on the server", HTTP_STATUS.SERVICE_UNAVAILABLE);
		}

		const emailMatches = email === config.admin.email;
		const passwordMatches = await bcrypt.compare(password, emailMatches ? config.admin.passwordHash : DUMMY_HASH);
		if (!emailMatches || !passwordMatches) throwCustomError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);

		const user = { email: config.admin.email, role: ROLES.ADMIN };
		const token = jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.expiresIn, subject: user.email });
		return { token, expiresIn: config.jwt.expiresIn, user };
	}
}

export default AuthService;
