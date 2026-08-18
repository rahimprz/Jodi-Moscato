import React, { useState, useEffect } from 'react';
import { Cloud, Sparkles, Sun, Compass, Star, Radio } from 'lucide-react';

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0); // 0 or 1

  // 2 Scenic cartoon backgrounds
  const scenes = [
    {
      id: 1,
      title: "Digital Sky & Wonder Clouds",
      bgGradient: "from-sky-100/70 via-indigo-50/50 to-amber-50/40",
      themeColor: "#22B8F0",
      cloudsColor: "rgba(255,255,255,0.85)",
      elements: [
        { type: "cloud", x: "8%", y: "15%", size: "w-28 sm:w-44", delay: "0s" },
        { type: "cloud", x: "78%", y: "22%", size: "w-32 sm:w-52", delay: "2s" },
        { type: "cloud", x: "45%", y: "75%", size: "w-24 sm:w-36", delay: "1s" },
        { type: "star", x: "18%", y: "45%", color: "text-amber-400", size: "text-2xl" },
        { type: "star", x: "88%", y: "55%", color: "text-coral", size: "text-xl" },
        { type: "balloon", x: "82%", y: "12%", color: "text-purple-400" },
      ]
    },
    {
      id: 2,
      title: "Sunlit Tech Meadow & Wonder Hills",
      bgGradient: "from-amber-100/60 via-rose-50/40 to-teal-50/50",
      themeColor: "#FFC933",
      cloudsColor: "rgba(255,255,255,0.75)",
      elements: [
        { type: "sun", x: "85%", y: "10%", size: "text-5xl text-amber-400" },
        { type: "cloud", x: "12%", y: "18%", size: "w-36 sm:w-48", delay: "1.5s" },
        { type: "cloud", x: "65%", y: "60%", size: "w-28 sm:w-40", delay: "3s" },
        { type: "star", x: "25%", y: "65%", color: "text-emerald-400", size: "text-2xl" },
        { type: "star", x: "70%", y: "30%", color: "text-indigo-400", size: "text-xl" },
        { type: "kite", x: "15%", y: "35%", color: "text-coral" }
      ]
    }
  ];

  // Auto-advance scenes every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = scenes[activeSlide];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 transition-all duration-1000 ease-in-out">
      
      {/* Background Scenic Gradients with Cross-Fade */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${scenes[0].bgGradient} transition-opacity duration-1000 ${
          activeSlide === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-b ${scenes[1].bgGradient} transition-opacity duration-1000 ${
          activeSlide === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Animated Cartoon Background Objects */}
      <div className="absolute inset-0">
        
        {/* Soft Cartoon Hills Silhouette at Bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-32 sm:h-48 text-white/50"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,160 C320,240 420,80 720,160 C1020,240 1200,100 1440,180 L1440,240 L0,240 Z" />
        </svg>

        {/* Soft Secondary Hills */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-24 sm:h-36 text-white/80"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,100 C240,180 500,40 800,120 C1100,200 1320,60 1440,110 L1440,200 L0,200 Z" />
        </svg>

        {/* Floating Clouds Layer 1 */}
        <div
          className="absolute top-12 left-6 sm:left-16 text-white/70 animate-float"
          style={{ animationDuration: '7s' }}
        >
          <Cloud className="w-24 sm:w-36 h-auto drop-shadow-sm fill-white/80" />
        </div>

        {/* Floating Clouds Layer 2 */}
        <div
          className="absolute top-28 right-8 sm:right-24 text-white/60 animate-float"
          style={{ animationDuration: '9s', animationDelay: '2s' }}
        >
          <Cloud className="w-32 sm:w-48 h-auto drop-shadow-sm fill-white/75" />
        </div>

        {/* Floating Clouds Layer 3 */}
        <div
          className="absolute top-1/2 left-4 sm:left-20 text-white/50 animate-float"
          style={{ animationDuration: '8s', animationDelay: '1s' }}
        >
          <Cloud className="w-20 sm:w-28 h-auto drop-shadow-sm fill-white/60" />
        </div>

        {/* Sun / Sparkle Icon */}
        <div className="absolute top-14 right-1/4 animate-spin-slow opacity-80" style={{ animationDuration: '30s' }}>
          <Sparkles className="w-10 sm:w-14 h-10 sm:h-14 text-yellow-300 fill-yellow-200" />
        </div>

        {/* Playful Dotted Rainbow Flight Line */}
        <svg
          className="absolute top-1/4 left-1/3 w-64 h-32 opacity-30"
          viewBox="0 0 200 100"
          fill="none"
          stroke="#22B8F0"
          strokeWidth="2"
          strokeDasharray="4 6"
        >
          <path d="M10,80 Q100,0 190,70" />
        </svg>

      </div>

      {/* Auto-Slide Indicator Pill (1/2) in Bottom-Right Corner */}
      <div className="absolute bottom-4 right-6 pointer-events-auto z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200/60 shadow-sm text-xs font-semibold text-gray-700">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Scene:</span>
        <button
          onClick={() => setActiveSlide(0)}
          className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
            activeSlide === 0
              ? 'bg-primary text-white shadow-sm scale-110'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          title="Scene 1: Digital Sky"
        >
          1
        </button>
        <button
          onClick={() => setActiveSlide(1)}
          className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
            activeSlide === 1
              ? 'bg-amber-400 text-white shadow-sm scale-110'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          title="Scene 2: Wonder Meadow"
        >
          2
        </button>
      </div>

    </div>
  );
}
