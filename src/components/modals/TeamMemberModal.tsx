import React from 'react';
import { TeamMember } from '../../types';
import { X, Mail, Phone, GraduationCap, Calendar, Briefcase, Award, CheckCircle2 } from 'lucide-react';

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
  onBookAppointment: (memberName: string) => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  onClose,
  onBookAppointment,
}) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-member-name"
      >
        {/* Top header bar */}
        <div className="bg-[#16212D] text-white p-6 sm:p-8 flex items-start justify-between">
          <div className="space-y-1 pr-6">
            <span className="text-xs uppercase tracking-wider text-[#C5A065] font-semibold">
              {member.badge || 'Team MW Notariaat'}
            </span>
            <h3 id="modal-member-name" className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {member.name}
            </h3>
            <p className="text-stone-300 text-sm">
              {member.role}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quote / Personal philosophy */}
          <div className="bg-[#FAF8F5] p-4 rounded-sm border border-stone-200 text-stone-700 italic text-sm leading-relaxed">
            "{member.quote}"
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#C5A065]" />
              <span>Over deze professional</span>
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Specialisms */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900">
              Notariële Specialismen & Aandachtsgebieden
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700">
              {member.specialisms.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A065] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Background and Credentials grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-100 text-xs text-stone-600">
            <div>
              <span className="font-semibold text-stone-900 flex items-center gap-1.5 mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#C5A065]" />
                Opleiding & Ervaring
              </span>
              <p>{member.education}</p>
              <p className="text-stone-500 mt-0.5">{member.yearsExperience}</p>
            </div>
            <div>
              <span className="font-semibold text-stone-900 flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#C5A065]" />
                Aanwezigheid op kantoor
              </span>
              <p>{member.workingDays}</p>
            </div>
          </div>

          {/* Memberships if any */}
          {member.memberships.length > 0 && (
            <div className="pt-2 text-xs text-stone-500 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C5A065] shrink-0" />
              <span>Aangesloten bij: {member.memberships.join(', ')}</span>
            </div>
          )}

          {/* Contact actions */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onBookAppointment(member.name);
              }}
              className="flex-1 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#16212D] hover:bg-[#203043] rounded-sm transition-colors text-center cursor-pointer shadow-xs"
            >
              Plan afspraak met {member.name.split(' ')[0]}
            </button>
            <a
              href={`mailto:${member.email}`}
              className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-sm transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Stuur e-mail</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
