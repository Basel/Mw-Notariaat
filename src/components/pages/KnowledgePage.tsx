import React, { useState } from 'react';
import { PageId, Article } from '../../types';
import { ARTICLES } from '../../data/notaryData';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  FileText, 
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface KnowledgePageProps {
  onNavigate: (page: PageId) => void;
  onOpenArticle: (articleId: string) => void;
}

export const KnowledgePage: React.FC<KnowledgePageProps> = ({
  onNavigate,
  onOpenArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Alle artikelen' },
    { id: 'Wonen & Hypotheek', label: 'Wonen & Hypotheek' },
    { id: 'Familie & Relatie', label: 'Familie & Relatie' },
    { id: 'Erven & Nalatenschap', label: 'Erven & Nalatenschap' },
    { id: 'Onderneming & Zakelijk', label: 'Onderneming & Zakelijk' },
  ];

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#111A24] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A065] font-semibold">
              Kennisbank & Actueel
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Notariële Kennis & Praktijktips
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Praktische gidsen en toelichtingen van onze notarissen en juristen te Grootegast. Zo blijft u op de hoogte van wijzigingen in het erfrecht, vastgoedregels en ondernemingswetgeving in 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-stone-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#16212D] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Zoeken in artikelen..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-sm border border-stone-200 focus:outline-hidden focus:border-[#C5A065]"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-lg border border-stone-200/90 shadow-2xs hover:border-[#C5A065]/70 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
                onClick={() => onOpenArticle(art.id)}
              >
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#C5A065] font-semibold uppercase tracking-wider">
                      {art.category}
                    </span>
                    <span className="text-stone-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-[#C5A065] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {art.excerpt}
                  </p>

                  {/* Highlights snippet */}
                  <div className="bg-[#FAF9F7] p-3.5 rounded-sm border border-stone-150 space-y-1.5 text-xs text-stone-700">
                    <span className="font-bold text-stone-900 block text-[11px] uppercase tracking-wider">
                      Belangrijkste inzichten:
                    </span>
                    {art.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A065] shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-6 sm:px-8 py-4 bg-[#FAF9F7] border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                    <User className="w-3.5 h-3.5 text-[#C5A065]" />
                    <span>{art.author}</span>
                  </div>
                  <span className="font-bold text-[#16212D] group-hover:text-[#C5A065] transition-colors flex items-center gap-1">
                    <span>Lees artikel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-lg border border-stone-200 space-y-3">
            <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
            <h4 className="font-serif font-bold text-lg text-stone-900">
              Geen artikelen gevonden
            </h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Er zijn geen artikelen die overeenkomen met uw zoekterm "{searchQuery}". Probeer een andere term of reset het filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold uppercase text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-sm cursor-pointer"
            >
              Filters wissen
            </button>
          </div>
        )}
      </section>

      {/* Newsletter / Legal Updates Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16212D] text-white rounded-lg p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A065]">
              Altijd Actueel
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Heeft u een specifieke notariële vraag?
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              Elke situatie is uniek. Neem vrijblijvend contact op met ons kantoor in Grootegast voor een passend advies op maat.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0F1722] bg-[#C5A065] hover:bg-[#B38F56] transition-colors rounded-sm cursor-pointer font-bold whitespace-nowrap shadow-xs"
          >
            Neem direct contact op
          </button>
        </div>
      </section>
    </div>
  );
};
