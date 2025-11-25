import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Antenna, Cog, ShieldCheck, Satellite, SignalHigh, Wifi, HelpCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductsTeaser from "@/components/site/ProductsTeaser";
import BlogTeaser from "@/components/site/BlogTeaser";
import SpotlightCard from "@/components/site/SpotlightCard";
import LogoLoop from "@/components/site/LogoLoop";
import { useEffect, useRef, useState } from "react";
import useInView from "@/hooks/use-inview";
import Seo from "@/components/Seo";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

const HOME_STATS: StatItem[] = [
  { value: 1000, suffix: "+", label: "Installations Completed" },
  { value: 10, suffix: "km", label: "WiFi Reach" },
  { value: 99.9, suffix: "%", label: "Uptime Targets", decimals: 1 },
  { value: 24, suffix: "/7", label: "Support Availability" },
];

const PARTNER_LOGOS = [
  "Starlink",
  "Installation",
  "Connectivity",
  "Broadband",
  "Satellite",
  "Internet",
  "Network",
  "Hardware",
  "Activation",
  "Coverage",
  "Speed",
  "Uplink",
  "Downlink",
  "Alignment",
  "Precision",
  "Configuration",
].map((label) => ({
  node: <span className="font-extrabold text-black text-base md:text-lg">{label}</span>,
  title: label,
}));

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo
        title="Starlink Installation & Internet Connection in Nigeria | Starlink Installation & Services"
        description="Get Starlink devices, professional installation, and reliable internet connection anywhere in Nigeria. We design and deploy Starlink, WiFi, and connectivity solutions for homes, businesses, NGOs, and remote sites."
      />
      <Hero />
      <section className="pt-2 pb-6 md:pt-6">
        <div className="container">
          <LogoLoop
            logos={PARTNER_LOGOS}
            speed={80}
            direction="right"
            logoHeight={40}
            gap={50}
            pauseOnHover={true}
            fadeOut
            fadeOutColor="#ffffff"
            scaleOnHover
            ariaLabel="Starlink and partner logos"
          />
        </div>
      </section>
      <section aria-label="Highlights band" className="relative mt-6 md:mt-6" style={{ backgroundColor: "whitesmoke" }}>
        <FinalCTA />
        <Stats />
      </section>
      <ProductsTeaser />
      <BlogTeaser />
      <Testimonials />
      <FAQ />
    </div>
  );
}

