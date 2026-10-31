import { ImageResponse } from "next/og";

export const alt = "Dhruv Tomar — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: 80,
					background: "linear-gradient(135deg, #09090b 0%, #131316 55%, #2a1410 100%)",
					color: "white",
					fontFamily: "sans-serif",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
					<div
						style={{
							width: 72,
							height: 72,
							borderRadius: 36,
							background: "linear-gradient(135deg, #ff6b3d, #ec4899)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: 40,
							fontWeight: 700,
						}}
					>
						D
					</div>
					<div style={{ fontSize: 30, opacity: 0.8 }}>dhruvtomar · portfolio</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>Dhruv Tomar</div>
					<div style={{ fontSize: 44, color: "#ff6b3d", marginTop: 8 }}>Full Stack Developer</div>
					<div style={{ fontSize: 28, opacity: 0.7, marginTop: 24 }}>React · Next.js · Node.js · Express · MongoDB</div>
				</div>
			</div>
		),
		size
	);
}
