import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Instagram, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { contact, images, projects, services } from "@/data/site-content";
import { enquirySchema, whatsappText } from "@/lib/enquiry";
import logoAsset from "@/assets/mvr-logo.webp.asset.json";

const description = "MVR Interiors is a Hyderabad-based interior design and execution studio delivering thoughtful residential spaces across South India.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MVR Interiors | Interior Design & Execution in Hyderabad" },
      { name: "description", content: description },
      { property: "og:title", content: "MVR Interiors | Interior Design & Execution in Hyderabad" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const nav = ["Home", "About", "Services", "Projects", "Process", "Contact"];
const why = [
  ["30+ Years of Experience", "A seasoned understanding of spaces, materials and what endures."],
  ["300+ Completed Projects", "A substantial body of residential work built through referrals and trust."],
  ["Personal Attention", "Founder-led conversations and close involvement through every stage."],
  ["Design Meets Execution", "Creative intent carried carefully from the first sketch to final handover."],
];
const process = ["Consultation", "Concept & Design", "Material & Detail Selection", "Execution", "Handover"];

function WhatsAppLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <a href={contact.whatsapp} target="_blank" rel="noreferrer" className={className}>{children}</a>;
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const parsed = enquirySchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the details entered.");
      return;
    }
    setError("");
    setStatus("sending");

    const chat = window.open("", "_blank", "noopener,noreferrer");
    try {
      await fetch("/api/public/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
    } catch {
      /* WhatsApp handoff still proceeds */
    }

    const url = `${contact.whatsapp}?text=${encodeURIComponent(whatsappText(parsed.data))}`;
    if (chat) chat.location.href = url;
    else window.open(url, "_blank", "noopener,noreferrer");
    setStatus("sent");
    form.reset();
  }

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "border-b border-border bg-background/95 shadow-sm backdrop-blur" : "bg-background/80 backdrop-blur-sm"}`}>
        <div className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-all lg:px-10 ${scrolled ? "h-16" : "h-20"}`}>
          <a href="#home" aria-label="MVR Interiors home" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="MVR Interiors" className={`aspect-square rounded-full object-cover transition-all ${scrolled ? "h-12 w-12" : "h-14 w-14"}`} />
            <span className="hidden sm:block"><strong className="block font-display text-lg font-medium leading-none">MVR Interiors</strong><small className="mt-1 block text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Design & Execution</small></span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <WhatsAppLink className="hidden min-h-11 items-center gap-2 bg-primary px-5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"><MessageCircle size={16} />{contact.phone}</WhatsAppLink>
            <WhatsAppLink className="grid h-11 w-11 place-items-center bg-primary text-primary-foreground sm:hidden" ><MessageCircle size={19} /><span className="sr-only">WhatsApp MVR Interiors</span></WhatsAppLink>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-5 lg:hidden">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-4 font-display text-2xl">{item}</a>)}</nav>}
      </header>

      <section id="home" className="relative min-h-[92vh] pt-20">
        <img src={images.hero} alt="Elegant modern living room interior" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex min-h-[calc(92vh-5rem)] max-w-[1440px] items-end px-5 pb-16 lg:px-10 lg:pb-20">
          <div className="max-w-4xl text-primary-foreground">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em]">Interior Design & Execution · Hyderabad</p>
            <h1 className="max-w-4xl font-display text-5xl font-normal leading-[0.98] sm:text-7xl lg:text-[92px]">Spaces Designed<br />to Be Lived In.</h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-primary-foreground/85 sm:text-lg">MVR Interiors brings together thoughtful design, practical execution and three decades of experience to create spaces that feel distinctly yours.</p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-primary-foreground/75">Hyderabad&nbsp; | &nbsp;Bengaluru&nbsp; | &nbsp;Nandyal&nbsp; | &nbsp;Andhra Pradesh</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppLink className="inline-flex min-h-12 items-center gap-2 bg-background px-6 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-accent"><MessageCircle size={17} /> WhatsApp Us</WhatsAppLink>
              <a href="#projects" className="inline-flex min-h-12 items-center gap-2 border border-primary-foreground/60 px-6 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-primary-foreground hover:text-foreground">Explore Our Projects <ArrowRight size={16} /></a>
            </div>
          </div>
          <a href="#about" className="absolute bottom-8 right-10 hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary-foreground lg:flex">Scroll to discover <ArrowDown size={15} /></a>
        </div>
      </section>

      <section aria-label="Experience and trust" className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 lg:grid-cols-4 lg:px-10">
          {[["30+", "Years Experience"], ["300+", "Projects Completed"], ["4+", "Locations Across South India"], ["Founder-led", "Design & Execution"]].map(([value, label], i) => <div key={label} className={`py-8 lg:py-10 ${i % 2 ? "pl-5" : "pr-5"} ${i < 3 ? "lg:border-r lg:border-border" : ""} lg:px-8 first:lg:pl-0`}><strong className="block font-display text-3xl font-normal lg:text-4xl">{value}</strong><span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span></div>)}
        </div>
      </section>

      <section id="about" className="section-space scroll-mt-16">
        <div className="mx-auto grid max-w-[1300px] gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24 lg:px-10">
          <div className="relative"><img src={images.about} alt="Layered neutral living room designed with natural materials" className="aspect-[4/5] w-full object-cover" /><div className="absolute -bottom-6 right-0 bg-primary px-6 py-5 text-primary-foreground sm:right-[-24px]"><span className="font-display text-3xl">Since the 1990s</span><span className="block text-[9px] uppercase tracking-[0.18em] opacity-70">Creating considered interiors</span></div></div>
          <div><p className="eyebrow">About MVR Interiors</p><h2 className="section-title">More Than Interiors.<br />We Create Spaces With Purpose.</h2><div className="mt-8 max-w-xl space-y-5 text-base leading-8 text-muted-foreground"><p>Every home begins with a way of living. We listen closely, understand the practical details, and shape interiors around the people who will use them every day.</p><p>Our approach brings design thinking and execution under one roof—balancing proportion, material, light and function with the realities of a working site.</p><p>With three decades of experience, MVR Interiors is built on calm expertise, transparent conversations and a commitment to getting the details right.</p></div></div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <img src={images.founder} alt="Portrait placeholder for MV Ramana, founder of MVR Interiors" className="h-full min-h-[500px] w-full object-cover object-top grayscale" />
          <div className="flex items-center px-5 py-16 lg:px-20 lg:py-24"><div><p className="eyebrow text-primary-foreground/60">Founder</p><h2 className="section-title max-w-xl">The Vision Behind MVR Interiors</h2><div className="mt-8 max-w-xl space-y-5 leading-8 text-primary-foreground/75"><p>MV Ramana’s journey in interior design and execution spans around three decades—shaped by hands-on experience, enduring client relationships and a deep respect for how people inhabit their spaces.</p><p>Across Hyderabad, Bengaluru, Nandyal and Andhra Pradesh, his work is guided by empathy: listening before drawing, solving before styling, and staying closely involved until every detail is complete.</p></div><div className="mt-10 border-t border-primary-foreground/20 pt-5"><strong className="font-display text-2xl font-normal">MV Ramana</strong><span className="ml-3 text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60">Founder, MVR Interiors</span></div></div></div>
        </div>
      </section>

      <section id="services" className="section-space scroll-mt-16">
        <div className="mx-auto max-w-[1300px] px-5 lg:px-10"><div className="grid gap-7 border-b border-border pb-10 lg:grid-cols-2 lg:items-end"><div><p className="eyebrow">What We Do</p><h2 className="section-title">Complete Interiors,<br />Considered End to End.</h2></div><p className="max-w-lg leading-7 text-muted-foreground lg:justify-self-end">From individual rooms to complete homes, we coordinate the creative and practical work required to bring a space together.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-3">{services.map((service, i) => <div key={service} className="group border-b border-border py-7 sm:px-6 sm:first:pl-0 lg:min-h-36 lg:border-r lg:p-8 lg:first:pl-0"><span className="text-[10px] text-muted-foreground">0{i + 1}</span><h3 className="mt-7 flex items-center justify-between font-display text-2xl font-normal"><span>{service}</span><ArrowRight className="opacity-30 transition-transform group-hover:translate-x-1 group-hover:opacity-100" size={18} /></h3></div>)}</div></div>
      </section>

      <section id="projects" className="section-space scroll-mt-16 bg-secondary">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10"><p className="eyebrow">Selected Projects</p><div className="mb-12 flex flex-wrap items-end justify-between gap-5"><h2 className="section-title">Spaces, Thoughtfully Realised.</h2><p className="max-w-md leading-7 text-muted-foreground">A selection of residential interiors reflecting individual lives, sites and sensibilities.</p></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">{projects.map((project, i) => <figure key={project.title} className={`group ${i === 0 || i === 3 ? "lg:col-span-7" : "lg:col-span-5"}`}><div className={`overflow-hidden ${i === 0 || i === 3 ? "aspect-[16/11]" : "aspect-[4/3]"}`}><img src={project.image} alt={`${project.title} interior project in ${project.location}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /></div><figcaption className="flex justify-between border-b border-border py-4"><span className="font-display text-xl">{project.title}</span><span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{project.location}</span></figcaption></figure>)}</div></div>
      </section>

      <section className="section-space"><div className="mx-auto grid max-w-[1300px] gap-12 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-10"><div><p className="eyebrow">Why MVR Interiors</p><h2 className="section-title">Experience You Can Build On.</h2></div><div>{why.map(([title, copy], i) => <div key={title} className="grid gap-3 border-t border-border py-7 sm:grid-cols-[50px_1fr_1.4fr]"><span className="text-xs text-muted-foreground">0{i + 1}</span><h3 className="font-display text-2xl">{title}</h3><p className="leading-7 text-muted-foreground">{copy}</p></div>)}</div></div></section>

      <section id="process" className="section-space scroll-mt-16 bg-primary text-primary-foreground"><div className="mx-auto max-w-[1300px] px-5 lg:px-10"><p className="eyebrow text-primary-foreground/60">Our Process</p><h2 className="section-title">A Clear Path From Idea to Handover.</h2><div className="mt-14 grid lg:grid-cols-5">{process.map((step, i) => <div key={step} className="relative border-l border-primary-foreground/25 px-6 py-7 lg:min-h-48 lg:border-l-0 lg:border-t"><span className="font-display text-3xl text-primary-foreground/45">0{i + 1}</span><h3 className="mt-8 max-w-40 font-display text-xl font-normal">{step}</h3><span className="absolute -left-[4px] top-8 h-2 w-2 rounded-full bg-primary-foreground lg:-top-[4px] lg:left-6" /></div>)}</div></div></section>

      <section className="section-space"><div className="mx-auto max-w-[1100px] px-5 text-center lg:px-10"><p className="eyebrow">Client Trust</p><h2 className="section-title">Built on Experience.<br />Sustained by Trust.</h2><div className="mx-auto mt-12 grid max-w-4xl gap-px bg-border sm:grid-cols-3">{["Around three decades of hands-on practice", "300+ completed interior projects", "Work delivered across 4+ locations"].map((item) => <div key={item} className="flex min-h-36 items-center justify-center bg-background p-7"><Check className="mr-3 shrink-0 text-accent-foreground" size={18} /><span className="text-sm leading-6">{item}</span></div>)}</div><p className="mt-7 text-sm italic text-muted-foreground">Client testimonials will be added here as verified project feedback becomes available.</p></div></section>

      <section className="border-y border-border bg-accent"><div className="mx-auto flex max-w-[1300px] flex-col items-start justify-between gap-8 px-5 py-14 lg:flex-row lg:items-center lg:px-10"><div><p className="eyebrow">Start a conversation</p><h2 className="font-display text-4xl font-normal sm:text-5xl">Planning Your Next Space?</h2></div><div className="flex flex-wrap gap-3"><WhatsAppLink className="inline-flex min-h-12 items-center gap-2 bg-primary px-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground"><MessageCircle size={17} /> WhatsApp Us</WhatsAppLink><a href="#contact" className="inline-flex min-h-12 items-center border border-primary px-6 text-xs font-semibold uppercase tracking-[0.16em]">Send an Enquiry</a></div></div></section>

      <section id="contact" className="section-space scroll-mt-16"><div className="mx-auto grid max-w-[1200px] gap-14 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-10"><div><p className="eyebrow">Contact</p><h2 className="section-title">Let’s Talk About Your Space.</h2><p className="mt-6 max-w-sm leading-7 text-muted-foreground">Share a few details about your project. Your enquiry will open in WhatsApp so our team can respond personally.</p><div className="mt-10 space-y-3 text-sm"><p>Hyderabad, Telangana, India</p><a className="block underline underline-offset-4" href={`tel:${contact.phone.replaceAll(" ", "")}`}>{contact.phone}</a></div></div><form onSubmit={submitEnquiry} className="grid gap-x-5 gap-y-6 sm:grid-cols-2" noValidate><Field label="Name" name="name" required /><Field label="Phone Number" name="phone" required pattern="[0-9+ ]{10,16}" /><Field label="Project Location" name="location" required /><label className="field-label">Project Type<select name="type" required className="field-input"><option value="">Select a project type</option><option>Complete Home Interiors</option><option>Living Room</option><option>Bedroom</option><option>Modular Kitchen</option><option>Wardrobes & Storage</option><option>Other</option></select></label><label className="field-label sm:col-span-2">Message<textarea name="message" required rows={4} className="field-input resize-none" placeholder="Tell us a little about your space" /></label><div className="sm:col-span-2"><Button type="submit" disabled={status === "sending"} variant="solid" size="lg" className="min-h-12 rounded-none px-6 text-xs uppercase tracking-[0.16em]">{status === "sending" ? "Sending…" : "Request a Consultation"} <ArrowRight size={16} /></Button>{error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}{status === "sent" && <p className="mt-4 border border-border bg-secondary p-4 text-sm leading-6 text-muted-foreground" role="status">Thank you — your enquiry has been sent to our studio inbox, and WhatsApp has opened so you can chat with us right away.</p>}</div></form></div></section>

      <footer className="bg-primary text-primary-foreground"><div className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10"><div className="flex flex-col justify-between gap-10 border-b border-primary-foreground/20 pb-10 sm:flex-row sm:items-center"><div className="flex items-center gap-5"><img src={logoAsset.url} alt="MVR Interiors" className="h-24 w-24 rounded-full object-cover ring-1 ring-primary-foreground/20" /><div><p className="font-display text-3xl">MVR Interiors</p><p className="mt-2 text-xs uppercase tracking-[0.15em] text-primary-foreground/60">Interior Design & Execution</p></div></div><div className="flex items-center gap-6"><a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="MVR Interiors on Instagram"><Instagram /></a><WhatsAppLink><MessageCircle /><span className="sr-only">MVR Interiors on WhatsApp</span></WhatsAppLink></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-[0.12em] text-primary-foreground/55 sm:flex-row"><span>Hyderabad · Bengaluru · Nandyal · Andhra Pradesh</span><span>© {new Date().getFullYear()} MVR Interiors. All rights reserved.</span></div></div></footer>
      <WhatsAppLink className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-105 md:hidden"><MessageCircle size={24} /><span className="sr-only">Chat with MVR Interiors on WhatsApp</span></WhatsAppLink>
    </main>
  );
}

function Field({ label, name, required, pattern }: { label: string; name: string; required?: boolean; pattern?: string }) {
  return <label className="field-label">{label}<input name={name} required={required} pattern={pattern} className="field-input" /></label>;
}