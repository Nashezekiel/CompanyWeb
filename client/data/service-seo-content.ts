export type ServiceSeoBlock = {
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
};

export const serviceSeoContent: Record<string, ServiceSeoBlock> = {
  "sales-installation": {
    sections: [
      {
        heading: "Why professional Starlink installation matters in Nigeria",
        paragraphs: [
          "Buying the kit is only the first step. Nigerian roofs often mix concrete, parapets, and shared walls where drilling rules apply. Our installers document cable paths, torque mounts to manufacturer guidance, and ground outdoor shields to reduce mystery disconnects after the first rains.",
          "Voice assistants surface businesses that clearly describe surveys, timelines, and what is included. DataGram lists those steps up front so procurement teams can approve budgets faster than with vague “we install Starlink” pages.",
        ],
      },
      {
        heading: "Delivery, activation, and same-week installs when possible",
        paragraphs: [
          "We coordinate logistics for busy cities like Lagos and Abuja, then schedule activation once obstruction checks pass. If your estate requires security clearance, we build that time into the plan so you are not surprised by shifted dates.",
          "Customers comparing “buy Starlink Nigeria” offers should verify kit authenticity, warranty paths, and who performs the actual roof work. We keep serials documented and walk you through app-based checks so you know the hardware is healthy before we leave site.",
        ],
      },
      {
        heading: "What you receive on handover day",
        paragraphs: [
          "Handover includes labeled cables, photo dossier of the route, baseline speed tests from your desk locations, and quick training on power-cycle order. Businesses also receive optional PDF diagrams for IT teams. Ask about extended support retainers if you lack full-time network staff.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you install customer-supplied Starlink kits?",
        answer:
          "Yes, if the kit is genuine and still within warranty policy. We still recommend a survey so we can confirm mounts, cable lengths, and grounding before drilling begins.",
      },
      {
        question: "How soon can you install after delivery?",
        answer:
          "Many metro jobs slot within a few business days once roof access is confirmed. Remote travel may add time—share your map pin early so we batch efficiently.",
      },
      {
        question: "Do you handle estates with strict drilling rules?",
        answer:
          "We prepare simple scope sheets for facility managers and can propose ballasted or non-penetrating solutions when structurally appropriate.",
      },
    ],
  },
  "whole-premises": {
    sections: [
      {
        heading: "Designing WiFi that actually fills every room",
        paragraphs: [
          "Starlink brings fast WAN, but indoor WiFi is still physics. Thick concrete, mirrored glass, and microwave noise all attenuate signals. We map primary usage zones—bedrooms, home offices, TV corners—and place wired backhaul where possible before layering mesh.",
          "For offices, VLANs isolate guests from finance traffic while keeping multicast off segments that break POS systems. We document SSIDs, passwords, and DHCP ranges so your IT vendor is not guessing later.",
        ],
      },
      {
        heading: "Outdoor coverage for pools, cafeterias, and parking kiosks",
        paragraphs: [
          "Outdoor access points need UV-rated cable, drip loops, and surge protection on both data and power paths. We specify grounding that survives Lagos salt air or northern dust seasons depending on your site.",
        ],
      },
      {
        heading: "When fiber already exists on site",
        paragraphs: [
          "Many clients want Starlink as failover while keeping fiber primary. We configure dual-WAN routers with health checks so failover is automatic and logged. That design is popular with banks, clinics, and creative studios that cannot drop calls.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will mesh reduce my Starlink speeds?",
        answer:
          "Well-designed mesh preserves most throughput; poorly meshed wireless hops can cut speeds. We prefer wired backhaul between nodes whenever ceilings allow discreet conduit runs.",
      },
      {
        question: "Can you separate guest and staff WiFi?",
        answer:
          "Yes. We implement VLANs or separate SSIDs with bandwidth limits depending on your firewall capabilities.",
      },
      {
        question: "Do you support outdoor cameras on the same network?",
        answer:
          "We segment cameras when possible to reduce broadcast noise and improve security isolation.",
      },
    ],
  },
  "long-range": {
    sections: [
      {
        heading: "Kilometer-scale links with honest throughput math",
        paragraphs: [
          "Point-to-point radios can bridge Starlink from a main building to guard houses, warehouses, or secondary offices, but rain fade and fresnel clearance matter. We document expected Mbps under clear skies versus heavy rain so finance teams understand variability.",
          "Line-of-sight is not just “I can see the tower.” Trees grow, new buildings rise, and cranes swing. We photograph paths and recommend mast heights that preserve fresnel clearance where landlords allow.",
        ],
      },
      {
        heading: "Power and lightning considerations",
        paragraphs: [
          "Long cable runs increase exposure to surges. We bond shields, use outdoor-rated POE paths, and isolate indoor switches from direct lightning strikes on distant poles. Northern sites may add extra shielding for dust ingress at cable glands.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the farthest distance you will quote?",
        answer:
          "Distance depends on radios, height, and region noise. Share coordinates and photos so we can model a realistic link budget before quoting.",
      },
      {
        question: "Can you bridge across water?",
        answer:
          "Water paths can work with clear line of sight but need marine-rated hardware if poles are near spray. Tell us if the path crosses lagoons or rivers.",
      },
      {
        question: "Do long-range links work during heavy rain?",
        answer:
          "All wireless links fade in rain; we set expectations up front and may recommend fiber if uptime is absolute.",
      },
    ],
  },
  "wisp-setup": {
    sections: [
      {
        heading: "Helping operators build fair, sustainable WISP networks",
        paragraphs: [
          "Starlink can be excellent backhaul for rural resale, but contention and fair-use policies mean you must engineer oversubscription carefully. We help shape queues, voucher flows, and billing integrations while stressing legal compliance for resale in your jurisdiction.",
          "Voice searchers asking “how to start a WISP in Nigeria” need practical guidance on tower grounding, CPE choices, and support workflows—not hype. Our playbooks name vendor-agnostic steps so your team can compare radios confidently.",
        ],
      },
      {
        heading: "Monitoring and customer support patterns",
        paragraphs: [
          "Small ISPs fail when they cannot see per-subscriber usage. We recommend SNMP or modern controller clouds with alerting so you know when backhaul saturates. Training frontline staff on basic triage cuts truck rolls dramatically.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you provide legal advice on spectrum or resale?",
        answer:
          "No. We supply technical architecture and refer you to counsel for regulatory questions specific to your operating area.",
      },
      {
        question: "Can you integrate with existing billing systems?",
        answer:
          "We have experience exporting RADIUS or DHCP options into common voucher platforms—share your stack so we confirm compatibility.",
      },
      {
        question: "What happens if Starlink throttles during peak?",
        answer:
          "We design burst buffers and caching where possible, but physics and carrier policies still apply. Transparency with subscribers protects your brand.",
      },
    ],
  },
  "backup-power": {
    sections: [
      {
        heading: "Keeping Starlink online when the grid flickers",
        paragraphs: [
          "Routers rebooting during generator transfers cause the most avoidable downtime. We measure inrush currents, separate neutrals where needed, and place online UPS segments on sensitive gear. Lithium batteries sized to real loads outperform oversized lead-acid banks that never recharge fully between outages.",
          "Solar assist is attractive but needs honest shading analysis. A partially shaded string overheats unless modules use optimizers. We label disconnects clearly so estate electricians can isolate satellite circuits safely.",
        ],
      },
      {
        heading: "Enterprise expectations and maintenance",
        paragraphs: [
          "Enterprises should plan battery replacement cycles and firmware updates for inverters. We document test procedures so night staff can verify autonomy monthly without calling engineers.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will a small UPS be enough for my home?",
        answer:
          "Often yes for the router segment, but the dish may still dip on long outages. We calculate watt-hours based on your outage pattern.",
      },
      {
        question: "Can you integrate with existing generator ATS?",
        answer:
          "Yes, we coordinate with your electrical contractor to avoid neutral-ground conflicts that reboot networking gear.",
      },
      {
        question: "Do you sell batteries directly?",
        answer:
          "We can bundle approved lithium packs and inverters with installation depending on stock and site survey results.",
      },
    ],
  },
  accessories: {
    sections: [
      {
        heading: "Choosing the right accessories the first time",
        paragraphs: [
          "Ethernet adapters, longer cables, and mesh nodes each solve different problems. We audit your floor plan before selling accessories so you do not accumulate spare parts that never fit. Official adapters reduce incompatibility headaches versus random USB dongles.",
          "Cable quality matters on long vertical runs. Shielded Cat6A with drip loops survives sun and rodent exposure better than indoor-rated patch cords strung through windows.",
        ],
      },
      {
        heading: "Warranty and compatibility notes",
        paragraphs: [
          "Mixing non-Starlink PoE injectors can void hardware support. We label vendor-approved parts and keep receipts for business clients who track asset tags.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I buy the Ethernet adapter?",
        answer:
          "If you need a wired WAN into your firewall or third-party router, yes. We confirm firmware supports bridge modes before purchase.",
      },
      {
        question: "Do you stock mesh nodes on the truck?",
        answer:
          "Common models are stocked; specialty radios may ship within a few days. Surveys clarify what to bring on install day.",
      },
      {
        question: "Can you crimp custom cable lengths onsite?",
        answer:
          "Yes for standard jobs; exotic shielding may be prefabricated in the workshop for quality control.",
      },
    ],
  },
  "global-roaming": {
    sections: [
      {
        heading: "Matching hardware to the correct mobility class",
        paragraphs: [
          "Marine, in-motion, and portable plans each have different regulatory and hardware requirements. We verify that your dish variant matches how you actually operate to avoid account flags or poor performance at sea.",
          "Voice users asking “Does Starlink work while driving?” need nuanced answers about plan class and mounting safety. We refuse unsafe roof mounts and recommend professional marine brackets on vessels.",
        ],
      },
      {
        heading: "Logistics for teams crossing borders",
        paragraphs: [
          "Customs paperwork, spare kits, and SIM-free diagnostics become critical for touring crews. We pack rugged cases and document serial numbers so replacements are faster if baggage handlers damage gear.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I use a residential dish on a boat?",
        answer:
          "Usually no—hardware and plan class must align with maritime guidance. We review your itinerary before recommending a purchase.",
      },
      {
        question: "Do you install on vehicles?",
        answer:
          "Only with approved mounts and safety review. We prioritize crew safety over speed.",
      },
      {
        question: "How do you handle firmware updates offshore?",
        answer:
          "We schedule updates when vessels are in port with stable power, documenting rollback plans if needed.",
      },
    ],
  },
  "enterprise-plans": {
    sections: [
      {
        heading: "Throughput, SLAs, and realistic benchmarking",
        paragraphs: [
          "Enterprise buyers want Mbps numbers, jitter, and failover drills—not marketing fluff. We run iperf-style tests where permitted, log bufferbloat observations, and capture traceroutes to your critical SaaS endpoints. SLAs start with honest baselines, not promises we cannot measure.",
          "Hybrid WAN designs may combine fiber, MPLS, LTE, and Starlink. We document precedence, VPN pass-through needs, and VoIP DSCP markings so changes months later do not break QoS.",
        ],
      },
      {
        heading: "Security reviews and documentation",
        paragraphs: [
          "We deliver network diagrams, IP plans, and photo evidence of cable routes for auditors. Optional monitoring hooks export SNMP to your NOC if you operate 24/7 staff.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you support SD-WAN appliances?",
        answer:
          "Yes, common vendors are supported; share model numbers during the survey so we preload configs or spare ports.",
      },
      {
        question: "Can you work after hours for cutovers?",
        answer:
          "Night windows are available for retail and banking clients with prewritten rollback plans.",
      },
      {
        question: "How do you document acceptance?",
        answer:
          "Signed test sheets, speed logs, and photos are packaged for your ITIL change record.",
      },
    ],
  },
  "subscription-services": {
    sections: [
      {
        heading: "Choosing the right Starlink subscription class",
        paragraphs: [
          "Residential, business, mobility, and maritime plans differ in fair-use rules and hardware compatibility. We translate marketing names into practical guidance: how many concurrent video calls, whether uploads are symmetrical enough for design shops, and whether roaming fees apply.",
          "Procurement teams appreciate spreadsheets comparing total cost of ownership across power, spares, and subscription changes. We help build those models using official plan pages plus realistic Nigerian logistics costs.",
        ],
      },
      {
        heading: "Lifecycle management after activation",
        paragraphs: [
          "Plans change, cards expire, and hardware generations retire. We set calendar reminders for renewals and keep cold spares where budgets allow. Education clients appreciate termly check-ins before semester traffic spikes.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you manage billing on our behalf?",
        answer:
          "We can assist with renewals and reminders, but the legal account holder should remain your organization for compliance.",
      },
      {
        question: "What if Starlink pauses new activations in an area?",
        answer:
          "We monitor announcements and queue hardware deliveries accordingly, communicating delays early.",
      },
      {
        question: "Do nonprofits get different pricing?",
        answer:
          "Pricing is set by Starlink; we help with efficient installs and grant-friendly documentation instead of unofficial discounts.",
      },
    ],
  },
};

export function getServiceSeoContent(slug: string | undefined): ServiceSeoBlock | undefined {
  if (!slug) return undefined;
  return serviceSeoContent[slug];
}
