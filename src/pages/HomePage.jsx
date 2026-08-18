import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Laptop, 
  Users, 
  BookOpen, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  HelpCircle, 
  Plus, 
  Minus, 
  ChevronRight,
  Heart,
  Award
} from 'lucide-react';
import DualBookShowcase from '../components/DualBookShowcase';
import HeroSlider from '../components/HeroSlider';
import MarqueeRibbon from '../components/MarqueeRibbon';
import { DEFAULT_BOOK_INFO, CHAPTERS, TESTIMONIALS, FAQS } from '../data/defaultData';
import { getBlogs, addSubscriber } from '../data/store';

export default function HomePage({ setCurrentPage, onOpenLookInside }) {
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [homeNewsletterEmail, setHomeNewsletterEmail] = useState('');
  const [homeNewsletterSent, setHomeNewsletterSent] = useState(false);

  const blogs = getBlogs().slice(0, 3);

  const features = [
    {
      icon: ShieldCheck,
      title: "Digital Safety First",
      desc: "Teaches smart password superhero skills, private data protection, and spotting scams in fun language.",
      bg: "bg-sky-50",
      border: "border-sky-100",
      accent: "text-primary",
      badge: "Safety Skills"
    },
    {
      icon: Laptop,
      title: "Screen Time Balance",
      desc: "Empowers kids with practical habits for balancing video games, devices, and real-world outdoor play.",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      accent: "text-emerald-500",
      badge: "Healthy Habits"
    },
    {
      icon: Users,
      title: "For Parents & Teachers",
      desc: "Includes thought-provoking discussion prompts and classroom activities that bridge home and school.",
      bg: "bg-purple-50",
      border: "border-purple-100",
      accent: "text-accent",
      badge: "Educator Ready"
    },
    {
      icon: Heart,
      title: "Kindness & Empathy",
      desc: "Fosters digital citizenship by teaching children the golden rule of chatting and stopping cyberbullying.",
      bg: "bg-amber-50",
      border: "border-amber-100",
      accent: "text-amber-500",
      badge: "Positive Culture"
    }
  ];

  const handleHomeNewsletter = (e) => {
    e.preventDefault();
    if (!homeNewsletterEmail) return;
    addSubscriber(homeNewsletterEmail);
    setHomeNewsletterSent(true);
    setHomeNewsletterEmail('');
    setTimeout(() => setHomeNewsletterSent(false), 5000);
  };

  const filteredFaqs = selectedFaqCategory === 'All'
    ? FAQS
    : FAQS.filter(f => f.category === selectedFaqCategory);

  return (
    <div className="overflow-hidden">
      
      {/* =========================================================================
          HERO SECTION
         ========================================================================= */}
      <section className="relative pt-24 sm:pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden min-h-[85vh] flex items-center">
        {/* Animated Cartoon Scenery Background */}
        <HeroSlider />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Pitch & CTAs */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-6">
              
              {/* Sparkle Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-primary/25 shadow-sm text-xs sm:text-sm font-bold text-accent">
                <Sparkles className="w-4 h-4 text-secondary fill-secondary" />
                <span>Malex Knows Media • By Jodi Moscato</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-gray-900 leading-[1.12]">
                Helping Kids Explore the <span className="text-coral">Digital</span> World <span className="text-primary">Safely</span>
              </h1>

              {/* Subtitle description */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                A colorful, fun, and empowering children's book on technology, online safety, and smart digital habits—crafted with love for kids, parents, and elementary classrooms.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentPage('about-book')}
                  className="btn-p text-sm sm:text-base py-3 px-7 shadow-lg w-full sm:w-auto"
                >
                  <BookOpen className="w-4 h-4" />
                  Explore The Book
                </button>

                <button
                  onClick={onOpenLookInside}
                  className="btn-s text-sm sm:text-base py-3 px-6 text-accent w-full sm:w-auto"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Look Inside Sample
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-semibold text-gray-500 border-t border-gray-200/50">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Loved by Teachers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Ages 6 to 12</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>100% Kid-Safe Guidance</span>
                </div>
              </div>

            </div>

            {/* Right Column: Creative 3D Dual-Book Showcase */}
            <div className="lg:col-span-6 flex justify-center">
              <DualBookShowcase onOpenLookInside={onOpenLookInside} />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          MOVING MARQUEE RIBBON
         ========================================================================= */}
      <MarqueeRibbon />

      {/* =========================================================================
          4 CORE PILLARS / FEATURES
         ========================================================================= */}
      <section className="py-14 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-3">
              Why Kids & Educators <span className="text-primary">Love This Book</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Built on positive encouragement rather than fear, Malex turns digital safety into exciting everyday superpowers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className={`p-6 rounded-3xl ${f.bg} border ${f.border} shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center ${f.accent}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold font-fun px-2.5 py-1 rounded-full bg-white/80 text-gray-600 shadow-xs">
                        {f.badge}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">
                      {f.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200/40">
                    <button
                      onClick={() => setCurrentPage('about-book')}
                      className={`text-xs font-bold ${f.accent} hover:underline flex items-center gap-1`}
                    >
                      <span>Read chapter breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          WHAT'S INSIDE: 5 CHAPTERS JOURNEY
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-indigo-50/50 via-white to-amber-50/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs font-fun uppercase tracking-wider">
                Inside the Pages
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
                What's Inside <span className="text-primary">The Book</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Five short, lively chapters guide young readers through the digital universe step by step—easy enough for a 6-year-old to enjoy alone, yet rich enough to inspire classroom discussions.
              </p>

              <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-md space-y-3">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-amber-500" />
                  <span className="font-serif font-bold text-gray-900">Includes Companion Activities</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Every chapter concludes with interactive puzzles, password games, and reflection questions for family dinners.
                </p>
                <button
                  onClick={() => setCurrentPage('about-book')}
                  className="btn-p text-xs py-2 px-4"
                >
                  View All Chapter Details
                </button>
              </div>
            </div>

            {/* Chapters List */}
            <div className="lg:col-span-7 space-y-3">
              {CHAPTERS.map((ch) => (
                <div
                  key={ch.number}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-100/90 shadow-sm hover:shadow-md transition-all flex items-start gap-4 group"
                >
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-serif font-black text-lg shrink-0 shadow-sm"
                    style={{ backgroundColor: ch.color }}
                  >
                    {ch.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 group-hover:text-primary transition">
                        {ch.title}
                      </h3>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 hidden sm:inline">
                        {ch.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                      {ch.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          ABOUT THE AUTHOR SPOTLIGHT
         ========================================================================= */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Author Photo Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px]">
                
                {/* Glow Blobs */}
                <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full bg-secondary/30 blur-2xl -z-10" />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-primary/25 blur-2xl -z-10" />

                {/* Jodi's Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white bg-white aspect-[4/5] group">
                  <img
                    src={DEFAULT_BOOK_INFO.authorImage}
                    alt="Jodi Moscato, Author of Malex Knows Media"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Quote Badge Overlaid */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-gradient-to-br from-amber-400 to-orange-400 text-white rounded-3xl p-5 shadow-xl max-w-[240px] border-2 border-white transform -rotate-2">
                  <p className="text-xs sm:text-sm font-serif italic font-bold leading-snug">
                    "You are never too young or old, to learn and grow."
                  </p>
                  <p className="text-[11px] font-sans font-bold mt-2 text-amber-950">
                    — Jodi Moscato
                  </p>
                </div>

              </div>
            </div>

            {/* Author Story Preview */}
            <div className="lg:col-span-7 space-y-6 lg:pl-6 mt-6 lg:mt-0">
              <span className="px-3.5 py-1.5 rounded-full bg-purple-100 text-accent font-bold text-xs font-fun uppercase tracking-wider">
                Meet the Author
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
                About <span className="text-primary">Jodi Moscato</span>
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Jodi Moscato is an educator, author, and passionate advocate for youth digital literacy. With years of experience working closely with children and school communities, she created <em>Malex Knows Media</em> to turn tech anxiety into positive digital empowerment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
                  <div className="font-serif font-bold text-primary text-xl">15+ Years</div>
                  <div className="text-xs text-gray-500 mt-0.5">Educator & Youth Advocacy</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
                  <div className="font-serif font-bold text-accent text-xl">Elementary Focus</div>
                  <div className="text-xs text-gray-500 mt-0.5">Classroom & Family Ready</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentPage('about-author')}
                  className="btn-p text-sm py-3 px-6"
                >
                  Read Jodi's Full Story
                </button>
                <button
                  onClick={() => setCurrentPage('contacts')}
                  className="btn-s text-sm py-3 px-6"
                >
                  Book School Reading
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          TESTIMONIALS
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-amber-100/70 via-rose-50/50 to-violet-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-2">
              What People Are <span className="text-primary">Saying</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Loved by teachers, recommended by parents, and enjoyed by kids across classrooms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl text-primary font-serif font-bold block mb-2 leading-none">“</span>
                  <p className="text-gray-700 text-base italic leading-relaxed font-serif">
                    {t.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                  <div className={`w-10 h-10 rounded-full ${t.color} text-white font-bold text-sm flex items-center justify-center shadow`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.author}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          LATEST BLOGS PREVIEW
         ========================================================================= */}
      <section className="py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold font-fun text-primary uppercase tracking-wider">
                From the Blog
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-1">
                Latest <span className="text-primary">Articles & Tips</span>
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('blogs')}
              className="btn-s text-xs sm:text-sm py-2 px-5 text-primary border-primary/30"
            >
              <span>View All Articles</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <article
                key={b.id}
                onClick={() => setCurrentPage('blogs')}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col group"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute top-3 left-3 text-white font-fun font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow"
                    style={{ backgroundColor: b.accent || '#22B8F0' }}
                  >
                    {b.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-2">{b.date} • {b.readTime}</div>
                    <h3 className="font-serif font-bold text-lg text-gray-900 group-hover:text-primary transition line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {b.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-purple-50/40 via-white to-sky-50/40 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-2">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-gray-600 text-sm">
              Answers for curious parents, educators, and librarians.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {['All', 'General', 'Parents', 'Educators'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedFaqCategory(cat);
                  setOpenFaqIndex(0);
                }}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedFaqCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordions */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'bg-white border-primary/25 shadow-md'
                      : 'bg-white/70 border-gray-200/70 hover:bg-white'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-serif font-bold text-gray-900 text-base">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100/80 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          NEWSLETTER BANNER
         ========================================================================= */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-400 via-primary to-accent rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-2 max-w-lg text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Stay Connected with Jodi's Tips!
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Get monthly digital literacy printables, classroom book club discussion starters, and event invitations.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[300px]">
            {homeNewsletterSent ? (
              <div className="p-4 rounded-2xl bg-white text-emerald-800 text-sm font-bold flex items-center gap-2 shadow-lg animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Thank you! You're on the list.</span>
              </div>
            ) : (
              <form onSubmit={handleHomeNewsletter} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={homeNewsletterEmail}
                  onChange={(e) => setHomeNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-4 py-3 rounded-2xl bg-white text-gray-900 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary w-full"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-secondary hover:bg-amber-400 text-gray-950 font-bold text-sm shadow-md transition whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