function Hero() {
  const slides = [
    {
      src: "/images/products/starlink-flat-hp/FlatHighperformanceversion.jpeg",
      title: "Enterprise-grade connectivity",
      text: "High-speed backbones, long-range WiFi up to 10km, and 24/7 backup power systems for mission-critical uptime.",
      object: "center top",
    },
    {
      src: "/images/products/starlink-gen3v4/StandardDish1.jpeg",
      title: "Professional installation",
      text: "Site survey, precision mounting, weatherproof cabling, and commissioning by certified engineers.",
      object: "center top",
    },
    {
      src: "/images/products/starlink-mini/starlink.jpeg",
      title: "Starlink distribution",
      text: "Procurement, activation, and nationwide support for homes, businesses, and remote operations.",
      object: "center center",
    },
  ];

  const [idx, setIdx] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [panelExpanded, setPanelExpanded] = useState(false);

  const setSlideTo = (target: number) => {
    // Start cover/expand animation and hide text/content
    setTextVisible(false);
    setPanelExpanded(true);

    // After expansion, switch image and collapse, then reveal text with entrance animations
    window.setTimeout(() => {
      setIdx(((target % slides.length) + slides.length) % slides.length);
      setPanelExpanded(false);
      // Wait for collapse to finish before showing text
      window.setTimeout(() => {
        setTextVisible(true);
      }, 450);
    }, 500);
  };

  useEffect(() => {
    const id = setInterval(() => setSlideTo(idx + 1), 7000);
    return () => clearInterval(id);
  }, [idx]);

  const prev = () => setSlideTo(idx - 1);
  const next = () => setSlideTo(idx + 1);
  const goTo = (i: number) => setSlideTo(i);

  return (
    <section
      id="home"
      className="relative overflow-hidden h-[90vh] md:h-screen flex items-stretch pb-[env(safe-area-inset-bottom)]"
    >

      {/* Full-bleed container: 65% image pane + 40% text overlay reaching right edge */}
      <div className="relative z-10 flex-1 w-full">
        <div className="relative h-full w-full md:flex md:items-stretch">
          {/* Left image slider pane (65%) */}
          <div className="relative h-full w-full overflow-hidden md:h-full md:w-[65%] md:order-none order-last">
            {slides.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.title}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${i === idx ? "opacity-100" : "opacity-0"}`}
                style={{ objectPosition: s.object }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40" />

            <div className="absolute inset-0 md:hidden flex items-stretch">
              <div className="relative my-0 mx-0 h-full w-full rounded-none border-none bg-sky-500/10 p-5 text-white backdrop-blur-[1px] shadow-xl transition-all flex flex-col">
                <div className="mb-3 mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs">
                  <Satellite className="h-4 w-4" /> Starlink Installation & Services
                </div>
                <h1 className={`font-display mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight transition-all duration-700 ease-in-out ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                  {slides[idx].title}
                </h1>
                <p className={`mt-4 pt-2 max-w-xs text-base text-white/85 transition-all duration-700 ease-in-out ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                  {slides[idx].text}
                </p>
                <div className={`mt-20 flex flex-wrap items-center gap-3 transition-all duration-700 ease-in-out ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <Button asChild className="h-11 px-6 text-base transition-all hover:scale-105">
                    <Link to="/contact">Get Connected</Link>
                  </Button>
                  <Button asChild className="h-11 px-6 text-base bg-white text-blue-900 hover:bg-white/90 border-none transition-all hover:scale-105">
                    <Link to="/services">Explore Services</Link>
                  </Button>
                </div>
                {/* Mobile navigation arrows */}
                <div className="md:hidden absolute left-3 bottom-4 flex items-center gap-3">
                  <button
                    aria-label="Previous slide"
                    onClick={prev}
                    className="inline-flex h-9 w-9 items-center justify-center text-white no-lift no-transition"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    aria-label="Next slide"
                    onClick={next}
                    className="inline-flex h-9 w-9 items-center justify-center text-white no-lift no-transition"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Left arrow inside image slider (hover changes bg only) */}
            <button
              aria-label="Previous slide"
              onClick={prev}
              className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-none [&:hover]:translate-y-0 no-lift no-transition"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          {/* Text panel (40%). On mobile it appears above the slider */}
          <div
            className={`relative md:absolute md:inset-y-0 md:right-0 w-full ${panelExpanded ? "md:w-full" : "md:w-[40%]"} hidden md:flex items-stretch md:order-none order-first transition-all duration-500 ease-in-out z-20`}
          >
            <div className="relative my-8 md:my-0 h-full w-full rounded-none border border-white/10 bg-[#000080] p-6 md:p-10 pt-8 md:pt-12 text-white backdrop-blur-md shadow-xl transition-all flex flex-col overflow-hidden">
              <div className={`mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs transition-all duration-300 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
              >
                <Satellite className="h-4 w-4" /> Starlink Installation & Services
              </div>
              <h1 className={`font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight transition-all duration-500 ease-in-out ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
                {slides[idx].title}
              </h1>
              <p className={`mt-4 text-base text-white/80 transition-all duration-500 ease-in-out ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
                {slides[idx].text}
              </p>
              <div className={`mt-auto mb-16 flex flex-wrap items-center gap-3 transition-all duration-500 ease-in-out ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <Button asChild className="h-12 px-6 text-base transition-all hover:scale-105">
                  <Link to="/contact">Get Connected</Link>
                </Button>
                <Button asChild className="h-12 px-6 text-base bg-white text-blue-900 hover:bg-white/90 border-none transition-all hover:scale-105">
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>

              {/* Dots anchored to bottom of text card */}
              <div className={`mt-auto pt-6 flex items-center gap-2 absolute left-6 bottom-5 transition-opacity duration-300 ${textVisible ? 'opacity-100' : 'opacity-0'}`}>
                {slides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2 w-2 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "bg-white/50 hover:bg-white/70"}`}
                  />
                ))}
              </div>

              {/* Right arrow on panel (hover changes bg only) */}
              <button
                aria-label="Next slide"
                onClick={next}
                className={`hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-opacity duration-200 [&:hover]:translate-y-0 no-lift no-transition ${textVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      {icon}
      <span className="text-sm">{title}</span>
    </div>
  );
}

function ServiceRotator() {
  const items = [
    { title: "Starlink distribution", subtitle: "Procurement, activation, and nationwide support for homes and businesses" },
    { title: "Professional installation", subtitle: "Site survey, precision mounting, weatherproof cabling, and commissioning" },
    { title: "Enterprise WiFi solutions", subtitle: "Campus-wide coverage, seamless roaming, and secure guest access" },
    { title: "WISP enablement", subtitle: "Backhaul design, tower deployment, CPE rollout, and billing integration" },
    { title: "Managed networks", subtitle: "24/7 monitoring, SLAs, proactive maintenance, and remote support" },
    { title: "Backup power systems", subtitle: "Hybrid inverters, lithium batteries, solar sizing, and uptime engineering" },
  ];
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length);
        setVisible(true);
      }, 400);
    }, 4500);
    return () => clearInterval(id);
  }, []);
  const current = items[idx];
  return (
    <div className="my-4 flex items-center justify-center">
      <div className={`rounded-[3px] border border-white/10 bg-white/5 px-6 py-4 text-center transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
        <div className="text-sm font-medium text-white/95">{current.title}</div>
        <div className="text-xs text-white/70">{current.subtitle}</div>
      </div>
    </div>
  );
}

function Stats() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.35 });
  const [counts, setCounts] = useState<number[]>(() => HOME_STATS.map(() => 0));
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!inView) return;

    const duration = 1500;
    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);
      setCounts(HOME_STATS.map((stat) => stat.value * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [inView]);

  const formatValue = (value: number, stat: StatItem) => {
    const clamped = Math.min(stat.value, value ?? 0);
    if (stat.decimals && stat.decimals > 0) {
      return clamped.toFixed(stat.decimals);
    }
    return Math.round(clamped).toString();
  };

  return (
    <section ref={ref} className="pt-12 pb-20 md:pt-16 md:pb-24">
      <div className="container grid gap-6 md:grid-cols-4 md:gap-8">
        {HOME_STATS.map((stat, idx) => {
          const currentValue = counts[idx] ?? 0;
          return (
            <div key={stat.label} className="text-center space-y-2">
              <div className="text-3xl font-extrabold text-[#000080]">
                {formatValue(currentValue, stat)}
                {stat.suffix}
              </div>
              <div className="text-sm font-medium text-[#000080]">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


import { faqs } from "@/data/faq";
import { testimonials as initialTestimonials } from "@/data/testimonials";

function Testimonials() {
  const [testimonials, setTestimonials] = useState< { quote: string; name: string; role?: string; company?: string; rating?: number }[] | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) {
          setTestimonials(initialTestimonials);
          return;
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(initialTestimonials);
        }
      } catch {
        setTestimonials(initialTestimonials);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !testimonials) return;
    const onScroll = () => {
      const first = el.querySelector('[data-slide]') as HTMLElement | null;
      const cardW = first?.offsetWidth ?? el.clientWidth;
      const gap = 16;
      const idx = Math.round(el.scrollLeft / (cardW + gap));
      setActive(Math.max(0, Math.min(testimonials.length - 1, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [testimonials]);

  if (!testimonials) return null;

  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-2 text-sm text-primary">
            <span className="inline-flex size-2 rounded-full bg-primary" />
            Client Testimonials
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            Trusted by <span className="text-primary">Leading Organizations</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Technical excellence and reliable delivery across regions. See what our clients say about our services.
          </p>
        </div>
        <div
          ref={scrollerRef}
          className="mx-auto max-w-[1100px] flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center md:gap-[20px] md:overflow-visible"
        >
          {testimonials.map((t, index) => (
            <div key={t.name} data-slide className="min-w-full snap-center md:min-w-0 md:w-[300px]">
              <figure
                className="group rounded-2xl border bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`h-4 w-4 ${i < (t.rating ?? 5) ? 'fill-yellow-400' : 'fill-muted/30'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
                <blockquote className="text-foreground/80 text-base leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-foreground/70">{t.role}</div>
                    <div className="text-xs text-primary">{t.company}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
          {/* Mobile overlay arrows */}
          <button
            aria-label="Previous"
            onClick={() => {
              const target = Math.max(0, active - 1);
              const el = scrollerRef.current;
              if (!el) return;
              const first = el.querySelector('[data-slide]') as HTMLElement | null;
              const cardW = first?.offsetWidth ?? el.clientWidth;
              const gap = 16;
              el.scrollTo({ left: target * (cardW + gap), behavior: 'smooth' });
              setActive(target);
            }}
            className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={() => {
              if (!testimonials) return;
              const target = Math.min(testimonials.length - 1, active + 1);
              const el = scrollerRef.current;
              if (!el) return;
              const first = el.querySelector('[data-slide]') as HTMLElement | null;
              const cardW = first?.offsetWidth ?? el.clientWidth;
              const gap = 16;
              el.scrollTo({ left: target * (cardW + gap), behavior: 'smooth' });
              setActive(target);
            }}
            className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        {/* Mobile dots */}
        <div className="mt-3 flex items-center justify-center gap-2 md:hidden" aria-label="Testimonials pagination">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                const el = scrollerRef.current;
                if (!el) return;
                const first = el.querySelector('[data-slide]') as HTMLElement | null;
                const cardW = first?.offsetWidth ?? el.clientWidth;
                const gap = 16;
                el.scrollTo({ left: i * (cardW + gap), behavior: 'smooth' });
                setActive(i);
              }}
              className={`h-2 w-2 min-h-0 min-w-0 p-0 rounded-full transition-all ${i === active ? 'bg-primary' : 'bg-foreground/30'}`}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}

 

