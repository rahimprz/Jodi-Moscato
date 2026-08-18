import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Phone, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Users,
  ExternalLink
} from 'lucide-react';
import { addMessage } from '../data/store';
import confetti from 'canvas-confetti';

export default function ContactsPage({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Parent',
    subject: '',
    message: '',
    agreeTerms: true
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);

    setTimeout(() => {
      // Save directly to Jodi's Admin CMS Store
      addMessage({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        subject: formData.subject || `Inquiry from ${formData.name} (${formData.role})`,
        message: formData.message
      });

      setSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti for positive user experience
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // confetti fallback
      }

      setFormData({
        name: '',
        email: '',
        role: 'Parent',
        subject: '',
        message: '',
        agreeTerms: true
      });
    }, 400);
  };

  const mapEmbedUrl = "https://maps.google.com/maps?cid=2034423694542944066&output=embed&hl=en-US";
  const mapDirectUrl = "https://maps.google.com/?cid=2034423694542944066&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en-US&source=embed";

  return (
    <div className="pt-28 sm:pt-32 pb-20 overflow-hidden">
      
      {/* =========================================================================
          HERO HEADER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
          <button onClick={() => setCurrentPage('home')} className="hover:text-primary">Home</button>
          <span>/</span>
          <span className="text-primary">Contacts</span>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-sky-100 text-primary font-bold text-xs font-fun uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-gray-900 leading-tight">
            Contact & School <span className="text-primary">Inquiries</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Have a question about <em>Malex Knows Media</em>, interested in an elementary school reading, or want to say hello? Send Jodi a direct message below.
          </p>
        </div>

      </section>

      {/* =========================================================================
          CONTACT FORM & DETAILS GRID
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info & Perks */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-gradient-to-br from-primary via-accent to-purple-800 text-white rounded-3xl p-8 shadow-xl space-y-6">
              <h3 className="font-serif font-bold text-2xl">
                Say Hello to Jodi
              </h3>
              <p className="text-white/85 text-sm leading-relaxed">
                Whether you are a teacher planning Digital Citizenship Week, a parent seeking media advice, or a librarian ordering copies, we are excited to connect with you.
              </p>

              <div className="space-y-4 pt-2 border-t border-white/20 text-sm">
                
                {/* Official Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 text-yellow-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/70 font-semibold uppercase">Official Email</div>
                    <a
                      href="mailto:MalexKnowsMedia@gmail.com"
                      className="font-bold text-white hover:text-yellow-300 transition text-sm sm:text-base break-all"
                    >
                      MalexKnowsMedia@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 text-yellow-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/70 font-semibold uppercase">Location</div>
                    <span className="font-bold text-white text-sm sm:text-base">
                      United States
                    </span>
                  </div>
                </div>

              </div>

              {/* Quick Inquiry Cards */}
              <div className="pt-4 border-t border-white/20 space-y-2">
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Virtual & In-Person Elementary School Visits</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Bulk Classroom & Library Orders</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Free Companion Discussion Guide Requests</span>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100 shadow-sm flex items-center gap-4">
              <div className="text-3xl font-serif text-amber-500 font-bold">“</div>
              <p className="text-xs sm:text-sm text-gray-700 font-serif italic">
                "Digital literacy starts with honest conversations between children and the trusted adults who love them."
                <span className="block font-sans font-bold text-gray-900 not-italic text-xs mt-1">— Jodi Moscato</span>
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl">
            
            <div className="mb-6">
              <h3 className="font-serif font-bold text-2xl text-gray-900 mb-1">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Your message is sent directly to Jodi's inbox portal.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-xl text-emerald-900">
                  Thank You! Message Received.
                </h4>
                <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Jodi has received your note in her panel and will get back to you at <span className="font-semibold">{formData.email || 'your email'}</span> as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-p text-xs py-2.5 px-6"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sjenkins@school.edu"
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Role */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      I Am A:
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition font-medium"
                    >
                      <option value="Parent">Parent / Guardian</option>
                      <option value="Elementary Educator">Elementary Educator / Teacher</option>
                      <option value="Librarian">Librarian / Media Specialist</option>
                      <option value="School Administrator">School Principal / Admin</option>
                      <option value="Media & Press">Media, Podcast or Press</option>
                      <option value="Other">Other Reader</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. School Author Visit / Book Question"
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Message to Jodi *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write your note, questions, or classroom event dates here..."
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-gray-500">
                    I agree that my submitted data is being collected and stored for communication with Jodi.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-p py-3.5 text-base font-bold shadow-lg mt-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending to Jodi...' : 'Send Message'}</span>
                </button>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* =========================================================================
          EMBEDDED GOOGLE MAP SECTION
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <div>
              <span className="text-xs font-bold font-fun text-primary uppercase tracking-wider">
                Location & Service Area
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-gray-900">
                United States Map Location
              </h3>
            </div>

            <a
              href={mapDirectUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-s text-xs py-2 px-4 flex items-center gap-1.5 text-primary border-primary/30"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Responsive Map Iframe */}
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-inner border border-gray-200 relative bg-gray-100">
            <iframe
              title="Jodi Moscato Location Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

        </div>

      </section>

    </div>
  );
}
