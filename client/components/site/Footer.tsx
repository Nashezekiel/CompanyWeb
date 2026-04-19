import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BRAND_NAME,
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_E164,
  LEGAL_BUSINESS_NAME,
} from "@/lib/site";

export default function Footer() {
  return (
    <section className="mx-4 my-8 md:mx-8 rounded-2xl border bg-white">
      <div className="w-full rounded-t-2xl bg-[#000080]">
        <div className="container py-16">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                <span className="inline-flex size-2 rounded-full bg-white" />
                Stay in the loop
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl text-white">Subscribe to our newsletter</h2>
              <p className="mt-2 text-base text-white/80">Get updates on new products, services, and connectivity tips. No spam.</p>
            </div>
            <div className="w-full md:ml-auto md:justify-end flex">
              <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                <Input type="email" placeholder="Enter your email" className="w-full sm:w-auto flex-1 bg-white/95 text-[#000080] placeholder:text-[#000080]/60" />
                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t rounded-b-2xl bg-white">
        <div className="container grid gap-8 py-12 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <img src="/starlinklogo.png" alt={`${BRAND_NAME} logo`} className="h-8 w-auto" />
              <div className="font-extrabold leading-tight">
                <span className="tracking-tight">{BRAND_NAME}</span>
              </div>
            </div>
            <p className="text-sm text-foreground/70 max-w-sm">
              {LEGAL_BUSINESS_NAME} delivers Starlink installation Nigeria-wide, hardware procurement, enterprise WiFi, WISP
              enablement, and resilient backup power for homes and businesses.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://facebook.com/datagramnetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/datagramnetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <Link className="hover:text-foreground transition-colors" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/guide/starlink-nigeria">
                  Starlink Nigeria guide
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/locations">
                  Service cities
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/gallery">
                  Installation gallery
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/admin/login">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <Link className="hover:text-foreground transition-colors" to="/services/sales-installation">
                  Starlink sales & installation
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/services/whole-premises">
                  Whole-premises WiFi
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/services/long-range">
                  Long-range WiFi
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/services/wisp-setup">
                  WISP business setup
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" to="/services/enterprise-plans">
                  Enterprise internet plans
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Contact Us</h3>
            <address className="not-italic space-y-2 text-sm text-foreground/80">
              <p className="font-semibold text-foreground">{LEGAL_BUSINESS_NAME}</p>
              <p>
                {BUSINESS_ADDRESS.streetAddress}
                <br />
                {BUSINESS_ADDRESS.addressLocality}, {BUSINESS_ADDRESS.addressRegion} {BUSINESS_ADDRESS.postalCode}
                <br />
                {BUSINESS_ADDRESS.addressCountry === "NG" ? "Nigeria" : BUSINESS_ADDRESS.addressCountry}
              </p>
              <p>
                Phone:{" "}
                <a className="hover:text-foreground transition-colors" href={`tel:${BUSINESS_PHONE_E164}`}>
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              </p>
              <p>
                Email:{" "}
                <a className="hover:text-foreground transition-colors" href={`mailto:${BUSINESS_EMAIL}`}>
                  {BUSINESS_EMAIL}
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a className="hover:text-foreground transition-colors" href="https://wa.me/2349060976424" target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </p>
              <p>Hours: Mon–Sat, 08:00–18:00 (WAT)</p>
            </address>
          </div>
        </div>

        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-center gap-3 text-xs text-foreground/60 text-center">
            <p>
              © {new Date().getFullYear()} {LEGAL_BUSINESS_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
