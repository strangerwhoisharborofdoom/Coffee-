import React, { useState } from 'react';
import BrandAssets from '../assets/images';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { MENU_PRODUCTS } from '../data/menu';
import { ProductCard } from '../components/product/ProductCard';
import { ProductModal } from '../components/product/ProductModal';
import { CCDExperience } from '../components/animations/CCDExperience';
import { TheCCDExperience } from '../components/interactive/TheCCDExperience';
import { CoffeeRecommender } from '../components/coffee/CoffeeRecommender';
import { ScrollReveal, StaggerItem } from '../components/animations/ScrollReveal';
import { Product } from '../types';
import { Coffee, MapPin, ArrowRight, Sparkles, ShieldCheck, Heart, Users, Tag, CheckCircle2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Pick top 4 featured products
  const featured = [
    MENU_PRODUCTS[0], // Classic Cappuccino
    MENU_PRODUCTS[5], // The Devil's Own
    MENU_PRODUCTS[2], // South Indian Filter Kaapi
    MENU_PRODUCTS[13], // Sizzling Brownie
  ];

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1]">
      {/* 1. Signature Scroll-Driven "CCD Experience" Hero (From Bean to Cup to Connection) */}
      <CCDExperience />

      {/* 2. Featured Handcrafted Coffees (Scroll-Triggered Reveal) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#261B15] pb-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
                <Coffee className="w-4 h-4" />
                <span>The Cult Signatures</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5EDE6]">
                Handcrafted For Everyday Rituals
              </h2>
            </div>
            <button
              onClick={() => navigate('/menu')}
              className="text-xs font-semibold text-[#C89058] hover:text-[#EDE8E1] transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>View Complete Menu ({MENU_PRODUCTS.length} Items)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollReveal>

        {/* Staggered Card Grid Reveal */}
        <ScrollReveal staggerChildren={0.1} amount={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard
                  product={product}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                />
              </StaggerItem>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. "THE CCD EXPERIENCE" Interactive Bean-To-Cup Feature (Scroll-Triggered) */}
      <ScrollReveal direction="up" duration={0.7} amount={0.1}>
        <TheCCDExperience />
      </ScrollReveal>

      {/* 4. Interactive "Discover Your Cup" Recommender (Scroll-Triggered) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={0.65} amount={0.15}>
          <CoffeeRecommender />
        </ScrollReveal>
      </section>

      {/* 5. "Find Your Space" & Café Network Teaser (Scroll-Triggered) */}
      <section className="py-20 bg-[#120C09] border-t border-[#261B15] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Side Reveal */}
            <ScrollReveal direction="up" duration={0.65} className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
                <Users className="w-4 h-4" />
                <span>India's Third Place</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EDE6]">
                Where Millions Gather Everyday
              </h2>
              <p className="text-sm sm:text-base text-[#DDD2C7] leading-relaxed">
                Whether dropping in for high-speed Wi-Fi and power outlets to code your startup, meeting an old friend over a warm latte, or taking a 2 AM breather on the expressway, Café Coffee Day is built around you.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#18110D] border border-[#2B1F18] space-y-1">
                  <div className="font-bold text-lg text-[#E2B26C] font-mono">1996</div>
                  <div className="text-[#9E8F84]">Brigade Road First Cyber Café</div>
                </div>
                <div className="p-4 rounded-xl bg-[#18110D] border border-[#2B1F18] space-y-1">
                  <div className="font-bold text-lg text-[#E2B26C] font-mono">200+</div>
                  <div className="text-[#9E8F84]">Cities & Highway Networks</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/community')}
                  className="px-6 py-3 bg-[#D93829] hover:bg-[#B92B1D] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <span>Explore Spaces by Mood</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigate('/stores')}
                  className="px-6 py-3 bg-[#251B15] hover:bg-[#34241C] text-[#DDD2C7] border border-[#3A2E27] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C89058]" />
                  <span>View Café Locator</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Right Media Side Reveal */}
            <ScrollReveal direction="up" delay={0.15} duration={0.7} className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#2B1F18] shadow-2xl relative aspect-[16/10] bg-[#1E1510] group">
                <img
                  src={BrandAssets.cafeAmbience}
                  alt="Café Coffee Day cozy urban space"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-xs text-white space-y-1">
                  <div className="font-bold text-sm">Designed for Real Conversations</div>
                  <div className="text-[#DDD2C7]">Teak tables, soothing acoustics, and freshly pulled espresso.</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
