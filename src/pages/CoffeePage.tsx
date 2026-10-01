import React from 'react';
import BrandAssets from '../assets/images';
import { useRouter } from '../context/RouterContext';
import { Coffee, ShieldCheck, Sun, Mountain, Flame, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CoffeePage: React.FC = () => {
  const { navigate } = useRouter();

  const stages = [
    {
      num: '01',
      title: 'The High-Altitude Western Ghats Terroir',
      subtitle: 'Chikmagalur & Baba Budangiri Hills, Karnataka',
      desc: 'Nestled between 3,000 and 4,500 feet above sea level, our estates sit in the birthplace of Indian coffee. The micro-climate provides rich volcanic red soil, torrential southwest monsoon rains, and cool mountain breezes.',
      fact: '100% shade canopy with indigenous silver oaks and jackfruit trees'
    },
    {
      num: '02',
      title: 'Selective Hand-Harvesting',
      subtitle: 'Peak Ripeness Selective Picking',
      desc: 'Instead of mechanical stripping, coffee harvesters hand-pick only deep ruby-red ripe cherries across multiple passes through each block of the plantation over the harvest season.',
      fact: 'Ensures optimal natural brix sugar levels before pulping'
    },
    {
      num: '03',
      title: 'Natural Mountain Spring Pulping & Fermentation',
      subtitle: 'Wet Process Stewardship',
      desc: 'Harvested cherries are pulped using mountain spring waters within hours of picking. Slow controlled fermentation gently releases the sticky fruit mucilage before clean washed sun drying on tiled patios.',
      fact: 'Natural patio drying to precise 11.5% moisture content'
    },
    {
      num: '04',
      title: 'Precision Italian Drum Roasting',
      subtitle: 'Custom Roast Profile Curves',
      desc: 'Our green beans travel to state-of-the-art roasting facilities equipped with Italian commercial drum roasters. Computerized thermal sensors track heat application to ensure consistent caramelization of volatile bean aromatics.',
      fact: 'Slow profile development for bold crema and rich dark chocolate undertones'
    },
    {
      num: '05',
      title: 'The 7-Gram Barista Extraction',
      subtitle: '9-Bar Pressure pulled in 25 Golden Seconds',
      desc: 'In every café, trained baristas dose exactly 7 grams of freshly ground Arabica, tamp with 15 kilograms of level pressure, and pull an espresso under 9 bars of hydraulic pressure to crown every cup with dense tiger-stripe crema.',
      fact: 'Standardized extraction formula across all Café Coffee Day outlets'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Hero Banner */}
      <div className="relative py-20 sm:py-28 overflow-hidden border-b border-[#261B15] bg-[#120C09]">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={BrandAssets.coffeeEstate}
            alt="Chikmagalur Coffee Estate"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0907] via-[#0D0907]/70 to-[#0D0907]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
            <Mountain className="w-4 h-4" />
            <span>Karnataka Coffee Stewardship</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5EDE6] max-w-3xl leading-tight">
            Rooted in the Soil of Chikmagalur
          </h1>
          <p className="text-base sm:text-lg text-[#DDD2C7] max-w-2xl leading-relaxed">
            Long before espresso became an urban daily ritual, coffee in India was cultivated under the ancient shade trees of the Western Ghats. Discover how our heritage estates cultivate every bean.
          </p>
        </div>
      </div>

      {/* Terroir & Canopy Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#E2B26C]">
              Why Shade-Grown Matters
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5EDE6]">
              Nature’s Two-Tier Forest Canopy
            </h2>
            <p className="text-sm sm:text-base text-[#DDD2C7] leading-relaxed">
              Unlike vast industrial plantations that clear forests for sun cultivation, Indian coffee estates exist inside living biodiversity hotspots.
            </p>
            <p className="text-sm text-[#9E8F84] leading-relaxed">
              Under the upper canopy of towering native trees, pepper vines climb silver oaks while cardamoms flourish at ground level. This natural shade forces the coffee cherries to ripen at half the speed of sun-grown crops, yielding denser beans packed with natural sugars, floral nuances, and minimal bitter astringency.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Preserves native bird habitats and Western Ghats wildlife corridors',
                'Natural leaf litter provides organic nourishment without chemical dependency',
                'High-altitude cloud cover ensures natural moisture retention'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#DDD2C7]">
                  <CheckCircle2 className="w-4 h-4 text-[#D93829] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#2B1F18] shadow-2xl relative">
            <img
              src={BrandAssets.coffeeEstate}
              alt="Chikmagalur mist and coffee trees"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-[#3A2E27] text-xs text-[#DDD2C7]">
              <div className="font-semibold text-white">Baba Budangiri Terroir</div>
              <div className="text-[#9E8F84] text-[11px]">Chikmagalur District, Karnataka · 3,500 ft elevation</div>
            </div>
          </div>
        </div>
      </div>

      {/* The Step-by-Step Educational Journey */}
      <div className="bg-[#120C09] border-y border-[#261B15] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
              <Coffee className="w-4 h-4" />
              <span>Step-by-Step Craft</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5EDE6]">
              From Seed to Cup: The 5 Chapters
            </h2>
            <p className="text-sm text-[#9E8F84]">
              How raw cherries are transformed into the signature espresso served in your local Café Coffee Day.
            </p>
          </div>

          <div className="space-y-8">
            {stages.map((stage) => (
              <div
                key={stage.num}
                className="p-6 sm:p-8 rounded-2xl bg-[#18110D] border border-[#2B1F18] hover:border-[#D93829]/50 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-2">
                  <span className="font-mono text-4xl sm:text-5xl font-bold text-[#D93829]/70">
                    {stage.num}
                  </span>
                </div>
                <div className="lg:col-span-7 space-y-2">
                  <div className="text-xs uppercase tracking-wider text-[#E2B26C] font-semibold">
                    {stage.subtitle}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5EDE6]">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-[#DDD2C7] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
                <div className="lg:col-span-3 p-4 rounded-xl bg-[#120C09] border border-[#251B15] text-xs text-[#9E8F84] space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#D93829]">Estate Standard</div>
                  <div className="text-[#DDD2C7] font-medium">{stage.fact}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Action to Explore Menu */}
          <div className="text-center pt-8">
            <button
              onClick={() => navigate('/menu')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D93829] hover:bg-[#B92B1D] text-white font-semibold text-sm rounded-xl transition-all shadow-xl hover:shadow-red-950/40"
            >
              <span>Taste Handcrafted Coffees on the Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
