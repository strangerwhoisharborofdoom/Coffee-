import React, { useState } from 'react';
import { StoreMood, Store } from '../types';
import { STORES_DATA } from '../data/stores';
import BrandAssets from '../assets/images';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { Users, Wifi, Coffee, Sparkles, Heart, Car, MapPin, Check, ArrowRight } from 'lucide-react';

interface SpaceMoodConfig {
  id: StoreMood;
  title: string;
  subtitle: string;
  description: string;
  recommendedDrink: string;
  features: string[];
}

const SPACE_MOODS: SpaceMoodConfig[] = [
  {
    id: 'work',
    title: 'Focus & Remote Work',
    subtitle: 'High-speed Wi-Fi, abundant charging sockets, and quiet corners.',
    description: 'Whether polishing a client proposal, coding the next release, or writing your first manuscript, our work-friendly cafés provide the calm focus you need.',
    recommendedDrink: 'Double Espresso Bold or Café Latte',
    features: ['Stable High-Speed Wi-Fi', 'Dedicated Power Outlets', 'Quiet Ambient Acoustics', 'All-Day Table Access']
  },
  {
    id: 'meet',
    title: 'Meetings & Startup Pitches',
    subtitle: 'Where conversations turn into collaborations.',
    description: 'From co-founder brainstorms to informal interviews, Café Coffee Day has hosted thousands of breakthrough business moments since 1996.',
    recommendedDrink: 'Classic Cappuccino with Chilli Cheese Toast',
    features: ['Spacious Table Configurations', 'Central Urban Locations', 'Rapid Counter Ordering', 'Professional Yet Relaxed Vibe']
  },
  {
    id: 'relax',
    title: 'Relax, Unwind & Read',
    subtitle: 'Cozy armchairs, warm lighting, and soulful soundtracks.',
    description: 'Leave the city bustle outside. Sink into a comfortable lounge chair, open your favorite novel, or simply watch the rain trickle down the glass window.',
    recommendedDrink: 'The Devil’s Own or Kaapi Nirvana',
    features: ['Comfortable Upholstered Seating', 'Warm Ambient Lighting', 'Curated Acoustic Playlists', 'Scenic Views & Outdoor Patios']
  },
  {
    id: 'celebrate',
    title: 'Reunions & Celebrations',
    subtitle: 'Birthdays, college meetups, and sweet reunions.',
    description: 'Share a round of sizzling brownies with vanilla ice cream, laugh over old stories, and create unforgettable memories over coffee.',
    recommendedDrink: 'Sizzling Brownie & Red Velvet Pastry with Cold Frappes',
    features: ['Generous Group Seating', 'Decadent Dessert Menu', 'Celebratory Atmosphere', 'Friendly Barista Service']
  },
  {
    id: 'highway',
    title: '24x7 Highway Pitstops',
    subtitle: 'Rest, recharge, and refuel on India’s national highways.',
    description: 'Long road trips call for steaming hot filter kaapi and refreshing frappes. Our expressway hubs operate round the clock with clean facilities and ample parking.',
    recommendedDrink: 'South Indian Filter Kaapi & Crispy Veg Burger',
    features: ['24 Hours Open (24x7)', 'Spacious Restrooms', 'Drive-Thru & Rapid Pickup', 'Pet-Friendly Outdoor Grounds']
  }
];

export const CommunityPage: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<StoreMood>('work');
  const { navigate } = useRouter();
  const { setSelectedStore, setIsCartOpen } = useCart();

  const currentConfig = SPACE_MOODS.find(m => m.id === selectedMood) || SPACE_MOODS[0];

  // Matched stores for this mood
  const matchedStores = STORES_DATA.filter(s => s.moods.includes(selectedMood));

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Header */}
      <div className="bg-[#140E0A] border-b border-[#261B15] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
            <Users className="w-4 h-4" />
            <span>Café Spaces & Culture</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EDE6]">
            Find Your Space
          </h1>
          <p className="text-sm sm:text-base text-[#9E8F84] max-w-2xl leading-relaxed">
            People walk into Café Coffee Day for a hundred different reasons. Select your vibe to find spaces and menus tailored to how you spend your time.
          </p>

          {/* Mood Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
            {SPACE_MOODS.map((mood) => {
              const isActive = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-[#D93829] border-[#D93829] text-white shadow-lg'
                      : 'bg-[#18110D] border-[#2A1E17] text-[#9E8F84] hover:text-[#EDE8E1]'
                  }`}
                >
                  {mood.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Experience Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Mood Overview Card */}
        <div className="bg-[#140E0A] border border-[#2B1F18] rounded-2xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E2B26C]">
              Mood Profile: {currentConfig.title}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5EDE6]">
              {currentConfig.subtitle}
            </h2>
            <p className="text-sm text-[#DDD2C7] leading-relaxed">
              {currentConfig.description}
            </p>

            <div className="p-4 rounded-xl bg-[#1C130E] border border-[#2B1E17] text-xs space-y-1">
              <span className="text-[#9E8F84] uppercase font-bold text-[10px]">Recommended Beverage Pairing:</span>
              <div className="font-semibold text-[#E2B26C]">{currentConfig.recommendedDrink}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {currentConfig.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-xs text-[#DDD2C7]">
                  <Check className="w-3.5 h-3.5 text-[#D93829] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl overflow-hidden bg-[#1E1510] aspect-[4/3] border border-[#2F221B] relative">
            <img
              src={BrandAssets.cafeAmbience}
              alt="Café Coffee Day ambience"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
              <span className="font-semibold block">A Lot Can Happen Over Coffee</span>
              <span className="text-[#DDD2C7] text-[11px]">Since 1996 · India's True Third Place</span>
            </div>
          </div>
        </div>

        {/* Suitable Stores for this Mood */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5EDE6]">
              Recommended Cafés for "{currentConfig.title}"
            </h3>
            <span className="text-xs text-[#9E8F84]">
              {matchedStores.length} Matching Locations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedStores.map((store) => (
              <div
                key={store.id}
                className="bg-[#140E0A] border border-[#2B1F18] hover:border-[#D93829]/60 rounded-xl p-5 flex flex-col justify-between space-y-4 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#C89058]">
                    <span>{store.city}</span>
                    {store.isFlagship && <span className="text-[#D93829] font-bold">1996 Flagship</span>}
                  </div>
                  <h4 className="font-semibold text-base text-[#F5EDE6]">
                    {store.name}
                  </h4>
                  <p className="text-xs text-[#9E8F84] line-clamp-2">
                    {store.address}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-[#261B15]">
                  <div className="flex flex-wrap gap-1.5">
                    {store.amenities.slice(0, 3).map((a) => (
                      <span key={a} className="text-[10px] bg-[#18110D] border border-[#2A1E17] text-[#9E8F84] px-2 py-0.5 rounded">
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => navigate(`/stores/${store.id}`)}
                      className="text-xs text-[#C89058] hover:underline"
                    >
                      View Café Details →
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStore(store);
                        navigate('/menu');
                      }}
                      className="px-3 py-1.5 bg-[#D93829] hover:bg-[#B92B1D] text-white text-xs font-semibold rounded transition-colors"
                    >
                      Order Here
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
