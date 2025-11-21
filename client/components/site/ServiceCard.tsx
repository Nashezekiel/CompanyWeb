import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Service } from "@/data/services";

import useInView from "@/hooks/use-inview";

export default function ServiceCard({ service }: { service: Service }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <article
      ref={ref as any}
      className={`block w-full group rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md reveal ${inView ? "in-view" : ""}`}
    >
      <img src={service.image} alt={service.title} className="mb-4 h-40 w-full rounded-md object-cover" />
      <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
      <p className="mb-4 text-foreground/80">{service.short}</p>
      <ul className="mb-4 list-disc space-y-1 pl-5 text-foreground/80">
        {service.highlights?.slice(0, 3).map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost">
          <Link to={`/services/${service.slug}`}>Learn More</Link>
        </Button>
        <Button asChild>
          <Link to="/contact">Get a Quote</Link>
        </Button>
      </div>
    </article>
  );
}
