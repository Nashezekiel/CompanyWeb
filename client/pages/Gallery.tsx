import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { SITE_URL } from "@/lib/site";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

const IMAGES: GalleryImage[] = [
  {
    src: "/images/sales.jpeg",
    alt: "Starlink hardware delivery and professional installation prep in Nigeria by DataGram",
    caption: "Hardware intake, delivery planning, and activation-ready staging.",
  },
  {
    src: "/images/Whole-Premises.jpeg",
    alt: "Whole-premises WiFi coverage design after Starlink backhaul in Nigeria",
    caption: "Mesh and access point placement for multi-floor homes and offices.",
  },
  {
    src: "/images/Long-Range.jpeg",
    alt: "Long-range point-to-point wireless link extending Starlink connectivity in Nigeria",
    caption: "Point-to-point links for guard houses, gates, and remote buildings.",
  },
  {
    src: "/images/WIFIWISP.jpeg",
    alt: "WISP and enterprise WiFi backbone powered by Starlink in Nigeria",
    caption: "Operator-focused designs with structured cabling and labeled paths.",
  },
  {
    src: "/images/BackupPower.jpeg",
    alt: "Backup power integration for Starlink uptime during outages in Nigeria",
    caption: "Hybrid inverter and battery systems sized for realistic runtimes.",
  },
  {
    src: "/images/High-Speed.jpeg",
    alt: "High-speed enterprise Starlink deployment with rack-friendly routing in Nigeria",
    caption: "Enterprise throughput testing and documentation for IT teams.",
  },
];

export default function Gallery() {
  const imageObjects = IMAGES.map((img, idx) => ({
    "@type": "ImageObject",
    position: idx + 1,
    contentUrl: `${SITE_URL}${img.src}`,
    description: img.alt,
    name: img.caption,
  }));

  return (
    <div className="flex flex-col">
      <Seo
        title="Starlink Installation Gallery Nigeria | DataGram Field Work"
        description="See representative Starlink installation Nigeria projects: mounting, WiFi extension, backup power, and enterprise routing by DataGram. Book your own survey today."
        canonical="/gallery"
        schema={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "DataGram Starlink installation gallery",
          url: `${SITE_URL}/gallery`,
          image: imageObjects,
        }}
      />
      <section className="border-b bg-muted/40 py-14 md:py-20">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Installation gallery: real Starlink field work across Nigeria
          </h1>
          <p className="mt-4 text-lg text-foreground/75">
            Image search favors descriptive filenames, human alt text, and captions near photos. Replace these representative shots with dated project photos as your library grows—keep alt text specific to city, roof type, and hardware generation.
          </p>
          <p className="mt-3 text-sm text-foreground/70">
            Want the same quality on your site?{" "}
            <Link className="text-primary underline-offset-4 hover:underline" to="/contact">
              Request a survey
            </Link>{" "}
            or read the{" "}
            <Link className="text-primary underline-offset-4 hover:underline" to="/guide/starlink-nigeria">
              full Nigeria guide
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-8 md:grid-cols-2">
          {IMAGES.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <img src={img.src} alt={img.alt} className="h-64 w-full object-cover" loading="lazy" width="800" height="520" />
              <figcaption className="space-y-2 px-4 py-3 text-sm text-foreground/80">
                <span className="font-semibold text-foreground">{img.caption}</span>
                <span className="block text-xs text-foreground/60">{img.alt}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
