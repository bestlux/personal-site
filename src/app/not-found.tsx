import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <section className="content-shell space-y-4 py-10 text-center">
        <p className="section-kicker justify-center">404</p>
        <h1 className="font-display text-5xl leading-none text-text">Signal not found</h1>
        <p className="text-text-dim">This route does not exist or is no longer available.</p>
        <p>
          <Link href="/" className="text-accent-secondary underline underline-offset-4">
            Return to home
          </Link>
        </p>
      </section>
    </Container>
  );
}
