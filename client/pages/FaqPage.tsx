import { useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { comprehensiveFaqs } from "@/data/faq-comprehensive";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";

export default function FaqPage() {
  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: comprehensiveFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    }),
    []
  );

  const breadcrumb = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
      ],
    }),
    []
  );

  return (
    <div className="flex flex-col">
      <Seo
        title="Starlink Nigeria FAQ | Costs, Install Time, Coverage | DataGram"
        description="Answers to Starlink installation Nigeria questions: pricing, timelines, weather, business use, and DIY vs pro installs. DataGram—get a free site survey today."
        canonical="/faq"
        schema={[faqSchema, breadcrumb]}
      />
      <section className="border-b bg-muted/40 py-14 md:py-20">
        <div className="container max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Answer-first help</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Starlink in Nigeria: clear answers for buyers and businesses
          </h1>
          <p className="mt-4 text-lg text-foreground/75">
            These questions mirror how people search and speak on mobile—cost, time, coverage, weather, and what is included. Each answer is concise enough for assistants yet detailed enough to be useful.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/contact">Book a survey</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/guide/starlink-nigeria">Read the full Nigeria guide</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
          <p className="mt-2 text-sm text-foreground/70">
            Looking for city-specific context? Visit{" "}
            <Link className="text-primary underline-offset-4 hover:underline" to="/locations">
              service locations
            </Link>{" "}
            or browse{" "}
            <Link className="text-primary underline-offset-4 hover:underline" to="/services">
              installation services
            </Link>
            .
          </p>
          <Accordion type="single" collapsible className="mt-8 w-full rounded-2xl border bg-card p-2">
            {comprehensiveFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="rounded-xl border-none px-2">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-foreground/80">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
