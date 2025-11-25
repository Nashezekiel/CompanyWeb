import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SpotlightCard from "@/components/site/SpotlightCard";
import { Satellite, ShieldCheck, Globe, Zap, Users, Target, Eye } from "lucide-react";
import Seo from "@/components/Seo";

export default function About() {
  return (
    <div className="flex flex-col">
      <Seo
        title="About Starlink Installation & Services | Starlink Installers in Nigeria"
        description="Learn about Starlink Installation & Services, a team of certified Starlink installers and network engineers providing dependable internet connectivity projects across Nigeria."
      />
      <section id="introduction" className="relative overflow-hidden scroll-mt-24 bg-[#000080] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,170,255,0.25)_0%,_rgba(0,0,128,0.65)_45%,_rgba(0,0,60,0.95)_100%)]" aria-hidden />
        <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.4),_transparent_55%)]" aria-hidden />
        <div className="container relative grid gap-14 py-20 md:grid-cols-2 md:gap-16 md:py-24">
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                <Satellite className="h-4 w-4" />
                About
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-4xl font-extrabold leading-tight tracking-tight">
                Engineering dependable connectivity across regions
              </h1>
            </div>
            <p className="text-base md:text-lg text-white/80 max-w-xl">
              We architect satellite and terrestrial networks tailored for homes, enterprises, NGOs, and remote operations
              blending Starlink distribution, enterprise WiFi, and resilient power to keep teams online where uptime matters most.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/85 backdrop-blur">
                <span className="font-semibold text-white">Certified Field Engineers</span>
                <p className="mt-1 text-white/70">Precision installations, spectrum planning, and SLA-backed support.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/85 backdrop-blur">
                <span className="font-semibold text-white">Coverage Beyond Limits</span>
                <p className="mt-1 text-white/70">Urban, rural, offshore, and aviation-ready deployments.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="bg-white text-[#000080] hover:bg-white/10 hover:text-white">
                <Link to="/contact">Start a Project</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/40 text-[#000080] hover:bg-white/10 hover:text-white">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative md:h-[520px]">
            <div className="absolute -inset-10 rounded-[40px] bg-white/10 blur-3xl" aria-hidden />
            <div className="relative h-full overflow-hidden rounded-[32px] border border-white/20 bg-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.45)] backdrop-blur">
              <img
                src="/images/products/starlink-mini/starlink.jpeg"
                alt="About Starlink Installation & Services"
                className="h-[320px] w-full object-cover md:h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000080]/90 via-[#000080]/60 to-transparent p-6 text-white">
                <p className="text-sm font-semibold tracking-wide text-white/90">Field deployment • 2025</p>
                <p className="text-xs text-white/70">Starlink installations, hybrid fiber failover, and managed WiFi mesh.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 pb-20 md:mt-12 md:pb-28">
        <div className="container">
          <div className="mx-auto max-w-6xl rounded-3xl border border-[#000080]/15 bg-white p-8 shadow-2xl shadow-[#000080]/15 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#000080]/60">By the numbers</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#000080] md:text-4xl">Measurable impact for every deployment</h2>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                From bespoke site surveys to long-range extensions, our team pairs certified expertise with measurable outcomes that clients can trust.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Stat kpi="1000+" label="Installations Completed" />
              <Stat kpi="10km" label="WiFi Reach" />
              <Stat kpi="99.9%" label="Uptime Targets" />
              <Stat kpi="24/7" label="Support Availability" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbff] via-white to-[#eef1ff]" aria-hidden />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#000080]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#000080]">
              <ShieldCheck className="h-4 w-4" />
              What guides our work
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-[#000080]">Our mission & values</h2>
            <p className="mt-3 text-base text-slate-600 md:text-lg">
              Technical excellence, resilient delivery, and customer-first service across every project—engineered for performance in the most demanding environments.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start">
            <div
              id="mission"
              className="scroll-mt-24 rounded-3xl border border-white/40 bg-[#000080] p-8 text-white shadow-2xl shadow-[#000080]/35"
            >
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Our Mission</h3>
              <p className="mt-3 text-base text-white/80">
                Empower communities and businesses with dependable connectivity through precise engineering and professional delivery.
                We combine modern satellite backhaul, enterprise WiFi, and robust power solutions to keep people and operations online.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
                <li className="flex gap-3">
                  <ShieldCheck className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
                  Uptime-first architectures, built with redundancy and proactive monitoring.
                </li>
                <li className="flex gap-3">
                  <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
                  High-throughput WiFi and long-range backhaul tuned for mission-critical operations.
                </li>
                <li className="flex gap-3">
                  <Users className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
                  Human-centered delivery with certified field engineers and transparent SLAs.
                </li>
                <li className="flex gap-3">
                  <Globe className="mt-1 h-4 w-4 flex-shrink-0 text-white" />
                  Coverage plans for urban, rural, offshore, aviation, and remote research sites.
                </li>
              </ul>
            </div>

            <div
              id="vision"
              className="scroll-mt-24 rounded-3xl border border-[#000080]/10 bg-white/90 p-8 shadow-xl shadow-[#000080]/10 backdrop-blur"
            >
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#000080]">Our Vision</h3>
              <p className="mt-3 text-base text-slate-600">
                A world where connectivity is reliable, accessible, and resilient—enabling education, safety, and economic opportunity in every region.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <MiniValue icon={<Eye className="h-5 w-5 text-[#000080]" />} title="Clarity" desc="Transparent delivery, measurable outcomes." />
                <MiniValue icon={<Globe className="h-5 w-5 text-[#000080]" />} title="Inclusivity" desc="Solutions for urban, rural, and remote." />
                <MiniValue icon={<Zap className="h-5 w-5 text-[#000080]" />} title="Performance" desc="Low-latency, high-uptime networks." />
              </div>
            </div>
          </div>

          <div
            id="core-values"
            className="relative mt-12 scroll-mt-24"
          >
            <div className="pointer-events-none absolute inset-x-0 -top-4 hidden h-px bg-gradient-to-r from-transparent via-[#000080]/20 to-transparent md:block" aria-hidden />
            <div className="rounded-3xl border border-[#000080]/15 bg-white/95 p-6 shadow-xl shadow-[#000080]/10 backdrop-blur">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#000080]">Our Core Values</h3>
              <p className="mt-2 text-sm text-slate-600">
                These are the principles that guide our work from survey to commissioning and ongoing support.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 [grid-auto-rows:1fr]">
                <ValueCard icon={<Target className="h-5 w-5 text-[#000080]" />} title="Mission" desc="Empower communities and businesses with dependable connectivity through precise engineering and professional delivery." />
                <ValueCard icon={<ShieldCheck className="h-5 w-5 text-[#000080]" />} title="Reliability" desc="Uptime-focused architecture, redundancy, and proactive monitoring for mission-critical use." />
                <ValueCard icon={<Globe className="h-5 w-5 text-[#000080]" />} title="Reach" desc="Deployments across urban, rural and remote regions with enterprise and NGO partners." />
                <ValueCard icon={<Zap className="h-5 w-5 text-[#000080]" />} title="Precision" desc="Certified installers, standards-based cabling, and best-practice configurations." />
                <ValueCard icon={<Users className="h-5 w-5 text-[#000080]" />} title="Service" desc="Consultative approach, clear SLAs, and responsive support." />
                <ValueCard icon={<Satellite className="h-5 w-5 text-[#000080]" />} title="Innovation" desc="Modern satellite connectivity combined with enterprise networking and power solutions." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 bg-[#000080] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(0,200,255,0.35),transparent_55%)] opacity-70" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_90%,rgba(255,255,255,0.18),transparent_60%)]" aria-hidden />
        <div className="container relative grid items-center gap-14 md:grid-cols-2 md:gap-16">
          <div className="order-2 md:order-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.34em] text-white/80">
              Precision delivery
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">Engineering, done right</h3>
            <p className="text-base text-white/75">
              From the first site survey to commissioning, we follow best-practice standards in design, cabling, RF planning, and power. The result is stable, high-throughput networks designed to scale with your operations.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Standards-based build</p>
                  <p className="text-xs text-white/70">Structured cabling, grounding, surge protection, and failover power.</p>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Active monitoring</p>
                  <p className="text-xs text-white/70">Telemetry, alerting, and periodic audits to maintain peak performance.</p>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:col-span-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Multi-site mastery</p>
                  <p className="text-xs text-white/70">Indoor/outdoor mesh, point-to-point spans up to 10km, and international roaming coverage.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="bg-white text-[#000080] hover:bg-white/10 hover:text-white">
                <Link to="/contact">Schedule a site survey</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/40 text-[#000080] hover:bg-white/10 hover:text-white">
                <Link to="/services">View engineering playbook</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute -inset-10 rounded-[36px] bg-white/15 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.45)] backdrop-blur">
              <img
                src="/images/products/starlink-gen3v4/StandardDish1.jpeg"
                alt="Engineering preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#000080]/90 via-[#000080]/60 to-transparent p-6 text-sm text-white/80">
                Precise rooftop alignment with redundant power and monitored mesh nodes.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0f4ff] via-white to-[#f8fbff]" aria-hidden />
        <div className="container relative space-y-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#000080]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#000080]">
              Milestones
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#000080]">A track record of expansion</h3>
            <p className="mt-3 text-base text-slate-600">
              We evolve alongside our clients—adding capabilities, certifications, and coverage that push the boundaries of connected operations.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <TimelineItem year="2018" title="Founding" text="Began delivering connectivity projects and building field expertise." />
            <TimelineItem year="2021" title="Starlink Era" text="Scaled Starlink distribution and professional installations." />
            <TimelineItem year="2023–Now" title="Enterprise Expansion" text="WISP enablement, managed networks, and 24/7 support at scale." />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000080] via-[#000080] to-[#000060]" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,180,255,0.35),_transparent_55%)]" aria-hidden />
        <div className="container relative">
          <SpotlightCard className="relative mx-auto max-w-3xl text-center p-10 md:p-12 bg-[#000080] bg-none border border-white/25" spotlightColor="rgba(0, 229, 255, 0.35)">
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Get Starlink devices and professional installation in Nigeria</h3>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-white/85">We supply Starlink hardware, handle installation, and set up reliable connectivity for homes, businesses, and remote sites across Nigeria.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/contact">Talk to Us</Link>
              </Button>
              <Button asChild className="bg-white text-blue-900 hover:bg-white/90">
                <Link to="/services">See Solutions</Link>
              </Button>
            </div>
          </SpotlightCard>
        </div>
      </section>
    </div>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#000080]/10 bg-[#000080]/5 p-6 text-center shadow-md shadow-[#000080]/5">
      <div className="text-3xl font-extrabold tracking-tight text-[#000080]">{kpi}</div>
      <div className="mt-2 text-sm font-medium text-slate-600">{label}</div>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[#000080]/10 bg-white/95 p-6 shadow-md shadow-[#000080]/10 backdrop-blur">
      <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-[#000080]/10 px-2 py-1 text-xs font-semibold text-[#000080]">
        {icon}
        <span>{title}</span>
      </div>
      <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}

function MiniValue({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[#000080]/10 bg-white/95 p-4 shadow-sm shadow-[#000080]/5">
      <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-[#000080]">
        {icon}
        <span>{title}</span>
      </div>
      <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}

function TimelineItem({ year, title, text }: { year: string; title: string; text: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#000080]/15 bg-white/95 p-6 shadow-lg shadow-[#000080]/10 backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#000080] via-[#3f51ff] to-[#00b4ff]" aria-hidden />
      <div className="pt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#000080]/80">{year}</div>
      <div className="mt-2 text-lg font-semibold text-[#000080]">{title}</div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}
