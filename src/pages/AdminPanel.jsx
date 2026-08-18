import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Trash2, 
  Star, 
  Eye, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Search, 
  Send,
  Sparkles,
  KeyRound,
  X,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { 
  getMessages, 
  markMessageRead, 
  toggleMessageStar, 
  deleteMessage,
  getBlogs,
  saveBlog,
  deleteBlog,
  getSubscribers,
  updateAdminPassword,
  verifyAdminLogin,
  checkAdminSession,
  logoutAdmin,
  subscribeStore,
  getSettings,
  updateSettings
} from '../data/store';

export default function AdminPanel({ setCurrentPage }) {
  const [session, setSession] = useState(checkAdminSession());
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox', 'blogs', 'subscribers', 'security', 'settings'

  // Login Form State
  const [loginForm, setLoginForm] = useState({ username: 'jodimoscato', password: 'hello123' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Data States
  const [messages, setMessages] = useState(getMessages());
  const [blogs, setBlogs] = useState(getBlogs());
  const [subscribers, setSubscribers] = useState(getSubscribers());
  const [settings, setSiteSettings] = useState(getSettings());
  
  // Inbox Filters & Active Message
  const [inboxFilter, setInboxFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [inboxSearch, setInboxSearch] = useState('');

  // Blog Editor State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState({
    id: null,
    title: '',
    category: 'Digital Safety',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop',
    accent: '#22B8F0',
    readTime: '4 min read'
  });
  const [blogSuccessMsg, setBlogSuccessMsg] = useState('');
  const [blogSaving, setBlogSaving] = useState(false);

  // Password Change State
  const [pwdForm, setPwdForm] = useState({ currentPwd: '', newPwd: '', confirmPwd: '' });
  const [pwdAlert, setPwdAlert] = useState({ type: '', msg: '' });
  const [pwdUpdating, setPwdUpdating] = useState(false);

  // Subscribe to persistent store updates
  useEffect(() => {
    const unsub = subscribeStore((key, val) => {
      if (key === 'jodi_cms_messages_v1') setMessages(val);
      if (key === 'jodi_cms_blogs_v1') setBlogs(val);
      if (key === 'jodi_cms_subscribers_v1') setSubscribers(val);
      if (key === 'jodi_cms_settings_v1') setSiteSettings(val);
    });
    return unsub;
  }, []);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await verifyAdminLogin(loginForm.username, loginForm.password);
      if (res.success) {
        setSession(checkAdminSession());
        setLoginForm({ username: '', password: '' });
      } else {
        setLoginError(res.message);
      }
    } catch (err) {
      setLoginError(err.message || 'Login failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await logoutAdmin();
    setSession(null);
  };

  // Handle Password Change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdAlert({ type: '', msg: '' });

    if (pwdForm.newPwd !== pwdForm.confirmPwd) {
      setPwdAlert({ type: 'error', msg: 'New password and confirmation do not match.' });
      return;
    }

    setPwdUpdating(true);
    try {
      const res = await updateAdminPassword(pwdForm.currentPwd, pwdForm.newPwd);
      if (res.success) {
        setPwdAlert({ type: 'success', msg: res.message });
        setPwdForm({ currentPwd: '', newPwd: '', confirmPwd: '' });
      } else {
        setPwdAlert({ type: 'error', msg: res.message });
      }
    } catch (err) {
      setPwdAlert({ type: 'error', msg: err.message });
    } finally {
      setPwdUpdating(false);
    }
  };

  // Blog Editor Handlers
  const handleOpenNewBlog = () => {
    setEditingBlog({
      id: null,
      title: '',
      category: 'Digital Safety',
      excerpt: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop',
      accent: '#22B8F0',
      readTime: '4 min read'
    });
    setIsBlogModalOpen(true);
  };

  const handleEditBlog = (post) => {
    setEditingBlog({ ...post });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlogSubmit = async (e) => {
    e.preventDefault();
    if (!editingBlog.title || !editingBlog.excerpt) return;

    setBlogSaving(true);
    try {
      await saveBlog(editingBlog);
      setIsBlogModalOpen(false);
      setBlogSuccessMsg(editingBlog.id ? 'Blog updated in Firebase Realtime DB!' : 'New blog post published to Firebase!');
      setTimeout(() => setBlogSuccessMsg(''), 4000);
    } finally {
      setBlogSaving(false);
    }
  };

  const handleDeleteBlogClick = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteBlog(id);
    }
  };

  // Export Messages to JSON
  const handleExportMessages = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `jodi_inquiries_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered Messages
  const filteredMessages = messages.filter((m) => {
    const matchesFilter =
      inboxFilter === 'all' ? true :
      inboxFilter === 'unread' ? !m.read :
      inboxFilter === 'starred' ? m.starred : true;
    
    const matchesSearch =
      m.name.toLowerCase().includes(inboxSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(inboxSearch.toLowerCase()) ||
      m.subject.toLowerCase().includes(inboxSearch.toLowerCase()) ||
      m.message.toLowerCase().includes(inboxSearch.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  // =========================================================================
  // IF NOT LOGGED IN: SHOW LOGIN SCREEN
  // =========================================================================
  if (!session) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-primary/20 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center mx-auto shadow-md">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">
              Jodi's Management Portal
            </h1>
            <p className="text-xs text-gray-500">
              Firebase Authenticated Portal • Manage inquiries, blogs, and security.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Username or Email
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="jodimoscato"
                required
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary font-medium"
              />
            </div>

            <div className="p-3.5 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-2xl text-[11px] text-sky-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-primary">
                <Database className="w-3.5 h-3.5" />
                <span>Configured Credentials:</span>
              </div>
              <div>Username: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-gray-800">jodimoscato</code></div>
              <div>Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-gray-800">hello123</code></div>
              <div className="text-[10px] text-gray-500 pt-0.5">You can change your password anytime inside the admin dashboard.</div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full btn-p py-3 text-sm font-bold shadow-md disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{loginLoading ? 'Authenticating with Firebase...' : 'Log In to Dashboard'}</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xs text-gray-400 hover:text-primary font-semibold"
            >
              ← Back to Main Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // LOGGED IN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 bg-gray-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shadow-md shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-2xl text-gray-900">
                  Jodi's Management Panel
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Database className="w-3 h-3 text-emerald-600" /> Firebase Connected
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Logged in as <span className="font-semibold text-gray-800">{session.user}</span> • {settings.contactEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('home')}
              className="btn-s text-xs py-2 px-4 flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Public Site</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition flex items-center gap-1.5 border border-rose-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {blogSuccessMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{blogSuccessMsg}</span>
            </div>
            <button onClick={() => setBlogSuccessMsg('')} className="text-emerald-500 hover:text-emerald-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          
          {/* Inbox Tab */}
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'inbox'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Received Inquiries</span>
            {unreadCount > 0 && (
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                activeTab === 'inbox' ? 'bg-white text-primary' : 'bg-coral text-white'
              }`}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Blogs Tab */}
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'blogs'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Blog Manager ({blogs.length})</span>
          </button>

          {/* Newsletter Subscribers Tab */}
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'subscribers'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Newsletter Subscribers ({subscribers.length})</span>
          </button>

          {/* Security & Password Tab */}
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Change Password & Security</span>
          </button>

        </div>

        {/* =====================================================================
            TAB 1: RECEIVED INQUIRIES & MESSAGES INBOX
           ===================================================================== */}
        {activeTab === 'inbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Messages List (Left) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Filter and Search Bar */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                
                {/* Status Tabs */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto">
                  {['all', 'unread', 'starred'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setInboxFilter(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                        inboxFilter === f
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inboxSearch}
                    onChange={(e) => setInboxSearch(e.target.value)}
                    placeholder="Search inbox..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 text-xs border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <button
                  onClick={handleExportMessages}
                  className="btn-s text-xs py-1.5 px-3 flex items-center gap-1 shrink-0"
                  title="Export to JSON"
                >
                  <Download className="w-3 h-3" />
                  <span>Export</span>
                </button>
              </div>

              {/* Messages Stack */}
              {filteredMessages.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
                  <Mail className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <h4 className="font-bold text-gray-700 text-sm">No inquiries found in this filter.</h4>
                  <p className="text-xs text-gray-400 mt-1">Submitted messages from your Contact page will sync here in real time.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredMessages.map((msg) => {
                    const isSelected = selectedMessage?.id === msg.id;
                    return (
                      <div
                        key={msg.id}
                        onClick={() => {
                          setSelectedMessage(msg);
                          markMessageRead(msg.id, true);
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-sky-50/80 border-primary ring-2 ring-primary/20'
                            : msg.read
                            ? 'bg-white border-gray-200 hover:border-gray-300'
                            : 'bg-white border-primary/40 shadow-sm ring-1 ring-primary/20'
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Unread indicator */}
                          <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${msg.read ? 'bg-transparent' : 'bg-primary'}`} />
                          
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-gray-900 text-sm truncate">
                                {msg.name}
                              </span>
                              <span className="text-[10px] text-gray-400 shrink-0">
                                {new Date(msg.date).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-purple-100 text-accent">
                                {msg.role}
                              </span>
                              <h5 className="font-semibold text-xs text-gray-800 truncate">
                                {msg.subject}
                              </h5>
                            </div>

                            <p className="text-xs text-gray-500 line-clamp-1">
                              {msg.message}
                            </p>
                          </div>
                        </div>

                        {/* Star / Delete actions */}
                        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => toggleMessageStar(msg.id)}
                            className={`p-1.5 rounded-lg transition ${
                              msg.starred ? 'text-amber-400 hover:text-amber-500' : 'text-gray-300 hover:text-gray-500'
                            }`}
                          >
                            <Star className={`w-4 h-4 ${msg.starred ? 'fill-amber-400' : ''}`} />
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Delete message from ${msg.name}?`)) {
                                await deleteMessage(msg.id);
                                if (selectedMessage?.id === msg.id) setSelectedMessage(null);
                              }
                            }}
                            className="p-1.5 rounded-lg text-gray-300 hover:text-rose-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            {/* Selected Message Detail View (Right) */}
            <div className="lg:col-span-6">
              {selectedMessage ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg space-y-6 sticky top-28 animate-fadeIn">
                  
                  <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                    <div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-100 text-accent font-fun">
                        {selectedMessage.role}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-gray-900 mt-2">
                        {selectedMessage.subject}
                      </h3>
                      <div className="text-xs text-gray-400 mt-1">
                        Received on {new Date(selectedMessage.date).toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Sender Info Card */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1 text-xs">
                    <div><span className="font-bold text-gray-700">From:</span> {selectedMessage.name}</div>
                    <div>
                      <span className="font-bold text-gray-700">Email:</span>{' '}
                      <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline font-semibold">
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  {/* Full Message Body */}
                  <div className="bg-sky-50/40 p-6 rounded-2xl border border-sky-100 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedMessage.message}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}&body=Hello ${encodeURIComponent(selectedMessage.name)},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0ABest regards,%0D%0AJodi Moscato`}
                      className="btn-p text-xs py-2.5 px-5 shadow-md flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Reply via Email</span>
                    </a>

                    <button
                      onClick={async () => {
                        await deleteMessage(selectedMessage.id);
                        setSelectedMessage(null);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Message</span>
                    </button>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center text-gray-400 space-y-3">
                  <Mail className="w-12 h-12 text-gray-300 mx-auto" />
                  <h4 className="font-serif font-bold text-base text-gray-600">No message selected</h4>
                  <p className="text-xs text-gray-400">Click any message on the left to read full details and reply.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 2: BLOG POSTS CMS
           ===================================================================== */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <div>
                <h3 className="font-serif font-bold text-xl text-gray-900">
                  Blog & Article Publishing CMS
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Publish new advice articles, guides, and book announcements. Syncs automatically with Firebase Realtime DB.
                </p>
              </div>

              <button
                onClick={handleOpenNewBlog}
                className="btn-p text-xs sm:text-sm py-2.5 px-5 shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Blog Post</span>
              </button>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/9] bg-gray-100 relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className="absolute top-3 left-3 text-white font-fun font-bold text-xs px-3 py-1 rounded-full shadow"
                        style={{ backgroundColor: post.accent || '#22B8F0' }}
                      >
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="text-[11px] text-gray-400 mb-1">{post.date} • {post.readTime}</div>
                      <h4 className="font-serif font-bold text-base text-gray-900 line-clamp-2 mb-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                    <button
                      onClick={() => handleEditBlog(post)}
                      className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Post</span>
                    </button>

                    <button
                      onClick={() => handleDeleteBlogClick(post.id, post.title)}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 3: NEWSLETTER SUBSCRIBERS
           ===================================================================== */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-gray-900">
                  Newsletter Audience
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Users who signed up to receive Jodi's updates and digital literacy worksheets.
                </p>
              </div>

              <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                Total Subscribers: {subscribers.length}
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {subscribers.map((sub, i) => (
                <div key={sub.id || i} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-100 text-primary font-bold flex items-center justify-center text-xs">
                      {i + 1}
                    </div>
                    <span className="font-semibold text-gray-800">{sub.email}</span>
                  </div>
                  <span className="text-gray-400 text-xs">Subscribed on {sub.date}</span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 4: SECURITY & PASSWORD SETTINGS
           ===================================================================== */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Change Password Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              
              <div className="border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-accent flex items-center justify-center mb-2">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-xl text-gray-900">
                  Change Admin Password
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Update your credentials for accessing Jodi's management panel.
                </p>
              </div>

              {pwdAlert.msg && (
                <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
                  pwdAlert.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {pwdAlert.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{pwdAlert.msg}</span>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    value={pwdForm.currentPwd}
                    onChange={(e) => setPwdForm({ ...pwdForm, currentPwd: e.target.value })}
                    required
                    placeholder="Enter current password (hello123)"
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    New Password *
                  </label>
                  <input
                    type="password"
                    value={pwdForm.newPwd}
                    onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
                    required
                    minLength="6"
                    placeholder="At least 6 characters"
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    value={pwdForm.confirmPwd}
                    onChange={(e) => setPwdForm({ ...pwdForm, confirmPwd: e.target.value })}
                    required
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={pwdUpdating}
                  className="w-full btn-p py-3 text-sm font-bold shadow-md mt-2 disabled:opacity-50"
                >
                  <Shield className="w-4 h-4" />
                  <span>{pwdUpdating ? 'Updating in Firebase...' : 'Update Password'}</span>
                </button>
              </form>

            </div>

            {/* Site Contact Settings Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              
              <div className="border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-primary flex items-center justify-center mb-2">
                  <Settings className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-xl text-gray-900">
                  Site Contact Configuration
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Main contact details shown across navigation, contacts page, and footer.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 font-semibold text-gray-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Location Address
                  </label>
                  <input
                    type="text"
                    value={settings.location}
                    onChange={(e) => updateSettings({ location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 font-semibold text-gray-800"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Realtime Sync</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Changes to email and address are saved instantly to Firebase Realtime DB and updated everywhere on the public site.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* =========================================================================
          CREATE / EDIT BLOG MODAL
         ========================================================================= */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-primary/20 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-sky-50 to-indigo-50">
              <h3 className="font-serif font-bold text-lg text-gray-900">
                {editingBlog.id ? 'Edit Blog Post' : 'Publish New Blog Post'}
              </h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlogSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  placeholder="e.g. 5 Screen Time Rules Every Parent Needs"
                  required
                  className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />
              </div>

              {/* Category & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  >
                    <option value="Digital Safety">Digital Safety</option>
                    <option value="Parenting Tips">Parenting Tips</option>
                    <option value="Classroom Tech">Classroom Tech</option>
                    <option value="Literacy">Literacy & Reading</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={editingBlog.readTime}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    placeholder="e.g. 4 min read"
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={editingBlog.image}
                  onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Short Excerpt / Summary *
                </label>
                <textarea
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  rows="2"
                  placeholder="A quick 1-2 sentence preview for the card..."
                  required
                  className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Article Body
                </label>
                <textarea
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  rows="6"
                  placeholder="Write your article paragraphs here..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary font-sans"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={blogSaving}
                  className="btn-p text-xs py-2.5 px-6 font-bold disabled:opacity-50"
                >
                  {blogSaving ? 'Saving to Firebase...' : editingBlog.id ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
