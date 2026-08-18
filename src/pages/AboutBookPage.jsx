import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Shield, 
  CheckCircle2, 
  Download, 
  Eye, 
  Layers, 
  HelpCircle, 
  Award, 
  FileText, 
  Heart, 
  Clock, 
  Smile,
  ArrowRight
} from 'lucide-react';
import DualBookShowcase from '../components/DualBookShowcase';
import { DEFAULT_BOOK_INFO, CHAPTERS } from '../data/defaultData';
import { addMessage } from '../data/store';

export default function AboutBookPage({ setCurrentPage, onOpenLookInside }) {
  const [selectedChapter, setSelectedChapter] = useState(CHAPTERS[0]);
  const [guideEmail, setGuideEmail] = useState('');
  const [guideRole, setGuideRole] = useState('Educator');
  const [guideSent, setGuideSent] = useState(false);

  const handleGuideRequest = (e) => {
    e.preventDefault();
    if (!guideEmail) return;
    addMessage({
      name: "Educator / Parent Guide Request",
      email: guideEmail,
      role: guideRole,
      subject: `Free Discussion Guide Download Request (${guideRole})`,
      message: `User requested the companion classroom/family discussion guide for Malex Knows Media.`
    });
    setGuideSent(true);
    setGuideEmail('');
    setTimeout(() => setGuideSent(false), 5000);
  };

  const bookSpecs = [
    { label: "Target Audience", value: DEFAULT_BOOK_INFO.targetAge },
    { label: "Book Length", value: DEFAULT_BOOK_INFO.pages },
    { label: "Available Formats", value: DEFAULT_BOOK_INFO.format },
    { label: "ISBN", value: DEFAULT_BOOK_INFO.isbn },
    { label: "Publisher", value: DEFAULT_BOOK_INFO.publisher },
    { label: "Author", value: DEFAULT_BOOK_INFO.author },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 overflow-hidden">
      
      {/* =========================================================================
          HERO & BOOK OVERVIEW
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
          <button onClick={() => setCurrentPage('home')} className="hover:text-primary">Home</button>
          <span>/</span>
          <span className="text-primary">About The Book</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Dual Book Creative Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <DualBookShowcase onOpenLookInside={onOpenLookInside} />
          </div>

          {/* Book Pitch & Quick Specs */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-primary font-bold text-xs font-fun uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Children's Digital Literacy Guide</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black text-gray-900 leading-tight">
              {DEFAULT_BOOK_INFO.title}
            </h1>

            <h2 className="text-lg sm:text-xl font-medium text-accent font-serif">
              {DEFAULT_BOOK_INFO.subtitle}
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {DEFAULT_BOOK_INFO.summary}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {bookSpecs.map((spec, i) => (
                <div key={i} className="p-3 rounded-2xl bg-white border border-gray-100 shadow-xs">
                  <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{spec.label}</div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenLookInside}
                className="btn-p text-sm py-3 px-6 shadow-md"
              >
                <Eye className="w-4 h-4" />
                Read Sample "Look Inside"
              </button>
              <button
                onClick={() => setCurrentPage('contacts')}
                className="btn-s text-sm py-3 px-6 text-accent"
              >
                <BookOpen className="w-4 h-4" />
                Order for Classroom / Library
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          INTERACTIVE 5-CHAPTER DEEP DIVE
         ========================================================================= */}
      <section className="py-16 bg-gradient-to-b from-indigo-50/50 via-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-fun font-bold text-accent uppercase tracking-wider px-3 py-1 bg-purple-100 rounded-full">
              Curriculum Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-2 mb-3">
              Explore the <span className="text-primary">5 Core Chapters</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Click any chapter below to explore learning outcomes, key takeaways, and sample excerpts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Chapter Selection Pills (Left) */}
            <div className="lg:col-span-5 space-y-3">
              {CHAPTERS.map((ch) => {
                const isSelected = selectedChapter.number === ch.number;
                return (
                  <div
                    key={ch.number}
                    onClick={() => setSelectedChapter(ch)}
                    className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-white border-primary shadow-lg ring-2 ring-primary/20 translate-x-2'
                        : 'bg-white/70 border-gray-100 hover:bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-serif font-black text-base shadow-sm shrink-0"
                        style={{ backgroundColor: ch.color }}
                      >
                        {ch.number}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-gray-900">
                          {ch.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{ch.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-primary translate-x-1' : 'text-gray-300'}`} />
                  </div>
                );
              })}
            </div>

            {/* Detailed Selected Chapter Card (Right) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-white font-serif font-bold text-xs"
                    style={{ backgroundColor: selectedChapter.color }}
                  >
                    Chapter {selectedChapter.number}
                  </span>
                  <span className="text-xs font-bold text-gray-400 font-fun">
                    {selectedChapter.badge}
                  </span>
                </div>
                <span className="text-xs text-primary font-semibold">
                  Ages 6–12 Friendly
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-1">
                  {selectedChapter.title}
                </h3>
                <h4 className="text-sm font-semibold text-accent font-fun mb-4">
                  {selectedChapter.subtitle}
                </h4>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {selectedChapter.description}
                </p>
              </div>

              {/* Sample Excerpt Box */}
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1 flex items-center gap-1.5 font-fun">
                  <Sparkles className="w-3.5 h-3.5 fill-primary" />
                  Sample Book Excerpt
                </div>
                <p className="text-gray-800 text-sm sm:text-base italic font-serif leading-relaxed">
                  "{selectedChapter.sampleExcerpt}"
                </p>
              </div>

              {/* Key Takeaways */}
              <div>
                <h5 className="font-serif font-bold text-sm text-gray-900 mb-3">
                  What Children Learn in This Chapter:
                </h5>
                <ul className="space-y-2">
                  {selectedChapter.takeaways.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          FREE TEACHER & PARENT DISCUSSION GUIDE FORM
         ========================================================================= */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-900 via-accent to-purple-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-lg">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full font-fun">
              Free Downloadable Companion Guide
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Download the Free 12-Page Educator & Family Discussion Guide
            </h3>
            <p className="text-white/85 text-sm leading-relaxed">
              Includes printable student worksheets, classroom conversation cards, and family tech contract templates for every chapter.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px] bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            {guideSent ? (
              <div className="p-4 rounded-xl bg-white text-emerald-800 text-sm font-bold flex items-center gap-2 shadow animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Request received! We will email you the guide shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleGuideRequest} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-white/90 mb-1">Your Role:</label>
                  <select
                    value={guideRole}
                    onChange={(e) => setGuideRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white text-gray-900 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Educator">Elementary Teacher / Educator</option>
                    <option value="Parent">Parent / Guardian</option>
                    <option value="Librarian">Librarian</option>
                    <option value="School Admin">School Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/90 mb-1">Your Email Address:</label>
                  <input
                    type="email"
                    value={guideEmail}
                    onChange={(e) => setGuideEmail(e.target.value)}
                    placeholder="teacher@school.org"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-gray-900 text-xs font-medium placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-secondary hover:bg-amber-400 text-gray-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Request Free Discussion PDF</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
