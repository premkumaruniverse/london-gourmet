import React, { useState, useEffect } from 'react';
import { auth, __initial_auth_token } from '../firebaseConfig';
import { onAuthStateChanged, signInWithCustomToken, signOut } from 'firebase/auth';

// Import the management modules
import SiteSettings from './CMS/SiteSettings';
import ProductsManager from './CMS/ProductsManager';
import TeamManager from './CMS/TeamManager';
import PageContentEditor from './CMS/PageContentEditor';

// Placeholder components for new requirements
const Dashboard = () => <div className="p-6 bg-gray-800 rounded-lg shadow-xl"><h2 className="text-2xl font-bold text-amber-400">Dashboard</h2><p className="mt-2 text-gray-400">Overview of key metrics (sales, orders, leads) will be displayed here.</p></div>;
const OrderManager = () => <div className="p-6 bg-gray-800 rounded-lg shadow-xl"><h2 className="text-2xl font-bold text-amber-400">Order Management</h2><p className="mt-2 text-gray-400">A sortable list of all customer orders will be managed from here.</p></div>;
const LeadManager = () => <div className="p-6 bg-gray-800 rounded-lg shadow-xl"><h2 className="text-2xl font-bold text-amber-400">Catering Lead Management</h2><p className="mt-2 text-gray-400">Inquiries from the Diner's Atlas form will be displayed and managed here.</p></div>;
const EventManager = () => <div className="p-6 bg-gray-800 rounded-lg shadow-xl"><h2 className="text-2xl font-bold text-amber-400">Event Management</h2><p className="mt-2 text-gray-400">Gourmet Club events, registration, and capacity will be managed here.</p></div>;

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setError('');
    try {
      if (!__initial_auth_token || __initial_auth_token === "REPLACE_WITH_CUSTOM_TOKEN") {
        throw new Error("Initial auth token is not configured in firebaseConfig.js");
      }
      await signInWithCustomToken(auth, __initial_auth_token);
    } catch (err) {
      console.error("Admin Login Error:", err);
      setError(`Failed to log in. ${err.message}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setActiveView('dashboard');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <ProductsManager />;
      case 'orders': return <OrderManager />;
      case 'leads': return <LeadManager />;
      case 'events': return <EventManager />;
      case 'team': return <TeamManager />;
      case 'site_settings': return <SiteSettings />;
      case 'page_content': return <PageContentEditor />;
      default: return <Dashboard />;
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading Admin Panel...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-white mb-4">Admin Panel Login</h1>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  const NavLink = ({ view, children }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
        activeView === view
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex h-full min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 space-y-2">
        <h2 className="px-3 text-lg font-semibold text-amber-400">London Gourmet</h2>
        <nav className="space-y-1">
          <NavLink view="dashboard">Dashboard</NavLink>
          <hr className="border-gray-600 my-2"/>
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">E-Commerce</h3>
          <NavLink view="products">Product Management</NavLink>
          <NavLink view="orders">Order Management</NavLink>
          <hr className="border-gray-600 my-2"/>
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Services</h3>
          <NavLink view="leads">Catering Leads</NavLink>
          <NavLink view="events">Event Management</NavLink>
          <hr className="border-gray-600 my-2"/>
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Content</h3>
          <NavLink view="team">Team Management</NavLink>
          <NavLink view="page_content">Page Content</NavLink>
          <NavLink view="site_settings">Site Settings</NavLink>
        </nav>
        <div className="absolute bottom-0 left-0 w-64 p-4">
           <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-red-800 hover:text-white">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default Admin;