import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  Sparkles, 
  X, 
  Share2, 
  Bookmark, 
  Heart,
  MessageCircle,
  Tag
} from 'lucide-react';
import { getBlogs, subscribeStore } from '../data/store';

export default function BlogsPage({ setCurrentPage }) {
  const [blogs, setBlogs] = useState(getBlogs());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReadingPost, setActiveReadingPost] = useState(null);
  const [likeCount, setLikeCount] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // Subscribe to store updates so any blog added in the admin panel updates here immediately
    const unsubscribe = subscribeStore((key, value) => {
      if (key === 'jodi_cms_blogs_v1') {
        setBlogs(value);
      }
    });
    return unsubscribe;
  }, []);

  const categories = ['All', 'Digital Safety', 'Parenting Tips', 'Classroom Tech', 'Literacy'];

  const filteredBlogs = blogs.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleLike = () => {
    if (!hasLiked) {
      setLikeCount(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikeCount(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-20 overflow-hidden">
      
      {/* =========================================================================
          HERO HEADER & SEARCH
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
          <button onClick={() => setCurrentPage('home')} className="hover:text-primary">Home</button>
          <span>/</span>
          <span className="text-primary">Blogs & Resources</span>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-sky-100 text-primary font-bold text-xs font-fun uppercase tracking-wider">
            Articles, Guides & Insights
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-gray-900 leading-tight">
            Digital Safety & Media Literacy <span className="text-primary">Blog</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Helpful tips, classroom ideas, and family conversations from author Jodi Moscato to help kids thrive in a digital world.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

      </section>

      {/* =========================================================================
          BLOGS GRID
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-gray-800">No blog posts found</h3>
            <p className="text-xs text-gray-500 mt-1">Try searching for a different term or resetting the category filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 btn-s text-xs py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
              <article
                key={post.id}
                onClick={() => setActiveReadingPost(post)}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Post Image Banner */}
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                    <img
                      src={post.image || "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute top-3 left-3 text-white font-fun font-bold text-xs px-3 py-1 rounded-full shadow-md"
                      style={{ backgroundColor: post.accent || '#22B8F0' }}
                    >
                      {post.category}
                    </div>
                  </div>

                  {/* Post Details */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime || '4 min read'}
                      </span>
                    </div>

                    <h2 className="font-serif font-bold text-lg sm:text-xl text-gray-900 group-hover:text-primary transition line-clamp-2 mb-2">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-100 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center gap-2 text-gray-500 font-medium text-[11px]">
                    <User className="w-3 h-3 text-primary" />
                    <span>{post.author || "Jodi Moscato"}</span>
                  </div>
                  <span className="flex items-center gap-1">
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

      </section>

      {/* =========================================================================
          FULL ARTICLE READING MODAL
         ========================================================================= */}
      {activeReadingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-950/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-primary/20 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-white font-fun font-bold text-xs"
                  style={{ backgroundColor: activeReadingPost.accent || '#22B8F0' }}
                >
                  {activeReadingPost.category}
                </span>
                <span className="text-xs text-gray-400 font-medium">{activeReadingPost.date}</span>
              </div>

              <button
                onClick={() => setActiveReadingPost(null)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-6">
              
              {/* Cover Banner */}
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md bg-gray-100">
                <img
                  src={activeReadingPost.image || "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop"}
                  alt={activeReadingPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
                {activeReadingPost.title}
              </h1>

              {/* Author byline */}
              <div className="flex items-center justify-between border-y border-gray-100 py-3 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">
                    JM
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">{activeReadingPost.author || "Jodi Moscato"}</span>
                    <span className="text-gray-400 text-xs block">Author of Malex Knows Media</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition ${
                      hasLiked ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-600' : ''}`} />
                    <span>{likeCount}</span>
                  </button>
                </div>
              </div>

              {/* Body Text */}
              <div className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed space-y-4 whitespace-pre-line font-sans">
                {activeReadingPost.content || activeReadingPost.excerpt}
              </div>

              {/* Bottom Author Card */}
              <div className="mt-8 p-6 rounded-2xl bg-sky-50/50 border border-sky-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white font-bold flex items-center justify-center shrink-0">
                  JM
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-gray-900">About the Author</h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Jodi Moscato is an author and educator dedicated to helping families build healthy tech habits. Explore her book <em>Malex Knows Media</em> for elementary readers.
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
              <span className="text-xs text-gray-500">Enjoyed this guide? Share with parents & teachers!</span>
              <button
                onClick={() => {
                  setActiveReadingPost(null);
                  setCurrentPage('contacts');
                }}
                className="btn-p text-xs py-2 px-4"
              >
                Ask Jodi a Question
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
