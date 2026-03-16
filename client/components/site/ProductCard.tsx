import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { Phone, MessageCircle, Info } from "lucide-react";

import useInView from "@/hooks/use-inview";

export default function ProductCard({ product, iconActions }: { product: Product; iconActions?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <article
      ref={ref as any}
      className={`group flex h-full min-h-[460px] flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl ${
        inView ? "in-view" : ""
      }`}
    >
      <div className="overflow-hidden">
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-56"
        />
      </div>
      <div className="flex flex-1 flex-col bg-[#0b1f6b] p-5 text-white">
        <h3 className="text-base font-semibold md:text-xl">{product.name}</h3>
        <p className="mt-2 text-sm text-white/80 flex-1 leading-relaxed md:text-[0.85rem]">{product.short}</p>
        <div className="mt-4 flex items-center justify-between text-sm md:text-base">
          <span className="text-lg font-semibold text-white md:text-[0.95rem]">{product.price}</span>
          {product.installationAvailable && (
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-white/75">
              Installation Available
            </span>
          )}
        </div>
        <div className="mt-5 flex gap-3">
          <Button
            asChild
            className="flex-1 border border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            <Link to={`/products/${product.slug}`} className="inline-flex items-center justify-center gap-2">
              <Info className="h-4 w-4" /> Details
            </Link>
          </Button>
          {iconActions ? (
            <>
              <Button
                variant="outline"
                className="h-11 w-12 border-white/40 bg-white/10 p-0 text-white hover:bg-white/20"
              >
                <a href="tel:+2349060976424" aria-label="Call">
                  <Phone className="mx-auto h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-11 w-12 border-white/40 bg-white/10 p-0 text-white hover:bg-white/20"
              >
                <a
                  href={`https://wa.me/2349060976424?text=${encodeURIComponent(
                    `Hello Starlink, I'm interested in ${product.name}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="mx-auto h-4 w-4" />
                </a>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                className="flex-1 border border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <a href="tel:+2349060976424">Call</a>
              </Button>
              <Button
                asChild
                className="flex-1 border border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <a
                  href={`https://wa.me/2349060976424?text=${encodeURIComponent(
                    `Hello Starlink, I'm interested in ${product.name}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
