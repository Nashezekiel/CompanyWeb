import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-xl border bg-card p-8 text-center shadow-sm">
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight">{title}</h1>
          {description ? (
            <p className="mx-auto mb-6 max-w-2xl text-foreground/70">{description}</p>
          ) : null}
          <p className="mx-auto mb-6 max-w-2xl text-foreground/70">
            Want this page crafted next? Tell me what content and sections you want here.
          </p>
          <Button asChild>
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
