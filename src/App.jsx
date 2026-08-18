import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutAuthorPage from './pages/AboutAuthorPage';
import AboutBookPage from './pages/AboutBookPage';
import BlogsPage from './pages/BlogsPage';
import ContactsPage from './pages/ContactsPage';
import AdminPanel from './pages/AdminPanel';
import SearchModal from './components/SearchModal';
import LookInsideModal from './components/LookInsideModal';
import { ArrowUp } from 'lucide-react';

export default function App() {
  // Sync page state with URL hash for seamless bookmarking and browser back/forward navigation
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    const validPages = ['home', 'about-author', 'about-book', 'blogs', 'contacts', 'admin'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLookInsideOpen, setIsLookInsideOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'about-author', 'about-book', 'blogs', 'contacts', 'admin'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when page changes
  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll listener for back-to-top button
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-primary selection:text-white">
      
      {/* Universal Top Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLookInside={() => setIsLookInsideOpen(true)}
      />

      {/* Main Page Routing Container */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={handlePageChange}
            onOpenLookInside={() => setIsLookInsideOpen(true)}
          />
        )}

        {currentPage === 'about-author' && (
          <AboutAuthorPage setCurrentPage={handlePageChange} />
        )}

        {currentPage === 'about-book' && (
          <AboutBookPage
            setCurrentPage={handlePageChange}
            onOpenLookInside={() => setIsLookInsideOpen(true)}
          />
        )}

        {currentPage === 'blogs' && (
          <BlogsPage setCurrentPage={handlePageChange} />
        )}

        {currentPage === 'contacts' && (
          <ContactsPage setCurrentPage={handlePageChange} />
        )}

        {currentPage === 'admin' && (
          <AdminPanel setCurrentPage={handlePageChange} />
        )}
      </main>

      {/* Universal Footer */}
      <Footer setCurrentPage={handlePageChange} />

      {/* Global Universal Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(pageId) => handlePageChange(pageId)}
      />

      {/* Look Inside Excerpt Modal */}
      <LookInsideModal
        isOpen={isLookInsideOpen}
        onClose={() => setIsLookInsideOpen(false)}
        onGoToContact={() => handlePageChange('contacts')}
      />

      {/* Floating Back-To-Top Action */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

    </div>
  );
}
