import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useInView from "@/hooks/use-inview";
import { useState, useEffect } from "react";
import { Wifi } from "lucide-react";
import Seo from "@/components/Seo";

export default function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [viewportServices, setViewportServices] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      // Check for services in viewport
      services.forEach(service => {
        const element = document.getElementById(`service-${service.id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
          
          setViewportServices(prev => {
            const newSet = new Set(prev);
            if (isInViewport) {
              newSet.add(service.id);
            } else {
              newSet.delete(service.id);
            }
            return newSet;
          });
        }
      });

      // Auto-expand the first service in viewport
      const firstInViewport = Array.from(viewportServices)[0];
      if (firstInViewport && !expandedService) {
        setExpandedService(firstInViewport);
      }

      // Collapse if service is out of viewport
      if (expandedService) {
        const element = document.getElementById(`service-${expandedService}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (!isVisible) {
            setExpandedService(null);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expandedService, viewportServices]);

  return (
    <section className="relative py-20">
      <Seo
        title="Starlink Internet Services & Installation Plans in Nigeria"
        description="Explore Starlink internet services, installation plans, and connectivity solutions in Nigeria, including long-range WiFi, WISP setups, enterprise networks, and backup power."
        canonical="/services"
        keywords={[
          "Starlink services Nigeria",
          "Starlink installation plans",
          "Enterprise WiFi Nigeria",
          "Starlink backup power",
        ]}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mx-auto mb-3 w-fit rounded-full border bg-background/60 px-3 py-1 text-sm text-foreground/70 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            Reliable connectivity for home and business
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Internet Services Built For Speed
          </h1>
          <p className="mt-3 text-base text-foreground/70">
            Explore fast, secure and scalable plans backed by modern network infrastructure.
          </p>
        </div>

        <div className="mx-auto mb-10 max-w-4xl text-center text-foreground/80">
          <p>
            Our certified engineers deploy Starlink hardware, extend WiFi across estates, design WISP infrastructure, and
            keep enterprise links online with redundant power. Each service below includes a project discovery session plus
            optional managed support so estates, resorts, oil &amp; gas sites, and campuses stay connected.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              to="/products"
              className="rounded-xl border bg-card/70 px-4 py-3 text-sm font-semibold text-primary hover:shadow-md"
            >
              Browse Starlink Hardware
            </Link>
            <Link
              to="/blog"
              className="rounded-xl border bg-card/70 px-4 py-3 text-sm font-semibold text-primary hover:shadow-md"
            >
              Read Deployment Guides
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border bg-card/70 px-4 py-3 text-sm font-semibold text-primary hover:shadow-md"
            >
              Request Network Audit
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-6xl space-y-8">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedService === service.id;
            return (
              <ServiceSection 
                key={service.id} 
                service={service} 
                imageLeft={!isEven}
                isExpanded={isExpanded}
                onToggle={() => setExpandedService(isExpanded ? null : service.id)}
              />
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-3 text-foreground/70">
            Not sure which plan fits best? Get a tailored recommendation or compare <Link className="text-primary underline" to="/products">Starlink hardware</Link> options.
          </p>
          <Button asChild>
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServiceSection({ 
  service, 
  imageLeft, 
  isExpanded, 
  onToggle 
}: { 
  service: any; 
  imageLeft: boolean; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div 
      id={`service-${service.id}`}
      ref={ref as any}
      className={`transition-all duration-500 ease-in-out reveal ${inView ? "in-view" : ""}`}
   >
      <div className={`group grid items-stretch gap-6 rounded-xl border bg-background/50 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md supports-[backdrop-filter]:bg-background/70 lg:grid-cols-2 lg:gap-8 lg:p-6`}>
        <div className={`${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted/30 flex items-center justify-center">
            {service.image ? (
              <>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = ''; // Clear the broken image
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Wifi className="h-12 w-12 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">Service Image</p>
              </div>
            )}
            <div className="hidden absolute inset-0 flex items-center justify-center bg-muted/50">
              <Wifi className="h-12 w-12 text-muted-foreground/50" />
            </div>
          </div>
        </div>
        
        <div className={`${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="flex h-full flex-col justify-center">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-primary/10 text-primary">
                <Wifi className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{service.title}</h3>
            </div>
            <p className="mb-4 text-base leading-relaxed text-foreground/80">
              {service.short}
            </p>

            {service.highlights && service.highlights.length > 0 && (
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Key Features</h4>
                <ul className="flex flex-wrap gap-2">
                  {service.highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="rounded-full border bg-muted/30 px-3 py-1 text-sm text-foreground/80">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto pt-1">
              <p className="text-sm leading-relaxed text-foreground/70">{service.description}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link to={`/contact?service=${encodeURIComponent(service.id)}`}>Get connected</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
