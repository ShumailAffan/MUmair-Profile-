import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { identity, credentials } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-ivory text-navyink">
      <div className="max-w-content mx-auto px-6 grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-14 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-line">
            <Image
              src="/images/umair-chamber.jpg"
              alt={`${identity.name} at his chambers`}
              fill
              sizes="(max-width: 768px) 90vw, 480px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-gold-deep mb-3.5">
            <span className="w-5 h-0.5 bg-gold inline-block" />A Practice Built On Trial
            Experience
          </div>
          <h2 className="font-display font-bold text-navy text-2xl md:text-3xl mb-4">
            Five years in the courtroom, from the District Bench to the High Court.
          </h2>
          <p className="text-gray-500 mb-4">
            {identity.name} has built an active litigation practice spanning{" "}
            {credentials.courtLevels}, representing individuals in family, criminal and civil
            matters, and advising public-sector utility clients on corporate and commercial
            compliance.
          </p>
          <blockquote className="border-l-[3px] border-gold pl-6 my-7 py-1">
            <p className="font-display italic text-navy text-lg md:text-xl leading-relaxed m-0">
              &ldquo;A litigation practice is only as credible as the record behind it — courts,
              clients, and institutions, not marketing copy.&rdquo;
            </p>
          </blockquote>
          {!credentials.barCouncilRegistrationNumber && (
            <span className="inline-flex items-center gap-1.5 bg-gold/15 text-gold-deep border border-gold/40 text-xs font-bold px-2.5 py-1.5 rounded-sm">
              ⚠ Bar Council registration number &amp; enrollment year: to be confirmed with client
            </span>
          )}
        </Reveal>
      </div>
    </section>
  );
}
