"use client";

import { FormEvent, useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { contact, practiceAreas } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Practice-area cards link to #contact?category=... — pick that up
    // client-side and pre-select the matching option.
    const hash = window.location.hash;
    const queryIndex = hash.indexOf("?");
    if (queryIndex !== -1) {
      const params = new URLSearchParams(hash.slice(queryIndex + 1));
      const value = params.get("category");
      if (value) setCategory(value);
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!data.get("fullName") || !data.get("phone") || !data.get("caseCategory")) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    // Placeholder submit — replace with a real endpoint once the office
    // email is confirmed (e.g. a Next.js Route Handler that sends mail,
    // or a form service like Formspree).
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("success");
    form.reset();
    setCategory("");
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-navy text-ivory">
      <div className="max-w-content mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_0.9fr] gap-12">
        <Reveal>
          <div className="bg-white text-navyink border border-line rounded-sm p-6 md:p-10">
            <h2 className="font-display font-bold text-navy text-2xl mb-1.5">Send a Message</h2>
            <p className="text-gray-500 mb-7">
              Fields marked <span className="text-gold-deep font-semibold">*</span> are required.
            </p>

            {status === "success" && (
              <div
                role="status"
                className="bg-green-50 border border-green-200 text-green-800 px-4.5 py-4 rounded-sm text-sm mb-5"
              >
                Thank you — your message has been received. The chamber will get back to you
                during office hours ({contact.officeHours}, {contact.chamberTiming}).
              </div>
            )}
            {status === "error" && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-800 px-4.5 py-4 rounded-sm text-sm mb-5"
              >
                Please fill in your name, phone number, and case category.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                <div className="mb-5">
                  <label htmlFor="fullName" className="block text-sm font-bold text-navy mb-1.5">
                    Full Name <span className="text-gold-deep">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    className="w-full border border-line rounded-sm px-3.5 py-3 bg-ivory text-navyink focus:outline-none focus:ring-2 focus:ring-slate"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="phone" className="block text-sm font-bold text-navy mb-1.5">
                    Phone <span className="text-gold-deep">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="w-full border border-line rounded-sm px-3.5 py-3 bg-ivory text-navyink focus:outline-none focus:ring-2 focus:ring-slate"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-bold text-navy mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full border border-line rounded-sm px-3.5 py-3 bg-ivory text-navyink focus:outline-none focus:ring-2 focus:ring-slate"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="caseCategory" className="block text-sm font-bold text-navy mb-1.5">
                  Case Category <span className="text-gold-deep">*</span>
                </label>
                <select
                  id="caseCategory"
                  name="caseCategory"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-line rounded-sm px-3.5 py-3 bg-ivory text-navyink focus:outline-none focus:ring-2 focus:ring-slate"
                >
                  <option value="" disabled>
                    Select the closest match
                  </option>
                  {practiceAreas.map((area) => (
                    <option key={area.id} value={area.categoryValue}>
                      {area.categoryValue}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="summary" className="block text-sm font-bold text-navy mb-1.5">
                  Brief Case Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={5}
                  placeholder="A few sentences on what's going on — no need for full detail yet."
                  className="w-full border border-line rounded-sm px-3.5 py-3 bg-ivory text-navyink focus:outline-none focus:ring-2 focus:ring-slate"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex justify-center items-center gap-2 bg-gold text-navyink font-semibold px-6 py-3.5 rounded-sm hover:bg-gold-deep transition-colors disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
              {!contact.email && (
                <p className="text-xs text-gray-500 mt-2.5">
                  ⚠ Not yet wired to a receiving email address — pending client confirmation. See
                  the README for the endpoint to connect.
                </p>
              )}
            </form>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
          <div className="bg-navyink rounded-sm p-7">
            <InfoRow icon="📍" label="Office Address" value={contact.officeAddress} />
            <InfoRow icon="🕒" label="Office Hours" value={contact.officeHours} border />
            <InfoRow
              icon="⚖"
              label="Chamber Timing"
              value={`${contact.chamberTiming} (${contact.chamberNote})`}
              border
            />
            <InfoRow
              icon="📞"
              label="Phone"
              value={contact.phone ?? "To be confirmed"}
              pending={!contact.phone}
              border
            />
            <InfoRow
              icon="✉"
              label="Email"
              value={contact.email ?? "To be confirmed"}
              pending={!contact.email}
              border
            />
          </div>

          <div className="flex gap-3">
            <a
              href={contact.phone ? `tel:${contact.phone}` : "#"}
              className="flex-1 flex justify-center items-center gap-2 border border-white/20 text-ivory font-semibold px-4 py-3.5 rounded-sm hover:border-gold hover:text-gold transition-colors"
            >
              📞 Call Now
            </a>
            <a
              href={contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : "#"}
              className="flex-1 flex justify-center items-center gap-2 bg-gold text-navyink font-semibold px-4 py-3.5 rounded-sm hover:bg-gold-deep transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>

          <div className="aspect-[16/11] rounded-sm overflow-hidden border border-white/10">
            <iframe
              className="w-full h-full border-0"
              src="https://www.google.com/maps?q=Regent+Mall+Chen+One+Road+Faisalabad+Pakistan&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map to Regent Mall, Chen One Road, Faisalabad"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  pending,
  border,
}: {
  icon: string;
  label: string;
  value: string;
  pending?: boolean;
  border?: boolean;
}) {
  return (
    <div className={`flex gap-3.5 py-3.5 ${border ? "border-t border-white/10" : ""}`}>
      <span className="text-gold flex-shrink-0 mt-0.5" aria-hidden>
        {icon}
      </span>
      <div>
        <h4 className="text-ivory font-bold text-sm mb-1">{label}</h4>
        <p className="text-ivory/70 text-sm m-0">
          {value}
          {pending && (
            <span className="inline-flex items-center gap-1.5 bg-gold/15 text-gold border border-gold/40 text-xs font-bold px-2 py-0.5 rounded-sm ml-2">
              ⚠ pending
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
