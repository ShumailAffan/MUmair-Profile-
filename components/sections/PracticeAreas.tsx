"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { practiceAreas, lawTalks, identity } from "@/lib/data";

export function PracticeAreas() {
  return (
    <section id="practice" className="bg-ivory text-navyink">
      <div className="py-16 md:py-24">
        <div className="max-w-content mx-auto px-6">
          <Reveal className="max-w-xl mb-11">
            <div className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-gold-deep mb-3.5">
              <span className="w-5 h-0.5 bg-gold inline-block" />
              How We Can Help
            </div>
            <h2 className="font-display font-bold text-navy text-2xl md:text-3xl mb-3">
              Five Practice Areas, One Point of Contact
            </h2>
            <p className="text-gray-500">
              Whatever brought you here — a family matter, a dispute, or a corporate compliance
              need — there is a direct path to advice below.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {practiceAreas.map((area, i) => (
              <Reveal key={area.id} delay={i * 0.06}>
                <motion.div
                  id={area.id}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-white border border-line rounded-sm p-8 flex flex-col gap-3.5 h-full hover:shadow-[0_22px_40px_-22px_rgba(11,37,69,0.28)] hover:border-slate transition-shadow"
                >
                  <h3 className="font-display text-navy text-xl">{area.title}</h3>
                  <p className="text-sm text-gray-500 flex-1">{area.summary}</p>
                  <a
                    href={`#contact?category=${encodeURIComponent(area.categoryValue)}`}
                    className="text-sm font-bold text-slate hover:text-gold-deep"
                  >
                    Discuss your case →
                  </a>
                </motion.div>
              </Reveal>
            ))}

            <Reveal delay={practiceAreas.length * 0.06}>
              <div className="bg-navy border border-navy rounded-sm p-8 flex flex-col justify-center gap-3.5 h-full">
                <h3 className="font-display text-ivory text-xl">Not sure which area fits?</h3>
                <p className="text-ivory/75 text-sm">
                  Send a brief summary of your situation — you&apos;ll be pointed to the right
                  next step.
                </p>
                <a
                  href="#contact"
                  className="self-start inline-flex items-center gap-2 bg-gold text-navyink font-semibold text-sm px-4 py-2.5 rounded-sm hover:bg-gold-deep transition-colors"
                >
                  Start a Conversation
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Law Talks */}
      <div className="py-16 md:py-24 bg-white border-t border-line">
        <div className="max-w-content mx-auto px-6">
          <Reveal className="max-w-xl mb-11">
            <div className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-gold-deep mb-3.5">
              <span className="w-5 h-0.5 bg-gold inline-block" />
              Public Legal Awareness
            </div>
            <h2 className="font-display font-bold text-navy text-2xl md:text-3xl mb-3">
              {identity.mediaInitiative}
            </h2>
            <p className="text-gray-500">
              Plain-language explainers on the legal issues Faisalabad residents ask about most.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {lawTalks.map((talk, i) => (
              <Reveal key={talk.title} delay={i * 0.06}>
                <article className="bg-ivory border border-line rounded-sm overflow-hidden flex flex-col h-full">
                  <div className="aspect-[16/10] bg-gradient-to-br from-slate to-navy flex items-center justify-center relative">
                    <span className="absolute top-3 left-3 bg-navy/75 text-gold text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                      {talk.category}
                    </span>
                    <span className="w-11 h-11 rounded-full border-[1.5px] border-gold flex items-center justify-center text-gold">
                      ▶
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <h4 className="font-display text-navy text-lg">{talk.title}</h4>
                    <p className="text-sm text-gray-500 flex-1">{talk.summary}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
