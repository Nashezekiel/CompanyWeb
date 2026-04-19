import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { serviceLocations } from "@/data/locations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_URL } from "@/lib/site";

export default function LocationsIndex() {
  const itemList = serviceLocations.map((loc, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: loc.name,
    url: `${SITE_URL}/locations/${loc.slug}`,
  }));

  return (
    <div className="flex flex-col">
      <Seo
        title="Starlink Installation Cities Nigeria | Abuja, Lagos, PH, Kano | DataGram"
        description="City pages for Starlink installation Nigeria: Abuja, Lagos, Port Harcourt, Kano. Local surveys, mounting, mesh WiFi, and enterprise failover by DataGram."
        canonical="/locations"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Starlink installation locations in Nigeria",
          url: `${SITE_URL}/locations`,
          hasPart: {
            "@type": "ItemList",
            itemListElement: itemList,
          },
        }}
      />
      <section className="border-b bg-muted/40 py-14 md:py-20">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Starlink installation across Nigerian cities we serve every week
          </h1>
          <p className="mt-4 text-lg text-foreground/75">
            Local intent searches like “Starlink installation Abuja” or “Starlink installer near me” need pages that name real neighborhoods, safety practices, and how surveys work. Pick your city to read how DataGram handles installs there, then jump to services or contact for a quote.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-6 md:grid-cols-2">
          {serviceLocations.map((loc) => (
            <Card key={loc.slug} className="h-full border bg-card/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">{loc.name}</CardTitle>
                <p className="text-sm text-foreground/70">{loc.regionLabel}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-foreground/80">{loc.intro}</p>
                <Link
                  className="inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  to={`/locations/${loc.slug}`}
                >
                  Read the {loc.name} guide →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
