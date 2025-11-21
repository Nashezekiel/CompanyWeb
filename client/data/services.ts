export type Service = {
  id: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  highlights?: string[];
  image?: string;
};

export const services: Service[] = [
  {
    id: "sales-installation",
    slug: "sales-installation",
    title: "Sales, Delivery, and Professional Installation",
    short:
      "We sell Starlink equipment, deliver it, and provide professional activation and setup.",
    description:
      "We sell Starlink equipment and deliver it to your location. Our team of professionals will then install and set up the system to ensure you're up and running quickly and efficiently. We offer Starlink Activation service even in capacitated areas.",
    highlights: [
      "Starlink hardware sales",
      "Delivery & on-site installation",
      "Activation and configuration",
    ],
    image: "/images/sales.jpeg",
  },
  {
    id: "whole-premises",
    slug: "whole-premises",
    title: "Whole-Premises WiFi Coverage",
    short:
      "Mesh networking to extend Starlink, fiber and broadband across your entire property.",
    description:
      "We extend the Starlink, fiber and broadband WiFi signal to cover your entire premises via mesh networking, ensuring reliable internet connectivity throughout your home or office, both indoors and outdoors.",
    highlights: ["Indoor & outdoor mesh", "Site survey & design", "Seamless roaming"],
    image: "/images/Whole-Premises.jpeg",
  
  },
  {
    id: "long-range",
    slug: "long-range",
    title: "Long-Range WiFi Extension (up to 10km)",
    short: "Extend WiFi using point-to-point links for large properties and multi-building sites.",
    description:
      "Our team can extend the Starlink or Fiber WiFi signal to reach distant locations, up to 10km away, making it ideal for large properties or multiple buildings.",
    highlights: ["Point-to-point links", "Line-of-sight planning", "High-throughput radios"],
    image: "/images/Long-Range.jpeg",
  },
  {
    id: "wisp-setup",
    slug: "wisp-setup",
    title: "WISP Business Setup",
    short:
      "Guidance and technical setup to start an internet resale business using Starlink and fiber.",
    description:
      "We help set up a Wireless Internet Service Provider (WISP) business using Starlink and fiber technology, enabling you to sell internet services to others via voucher systems and managed infrastructure.",
    highlights: ["Billing & vouchers", "Network design", "Reseller support"],
    image: "/images/WIFIWISP.jpeg",
  },
  {
    id: "backup-power",
    slug: "backup-power",
    title: "24/7 Backup Power",
    short:
      "Backup power systems to keep your Starlink connectivity online during outages.",
    description:
      "We provide backup power solutions to ensure your Starlink system remains operational even during power outages, minimizing downtime and keeping you connected.",
    highlights: ["UPS & batteries", "Automatic failover", "Maintenance plans"],
    image: "/images/BackupPower.jpeg",
  },
  {
    id: "accessories",
    slug: "accessories",
    title: "Starlink Accessories",
    short: "Cables, access points, and mesh systems to extend and harden installations.",
    description:
      "We sell various Starlink accessories, including Gigabit Cables for high-speed links, Satellite Access Points that extend WiFi coverage, and wired or wireless satellite mesh systems for seamless connectivity.",
    highlights: ["Gigabit cables", "Satellite access points", "Wired & wireless mesh"],
    image: "/images/StarlinkAccessories.jpeg",
  },
  {
    id: "global-roaming",
    slug: "global-roaming",
    title: "Starlink Global Roaming Subscriptions",
    short:
      "Roaming subscriptions to stay connected across land, sea, and air during travel or field operations.",
    description:
      "Our Starlink roaming subscriptions enable you to stay connected while traveling or working in different locations, including sea, deep sea, air flight and land.",
    highlights: ["Global coverage options", "Flexible plans", "Use in marine & aviation scenarios"],
    image: "/images/StarlinkGloba.jpeg",
  },
  {
    id: "enterprise-plans",
    slug: "enterprise-plans",
    title: "High-Speed Enterprise Plans (up to 1000Mbps)",
    short: "Enterprise-grade plans with SLA-focused performance up to 1000Mbps.",
    description:
      "We offer high-speed internet plans for businesses and organizations, with speeds up to 400Mbps, to support demanding applications and operations.",
    highlights: ["SLA & monitoring", "High throughput", "Failover options"],
    image: "/images/High-Speed.jpeg",
  },
  {
    id: "subscription-services",
    slug: "subscription-services",
    title: "Starlink Subscription Services",
    short: "Managed subscription services for Home, Business, and Organizations.",
    description:
      "We handle Starlink subscription services for Home (fast and reliable internet for families), Business (high-speed solutions), and Organization (customized internet solutions for institutions).",
    highlights: ["Home plans", "Business plans", "Organization & campus plans"],
    image: "/images/StarlinkSubscription.jpeg",
  },
];
