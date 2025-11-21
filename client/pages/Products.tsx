import ProductCard from "@/components/site/ProductCard";
import { products as staticProducts } from "@/data/products";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getStored } from "@/lib/storage";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Seo from "@/components/Seo";

export default function Products() {
  const [products, setProducts] = useState(staticProducts);

  useEffect(() => {
    const stored = getStored("adminProducts", staticProducts);
    // Union static + stored by slug, preferring stored values but keeping latest images from static
    const bySlug: Record<string, any> = {};
    // start with static to guarantee visibility of built-in products
    staticProducts.forEach((s) => {
      bySlug[s.slug] = { ...s };
    });
    // overlay stored edits and keep image assets from static when missing
    stored.forEach((p: any) => {
      const ref = bySlug[p.slug];
      bySlug[p.slug] = {
        ...(ref || {}),
        ...p,
        image: (ref && ref.image) || p.image,
        images: (p.images && p.images.length ? p.images : ref?.images) || p.images,
      };
    });
    setProducts(Object.values(bySlug));
  }, []);

  return (
    <section className="relative py-16 overflow-hidden">
      <Seo
        title="Starlink Devices & Accessories in Nigeria | Starlink Products"
        description="Browse Starlink devices and accessories available in Nigeria, including dishes and hardware we supply and install for reliable internet connection across the country."
      />
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/homeImg/seven.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />
      <div className="container relative z-10">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold text-white">Products</h1>
            <p className="mt-2 text-white">Browse Starlink hardware and accessories we supply and install.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
          {products.map((p, index) => (
            <ScrollReveal key={p.id} direction="up" delay={index * 0.1} distance={40}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-8 text-center">
            <p className="mb-3 text-white">Want bulk pricing or enterprise procurement?</p>
            <Button asChild>
              <Link to="/contact">Request a Quote</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
