export type ServiceLocation = {
  slug: string;
  name: string;
  regionLabel: string;
  title: string;
  metaDescription: string;
  /** Primary keyword phrase for H1 support */
  headline: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedServiceSlugs: string[];
};

export const serviceLocations: ServiceLocation[] = [
  {
    slug: "abuja",
    name: "Abuja",
    regionLabel: "Federal Capital Territory",
    title: "Starlink Installation Abuja | Certified Installers | DataGram Nigeria",
    metaDescription:
      "Book Starlink installation in Abuja, FCT. Site surveys, rooftop mounting, mesh WiFi, and business failover by DataGram. Get a free site survey today.",
    headline: "Starlink installation in Abuja by certified DataGram installers",
    intro:
      "Abuja homes, embassies, schools, and remote offices need dependable internet for video calls, cloud apps, and security systems. DataGram provides Starlink installation across the FCT, from Maitama and Wuse to Gwarinpa and airport logistics zones. We speak clearly about sky view, cable routes, and power resilience so you know what to expect before we climb the roof.",
    sections: [
      {
        heading: "Where we install in Abuja",
        paragraphs: [
          "We routinely work in central districts and growing suburbs where roof access varies from flat concrete slabs to pitched tiles. If your estate has strict drilling rules, we coordinate approvals and often propose non-destructive ballast mounts when structurally appropriate.",
          "Voice searches like “Who installs Starlink in Abuja?” usually mean customers want a technician today. Keep our WhatsApp handy with your PIN and photos of your roof line so we can respond quickly with a survey slot.",
        ],
      },
      {
        heading: "Business and enterprise Starlink in the FCT",
        paragraphs: [
          "Organizations pair Starlink with fiber failover, VLANs for finance and operations teams, and long-range links to outbuildings. Tell us how many users rely on VPN, what uptime you need, and whether generators cycle daily so we can engineer clean power paths for routers and radios.",
        ],
      },
    ],
    relatedServiceSlugs: ["sales-installation", "whole-premises", "enterprise-plans"],
  },
  {
    slug: "lagos",
    name: "Lagos",
    regionLabel: "Lagos State",
    title: "Starlink Installation Lagos | Lekki, VI, Ikeja | DataGram Nigeria",
    metaDescription:
      "Professional Starlink installation Lagos-wide: Lekki, Victoria Island, Ikeja, Surulere, and beyond. Hardware, mounting, mesh WiFi, and support. Book a survey today.",
    headline: "Starlink installation across Lagos with same-week surveys on request",
    intro:
      "Lagos customers ask for quiet cable runs, surge-safe power, and WiFi that survives generator cycles. DataGram installs Starlink for apartments with landlord coordination, duplexes, factories on the mainland, and creative studios on the island. We plan for salt air near the coast and tight cable trays in commercial risers.",
    sections: [
      {
        heading: "Neighborhoods we serve",
        paragraphs: [
          "We cover Victoria Island, Lekki Phase 1 and 2, Ajah, Yaba, Surulere, Ikeja GRA, Magodo, and expanding corridors toward Epe. If your estate has height limits for masts, we model obstruction maps early so you do not buy the wrong dish variant.",
          "Customers often search “buy Starlink Nigeria” after seeing ads. We help you pick the correct hardware tier, then handle mounting and activation so your first week online is smooth.",
        ],
      },
      {
        heading: "Offices, studios, and hybrid work",
        paragraphs: [
          "Hybrid teams need stable Zoom and reliable uploads. We segment guest WiFi, prioritize VoIP where possible, and document IP schemes for your IT vendor. Ask about combining Starlink with existing fiber for automatic failover.",
        ],
      },
    ],
    relatedServiceSlugs: ["sales-installation", "long-range", "backup-power"],
  },
  {
    slug: "port-harcourt",
    name: "Port Harcourt",
    regionLabel: "Rivers State",
    title: "Starlink Installation Port Harcourt | DataGram Rivers State",
    metaDescription:
      "Starlink installers in Port Harcourt and Rivers State. Rooftop surveys, weatherproof cabling, mesh WiFi, and backup power. Call DataGram for a free site survey today.",
    headline: "Starlink installation Port Harcourt customers trust for clean cable work",
    intro:
      "Port Harcourt’s mix of industrial plants, residential estates, and riverside properties demands flexible mounting and honest rain-season expectations. Our local crews understand estate security protocols and work with facility managers to keep installs tidy and well documented.",
    sections: [
      {
        heading: "Industrial and residential coverage",
        paragraphs: [
          "From Trans Amadi layouts to newer estates in Obio-Akpor, we align dishes for the best sky view while keeping cable shields grounded properly. Factories often add long-range links to gatehouses; homes may prioritize kid-safe cable routing and mesh for upstairs bedrooms.",
        ],
      },
    ],
    relatedServiceSlugs: ["sales-installation", "whole-premises", "wisp-setup"],
  },
  {
    slug: "kano",
    name: "Kano",
    regionLabel: "Kano State",
    title: "Starlink Installation Kano | Northern Nigeria Coverage | DataGram",
    metaDescription:
      "Book Starlink installation in Kano and northern Nigeria. DataGram handles surveys, mounts, mesh WiFi, and enterprise failover. Get a free site survey today.",
    headline: "Starlink installation Kano and northern corridors with experienced field teams",
    intro:
      "Northern Nigeria customers often ask whether satellite fits their dust-season environment and power patterns. We design mounts that handle wind loads, seal cable penetrations against dust, and recommend inverter or battery pairings that match your generator schedule.",
    sections: [
      {
        heading: "Serving Kano metro and surrounding towns",
        paragraphs: [
          "We support urban Kano properties and outreach to nearby commercial hubs where fiber is limited. Voice queries like “Starlink installer near me” reward consistent business names, addresses, and phone numbers—exactly why we publish our NAP in the site footer and structured data.",
        ],
      },
    ],
    relatedServiceSlugs: ["sales-installation", "backup-power", "global-roaming"],
  },
];

export function getLocationBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return serviceLocations.find((l) => l.slug === slug);
}
