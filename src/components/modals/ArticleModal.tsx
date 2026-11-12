import React from 'react';
import { Article } from '../../types';
import { X, Calendar, User, Clock, CheckCircle2, Share2, BookOpen } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onConsultationClick: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onConsultationClick,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-article-title"
      >
        {/* Top header bar */}
        <div className="bg-[#16212D] text-white p-6 sm:p-8 flex items-start justify-between">
          <div className="space-y-2 pr-6">
            <div className="flex items-center gap-2 text-xs text-[#C5A065] font-semibold uppercase tracking-wider">
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
            <h2 id="modal-article-title" className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              {article.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-stone-300 pt-1">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C5A065]" />
                {article.author} ({article.authorRole})
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A065]" />
                {article.date}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 shrink-0"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key takeaways callout box */}
          <div className="bg-[#FAF8F5] p-5 rounded-sm border border-[#EBE6DD] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A065]" />
              <span>Belangrijkste Notariële Punten</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
              {article.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#C5A065] font-bold mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Body paragraphs */}
          <div className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Bottom call to action */}
          <div className="pt-6 border-t border-stone-200 bg-stone-50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="font-serif font-bold text-base text-stone-900">
                Wilt u uw situatie persoonlijk voorleggen?
              </h5>
              <p className="text-xs text-stone-600">
                Onze notarissen en juristen staan voor u klaar in Grootegast.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onConsultationClick();
              }}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#16212D] hover:bg-[#203043] rounded-sm transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              Vrijblijvend adviesgesprek
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
