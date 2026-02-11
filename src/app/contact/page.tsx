import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EmailReveal } from "@/components/email-reveal";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Reach out for collaboration, contracts, or thoughtful technical conversations.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="space-y-8 py-12 sm:py-16">
      <PageIntro
        eyebrow="Signal Link"
        title="Contact"
        summary="If a project, idea, or collaboration resonates, reach out through the channels below."
      />

      <section className="panel space-y-6 p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-text-dim">Email</p>
          <EmailReveal
            user={siteConfig.emailParts.user}
            host={siteConfig.emailParts.host}
            tld={siteConfig.emailParts.tld}
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-text-dim">Elsewhere</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.social.x}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 min-w-11 items-center border border-border px-4 text-sm uppercase tracking-[0.12em] text-text-dim hover:border-accent-cyan hover:text-accent-cyan"
            >
              X
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 min-w-11 items-center border border-border px-4 text-sm uppercase tracking-[0.12em] text-text-dim hover:border-accent-cyan hover:text-accent-cyan"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
}