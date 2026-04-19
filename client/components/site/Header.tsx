import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Home as HomeIcon, Layers, Boxes, FileText, Mail, Phone, MessageCircle, MapPin, Info, ChevronDown, Target, ShieldCheck, Eye, Facebook, Instagram, HelpCircle, BookOpen } from "lucide-react";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { AnimatePresence, motion } from "framer-motion";

const nav = [
  { to: "/", label: "Home", scrollTo: "home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/guide/starlink-nigeria", label: "Nigeria Guide" },
  { to: "/locations", label: "Cities" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [hoveredAbout, setHoveredAbout] = useState<"about" | "mission" | "vision" | "core">("about");
  const [clickedDropdown, setClickedDropdown] = useState<"services" | "products" | "about" | null>(null);
  const [mobileOpen, setMobileOpen] = useState<{ services: boolean; products: boolean; about: boolean }>({ services: false, products: false, about: false });
  const [activeAboutLink, setActiveAboutLink] = useState<string>("");

  // Toggle mobile menu with only one dropdown open at a time
  const toggleMobileMenu = (menu: "services" | "products" | "about") => {
    setMobileOpen(prev => ({
      services: menu === "services" ? !prev.services : false,
      products: menu === "products" ? !prev.products : false,
      about: menu === "about" ? !prev.about : false,
    }));
  };

  const primaryProducts = products.slice(0, 6);

  const handleNavClick = (item: typeof nav[0]) => {
    setOpen(false);
    
    // If we're on the home page and it's a scroll target, scroll to it
    if (location.pathname === "/" && item.scrollTo) {
      const element = document.getElementById(item.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    
    // Otherwise, navigate to the route
    if (item.to !== location.pathname) {
      window.location.href = item.to;
    } else if (item.scrollTo) {
      // If we're already on the page, just scroll
      const element = document.getElementById(item.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleDropdown = (key: "services" | "products" | "about") => {
    setClickedDropdown((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    if (location.pathname === "/about") {
      setActiveAboutLink(location.hash || "about");
    } else {
      setActiveAboutLink("");
    }
  }, [location.pathname, location.hash]);

  const handleAboutNavigation = (hash?: string) => {
    setOpen(false);
    setActiveAboutLink(hash ?? "about");

    const targetId = hash?.replace("#", "") || "introduction";

    if (location.pathname === "/about") {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (!hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      window.location.hash = hash ?? "";
    } else {
      window.location.href = hash ? `/about${hash}` : "/about";
    }
  };

  const iconFor = (item: typeof nav[0]) => {
    switch (item.label) {
      case 'Home':
        return <HomeIcon className="h-4 w-4" />;
      case 'About':
        return <Info className="h-4 w-4" />;
      case 'Services':
        return <Layers className="h-4 w-4" />;
      case 'Products':
        return <Boxes className="h-4 w-4" />;
      case 'Blog':
        return <FileText className="h-4 w-4" />;
      case 'Contact':
        return <Mail className="h-4 w-4" />;
      case 'FAQ':
        return <HelpCircle className="h-4 w-4" />;
      case 'Nigeria Guide':
        return <BookOpen className="h-4 w-4" />;
      case 'Cities':
        return <MapPin className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Top contact bar (hidden on mobile) */}
      <header className="w-full overflow-visible hidden md:block">
        <div className="w-full border-b bg-gradient-to-b from-background/95 to-secondary/50 backdrop-blur relative overflow-hidden supports-[backdrop-filter]:from-background/80 supports-[backdrop-filter]:to-secondary/40">
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            <div className="absolute -top-28 -right-20 h-64 w-64 rounded-full bg-[conic-gradient(at_50%_50%,theme(colors.primary/28)_0deg,theme(colors.accent/24)_140deg,transparent_260deg)] blur-3xl animate-slow-spin" />
            <div className="absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_30%_30%,theme(colors.blue.500/.28),transparent_60%)] blur-3xl" />
            <div className="absolute -top-16 left-1/4 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,theme(colors.primary/16),transparent_70%)] blur-2xl" />
            <div className="absolute -inset-x-10 -top-20 h-28 rotate-2 bg-[linear-gradient(90deg,theme(colors.primary/18),transparent,theme(colors.accent/18))] blur-xl animate-ribbon-sweep" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
          <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-4 sm:px-6 md:px-10 py-2 sm:py-3 text-base font-semibold relative">
            {/* Left: Address then Phone (responsive, more polished) */}
            <div className="text-left leading-tight">
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                <a
                  href="https://maps.google.com/?q=House%207%2C%20Trunk%20H%2C%20Mandela%20Estate%2C%20SARS%20Road%2C%20Port%20Harcourt%2C%20Rivers%20State%2C%20Nigeria"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs md:text-sm text-foreground/70 hover:text-foreground/90"
                  aria-label="Open address in Google Maps"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="underline-offset-2 hover:underline">House 7, Trunk H, Mandela Estate, SARS Road, Port Harcourt</span>
                </a>
                <span className="hidden md:inline text-foreground/30">•</span>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+2349060976424"
                    className="inline-flex items-center gap-2 text-sm md:text-base text-foreground/80 hover:text-foreground"
                    aria-label="Call 0906 097 6424"
                  >
                    <Phone className="h-4 w-4" />
                    <span>0906 097 6424</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Actions (stack under contact on small screens) */}
            <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end">
              <div className="text-right leading-tight">
                <div className="mt-1 mb-1 flex items-center justify-end gap-2">
                  <Button asChild className="h-8 px-3 text-xs bg-green-600 hover:bg-green-700 text-white">
                    <a href="tel:+2349060976424" aria-label="Call DataGram">
                      <Phone className="mr-1 h-4 w-4" /> Call
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="h-8 px-3 text-xs border-green-600 text-green-700 hover:bg-green-700 hover:text-white">
                    <a
                      href={`https://wa.me/2349060976424?text=${encodeURIComponent("Hello Starlink, I'd like to get connected.")}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="WhatsApp message to DataGram"
                    >
                      <MessageCircle className="mr-1 h-4 w-4" /> Message
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main navigation bar (sticky) */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-[env(safe-area-inset-top)]" role="navigation" aria-label="Main">
        <div className="container flex h-16 items-center gap-2 lg:gap-3 xl:gap-4 px-3 sm:px-5">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/starlinklogo.png"
              alt="DataGram logo"
              className="h-10 w-auto"
            />
            <div className="font-extrabold leading-tight">
              <span className="tracking-tight text-[15px] sm:text-[18px] md:text-[22px] xl:text-[25px] whitespace-nowrap">
                DataGram
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-3 lg:gap-4 xl:gap-6 ml-auto">
            {nav.map((n) => {
              if (!n.scrollTo && n.label == "Services") {
                return (
                  <div key={n.to} className="relative group/dropdown">
                    <div className="inline-flex items-center">
                      <NavLink
                        to={n.to}
                        className={({ isActive }) =>
                          cn(
                            "inline-flex items-center gap-1.5 lg:gap-2 pl-1 md:pl-2 text-[12px] sm:text-[13px] lg:text-[13px] xl:text-sm 2xl:text-base font-medium transition-colors text-foreground/70 hover:text-primary pb-1",
                            isActive && "border-b-2 border-blue-800 text-foreground"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className={cn(isActive && "text-primary")}>{iconFor(n)}</span>
                            <span>{n.label}</span>
                          </>
                        )}
                      </NavLink>
                      <button
                        type="button"
                        className="ml-1 inline-flex h-4 w-4 items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleDropdown("services");
                        }}
                        aria-label="Toggle services menu"
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            "group-hover/dropdown:rotate-180",
                            clickedDropdown === "services" && "rotate-180"
                          )}
                        />
                      </button>
                    </div>
                    <div
                      className={cn(
                        "pointer-events-none absolute right-0 top-full z-50 mt-2 hidden min-w-[720px] rounded-md border bg-popover p-3 text-popover-foreground shadow-md group-hover/dropdown:block group-hover/dropdown:pointer-events-auto",
                        clickedDropdown === "services" && "block pointer-events-auto"
                      )}
                    >
                      {/* hover bridge to prevent flicker when moving from trigger to panel */}
                      <div className="absolute -top-2 left-0 h-2 w-full" />
                      <div className="max-h-[70vh] overflow-auto pr-1">
                        <div className="flex gap-3">
                          <div className="hidden lg:block w-[220px] shrink-0 rounded-md border bg-muted/20 p-2">
                            {(() => {
                              const active = services.find((s) => s.id === hoveredService) ?? services[0];
                              return (
                                <div className="overflow-hidden rounded-md">
                                  <img src={active?.image} alt={active?.title} className="h-40 w-full object-cover" />
                                  <div className="px-2 py-2 text-xs font-medium">{active?.title}</div>
                                </div>
                              );
                            })()}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                            {services.map((s) => (
                              <Link
                                key={s.id}
                                to={`/services/${s.slug}`}
                                onMouseEnter={() => setHoveredService(s.id)}
                                onFocus={() => setHoveredService(s.id)}
                                className="block rounded-sm px-3 py-2 text-sm hover:bg-[#000080] hover:text-white"
                              >
                                {s.title.split(" ").slice(0, 4).join(" ")}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="my-2 h-px bg-border" />
                        <Link
                          to="/services"
                          className="block rounded-sm px-3 py-2 text-sm font-medium hover:bg-[#000080] hover:text-white"
                        >
                          All Services
                        </Link>
                        <div className="my-3 h-px bg-border" />
                        <div className="px-3 py-3 border-t bg-muted/30 rounded-b-md">
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                            <div className="space-y-1 text-xs text-foreground">
                              <div className="text-base font-extrabold">Get your Starlink now</div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5" />
                                <span>0906 097 6424</span>
                              </div>
                            </div>
                            <div className="w-full sm:w-auto">
                              <div className="rounded-md border bg-background/90 px-3 py-2 shadow-sm">
                                <div className="text-xs font-semibold text-foreground">
                                  Contact us
                                </div>
                                <div className="mt-2 flex items-center gap-2 justify-end">
                                  <Button
                                    asChild
                                    size="sm"
                                    className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <a href="tel:+2349060976424" aria-label="Call DataGram">
                                      <Phone className="mr-1 h-3 w-3" /> Call
                                    </a>
                                  </Button>
                                  <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-3 text-xs border-green-600 text-green-700 hover:bg-green-50"
                                  >
                                    <a
                                      href={`https://wa.me/2349060976424?text=${encodeURIComponent("Hello Starlink, I'd like to get connected.")}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      aria-label="WhatsApp message to DataGram"
                                    >
                                      <MessageCircle className="mr-1 h-3 w-3" /> Message
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              if (!n.scrollTo && n.label === "Products") {
                return (
                  <div key={n.to} className="relative group/dropdown">
                    <div className="inline-flex items-center">
                      <NavLink
                        to={n.to}
                        className={({ isActive }) =>
                          cn(
                            "inline-flex items-center gap-2 pl-1 md:pl-2 text-[12px] sm:text-[13px] lg:text-[13px] xl:text-sm 2xl:text-base font-medium transition-colors text-foreground/70 hover:text-primary pb-1",
                            isActive && "border-b-2 border-blue-800 text-foreground"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className={cn(isActive && "text-primary")}>{iconFor(n)}</span>
                            <span>{n.label}</span>
                          </>
                        )}
                      </NavLink>
                      <button
                        type="button"
                        className="ml-1 inline-flex h-4 w-4 items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleDropdown("products");
                        }}
                        aria-label="Toggle products menu"
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            "group-hover/dropdown:rotate-180",
                            clickedDropdown === "products" && "rotate-180"
                          )}
                        />
                      </button>
                    </div>
                    <div
                      className={cn(
                        "pointer-events-none absolute right-0 top-full z-50 mt-2 hidden min-w-[720px] rounded-md border bg-popover p-3 text-popover-foreground shadow-md group-hover/dropdown:block group-hover/dropdown:pointer-events-auto",
                        clickedDropdown === "products" && "block pointer-events-auto"
                      )}
                    >
                      <div className="absolute -top-2 left-0 h-2 w-full" />
                      <div className="max-h-[70vh] overflow-auto pr-1">
                        <div className="flex gap-3">
                          <div className="hidden lg:block w-[220px] shrink-0 rounded-md border bg-muted/20 p-2">
                            {(() => {
                              const active = products.find((p) => p.id === hoveredProduct) ?? primaryProducts[0];
                              return active ? (
                                <div className="overflow-hidden rounded-md">
                                  <img src={active.images?.[0] ?? active.image ?? "/images/products/starlink-mini/starlink.jpeg"} alt={active.name} className="h-40 w-full object-cover" />
                                  <div className="px-2 py-2 text-xs font-medium">{active.name}</div>
                                </div>
                              ) : null;
                            })()}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                            {primaryProducts.map((p) => (
                              <Link
                                key={p.id}
                                to={`/products/${p.slug}`}
                                onMouseEnter={() => setHoveredProduct(p.id)}
                                onFocus={() => setHoveredProduct(p.id)}
                                className="block rounded-sm px-3 py-2 text-sm hover:bg-[#000080] hover:text-white"
                              >
                                {p.name}
                                <div className="text-xs text-muted-foreground/80">{p.price}</div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="my-2 h-px bg-border" />
                        <Link
                          to="/products"
                          className="block rounded-sm px-3 py-2 text-sm font-medium hover:bg-[#000080] hover:text-white"
                        >
                          All Products
                        </Link>
                        <div className="my-3 h-px bg-border" />
                        <div className="px-3 py-3 border-t bg-muted/30 rounded-b-md">
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                            <div className="space-y-1 text-xs text-foreground">
                              <div className="text-base font-extrabold">Get your Starlink now</div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5" />
                                <span>0906 097 6424</span>
                              </div>
                            </div>
                            <div className="w-full sm:w-auto">
                              <div className="rounded-md border bg-background/90 px-3 py-2 shadow-sm">
                                <div className="text-xs font-semibold text-foreground">
                                  Contact us
                                </div>
                                <div className="mt-2 flex items-center gap-2 justify-end">
                                  <Button
                                    asChild
                                    size="sm"
                                    className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <a href="tel:+2349060976424" aria-label="Call DataGram">
                                      <Phone className="mr-1 h-3 w-3" /> Call
                                    </a>
                                  </Button>
                                  <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-3 text-xs border-green-600 text-green-700 hover:bg-green-50"
                                  >
                                    <a
                                      href={`https://wa.me/2349060976424?text=${encodeURIComponent("Hello Starlink, I'd like to get connected.")}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      aria-label="WhatsApp message to DataGram"
                                    >
                                      <MessageCircle className="mr-1 h-3 w-3" /> Message
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              if (!n.scrollTo && n.label === "About") {
                return (
                  <div key={n.to} className="relative group/dropdown">
                    <div className="inline-flex items-center">
                      <NavLink
                        to={n.to}
                        className={({ isActive }) =>
                          cn(
                            "inline-flex items-center gap-1.5 md:gap-1.5 lg:gap-2 pl-1 md:pl-2 text-[12px] sm:text-[13px] lg:text-[13px] xl:text-sm 2xl:text-base font-medium transition-colors text-foreground/70 hover:text-primary pb-1",
                            isActive && "border-b-2 border-blue-800 text-foreground"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className={cn(isActive && "text-primary")}>{iconFor(n)}</span>
                            <span>{n.label}</span>
                          </>
                        )}
                      </NavLink>
                      <button
                        type="button"
                        className="ml-1 inline-flex h-4 w-4 items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleDropdown("about");
                        }}
                        aria-label="Toggle about menu"
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            "group-hover:rotate-180",
                            clickedDropdown === "about" && "rotate-180"
                          )}
                        />
                      </button>
                    </div>
                    <div
                      className={cn(
                        "pointer-events-none absolute right-0 top-full z-50 mt-2 hidden min-w-[420px] rounded-md border bg-popover p-2 text-popover-foreground shadow-md group-hover/dropdown:block group-hover/dropdown:pointer-events-auto",
                        clickedDropdown === "about" && "block pointer-events-auto"
                      )}
                    >
                      {/* hover bridge to prevent flicker when moving from trigger to panel */}
                      <div className="absolute -top-2 left-0 h-2 w-full" />
                      <div className="flex gap-3">
                        <div className="hidden md:block w-[140px] shrink-0 rounded-md border bg-muted/20 p-3">
                          {hoveredAbout === "about" && (
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                              <Info className="h-10 w-10 text-primary" />
                              <div className="text-xs font-medium">About Us</div>
                            </div>
                          )}
                          {hoveredAbout === "mission" && (
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                              <Target className="h-10 w-10 text-primary" />
                              <div className="text-xs font-medium">Mission</div>
                            </div>
                          )}
                          {hoveredAbout === "vision" && (
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                              <Eye className="h-10 w-10 text-primary" />
                              <div className="text-xs font-medium">Vision</div>
                            </div>
                          )}
                          {hoveredAbout === "core" && (
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                              <ShieldCheck className="h-10 w-10 text-primary" />
                              <div className="text-xs font-medium">Core Values</div>
                            </div>
                          )}
                        </div>
                        <div className="grow">
                          <Link
                            to="/about"
                            onMouseEnter={() => setHoveredAbout("about")}
                            onFocus={() => setHoveredAbout("about")}
                            onClick={(e) => {
                              e.preventDefault();
                              handleAboutNavigation();
                            }}
                            className={cn(
                              "block rounded-sm px-3 py-2 text-sm hover:bg-[#000080] hover:text-white",
                              activeAboutLink === "about" && "bg-[#000080] text-white"
                            )}
                          >
                            About Us
                          </Link>
                          <Link
                            to="/about#mission"
                            onMouseEnter={() => setHoveredAbout("mission")}
                            onFocus={() => setHoveredAbout("mission")}
                            onClick={(e) => {
                              e.preventDefault();
                              handleAboutNavigation("#mission");
                            }}
                            className="block rounded-sm px-3 py-2 text-sm hover:bg-[#000080] hover:text-white"
                          >
                            Mission
                          </Link>
                          <Link
                            to="/about#vision"
                            onMouseEnter={() => setHoveredAbout("vision")}
                            onFocus={() => setHoveredAbout("vision")}
                            onClick={(e) => {
                              e.preventDefault();
                              handleAboutNavigation("#vision");
                            }}
                            className="block rounded-sm px-3 py-2 text-sm hover:bg-[#000080] hover:text-white"
                          >
                            Vision
                          </Link>
                          <Link
                            to="/about#core-values"
                            onMouseEnter={() => setHoveredAbout("core")}
                            onFocus={() => setHoveredAbout("core")}
                            onClick={(e) => {
                              e.preventDefault();
                              handleAboutNavigation("#core-values");
                            }}
                            className="block rounded-sm px-3 py-2 text-sm hover:bg-[#000080] hover:text-white"
                          >
                            Core Values
                          </Link>
                        </div>
                      </div>
                      <div className="my-3 h-px bg-border" />
                      <div className="px-3 py-3 border-t bg-muted/30 rounded-b-md">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                          <div className="space-y-1 text-xs text-foreground">
                            <div className="text-base font-extrabold">Get your Starlink now</div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3.5 w-3.5" />
                              <span>0906 097 6424</span>
                            </div>
                          </div>
                          <div className="w-full sm:w-auto">
                            <div className="rounded-md border bg-background/90 px-3 py-2 shadow-sm">
                              <div className="text-xs font-semibold text-foreground">
                                Contact us
                              </div>
                              <div className="mt-2 flex items-center gap-2 justify-end">
                                <Button
                                  asChild
                                  size="sm"
                                  className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <a href="tel:+2349060976424" aria-label="Call DataGram">
                                    <Phone className="mr-1 h-3 w-3" /> Call
                                  </a>
                                </Button>
                                <Button
                                  asChild
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-3 text-xs border-green-600 text-green-700 hover:bg-green-50"
                                >
                                  <a
                                    href={`https://wa.me/2349060976424?text=${encodeURIComponent("Hello Starlink, I'd like to get connected.")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="WhatsApp message to DataGram"
                                  >
                                    <MessageCircle className="mr-1 h-3 w-3" /> Message
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return n.scrollTo ? (
                <button
                  key={n.to}
                  onClick={() => handleNavClick(n)}
                  className="inline-flex items-center gap-1.5 lg:gap-2 pl-1 md:pl-2 text-[12px] sm:text-[13px] lg:text-[13px] xl:text-sm 2xl:text-base font-medium transition-colors hover:text-primary text-foreground/70"
                >
                  {iconFor(n)}
                  <span>{n.label}</span>
                </button>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center gap-1.5 lg:gap-2 pl-1 md:pl-2 text-[12px] sm:text-[13px] lg:text-[13px] xl:text-sm 2xl:text-base font-medium transition-colors text-foreground/70 hover:text-primary pb-1",
                      isActive && "border-b-2 border-blue-800 text-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={cn(isActive && "text-primary")}>{iconFor(n)}</span>
                      <span>{n.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <button
            className="ml-auto inline-flex items-center justify-center rounded-md border border-border/60 p-1.5 text-foreground/80 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile / medium menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur overflow-y-auto lg:hidden"
            style={{ top: "calc(4rem + env(safe-area-inset-top, 0px))" }}
          >
            <div className="container grid gap-0.5 pt-1 pb-1">
              {nav.map((n) => {
                if (!n.scrollTo && n.label === "Services") {
                  return (
                    <div key={n.to} className="rounded-md my-0 group">
                      <div className={cn("w-full rounded-md px-2 py-1 text-sm font-medium inline-flex items-center justify-between hover:bg-[#000080] hover:text-white", location.pathname === n.to ? "text-foreground font-semibold" : "text-foreground/80")}>
                        <Link
                          to={n.to}
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-2 hover:text-white w-full"
                        >
                          <div className="inline-flex items-center gap-2">
                            <span className={cn("group-hover:text-white", {
                              "text-primary": location.pathname === n.to
                            })}>
                              {iconFor(n)}
                            </span>
                            <span className={cn("relative", {
                              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600": location.pathname === n.to
                            })}>
                              {n.label}
                            </span>
                          </div>
                        </Link>
                        <button
                          type="button"
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleMobileMenu("services");
                          }}
                          aria-expanded={mobileOpen.services}
                          aria-controls="mobile-services"
                          aria-label="Toggle services menu"
                        >
                          <ChevronDown className={cn("h-4 w-4 transition-transform", mobileOpen.services && "rotate-180")} />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {mobileOpen.services && (
                          <motion.div
                            id="mobile-services"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-1 overflow-hidden"
                          >
                            <div className="pl-6 pr-2 py-0.5 grid gap-0.5">
                              {services.map((s) => (
                                <Link 
                                  key={s.id} 
                                  to={`/services/${s.slug}`} 
                                  onClick={() => setOpen(false)} 
                                  className={cn("block rounded px-2 py-1 text-sm hover:bg-[#000080] hover:text-white", location.pathname === `/services/${s.slug}` ? "text-white bg-[#000080] font-medium" : "text-foreground/80 hover:bg-[#000080] hover:text-white")}
                                >
                                  {s.title}
                                </Link>
                              ))}
                              <Link 
                                to="/services" 
                                onClick={() => setOpen(false)} 
                                className={cn("block rounded px-2 py-1 text-sm font-medium", location.pathname === "/services" ? "text-white bg-[#000080]" : "text-foreground/80 hover:bg-[#000080] hover:text-white")}
                              >
                                All Services
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                if (!n.scrollTo && n.label === "About") {
                  return (
                    <div key={n.to} className="rounded-md my-0 group">
                      <div className={cn("w-full rounded-md px-2 py-1 text-sm font-medium inline-flex items-center justify-between hover:bg-[#000080] hover:text-white", location.pathname === n.to ? "text-foreground font-semibold" : "text-foreground/80")}>
                        <Link
                          to={n.to}
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-2 hover:text-white w-full"
                        >
                          <div className="inline-flex items-center gap-2">
                            <span className={cn("group-hover:text-white", {
                              "text-primary": location.pathname === n.to
                            })}>
                              {iconFor(n)}
                            </span>
                            <span className={cn("relative", {
                              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600": location.pathname === n.to
                            })}>
                              {n.label}
                            </span>
                          </div>
                        </Link>
                        <button
                          type="button"
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleMobileMenu("about");
                          }}
                          aria-expanded={mobileOpen.about}
                          aria-controls="mobile-about"
                          aria-label="Toggle about menu"
                        >
                          <ChevronDown className={cn("h-4 w-4 transition-transform", mobileOpen.about && "rotate-180")} />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {mobileOpen.about && (
                          <motion.div
                            id="mobile-about"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-1 overflow-hidden"
                          >
                            <div className="pl-6 pr-2 py-0.5 grid gap-0.5">
                              <Link
                                to="/about"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAboutNavigation();
                                }}
                                className={cn(
                                  "block rounded px-2 py-1 text-sm",
                                  activeAboutLink === "about" ? "text-white bg-[#000080] font-medium" : "text-foreground/80 hover:bg-[#000080] hover:text-white"
                                )}
                              >
                                About Us
                              </Link>
                              <Link
                                to="/about#mission"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAboutNavigation("#mission");
                                }}
                                className="block rounded px-2 py-1 text-sm text-foreground/80 hover:bg-[#000080] hover:text-white"
                              >
                                Mission
                              </Link>
                              <Link
                                to="/about#vision"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAboutNavigation("#vision");
                                }}
                                className="block rounded px-2 py-1 text-sm text-foreground/80 hover:bg-[#000080] hover:text-white"
                              >
                                Vision
                              </Link>
                              <Link
                                to="/about#core-values"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAboutNavigation("#core-values");
                                }}
                                className="block rounded px-2 py-1 text-sm text-foreground/80 hover:bg-[#000080] hover:text-white"
                              >
                                Core Values
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                if (!n.scrollTo && n.label === "Products") {
                  return (
                    <div key={n.to} className="rounded-md my-0 group">
                      <div className={cn("w-full rounded-md px-2 py-1 text-sm font-medium inline-flex items-center justify-between hover:bg-[#000080] hover:text-white", location.pathname === n.to ? "text-foreground font-semibold" : "text-foreground/80")}>
                        <Link
                          to={n.to}
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-2 hover:text-white w-full"
                        >
                          <div className="inline-flex items-center gap-2">
                            <span className={cn("group-hover:text-white", {
                              "text-primary": location.pathname === n.to
                            })}>
                              {iconFor(n)}
                            </span>
                            <span className={cn("relative", {
                              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600": location.pathname === n.to
                            })}>
                              {n.label}
                            </span>
                          </div>
                        </Link>
                        <button
                          type="button"
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleMobileMenu("products");
                          }}
                          aria-expanded={mobileOpen.products}
                          aria-controls="mobile-products"
                          aria-label="Toggle products menu"
                        >
                          <ChevronDown className={cn("h-4 w-4 transition-transform", mobileOpen.products && "rotate-180")} />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {mobileOpen.products && (
                          <motion.div
                            id="mobile-products"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-1 overflow-hidden"
                          >
                            <div className="pl-6 pr-2 py-0.5 grid gap-0.5">
                              {primaryProducts.map((p) => (
                                <Link 
                                  key={p.id} 
                                  to={`/products/${p.slug}`} 
                                  onClick={() => setOpen(false)} 
                                  className={cn("block rounded px-2 py-1 text-sm", location.pathname === `/products/${p.slug}` ? "text-white bg-[#000080] font-medium" : "text-foreground/80 hover:bg-[#000080] hover:text-white")}
                                >
                                  {p.name}
                                </Link>
                              ))}
                              <Link 
                                to="/products" 
                                onClick={() => setOpen(false)} 
                                className={cn("block rounded px-2 py-1 text-sm font-medium", location.pathname === "/products" ? "text-white bg-[#000080]" : "text-foreground/80 hover:bg-[#000080] hover:text-white")}
                              >
                                All Products
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return n.scrollTo ? (
                  <button
                    key={n.to}
                    onClick={() => handleNavClick(n)}
                    className="rounded-md my-0.5 px-2 py-1.5 text-sm font-medium hover:bg-[#000080] hover:text-white text-foreground/80 text-left inline-flex items-center gap-2"
                  >
                    {iconFor(n)}
                    <span>{n.label}</span>
                  </button>
                ) : (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md my-0.5 px-2 py-1.5 text-sm font-medium hover:bg-[#000080] hover:text-white text-foreground/80 text-left inline-flex items-center gap-2 relative",
                        isActive && "text-foreground font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-blue-600"
                      )
                    }
                    onClick={() => setOpen(false)}
                  >
                    {iconFor(n)}
                    <span>{n.label}</span>
                  </NavLink>
                );
              })}

              <div className="my-4 h-px w-full bg-border" />
              {/* Contact quick actions moved below links */}
              <div className="space-y-2 text-sm text-foreground/80">
                <div className="text-base font-extrabold">Get your Starlink now</div>
                <div className="mt-1 flex items-center gap-2">
                  <a href="tel:+2349060976424" className="inline-flex items-center gap-1 hover:text-foreground">
                    <Phone className="mt-0.5 h-4 w-4" />
                    <span>0906 097 6424</span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <Button asChild className="h-9 px-3 text-sm bg-green-600 hover:bg-green-700 text-white">
                  <a href="tel:+2349060976424" aria-label="Call DataGram">
                    <Phone className="mr-1 h-4 w-4" /> Call
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-9 px-3 text-sm border-green-600 text-green-700 hover:bg-green-50">
                  <a
                    href={`https://wa.me/2349060976424?text=${encodeURIComponent("Hello Starlink, I'd like to get connected.")}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp message to DataGram"
                  >
                    <MessageCircle className="mr-1 h-4 w-4" /> Message
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
