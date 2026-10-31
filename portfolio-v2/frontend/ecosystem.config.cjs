/**
 * PM2 config for the Next.js site. Runs the standalone server produced by `pnpm build`.
 *   pnpm build && pm2 start ecosystem.config.cjs --env production
 */
module.exports = {
	apps: [
		{
			name: "portfolio-web",
			script: ".next/standalone/server.js",
			cwd: __dirname,
			instances: 1,
			exec_mode: "fork",
			max_memory_restart: "500M",
			out_file: "./logs/pm2/out.log",
			error_file: "./logs/pm2/error.log",
			merge_logs: true,
			time: true,
			env_production: { NODE_ENV: "production", PORT: 3000, HOSTNAME: "127.0.0.1" },
		},
	],
};
