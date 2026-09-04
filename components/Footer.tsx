import { identity, contact } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-navyink text-ivory/70 pt-14 pb-8">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
          <div>
            <span className="font-display font-bold text-xl text-ivory">{identity.name}</span>
            <p className="text-sm mt-3.5 max-w-[30ch]">
              {identity.title}. {identity.positioning}.
            </p>
          </div>
          <div>
            <h5 className="text-ivory text-xs tracking-[0.1em] uppercase font-bold mb-4">
              Office
            </h5>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5 text-sm">
              <li>{contact.officeAddress}</li>
              <li>
                {contact.officeHours} · {contact.chamberTiming}
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-ivory text-xs tracking-[0.1em] uppercase font-bold mb-4">
              Connect
            </h5>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5 text-sm">
              <li>
                <a href="#practice" className="hover:text-gold">
                  {identity.mediaInitiative}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold">
                  Book a Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-5 flex justify-between flex-wrap gap-2 text-xs">
          <span>
            © {new Date().getFullYear()} {identity.name}, {identity.title}. All rights reserved.
          </span>
          <span>{identity.location}</span>
        </div>
      </div>
    </footer>
  );
}
