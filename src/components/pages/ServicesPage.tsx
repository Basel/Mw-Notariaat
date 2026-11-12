import React, { useState } from 'react';
import { PageId } from '../../types';
import { SERVICE_CATEGORIES } from '../../data/notaryData';
import { 
  Home, 
  HeartHandshake, 
  Scroll, 
  Building2, 
  Tractor, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  HelpCircle, 
  ArrowRight,
  Calculator,
  Download,
  AlertCircle
} from 'lucide-react';

interface ServicesPageProps {
  initialCategory?: string;
  onNavigate: (page: PageId, subParam?: string) => void;
  onSelectServiceForQuote: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  initialCategory,
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>(
    initialCategory || SERVICE_CATEGORIES[0].id
  );
  const [checklistCompleted, setChecklistCompleted] = useState<Record<string, boolean>>({});

  const activeCategory = SERVICE_CATEGORIES.find(c => c.id === selectedCatId) || SERVICE_CATEGORIES[0];

  const toggleChecklistItem = (item: string) => {
    setChecklistCompleted(prev => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      case 'Scroll': return <Scroll className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Tractor': return <Tractor className="w-5 h-5" />;
      default: return <FileCheck className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Page Header */}
      <section className="bg-[#111A24] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A065] font-semibold">
              Notariële Expertises & Aktes
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Onze Notariële Diensten
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              MW Notariaat verzorgt de officiële vastlegging van al uw rechtsfeiten. Van het passeren van een woning in het Westerkwartier tot erfbelastingplanning, samenlevingscontracten en het oprichten van besloten vennootschappen.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Practice Areas Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {SERVICE_CATEGORIES.map((cat) => {
            const isSelected = cat.id === activeCategory.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between h-32 ${
                  isSelected
                    ? 'bg-[#16212D] text-white border-[#16212D] shadow-md ring-2 ring-[#C5A065]'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className={`p-2 w-fit rounded-sm ${isSelected ? 'bg-white/10 text-[#C5A065]' : 'bg-stone-100 text-[#16212D]'}`}>
                  {getIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm leading-snug">
                    {cat.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Domain details & deeds list */}
          <div className="lg:col-span-8 space-y-10">
            {/* Lead banner */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-sm bg-[#FAF8F5] text-[#C5A065] border border-stone-200">
                  {getIcon(activeCategory.iconName)}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
                    Vakgebied
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16212D]">
                    {activeCategory.title}
                  </h2>
                </div>
              </div>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {activeCategory.leadParagraph}
              </p>
            </div>

            {/* In-depth Deeds */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif font-bold text-[#16212D]">
                  Overzicht van Akten & Werkzaamheden
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  {activeCategory.deeds.length} officiële notariële akten
                </span>
              </div>

              <div className="space-y-6">
                {activeCategory.deeds.map((deed, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs hover:border-stone-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-100 pb-4">
                      <div>
                        <span className="text-xs font-mono text-[#C5A065] font-semibold">
                          0{index + 1}. Notariële Akte
                        </span>
                        <h4 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                          {deed.name}
                        </h4>
                      </div>
                      <div className="text-right sm:shrink-0">
                        <span className="inline-block text-xs font-semibold text-[#16212D] bg-[#F1ECE4] px-3 py-1 rounded-xs">
                          {deed.indicativePrice}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-stone-600 leading-relaxed">
                      {deed.description}
                    </p>

                    {/* Metadata & Requirements grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF9F7] p-4 rounded-md text-xs border border-stone-150">
                      <div>
                        <span className="font-semibold text-stone-900 block mb-1">
                          Wanneer van toepassing?
                        </span>
                        <span className="text-stone-600">{deed.whenNeeded}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900 block mb-1">
                          Gemiddelde doorlooptijd
                        </span>
                        <span className="text-stone-600 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#C5A065]" />
                          {deed.turnaround}
                        </span>
                      </div>
                    </div>

                    {/* What is included in this deed */}
                    <div className="space-y-2">
                      <span className="text-xs uppercase font-semibold text-stone-900 tracking-wider">
                        Inbegrepen in ons notarieel dossier:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                        {deed.included.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A065] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          onSelectServiceForQuote(deed.name);
                          onNavigate('tarieven');
                        }}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#16212D] hover:bg-[#203043] rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                      >
                        <Calculator className="w-3.5 h-3.5 text-[#C5A065]" />
                        <span>Offerte berekenen voor deze akte</span>
                      </button>
                      <button
                        onClick={() => onNavigate('contact')}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-sm transition-colors cursor-pointer"
                      >
                        Afspraak inplannen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice FAQ */}
            <div className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8 space-y-6">
              <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#C5A065]" />
                <span>Veelgestelde vragen over {activeCategory.title}</span>
              </h3>
              <div className="space-y-4">
                {activeCategory.faq.map((item, idx) => (
                  <div key={idx} className="border-b border-stone-100 pb-4 last:border-b-0 last:pb-0 space-y-1.5">
                    <h5 className="font-semibold text-sm text-stone-900">
                      {item.question}
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual card, Interactive Preparation Checklist & Fast Contact */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Visual preview */}
            <div className="rounded-lg overflow-hidden border border-stone-200 shadow-xs">
              <img
                src={activeCategory.image}
                alt={activeCategory.title}
                className="w-full h-48 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 bg-white space-y-2">
                <span className="text-xs font-semibold text-[#C5A065] uppercase">Kantoor Grootegast</span>
                <h4 className="font-serif font-bold text-base text-stone-900">Persoonlijke begeleiding</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Onze notarissen ontvangen u graag op afspraak aan Het Steen 13 voor een duidelijke toelichting op uw akte.
                </p>
              </div>
            </div>

            {/* Interactive Checklist: "Wat moet ik meenemen?" */}
            <div className="bg-white rounded-lg border border-stone-200 p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#C5A065]" />
                  <span>Meeneem-Checklist</span>
                </h4>
                <span className="text-[11px] font-mono text-stone-500">Voorbereiding</span>
              </div>
              <p className="text-xs text-stone-600">
                Vink af welke stukken u al bij de hand heeft voor uw bezoek aan ons kantoor:
              </p>

              <div className="space-y-2.5 pt-1">
                {[
                  'Geldig identiteitsbewijs (paspoort of ID-kaart, geen rijbewijs bij eerste identificatie)',
                  'Getekende koopovereenkomst of ontwerpbepalingen',
                  'Hypotheekofferte of bankinstructies',
                  'BSN-nummers en contactgegevens van betrokkenen',
                  'Kamer van Koophandel uittreksel (bij zakelijke akten)',
                ].map((item, idx) => {
                  const isChecked = checklistCompleted[item];
                  return (
                    <label
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer p-1.5 rounded-sm hover:bg-stone-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() => toggleChecklistItem(item)}
                        className="mt-0.5 rounded-xs text-[#16212D] focus:ring-[#C5A065]"
                      />
                      <span className={isChecked ? 'line-through text-stone-400' : ''}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Vragen over vereiste stukken?</span>
                <a href="tel:0594612033" className="text-[#16212D] font-bold hover:underline">
                  0594-612033
                </a>
              </div>
            </div>

            {/* Quick Consultation Callout */}
            <div className="bg-[#16212D] text-white rounded-lg p-6 space-y-3 shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
                Vrijblijvend Overleg
              </span>
              <h4 className="font-serif font-bold text-lg text-white">
                Twijfelt u welke akte u precies nodig heeft?
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Bel gerust voor een kort oriënterend advies. Wij vertellen u direct waar u aan toe bent.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full mt-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0F1722] bg-[#C5A065] hover:bg-[#B38F56] transition-colors rounded-sm text-center cursor-pointer font-bold"
              >
                Direct contact opnemen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
