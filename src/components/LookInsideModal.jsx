import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Star, Sparkles, Heart } from 'lucide-react';
import { SAMPLE_PAGES, DEFAULT_BOOK_INFO } from '../data/defaultData';

export default function LookInsideModal({ isOpen, onClose, onGoToContact }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (!isOpen) return null;

  const current = SAMPLE_PAGES[currentPageIndex];
  const totalPages = SAMPLE_PAGES.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-950/75 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-primary/20 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-sky-50 via-purple-50 to-amber-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-gray-900 text-base sm:text-lg">
                Look Inside: <span className="text-primary">{DEFAULT_BOOK_INFO.title}</span>
              </h3>
              <p className="text-xs text-gray-500">
                Sample Excerpt • Page {currentPageIndex + 1} of {totalPages}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Reader Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-gradient-to-b from-amber-50/20 to-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
            
            {/* Page Illustration */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl ring-4 ring-white group bg-gray-100 aspect-[4/5] flex items-center justify-center">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-accent text-white font-fun text-xs font-bold px-3 py-1 rounded-full shadow">
                Page {current.page}
              </div>
            </div>

            {/* Page Text & Read Content */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-coral bg-coral/10 px-3 py-1 rounded-full w-fit font-fun">
                <Sparkles className="w-3.5 h-3.5 fill-coral" />
                Featured Excerpt
              </div>

              <h4 className="text-2xl font-serif font-bold text-gray-900 leading-tight">
                {current.title}
              </h4>
              <h5 className="text-sm font-semibold text-primary font-fun">
                {current.subtitle}
              </h5>

              <p className="text-gray-700 leading-relaxed text-base sm:text-lg italic font-serif bg-sky-50/50 p-5 rounded-2xl border-l-4 border-primary shadow-sm">
                "{current.text}"
              </p>

              <div className="pt-2 text-xs text-gray-500 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Illustrated by professional children's book artists</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Navigation Controls */}
        <div className="p-4 sm:p-5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-white">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPageIndex((p) => Math.max(0, p - 1))}
              disabled={currentPageIndex === 0}
              className="btn-s py-2 px-3 text-xs disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            
            {/* Page dots */}
            <div className="flex items-center gap-1.5 px-2">
              {SAMPLE_PAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPageIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPageIndex === i ? 'w-6 bg-primary' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPageIndex((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPageIndex === totalPages - 1}
              className="btn-s py-2 px-3 text-xs disabled:opacity-40 disabled:pointer-events-none"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onGoToContact();
              }}
              className="btn-p py-2 px-4 text-xs font-bold"
            >
              Order Copies or Request Free Guide
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
