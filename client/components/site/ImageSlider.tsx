import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider({
  images,
  variant = "carousel",
}: {
  images: string[];
  variant?: "carousel" | "background";
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 300);
    return () => clearInterval(id);
  }, [images.length]);

  useEffect(() => {
    if (variant === "carousel") {
      const el = containerRef.current;
      if (!el) return;
      const child = el.children[index] as HTMLElement | undefined;
      if (child) {
        child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [index, variant]);

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }
  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  if (variant === "background") {
    return (
      <div className="relative h-full w-full overflow-hidden">
        {images.map((src, i) => (
          <div
            key={src + i}
            className={`absolute inset-0 z-0 transition-opacity duration-300 ease-[cubic-bezier(.22,.9,.33,1)] ${i === index ? "opacity-100" : "opacity-0"}`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-8 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-foreground/30"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 scrollbar-none"
        aria-live="polite"
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            className="snap-center shrink-0 w-full sm:w-[420px] md:w-[520px] lg:w-[560px] rounded-xl border bg-card p-0 shadow-md"
          >
            <img src={src} alt={`Slide ${i + 1}`} className="h-64 w-full object-cover rounded-xl" />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        aria-label="Previous"
        className="fixed md:absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur hover:bg-background z-50 transition-none [&:hover]:translate-y-0"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={next}
        aria-label="Next"
        className="fixed md:absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur hover:bg-background z-50 transition-none [&:hover]:translate-y-0"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-foreground/30"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
