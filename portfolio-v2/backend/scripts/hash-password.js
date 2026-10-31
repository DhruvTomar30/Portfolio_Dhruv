/** Usage: pnpm hash-password 'my-strong-password'  → paste the output into ADMIN_PASSWORD_HASH */
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password || password.length < 8) {
	console.error("Usage: pnpm hash-password '<password of at least 8 characters>'");
	process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
// eslint-disable-next-line no-console
console.log(`\nADMIN_PASSWORD_HASH='${hash}'\n`);
