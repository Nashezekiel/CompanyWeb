export type Product = {
  id: string;
  slug: string;
  name: string;
  price: string;
  short: string;
  specs: Record<string, string>;
  whatsInBox: string[];
  description: string;
  installationAvailable: string;
  image?: string;
  images?: string[];
};

export const products: Product[] = [
  {
    id: "starlink-gen3v4",
    slug: "starlink-gen3v4",
    name: "Starlink Gen3 v4 Standard Dish",
    price: "N650,000",
    short: "High-speed Starlink kit with Wi‑Fi 6, IP67 rating and professional installation options.",
    description:
      "High‑speed, low‑latency Starlink kit with rugged IP67 dish, Wi‑Fi 6 router and dual Ethernet. Typical 220/25 Mbps and 20–40 ms latency — ideal for homes and small businesses; professional installation available.",
    specs: {
      "Dimensions": "594 x 383 x 39.7 mm (23.4\" x 15.07\" x 1.5\")",
      "Weight": "4.2 kg (7.9 lbs) with cable, 2.9 kg (6.4 lbs) without cable",
      "Antenna": "Electronic Phased Array, 110° field of view",
      "IP Rating": "IP67 dust and water resistant",
      "Power Consumption": "75-100W",
      "WiFi": "Wi-Fi 6 (802.11ax), tri-band, 4 x 4 MU-MIMO, WPA2 security",
      "Speed": "Up to 220 Mbps download, up to 25 Mbps upload",
      "Latency": "20-40 ms",
      "Connectivity": "2 x RJ45 Ethernet ports, Wi-Fi 6, up to 235 devices",
      "Operating Temperature": "-30°C to 50°C (-22°F to 122°F)",
      "Wind Resistance": "Operational up to 96 kph (60 mph)"
    },
    whatsInBox: [
      "Starlink dish (Dishy McFlatface)",
      "Wi-Fi router (298.6 x 120.4 x 43.4 mm)",
      "Power supply unit",
      "15 m (49.2 ft) Starlink cable",
      "1.5 m (4.92 ft) AC power cable"
    ],
    installationAvailable: "Installation Services, Pivot mount & Wi-Fi distribution services Available",
    image: "/images/products/starlink-gen3v4/StandardDish1.jpeg",
    images: [
      "/images/products/starlink-gen3v4/StandardDish1.jpeg",
      "/images/products/starlink-gen3v4/StandardDish11.jpeg"
    ]
  },
  {
    id: "starlink-flat-hp",
    slug: "starlink-flat-hp",
    name: "Starlink Flat High Performance Dish",
    price: "N4,000,000",
    short:
      "High-performance flat dish for organisations, marine, aviation and mobile deployments.",
    description:
      "The Starlink Flat High Performance dish is designed for high-speed, low-latency internet connectivity on-the-go, perfect for high-demand organisations, RVs, boats, and other vehicles.",
    specs: {
      Dimensions: "22.6 x 20.1 x 1.6 inches",
      Weight: "13 pounds",
      Speed: "Up to 1000 Mbps download, up to 25 Mbps upload",
      Latency: "20-40 ms",
      "Field of View": "140°",
      "Environmental Rating": "IP56",
      "Power Consumption": "110-150 W/hour",
      Connectivity: "Wi‑Fi 6",
      "Wind Rating": "Survivable 280 kph (174 mph+)",
      "Operating Temp": "-30°C to 50°C",
    },
    whatsInBox: [
      "Starlink Flat High Performance dish",
      "Wedge mount",
      "Power supply (100-240V)",
      "Power supply mount",
      "25 m Starlink cable",
      "5 m Ethernet cable",
      "1.8 m AC cable",
    ],
    installationAvailable:
      "Installation, configuration and Wi‑Fi distribution services available",
    image: "/images/products/starlink-flat-hp/FlatHighperformanceversion.jpeg",
    images: [
      "/images/products/starlink-flat-hp/FlatHighperformanceversion.jpeg",
      "/images/products/starlink-flat-hp/FlatHighperformanceversion1.jpeg",
      "/images/products/starlink-flat-hp/FlatHighperformanceversion11.jpeg",
    ],
  },
  {
    id: "starlink-mini",
    slug: "starlink-mini",
    name: "Starlink Mini",
    price: "N450,000",
    short:
      "Compact, portable Starlink kit with integrated Wi‑Fi router — ideal for travel and small-scale users.",
    description:
      "Starlink Mini is a compact, portable satellite internet kit designed for on-the-go connectivity and small scale users. It's a travel-friendly version of the standard Starlink V4 dish, integrating a Wi‑Fi router directly into the dish for simplified setup.",
    specs: {
      Size: "11.8 x 10.2 inches; 1.5 inches thick",
      Weight: "2.6 pounds (with kickstand)",
      Speed: "Up to 100 Mbps download, 20 Mbps upload",
      Latency: "~20 ms",
      Power: "External power supply (12–48V compatible); 20–40W",
      WiFi: "Integrated dual-band Wi‑Fi 5; supports up to 128 devices",
      "Field of View": "110°",
      "Windspeed Rating": "60 mph",
      Router: "Integrated dual-band Wi‑Fi 5 with 1 Ethernet port; WPA2",
      Compatibility: "Works with Starlink Roam plan only; supports up to 3 Starlink Mesh Nodes",
    },
    whatsInBox: [
      "Starlink Mini dish with integrated router",
      "Kickstand",
      "External power supply",
      "Starlink cable (length may vary)",
      "AC power cable",
    ],
    installationAvailable:
      "Installation Services and Wi‑Fi distribution services available",
    image: "/images/products/starlink-mini/StarlinkMini11.jpeg",
    images: [
      "/images/products/starlink-mini/StarlinkMini1.jpeg",
      "/images/products/starlink-mini/StarlinkMini11.jpeg",
      "/images/products/starlink-mini/StarlinkMini111.jpeg",
    ],
  },
];
