import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		issuer: { type: String, required: true, trim: true },
		description: { type: String, default: "" },
		imageUrl: { type: String, default: "" },
		url: { type: String, default: "" },
		issuedOn: { type: String, default: "" },
		order: { type: Number, default: 0 },
	},
	{ timestamps: true, collection: "certificates" }
);

export const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema);
export default Certificate;
