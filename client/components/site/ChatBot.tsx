import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Phone, ExternalLink } from "lucide-react";

// ─── Knowledge Base ───────────────────────────────────────────────────────────

interface KBEntry {
  patterns: string[];
  response: string;
  links?: { label: string; href: string }[];
}

const knowledgeBase: KBEntry[] = [
  // Greetings
  {
    patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy", "hiya"],
    response:
      "👋 Hello! Welcome to **Datagram** — Nigeria's trusted Starlink dealer. I'm your AI assistant. How can I help you today?\n\nYou can ask me about:\n• Starlink products & prices\n• Installation services\n• Coverage areas\n• Subscriptions & plans\n• WhatsApp & contact info",
  },

  // Products — General
  {
    patterns: ["product", "kit", "dish", "hardware", "buy", "purchase", "shop", "order", "available"],
    response:
      "🛰 We offer **3 genuine Starlink kits** in Nigeria:\n\n1. **Starlink Mini** — ₦450,000\n   Compact & portable, up to 100 Mbps\n\n2. **Starlink Gen3 Standard** — ₦650,000\n   Up to 220 Mbps, Wi-Fi 6, IP67 rated\n\n3. **Starlink Flat High Performance** — ₦4,000,000\n   Up to 1000 Mbps, ideal for enterprise & marine\n\nAll kits include professional installation options. Click below to see full specs.",
    links: [{ label: "View All Products", href: "/products" }],
  },

  // Starlink Mini
  {
    patterns: ["mini", "starlink mini", "portable", "travel", "compact"],
    response:
      "📦 **Starlink Mini — ₦450,000**\n\n• Speed: Up to 100 Mbps download, 20 Mbps upload\n• Latency: ~20 ms\n• Weight: 2.6 lbs (super portable!)\n• Built-in Wi-Fi 5, up to 128 devices\n• Requires Starlink Roam plan\n• Great for travel, remote work & small setups\n\nInstallation services are also available.",
    links: [{ label: "View Starlink Mini", href: "/products/starlink-mini" }],
  },

  // Gen3 Standard
  {
    patterns: ["gen3", "standard", "v4", "gen 3", "standard dish", "regular"],
    response:
      "📡 **Starlink Gen3 Standard — ₦650,000**\n\n• Speed: Up to 220 Mbps download, 25 Mbps upload\n• Latency: 20–40 ms\n• Wi-Fi 6 router included, dual Ethernet\n• IP67 dust & waterproof rated\n• Handles up to 235 devices\n• Perfect for homes & small businesses\n\nComes with 15m cable, power supply & router.",
    links: [{ label: "View Gen3 Standard", href: "/products/starlink-gen3v4" }],
  },

  // Flat High Performance
  {
    patterns: ["flat", "high performance", "hp", "1000mbps", "enterprise dish", "marine", "aviation", "boat", "rv", "vehicle"],
    response:
      "⚡ **Starlink Flat High Performance — ₦4,000,000**\n\n• Speed: Up to **1000 Mbps** download!\n• Latency: 20–40 ms\n• Wind survivable up to 280 kph\n• IP56 rated, 140° field of view\n• Ideal for: Enterprise, oil & gas, RVs, boats, aviation\n• Wi-Fi 6 connectivity\n\nThis is our top-tier kit for demanding operations.",
    links: [{ label: "View Flat HP", href: "/products/starlink-flat-hp" }],
  },

  // Price / Cost
  {
    patterns: ["price", "cost", "how much", "naira", "afford", "cheap", "expensive", "₦", "fee", "charge", "rate"],
    response:
      "💰 **Starlink Prices in Nigeria (2026)**\n\n| Kit | Price |\n|---|---|\n| Starlink Mini | ₦450,000 |\n| Starlink Gen3 Standard | ₦650,000 |\n| Starlink Flat High Performance | ₦4,000,000 |\n\n📌 Monthly subscriptions vary by plan (Home, Business, Roam). Contact us via WhatsApp for current subscription pricing in Naira.",
    links: [
      { label: "See All Products", href: "/products" },
      { label: "WhatsApp Us", href: "https://wa.me/2349060976424" },
    ],
  },

  // Installation
  {
    patterns: ["install", "installation", "setup", "mount", "mounting", "roof", "cable", "configure", "activation", "activate", "set up"],
    response:
      "🔧 **Professional Starlink Installation by Datagram**\n\nOur installation service includes:\n✅ Site survey & obstruction check\n✅ Roof / mast / wall mounting\n✅ Professional cable routing\n✅ Activation & configuration\n✅ Wi-Fi network setup & speed testing\n✅ Training on the Starlink app\n\nWe install across **all Nigerian states**. Contact us to book.",
    links: [
      { label: "Installation Service", href: "/services/sales-installation" },
      { label: "Book via WhatsApp", href: "https://wa.me/2349060976424" },
    ],
  },

  // Services — General
  {
    patterns: ["service", "services", "what do you do", "what do you offer", "offer", "solution"],
    response:
      "🛠 **Our Services at Datagram:**\n\n1. **Sales, Delivery & Installation** — Starlink hardware delivered and professionally installed\n2. **Whole-Premises WiFi Coverage** — Mesh networking for entire homes/offices\n3. **Long-Range WiFi (up to 10km)** — Point-to-point links for large properties\n4. **WISP Business Setup** — Start your own internet resale business\n5. **24/7 Backup Power** — Keep Starlink online during NEPA outages\n6. **Starlink Accessories** — Cables, access points, mesh systems\n7. **Global Roaming Subscriptions** — Use Starlink on sea, air & land\n8. **Enterprise Plans (up to 1000Mbps)** — Business-grade with SLA\n9. **Subscription Management** — Home, Business & Organization plans",
    links: [{ label: "View All Services", href: "/services" }],
  },

  // WiFi Extension
  {
    patterns: ["wifi", "wi-fi", "extend", "coverage", "range", "mesh", "whole premises", "whole house", "signal", "indoor", "outdoor"],
    response:
      "📶 **WiFi Coverage Solutions**\n\nWe offer two coverage extension services:\n\n**Whole-Premises WiFi** — Indoor & outdoor mesh networking via Starlink, fiber or broadband. Full seamless roaming coverage for your home or office.\n\n**Long-Range WiFi (up to 10km)** — Point-to-point links using high-gain antennas. Perfect for large estates, farm compounds, or multi-building sites.\n\nContact us for a site survey and custom quote.",
    links: [
      { label: "Whole-Premises Service", href: "/services/whole-premises" },
      { label: "Long-Range Service", href: "/services/long-range" },
    ],
  },

  // WISP
  {
    patterns: ["wisp", "resell", "reseller", "internet service provider", "sell internet", "hotspot", "voucher", "isp"],
    response:
      "🌐 **WISP Business Setup**\n\nWant to start your own internet business? We set up **Wireless Internet Service Provider (WISP)** networks using Starlink and fiber backhaul.\n\nIncludes:\n• Network design & planning\n• Voucher billing systems\n• Infrastructure setup\n• Reseller support & training\n\nGreat for estates, student hostels, markets & remote communities.",
    links: [{ label: "WISP Service", href: "/services/wisp-setup" }],
  },

  // Backup Power / NEPA
  {
    patterns: ["nepa", "power", "outage", "blackout", "light", "phcn", "generator", "ups", "solar", "battery", "backup", "electricity"],
    response:
      "⚡ **24/7 Backup Power for Starlink**\n\nWe provide backup power systems to keep your Starlink running even during NEPA outages:\n\n✅ UPS & battery backup systems\n✅ Solar panel integration\n✅ Automatic failover\n✅ Maintenance plans\n\nStarlink itself uses only **75–150W** — very efficient to power with a small UPS or solar setup.",
    links: [{ label: "Backup Power Service", href: "/services/backup-power" }],
  },

  // Enterprise / Business
  {
    patterns: ["business", "enterprise", "corporate", "company", "office", "organization", "organisation", "sla", "1000mbps", "high speed", "fast"],
    response:
      "🏢 **Enterprise & Business Plans**\n\nOur enterprise plans offer:\n• Speeds up to **1000 Mbps**\n• SLA-backed performance\n• Dedicated monitoring\n• Failover options\n• Plans for SMEs, corporations & institutions\n\nWe serve: schools, hospitals, hotels, oil & gas sites, churches, NGOs, farms, construction sites & remote offices.",
    links: [{ label: "Enterprise Plans", href: "/services/enterprise-plans" }],
  },

  // Subscription / Plans
  {
    patterns: ["subscription", "plan", "monthly", "home plan", "business plan", "roam", "manage subscription"],
    response:
      "📋 **Starlink Subscription Plans**\n\nWe manage Starlink subscriptions for:\n\n🏠 **Home** — Fast, reliable internet for families\n💼 **Business** — High-speed prioritized plans for companies\n🏛 **Organization** — Customized for campuses, institutions & NGOs\n🌍 **Global Roam** — Use Starlink anywhere on land, sea, or air\n\nContact us to get the current Naira pricing and to subscribe today.",
    links: [
      { label: "Subscription Service", href: "/services/subscription-services" },
      { label: "WhatsApp for Pricing", href: "https://wa.me/2349060976424" },
    ],
  },

  // Global Roaming
  {
    patterns: ["roam", "roaming", "travel", "boat", "ship", "sea", "ocean", "maritime", "flight", "airplane", "global", "international"],
    response:
      "🌍 **Starlink Global Roaming Subscriptions**\n\nStay connected across the globe:\n✈️ Aviation (in-flight)\n🚢 Maritime & deep sea\n🚗 Land travel & RV\n🗺 Cross-border remote operations\n\nFlexible plans with global coverage — perfect for NGO operations, oil & gas offshore, or fieldwork anywhere.",
    links: [{ label: "Global Roaming Service", href: "/services/global-roaming" }],
  },

  // About the company
  {
    patterns: ["about", "who are you", "who is datagram", "datagram", "company", "about you", "tell me about"],
    response:
      "🏢 **About Datagram**\n\nDatagram is **Nigeria's trusted Starlink sales and installation company**. We help homes, businesses, schools, hospitals, and organisations across Nigeria get connected with high-speed Starlink satellite internet.\n\n**Our Mission:** Deliver reliable, high-speed internet across Nigeria — from Lagos to Maiduguri, Abuja to Warri.\n\n**What makes us different:**\n✅ Genuine Starlink hardware\n✅ Professional installation nationwide\n✅ 24/7 support\n✅ Experts in Starlink, WISP & mesh networking",
    links: [{ label: "About Datagram", href: "/about" }],
  },

  // Contact
  {
    patterns: ["contact", "reach", "call", "phone", "number", "email", "reach out", "get in touch", "support", "help"],
    response:
      "📞 **Contact Datagram**\n\n📱 **WhatsApp / Call:** +234 906 097 6424\n🌐 **Website:** www.datagram.ng\n\n💬 The quickest way to reach us is via **WhatsApp** — we typically respond within minutes during business hours.\n\nYou can also visit our contact page for more options.",
    links: [
      { label: "Contact Page", href: "/contact" },
      { label: "WhatsApp Now", href: "https://wa.me/2349060976424?text=Hello%20Datagram%2C%20I%20need%20help%20with%20Starlink." },
    ],
  },

  // Location / Areas served
  {
    patterns: ["where", "location", "city", "state", "abuja", "lagos", "port harcourt", "kano", "ibadan", "enugu", "kaduna", "benin", "owerri", "warri", "maiduguri", "nationwide", "near me", "cover", "coverage"],
    response:
      "📍 **We Serve All of Nigeria!**\n\nOur installation and delivery teams operate across Nigeria, including:\n\n🏙 **Major Cities:** Abuja, Lagos, Port Harcourt, Kano, Ibadan, Enugu, Kaduna, Benin City, Owerri, Warri, Maiduguri\n\n🗺 **All 36 States + FCT** — Contact us to confirm availability and logistics for your specific location.\n\nStarlink satellite coverage is active across all of Nigeria.",
    links: [{ label: "Contact Us", href: "/contact" }],
  },

  // Speed / Performance
  {
    patterns: ["speed", "fast", "mbps", "latency", "ping", "slow", "download", "upload", "performance", "bandwidth"],
    response:
      "🚀 **Starlink Speed in Nigeria**\n\nReal-world speeds in Nigeria:\n\n| Kit | Download | Upload | Latency |\n|---|---|---|---|\n| Mini | Up to 100 Mbps | 20 Mbps | ~20 ms |\n| Gen3 Standard | Up to 220 Mbps | 25 Mbps | 20–40 ms |\n| Flat High Performance | Up to 1000 Mbps | 25 Mbps | 20–40 ms |\n\nStarlink uses Low-Earth-Orbit (LEO) satellites — far faster and lower-latency than traditional geostationary satellite internet.",
  },

  // Starlink vs competitors
  {
    patterns: ["vs", "versus", "compare", "mtn", "airtel", "glo", "spectranet", "fibernet", "4g", "5g", "lte", "fiber", "fibre", "better"],
    response:
      "⚖️ **Starlink vs Nigerian ISPs**\n\n| Feature | Starlink | MTN/Airtel 4G | Fibre |\n|---|---|---|---|\n| Speed | 100–1000 Mbps | 5–50 Mbps | 10–100 Mbps |\n| Latency | 20–40 ms | 50–150 ms | 10–30 ms |\n| Rural Coverage | ✅ Nationwide | ❌ Limited | ❌ Very limited |\n| NEPA dependency | Dish only | Tower | Router only |\n| Uptime | Very high | Variable | Variable |\n\n**Starlink wins** especially in rural, semi-urban, and any area with poor mobile network or fibre infrastructure.",
  },

  // FAQ: Elon Musk / SpaceX
  {
    patterns: ["elon", "elon musk", "spacex", "space x", "spacex internet"],
    response:
      "🚀 **Is Starlink owned by Elon Musk?**\n\nYes! Starlink is a satellite internet service operated by **SpaceX**, the aerospace company founded by Elon Musk. It uses a constellation of thousands of Low-Earth-Orbit (LEO) satellites to deliver fast, low-latency internet anywhere on Earth.\n\nDatagram is Nigeria's trusted Starlink dealer — we help you buy and install your Starlink kit hassle-free.",
  },

  // FAQ: Works in rain
  {
    patterns: ["rain", "weather", "storm", "flood", "cloud", "snow"],
    response:
      "🌧 **Does Starlink work in rain?**\n\nStarlink performs well in most weather conditions. During **very heavy rain or thunderstorms**, you may experience a slight temporary dip in speeds (known as 'rain fade'). However:\n\n✅ Normal rain — works fine\n✅ Light clouds — no impact\n⚠️ Heavy thunderstorms — brief slowdowns possible\n\nThe dish is **IP67 rated** (Gen3) and built to handle tropical weather including Nigeria's rainy season.",
  },

  // FAQ: Does it need electricity
  {
    patterns: ["electricity", "power cut", "no light", "off-grid", "solar", "generator", "without power"],
    response:
      "💡 **Does Starlink work without constant electricity?**\n\nStarlink requires power to operate — but the dish is energy-efficient:\n\n• **Mini:** 20–40W\n• **Gen3 Standard:** 75–100W\n• **Flat HP:** 110–150W\n\nWe recommend our **24/7 Backup Power service** — a UPS or solar battery system keeps your Starlink online during NEPA outages. This is one of the most popular add-ons we offer in Nigeria!",
    links: [{ label: "Backup Power Service", href: "/services/backup-power" }],
  },

  // Blog
  {
    patterns: ["blog", "article", "read", "guide", "news", "tips", "learn"],
    response:
      "📚 **Datagram Blog**\n\nExplore our guides and articles:\n\n• Getting Started with Starlink in Africa\n• Building a WISP Business: Complete Guide\n• Extending WiFi Up to 10km\n• Enterprise WiFi Design Best Practices\n• Starlink vs Traditional ISPs: Cost Analysis\n• Backup Power for Critical Connectivity\n\nNew articles published regularly!",
    links: [{ label: "Visit Our Blog", href: "/blog" }],
  },

  // WhatsApp
  {
    patterns: ["whatsapp", "wa", "chat", "message", "dm"],
    response:
      "💬 **Chat with us on WhatsApp!**\n\nThe fastest way to reach Datagram:\n📱 **+234 906 097 6424**\n\nWe're available 24/7 on WhatsApp for:\n• Product inquiries & pricing\n• Installation bookings\n• Technical support\n• Custom quotes for businesses",
    links: [{ label: "Open WhatsApp", href: "https://wa.me/2349060976424?text=Hello%20Datagram%2C%20I%20need%20Starlink%20assistance." }],
  },

  // Accessories
  {
    patterns: ["accessories", "cable", "access point", "mesh node", "adapter", "mount", "extra"],
    response:
      "🔌 **Starlink Accessories**\n\nWe stock a range of Starlink accessories:\n• Gigabit Ethernet cables\n• Satellite WiFi access points\n• Mesh network nodes\n• Wired & wireless satellite mesh systems\n• Mounting kits & hardware\n\nAll accessories are compatible with genuine Starlink equipment.",
    links: [{ label: "Accessories Service", href: "/services/accessories" }],
  },

  // Default fallback
  {
    patterns: ["__fallback__"],
    response:
      "🤖 I'm not sure I understood that. Here are some things I can help with:\n\n• **Products & Prices** — Ask about Starlink kits\n• **Installation** — How we set up Starlink\n• **Services** — Full list of what we offer\n• **Coverage** — Cities & states we serve\n• **Contact** — How to reach our team\n\nOr reach us directly on WhatsApp for personalized help! 👇",
    links: [{ label: "WhatsApp Us", href: "https://wa.me/2349060976424" }],
  },
];

