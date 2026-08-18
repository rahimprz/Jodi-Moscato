import { 
  ref, 
  set, 
  push, 
  get, 
  onValue, 
  remove, 
  update 
} from "firebase/database";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updatePassword as fbUpdatePassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth, db } from "../firebase";
import { INITIAL_BLOGS, INITIAL_MESSAGES, INITIAL_SUBSCRIBERS } from "./defaultData";

const STORAGE_KEYS = {
  BLOGS: 'jodi_cms_blogs_v1',
  MESSAGES: 'jodi_cms_messages_v1',
  SUBSCRIBERS: 'jodi_cms_subscribers_v1',
  ADMIN_AUTH: 'jodi_cms_auth_v1',
  SETTINGS: 'jodi_cms_settings_v1',
};

const DEFAULT_SETTINGS = {
  contactEmail: "MalexKnowsMedia@gmail.com",
  supportEmail: "info@jodimoscato.com",
  phone: "+1 (555) 234-5678",
  location: "United States",
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
    amazon: "https://amazon.com/"
  },
  announcement: "🌟 New Companion Discussion Guide for Teachers & Parents Available Now!"
};

// Map username to standardized email for Firebase Auth
export function resolveAdminEmail(usernameOrEmail) {
  const clean = usernameOrEmail.trim().toLowerCase();
  if (clean.includes('@')) return clean;
  if (clean === 'jodimoscato' || clean === 'jodi' || clean === 'admin') {
    return 'jodimoscato@jodi-6c66e.firebaseapp.com';
  }
  return `${clean}@jodi-6c66e.firebaseapp.com`;
}

// Local helper cache
function getLocalItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function setLocalItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyStore(key, value);
  } catch (e) {
    console.error(`Error saving ${key} locally:`, e);
  }
}

// Event listeners for UI reactive subscriptions
const listeners = new Set();
export function subscribeStore(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notifyStore(key, value) {
  listeners.forEach(cb => {
    try {
      cb(key, value);
    } catch (e) {
      console.error("Store notification error:", e);
    }
  });
}

// =========================================================================
// FIREBASE REALTIME DATABASE SYNC
// =========================================================================

// Initialize Realtime Listeners
let isFirebaseInitialized = false;
export function initFirebaseRealtimeSync() {
  if (isFirebaseInitialized || typeof window === 'undefined') return;
  isFirebaseInitialized = true;

  // 1. Sync Blogs from Firebase Realtime DB
  try {
    const blogsRef = ref(db, 'blogs');
    onValue(blogsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const blogList = Array.isArray(val) ? val.filter(Boolean) : Object.keys(val).map(k => ({ id: k, ...val[k] }));
        if (blogList.length > 0) {
          setLocalItem(STORAGE_KEYS.BLOGS, blogList);
        }
      } else {
        // If DB is empty, initialize with default blogs
        INITIAL_BLOGS.forEach(b => {
          const newRef = ref(db, `blogs/${b.id}`);
          set(newRef, b).catch(() => {});
        });
      }
    }, (err) => {
      console.warn("Firebase blogs onValue notice (falling back to local cache):", err.message);
    });
  } catch (e) {
    console.warn("Firebase blogs setup error:", e);
  }

  // 2. Sync Messages from Firebase Realtime DB
  try {
    const msgsRef = ref(db, 'messages');
    onValue(msgsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const msgList = Array.isArray(val) ? val.filter(Boolean) : Object.keys(val).map(k => ({ id: k, ...val[k] }));
        // Sort newest first
        msgList.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        setLocalItem(STORAGE_KEYS.MESSAGES, msgList);
      } else {
        // Seed default messages if DB empty
        INITIAL_MESSAGES.forEach(m => {
          const newRef = ref(db, `messages/${m.id}`);
          set(newRef, m).catch(() => {});
        });
      }
    }, (err) => {
      console.warn("Firebase messages onValue notice:", err.message);
    });
  } catch (e) {
    console.warn("Firebase messages setup error:", e);
  }

  // 3. Sync Subscribers
  try {
    const subsRef = ref(db, 'subscribers');
    onValue(subsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const subList = Array.isArray(val) ? val.filter(Boolean) : Object.keys(val).map(k => ({ id: k, ...val[k] }));
        setLocalItem(STORAGE_KEYS.SUBSCRIBERS, subList);
      }
    }, () => {});
  } catch (e) {}

  // 4. Sync Settings
  try {
    const settingsRef = ref(db, 'settings');
    onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setLocalItem(STORAGE_KEYS.SETTINGS, snapshot.val());
      }
    }, () => {});
  } catch (e) {}
}

