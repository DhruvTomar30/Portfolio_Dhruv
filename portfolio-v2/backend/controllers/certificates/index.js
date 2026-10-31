import { createContentController } from "#controllers/content/create-content-controller.js";
import { CertificateResponseDTO } from "#dtos/certificates/index.js";
import { CertificateService } from "#services/content/index.js";

export const CertificatesController = createContentController({
	service: CertificateService,
	dto: CertificateResponseDTO,
	label: "Certificate",
	plural: "Certificates",
});
