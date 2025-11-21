import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/site/ProductCard";
import HowToGetDeviceSection from "@/components/site/HowToGetDevice";
import { useEffect, useRef, useState } from "react";

export default function ProductsTeaser() {
  const featured = products.slice(0, 3);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.querySelector('[data-slide]') as HTMLElement | null;
      const cardW = first?.offsetWidth ?? 280;
      const gap = 16; // gap-4
      const idx = Math.round(el.scrollLeft / (cardW + gap));
      setActive(Math.max(0, Math.min(featured.length - 1, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [featured.length]);

  const goTo = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector('[data-slide]') as HTMLElement | null;
    const cardW = first?.offsetWidth ?? el.clientWidth;
    const gap = 16;
    el.scrollTo({ left: idx * (cardW + gap), behavior: 'smooth' });
    setActive(idx);
  };
  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(featured.length - 1, active + 1));
  return (
    <section className="w-full bg-[#000080]">
      <div className="container py-16">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-white">Our Products</h2>
          <p className="mt-2 text-white/80">We supply Starlink dishes, mounts, and accessories. Professional installation options available.</p>
        </div>
        <div ref={scrollerRef} className="relative mx-auto max-w-[1100px] flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-6 xl:gap-8 md:overflow-visible md:items-stretch">
          {featured.map((p) => (
            <div key={p.id} data-slide className="min-w-full snap-center md:min-w-0 md:w-auto h-full">
              <ProductCard product={p} iconActions />
            </div>
          ))}
        </div>
        {/* Mobile controls + dots */}
        <div className="mt-3 flex items-center justify-center gap-2 md:hidden" aria-label="Products pagination">
          {featured.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 w-2 min-h-0 min-w-0 p-0 rounded-full transition-all ${i === active ? 'bg-primary' : 'bg-foreground/30'}`}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>

        {/* Embedded How To Get Your Device section */}
        <div className="mt-12">
          <HowToGetDeviceSection inline />
        </div>
      </div>
    </section>
  );
}
