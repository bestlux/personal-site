import Image from "next/image";
import Link from "next/link";
import { emailHref, photoSource } from "./content";

export function DistancePage({
  children,
  back = "/",
  backLabel = "iomancer",
}: {
  children: React.ReactNode;
  back?: string;
  backLabel?: string;
}) {
  return (
    <div className="distance distance-document">
      <div className="distance-document-photo" aria-hidden="true">
        <Image
          src="/images/pale-blue-dot.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
        />
      </div>
      <a className="distance-skip" href="#reading-content">
        Skip to content
      </a>
      <header className="distance-document-nav">
        <Link href={back}>
          <span aria-hidden="true">←</span> {backLabel}
        </Link>
        <a href={emailHref}>
          Say hello <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main id="reading-content" className="distance-document-body">
        {children}
      </main>
      <footer className="distance-document-footer">
        <Link href="/">
          iomancer<span aria-hidden="true">.</span>
        </Link>
        <a href={photoSource} target="_blank" rel="noreferrer">
          Pale Blue Dot · NASA/JPL-Caltech
        </a>
      </footer>
    </div>
  );
}
