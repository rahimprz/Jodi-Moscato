import React from 'react';
import { 
  Sparkles, 
  Award, 
  BookOpen, 
  Heart, 
  GraduationCap, 
  Compass, 
  CheckCircle2, 
  Mail, 
  Calendar, 
  MessageSquare,
  Star
} from 'lucide-react';
import { DEFAULT_BOOK_INFO } from '../data/defaultData';

export default function AboutAuthorPage({ setCurrentPage }) {
  const milestones = [
    {
      year: "Educator Journey",
      title: "Classroom Passion & Youth Advocacy",
      desc: "For over 15 years, Jodi worked directly with elementary students, observing firsthand the shift from traditional playgrounds to digital ecosystems."
    },
    {
      year: "The Spark",
      title: "Recognizing the Digital Literacy Gap",
      desc: "Noticing that kids had access to smartphones without age-appropriate guidance on cyber safety and emotional resilience, Jodi began developing child-centered frameworks."
    },
    {
      year: "Book Release",
      title: "Publishing 'Malex Knows Media'",
      desc: "Creating Malex the digital guide to transform complex topics like privacy, passwords, and screen time balance into empowering superhero adventures."
    },
    {
      year: "Today",
      title: "Classroom Visits & Speaking Tours",
      desc: "Collaborating with elementary schools, public libraries, and parenting networks nationwide to build safe digital communities."
    }
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 overflow-hidden">
      
      {/* =========================================================================
          HERO & BIOGRAPHY
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
          <button onClick={() => setCurrentPage('home')} className="hover:text-primary">Home</button>
          <span>/</span>
          <span className="text-primary">About The Author</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Author Portrait Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px]">
              
              {/* Vibrant Blobs */}
              <div className="absolute -top-8 -left-8 w-60 h-60 rounded-full bg-secondary/30 blur-2xl -z-10" />
              <div className="absolute -bottom-8 -right-8 w-60 h-60 rounded-full bg-primary/25 blur-2xl -z-10" />

              {/* Photo Frame */}
              <div className="rounded-3xl overflow-hidden shadow-2xl ring-8 ring-white/90 bg-white aspect-[4/5] group">
                <img
                  src={DEFAULT_BOOK_INFO.authorImage}
                  alt="Jodi Moscato"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Quote Floating Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-gradient-to-br from-purple-600 to-accent text-white rounded-3xl p-6 shadow-xl max-w-[260px] border-2 border-white transform rotate-2">
                <p className="text-xs sm:text-sm font-serif italic font-bold leading-relaxed">
                  "You are never too young or old, to learn and grow."
                </p>
                <div className="text-[11px] font-sans font-bold mt-2 text-purple-200 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                  <span>Jodi Moscato</span>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-gray-900 font-fun font-bold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-secondary fill-secondary" />
                <span>Author & Educator</span>
              </div>

            </div>
          </div>

          {/* Biography Text */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs font-fun uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Meet the Author</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black text-gray-900 leading-tight">
              Empowering the Next Generation of <span className="text-primary">Digital Citizens</span>
            </h1>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Jodi Moscato is an accomplished educator, author, and children's digital literacy advocate. Her mission is simple yet vital: to replace tech anxiety with positive habits, curiosity, and confidence for young readers exploring today's connected world.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Having spent years observing children’s enthusiasm for technology alongside the real-world worries of parents and teachers, Jodi crafted <em>Malex Knows Media</em> to bridge the gap. Rather than imposing restrictive fear, her writing provides children with clear mental models, practical password superpowers, and empathy rules for everyday life on screens.
            </p>

            {/* Core Values / Focus Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-primary flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-gray-900 text-sm">Empathy & Kindness</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Focusing on compassionate online chatting and standing up against cyberbullying.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-accent flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-gray-900 text-sm">Child-Centered Language</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Translating cybersecurity into fun, relatable superhero concepts.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setCurrentPage('contacts')}
                className="btn-p text-sm py-3 px-6 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                Book Jodi for a School Visit
              </button>
              <button
                onClick={() => setCurrentPage('about-book')}
                className="btn-s text-sm py-3 px-6 text-accent"
              >
                <BookOpen className="w-4 h-4" />
                Explore Her Book
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          JOURNEY & MILESTONES
         ========================================================================= */}
      <section className="py-16 bg-gradient-to-b from-white via-indigo-50/40 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-3">
              Jodi's Mission & <span className="text-primary">Journey</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              From classroom teacher to published author and national speaker on children's digital wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-fun font-bold text-primary px-3 py-1 rounded-full bg-sky-50 border border-sky-100 inline-block mb-3">
                    {m.year}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">
                    {m.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          CLASSROOM VISITS & SPEAKING CARD
         ========================================================================= */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-coral rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-lg">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full font-fun">
              Speaking & School Visits
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Bring Jodi to Your School or Library!
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Jodi conducts interactive readings, hands-on password games, and Q&A sessions both in-person and virtually across the country.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('contacts')}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-gray-50 text-gray-950 font-bold text-sm shadow-md transition whitespace-nowrap flex items-center gap-2 hover:scale-105"
          >
            <Mail className="w-4 h-4 text-coral" />
            <span>Inquire About Author Visits</span>
          </button>

        </div>
      </section>

    </div>
  );
}
