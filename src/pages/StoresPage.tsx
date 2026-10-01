import React, { useState, useEffect } from 'react';
import { Store, StoreMood } from '../types';
import { storeService } from '../services/storeService';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { StoreCardSkeleton, Skeleton } from '../components/ui/Skeleton';
import { MapPin, Clock, Phone, Navigation, Wifi, Check, Sparkles, Filter, Search, Car, Coffee, Users, Moon } from 'lucide-react';

export const StoresPage: React.FC = () => {
  const { selectedStore, setSelectedStore, setIsCartOpen } = useCart();
  const { navigate, params } = useRouter();

  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCity, setActiveCity] = useState('All Cities');
  const [activeMood, setActiveMood] = useState<StoreMood>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStore, setCurrentStore] = useState<Store | null>(null);

  const cities = storeService.getCities();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      storeService.filter(activeCity, activeMood, searchQuery).then(res => {
        setStores(res);
        if (res.length > 0) {
          // If route params has an id, pick that
          if (params.id) {
            const match = res.find(s => s.id === params.id);
            setCurrentStore(match || res[0]);
          } else if (!currentStore || !res.find(s => s.id === currentStore.id)) {
            setCurrentStore(res[0]);
          }
        }
        setIsLoading(false);
      });
    }, 180);

    return () => clearTimeout(timer);
  }, [activeCity, activeMood, searchQuery, params.id]);

  const handleSelectStore = (store: Store) => {
    setCurrentStore(store);
  };

  const handleSetPickupStore = (store: Store) => {
    setSelectedStore(store);
    setIsCartOpen(true);
  };

  const moodsList: { id: StoreMood; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Cafés', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'work', label: 'Focus & Work', icon: <Wifi className="w-3.5 h-3.5" /> },
    { id: 'meet', label: 'Conversations & Meet', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'relax', label: 'Relax & Chill', icon: <Coffee className="w-3.5 h-3.5" /> },
    { id: 'highway', label: 'Highway Pitstops (24x7)', icon: <Car className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Page Header */}
      <div className="bg-[#140E0A] border-b border-[#261B15] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
            <MapPin className="w-4 h-4" />
            <span>Café Coffee Day Network</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EDE6]">
            Find Your Nearest Café
          </h1>
          <p className="text-sm sm:text-base text-[#9E8F84] max-w-2xl leading-relaxed">
            From the historic 1996 first café on Bengaluru’s Brigade Road to 24/7 expressways and neighbourhood lounges across India.
          </p>

          {/* Search & City Filter Bar */}
          <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#9E8F84] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by area, landmark, or street..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#1C130E] border border-[#2F221B] rounded-lg text-sm text-[#F5EDE6] placeholder-[#7A6C62] focus:outline-none focus:border-[#D93829]"
              />
            </div>

            {/* City dropdown */}
            <select
              value={activeCity}
              onChange={(e) => setActiveCity(e.target.value)}
              className="py-2.5 px-4 bg-[#1C130E] border border-[#2F221B] rounded-lg text-sm text-[#F5EDE6] focus:outline-none focus:border-[#D93829] cursor-pointer"
            >
              {cities.map(c => (
                <option key={c} value={c} className="bg-[#140E0A] text-[#EDE8E1]">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Mood Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
            {moodsList.map(m => (
              <button
                key={m.id}
                onClick={() => setActiveMood(m.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  activeMood === m.id
                    ? 'bg-[#D93829] border-[#D93829] text-white shadow-sm'
                    : 'bg-[#18110D] border-[#2A1E17] text-[#9E8F84] hover:text-[#EDE8E1]'
                }`}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Stores Discovery Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Store List Column */}
          <div className="lg:col-span-5 space-y-4 max-h-[750px] overflow-y-auto pr-1">
            <div className="text-xs text-[#9E8F84] flex items-center justify-between pb-1">
              <span>Showing {stores.length} Verified Outlets</span>
              {activeCity !== 'All Cities' && <span className="text-[#C89058]">{activeCity}</span>}
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <StoreCardSkeleton key={idx} />
                ))}
              </div>
            ) : stores.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#140E0A] border border-[#261B15] text-center text-sm text-[#9E8F84]">
                No cafés matched your current filters. Try selecting "All Cities" or clearing the search.
              </div>
            ) : (
              stores.map((store) => {
                const isSelected = currentStore?.id === store.id;
                const isPickupDefault = selectedStore.id === store.id;
                return (
                  <div
                    key={store.id}
                    onClick={() => handleSelectStore(store)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-[#1F1611] border-[#D93829] shadow-lg'
                        : 'bg-[#140E0A] border-[#2B1F18] hover:border-[#3D2C22]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {store.isFlagship && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D93829] bg-[#D93829]/15 px-2 py-0.5 rounded inline-block mb-1.5">
                            Historic Flagship
                          </span>
                        )}
                        <h3 className="font-semibold text-base text-[#F5EDE6]">
                          {store.name}
                        </h3>
                        <p className="text-xs text-[#9E8F84] mt-0.5">
                          {store.landmark} · {store.city}
                        </p>
                      </div>
                      {isPickupDefault && (
                        <span className="text-[10px] bg-[#1B291A] text-[#86EFAC] px-2 py-0.5 rounded border border-[#2B442A] shrink-0 font-medium">
                          Active Pickup
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#DDD2C7] line-clamp-1">
                      {store.address}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {store.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="text-[10px] bg-[#18110D] border border-[#2F221B] text-[#9E8F84] px-2 py-0.5 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                      {store.amenities.length > 3 && (
                        <span className="text-[10px] text-[#7A6C62] self-center">
                          +{store.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#261B15] flex items-center justify-between text-xs text-[#9E8F84]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C89058]" />
                        <span>{store.timing}</span>
                      </div>
                      <span className="text-[#D93829] font-medium group-hover:underline">
                        Select Café →
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Interactive Map & Detail Column */}
          <div className="lg:col-span-7 sticky top-24 space-y-6">
            {currentStore && (
              <div className="bg-[#140E0A] border border-[#2B1F18] rounded-2xl overflow-hidden shadow-2xl space-y-6">
                {/* Visual Map Representation */}
                <div className="relative aspect-[16/9] bg-[#1A120D] overflow-hidden flex items-center justify-center">
                  <img
                    src={currentStore.image}
                    alt={currentStore.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A] via-[#140E0A]/50 to-black/30" />

                  {/* Stylized Map Pin Marker */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="animate-bounce flex flex-col items-center">
                      <div className="p-3 rounded-full bg-[#D93829] text-white shadow-2xl border-2 border-white">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="w-3 h-1 bg-black/60 rounded-full blur-[1px] mt-1" />
                    </div>
                  </div>

                  {/* Coordinates overlay badge */}
                  <div className="absolute top-4 left-4 p-2 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-mono text-[#DDD2C7] border border-[#3A2E27]">
                    {currentStore.lat.toFixed(4)}° N, {currentStore.lng.toFixed(4)}° E
                  </div>
                </div>

                {/* Store Full Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#E2B26C] font-semibold uppercase tracking-wider">
                      <span>{currentStore.city}, {currentStore.state}</span>
                      {currentStore.isFlagship && <span>· Historic Origin</span>}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5EDE6]">
                      {currentStore.name}
                    </h2>
                    <p className="text-sm text-[#DDD2C7] leading-relaxed">
                      {currentStore.address}
                    </p>
                    <p className="text-xs text-[#9E8F84]">
                      Landmark: <span className="text-[#DDD2C7]">{currentStore.landmark}</span>
                    </p>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#1A120D] border border-[#2B1F18] flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#C89058] shrink-0" />
                      <div>
                        <div className="text-[#7A6C62] text-[10px] uppercase">Hours of Service</div>
                        <div className="font-semibold text-[#F5EDE6]">{currentStore.timing}</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#1A120D] border border-[#2B1F18] flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#C89058] shrink-0" />
                      <div>
                        <div className="text-[#7A6C62] text-[10px] uppercase">Café Hotline</div>
                        <a href={`tel:${currentStore.phone}`} className="font-semibold text-[#F5EDE6] hover:text-[#D93829]">
                          {currentStore.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9E8F84]">
                      Available Café Facilities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStore.amenities.map(a => (
                        <div
                          key={a}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18110D] border border-[#2A1E17] text-xs text-[#DDD2C7]"
                        >
                          <Check className="w-3.5 h-3.5 text-[#D93829]" />
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#261B15] flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleSetPickupStore(currentStore)}
                      className="flex-1 py-3 px-4 bg-[#D93829] hover:bg-[#B92B1D] text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <Coffee className="w-4 h-4" />
                      <span>Select as My Pickup Café</span>
                    </button>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${currentStore.name} ${currentStore.address}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-4 rounded-lg bg-[#251B15] hover:bg-[#34241C] text-[#DDD2C7] border border-[#3A2E27] text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4 text-[#C89058]" />
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
