import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
              <img
                src="/starlinklogo.png"
                alt="Starlink Installation & Services logo"
                className="h-8 w-auto"
              />
              <div className="font-extrabold leading-tight">
                <span className="tracking-tight">Starlink Installation & Services</span>
              </div>
            </div>
            <p className="text-sm text-foreground/70 max-w-sm">
              Reliable, Fast, and Global Connectivity. Starlink distribution,
              installation, enterprise networks, and WISP enablement.
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
            <h4 className="mb-3 font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link className="hover:text-foreground transition-colors" to="/about">About</Link></li>
              <li><Link className="hover:text-foreground transition-colors" to="/blog">Blog</Link></li>
              <li><Link className="hover:text-foreground transition-colors" to="/contact">Contact</Link></li>
              <li><Link className="hover:text-foreground transition-colors" to="/admin/login">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>Starlink Sales & Installation</li>
              <li>Whole-Premises WiFi Coverage</li>
              <li>Long-Range WiFi Extension</li>
              <li>WISP Business Setup</li>
              <li>Enterprise Internet Plans</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                Address: <a className="hover:text-foreground transition-colors" href="https://maps.google.com/?q=House%207%2C%20Trunk%20H%2C%20Mandela%20Estate%2C%20SARS%20Road%2C%20Port%20Harcourt%2C%20Rivers%20State%2C%20Nigeria" target="_blank" rel="noreferrer">House 7, Trunk H, Mandela Estate, SARS Road, Port Harcourt, Rivers State, Nigeria</a>
              </li>
              <li>Email: <a className="hover:text-foreground transition-colors" href="mailto:Appdatagram@gmail.com">Appdatagram@gmail.com</a></li>
              <li>Support: <a className="hover:text-foreground transition-colors" href="mailto:Appdatagram@gmail.com">Appdatagram@gmail.com</a></li>
              <li>Hours: Mon–Sat, 8:00–18:00</li>
              <li>
                WhatsApp: <a className="hover:text-foreground transition-colors" href="https://wa.me/2349060976424" target="_blank" rel="noreferrer">0906 097 6424</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-center gap-3 text-xs text-foreground/60 text-center">
            <p>© {new Date().getFullYear()} Starlink Installation & Services LTD. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
