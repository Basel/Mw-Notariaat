import React, { useState } from 'react';
import { PageId } from '../../types';
import { OFFICE_INFO, TEAM_MEMBERS } from '../../data/notaryData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Car, 
  Accessibility, 
  Send, 
  ShieldCheck,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface ContactPageProps {
  initialMemberName?: string;
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialMemberName,
  onNavigate,
}) => {
  // Appointment Booker State
  const [appointmentType, setAppointmentType] = useState('Oriënterend adviesgesprek (30 min - kosteloos)');
  const [selectedSpecialist, setSelectedSpecialist] = useState(initialMemberName || 'Eerste beschikbare specialist');
  const [selectedDate, setSelectedDate] = useState('2026-11-18');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [dossierNotes, setDossierNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:15', '13:30', '14:15', '15:00', '15:45', '16:30'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;

    const code = `AFSP-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(code);
    setBookingConfirmed(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#111A24] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A065] font-semibold">
              Kantoor & Bereikbaarheid
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Contact & Afspraak Maken
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              U bent van harte welkom op ons kantoor aan Het Steen 13 in Grootegast. Bel ons direct op 0594-612033 of plan hieronder direct een afspraak in met één van onze notarissen.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Appointment Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg border border-stone-200 shadow-md p-6 sm:p-10 space-y-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
                  Digitale Agenda
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16212D] mt-1">
                  Plan uw afspraak op kantoor
                </h2>
                <p className="text-stone-600 text-sm mt-1">
                  Kies uw gewenste type afspraak en datum. Wij bevestigen uw tijdslot direct per e-mail.
                </p>
              </div>

              {!bookingConfirmed ? (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {/* Step 1: Type afspraak */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                      1. Type bijeenkomst
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        'Oriënterend adviesgesprek (30 min - kosteloos)',
                        'Bespreking conceptakte (testament of huwelijk)',
                        'Passeren / ondertekening akte',
                        'Telefonisch of video-consult',
                      ].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setAppointmentType(type)}
                          className={`p-3 rounded-sm border text-left cursor-pointer transition-colors ${
                            appointmentType === type
                              ? 'border-[#16212D] bg-[#16212D] text-white font-medium'
                              : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Specialist keuze */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                      2. Gewenste specialist
                    </label>
                    <select
                      value={selectedSpecialist}
                      onChange={e => setSelectedSpecialist(e.target.value)}
                      className="w-full text-xs p-3 rounded-sm border border-stone-300 bg-white focus:outline-hidden focus:border-[#C5A065]"
                    >
                      <option value="Eerste beschikbare specialist">Eerste beschikbare specialist (snelste optie)</option>
                      {TEAM_MEMBERS.map(m => (
                        <option key={m.id} value={m.name}>
                          {m.name} — {m.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 3: Datum & Tijdslot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                        3. Datum
                      </label>
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#C5A065]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                        4. Tijdslot
                      </label>
                      <select
                        value={selectedTimeSlot}
                        onChange={e => setSelectedTimeSlot(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white focus:outline-hidden focus:border-[#C5A065]"
                      >
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot} uur</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 4: Contactgegevens */}
                  <div className="space-y-3 pt-4 border-t border-stone-100">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                      5. Uw gegevens
                    </label>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Volledige naam *"
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#C5A065]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="email"
                        required
                        placeholder="E-mailadres *"
                        value={clientEmail}
                        onChange={e => setClientEmail(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#C5A065]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Telefoonnummer *"
                        value={clientPhone}
                        onChange={e => setClientPhone(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#C5A065]"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        placeholder="Waarover wilt u spreken? (bijv. aankoop woning, levenstestament, BV oprichting)"
                        value={dossierNotes}
                        onChange={e => setDossierNotes(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#C5A065]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-[#0F1722] bg-[#C5A065] hover:bg-[#B38F56] transition-colors rounded-sm cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Calendar className="w-4 h-4 text-[#0F1722]" />
                    <span>Afspraak Definitief Bevestigen</span>
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-md p-6 text-emerald-950 space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 font-serif font-bold text-lg text-emerald-900">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span>Afspraak Succesvol Ingevuld & Bevestigd</span>
                  </div>

                  <div className="space-y-1 text-xs text-emerald-800 leading-relaxed">
                    <p>
                      Beste <strong>{clientName}</strong>, wij zien u graag tegemoet op ons kantoor in Grootegast.
                    </p>
                    <div className="bg-white/80 p-3 rounded-sm border border-emerald-200 mt-2 space-y-1 font-mono text-xs">
                      <div><strong>Referentiecode:</strong> {bookingCode}</div>
                      <div><strong>Type:</strong> {appointmentType}</div>
                      <div><strong>Datum & Tijd:</strong> {selectedDate} om {selectedTimeSlot} uur</div>
                      <div><strong>Specialist:</strong> {selectedSpecialist}</div>
                      <div><strong>Locatie:</strong> Het Steen 13, 9861 BA Grootegast</div>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-800">
                    Een bevestiging inclusief agenda-uitnodiging is verzonden naar <strong>{clientEmail}</strong>.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-xs cursor-pointer"
                    >
                      Nog een afspraak maken
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Office Location, Hours, Travel Directions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact details card */}
            <div className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Kantoor & Contactgegevens
              </h3>

              <div className="space-y-4 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A065] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-serif">MW Notariaat</strong>
                    <span>{OFFICE_INFO.address.street}</span><br />
                    <span>{OFFICE_INFO.address.postalCode} {OFFICE_INFO.address.city}</span><br />
                    <span className="text-xs text-stone-500">{OFFICE_INFO.address.region}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C5A065] shrink-0" />
                  <div>
                    <span className="text-xs text-stone-500 block">Telefoonnummer</span>
                    <a href={`tel:${OFFICE_INFO.contact.phone}`} className="font-mono font-bold text-stone-900 hover:text-[#C5A065]">
                      {OFFICE_INFO.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C5A065] shrink-0" />
                  <div>
                    <span className="text-xs text-stone-500 block">E-mail</span>
                    <a href={`mailto:${OFFICE_INFO.contact.email}`} className="text-stone-900 hover:text-[#C5A065]">
                      {OFFICE_INFO.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours Table */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900">
                  <Clock className="w-4 h-4 text-[#C5A065]" />
                  <span>Openingstijden</span>
                </div>
                <div className="space-y-1.5 text-xs text-stone-600">
                  {OFFICE_INFO.openingHours.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-0.5">
                      <span>{item.day}</span>
                      <span className="font-mono text-stone-800 font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel, Parking & Accessibility */}
            <div className="bg-[#FAF9F7] rounded-lg border border-stone-200 p-6 space-y-4 text-xs text-stone-700">
              <h4 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <Car className="w-4 h-4 text-[#C5A065]" />
                <span>Parkeren & Bereikbaarheid</span>
              </h4>
              <p className="leading-relaxed">
                {OFFICE_INFO.parking}
              </p>
              <div className="flex items-start gap-2 pt-1 text-stone-600">
                <Accessibility className="w-4 h-4 text-[#C5A065] shrink-0 mt-0.5" />
                <span>{OFFICE_INFO.accessibility}</span>
              </div>
              <div className="pt-2 border-t border-stone-200/80 space-y-1">
                <span className="font-bold text-stone-900 block">Reistijd vanuit omliggende plaatsen:</span>
                <p>• Vanaf <strong>Leek & Marum</strong>: ca. 12 minuten via de N388</p>
                <p>• Vanaf <strong>Zuidhorn</strong>: ca. 15 minuten</p>
                <p>• Vanaf <strong>Surhuisterveen & Drachten</strong>: ca. 15–20 minuten</p>
                <p>• Vanaf <strong>Groningen stad</strong>: ca. 25 minuten via A7</p>
              </div>
            </div>

            {/* Interactive Visual Map Card */}
            <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs">
              <div className="bg-[#111A24] p-4 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C5A065] font-semibold block">Locatiekaart</span>
                  <span className="font-serif font-bold text-sm">Grootegast Centrum / Het Steen</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Het+Steen+13+9861+BA+Grootegast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-xs text-[11px] font-semibold tracking-wide text-white transition-colors"
                >
                  Google Maps
                </a>
              </div>
              {/* Stylized schematic map of Het Steen Grootegast */}
              <div className="h-44 bg-[#EBE8E1] relative flex items-center justify-center p-4 overflow-hidden">
                {/* SVG roads and pin illustration */}
                <svg className="absolute inset-0 w-full h-full text-stone-300" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Road lines */}
                  <path d="M 0,100 L 400,100" stroke="#DDD8CC" strokeWidth="16" fill="none" />
                  <path d="M 200,0 L 200,200" stroke="#DDD8CC" strokeWidth="14" fill="none" />
                  <path d="M 70,200 L 250,0" stroke="#E3DFC</h2>" strokeWidth="8" fill="none" />
                  {/* Surrounding green patches */}
                  <rect x="220" y="20" width="160" height="60" fill="#D7E0D3" opacity="0.6" rx="4" />
                  <rect x="20" y="120" width="160" height="60" fill="#D7E0D3" opacity="0.6" rx="4" />
                </svg>

                {/* Office Pin badge */}
                <div className="relative z-10 bg-[#16212D] text-white px-4 py-2 rounded-md shadow-lg border border-[#C5A065] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A065]" />
                  <div className="text-left">
                    <span className="font-serif font-bold text-xs block text-white">MW Notariaat</span>
                    <span className="text-[10px] text-stone-300 block">Het Steen 13, Grootegast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
