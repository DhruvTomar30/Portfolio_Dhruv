const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-08" → "Aug 2024" (pure; no Date.now so it's safe to prerender). */
export function formatYearMonth(value: string | null | undefined): string {
	if (!value) return "Present";
	const [year, month] = value.split("-");
	const index = Number(month) - 1;
	return MONTHS[index] ? `${MONTHS[index]} ${year}` : year;
}

/** Whole months between two YYYY-MM values, inclusive of the start month. Null if open-ended. */
export function monthsBetween(start: string, end: string | null): number | null {
	if (!end) return null;
	const [sy, sm] = start.split("-").map(Number);
	const [ey, em] = end.split("-").map(Number);
	return Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
}

export function formatDuration(months: number | null): string | null {
	if (months === null) return null;
	const y = Math.floor(months / 12);
	const m = months % 12;
	return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", m ? `${m} mo${m > 1 ? "s" : ""}` : ""].filter(Boolean).join(" ");
}

export function initials(text: string): string {
	return text
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase())
		.join("");
}
