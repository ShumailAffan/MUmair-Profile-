import { Reveal } from "@/components/motion/Reveal";
import { publicServiceRoles, retainers, trackRecord } from "@/lib/data";

export function Standing() {
  return (
    <section id="standing" className="bg-navy text-ivory">
      {/* Public service & academic roles */}
      <div className="py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-14">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-gold-deep mb-3.5">
              <span className="w-5 h-0.5 bg-gold inline-block" />
              Institutional Standing
            </div>
            <h2 className="font-display font-bold text-ivory text-2xl md:text-3xl mb-3">
              Public Service &amp; Academic Roles
            </h2>
            <p className="text-ivory/70">
              Independently verifiable positions held alongside private practice.
            </p>
          </Reveal>

          <div className="flex flex-col">
            {publicServiceRoles.map((role, i) => (
              <Reveal key={role.role} delay={i * 0.08}>
                <div className={`grid grid-cols-[46px_1fr] gap-4.5 py-6 ${i > 0 ? "border-t border-white/10" : ""}`}>
                  <div className="w-11 h-11 rounded-full border border-gold text-gold flex items-center justify-center font-display font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-ivory font-bold text-base mb-1">{role.role}</h4>
                    <p className="text-ivory/70 text-sm m-0">{role.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate retainers */}
      <div className="py-16 md:py-24 bg-navyink">
        <div className="max-w-content mx-auto px-6">
          <Reveal className="max-w-xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center gap-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-gold-deep mb-3.5">
              <span className="w-5 h-0.5 bg-gold inline-block" />
              Corporate Retainers
            </div>
            <h2 className="font-display font-bold text-ivory text-2xl md:text-3xl mb-3">
              Current Legal Advisor To
            </h2>
            <p className="text-ivory/70">
              Ongoing institutional retainers with public-sector utility and local government
              bodies.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {retainers.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08}>
                <div className="bg-white text-navyink border border-line rounded-sm p-6 text-center h-full">
                  <div className="font-display font-bold text-navy text-xl mb-1">{r.name}</div>
                  <div className="text-xs tracking-wide uppercase text-gray-500">
                    {r.fullName} — {r.sector}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Track record */}
      <div className="py-16 md:py-24 bg-slate">
        <div className="max-w-content mx-auto px-6">
          <Reveal className="max-w-xl mb-11">
            <div className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-gold-deep mb-3.5">
              <span className="w-5 h-0.5 bg-gold inline-block" />
              Track Record
            </div>
            <h2 className="font-display font-bold text-ivory text-2xl md:text-3xl">At a Glance</h2>
          </Reveal>
          <div className="max-w-2xl flex flex-col">
            {trackRecord.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className={`grid grid-cols-[46px_1fr] gap-4.5 py-6 ${i > 0 ? "border-t border-white/10" : ""}`}>
                  <div className="w-11 h-11 rounded-full border border-gold text-gold flex items-center justify-center font-display font-bold">
                    {item.label}
                  </div>
                  <div>
                    <h4 className="text-ivory font-bold text-base mb-1">{item.title}</h4>
                    <p className="text-ivory/70 text-sm m-0">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
