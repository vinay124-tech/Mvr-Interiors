import { MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { contact } from "@/data/site-content";
import logoAsset from "@/assets/mvr-logo.webp.asset.json";

const KEY = "mvr-consult-prompt-dismissed";
const greeting = encodeURIComponent(
  "Hello MVR Interiors, I would like to get a free consultation for my project.",
);

export function ConsultPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Free consultation"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:p-0"
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 relative mx-auto w-full max-w-md border border-border bg-background p-7 shadow-xl duration-500 sm:w-96">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={17} />
        </button>
        <img
          src={logoAsset.url}
          alt="MVR Interiors"
          className="h-14 w-14 rounded-full object-cover ring-1 ring-border"
        />
        <h2 className="mt-5 font-display text-2xl font-normal leading-snug">Planning Your Next Space?</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Speak directly with our team for a free design &amp; execution consultation.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={`${contact.whatsapp}?text=${greeting}`}
            target="_blank"
            rel="noreferrer"
            onClick={dismiss}
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-whatsapp text-xs font-semibold uppercase tracking-[0.16em] text-whatsapp-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle size={17} /> Chat on WhatsApp
          </a>
          <a
            href={`tel:${contact.phone.replaceAll(" ", "")}`}
            onClick={dismiss}
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-primary text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-secondary"
          >
            <Phone size={16} /> Call {contact.phone}
          </a>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="mt-4 w-full text-center text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
