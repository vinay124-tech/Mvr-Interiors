import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number")
    .max(16)
    .regex(/^[0-9+ ]+$/, "Please enter a valid phone number"),
  location: z.string().trim().min(2, "Please enter your project location").max(80),
  type: z.string().trim().min(2, "Please select a project type").max(60),
  message: z.string().trim().min(5, "Please tell us a little about your space").max(1200),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export function whatsappText(data: Enquiry) {
  return [
    "Hello MVR Interiors, I would like to request a design consultation.",
    "",
    `• Name: ${data.name}`,
    `• Phone: ${data.phone}`,
    `• Project Location: ${data.location}`,
    `• Project Type: ${data.type}`,
    `• Brief: ${data.message}`,
  ].join("\n");
}
