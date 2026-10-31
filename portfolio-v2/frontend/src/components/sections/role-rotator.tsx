"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function RoleRotator({ roles }: { roles: string[] }) {
	const [index, setIndex] = useState(0);
	const reduce = useReducedMotion();

	useEffect(() => {
		if (roles.length < 2 || reduce) return;
		const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
		return () => window.clearInterval(id);
	}, [roles.length, reduce]);

	if (!roles.length) return null;

	return (
		<span className="relative inline-grid h-[1.3em] overflow-hidden align-bottom" aria-live="polite">
			<AnimatePresence mode="popLayout" initial={false}>
				<motion.span
					key={roles[index]}
					initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
					animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
					exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
					transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
					className="whitespace-nowrap text-foreground"
				>
					{roles[index]}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}
