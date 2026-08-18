import React from 'react';
import { Sparkles, Shield, Heart, BookOpen, Star, Smile } from 'lucide-react';

export default function MarqueeRibbon() {
  const items = [
    { text: "WRITTEN BY JODI MOSCATO", icon: Sparkles, color: "text-amber-300" },
    { text: "MALEX KNOWS MEDIA", icon: BookOpen, color: "text-sky-200" },
    { text: "DIGITAL CITIZENSHIP FOR KIDS", icon: Shield, color: "text-emerald-300" },
    { text: "EMPOWERING CLASSROOMS & HOMES", icon: Heart, color: "text-pink-300" },
    { text: "SMART HABITS & ONLINE SAFETY", icon: Star, color: "text-yellow-300" },
    { text: "AGES 6 TO 12", icon: Smile, color: "text-purple-200" },
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 bg-gradient-to-r from-primary via-accent to-coral text-white shadow-md select-none transform -rotate-1 my-8">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none" />
      
      {/* Infinite Scrolling Track */}
      <div className="flex w-max animate-marquee whitespace-nowrap items-center">
        {[...items, ...items, ...items, ...items].map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={idx} className="flex items-center gap-4 mx-6 text-sm sm:text-base font-extrabold tracking-wider font-fun uppercase">
              <span className="text-white drop-shadow-sm">{item.text}</span>
              <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color} fill-current`} />
              <span className="text-white/40 text-xs">★</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
