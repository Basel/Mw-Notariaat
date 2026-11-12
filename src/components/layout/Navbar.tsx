import React, { useState } from 'react';
import { PageId } from '../../types';
import { Phone, Clock, MapPin, Menu, X, ArrowRight, Shield } from 'lucide-react';
import { OFFICE_INFO } from '../../data/notaryData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, subParam?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'diensten', label: 'Diensten' },
    { id: 'kantoor', label: 'Ons Kantoor & Team' },
    { id: 'tarieven', label: 'Tarieven & Offerte' },
    { id: 'kennis', label: 'Kennisbank' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Quiet top utility banner for law firm contact & notary accreditation */}
      <div className="bg-[#111A24] text-slate-300 text-xs border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A065]" />
              <span>Het Steen 13, 9861 BA Grootegast</span>
            </span>
            <span className="hidden md:inline-block text-slate-600">·</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C5A065]" />
              <span>Ma – Vr: 08:30 – 17:00</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:0594612033"
              className="flex items-center gap-1.5 text-white hover:text-[#C5A065] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A065]" />
              <span>0594-612033</span>
            </a>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#C5A065]" />
              <span>KNB Aangesloten</span>
            </span>
          </div>
        </div>
      </div>

      {/* Strict Top Bar Contract: 3 Zones: Brand wordmark | 4-5 links | 1 primary action */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Brand wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-sm bg-[#16212D] text-[#C5A065] flex items-center justify-center font-serif text-xl font-bold tracking-wider shadow-xs group-hover:bg-[#1E2E40] transition-colors">
                MW
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#16212D] font-serif uppercase">
                  MW Notariaat
                </span>
                <span className="text-[11px] font-medium tracking-widest uppercase text-stone-500">
                  Grootegast · Westerkwartier
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                    currentPage === item.id
                      ? 'text-[#16212D] font-semibold'
                      : 'text-stone-600 hover:text-[#16212D]'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A065] rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleNavClick('contact')}
                className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#16212D] rounded-sm hover:bg-[#203043] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 shadow-xs border border-transparent hover:border-[#C5A065]/40"
              >
                <span>Afspraak Inplannen</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A065]" />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:text-stone-900 focus:outline-hidden"
                aria-label="Menu openen"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2 text-sm font-medium rounded-sm cursor-pointer transition-colors ${
                    currentPage === item.id
                      ? 'bg-stone-100 text-[#16212D] font-semibold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-stone-100 mt-2 flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-center px-4 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#16212D] rounded-sm cursor-pointer hover:bg-[#203043]"
                >
                  Afspraak Inplannen
                </button>
                <button
                  onClick={() => handleNavClick('tarieven')}
                  className="w-full text-center px-4 py-2 text-xs font-semibold tracking-wide uppercase text-stone-700 bg-stone-100 rounded-sm cursor-pointer hover:bg-stone-200"
                >
                  Offerte Berekenen
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
