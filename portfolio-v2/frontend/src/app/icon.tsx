import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					borderRadius: 16,
					background: "linear-gradient(135deg, #ff6b3d, #ec4899)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontSize: 40,
					fontWeight: 700,
					fontFamily: "sans-serif",
				}}
			>
				D
			</div>
		),
		size
	);
}
