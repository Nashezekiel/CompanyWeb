import { useParams, Link } from "react-router-dom";
import { products as staticProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/site/ProductCard";
import useInView from "@/hooks/use-inview";
import { useEffect, useMemo, useState } from "react";
import { getStored } from "@/lib/storage";
import Seo from "@/components/Seo";
import { BRAND_NAME, SITE_URL } from "@/lib/site";

export default function ProductDetail() {
  const { slug } = useParams();
  const [products, setProducts] = useState(staticProducts);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const stored = getStored("adminProducts", staticProducts);
    // Union static + stored by slug, preferring stored values but keeping latest images from static
    const bySlug: Record<string, any> = {};
    staticProducts.forEach((s) => {
      bySlug[s.slug] = { ...s };
    });
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

  const product = products.find((p) => p.slug === slug);
  const otherProducts = products.filter((p) => p.slug !== slug);
  const canonicalPath = product ? `/products/${product.slug}` : undefined;

  const productSchema = useMemo(() => {
    if (!product) return null;
    const priceValue = parseFloat((product.price ?? "").replace(/[^\d.]/g, ""));
    const images = product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : undefined;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      sku: product.id,
      image: images,
      brand: {
        "@type": "Brand",
        name: "Starlink",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "NGN",
        availability: "https://schema.org/InStock",
        price: Number.isFinite(priceValue) ? priceValue.toString() : undefined,
        url: `${SITE_URL}${canonicalPath}`,
        seller: {
          "@type": "Organization",
          name: BRAND_NAME,
        },
      },
    };
  }, [canonicalPath, product]);

  if (!product) {
    return (
      <div className="container py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="mt-4 text-foreground/70">We couldn't find the requested product.</p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Seo
        title={`${product.name} | Buy Starlink Nigeria | ${BRAND_NAME}`}
        description={product.short ?? product.description}
        canonical={canonicalPath}
        image={product.images?.[0] ?? product.image}
        type="product"
        keywords={[product.name, product.short ?? "", "Starlink Nigeria", "Starlink installation"]}
        schema={productSchema ?? undefined}
      />
      <section className="py-16">
        <div className="container grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-2 text-3xl font-extrabold">{product.name}</h1>
            <div className="mb-4 text-lg font-bold text-primary">{product.price}</div>
            <p className="mb-6 text-foreground/70">{product.description}</p>

            <h3 className="mb-2 text-xl font-semibold">Key Specifications</h3>
            <dl className="mb-6 grid grid-cols-1 gap-2 md:grid-cols-2">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="rounded-md border bg-card p-3">
                  <dt className="text-sm font-medium text-foreground/70">{k}</dt>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mb-2 text-xl font-semibold">What's in the box</h3>
            <ul className="mb-6 list-disc pl-5 text-foreground/80">
              {product.whatsInBox.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>

            <div className="rounded-md border bg-card p-4">
              <h4 className="mb-2 font-semibold">Installation & Support</h4>
              <p className="mb-4 text-foreground/70">{product.installationAvailable}</p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link to="/contact">Request Installation</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Order & Quote</Link>
                </Button>
              </div>
            </div>
          </div>

          <aside className="rounded-md border bg-card p-4">
            <div className="mb-4">
              <img
                src={product.images?.[currentImageIdx] || product.image}
                alt={product.name}
                className="mb-2 w-full rounded-md object-cover"
              />
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentImageIdx(i)}
                      className={`rounded border overflow-hidden ${i === currentImageIdx ? "ring-2 ring-primary" : ""}`}
                    >
                      <img src={url} alt={`thumb-${i}`} className="h-16 w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="mb-4 text-sm text-foreground/70">Representative image</div>
            <div className="text-sm text-foreground/80">Price: <span className="font-semibold">{product.price}</span></div>
          </aside>
        </div>
      </section>

      {/* Other Products Section */}
      {otherProducts.length > 0 && (
        <section className="py-16 bg-background/80">
          <div className="container">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Other Products</h2>
              <p className="text-foreground/80">Explore our other Starlink hardware and accessories.</p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {otherProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild>
                <Link to="/products" className="text-foreground">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
