/** Copies seed-data.js into the frontend as the offline fallback: pnpm sync-fallback */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as data from "./seed-data.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const target = path.resolve(here, "../../frontend/src/data/fallback.json");

// eslint-disable-next-line no-unused-vars
const { key, ...profile } = data.profile;
const withIds = (prefix, items, idOf) =>
	items.map((item, i) => {
		const out = { id: `${prefix}-${idOf ? idOf(item) : i}`, ...item };
		for (const field of ["endDate", "endYear"]) if (field in out && out[field] === "") out[field] = null;
		return out;
	});

const fallback = {
	profile,
	experience: withIds("exp", data.experience),
	education: withIds("edu", data.education),
	skills: withIds("skill", data.skills),
	projects: withIds("p", data.projects, (p) => p.slug).map((p) => ({ ...p, published: undefined })),
	certificates: withIds("cert", data.certificates),
};

fs.writeFileSync(target, `${JSON.stringify(fallback, null, "\t")}\n`);
// eslint-disable-next-line no-console
console.log(`Wrote ${path.relative(process.cwd(), target)}`);
