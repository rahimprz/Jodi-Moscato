import React, { useState, useEffect } from 'react';
import { Search, Menu, X, BookOpen, Sparkles } from 'lucide-react';
import { DEFAULT_BOOK_INFO } from '../data/defaultData';

export default function Navbar({ currentPage, setCurrentPage, onOpenSearch, onOpenLookInside }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about-author', label: 'About The Author' },
    { id: 'about-book', label: 'About The Book' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'contacts', label: 'Contacts' },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(34,184,240,0.08)] border-b border-primary/15 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo: Official Jodi Moscato Logo Image */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            aria-label="Jodi Moscato Home"
          >
            <div className="relative">
              <img
                src={DEFAULT_BOOK_INFO.logoUrl}
                alt="Jodi Moscato Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-2 font-serif font-bold text-xl sm:text-2xl text-gray-900">
                <span className="text-secondary text-2xl animate-spin">✦</span>
                <span>Jodi <span className="text-primary">Moscato</span></span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-sky-50 shadow-sm'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50/80'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Universal Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl text-gray-600 hover:text-primary hover:bg-sky-50 border border-gray-200/80 hover:border-primary/30 transition-all shadow-sm flex items-center gap-2 text-sm font-medium"
              title="Search throughout the site (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-primary" />
              <span className="text-xs text-gray-400 hidden xl:inline">Search...</span>
            </button>

            {/* Quick Look Inside Button */}
            <button
              onClick={onOpenLookInside}
              className="btn-s text-xs sm:text-sm py-2 px-3.5 flex items-center gap-1.5 border-primary/20 text-accent font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary fill-secondary" />
              Look Inside
            </button>

            {/* Main Contact CTA */}
            <button
              onClick={() => handleNavClick('contacts')}
              className="btn-p text-xs sm:text-sm py-2.5 px-4 shadow-[0_6px_16px_rgba(34,184,240,0.25)]"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile Search & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100"
              aria-label="Search site"
            >
              <Search className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-3 rounded-xl font-semibold text-base transition-colors ${
                  currentPage === link.id
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 mt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLookInside();
                }}
                className="w-full btn-s py-2.5 justify-center text-sm font-bold text-accent"
              >
                <Sparkles className="w-4 h-4 text-secondary fill-secondary" />
                Read Sample "Look Inside"
              </button>
              <button
                onClick={() => handleNavClick('contacts')}
                className="w-full btn-p py-2.5 justify-center text-sm font-bold"
              >
                Contact & School Visits
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
