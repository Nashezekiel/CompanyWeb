import { useParams, Link } from "react-router-dom";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

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
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    areaServed: "Nigeria",
    provider: {
      "@type": "LocalBusiness",
      name: "Starlink Installation & Services",
      url: "https://www.starlinknetworkservice.ng",
    },
    serviceType: "Starlink installation",
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      availability: "https://schema.org/Available",
      url: `https://www.starlinknetworkservice.ng${canonicalPath}`,
    },
  };

  return (
    <section className="py-16">
      <Seo
        title={`${service.title} | Starlink Installation Service Nigeria`}
        description={service.short ?? service.description}
        canonical={canonicalPath}
        image={service.image}
        type="service"
        keywords={[service.title, "Starlink services Nigeria", "Starlink installer"]}
        schema={serviceSchema}
      />
      <div className="container grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="mb-4 text-3xl font-extrabold">{service.title}</h1>
          <p className="mb-6 text-lg text-foreground/70">{service.description}</p>
          {service.highlights && (
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-semibold">Highlights</h3>
              <ul className="list-disc pl-5 text-foreground/80">
                {service.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-md border bg-card p-4">
            <h4 className="mb-2 font-semibold">Contact our team for a custom quote</h4>
            <p className="mb-4 text-foreground/70">Provide project scope, location, and preferred timeline.</p>
            <Button asChild>
              <Link to="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>

        <aside className="rounded-md border bg-card p-4">
          <img src={service.image} alt={service.title} className="mb-4 w-full rounded-md object-cover" />
          <div className="text-sm text-foreground/70">Representative image</div>
        </aside>
      </div>
    </section>
  );
}
