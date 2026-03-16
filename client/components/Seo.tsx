import { useEffect } from "react";

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://www.starlinknetworkservice.ng").replace(/\/$/, "");
const DEFAULT_IMAGE = `${SITE_URL}/images/og/starlink-global-network-og.jpg`;
const BRAND_NAME = "Starlink Installation & Services";
const DEFAULT_DESCRIPTION =
  "Expert Starlink installation and support services in Nigeria. Serving Lagos, Abuja, Port Harcourt, and all 36 states. Professional satellite internet installation, distribution, and 24/7 support. Get fast, reliable connectivity today.";
const KEYWORD_BASE = [
  "Starlink installation Nigeria",
  "Starlink installation Lagos",
  "Starlink installation Abuja",
  "Starlink dealer Nigeria",
  "Starlink authorized dealer",
  "Buy Starlink Nigeria",
  "Starlink internet Nigeria",
  "Starlink price Nigeria",
  "Starlink installation cost",
  "Starlink installer",
  "Starlink services Nigeria",
  "Professional Starlink installation",
  "Starlink setup Nigeria",
  "Starlink equipment Nigeria",
  "Starlink maintenance Nigeria",
  "Starlink support Nigeria",
  "Starlink enterprise WiFi",
  "Starlink backup power",
  "Starlink WISP",
  "Satellite internet Nigeria",
  "High-speed internet Nigeria",
  "Starlink coverage Nigeria",
];

type StructuredData = Record<string, unknown>;

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article" | "product" | "service";
  publishedTime?: string;
  updatedTime?: string;
  keywords?: string[];
  noindex?: boolean;
  schema?: StructuredData | StructuredData[];
}

export default function Seo({
  title,
  description,
  canonical,
  image,
  type = "website",
  publishedTime,
  updatedTime,
  keywords,
  noindex = false,
  schema,
}: SeoProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const head = document.head;
    const desc = description ?? DEFAULT_DESCRIPTION;
    const keywordSet = Array.from(new Set([...KEYWORD_BASE, ...(keywords ?? [])]));
    const keywordString = keywordSet.join(", ");
    const canonicalUrl = resolveCanonical(canonical);
    const ogImage = image ? resolveUrl(image) : DEFAULT_IMAGE;

    document.title = title;

    upsertLink(head, {
      rel: "canonical",
      href: canonicalUrl,
    });

    const robotsContent = noindex ? "noindex, nofollow" : "index, follow";
    upsertMeta(head, { name: "description", content: desc });
    upsertMeta(head, { name: "keywords", content: keywordString });
    upsertMeta(head, { name: "robots", content: robotsContent });
    upsertMeta(head, { name: "author", content: BRAND_NAME });
    upsertMeta(head, { property: "og:locale", content: "en_NG" });
    upsertMeta(head, { property: "og:site_name", content: BRAND_NAME });
    upsertMeta(head, { property: "og:type", content: type });
    upsertMeta(head, { property: "og:title", content: title });
    upsertMeta(head, { property: "og:description", content: desc });
    upsertMeta(head, { property: "og:url", content: canonicalUrl });
    upsertMeta(head, { property: "og:image", content: ogImage });
    upsertMeta(head, { property: "og:image:alt", content: title });

    if (publishedTime) {
      upsertMeta(head, { property: "article:published_time", content: publishedTime });
    }
    if (updatedTime) {
      upsertMeta(head, { property: "article:modified_time", content: updatedTime });
    }

    upsertMeta(head, { name: "twitter:card", content: "summary_large_image" });
    upsertMeta(head, { name: "twitter:title", content: title });
    upsertMeta(head, { name: "twitter:description", content: desc });
    upsertMeta(head, { name: "twitter:image", content: ogImage });
    upsertMeta(head, { name: "twitter:site", content: "@StarlinkNG" });

    const structuredData = buildStructuredData({
      title,
      description: desc,
      canonicalUrl,
      image: ogImage,
      type,
      publishedTime,
      updatedTime,
      schema,
    });
    upsertStructuredData(structuredData);
  }, [title, description, canonical, image, type, publishedTime, updatedTime, keywords?.join("|"), noindex, schema]);

  return null;
}

