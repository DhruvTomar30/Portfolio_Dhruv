import { z } from "zod";
import { optionalUrl, orderField, toUpdateSchema } from "#validators/common.js";

const CertificateBase = z.object({
	title: z.string().trim().min(2).max(120),
	issuer: z.string().trim().min(2).max(120),
	description: z.string().trim().max(400).default(""),
	imageUrl: optionalUrl,
	url: optionalUrl,
	issuedOn: z.string().trim().max(20).default(""),
	order: orderField,
});

export const CertificateCreateSchema = CertificateBase;

export const CertificateUpdateSchema = toUpdateSchema(CertificateBase);
