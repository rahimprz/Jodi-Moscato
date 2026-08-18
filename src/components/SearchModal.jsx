import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, User, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { CHAPTERS, FAQS } from '../data/defaultData';
import { getBlogs } from '../data/store';

export default function SearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const blogs = getBlogs();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  // Search Results
  const matchedChapters = cleanQ
    ? CHAPTERS.filter(
        (c) =>
          c.title.toLowerCase().includes(cleanQ) ||
          c.description.toLowerCase().includes(cleanQ) ||
          c.tagline.toLowerCase().includes(cleanQ) ||
          c.takeaways.some((t) => t.toLowerCase().includes(cleanQ))
      )
    : [];

  const matchedBlogs = cleanQ
    ? blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(cleanQ) ||
          b.excerpt.toLowerCase().includes(cleanQ) ||
          b.category.toLowerCase().includes(cleanQ) ||
          (b.content && b.content.toLowerCase().includes(cleanQ))
      )
    : [];

  const matchedFaqs = cleanQ
    ? FAQS.filter(
        (f) =>
          f.q.toLowerCase().includes(cleanQ) ||
          f.a.toLowerCase().includes(cleanQ) ||
          f.category.toLowerCase().includes(cleanQ)
      )
    : [];

  const isAuthorMatch =
    cleanQ &&
    ('jodi moscato author biography educator digital literacy teacher book'
      .toLowerCase()
      .includes(cleanQ) ||
      'jodi'.includes(cleanQ));

  const totalMatches =
    matchedChapters.length +
    matchedBlogs.length +
    matchedFaqs.length +
    (isAuthorMatch ? 1 : 0);

  const handleSelect = (page, anchor = '') => {
    onNavigate(page, anchor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-primary/20 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-sky-50/50 to-indigo-50/30">
          <Search className="w-6 h-6 text-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blogs, chapters, safety topics, Jodi's bio..."
            className="w-full text-base sm:text-lg font-medium text-gray-800 bg-transparent placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!query && (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-primary flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-gray-800 text-base mb-1">
                Looking for something specific?
              </h4>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Type anything like <span className="text-primary font-semibold">"passwords"</span>, <span className="text-primary font-semibold">"screen time"</span>, <span className="text-primary font-semibold">"classroom guides"</span>, or <span className="text-primary font-semibold">"about Jodi"</span>.
              </p>
              
              {/* Popular Quick Suggestions */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {['Passwords', 'Screen Time', 'Cyberbullying', 'Elementary', 'Educators', 'Jodi Moscato'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 rounded-full bg-gray-100 hover:bg-primary/10 hover:text-primary text-xs font-semibold text-gray-600 transition"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalMatches === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-base">No results found for "<span className="font-semibold">{query}</span>".</p>
              <p className="text-sm text-gray-400 mt-1">Try checking for spelling or searching broader terms like "safety", "book", or "contact".</p>
            </div>
          )}

          {/* Book Chapters Section */}
          {matchedChapters.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <BookOpen className="w-3.5 h-3.5 text-accent" /> Book Chapters ({matchedChapters.length})
              </div>
              <div className="space-y-2">
                {matchedChapters.map((c) => (
                  <div
                    key={c.number}
                    onClick={() => handleSelect('about-book')}
                    className="p-3.5 rounded-2xl bg-purple-50/60 hover:bg-purple-50 border border-purple-100 cursor-pointer transition flex items-start justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-accent text-white">
                          Chapter {c.number}
                        </span>
                        <h5 className="font-bold text-gray-900 text-sm group-hover:text-accent transition">
                          {c.title}
                        </h5>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{c.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blogs Section */}
          {matchedBlogs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <FileText className="w-3.5 h-3.5 text-primary" /> Blog Articles ({matchedBlogs.length})
              </div>
              <div className="space-y-2">
                {matchedBlogs.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => handleSelect('blogs')}
                    className="p-3.5 rounded-2xl bg-sky-50/60 hover:bg-sky-50 border border-sky-100 cursor-pointer transition flex items-start justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary text-white">
                          {b.category}
                        </span>
                        <h5 className="font-bold text-gray-900 text-sm group-hover:text-primary transition">
                          {b.title}
                        </h5>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{b.excerpt}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author Match */}
          {isAuthorMatch && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <User className="w-3.5 h-3.5 text-coral" /> Author Biography
              </div>
              <div
                onClick={() => handleSelect('about-author')}
                className="p-3.5 rounded-2xl bg-rose-50/60 hover:bg-rose-50 border border-rose-100 cursor-pointer transition flex items-start justify-between group"
              >
                <div>
                  <h5 className="font-bold text-gray-900 text-sm group-hover:text-coral transition">
                    About Jodi Moscato — Author & Educator
                  </h5>
                  <p className="text-xs text-gray-600">
                    Learn about Jodi's mission, background in elementary digital literacy advocacy, and classroom visits.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-coral group-hover:translate-x-1 transition shrink-0 mt-1" />
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {matchedFaqs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-500" /> FAQs & Answers ({matchedFaqs.length})
              </div>
              <div className="space-y-2">
                {matchedFaqs.map((f, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelect('home')}
                    className="p-3.5 rounded-2xl bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100 cursor-pointer transition flex items-start justify-between group"
                  >
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm group-hover:text-emerald-600 transition mb-1">
                        {f.q}
                      </h5>
                      <p className="text-xs text-gray-600 line-clamp-2">{f.a}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 px-6">
          <span>Tip: Press ESC to close</span>
          <span>Malex Knows Media</span>
        </div>

      </div>
    </div>
  );
}