function upsertMeta(head: HTMLHeadElement, attributes: Record<string, string>) {
  const attrName = attributes.name ? "name" : attributes.property ? "property" : undefined;
  if (!attrName) return;
  const selector = `meta[${attrName}="${attributes[attrName]}"]`;
  let tag = head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    tag!.setAttribute(key, value);
  });
}

function upsertLink(head: HTMLHeadElement, attributes: Record<string, string>) {
  const rel = attributes.rel ?? "canonical";
  const selector = `link[rel="${rel}"]`;
  let tag = head.querySelector<HTMLLinkElement>(selector);
  if (!tag) {
    tag = document.createElement("link");
    head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    tag!.setAttribute(key, value);
  });
}

function upsertStructuredData(payload: StructuredData[] | null) {
  const scriptId = "seo-structured-data";
  const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!payload || payload.length === 0) {
    existing?.remove();
    return;
  }

  const json = JSON.stringify(payload.length === 1 ? payload[0] : payload);

  if (existing) {
    if (existing.text !== json) {
      existing.text = json;
    }
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  script.text = json;
  document.head.appendChild(script);
}

function resolveCanonical(target?: string) {
  try {
    if (!target) {
      return new URL(window.location.pathname + window.location.search, SITE_URL).toString();
    }

    // Already absolute?
    if (/^https?:\/\//i.test(target)) {
      return target;
    }

    return new URL(target.startsWith("/") ? target : `/${target}`, SITE_URL).toString();
  } catch {
    return SITE_URL;
  }
}

function resolveUrl(target: string) {
  if (/^https?:\/\//i.test(target)) return target;
  const path = target.startsWith("/") ? target : `/${target}`;
  return `${SITE_URL}${path}`;
}

function buildStructuredData({
  title,
  description,
  canonicalUrl,
  image,
  type,
  publishedTime,
  updatedTime,
  schema,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  image: string;
  type: string;
  publishedTime?: string;
  updatedTime?: string;
  schema?: StructuredData | StructuredData[];
}): StructuredData[] | null {
  const schemas: StructuredData[] = [];

  const webSiteSchema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
    description,
    inLanguage: "en-NG",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const webPageSchema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonicalUrl,
    description,
    isPartOf: { "@id": SITE_URL },
    image,
    inLanguage: "en-NG",
    datePublished: publishedTime,
    dateModified: updatedTime ?? publishedTime,
    primaryImageOfPage: image,
  };

  const localBusinessSchema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: BRAND_NAME,
    url: SITE_URL,
    telephone: "+2349060976424",
    priceRange: "₦₦₦",
    image,
    description: description || "Professional Starlink installation and services across all 36 states in Nigeria. Expert satellite internet installation, distribution, and support.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "House 7, Trunk H, Mandela Estate, SARS Road",
      addressLocality: "Port Harcourt",
      addressRegion: "Rivers State",
      postalCode: "500102",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.8156,
      longitude: 7.0498,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Starlink Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Starlink Installation Service",
            description: "Professional Starlink satellite internet installation across Nigeria",
            provider: {
              "@type": "LocalBusiness",
              name: BRAND_NAME,
            },
            areaServed: {
              "@type": "Country",
              name: "Nigeria",
            },
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: `${SITE_URL}/services`,
              servicePhone: "+2349060976424",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Starlink Maintenance and Support",
            description: "24/7 Starlink maintenance, troubleshooting, and technical support",
            provider: {
              "@type": "LocalBusiness",
              name: BRAND_NAME,
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Starlink Equipment Sales",
            description: "Official Starlink hardware and accessories distribution",
            provider: {
              "@type": "LocalBusiness",
              name: BRAND_NAME,
            },
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    sameAs: [
      "https://www.facebook.com/starlinknigeria",
      "https://www.instagram.com/starlinknigeria",
    ],
  };

  schemas.push(webSiteSchema, webPageSchema, localBusinessSchema);

  if (type === "article" && publishedTime) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      image: [image],
      datePublished: publishedTime,
      dateModified: updatedTime ?? publishedTime,
      author: {
        "@type": "Organization",
        name: BRAND_NAME,
      },
      publisher: {
        "@type": "Organization",
        name: BRAND_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/starlinklogo.png`,
        },
      },
    });
  }

  if (schema) {
    const custom = Array.isArray(schema) ? schema : [schema];
    schemas.push(...custom);
  }

  return schemas;
}
