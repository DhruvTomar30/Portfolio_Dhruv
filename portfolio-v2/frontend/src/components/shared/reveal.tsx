"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
	delay?: number;
	y?: number;
}

/** Fades + lifts its children into view once, when scrolled into the viewport. */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
	const reduce = useReducedMotion();
	return (
		<motion.div
			initial={reduce ? false : { opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
			{...props}
		>
			{children}
		</motion.div>
	);
}
