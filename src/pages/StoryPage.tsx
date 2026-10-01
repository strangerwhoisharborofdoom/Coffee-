import React from 'react';
import BrandAssets from '../assets/images';
import { useRouter } from '../context/RouterContext';
import { Clock, History, Coffee, Award, Sparkles, ArrowRight } from 'lucide-react';

export const StoryPage: React.FC = () => {
  const { navigate } = useRouter();

  const milestones = [
    {
      year: '1996',
      title: 'The Cyber Café Pioneer on Brigade Road',
      subtitle: '11 July 1996 · Bengaluru, Karnataka',
      content: 'In the mid-90s, when personal internet was virtually nonexistent in Indian households and café culture meant filter coffee in steel tumblers, Café Coffee Day opened its doors at 35 Brigade Road. Guests paid ₹100 for an hour of high-speed browsing and were served a steaming cup of Italian espresso sourced directly from Chikmagalur estates.',
      tag: 'Birth of a Movement'
    },
    {
      year: '2001',
      title: '"A Lot Can Happen Over Coffee"',
      subtitle: 'The Slogan That Defined a Generation',
      content: 'Recognizing that the café had transcended coffee to become an informal boardroom, a dating venue, and a haven for students, CCD coined the now-legendary philosophy: "A Lot Can Happen Over Coffee". The café became India’s official "Third Place" — a warm neutral harbor between home and office.',
      tag: 'Cultural Landmark'
    },
    {
      year: '2005',
      title: 'National Expansion & Highway Pitstops',
      subtitle: 'From Metro High Streets to National Expressways',
      content: 'Café Coffee Day pioneered 24/7 highway coffee stops along major arteries like the Mumbai-Pune Expressway and Bangalore-Mysore Highway, providing clean facilities, hot espresso, and fresh food to weary travelers round the clock.',
      tag: 'Highway Revolution'
    },
    {
      year: '2010s',
      title: 'The Startup Incubator of New India',
      subtitle: 'Thousands of Pitches, Friendships & Ideas',
      content: 'India’s startup boom had its unofficial offices at CCD. Countless founders pitched initial pitch decks over Classic Cappuccinos and Devil’s Own frappes, taking advantage of free Wi-Fi, power ports, and comfortable lounge seating.',
      tag: 'Economic Impact'
    },
    {
      year: 'Today & Beyond',
      title: 'The Next Generation of Coffee Day',
      subtitle: 'Artisanal Roasts, Single-Origin Estates & Digital Rebirth',
      content: 'Today, Café Coffee Day continues to honor its estate roots in the Western Ghats while embracing digital ordering, single-origin micro-lots, and fresh barista innovations for modern India.',
      tag: 'The Modern Era'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Header */}
      <div className="relative py-20 sm:py-28 overflow-hidden border-b border-[#261B15] bg-[#120C09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
            <History className="w-4 h-4" />
            <span>Café Coffee Day Heritage</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5EDE6] max-w-3xl leading-tight">
            How One Bengaluru Café Changed India’s Daily Routine
          </h1>
          <p className="text-base sm:text-lg text-[#DDD2C7] max-w-2xl leading-relaxed">
            The story of how high-grown beans from Chikmagalur and an ambitious idea on Brigade Road ignited an entire nation’s love affair with coffee.
          </p>
        </div>
      </div>

      {/* Visual Timeline Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="relative border-l-2 border-[#2B1F18] pl-6 sm:pl-10 space-y-16">
          {milestones.map((m, idx) => (
            <div key={m.year} className="relative group">
              {/* Dot marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#18110D] border-2 border-[#D93829] group-hover:scale-125 transition-transform shadow-md" />

              <div className="bg-[#140E0A] border border-[#2B1F18] group-hover:border-[#D93829]/60 rounded-2xl p-6 sm:p-8 space-y-3 transition-colors shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#D93829]">
                    {m.year}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E2B26C] bg-[#251B15] px-2.5 py-1 rounded">
                    {m.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5EDE6]">
                  {m.title}
                </h3>
                <div className="text-xs text-[#9E8F84] font-medium">
                  {m.subtitle}
                </div>

                <p className="text-sm text-[#DDD2C7] leading-relaxed pt-2">
                  {m.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-[#18110D] border border-[#2B1F18] text-center space-y-4 shadow-2xl">
          <h3 className="font-display text-2xl font-bold text-[#F5EDE6]">
            Be Part of the Next Conversation
          </h3>
          <p className="text-xs sm:text-sm text-[#9E8F84] max-w-lg mx-auto">
            Drop into your nearest Café Coffee Day for a cup of freshly pulled espresso and discover why a lot really does happen over coffee.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/stores')}
              className="px-6 py-2.5 bg-[#D93829] hover:bg-[#B92B1D] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Locate a Nearby Café
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="px-6 py-2.5 bg-[#251B15] hover:bg-[#34241C] text-[#DDD2C7] border border-[#3A2E27] text-xs font-semibold rounded-lg transition-colors"
            >
              Explore Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
