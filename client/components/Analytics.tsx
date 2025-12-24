import { useEffect } from "react";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const GSC_TOKEN = import.meta.env.VITE_GSC_VERIFICATION;

export default function Analytics() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (GSC_TOKEN) {
      upsertMeta("google-site-verification", GSC_TOKEN);
    }
    if (GA_ID) {
      injectGaTag(GA_ID);
    }
  }, []);

  return null;
}

function upsertMeta(name: string, content: string) {
  const selector = `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function injectGaTag(measurementId: string) {
  if (document.getElementById("ga-measurement")) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", measurementId);

  const script = document.createElement("script");
  script.id = "ga-measurement";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  const inline = document.createElement("script");
  inline.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(inline);
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}
