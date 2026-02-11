import Script from "next/script";

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const plausibleScriptSrc =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC ?? "https://plausible.io/js/script.js";

export function Analytics() {
  if (!plausibleDomain) {
    return null;
  }

  return <Script defer data-domain={plausibleDomain} src={plausibleScriptSrc} />;
}
