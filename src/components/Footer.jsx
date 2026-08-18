import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { DEFAULT_BOOK_INFO } from '../data/defaultData';
import { addSubscriber } from '../data/store';

export default function Footer({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addSubscriber(email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about-author', label: 'About The Author' },
    { id: 'about-book', label: 'About The Book' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'contacts', label: 'Contacts' },
  ];

  const handleLinkClick = (id) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative text-white pt-16 pb-10 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #4C1D95 0%, #22B8F0 45%, #1682B5 100%)',
      }}
    >
      {/* Decorative Blobs */}
      <div className="blob blob-y w-[320px] h-[320px] -bottom-28 -right-16 rotate-[-15deg] opacity-40 pointer-events-none" />
      <div className="blob blob-c w-[200px] h-[200px] top-10 left-[5%] rotate-[25deg] opacity-30 pointer-events-none" />
      
      {/* Background Star sparkle */}
      <div className="absolute top-1/4 right-[8%] text-white/20 text-3xl animate-pulse pointer-events-none">
        ✦
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/20">
          
          {/* Col 1: Logo & Mission */}
          <div className="lg:col-span-1 space-y-4">
            <button
              onClick={() => handleLinkClick('home')}
              className="bg-white/95 backdrop-blur-md p-2.5 rounded-2xl inline-block shadow-md hover:scale-105 transition-transform text-left"
            >
              <img
                src={DEFAULT_BOOK_INFO.logoUrl}
                alt="Jodi Moscato Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </button>

            <p className="text-white/85 text-sm leading-relaxed max-w-sm">
              Empowering children, families, and classrooms to explore devices and the internet with confidence, kindness, and smart safety habits.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-secondary hover:text-gray-900 flex items-center justify-center text-white transition-all shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-secondary hover:text-gray-900 flex items-center justify-center text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-secondary hover:text-gray-900 flex items-center justify-center text-white transition-all shadow-sm"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="mailto:MalexKnowsMedia@gmail.com"
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-secondary hover:text-gray-900 flex items-center justify-center text-white transition-all shadow-sm"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:pl-6">
            <h4 className="font-serif font-bold text-lg text-white mb-4 flex items-center gap-2">
              <span className="text-secondary">✦</span> Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="text-sm text-white/80 hover:text-secondary hover:translate-x-1.5 transition-all text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div>
            <h4 className="font-serif font-bold text-lg text-white mb-4 flex items-center gap-2">
              <span className="text-secondary">✦</span> Contact Details
            </h4>
            <div className="space-y-3.5 text-sm text-white/85">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-white/70 font-semibold uppercase">Official Email:</div>
                  <a
                    href="mailto:MalexKnowsMedia@gmail.com"
                    className="hover:text-secondary font-medium transition break-all"
                  >
                    MalexKnowsMedia@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-white/70 font-semibold uppercase">Location:</div>
                  <span className="font-medium">United States</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleLinkClick('contacts')}
                  className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition flex items-center gap-2"
                >
                  <span>Book Author Visit / Q&A</span>
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-lg text-white mb-2 flex items-center gap-2">
              <span className="text-secondary">✦</span> Newsletter
            </h4>
            <p className="text-xs text-white/80 mb-4 leading-relaxed">
              Get Jodi's monthly digital safety tips and companion activity sheets for kids.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-white text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-lg animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you! You are subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-secondary border-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-secondary hover:bg-amber-400 text-gray-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe to Newsletter
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© 2026 Jodi Moscato. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Use</span>
            <span>•</span>
            <button
              onClick={() => handleLinkClick('contacts')}
              className="hover:text-secondary underline"
            >
              Get in touch
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
