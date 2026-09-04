import { TiltPortrait } from "@/components/motion/TiltPortrait";
import { identity, credentials, contact } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative bg-gradient-to-b from-navy to-navyink text-ivory pt-16 md:pt-20 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,247,245,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(247,247,245,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-content mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center pb-20">
        <div>
          <div className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-gold mb-4">
            <span className="w-5 h-0.5 bg-gold inline-block" />
            {identity.location}
          </div>
          <h1 className="font-display font-bold text-[2.2rem] md:text-5xl lg:text-6xl leading-[1.1] max-w-[16ch] mb-5">
            {identity.positioning}.
          </h1>
          <p className="text-lg text-ivory/80 max-w-[46ch] mb-8">
            {identity.name} — {identity.title}. {credentials.litigationYears} years across{" "}
            {credentials.courtLevels}, advising individuals and public-sector institutions alike.
          </p>
          <div className="flex gap-3.5 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gold text-navyink font-semibold px-6 py-3.5 rounded-sm hover:bg-gold-deep transition-colors"
            >
              Book a Consultation
            </a>
            <a
              href="#standing"
              className="inline-flex items-center gap-2 border border-white/20 text-ivory font-semibold px-6 py-3.5 rounded-sm hover:border-gold hover:text-gold transition-colors"
            >
              View Credentials
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <TiltPortrait
            src="/images/umair-portrait.jpg"
            alt={`${identity.name}, ${identity.title}`}
            caption={`${credentials.litigationYears} years · District to High Court`}
          />
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5">
        <div className="max-w-content mx-auto px-6 flex items-center gap-8 flex-wrap">
          <span className="text-[0.7rem] tracking-[0.12em] uppercase text-white/50 whitespace-nowrap">
            Current legal advisor to
          </span>
          <div className="flex gap-8 flex-wrap items-center text-white/55">
            <span className="font-bold text-base">SNGPL</span>
            <span className="font-bold text-base">FESCO</span>
            <span className="font-bold text-base">TMA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
