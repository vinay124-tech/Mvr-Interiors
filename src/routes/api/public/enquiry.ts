import { createFileRoute } from "@tanstack/react-router";
import { enquirySchema } from "@/lib/enquiry";
import { leadInbox } from "@/data/site-content";

export const Route = createFileRoute("/api/public/enquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ ok: false, error: "invalid_request" }, { status: 400 });
        }

        const parsed = enquirySchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "invalid_input" }, { status: 400 });
        }

        const data = parsed.data;
        const inbox = process.env["LEAD_INBOX_EMAIL"] || leadInbox;
        if (!inbox) {
          return Response.json({ ok: true, emailed: false, reason: "no_inbox_configured" });
        }

        try {
          const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              _subject: `New consultation enquiry — ${data.name} (${data.location})`,
              _template: "table",
              _captcha: "false",
              Name: data.name,
              Phone: data.phone,
              "Project Location": data.location,
              "Project Type": data.type,
              Message: data.message,
              Received: new Date().toISOString(),
            }),
          });
          if (!res.ok) {
            return Response.json({ ok: true, emailed: false, reason: "delivery_failed" });
          }
        } catch {
          return Response.json({ ok: true, emailed: false, reason: "delivery_failed" });
        }

        return Response.json({ ok: true, emailed: true });
      },
    },
  },
});
