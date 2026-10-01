import React, { useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { SearchModal } from './components/search/SearchModal';
import { CartDrawer } from './components/cart/CartDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { StoresPage } from './pages/StoresPage';
import { CoffeePage } from './pages/CoffeePage';
import { StoryPage } from './pages/StoryPage';
import { CommunityPage } from './pages/CommunityPage';
import { OffersPage } from './pages/OffersPage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { Coffee, AlertCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { path, navigate } = useRouter();
  const { notification } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Render appropriate view based on path
  const renderCurrentPage = () => {
    if (path === '/') return <HomePage />;
    if (path === '/menu' || path.startsWith('/menu/')) return <MenuPage />;
    if (path.startsWith('/product/')) return <ProductDetailPage />;
    if (path === '/stores' || path.startsWith('/stores/')) return <StoresPage />;
    if (path === '/coffee') return <CoffeePage />;
    if (path === '/story') return <StoryPage />;
    if (path === '/community') return <CommunityPage />;
    if (path === '/offers') return <OffersPage />;
    if (path === '/stories') return <StoriesPage />;
    if (path.startsWith('/stories/')) return <StoryDetailPage />;
    if (path === '/careers') return <CareersPage />;
    if (path === '/contact') return <ContactPage />;
    if (path === '/cart') return <MenuPage />;

    // 404 Fallback
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 text-center text-[#EDE8E1]">
        <div className="space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#1F1712] mx-auto flex items-center justify-center text-[#D93829]">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="font-display text-3xl font-bold text-[#F5EDE6]">404 · Page Not Found</h2>
          <p className="text-sm text-[#9E8F84]">
            This page has moved or brewed into something else. Discover our handcrafted coffees instead.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-[#D93829] hover:bg-[#B92B1D] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0907] text-[#EDE8E1] relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C140F] border border-[#D93829]/60 text-[#F5EDE6] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom duration-200">
          <Coffee className="w-4 h-4 text-[#D93829] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Page View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Global Search & AI Grounding Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </RouterProvider>
  );
}
