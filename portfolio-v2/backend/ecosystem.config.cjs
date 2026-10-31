/**
 * PM2 config for the API (CJS because the package is ESM).
 *   pm2 start ecosystem.config.cjs --env production
 * A portfolio API needs one process; bump `instances` if you ever need more.
 */
module.exports = {
	apps: [
		{
			name: "portfolio-api",
			script: "index.js",
			cwd: __dirname,
			instances: 1,
			exec_mode: "fork",
			max_memory_restart: "300M",
			wait_ready: true,
			listen_timeout: 15000,
			kill_timeout: 15000,
			exp_backoff_restart_delay: 200,
			out_file: "./logs/pm2/out.log",
			error_file: "./logs/pm2/error.log",
			merge_logs: true,
			time: true,
			env: { NODE_ENV: "development" },
			env_production: { NODE_ENV: "production" },
		},
	],
};