function getBotResponse(input: string): KBEntry {
  const lower = input.toLowerCase().trim();
  for (const entry of knowledgeBase) {
    if (entry.patterns[0] === "__fallback__") continue;
    if (entry.patterns.some((p) => lower.includes(p))) {
      return entry;
    }
  }
  return knowledgeBase[knowledgeBase.length - 1]; // fallback
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  links?: { label: string; href: string }[];
  time: string;
}

function getTime() {
  return new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });
}

// ─── Suggested questions ─────────────────────────────────────────────────────

const suggestions = [
  "How much is Starlink in Nigeria?",
  "Do you install Starlink in Abuja?",
  "What products do you sell?",
  "Can Starlink work without NEPA?",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "👋 Hi there! I'm the **Datagram AI Assistant**.\n\nI can answer questions about our Starlink products, installation services, pricing, and coverage across Nigeria.\n\nHow can I help you today?",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim(), time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const entry = getBotResponse(text);
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: entry.response,
        links: entry.links,
        time: getTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 700 + Math.random() * 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Render markdown-lite: bold & newlines
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part.split("\n").map((line, j) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < part.split("\n").length - 1 && <br />}
        </span>
      ));
    });
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatbot-panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col"
            style={{
              background: "linear-gradient(145deg, #0f172a, #1e293b)",
              border: "1px solid rgba(99,179,237,0.2)",
              borderRadius: "1.25rem",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,179,237,0.1)",
              height: "min(540px, 80vh)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{ borderColor: "rgba(99,179,237,0.15)", borderRadius: "1.25rem 1.25rem 0 0", background: "rgba(15,23,42,0.9)" }}
            >
              <div className="relative flex-shrink-0">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">Datagram Assistant</p>
                <p className="text-xs text-green-400">Online · Starlink Expert</p>
              </div>
              <a
                href="tel:+2349060976424"
                className="flex items-center justify-center h-8 w-8 rounded-full text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                title="Call us"
              >
                <Phone className="h-4 w-4" />
              </a>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center h-8 w-8 rounded-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-700">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 mt-1">
                    {msg.role === "bot" ? (
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-slate-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-slate-200" />
                      </div>
                    )}
                  </div>

                  <div className={`max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    {/* Bubble */}
                    <div
                      className="text-sm leading-relaxed px-3 py-2.5 rounded-2xl"
                      style={
                        msg.role === "bot"
                          ? {
                            background: "rgba(30,41,59,0.9)",
                            border: "1px solid rgba(99,179,237,0.15)",
                            color: "#cbd5e1",
                            borderRadius: "0.25rem 1rem 1rem 1rem",
                          }
                          : {
                            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                            color: "white",
                            borderRadius: "1rem 0.25rem 1rem 1rem",
                          }
                      }
                    >
                      {renderText(msg.text)}

                      {/* Links */}
                      {msg.links && msg.links.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {msg.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.href}
                              target={link.href.startsWith("http") ? "_blank" : "_self"}
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-colors"
                              style={{
                                background: "rgba(59,130,246,0.2)",
                                border: "1px solid rgba(59,130,246,0.4)",
                                color: "#93c5fd",
                              }}
                            >
                              {link.label}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-600 px-1">{msg.time}</span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2 items-end"
                  >
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl flex gap-1 items-center"
                      style={{ background: "rgba(30,41,59,0.9)", border: "1px solid rgba(99,179,237,0.15)" }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-blue-400"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors hover:border-blue-400/60"
                    style={{
                      background: "rgba(30,41,59,0.8)",
                      border: "1px solid rgba(99,179,237,0.2)",
                      color: "#94a3b8",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 border-t"
              style={{ borderColor: "rgba(99,179,237,0.15)" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Starlink…"
                className="flex-1 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || typing}
                className="h-9 w-9 rounded-xl flex items-center justify-center disabled:opacity-40 transition-all"
                style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send message"
              >
                <Send className="h-4 w-4 text-white" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle FAB */}
      <motion.div
        className="fixed bottom-5 right-5 z-50 group flex items-center gap-2"
        initial={{ scale: 0 }}
        animate={{ scale: open ? 1 : [1, 1.08, 1] }}
        transition={
          open
            ? { duration: 0.3 }
            : { delay: 2, duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Tooltip */}
        {!open && (
          <span
            className="absolute right-full mr-2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shadow-lg opacity-100 pointer-events-none"
          >
            Datagram Assistant
          </span>
        )}

        <motion.button
          onClick={() => setOpen(!open)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all hover:brightness-110"
          style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={open ? "Close chat" : "Open chat assistant"}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </>
  );
}
