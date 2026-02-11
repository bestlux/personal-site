import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "Privacy and analytics approach for this site.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="space-y-8 py-12 sm:py-16">
      <PageIntro
        eyebrow="Policy"
        title="Privacy"
        summary="This site is intentionally minimal and privacy-conscious."
      />

      <section className="panel space-y-4 p-6 text-text-dim">
        <p>
          This site does not run ad trackers and does not sell personal data. Analytics are
          intended to be lightweight and privacy-first.
        </p>
        <p>
          External links may lead to third-party platforms with their own privacy practices.
        </p>
        <p>
          If you contact me by email, your message is retained only for communication and project
          follow-up purposes.
        </p>
      </section>
    </Container>
  );
}