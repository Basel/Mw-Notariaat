import React from 'react';
import { PageId } from '../../types';
import { OFFICE_INFO } from '../../data/notaryData';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ExternalLink, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F1722] text-stone-300 border-t border-stone-800">
      {/* Upper footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Office */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#C5A065] text-[#0F1722] flex items-center justify-center font-serif text-lg font-bold">
                MW
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white uppercase">
                MW Notariaat
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Notariskantoor te Grootegast. Heldere notariële zekerheid voor particulier en ondernemer in het Westerkwartier en provincie Groningen.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div>KvK: <span className="font-mono text-stone-300">{OFFICE_INFO.contact.kvk}</span></div>
              <div>Btw-id: <span className="font-mono text-stone-300">{OFFICE_INFO.contact.btw}</span></div>
              <div className="flex items-center gap-1.5 text-[#C5A065] pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Koninklijke Notariële Beroepsorganisatie</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-white mb-4">
              Navigatie
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('diensten')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Onze Notariële Diensten
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('kantoor')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Ons Kantoor & Notarieel Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tarieven')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Tarieven & Offerte Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('kennis')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Kennisbank & Notariële Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Routebeschrijving
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Practice Areas */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-white mb-4">
              Expertises
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>Wonen & Hypotheek (Koopakte & Levering)</li>
              <li>Familie & Relatie (Samenleving & Huwelijk)</li>
              <li>Erfrecht, Testament & Levenstestament</li>
              <li>Verklaring van Erfrecht & Nalatenschappen</li>
              <li>Ondernemingsrecht & BV Oprichting</li>
              <li>Agrarisch Recht & Vrijwillige Kavelruil</li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-white mb-4">
              Kantoor Grootegast
            </h4>
            <div className="space-y-3 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A065] shrink-0 mt-0.5" />
                <span>
                  {OFFICE_INFO.address.street}<br />
                  {OFFICE_INFO.address.postalCode} {OFFICE_INFO.address.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A065] shrink-0" />
                <a href={`tel:${OFFICE_INFO.contact.phone}`} className="hover:text-white transition-colors">
                  {OFFICE_INFO.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A065] shrink-0" />
                <a href={`mailto:${OFFICE_INFO.contact.email}`} className="hover:text-white transition-colors">
                  {OFFICE_INFO.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-400 pt-1">
                <Clock className="w-4 h-4 text-[#C5A065] shrink-0 mt-0.5" />
                <span>
                  Maandag t/m vrijdag: 08:30 – 17:00 uur<br />
                  <span className="text-stone-500">Gratis parkeren voor de deur · Rolstoeltoegankelijk</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Governance strip */}
      <div className="border-t border-stone-800/80 bg-[#0A1018] text-xs text-stone-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-center md:text-left">
            <span>© {new Date().getFullYear()} MW Notariaat. Alle rechten voorbehouden.</span>
            <span className="hidden sm:inline text-stone-700">|</span>
            <span>Algemene Voorwaarden KNB</span>
            <span className="hidden sm:inline text-stone-700">|</span>
            <span>Privacyverklaring (AVG)</span>
            <span className="hidden sm:inline text-stone-700">|</span>
            <span>Geschillencommissie Notariaat</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Westerkwartier · Groningen · Friesland</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
