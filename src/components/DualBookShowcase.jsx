import React, { useState } from 'react';
import { Sparkles, ArrowLeftRight, Eye, CheckCircle2, Star } from 'lucide-react';
import { DEFAULT_BOOK_INFO } from '../data/defaultData';

export default function DualBookShowcase({ onOpenLookInside }) {
  // activeCover: 'front' (WhatsApp Image is front) or 'alt' (Illustrations Cover is front)
  const [activeCover, setActiveCover] = useState('front');
  const [isHovered, setIsHovered] = useState(false);

  const toggleCover = () => {
    setActiveCover(prev => (prev === 'front' ? 'alt' : 'front'));
  };

  return (
    <div className="relative w-full max-w-[540px] mx-auto py-6 sm:py-8 px-4 flex flex-col items-center select-none">
      
      {/* Playful Glowing Aura & Blobs Behind Books */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full bg-gradient-to-tr from-primary/30 via-grape/25 to-secondary/30 blur-3xl -z-10 pointer-events-none animate-pulse-slow" />
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-coral/20 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-mint/25 rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* Floating Sparkles & Badges */}
      <div className="absolute -top-3 left-4 text-secondary text-2xl animate-bounce pointer-events-none">
        ✦
      </div>
      <div className="absolute top-1/3 -right-2 text-coral text-xl animate-pulse pointer-events-none">
        ★
      </div>
      <div className="absolute -bottom-2 right-12 text-primary text-xl animate-bounce pointer-events-none" style={{ animationDelay: '1s' }}>
        ✦
      </div>

      {/* Interactive Top Floating Badge */}
      <div className="absolute -top-2 z-30 flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-fun font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white transform -rotate-3 animate-wiggle">
        <Star className="w-3.5 h-3.5 fill-white" />
        Official Release Edition
      </div>

      {/* Dual Book Stage Container (3D perspective layout) */}
      <div 
        className="relative w-full h-[360px] sm:h-[430px] flex items-center justify-center perspective-1000 mt-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* ================================================================
            BOOK COVER A: Malex Illustrations Cover (Alternate / Inside)
           ================================================================ */}
        <div
          onClick={() => setActiveCover('alt')}
          className={`absolute cursor-pointer transition-all duration-700 ease-out preserve-3d ${
            activeCover === 'alt'
              ? 'z-20 scale-105 sm:scale-110 translate-x-2 sm:translate-x-4 translate-y-0 rotate-[-2deg] shadow-[0_30px_60px_rgba(34,184,240,0.35)]'
              : 'z-10 scale-90 sm:scale-95 -translate-x-20 sm:-translate-x-28 translate-y-4 rotate-[-14deg] opacity-95 hover:opacity-100 hover:scale-100 hover:-translate-x-24 shadow-[0_20px_45px_rgba(0,0,0,0.22)]'
          }`}
          style={{ width: '220px', maxWidth: '46%' }}
        >
          <div className="relative group rounded-xl overflow-hidden bg-white p-1 ring-4 ring-white/90">
            {/* Book Spine 3D Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-purple-900/40 via-transparent to-transparent z-10 pointer-events-none" />
            
            <img
              src={DEFAULT_BOOK_INFO.coverImageAlternate}
              alt="Malex Knows Media — Illustrated Edition Cover"
              className="w-full h-auto rounded-lg object-cover shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
              loading="eager"
            />
            
            {/* Corner Badge on Book */}
            <div className="absolute top-2 left-2 bg-accent/90 text-white font-fun text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shadow">
              Illustrated Guide
            </div>

            {/* Click Indicator if not active */}
            {activeCover !== 'alt' && (
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <span className="bg-white text-gray-900 font-bold text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <ArrowLeftRight className="w-3 h-3 text-primary" /> View Front
                </span>
              </div>
            )}
          </div>
          
          {/* Label under Book A */}
          <div className="text-center mt-2 font-fun font-bold text-[11px] sm:text-xs text-accent bg-white/90 backdrop-blur-sm py-1 px-2.5 rounded-full border border-purple-200 shadow-sm mx-auto w-fit">
            Inside & Chapter Visuals
          </div>
        </div>


        {/* ================================================================
            BOOK COVER B: WhatsApp Front Book Cover (Official)
           ================================================================ */}
        <div
          onClick={() => setActiveCover('front')}
          className={`absolute cursor-pointer transition-all duration-700 ease-out preserve-3d ${
            activeCover === 'front'
              ? 'z-20 scale-105 sm:scale-110 translate-x-2 sm:translate-x-6 translate-y-0 rotate-[4deg] shadow-[0_35px_70px_rgba(34,184,240,0.38)]'
              : 'z-10 scale-90 sm:scale-95 translate-x-20 sm:translate-x-28 translate-y-4 rotate-[14deg] opacity-95 hover:opacity-100 hover:scale-100 hover:translate-x-24 shadow-[0_20px_45px_rgba(0,0,0,0.22)]'
          }`}
          style={{ width: '220px', maxWidth: '46%' }}
        >
          <div className="relative group rounded-xl overflow-hidden bg-white p-1 ring-4 ring-white/90">
            {/* Book Spine 3D Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-blue-950/40 via-transparent to-transparent z-10 pointer-events-none" />

            <img
              src={DEFAULT_BOOK_INFO.coverImageFront}
              alt="Malex Knows Media — Official Hardcover Edition"
              className="w-full h-auto rounded-lg object-cover shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
              loading="eager"
            />

            {/* Corner Badge on Book */}
            <div className="absolute top-2 right-2 bg-coral text-white font-fun text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shadow">
              Official Edition
            </div>

            {/* Click Indicator if not active */}
            {activeCover !== 'front' && (
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <span className="bg-white text-gray-900 font-bold text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <ArrowLeftRight className="w-3 h-3 text-primary" /> View Front
                </span>
              </div>
            )}
          </div>

          {/* Label under Book B */}
          <div className="text-center mt-2 font-fun font-bold text-[11px] sm:text-xs text-primary bg-white/90 backdrop-blur-sm py-1 px-2.5 rounded-full border border-sky-200 shadow-sm mx-auto w-fit">
            Official Book Cover
          </div>
        </div>

      </div>

      {/* Interactive Controls & Badges Underneath */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4 z-30">
        
        {/* Swap / Flip Button */}
        <button
          onClick={toggleCover}
          className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-gray-800 font-semibold text-xs border border-primary/30 shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 hover:text-primary active:scale-95"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '6s' }} />
          <span>Swap Front / Back Cover</span>
        </button>

        {/* Look Inside Trigger */}
        <button
          onClick={onOpenLookInside}
          className="px-4 py-1.5 rounded-full bg-gradient-to-r from-accent to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Eye className="w-3.5 h-3.5 text-yellow-300" />
          <span>Peek Inside Book</span>
        </button>
      </div>

      {/* Key Highlights Pill Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-gray-600 font-medium">
        <span className="bg-white/80 border border-gray-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Ages 6–12
        </span>
        <span className="bg-white/80 border border-gray-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> 5 Kid-Friendly Chapters
        </span>
        <span className="bg-white/80 border border-gray-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Classroom Approved
        </span>
      </div>

    </div>
  );
}
