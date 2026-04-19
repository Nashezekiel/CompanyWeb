import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { services } from "@/data/services";
import { getServiceSeoContent } from "@/data/service-seo-content";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import { BRAND_NAME, SITE_URL } from "@/lib/site";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const seoExtra = getServiceSeoContent(slug);

  if (!service) {
    return (
      <div className="container py-20">
        <h2 className="text-2xl font-bold">Service not found</h2>
        <p className="mt-4 text-foreground/70">We couldn't find the requested service.</p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/services">Back to Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  const canonicalPath = `/services/${service.slug}`;
  const absoluteUrl = `${SITE_URL}${canonicalPath}`;

  const serviceSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.short ?? service.description,
      areaServed: { "@type": "Country", name: "Nigeria" },
      provider: {
        "@type": "Organization",
        name: BRAND_NAME,
        url: SITE_URL,
        telephone: "+2349060976424",
      },
      serviceType: "Starlink installation",
      url: absoluteUrl,
      offers: {
        "@type": "Offer",
        priceCurrency: "NGN",
        availability: "https://schema.org/Available",
        url: absoluteUrl,
      },
    }),
    [absoluteUrl, service.description, service.short, service.title]
  );

  const breadcrumb = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl },
      ],
    }),
    [absoluteUrl, service.title]
  );

  const faqEntities =
    seoExtra?.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })) ?? [];

  const faqSchema =
    faqEntities.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntities,
        }
      : null;

  const combinedSchema = useMemo(() => {
    const parts: Record<string, unknown>[] = [serviceSchema, breadcrumb];
    if (faqSchema) parts.push(faqSchema);
    return parts;
  }, [breadcrumb, faqSchema, serviceSchema]);

  const metaDescription = (() => {
    const base = service.short ?? service.description;
    const suffix = " Get a free site survey today from DataGram.";
    const combined = `${base} ${suffix}`.trim();
    return combined.length > 160 ? `${combined.slice(0, 157)}…` : combined;
  })();

  const title = `${service.title} | Starlink Installation Nigeria | DataGram`;

  return (
    <section className="py-16">
      <Seo
        title={title}
        description={metaDescription}
        canonical={canonicalPath}
        image={service.image}
        type="service"
        keywords={[service.title, "Starlink installation Nigeria", "Starlink installer Nigeria", "buy Starlink Nigeria"]}
        schema={combinedSchema}
      />
      <div className="container grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-10">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Service detail</p>
            <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{service.title}</h1>
            <p className="mt-4 text-lg text-foreground/75">{service.description}</p>
          </header>

          {service.highlights && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Highlights</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/80">
                {service.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {seoExtra?.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
              <div className="mt-3 space-y-4 text-base leading-relaxed text-foreground/80">
                {section.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {seoExtra && (
            <section className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-bold tracking-tight">Questions about this service</h2>
              <dl className="mt-4 space-y-4">
                {seoExtra.faqs.map((f) => (
                  <div key={f.question}>
                    <dt className="font-semibold">{f.question}</dt>
                    <dd className="mt-1 text-sm text-foreground/75">{f.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <div className="rounded-md border bg-card p-4">
            <h2 className="text-lg font-semibold">Book {service.title.toLowerCase()} with DataGram</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Share your location, timeline, and photos of the install path. We will confirm materials, crew size, and whether a long-range or power add-on applies.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">Request a quote</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/faq">Read Nigeria FAQ</Link>
              </Button>
            </div>
          </div>

          <p className="text-sm text-foreground/70">
            For official hardware specifications and subscription classes, also reference{" "}
            <a className="text-primary underline-offset-4 hover:underline" href="https://www.starlink.com" target="_blank" rel="noreferrer">
              starlink.com
            </a>{" "}
            when comparing generations or international roaming rules.
          </p>
        </div>

        <aside className="space-y-4">
          <div className="rounded-md border bg-card p-4">
            {service.image && (
              <img
                src={service.image}
                alt={`${service.title} — Starlink installation Nigeria portfolio image by DataGram`}
                className="mb-4 w-full rounded-md object-cover"
                loading="lazy"
                width="900"
                height="600"
              />
            )}
            <p className="text-sm text-foreground/70">Representative project imagery—swap for location-specific photos when available.</p>
          </div>
          <div className="rounded-md border bg-muted/40 p-4 text-sm text-foreground/80">
            <p className="font-semibold text-foreground">Helpful links</p>
            <ul className="mt-2 list-disc space-y-2 pl-4">
              <li>
                <Link className="text-primary underline-offset-4 hover:underline" to="/locations">
                  City installation pages
                </Link>
              </li>
              <li>
                <Link className="text-primary underline-offset-4 hover:underline" to="/guide/starlink-nigeria">
                  Complete Nigeria guide
                </Link>
              </li>
              <li>
                <Link className="text-primary underline-offset-4 hover:underline" to="/gallery">
                  Installation gallery
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
