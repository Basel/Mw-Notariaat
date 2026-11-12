import React, { useState } from 'react';
import { PageId } from '../../types';
import { CALCULATOR_CATEGORIES } from '../../data/notaryData';
import { 
  Calculator, 
  CheckCircle2, 
  HelpCircle, 
  Send, 
  FileText, 
  Receipt, 
  Info,
  ShieldCheck,
  Check
} from 'lucide-react';

interface PricingQuotePageProps {
  initialService?: string;
  onNavigate: (page: PageId) => void;
}

export const PricingQuotePage: React.FC<PricingQuotePageProps> = ({
  initialService,
  onNavigate,
}) => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
  const currentCategory = CALCULATOR_CATEGORIES[selectedCategoryIdx];

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    currentCategory.services[0].id
  );

  const currentService = currentCategory.services.find(s => s.id === selectedServiceId) || currentCategory.services[0];

  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    currentCategory.services.forEach(s => {
      s.options.forEach(opt => {
        if (opt.checked) initial[opt.id] = true;
      });
    });
    return initial;
  });

  // Quote Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');

  const handleCategoryChange = (idx: number) => {
    setSelectedCategoryIdx(idx);
    const newCat = CALCULATOR_CATEGORIES[idx];
    setSelectedServiceId(newCat.services[0].id);
  };

  const toggleOption = (optId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optId]: !prev[optId],
    }));
  };

  // Calculate pricing breakdown
  const basePrice = currentService.basePrice;
  const optionsTotal = currentService.options.reduce((sum, opt) => {
    return selectedOptions[opt.id] ? sum + opt.price : sum;
  }, 0);
  const subtotalHonorarium = basePrice + optionsTotal;
  const vat = Math.round(subtotalHonorarium * 0.21);
  const kadaster = currentService.kadasterFee;
  const knb = currentService.knbContribution;
  const grandTotal = subtotalHonorarium + vat + kadaster + knb;

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;

    const ref = `MW-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteReference(ref);
    setQuoteSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#111A24] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A065] font-semibold">
              Transparantie Vooraf
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Tarieven & Offerte Calculator
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Bij MW Notariaat hechten wij aan volledige duidelijkheid over uw notariële kosten. Bereken hieronder direct een betrouwbare indicatie van uw offerte inclusief honorarium, kadasterheffingen en btw.
            </p>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Calculator Configurator */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Category Picker */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#16212D] text-[#C5A065] flex items-center justify-center text-xs font-bold font-mono">
                  1
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Selecteer de categorie
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CALCULATOR_CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(idx)}
                    className={`px-3 py-3 rounded-sm text-xs font-semibold text-center transition-all cursor-pointer border ${
                      selectedCategoryIdx === idx
                        ? 'bg-[#16212D] text-white border-[#16212D] shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Service / Deed selection */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#16212D] text-[#C5A065] flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Kies de gewenste notariële akte
                </h3>
              </div>

              <div className="space-y-3">
                {currentCategory.services.map((service) => {
                  const isSelected = service.id === selectedServiceId;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-4 rounded-md border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#C5A065] bg-[#FAF8F5] ring-1 ring-[#C5A065]'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-serif font-bold text-sm sm:text-base text-stone-900">
                          {service.name}
                        </div>
                        <p className="text-xs text-stone-600">
                          {service.description}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-xs font-semibold text-[#16212D] bg-[#EAE5DC] px-2.5 py-1 rounded-xs">
                          Basis € {service.basePrice},-
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Options & Add-ons */}
            {currentService.options.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#16212D] text-[#C5A065] flex items-center justify-center text-xs font-bold font-mono">
                    3
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Optionele uitbreidingen & clausules
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {currentService.options.map((opt) => {
                    const isChecked = !!selectedOptions[opt.id];
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-3 rounded-md border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#FAF8F5] border-[#C5A065]/70'
                            : 'bg-white border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleOption(opt.id)}
                            className="rounded-xs text-[#16212D] focus:ring-[#C5A065]"
                          />
                          <span className="font-medium text-stone-800">{opt.name}</span>
                        </div>
                        <span className="font-mono text-stone-600 font-semibold">
                          + € {opt.price},-
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Real-time Invoice Breakdown & Request Form */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-lg border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[#C5A065]" />
                  <h3 className="font-serif font-bold text-lg text-[#16212D]">
                    Offerte-overzicht
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-stone-500 uppercase">
                  Vrijblijvend
                </span>
              </div>

              {/* Selected Service Title */}
              <div className="bg-[#FAF9F7] p-3.5 rounded-sm border border-stone-200/80">
                <span className="text-[11px] uppercase font-semibold text-[#C5A065] block">
                  Gekozen dossier
                </span>
                <span className="font-serif font-bold text-sm text-stone-900 block mt-0.5">
                  {currentService.name}
                </span>
              </div>

              {/* Line items table */}
              <div className="space-y-2.5 text-xs text-stone-700">
                <div className="flex justify-between items-center">
                  <span>Notarieel Basishonorarium:</span>
                  <span className="font-mono tabular-nums">€ {basePrice},-</span>
                </div>

                {currentService.options.map(opt => {
                  if (!selectedOptions[opt.id]) return null;
                  return (
                    <div key={opt.id} className="flex justify-between items-center text-stone-600 pl-2">
                      <span className="truncate max-w-[220px]">+ {opt.name}:</span>
                      <span className="font-mono tabular-nums">€ {opt.price},-</span>
                    </div>
                  );
                })}

                <div className="border-t border-stone-200 pt-2 flex justify-between items-center font-medium">
                  <span>Subtotaal Honorarium:</span>
                  <span className="font-mono tabular-nums">€ {subtotalHonorarium},-</span>
                </div>

                <div className="flex justify-between items-center text-stone-600">
                  <span>Btw (21%):</span>
                  <span className="font-mono tabular-nums">€ {vat},-</span>
                </div>

                {kadaster > 0 && (
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Kadasterkosten (overheid):</span>
                    <span className="font-mono tabular-nums">€ {kadaster},-</span>
                  </div>
                )}

                {knb > 0 && (
                  <div className="flex justify-between items-center text-stone-600">
                    <span>KNB Kwaliteitsbijdrage:</span>
                    <span className="font-mono tabular-nums">€ {knb},-</span>
                  </div>
                )}

                {/* Grand Total */}
                <div className="border-t-2 border-[#16212D] pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="font-serif font-bold text-base text-stone-900 block">
                      Totaal indicatie
                    </span>
                    <span className="text-[10px] text-stone-500">Inclusief btw en leges</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-bold text-[#16212D] font-mono tabular-nums">
                      € {grandTotal},-
                    </span>
                  </div>
                </div>
              </div>

              {/* Offerte Request Form or Confirmation */}
              {!quoteSubmitted ? (
                <form onSubmit={handleSubmitQuote} className="space-y-3 pt-2 border-t border-stone-100">
                  <div className="text-xs font-semibold uppercase text-stone-900 tracking-wider">
                    Vraag deze offerte direct aan per e-mail
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Uw naam *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      placeholder="bijv. Jan Jansen"
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#C5A065]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 mb-1">
                        E-mailadres *
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={e => setClientEmail(e.target.value)}
                        placeholder="naam@voorbeeld.nl"
                        className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#C5A065]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 mb-1">
                        Telefoonnummer *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={e => setClientPhone(e.target.value)}
                        placeholder="06 12345678"
                        className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#C5A065]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Opmerkingen of gewenste passeerdatum (optioneel)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="bijv. Koopakte reeds getekend, sleuteloverdracht in april"
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#C5A065]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#16212D] hover:bg-[#203043] rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C5A065]" />
                    <span>Offerte Vrijblijvend Ontvangen</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 pt-1 justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A065]" />
                    <span>U ontvangt binnen 1 werkdag een bindende offerte</span>
                  </div>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-900 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>Offerteaanvraag Succesvol Verzonden!</span>
                  </div>
                  <p className="text-xs leading-relaxed text-emerald-800">
                    Hartelijk dank, <strong>{clientName}</strong>. Wij hebben uw aanvraag voor <strong>{currentService.name}</strong> ontvangen onder referentienummer: <span className="font-mono font-bold">{quoteReference}</span>.
                  </p>
                  <p className="text-xs text-emerald-800">
                    Onze kandidaat-notaris controleert uw aanvraag en stuurt de officiële schriftelijke offerte naar <strong>{clientEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setQuoteSubmitted(false)}
                    className="text-xs underline font-semibold text-emerald-900 cursor-pointer pt-1"
                  >
                    Nieuwe berekening maken
                  </button>
                </div>
              )}
            </div>

            {/* Note on tax deductibility */}
            <div className="bg-[#FAF9F7] p-4 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-1">
              <span className="font-bold text-stone-900 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#C5A065]" />
                Fiscaal voordeel tip
              </span>
              <p>
                De notariële kosten en kadasterkosten voor de <strong>hypotheekakte</strong> zijn bij de aankoop van een eigen woning eenmalig aftrekbaar in Box 1 van uw inkomstenbelasting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Transparency FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-stone-200 p-8 sm:p-12 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
              Veelgestelde Vragen
            </span>
            <h3 className="font-serif font-bold text-2xl text-stone-900 mt-1">
              Hoe zijn notariële tarieven opgebouwd?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100 text-sm">
            <div className="space-y-1.5">
              <h5 className="font-semibold text-stone-900">
                Zijn notaristarieven in Nederland vrij?
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ja, sinds 1999 zijn notaristarieven vrij. Elk kantoor bepaalt zijn eigen honorarium. MW Notariaat kiest bewust voor toegankelijke, marktconforme tarieven met behoud van de hoogste kwaliteit en zorgvuldigheid.
              </p>
            </div>

            <div className="space-y-1.5">
              <h5 className="font-semibold text-stone-900">
                Wat zijn kadaster- en recherchekosten?
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dit zijn overheidsheffingen die de notaris 1-op-1 afdraagt aan het Kadaster voor het inschrijven van de akte en het raadplegen van de openbare registers. Deze kosten zijn wettelijk vastgelegd.
              </p>
            </div>

            <div className="space-y-1.5">
              <h5 className="font-semibold text-stone-900">
                Betaal ik extra voor een intakegesprek?
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                Nee, een eerste oriënterend adviesgesprek van 30 minuten op ons kantoor in Grootegast is kosteloos en vrijblijvend indien u de akte aansluitend bij ons laat passeren.
              </p>
            </div>

            <div className="space-y-1.5">
              <h5 className="font-semibold text-stone-900">
                Kan de offerteprijs nog veranderen?
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                Zodra wij uw gegevens hebben gecontroleerd en u een schriftelijke offerte ontvangt, is die prijs bindend. Mochten er onvoorziene complicaties zijn (bijvoorbeeld erfgenamen in het buitenland), dan overleggen we dat altijd eerst vóórdat we kosten maken.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
