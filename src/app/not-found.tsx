import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <section className="panel reveal-up space-y-4 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.16em] text-accent-green">404</p>
        <h1 className="font-display text-4xl uppercase tracking-[0.04em]">Signal Not Found</h1>
        <p className="text-text-dim">This route does not exist or is no longer available.</p>
        <p>
          <Link href="/" className="text-accent-cyan underline underline-offset-4">
            Return to home
          </Link>
        </p>
      </section>
    </Container>
  );
}
