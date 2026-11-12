import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { TEAM_MEMBERS, ARTICLES } from './data/notaryData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { AboutTeamPage } from './components/pages/AboutTeamPage';
import { PricingQuotePage } from './components/pages/PricingQuotePage';
import { KnowledgePage } from './components/pages/KnowledgePage';
import { ContactPage } from './components/pages/ContactPage';
import { TeamMemberModal } from './components/modals/TeamMemberModal';
import { ArticleModal } from './components/modals/ArticleModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [pageParam, setPageParam] = useState<string | undefined>(undefined);

  // Modals state
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Quote or Appointment pre-selection state
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [preselectedMember, setPreselectedMember] = useState<string | undefined>(undefined);

  // Synchronize with URL hash for true multi-page experience & browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const parts = hash.split('/');
      const page = parts[0] as PageId;
      const validPages: PageId[] = ['home', 'diensten', 'kantoor', 'tarieven', 'kennis', 'contact'];

      if (validPages.includes(page)) {
        setCurrentPage(page);
        setPageParam(parts[1]);
      } else if (!hash) {
        setCurrentPage('home');
        setPageParam(undefined);
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId, subParam?: string) => {
    setCurrentPage(page);
    setPageParam(subParam);
    const newHash = subParam ? `#/${page}/${subParam}` : `#/${page === 'home' ? '' : page}`;
    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTeamMember = (memberId: string) => {
    setSelectedMemberId(memberId);
  };

  const handleOpenArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
  };

  const handleBookAppointmentWith = (memberName: string) => {
    setPreselectedMember(memberName);
    navigateTo('contact');
  };

  const handleSelectServiceForQuote = (serviceName: string) => {
    setPreselectedService(serviceName);
    navigateTo('tarieven');
  };

  const currentMember = TEAM_MEMBERS.find(m => m.id === selectedMemberId) || null;
  const currentArticle = ARTICLES.find(a => a.id === selectedArticleId) || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#16212D] selection:bg-[#C5A065]/20 selection:text-[#0F1722]">
      {/* Strict Top Bar Contract Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Main Multi-Page Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenTeamMember={handleOpenTeamMember}
          />
        )}

        {currentPage === 'diensten' && (
          <ServicesPage
            initialCategory={pageParam}
            onNavigate={navigateTo}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        )}

        {currentPage === 'kantoor' && (
          <AboutTeamPage
            onNavigate={navigateTo}
            onOpenTeamMember={handleOpenTeamMember}
            onBookAppointmentWith={handleBookAppointmentWith}
          />
        )}

        {currentPage === 'tarieven' && (
          <PricingQuotePage
            initialService={preselectedService}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'kennis' && (
          <KnowledgePage
            onNavigate={navigateTo}
            onOpenArticle={handleOpenArticle}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialMemberName={preselectedMember}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Team Member in-depth Modal (Honoring no separate pages for workers) */}
      <TeamMemberModal
        member={currentMember}
        onClose={() => setSelectedMemberId(null)}
        onBookAppointment={handleBookAppointmentWith}
      />

      {/* Knowledge Article Modal */}
      <ArticleModal
        article={currentArticle}
        onClose={() => setSelectedArticleId(null)}
        onConsultationClick={() => {
          setSelectedArticleId(null);
          navigateTo('contact');
        }}
      />

      {/* Quiet, Dignified Law Firm Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
