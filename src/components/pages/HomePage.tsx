import React, { useState } from 'react';
import { PageId } from '../../types';
import { OFFICE_INFO, SERVICE_CATEGORIES, TEAM_MEMBERS, REVIEWS, ARTICLES } from '../../data/notaryData';
import { 
  ArrowRight, 
  Home, 
  HeartHandshake, 
  Scroll, 
  Building2, 
  Tractor, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Users, 
  FileText, 
  Calendar,
  Sparkles,
  ChevronRight,
  Star
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, subParam?: string) => void;
  onOpenTeamMember: (memberId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenTeamMember }) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('wonen-en-hypotheek');

  const selectedCategory = SERVICE_CATEGORIES.find(c => c.id === activeCategoryTab) || SERVICE_CATEGORIES[0];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-[#111A24] text-white overflow-hidden">
        {/* Background Image with elegant scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/notary_hero_office_1794492148246.jpg"
            alt="MW Notariaat kantoor te Grootegast"
            className="w-full h-full object-cover opacity-25 scale-102 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1722] via-[#0F1722]/90 to-[#0F1722]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C5A065]">
              <span>Notariskantoor Grootegast</span>
              <span aria-hidden="true">·</span>
              <span>Westerkwartier & Groningen</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight text-balance">
              Heldere notariële zekerheid voor particulier en ondernemer
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              Van de aankoop van uw woning en het vastleggen van een levenstestament tot complexe bedrijfsoverdrachten en agrarische kavelruil. Onder leiding van notaris mr. Marije Teunissen-Dijkstra en kandidaat-notaris mr. Annet Dillema. Begrijpelijke taal, persoonlijke aandacht en scherpe tarieven.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#C5A065] hover:bg-[#B38F56] transition-colors rounded-sm text-center cursor-pointer shadow-md flex items-center justify-center gap-2 text-[#0F1722] font-bold"
              >
                <span>Afspraak Inplannen</span>
                <ArrowRight className="w-4 h-4 text-[#0F1722]" />
              </button>

              <button
                onClick={() => onNavigate('tarieven')}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors rounded-sm text-center cursor-pointer flex items-center justify-center gap-2 backdrop-blur-xs"
              >
                <span>Tarieven & Offerte Berekenen</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Zone Reassurance KPI Strip */}
        <div className="relative z-10 border-t border-stone-800 bg-[#0C131D]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-stone-800">
              <div className="px-3 py-1">
                <div className="text-2xl font-bold font-serif text-[#C5A065] tabular-nums">18+ Jaar</div>
                <div className="text-xs text-stone-400 mt-0.5">Ervaring in het notariaat</div>
              </div>
              <div className="px-3 py-1 pt-4 md:pt-1">
                <div className="text-2xl font-bold font-serif text-white">KNB Lid</div>
                <div className="text-xs text-stone-400 mt-0.5">Koninklijke Beroepsorganisatie</div>
              </div>
              <div className="px-3 py-1 pt-4 md:pt-1">
                <div className="text-2xl font-bold font-serif text-[#C5A065]">0594-612033</div>
                <div className="text-xs text-stone-400 mt-0.5">Direct persoonlijk contact</div>
              </div>
              <div className="px-3 py-1 pt-4 md:pt-1">
                <div className="text-2xl font-bold font-serif text-white">Grootegast</div>
                <div className="text-xs text-stone-400 mt-0.5">Gratis parkeren voor de deur</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Akte-Wijzer (Quick Deed Selector) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-stone-200/90 shadow-sm p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
              Snel Notarieel Overzicht
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16212D] mt-1">
              Waarvoor zoekt u vandaag een notaris?
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Selecteer uw situatie om direct inzicht te krijgen in de vereiste notariële akten, doorlooptijden en richtprijzen.
            </p>
          </div>

          {/* Interactive tab buttons */}
          <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-4 mb-8">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategoryTab;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#16212D] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                  }`}
                >
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active category preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-md overflow-hidden aspect-4/3 border border-stone-200">
                <img
                  src={selectedCategory.image}
                  alt={selectedCategory.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <h3 className="font-serif font-bold text-lg">{selectedCategory.title}</h3>
                  <p className="text-xs text-stone-300 line-clamp-2">{selectedCategory.shortDesc}</p>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                {selectedCategory.leadParagraph}
              </p>
              <button
                onClick={() => onNavigate('diensten', selectedCategory.id)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#16212D] hover:text-[#C5A065] transition-colors cursor-pointer pt-1"
              >
                <span>Bekijk alle aktes binnen {selectedCategory.title}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A065]" />
              </button>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                Meest voorkomende akten in deze categorie:
              </h4>

              <div className="space-y-3">
                {selectedCategory.deeds.map((deed, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-md border border-stone-200/80 bg-[#FAF9F7] hover:border-[#C5A065]/60 hover:bg-white transition-all space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h5 className="font-serif font-bold text-base text-[#16212D]">
                        {deed.name}
                      </h5>
                      <span className="text-xs font-semibold text-[#16212D] bg-[#EAE5DC] px-2 py-0.5 rounded-xs w-fit">
                        {deed.indicativePrice}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {deed.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-stone-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C5A065]" />
                        <span>Doorlooptijd: {deed.turnaround}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('tarieven')}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#16212D] hover:bg-[#203043] rounded-sm transition-colors cursor-pointer"
                >
                  Bereken offerte voor deze categorie
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MW Notariaat (Our Principles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg border border-stone-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-[#C5A065]">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Heldere taal zonder omwegen
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Geen onnodig juridisch vakjargon of geheimzinnigheid. Wij leggen vooraf stap voor stap uit wat de akte betekent voor uw dagelijks leven, uw gezin en uw financiën.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-stone-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-[#C5A065]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Gemoedelijk & Persoonlijk
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Ons kantoor aan Het Steen 13 in Grootegast is laagdrempelig. U parkeert gratis voor de deur en wordt ontvangen met een verse kop koffie in een gemoedelijke Groningse sfeer.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-stone-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-[#C5A065]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Vaste & Eerlijke Tarieven
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Geen nare verrassingen achteraf. Wij hanteren duidelijke offertes met specificatie van het honorarium, de kadasterkosten en btw. Wat we afspreken is wat u betaalt.
            </p>
          </div>
        </div>
      </section>

      {/* Team Teaser Section */}
      <section className="bg-[#FAF9F7] py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
                Deskundig & Betrokken
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16212D] mt-1">
                Ontmoet ons notariële team
              </h2>
              <p className="text-stone-600 text-sm mt-2">
                Onder leiding van notaris mr. Marije Teunissen-Dijkstra en kandidaat-notaris mr. Annet Dillema werkt een hecht team van deskundige juristen en registergoed specialisten.
              </p>
            </div>
            <button
              onClick={() => onNavigate('kantoor')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#16212D] hover:bg-[#203043] rounded-sm transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>Volledig team bekijken</span>
              <ArrowRight className="w-4 h-4 text-[#C5A065]" />
            </button>
          </div>

          {/* Cards for notaries and team members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
                      {member.badge}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">MW Notariaat</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-[#C5A065] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    {member.role}
                  </p>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">{member.yearsExperience}</span>
                  <button
                    onClick={() => onOpenTeamMember(member.id)}
                    className="text-xs font-semibold text-[#16212D] hover:text-[#C5A065] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Bekijk profiel</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
            Ervaringen uit de regio
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16212D] mt-1">
            Wat zeggen cliënten over MW Notariaat?
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Inwoners en ondernemers uit Grootegast, Leek, Marum, Zuidhorn en Groningen delen hun ervaring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200/90 shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-stone-500">{rev.date}</span>
              </div>
              <p className="text-sm text-stone-700 italic leading-relaxed">
                "{rev.text}"
              </p>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">{rev.author}</span>
                <span className="text-stone-500">{rev.location} · {rev.service}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Legal Articles Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
              Kennis & Actualiteiten
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16212D] mt-1">
              Notariële tips en artikelen
            </h2>
          </div>
          <button
            onClick={() => onNavigate('kennis')}
            className="text-xs font-semibold uppercase tracking-wider text-[#16212D] hover:text-[#C5A065] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Alle artikelen bekijken</span>
            <ArrowRight className="w-4 h-4 text-[#C5A065]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.slice(0, 2).map((art) => (
            <div
              key={art.id}
              className="bg-white p-6 rounded-lg border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between space-y-4 cursor-pointer"
              onClick={() => onNavigate('kennis')}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#C5A065] font-semibold uppercase">
                  <span>{art.category}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-stone-900 hover:text-[#C5A065] transition-colors">
                  {art.title}
                </h3>
                <p className="text-sm text-stone-600 line-clamp-2">
                  {art.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                <span>Door {art.author}</span>
                <span className="text-[#C5A065] font-semibold flex items-center gap-1">
                  Lees artikel <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16212D] text-white rounded-lg p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A065] font-semibold">
              Kantoor Grootegast
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Klaar om uw notariële zaken goed te regelen?
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Neem direct contact op voor een vrijblijvend oriënterend gesprek of vraag online een duidelijke maatwerkofferte aan. Wij reageren binnen één werkdag.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0F1722] bg-[#C5A065] hover:bg-[#B38F56] transition-colors rounded-sm cursor-pointer font-bold"
              >
                Afspraak Maken
              </button>
              <button
                onClick={() => onNavigate('tarieven')}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors rounded-sm cursor-pointer"
              >
                Offerte Aanvragen
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
