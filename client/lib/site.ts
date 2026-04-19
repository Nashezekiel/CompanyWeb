/** Central site identity for SEO, schema, NAP, and llms.txt alignment. Override with VITE_SITE_URL in env. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://www.datagram.ng").replace(/\/$/, "");

export const BRAND_NAME = "DataGram";
export const LEGAL_BUSINESS_NAME = "DataGram";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og/starlink-global-network-og.jpg`;

export const DEFAULT_DESCRIPTION =
  "DataGram is a professional Starlink installer in Nigeria. Starlink installation Nigeria-wide, hardware sales, enterprise WiFi, and 24/7 support. Get a free site survey today.";

export const BUSINESS_PHONE_E164 = "+2349060976424";
export const BUSINESS_PHONE_DISPLAY = "+234 906 097 6424";
export const BUSINESS_EMAIL = "Appdatagram@gmail.com";
export const WHATSAPP_URL = "https://wa.me/2349060976424";

export const BUSINESS_ADDRESS = {
  streetAddress: "House 7, Trunk H, Mandela Estate, SARS Road",
  addressLocality: "Port Harcourt",
  addressRegion: "Rivers State",
  postalCode: "500102",
  addressCountry: "NG",
} as const;

export const BUSINESS_GEO = {
  latitude: 4.8156,
  longitude: 7.0498,
} as const;

export const SAME_AS = [
  "https://www.facebook.com/datagramnetwork",
  "https://www.instagram.com/datagramnetwork",
] as const;
