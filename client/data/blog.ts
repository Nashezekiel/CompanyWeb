export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  content?: string;
  sections?: Array<{
    heading: string;
    content?: string;
    points?: string[];
  }>;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with Starlink in Africa",
    excerpt:
      "Everything you need to know about deploying Starlink across different African regions, from regulatory requirements to optimal installation practices.",
    author: "Starlink Team",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Installation",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    featured: true,
    content:
      `Starlink has opened up new possibilities for reliable, high-speed internet across Africa. From remote farms to bustling city centers, deployment success starts with understanding local context and planning your installation accordingly.

Before ordering, verify current availability in your region and review any local regulations that may apply. In many cases, permission for roof or mast mounting is straightforward, but some municipalities may require a brief permit process.

For best results, perform a line-of-sight check. Use the Starlink app obstruction tool and aim for a clear 100-degree view of the sky. Mounts such as non-penetrating roof bases, wall mounts, and extended poles help raise the dish above nearby trees and parapets.

Cable management is critical. Route the cable with gentle bends, weatherproof exterior runs with UV-rated conduits, and avoid power lines. Terminate indoors close to your router and power source. Test speeds at different times of day to establish a baseline, then fine-tune your placement if necessary.

Once online, consider adding a UPS to keep the modem alive during power cuts. For larger properties, mesh WiFi or point-to-point backhaul can extend coverage efficiently without compromising performance.`,
    sections: [
      {
        heading: "Pre-Installation Checklist",
        points: [
          "Verify regional availability and regulations",
          "Plan mounting location with 100° sky view",
          "Confirm power and indoor termination point",
        ],
      },
      {
        heading: "Mounting Options",
        points: [
          "Non-penetrating roof bases for flat roofs",
          "Wall mounts for parapet or facade installs",
          "Extended poles to clear tree lines",
        ],
      },
      {
        heading: "Optimization Tips",
        content:
          "Test at different times to baseline performance, then adjust mount height or azimuth to improve SNR.",
      },
    ],
  },
  {
    id: 2,
    title: "Building a WISP Business: Complete Guide",
    excerpt:
      "Learn how to start and scale a Wireless Internet Service Provider business using Starlink and fiber infrastructure.",
    author: "Michael Chen",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    featured: false,
    content:
      `Starting a WISP begins with a clear service model: residential, SME, and enterprise tiers with defined SLAs. Use Starlink or fiber as upstream backhaul and build distribution using point-to-multipoint radios.

Map your coverage, then plan access points, channel reuse, and capacity. Invest in proper grounding, surge protection, and weather-rated enclosures. A small NOC stack—monitoring, alerting, and ticketing—goes a long way in keeping uptime high.

Billing and support are your long-term differentiators. Automate invoicing, offer self-service portals, and publish clear fair-use policies. As you scale, standardize CPE hardware, document your install playbooks, and maintain spare stock for quick swaps.`,
    sections: [
      {
        heading: "Service Tiers",
        points: [
          "Residential: best-effort, fair-use caps",
          "SME: prioritized traffic, static IP options",
          "Enterprise: SLA-backed with redundancy",
        ],
      },
      {
        heading: "Operational Toolkit",
        points: [
          "Monitoring (SNMP/NetFlow), alerting, and ticketing",
          "Automated provisioning and config backups",
          "Spare stock strategy for rapid RMA",
        ],
      },
      {
        heading: "Revenue & Support",
        content:
          "Bundle managed WiFi, surveillance backhaul, and VoIP. Publish clear SLAs and escalation paths.",
      },
    ],
  },
  {
    id: 3,
    title: "Extending WiFi Up to 10km: Technical Guide",
    excerpt:
      "Technical deep-dive into point-to-point links, antenna selection, and line-of-sight planning for long-range WiFi deployments.",
    author: "Sarah Johnson",
    date: "2024-01-05",
    readTime: "15 min read",
    category: "Technical",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    featured: false,
    content:
      `Long-range links rely on three pillars: line of sight, antenna gain, and clean channels. Start with a path profile—account for earth curvature and the Fresnel zone. Even small obstructions can degrade throughput.

Choose matched radios and parabolic dishes for higher gain. Align carefully using built-in signal tools and lock polarization on both ends. For stability, enable automatic rate control and keep channel widths appropriate for your noise floor.

For resilience, deploy redundant links where possible and add watchdog reboots. Log RSSI, MCS, and latency over time to detect weather- or interference-related issues early.`,
    sections: [
      {
        heading: "Path Planning",
        points: [
          "Model Fresnel zones and earth curvature",
          "Survey obstructions and seasonal foliage",
          "Prefer tower-to-tower alignment where possible",
        ],
      },
      {
        heading: "Radio Selection",
        points: [
          "Use matched radios and high-gain dishes",
          "Lock polarization and channel widths",
          "Enable automatic rate control",
        ],
      },
      {
        heading: "Reliability",
        content:
          "Consider dual-radio diversity or a secondary path. Schedule periodic link tests and log KPIs.",
      },
    ],
  },
  {
    id: 4,
    title: "Enterprise WiFi Design Best Practices",
    excerpt:
      "Design principles for large-scale WiFi deployments in offices, campuses, and industrial facilities.",
    author: "David Rodriguez",
    date: "2023-12-28",
    readTime: "10 min read",
    category: "Enterprise",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    featured: false,
    content:
      `Begin with a proper RF survey and capacity planning. Map density hotspots—meeting rooms, lecture halls, canteens—and plan overlapping coverage with staggered channels. Prefer wired uplinks per AP and PoE+ for power.

Segment SSIDs by role and apply WPA3, RADIUS, and VLAN policies. For IoT networks, restrict east-west traffic and use device isolation.

Monitor roaming and sticky client behavior. Tweak minimum RSSI thresholds, band steering, and fast transition to improve user experience during movement.`,
    sections: [
      {
        heading: "Planning & Surveys",
        points: [
          "Perform predictive and on-site RF surveys",
          "Account for capacity hotspots and roaming paths",
          "Document cabling and PoE budgets",
        ],
      },
      {
        heading: "Security & Segmentation",
        points: [
          "Adopt WPA3 + 802.1X where possible",
          "Isolate IoT devices and restrict L2 broadcast",
          "Use VLANs with firewall policies per role",
        ],
      },
      {
        heading: "Operational Tuning",
        content:
          "Track client experience KPIs and optimize thresholds (min RSSI, roaming aggressiveness, band steering).",
      },
    ],
  },
  {
    id: 5,
    title: "Starlink vs Traditional ISPs: Cost Analysis",
    excerpt:
      "Comprehensive cost comparison between Starlink and traditional internet service providers in rural and urban areas.",
    author: "Starlink Team",
    date: "2023-12-20",
    readTime: "6 min read",
    category: "Analysis",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    featured: false,
    content:
      `Total cost of ownership depends on geography and service level. Starlink offers predictable monthly rates and rapid deployment, while legacy ISPs may provide lower per-Mbps pricing in urban cores but long lead times in rural areas.

Consider downtime costs, transport delays, and contract lock-ins. For distributed sites, a hybrid approach—Starlink for primary or failover with local fiber when available—often balances performance and reliability.`,
    sections: [
      {
        heading: "TCO Components",
        points: [
          "Upfront hardware and installation",
          "Recurring bandwidth and support",
          "Downtime and productivity impact",
        ],
      },
      {
        heading: "When Starlink Wins",
        points: [
          "Remote sites with long fiber lead times",
          "Temporary or mobile deployments",
          "Failover to protect revenue operations",
        ],
      },
      {
        heading: "Hybrid Strategy",
        content:
          "Blend fiber and Starlink based on site criticality, with policy-based routing to optimize cost and uptime.",
      },
    ],
  },
  {
    id: 6,
    title: "Backup Power Solutions for Critical Connectivity",
    excerpt:
      "Ensuring 24/7 internet connectivity with UPS systems, solar solutions, and automated failover mechanisms.",
    author: "Michael Chen",
    date: "2023-12-15",
    readTime: "9 min read",
    category: "Infrastructure",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    featured: false,
    content:
      `Start by sizing your UPS for the modem, router, and switches with 30–60 minutes of runtime. For sites with frequent outages, add a small lithium battery bank and MPPT solar charge controller.

Protect your equipment with surge suppressors and proper earthing. If using generators, isolate sensitive electronics behind a double-conversion UPS to avoid voltage spikes.

Finally, test your failover: simulate power cuts and WAN outages quarterly to ensure your automation behaves as expected.`,
    sections: [
      {
        heading: "UPS Sizing",
        points: [
          "List critical loads and runtime targets",
          "Account for inverter efficiency",
          "Plan for graceful shutdown/alerts",
        ],
      },
      {
        heading: "Solar & Battery",
        points: [
          "MPPT charge controllers and LiFePO4 banks",
          "Oversize panels for rainy seasons",
          "Protect enclosures from heat and dust",
        ],
      },
      {
        heading: "Testing & Safety",
        content:
          "Schedule quarterly drills. Verify generator transfer, surge protection, and earthing bonds.",
      },
    ],
  },
];
