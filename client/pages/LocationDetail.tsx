import { Link, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import { getLocationBySlug } from "@/data/locations";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";

export default function LocationDetail() {
  const { slug } = useParams();
  const location = getLocationBySlug(slug);

  if (!location) {
    return (
      <div className="container py-20">
        <h1 className="text-2xl font-bold">Location not found</h1>
        <p className="mt-3 text-foreground/70">Try another city from the locations hub.</p>
        <Button asChild className="mt-6">
          <Link to="/locations">View locations</Link>
        </Button>
      </div>
    );
  }

  const path = `/locations/${location.slug}`;
  const related = services.filter((s) => location.relatedServiceSlugs.includes(s.slug));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Starlink installation ${location.name}`,
    serviceType: "Starlink installation",
    description: location.metaDescription,
    areaServed: { "@type": "City", name: location.name, containedInPlace: { "@type": "Country", name: "Nigeria" } },
    provider: {
      "@type": "Organization",
      name: "DataGram",
      url: SITE_URL,
      telephone: "+2349060976424",
    },
    url: `${SITE_URL}${path}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: location.name, item: `${SITE_URL}${path}` },
    ],
  };

  const localFaqs = [
    {
      q: `How fast can DataGram survey Starlink in ${location.name}?`,
      a: "Most surveys are booked within a few business days depending on roof access and weather. WhatsApp your address and photos for the fastest slot.",
    },
    {
      q: `Does DataGram handle estates and landlords in ${location.name}?`,
      a: "Yes. We prepare simple scope notes you can share with facility managers and follow approved routing paths for drilling and cable trays.",
    },
    {
      q: "Can businesses request after-hours installation?",
      a: "We schedule commercial windows when estates require night work or when downtime must be minimized. Mention SLA needs when you contact us.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="flex flex-col">
      <Seo
        title={location.title}
        description={location.metaDescription}
        canonical={path}
        schema={[serviceSchema, breadcrumb, faqSchema]}
        keywords={[
          `Starlink installation ${location.name}`,
          "Starlink installer Nigeria",
          "buy Starlink Nigeria",
          "Starlink setup Nigeria",
        ]}
      />
      <article>
        <section className="border-b bg-muted/30 py-14 md:py-20">
          <div className="container max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{location.regionLabel}</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">{location.headline}</h1>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">{location.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">Request install in {location.name}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/faq">Read Nigeria FAQ</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container max-w-3xl space-y-10">
            {location.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
                <div className="mt-3 space-y-4 text-base leading-relaxed text-foreground/80">
                  {section.paragraphs.map((p, i) => (
                    <p key={`${section.heading}-${i}`}>{p}</p>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h2 className="text-2xl font-bold tracking-tight">Popular services in {location.name}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/80">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link className="text-primary underline-offset-4 hover:underline" to={`/services/${s.slug}`}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-xl font-bold">Quick answers for {location.name}</h2>
              <dl className="mt-4 space-y-4">
                {localFaqs.map((item) => (
                  <div key={item.q}>
                    <dt className="font-semibold">{item.q}</dt>
                    <dd className="mt-1 text-sm text-foreground/75">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="text-sm text-foreground/70">
              Official Starlink specs and subscription classes change over time. We cite Starlink documentation during commissioning and recommend verifying plan details at{" "}
              <a className="text-primary underline-offset-4 hover:underline" href="https://www.starlink.com" target="_blank" rel="noreferrer">
                starlink.com
              </a>{" "}
              before activating new hardware.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
