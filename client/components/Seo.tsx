import { useEffect } from "react";
import {
  BRAND_NAME,
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_GEO,
  BUSINESS_PHONE_E164,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  LEGAL_BUSINESS_NAME,
  SAME_AS,
  SITE_URL,
} from "@/lib/site";

const KEYWORD_BASE = [
  "Starlink installation Nigeria",
  "Starlink installer Nigeria",
  "Starlink installation Abuja",
  "Starlink installation Lagos",
  "Starlink installation Port Harcourt",
  "buy Starlink Nigeria",
  "Starlink setup Nigeria",
  "Starlink support Nigeria",
  "how to set up Starlink in Nigeria",
  "Starlink monthly subscription Nigeria",
  "Starlink dealer Nigeria",
  "Starlink internet Nigeria",
  "Starlink equipment Nigeria",
  "professional Starlink installation",
  "satellite internet Nigeria",
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
  /** When true, emits full LocalBusiness + offer catalog (use on homepage only). */
  includeLocalBusinessSchema?: boolean;
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
  includeLocalBusinessSchema = false,
}: SeoProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const head = document.head;
    const desc = description ?? DEFAULT_DESCRIPTION;
    const keywordSet = Array.from(new Set([...KEYWORD_BASE, ...(keywords ?? [])]));
    const keywordString = keywordSet.join(", ");
    const canonicalUrl = resolveCanonical(canonical);
    const ogImage = image ? resolveUrl(image) : DEFAULT_OG_IMAGE;

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

    const structuredData = buildStructuredData({
      title,
      description: desc,
      canonicalUrl,
      image: ogImage,
      type,
      publishedTime,
      updatedTime,
      schema,
      includeLocalBusinessSchema,
    });
    upsertStructuredData(structuredData);
  }, [
    title,
    description,
    canonical,
    image,
    type,
    publishedTime,
    updatedTime,
    keywords?.join("|"),
    noindex,
    schema,
    includeLocalBusinessSchema,
  ]);

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
  includeLocalBusinessSchema,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  image: string;
  type: string;
  publishedTime?: string;
  updatedTime?: string;
  schema?: StructuredData | StructuredData[];
  includeLocalBusinessSchema: boolean;
}): StructuredData[] | null {
  const schemas: StructuredData[] = [];

  const organizationSchema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: LEGAL_BUSINESS_NAME,
    legalName: LEGAL_BUSINESS_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/starlinklogo.png`,
    email: BUSINESS_EMAIL,
    telephone: BUSINESS_PHONE_E164,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_ADDRESS.streetAddress,
      addressLocality: BUSINESS_ADDRESS.addressLocality,
      addressRegion: BUSINESS_ADDRESS.addressRegion,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.addressCountry,
    },
    sameAs: [...SAME_AS],
    areaServed: { "@type": "Country", name: "Nigeria" },
  };

  const webSiteSchema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
    description,
    inLanguage: "en-NG",
    publisher: { "@id": `${SITE_URL}/#organization` },
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

  schemas.push(organizationSchema, webSiteSchema, webPageSchema);

  if (includeLocalBusinessSchema) {
    const localBusinessSchema: StructuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: LEGAL_BUSINESS_NAME,
      url: SITE_URL,
      telephone: BUSINESS_PHONE_E164,
      email: BUSINESS_EMAIL,
      priceRange: "₦₦₦",
      image,
      description:
        description ||
        "Professional Starlink installation and internet services across Nigeria. Hardware sales, certified installers, enterprise WiFi, and ongoing support.",
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS_ADDRESS.streetAddress,
        addressLocality: BUSINESS_ADDRESS.addressLocality,
        addressRegion: BUSINESS_ADDRESS.addressRegion,
        postalCode: BUSINESS_ADDRESS.postalCode,
        addressCountry: BUSINESS_ADDRESS.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS_GEO.latitude,
        longitude: BUSINESS_GEO.longitude,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
      areaServed: { "@type": "Country", name: "Nigeria" },
      serviceType: "Starlink installation",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Starlink services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Starlink installation Nigeria",
              description: "Professional Starlink satellite internet installation across Nigeria",
              provider: { "@id": `${SITE_URL}/#localbusiness` },
              areaServed: { "@type": "Country", name: "Nigeria" },
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: `${SITE_URL}/services`,
                servicePhone: BUSINESS_PHONE_E164,
              },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Starlink maintenance and support",
              description: "Troubleshooting, repairs, and ongoing technical support for Starlink users in Nigeria",
              provider: { "@id": `${SITE_URL}/#localbusiness` },
            },
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "127",
      },
      sameAs: [...SAME_AS],
    };
    schemas.push(localBusinessSchema);
  }

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
