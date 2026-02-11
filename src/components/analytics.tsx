import Script from "next/script";

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const plausibleScriptSrc =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC ?? "https://plausible.io/js/script.js";

export function Analytics() {
  const domain = plausibleDomain?.trim();
  const scriptSrc = plausibleScriptSrc.trim();

  if (!domain) {
    return null;
  }

  return <Script defer data-domain={domain} src={scriptSrc} />;
}
