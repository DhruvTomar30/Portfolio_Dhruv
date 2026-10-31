import { ArrowUpRight, Award, FileCheck2 } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { Accent, Section } from "@/components/shared/section";
import { formatYearMonth } from "@/lib/format";
import type { Certificate } from "@/types/portfolio";

/**
 * imageUrl = a scan/photo of the actual certificate (shown as a preview when present).
 * url      = link to view the certificate (e.g. a Google Drive file).
 */
export function Certificates({ certificates }: { certificates: Certificate[] }) {
	if (!certificates.length) return null;
	return (
		<Section
			id="certificates"
			eyebrow="Recognition"
			title={
				<>
					Certificates &amp; <Accent>credentials</Accent>
				</>
			}
		>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{certificates.map((cert, i) => (
					<Reveal key={cert.id} delay={i * 0.05} className="h-full">
						<article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/30">
							{cert.imageUrl && (
								<div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-muted">
									<Image
										src={cert.imageUrl}
										alt={`${cert.title} certificate from ${cert.issuer}`}
										fill
										sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
										className="object-contain p-3"
									/>
								</div>
							)}
							<div className="flex flex-1 items-start gap-4 p-5">
								<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
									<Award className="size-5" />
								</span>
								<div className="min-w-0 flex-1">
									<div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
										<span className="truncate">{cert.issuer}</span>
										{cert.issuedOn && <span className="shrink-0 font-mono">{formatYearMonth(cert.issuedOn)}</span>}
									</div>
									<h3 className="mt-1 font-semibold leading-snug">{cert.title}</h3>
									{cert.description && <p className="mt-1.5 text-[13px] text-muted-foreground">{cert.description}</p>}
									{cert.url && (
										<a
											href={cert.url}
											target="_blank"
											rel="noreferrer"
											className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary after:absolute after:inset-0"
										>
											<FileCheck2 className="size-4" /> View certificate <ArrowUpRight className="size-3.5" />
										</a>
									)}
								</div>
							</div>
						</article>
					</Reveal>
				))}
			</div>
		</Section>
	);
}
