import React, { useState } from 'react';
import BrandAssets from '../../assets/images';
import { useRouter } from '../../context/RouterContext';
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface Stage {
  step: string;
  phase: string;
  title: string;
  quote: string;
  description: string;
  details: string[];
  image: string;
  metric: string;
  metricLabel: string;
}

const STAGES: Stage[] = [
  {
    step: '01',
    phase: 'THE SHADE CANOPY',
    title: 'The High-Grown Chikmagalur Bean',
    quote: '"Seven beans brought by Baba Budan laid the roots of India’s coffee legacy."',
    description: 'Our journey begins 3,500 feet above sea level in the misty Western Ghats of Karnataka. Grown under a natural dual-canopy of native silver oak and jackfruit trees, our Arabica cherries mature slowly, developing rich natural sweetness and delicate citric acidity.',
    details: [
      'Single-origin shade-grown Arabica & Robusta',
      'Hand-picked deep red ripe cherries only',
      'Sustainable rainwater mountain pulping'
    ],
    image: BrandAssets.coffeeEstate,
    metric: '3,500 ft',
    metricLabel: 'Chikmagalur Elevation'
  },
  {
    step: '02',
    phase: 'THE CARAMELIZATION',
    title: 'Master Drum Roasting',
    quote: '"Transforming raw green seeds into aromatic chocolate jewels."',
    description: 'In state-of-the-art Italian drum roasters, each batch undergoes a carefully calibrated roast curve. Heat gently caramelizes bean sugars, unlocking complex notes of toasted hazelnut, baker’s cocoa, and warming Indian spices.',
    details: [
      'Profile-calibrated drum roast curves',
      'Continuous air-cooling to preserve volatile aromatics',
      'Sealed in one-way degassing valve bags'
    ],
    image: BrandAssets.craftPour,
    metric: '215°C',
    metricLabel: 'Peak Crack Temperature'
  },
  {
    step: '03',
    phase: 'THE EXTRACTION',
    title: 'Precision Grinding & 9-Bar Pull',
    quote: '"7 grams of freshly ground coffee pulled in 25 golden seconds."',
    description: 'Freshly ground to order on micro-stepped conical burrs. Pressurized water at exactly 92°C forces through the compacted coffee puck at 9 bars of pressure, extracting rich soluble oils and forming a thick, persistent golden-hazelnut crema.',
    details: [
      'Micro-timed 25–28 second extraction window',
      'Dense golden-brown tiger-stripe crema',
      'Full-bodied mouthfeel with zero lingering bitterness'
    ],
    image: BrandAssets.heroCinematic,
    metric: '9 Bar',
    metricLabel: 'Espresso Bar Pressure'
  },
  {
    step: '04',
    phase: 'THE HANDCRAFTED POUR',
    title: 'The Iconic Café Coffee Day Cup',
    quote: '"Velvety micro-foam meets intense espresso in our signature ceramic."',
    description: 'Whether it is a classic Cappuccino with dense foam, a silky Café Latte, or our legendary cold Devil’s Own, our trained baristas pour every cup with meticulous care and craft.',
    details: [
      'Silky 65°C textured micro-foam',
      'Signature CCD Crimson ceramic presentation',
      'Artisanal chocolate dusting or latte art'
    ],
    image: BrandAssets.craftPour,
    metric: '1000+',
    metricLabel: 'Trained Baristas Daily'
  },
  {
    step: '05',
    phase: 'THE HUMAN CONNECTION',
    title: 'A Lot Can Happen Over Coffee',
    quote: '"From college dreams to unicorn startup pitches, India met over CCD."',
    description: 'The cup is only the catalyst. Across over two hundred Indian cities and highway stops, Café Coffee Day has served as the backdrop for million-dollar startup pitches, first dates, thesis writing, and lifelong friendships. This is India’s authentic Third Place.',
    details: [
      'Quiet corners with high-speed Wi-Fi and power',
      'Welcoming ambiance for work, study, or reunion',
      'Unbroken tradition of community since 1996'
    ],
    image: BrandAssets.cafeAmbience,
    metric: '1996',
    metricLabel: 'Year of First Cup'
  }
];

export const TheCCDExperience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { navigate } = useRouter();
  const current = STAGES[activeIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#0D0907] relative border-y border-[#261B15] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#261B15] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
              <Sparkles className="w-4 h-4" />
              <span>Estate Science & Barista Craftsmanship</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EDE6]">
              5-Stage Interactive Coffee Workshop
            </h2>
          </div>
          <p className="text-sm text-[#9E8F84] max-w-md">
            Dive into the precision roasting curves, 9-bar extraction dynamics, and micro-texturing behind every handcrafted beverage.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveIndex(idx)}
                className={`text-left p-3 sm:p-4 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-[#1C130E] border-[#D93829] shadow-lg shadow-red-950/20'
                    : 'bg-[#140E0A] border-[#2A1E17] hover:border-[#3E2B21]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#D93829]' : 'text-[#7A6C62]'}`}>
                    {stage.step}
                  </span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#D93829]" />}
                </div>
                <div className="hidden sm:block text-xs font-semibold text-[#F5EDE6] truncate">
                  {stage.phase}
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Content Card */}
        <div className="bg-[#140E0A] border border-[#2B1F18] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
          {/* Visual Side */}
          <div className="lg:col-span-6 relative overflow-hidden bg-[#1E1510] min-h-[300px] lg:min-h-full">
            <img
              src={current.image}
              alt={current.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A] via-transparent to-black/30" />
            
            {/* Metric pill */}
            <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-[#0D0907]/90 backdrop-blur-md border border-[#3A2E27] space-y-1">
              <div className="font-mono text-2xl font-bold text-[#E2B26C] tabular-nums">
                {current.metric}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#DDD2C7]">
                {current.metricLabel}
              </div>
            </div>
          </div>

          {/* Description Side */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D93829]">
                  Stage {current.step} — {current.phase}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5EDE6]">
                  {current.title}
                </h3>
              </div>

              <blockquote className="text-sm italic text-[#C89058] border-l-2 border-[#D93829] pl-3 py-0.5">
                {current.quote}
              </blockquote>

              <p className="text-sm text-[#DDD2C7] leading-relaxed">
                {current.description}
              </p>

              {/* Verified Details */}
              <div className="space-y-2 pt-2">
                {current.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2.5 text-xs text-[#9E8F84]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D93829] shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage controls & CTA */}
            <div className="pt-6 border-t border-[#261B15] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeIndex === 0}
                  onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                  className="p-2.5 rounded-lg border border-[#3A2E27] text-[#DDD2C7] hover:text-white disabled:opacity-30 disabled:hover:text-[#DDD2C7] hover:bg-[#1E1510] transition-colors"
                  aria-label="Previous Stage"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={activeIndex === STAGES.length - 1}
                  onClick={() => setActiveIndex(prev => Math.min(STAGES.length - 1, prev + 1))}
                  className="p-2.5 rounded-lg border border-[#3A2E27] text-[#DDD2C7] hover:text-white disabled:opacity-30 disabled:hover:text-[#DDD2C7] hover:bg-[#1E1510] transition-colors"
                  aria-label="Next Stage"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-[#9E8F84] ml-2">
                  {activeIndex + 1} / {STAGES.length}
                </span>
              </div>

              <button
                onClick={() => navigate('/coffee')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D93829] hover:bg-[#B92B1D] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                <span>Read Full Coffee Origin Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
