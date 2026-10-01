import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { CCDLogo } from '../common/CCDLogo';
import { Search, ShoppingBag, Menu, X, Coffee } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { path, navigate } = useRouter();
  const { items, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Menu', href: '/menu' },
    { label: 'Find a Café', href: '/stores' },
    { label: 'The Coffee', href: '/coffee' },
    { label: 'Our Story', href: '/story' },
    { label: 'Spaces', href: '/community' },
    { label: 'Offers', href: '/offers' },
  ];

  const handleNav = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0D0907]/95 backdrop-blur-md border-b border-[#2A1E17] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Zone */}
        <button
          onClick={() => handleNav('/')}
          className="text-left group flex items-center gap-3 focus:outline-none"
          aria-label="Café Coffee Day Homepage"
        >
          <div className="transition-transform group-hover:scale-105 duration-200">
            <CCDLogo className="w-8 h-9 sm:w-9 sm:h-10 drop-shadow-md" />
          </div>
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#F5EDE6] group-hover:text-[#D93829] transition-colors whitespace-nowrap">
            Café Coffee Day
          </span>
        </button>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single-line with hover underlines */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#C2B5A8]">
          {navLinks.map((link) => {
            const isActive = path === link.href || (link.href !== '/' && path.startsWith(link.href));
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`relative py-1 transition-colors whitespace-nowrap hover:text-[#F5EDE6] ${
                  isActive ? 'text-[#F5EDE6] font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D93829]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-2 rounded-lg text-[#C2B5A8] hover:text-[#F5EDE6] hover:bg-[#1E1510] transition-colors flex items-center gap-2 text-xs sm:text-sm font-medium"
            aria-label="Search Menu, Cafes, and Stories"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">Search & Grounding</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3 sm:px-4 py-2 bg-[#D93829] hover:bg-[#B92B1D] text-white rounded-lg transition-colors flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap shadow-sm"
            aria-label={`View cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-[#D93829] text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#C2B5A8] hover:text-[#F5EDE6] hover:bg-[#1E1510] rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2A1E17] bg-[#120C09] px-6 py-6 space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {navLinks.map((link) => {
              const isActive = path === link.href || (link.href !== '/' && path.startsWith(link.href));
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`text-left px-3 py-2.5 rounded-md text-base transition-colors ${
                    isActive ? 'bg-[#D93829]/10 text-[#D93829] font-medium' : 'text-[#DDD2C7] hover:bg-[#1E1510]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#2A1E17] flex items-center justify-between text-xs text-[#9E8F84]">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-[#D93829]" />
              <span>A Lot Can Happen Over Coffee</span>
            </div>
            <span>Since 1996</span>
          </div>
        </div>
      )}
    </header>
  );
};
