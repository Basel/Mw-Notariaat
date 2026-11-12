import React, { useState } from 'react';
import { PageId } from '../../types';
import { TEAM_MEMBERS, OFFICE_INFO } from '../../data/notaryData';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  Users, 
  GraduationCap, 
  Clock, 
  ArrowRight, 
  Building,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react';

interface AboutTeamPageProps {
  onNavigate: (page: PageId) => void;
  onOpenTeamMember: (memberId: string) => void;
  onBookAppointmentWith: (memberName: string) => void;
}

export const AboutTeamPage: React.FC<AboutTeamPageProps> = ({
  onNavigate,
  onOpenTeamMember,
  onBookAppointmentWith,
}) => {
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredMembers = TEAM_MEMBERS.filter((member) => {
    if (filterRole === 'all') return true;
    if (filterRole === 'notarissen') return member.role.toLowerCase().includes('notaris');
    if (filterRole === 'familierecht') return member.specialisms.some(s => s.toLowerCase().includes('familie') || s.toLowerCase().includes('erfrecht') || s.toLowerCase().includes('testament'));
    if (filterRole === 'vastgoed') return member.specialisms.some(s => s.toLowerCase().includes('goed') || s.toLowerCase().includes('hypotheek') || s.toLowerCase().includes('levering'));
    return true;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Hero / Header Section */}
      <section className="bg-[#111A24] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A065] font-semibold">
              Kantoor & Notarieel Team
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Ons Kantoor & Notarieel Team
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              MW Notariaat is het vertrouwde notariskantoor voor Grootegast, het Westerkwartier en Groningen. Wij combineren gedegen juridische scherpte met een open, laagdrempelige en persoonlijke benadering.
            </p>
          </div>
        </div>
      </section>

      {/* About Office Section: Philosophy & Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
              Over MW Notariaat
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16212D]">
              Notariële deskundigheid zonder afstand
            </h2>
            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p>
                Het notariaat gaat over de meest wezenlijke momenten in het leven: een eerste eigen woning, het bezegelen van een relatie, de overgang van een familiebedrijf of de zorg voor nabestaanden na een overlijden. Bij MW Notariaat geloven wij dat deze momenten helderheid en rust verdienen.
              </p>
              <p>
                Gevestigd aan Het Steen 13 in Grootegast werken wij met een vast, betrokken team dat de regio kent. Onze notarissen en juristen zijn aangesloten bij de Koninklijke Notariële Beroepsorganisatie (KNB) en volgen continu specialistische nascholingen op het gebied van estate planning, vastgoed en ondernemingsrecht.
              </p>
            </div>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-md border border-stone-200 bg-white">
                <h4 className="font-serif font-bold text-base text-[#16212D] flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A065]" />
                  <span>Begrijpelijke Taal</span>
                </h4>
                <p className="text-xs text-stone-600">
                  Geen onnodige Latijnse termen. Wij vertalen complexe wetteksten naar duidelijke afspraken die u direct begrijpt.
                </p>
              </div>

              <div className="p-4 rounded-md border border-stone-200 bg-white">
                <h4 className="font-serif font-bold text-base text-[#16212D] flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A065]" />
                  <span>Onafhankelijk & Integer</span>
                </h4>
                <p className="text-xs text-stone-600">
                  Als openbaar ambtenaar waarborgt de notaris een strikt onpartijdige behartiging van de belangen van álle betrokken partijen.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden border border-stone-200 shadow-md">
              <img
                src="/src/assets/images/notary_hero_office_1794492148246.jpg"
                alt="Vergaderruimte MW Notariaat Grootegast"
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 bg-white space-y-2 border-t border-stone-150">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#C5A065]">
                  <MapPin className="w-4 h-4" />
                  <span>Het Steen 13, Grootegast</span>
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900">
                  Een moderne, toegankelijke werkomgeving
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Ruime spreekkamers met veel natuurlijk daglicht, volledige rolstoeltoegankelijkheid en gratis privéparkeerplaatsen direct voor de entree.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Unified Team Showcase (No separate pages needed!) */}
      <section className="bg-[#FAF9F7] py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
              Onze Professionals
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16212D] mt-1">
              Het notariële team van MW Notariaat
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Ontmoet onze notarissen, juristen en registergoed specialisten. Klik op een medewerker voor het uitgebreide profiel, aandachtsgebieden en directe contactgegevens.
            </p>
          </div>

          {/* Interactive filter buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Alle Teamleden (6)' },
              { id: 'notarissen', label: 'Notarissen' },
              { id: 'familierecht', label: 'Erfrecht & Familie' },
              { id: 'vastgoed', label: 'Vastgoed & Hypotheken' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterRole(f.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                  filterRole === f.id
                    ? 'bg-[#16212D] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg border border-stone-200/90 shadow-2xs hover:border-[#C5A065]/60 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Upper card section */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
                      {member.badge}
                    </span>
                    <span className="text-[11px] font-mono text-stone-500">
                      {member.yearsExperience}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-[#C5A065] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-stone-600 mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {member.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Specialism tags */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[11px] uppercase font-semibold text-stone-500 block">
                      Aandachtsgebieden:
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-stone-600">
                      {member.specialisms.slice(0, 3).map((spec, i) => (
                        <span key={i} className="bg-stone-100 px-2 py-0.5 rounded-xs">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom action zone */}
                <div className="p-4 bg-[#FAF9F7] border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenTeamMember(member.id)}
                    className="text-xs font-bold text-[#16212D] hover:text-[#C5A065] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Bekijk profiel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1.5 text-stone-500 hover:text-[#16212D] hover:bg-stone-200/60 rounded-xs transition-colors"
                      title={`Stuur e-mail naar ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => onBookAppointmentWith(member.name)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-white bg-[#16212D] hover:bg-[#203043] rounded-xs transition-colors cursor-pointer"
                    >
                      Afspraak
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards & Accreditations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-stone-200 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
              Beroepskwaliteit & Toezicht
            </span>
            <h3 className="font-serif font-bold text-2xl text-stone-900 mt-1">
              Geborgde kwaliteit en betrouwbaarheid
            </h3>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              Het notarisambt is wettelijk geregeld in de Wet op het notarisambt (Wna). Dit betekent dat u altijd kunt rekenen op strikte geheimhouding, periodieke kwaliteitsaudits en professionele bescherming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900">
                <ShieldCheck className="w-5 h-5 text-[#C5A065]" />
                <span>KNB Kwaliteitsnormen</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Als lid van de Koninklijke Notariële Beroepsorganisatie voldoet MW Notariaat aan de hoogste integriteits- en vakeisen van Nederland.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900">
                <Award className="w-5 h-5 text-[#C5A065]" />
                <span>Derdengelden Bescherming</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Financiële transacties rondom vastgoed en nalatenschappen lopen veilig via onze wettelijk beschermde kwaliteitsrekening.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900">
                <GraduationCap className="w-5 h-5 text-[#C5A065]" />
                <span>Permanente Educatie</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Onze notarissen en kandidaat-notarissen volgen jaarlijks verplichte juridische en fiscale permanente educatiepunten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16212D] text-white rounded-lg p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-2xl text-white">
              Wilt u kennismaken met ons team?
            </h3>
            <p className="text-stone-300 text-sm max-w-xl">
              U bent van harte welkom op ons kantoor in Grootegast voor een kop koffie en een goed gesprek over uw akte.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0F1722] bg-[#C5A065] hover:bg-[#B38F56] transition-colors rounded-sm cursor-pointer font-bold whitespace-nowrap shadow-xs"
          >
            Afspraak plannen
          </button>
        </div>
      </section>
    </div>
  );
};