function FAQ() {
  const [faqData, setFaqData] = useState(faqs);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/faqs");
        if (!res.ok) {
          setFaqData(faqs);
          return;
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setFaqData(data);
        } else {
          setFaqData(faqs);
        }
      } catch {
        setFaqData(faqs);
      }
    };

    load();
  }, []);

  const filtered = faqData.filter((f) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
  });

  return (
    <section className="relative py-20">
      <div className="container max-w-4xl">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-2 text-sm text-primary">
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Everything you need to know</h2>
          <p className="mt-3 text-base text-foreground/70">Answers about Starlink hardware, installation, enterprise WiFi, and support.</p>
        </div>

        <div className="mx-auto mb-6 max-w-2xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="pl-9"
            />
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full rounded-2xl border bg-card/60 p-2 backdrop-blur supports-[backdrop-filter]:bg-card/70">
          {filtered.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="rounded-xl border-none px-2">
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-sm text-foreground/60">No results. Try a different keyword.</div>
          )}
        </Accordion>
      </div>
    </section>
  );
}


function FinalCTA() {
  return (
    <section className="relative py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-r from-cyan-400/30 via-blue-500/25 to-indigo-500/30 blur-2xl"
              aria-hidden
            />
            <SpotlightCard
              className="relative mx-auto max-w-3xl text-center p-10 md:p-12 bg-[#000080] bg-none"
              spotlightColor="rgba(0, 229, 255, 0.35)"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Get Starlink devices and professional installation in Nigeria
              </h3>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-white/80">
                We supply Starlink hardware, handle installation, and set up reliable connectivity for homes, businesses, and remote sites across Nigeria.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link to="/contact">Get Started</Link>
                </Button>
                <Button asChild className="bg-white text-blue-900 hover:bg-white/90">
                  <Link to="/services">See Solutions</Link>
                </Button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
