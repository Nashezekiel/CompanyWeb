export type ComprehensiveFaq = {
  id: string;
  question: string;
  /** 40–60 words, conversational; suitable for voice and featured snippets */
  answer: string;
};

export const comprehensiveFaqs: ComprehensiveFaq[] = [
  {
    id: "cost",
    question: "How much does Starlink installation cost in Nigeria?",
    answer:
      "Installation pricing depends on roof type, cable runs, grounding, and whether you need mesh WiFi or long-range links. Most residential jobs are quoted after a quick site survey so we can confirm dish placement and materials. Request a free site survey today and we will send a clear, itemized quote before any work begins.",
  },
  {
    id: "duration",
    question: "How long does Starlink installation take?",
    answer:
      "A typical home install takes about two to four hours from arrival to online testing, assuming safe roof access and a straightforward cable path. Larger estates, multi-building campuses, or long-range point-to-point links may take a full day or more. We schedule enough time for alignment, speed tests, and a short handover so you know how everything works.",
  },
  {
    id: "all-states",
    question: "Does Starlink work in all 36 states of Nigeria?",
    answer:
      "Starlink is available across Nigeria where coverage and regulatory conditions allow service. Performance still depends on sky view, obstructions, and local power quality. We verify line-of-sight during the survey and recommend the right dish variant for your location, whether you are in Lagos, Abuja, Port Harcourt, Kano, or a rural community.",
  },
  {
    id: "included",
    question: "What is included in a Starlink installation?",
    answer:
      "Our standard installation includes mounting the dish on an approved bracket, weatherproof cable routing, grounding where required, router placement, app activation, and speed verification. We also label ports, tidy cable runs, and share basic troubleshooting tips. Enterprise jobs may add VLANs, failover, rack power, and documentation for your IT team.",
  },
  {
    id: "business",
    question: "Can Starlink be used for businesses and enterprises?",
    answer:
      "Yes. Businesses use Starlink for primary links, backup failover, construction sites, rural branches, and remote monitoring. We design for capacity, security, and uptime with options like high-performance dishes, long-range WiFi, and hybrid power. Tell us your user count, critical apps, and SLAs so we can recommend the right hardware and network layout.",
  },
  {
    id: "monthly-fee",
    question: "What is the monthly subscription fee for Starlink in Nigeria?",
    answer:
      "Monthly fees are set by Starlink and can change with plan type such as Residential, Business, Mobility, or Maritime. We help you pick the correct plan for your use case and explain what is included before you activate. For the latest official pricing, we link customers to Starlink plan pages and confirm totals before checkout.",
  },
  {
    id: "diy",
    question: "Do I need a technician to install Starlink or can I do it myself?",
    answer:
      "Self-install is possible for some users, but many Nigerian homes need safe roof access, surge protection, and longer cable runs than the kit allows. A certified installer reduces downtime, avoids alignment mistakes, and helps with mesh or VLAN setups. If you already have a dish, we can still assist with optimization, cable upgrades, and WiFi extension.",
  },
  {
    id: "weather",
    question: "Does bad weather affect Starlink internet in Nigeria?",
    answer:
      "Heavy rain can reduce satellite margins for short periods, similar to other wireless technologies. Proper dish alignment, quality cabling, and stable power improve resilience. We plan mounts and grounding for local storm patterns and can recommend backup power if your site cannot tolerate brief dips during severe weather.",
  },
  {
    id: "equipment",
    question: "Where can I buy Starlink hardware in Nigeria?",
    answer:
      "You can purchase kits and accessories through our product catalog and nationwide delivery options. We stock standard and high-performance variants where available and advise on mounts, Ethernet adapters, and mesh add-ons. If you are unsure which dish fits your property, start with a survey so you buy the right model the first time.",
  },
  {
    id: "activation",
    question: "How does activation work after installation?",
    answer:
      "After mounting and cabling, we power the system, run the Starlink app checks, and confirm firmware updates. We verify obstruction data, rename the network if you want, and test real devices on your LAN. For business setups we document WAN settings, DHCP or static routes, and any VLANs so your team can manage changes later.",
  },
  {
    id: "trees",
    question: "Do I need a clear sky view for Starlink?",
    answer:
      "Yes. Starlink needs a wide view of the sky so phased-array antennas can track satellites. Trees, parapets, and tall buildings can block service. During the survey we map obstructions in the app and may suggest a taller mast, a different roof zone, or a high-performance dish for difficult sites.",
  },
  {
    id: "power",
    question: "What happens to Starlink during Nigerian power outages?",
    answer:
      "Starlink equipment needs reliable power at the router and dish locations. Many clients pair Starlink with inverters, lithium batteries, or small solar setups for uptime. We install clean power paths where needed and can bundle backup systems so your office or home stays online when the grid drops.",
  },
  {
    id: "wifi-range",
    question: "Can you extend WiFi beyond one building?",
    answer:
      "Yes. We use point-to-point wireless links, fiber where available, and mesh access points to reach guard houses, staff quarters, warehouses, and remote gates. Distances beyond a few hundred meters need line-of-sight planning. Tell us your map distances and we will propose radios with realistic throughput expectations.",
  },
  {
    id: "wisp",
    question: "Can Starlink power a small ISP or WISP resale business?",
    answer:
      "Operators use Starlink as backhaul with proper planning for contention, fair-use policies, and billing. We help design voucher flows, bandwidth shaping, and tower or mast placement. Compliance and backhaul economics vary by site, so we review your subscriber targets before recommending hardware tiers.",
  },
  {
    id: "support",
    question: "Do you offer ongoing support after installation?",
    answer:
      "We provide remote troubleshooting, on-site visits, cable repairs, and performance checks. Enterprise clients can choose proactive monitoring and maintenance windows. Save our WhatsApp and phone contacts so your team can reach an engineer quickly when issues arise.",
  },
  {
    id: "latency",
    question: "What speeds and latency should I expect?",
    answer:
      "Speeds vary by plan, network load, and obstructions, but many customers see download rates suitable for HD video, VPN, and cloud apps when the dish is well placed. Latency is typically lower than traditional geostationary satellite and works well for video calls when the network is configured correctly.",
  },
  {
    id: "roof",
    question: "Is roof drilling required for Starlink installation?",
    answer:
      "Most permanent mounts need anchor points into structural metal or concrete, installed with weatherproof sealing. Non-penetrating options exist for some flat roofs but still need ballast and safety review. We follow safety harness rules and discuss any landlord or estate restrictions before drilling begins.",
  },
  {
    id: "estates",
    question: "Do you install Starlink for estates and gated communities?",
    answer:
      "Yes. We coordinate with facility managers for roof access, conduit paths, and generator areas. Shared installs may use central backhaul with distribution to villas. Send your estate layout and power locations so we can plan cable trays and outdoor access points.",
  },
  {
    id: "marine",
    question: "Do you support maritime or mobility Starlink plans?",
    answer:
      "We assist clients who need in-motion or marine-approved hardware paired with the correct subscription class. Mounting on vessels requires marine brackets and grounding discipline different from buildings. Share your vessel type and usage region so we can confirm compatible hardware and installation scope.",
  },
  {
    id: "security",
    question: "How do you secure the network after installation?",
    answer:
      "We change default WiFi credentials, enable strong passwords, disable unused services where applicable, and segment guest networks for offices. Optional VLANs isolate cameras, POS, and staff devices. If you have compliance requirements, tell us during planning so we bake controls into the design.",
  },
  {
    id: "survey",
    question: "How do I book a free site survey?",
    answer:
      "Message us on WhatsApp or use the contact form with your address, property type, and photos of the roof line if possible. We will propose a survey window, confirm access requirements, and share what to expect on installation day. Early surveys prevent costly rework from poor dish placement.",
  },
  {
    id: "returns",
    question: "What if my location cannot get a good Starlink signal?",
    answer:
      "If the survey shows persistent obstructions that cannot be solved with reasonable mast height or relocation, we explain the risks before you invest in hardware. Our goal is honest guidance, not a rushed sale. We can also suggest alternative connectivity paths where satellite is not the right fit.",
  },
];
