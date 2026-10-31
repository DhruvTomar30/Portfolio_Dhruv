// `output: "standalone"` doesn't copy public/ and .next/static — do it so server.js can serve them.
import fs from "node:fs";

const copy = (from, to) => {
	if (fs.existsSync(from)) fs.cpSync(from, to, { recursive: true });
};
copy("public", ".next/standalone/public");
copy(".next/static", ".next/standalone/.next/static");
console.log("Copied public/ and .next/static into .next/standalone");
