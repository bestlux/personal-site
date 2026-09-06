"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { emailHref, photoSource } from "./content";
import Link from "next/link";

type Panel = "about" | "reading" | "music" | "photograph";

export function DistanceHome({
  about,
  reading,
  music,
}: {
  about: ReactNode;
  reading: ReactNode;
  music: ReactNode;
}) {
  const [panel, setPanel] = useState<Panel | null>(null);
  const [photographOnly, setPhotographOnly] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!panel) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [panel]);

  function openPanel(id: Panel, event: MouseEvent<HTMLElement>) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    trigger.current = event.currentTarget;
    setPanel(id);
  }

  function closePanel() {
    dialog.current?.close();
    setPanel(null);
    trigger.current?.focus();
  }

  return (
    <div
      className={`distance distance-home ${photographOnly ? "distance-photo-only" : ""}`}
    >
      <a className="distance-skip" href="#distance-main">
        Skip to content
      </a>
      <main id="distance-main" className="distance-main">
        <div className="distance-photo-plane">
          <Image
            src="/images/pale-blue-dot.jpg"
            fill
            sizes="(max-width: 700px) 150vh, 100vw"
            priority
            alt="Voyager 1’s Pale Blue Dot: Earth is a tiny speck in a beam of scattered sunlight."
          />
          <button
            className="distance-earth"
            aria-label="About the Pale Blue Dot photograph"
            onClick={(event) => openPanel("photograph", event)}
          >
            <span className="distance-earth-ring" />
            <span className="distance-earth-caption">
              Earth
              <span className="distance-earth-line" />
              <small>All of us.</small>
            </span>
          </button>
        </div>
        <div className="distance-top distance-ui">
          <span>
            Software engineer
            <br />
            San Francisco, Earth
          </span>
          <a href={emailHref}>
            Say hello <span aria-hidden="true">↗</span>
          </a>
        </div>
        <nav className="distance-nav distance-ui" aria-label="Personal site">
          <Link href="/about" onClick={(event) => openPanel("about", event)}>
            <span>About</span>
            <small>01</small>
            <span className="distance-dot" aria-hidden="true" />
          </Link>
          <Link
            href="/reading"
            onClick={(event) => openPanel("reading", event)}
          >
            <span>Reading</span>
            <small>02</small>
            <span className="distance-dot" aria-hidden="true" />
          </Link>
          <Link href="/music" onClick={(event) => openPanel("music", event)}>
            <span>Music</span>
            <small>03</small>
            <span className="distance-dot" aria-hidden="true" />
          </Link>
        </nav>
        <div className="distance-identity distance-ui">
          <h1>
            <button
              aria-label="About iomancer"
              onClick={(event) => openPanel("about", event)}
            >
              iomancer<span aria-hidden="true">.</span>
            </button>
          </h1>
        </div>
        <footer className="distance-bottom">
          <a
            className="distance-credit"
            href={photoSource}
            target="_blank"
            rel="noreferrer"
          >
            Pale Blue Dot · Voyager 1 · 14 February 1990
            <br />
            <span>Image: NASA/JPL-Caltech · reprocessed 2020</span>
          </a>
          <button
            className="distance-photo-toggle"
            onClick={() => setPhotographOnly(!photographOnly)}
            aria-pressed={photographOnly}
          >
            {photographOnly ? "Return to iomancer" : "Just the photograph"}
            <span aria-hidden="true">{photographOnly ? "↩" : "↗"}</span>
          </button>
        </footer>
      </main>
      <dialog
        ref={dialog}
        className="distance-reader"
        aria-labelledby="distance-reader-title"
        onCancel={(event) => {
          event.preventDefault();
          closePanel();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) closePanel();
        }}
      >
        {panel && (
          <article>
            <header>
              <button
                autoFocus
                onClick={closePanel}
                aria-label="Close reading panel"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </header>
            <div className="distance-reader-body">
              <h2 id="distance-reader-title">
                {panel === "photograph"
                  ? "Pale Blue Dot"
                  : panel === "about"
                    ? "About"
                    : panel === "music"
                      ? "Music"
                      : "Reading"}
              </h2>
              {panel === "about" ? (
                about
              ) : panel === "reading" ? (
                reading
              ) : panel === "music" ? (
                music
              ) : (
                <div className="distance-copy">
                  <p>
                    Pale Blue Dot has been my favorite photograph for a long
                    time. It still moves me.
                  </p>
                  <Image
                    className="distance-photo-detail"
                    src="/images/pale-blue-dot.jpg"
                    width={5230}
                    height={5175}
                    sizes="(max-width: 700px) 90vw, 510px"
                    alt="Earth, a tiny pale point in a sunbeam, photographed by Voyager 1."
                  />
                  <p>
                    Earth, photographed by Voyager 1 on February 14, 1990. This
                    is the 2020 reprocessing of the image.
                  </p>
                  <a href={photoSource} target="_blank" rel="noreferrer">
                    NASA / JPL-Caltech — image &amp; story ↗
                  </a>
                </div>
              )}
            </div>
          </article>
        )}
      </dialog>
    </div>
  );
}
