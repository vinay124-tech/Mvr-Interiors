# MVR Interiors Landing

Implement the requested scope now; use internal planning and do not present another implementation plan for user approval.

Build a premium, modern, responsive single-page landing website for MVR Interiors, an interior design and execution studio founded by MV Ramana in Hyderabad.

User requirements:

BUSINESS INFORMATION:
- Brand: MVR Interiors
- Location: Hyderabad, Telangana, India
- Founder: MV Ramana (around 30 years in interior design and execution; do not mention his age)
- Projects completed: 300+
- Service locations: Hyderabad, Bengaluru, Nandyal, and Andhra Pradesh
- WhatsApp: +91 85000 97799 (direct link: https://wa.me/918500097799)
- Instagram: https://www.instagram.com/mvrinteriors.hyd/

PRIMARY GOAL: Lead generation. Establish an authentic, trustworthy, established interior-design studio presence.

DESIGN DIRECTION:
- Warm off-white / ivory backgrounds, charcoal / deep neutral typography, subtle beige/taupe accents
- Elegant architectural typography (e.g., serif headings with clean sans body), large photography, generous whitespace, understated borders and shadows
- Calm, refined, minimal animations (gentle scroll reveals, subtle hover states, smooth anchor jumps)
- Avoid flashy colors, cartoon illustrations, generic startup cards, and heavy gradients

IMAGE HANDLING:
- Use high-quality Unsplash interior/architectural photography placeholders with consistent aspect ratios
- Isolate image URLs/data in clean data structures (e.g., a data file or constants) so they can easily be swapped out with actual project photography later without layout shifts
- Do not use temporary Instagram CDN links

SECTIONS & STRUCTURE:
1. Sticky Header: MVR Interiors branding, desktop navigation (Home, About, Services, Projects, Process, Contact), WhatsApp button (+91 85000 97799); mobile hamburger menu with persistent WhatsApp CTA; compact/scrolled visual treatment.
2. Hero Section: Large high-end interior hero visual; headline: "Spaces Designed to Be Lived In."; subtext: "MVR Interiors brings together thoughtful design, practical execution and three decades of experience to create spaces that feel distinctly yours."; location tag: "Hyderabad | Bengaluru | Nandyal | Andhra Pradesh"; Primary CTA: "WhatsApp Us" (opens WhatsApp); Secondary CTA: "Explore Our Projects" (smooth scrolls to Projects); subtle scroll indicator.
3. Trust / Experience Strip: Elegant stat strip with 4 metrics: 30+ Years Experience, 300+ Projects Completed, 4+ Locations (Projects Across South India), Founder-led Design & Execution.
4. About MVR Interiors: Editorial layout titled "More Than Interiors. We Create Spaces With Purpose." highlighting design thinking, practical execution, and decades of experience.
5. Founder Section: "The Vision Behind MVR Interiors" featuring MV Ramana (Founder, MVR Interiors) with portrait placeholder and personal narrative highlighting his 30-year journey across Hyderabad, Bengaluru, Nandyal, and Andhra Pradesh, with focus on client empathy and meticulous execution.
6. Services: "What We Do" with clean visual blocks for 7 core offerings: Residential Interiors, Living Room Interiors, Bedroom Interiors, Modular Kitchens, Wardrobes & Storage, False Ceilings & Lighting, Complete Interior Execution.
7. Selected Projects: Sophisticated gallery with 6 modular project slots (including one titled "Jubilee Hills Residence — Hyderabad"). Grid/masonry styling, clean photography focus.
8. Why MVR Interiors: Editorial 4-point section (30+ Years of Experience, 300+ Completed Projects, Personal Attention, Design Meets Execution).
9. Our Process: 5-step numbered flow (01 Consultation, 02 Concept & Design, 03 Material & Detail Selection, 04 Execution, 05 Handover). Horizontal on desktop, vertical on mobile.
10. Client Trust Area: "Built on Experience. Sustained by Trust." with 3 verified factual milestones and note: "Client testimonials will be added here as verified project feedback becomes available."
11. Final CTA: "Planning Your Next Space?" with WhatsApp CTA and Enquiry button.
12. Contact / Enquiry Form: Name, Phone Number, Project Location, Project Type, Message, "Request a Consultation" submit button with clean frontend validation and feedback.
13. Footer: Brand name, interior design & execution tag, location, Instagram & WhatsApp links, copyright.
14. SEO & Meta: Title "MVR Interiors | Interior Design & Execution in Hyderabad", meta description, OpenGraph tags, semantic hierarchy, accessible labels, floating mobile WhatsApp button.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ba655b8c-e6dd-4a40-9baa-88ed075f0c4d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