// Start Realtime sync automatically on import
if (typeof window !== 'undefined') {
  initFirebaseRealtimeSync();
}

// =========================================================================
// BLOGS CRUD (FIREBASE + LOCAL CACHE)
// =========================================================================

export function getBlogs() {
  return getLocalItem(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
}

export async function saveBlog(postData) {
  const blogs = [...getBlogs()];
  const id = postData.id || `post-${Date.now()}`;
  const blogRecord = {
    ...postData,
    id,
    slug: postData.slug || (postData.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    date: postData.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: postData.readTime || '4 min read',
    author: "Jodi Moscato",
    authorRole: "Author & Educator",
    accent: postData.accent || '#22B8F0',
    updatedAt: new Date().toISOString()
  };

  if (postData.id) {
    const idx = blogs.findIndex(b => b.id === postData.id);
    if (idx !== -1) blogs[idx] = blogRecord;
    else blogs.unshift(blogRecord);
  } else {
    blogs.unshift(blogRecord);
  }

  // Update local cache
  setLocalItem(STORAGE_KEYS.BLOGS, blogs);

  // Write to Firebase Realtime Database
  try {
    await set(ref(db, `blogs/${id}`), blogRecord);
  } catch (e) {
    console.warn("Firebase blog save write error:", e);
  }

  return blogs;
}

export async function deleteBlog(id) {
  const blogs = getBlogs().filter(b => b.id !== id);
  setLocalItem(STORAGE_KEYS.BLOGS, blogs);

  try {
    await remove(ref(db, `blogs/${id}`));
  } catch (e) {
    console.warn("Firebase blog remove error:", e);
  }

  return blogs;
}

// =========================================================================
// MESSAGES INBOX (FIREBASE + LOCAL CACHE)
// =========================================================================

export function getMessages() {
  return getLocalItem(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
}

export async function addMessage(data) {
  const messages = [...getMessages()];
  const id = `msg-${Date.now()}`;
  const newMsg = {
    id,
    name: data.name || "Anonymous Reader",
    email: data.email || "reader@example.com",
    role: data.role || "Parent / Reader",
    subject: data.subject || "Message via Jodi-Moscato.com",
    message: data.message || "",
    date: new Date().toISOString(),
    read: false,
    starred: false
  };

  messages.unshift(newMsg);
  setLocalItem(STORAGE_KEYS.MESSAGES, messages);

  // Push to Firebase Realtime DB
  try {
    await set(ref(db, `messages/${id}`), newMsg);
  } catch (e) {
    console.warn("Firebase message push error:", e);
  }

  return newMsg;
}

export async function markMessageRead(id, read = true) {
  const messages = [...getMessages()];
  const idx = messages.findIndex(m => m.id === id);
  if (idx !== -1) {
    messages[idx].read = read;
    setLocalItem(STORAGE_KEYS.MESSAGES, messages);
    try {
      await update(ref(db, `messages/${id}`), { read });
    } catch (e) {}
  }
  return messages;
}

export async function toggleMessageStar(id) {
  const messages = [...getMessages()];
  const idx = messages.findIndex(m => m.id === id);
  if (idx !== -1) {
    const starred = !messages[idx].starred;
    messages[idx].starred = starred;
    setLocalItem(STORAGE_KEYS.MESSAGES, messages);
    try {
      await update(ref(db, `messages/${id}`), { starred });
    } catch (e) {}
  }
  return messages;
}

export async function deleteMessage(id) {
  const messages = getMessages().filter(m => m.id !== id);
  setLocalItem(STORAGE_KEYS.MESSAGES, messages);
  try {
    await remove(ref(db, `messages/${id}`));
  } catch (e) {}
  return messages;
}

// =========================================================================
// SUBSCRIBERS
// =========================================================================

export function getSubscribers() {
  return getLocalItem(STORAGE_KEYS.SUBSCRIBERS, INITIAL_SUBSCRIBERS);
}

export async function addSubscriber(email) {
  const subs = [...getSubscribers()];
  if (subs.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return { success: true, alreadySubscribed: true };
  }
  const id = `sub-${Date.now()}`;
  const newSub = {
    id,
    email: email.trim(),
    date: new Date().toISOString().split('T')[0]
  };
  subs.unshift(newSub);
  setLocalItem(STORAGE_KEYS.SUBSCRIBERS, subs);

  try {
    await set(ref(db, `subscribers/${id}`), newSub);
  } catch (e) {}

  return { success: true, newSub };
}

// =========================================================================
// SETTINGS
// =========================================================================

export function getSettings() {
  return getLocalItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export async function updateSettings(newSettings) {
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  setLocalItem(STORAGE_KEYS.SETTINGS, updated);

  try {
    await set(ref(db, 'settings'), updated);
  } catch (e) {}

  return updated;
}

// =========================================================================
// FIREBASE AUTH & ADMIN LOGIN
// =========================================================================

export async function verifyAdminLogin(usernameOrEmail, password) {
  const email = resolveAdminEmail(usernameOrEmail);

  // 1. Try Firebase Authentication
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const sessionData = {
      user: usernameOrEmail,
      email: user.email,
      uid: user.uid,
      loggedInAt: Date.now()
    };
    sessionStorage.setItem('jodi_admin_session', JSON.stringify(sessionData));
    return { success: true, user: sessionData };
  } catch (err) {
    // If user does not exist in Firebase Auth yet, automatically initialize it with the provided credentials!
    if (
      (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') &&
      password === 'hello123'
    ) {
      try {
        const createRes = await createUserWithEmailAndPassword(auth, email, password);
        const user = createRes.user;
        const sessionData = {
          user: usernameOrEmail,
          email: user.email,
          uid: user.uid,
          loggedInAt: Date.now()
        };
        sessionStorage.setItem('jodi_admin_session', JSON.stringify(sessionData));
        return { success: true, user: sessionData, created: true };
      } catch (createErr) {
        console.warn("Firebase create user notice:", createErr.message);
      }
    }

    // 2. Fallback check for offline / local credentials (jodimoscato / hello123 or stored password)
    const localAuth = getLocalItem(STORAGE_KEYS.ADMIN_AUTH, {
      username: 'jodimoscato',
      passwordHash: 'hello123'
    });

    const isLocalUserMatch = 
      usernameOrEmail.trim().toLowerCase() === localAuth.username.toLowerCase() ||
      usernameOrEmail.trim().toLowerCase() === 'jodi' ||
      usernameOrEmail.trim().toLowerCase() === 'malexknowsmedia@gmail.com' ||
      usernameOrEmail.trim().toLowerCase() === 'jodimoscato';

    if (isLocalUserMatch && (password === localAuth.passwordHash || password === 'hello123')) {
      const sessionData = {
        user: usernameOrEmail,
        email: 'MalexKnowsMedia@gmail.com',
        uid: 'local-admin',
        loggedInAt: Date.now()
      };
      sessionStorage.setItem('jodi_admin_session', JSON.stringify(sessionData));
      return { success: true, user: sessionData };
    }

    return { 
      success: false, 
      message: err.message || "Invalid username/email or password." 
    };
  }
}

export async function updateAdminPassword(currentPassword, newPassword) {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: "New password must be at least 6 characters." };
  }

  let firebaseUpdated = false;

  // If currently authenticated with Firebase
  if (auth.currentUser) {
    try {
      await fbUpdatePassword(auth.currentUser, newPassword);
      firebaseUpdated = true;
    } catch (e) {
      console.warn("Firebase password update note:", e.message);
    }
  }

  // Update local storage backup
  const localAuth = getLocalItem(STORAGE_KEYS.ADMIN_AUTH, {
    username: 'jodimoscato',
    passwordHash: 'hello123'
  });
  localAuth.passwordHash = newPassword;
  setLocalItem(STORAGE_KEYS.ADMIN_AUTH, localAuth);

  return { 
    success: true, 
    message: firebaseUpdated 
      ? "Password updated in Firebase Auth successfully!" 
      : "Password updated successfully!" 
  };
}

export function checkAdminSession() {
  try {
    const session = sessionStorage.getItem('jodi_admin_session');
    return session ? JSON.parse(session) : null;
  } catch (e) {
    return null;
  }
}

export async function logoutAdmin() {
  sessionStorage.removeItem('jodi_admin_session');
  try {
    await signOut(auth);
  } catch (e) {}
}
