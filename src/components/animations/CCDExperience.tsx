import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import BrandAssets from '../../assets/images';
import { CCDLogo } from '../common/CCDLogo';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight, MapPin, Sparkles, ChevronDown, Coffee, Users } from 'lucide-react';

export const CCDExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigate } = useRouter();

  // 300vh scroll container for 3 distinct 100vh narrative acts
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring physics for smooth scroll animation interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });

  // Track active narrative phase for indicator pills
  const [activePhase, setActivePhase] = useState<'bean' | 'cup' | 'connection'>('bean');

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v < 0.35) {
        setActivePhase('bean');
      } else if (v < 0.68) {
        setActivePhase('cup');
      } else {
        setActivePhase('connection');
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Phase 1 (Single Coffee Bean) Transforms
  const beanOpacity = useTransform(smoothProgress, [0, 0.25, 0.38], [1, 1, 0]);
  const beanScale = useTransform(smoothProgress, [0, 0.32], [1, 1.3]);
  const beanRotate = useTransform(smoothProgress, [0, 0.35], [0, 28]);
  const beanTextOpacity = useTransform(smoothProgress, [0, 0.22, 0.34], [1, 1, 0]);
  const beanTextY = useTransform(smoothProgress, [0, 0.26], [0, -32]);

  // Phase 2 (Poured Cup with Crema) Transforms
  const cupOpacity = useTransform(smoothProgress, [0.28, 0.38, 0.62, 0.72], [0, 1, 1, 0]);
  const cupScale = useTransform(smoothProgress, [0.28, 0.45, 0.65], [0.9, 1, 1.05]);
  const cupTextOpacity = useTransform(smoothProgress, [0.32, 0.42, 0.6, 0.7], [0, 1, 1, 0]);
  const cupTextY = useTransform(smoothProgress, [0.32, 0.45], [30, 0]);
  const pourHeight = useTransform(smoothProgress, [0.32, 0.48], ['0%', '100%']);

  // Phase 3 (Bustling Café Atmosphere) Transforms
  const cafeOpacity = useTransform(smoothProgress, [0.65, 0.78, 1], [0, 1, 1]);
  const cafeScale = useTransform(smoothProgress, [0.65, 1], [1.12, 1]);
  const cafeTextOpacity = useTransform(smoothProgress, [0.72, 0.84, 1], [0, 1, 1]);
  const cafeTextY = useTransform(smoothProgress, [0.72, 0.86], [30, 0]);

  // Quick scroll helper
  const scrollToStage = (progressTarget: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const effectiveViewportHeight = window.innerHeight - 80;
    const scrollableDistance = containerRef.current.offsetHeight - effectiveViewportHeight;
    const targetScrollY = containerTop + scrollableDistance * progressTarget;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] bg-[#0D0907] text-[#EDE8E1]"
      id="ccd-experience"
    >
      {/* Sticky Frame: Sits cleanly under the 80px Navbar */}
      <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden flex flex-col justify-between">
        {/* Layer 1: Ambient Roast Backdrop */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#D93829]/10 blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#C89058]/10 blur-[130px]" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0D0907]/40 to-[#0D0907]/90" />
        </div>

        {/* Top Floating Brand Anchor */}
        <div className="relative z-40 px-4 sm:px-6 pt-3 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 text-xs text-[#DDD2C7]">
            <CCDLogo className="w-4 h-5" />
            <span className="font-mono uppercase tracking-wider text-[11px]">The CCD Experience</span>
          </div>
          <div className="text-xs font-mono text-[#7A6C62] hidden sm:block">
            Scroll-Driven Journey
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 01: THE COFFEE BEAN (From Chikmagalur Estates) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: beanOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center z-10 pointer-events-none"
        >
          {/* Visual: Tactile Macro Roasted Bean */}
          <motion.div
            style={{ scale: beanScale, rotate: beanRotate }}
            className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-3 sm:mb-5 flex items-center justify-center pointer-events-auto"
          >
            {/* Glowing Golden Corona */}
            <div className="absolute inset-0 rounded-full bg-[#E2B26C]/15 blur-xl animate-pulse" />

            {/* Macro Bean Sphere Container */}
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-2xl border border-[#3A2E27]/80 bg-[#160E0A] flex items-center justify-center group">
              <img
                src={BrandAssets.macroBean}
                alt="Single roasted Arabica coffee bean from Chikmagalur"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0D0907]/60 via-transparent to-amber-500/20" />
            </div>

            {/* Floating Aroma Particles */}
            {[
              { top: '15%', left: '20%', delay: 0 },
              { top: '28%', right: '16%', delay: 0.7 },
              { bottom: '24%', left: '19%', delay: 1.3 },
              { top: '12%', right: '27%', delay: 2.0 }
            ].map((pt, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-6, 6, -6],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.9, 1.2, 0.9]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: pt.delay
                }}
                style={{ top: pt.top, left: pt.left, right: pt.right, bottom: pt.bottom }}
                className="absolute w-2 h-2 rounded-full bg-[#E2B26C]/60 blur-[1px]"
              />
            ))}
          </motion.div>

          {/* Typography for Stage 1 */}
          <motion.div
            style={{ y: beanTextY, opacity: beanTextOpacity }}
            className="max-w-2xl mx-auto space-y-3 px-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18110D]/90 border border-[#3A2E27] backdrop-blur-md text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#E2B26C]">
              <Sparkles className="w-3.5 h-3.5 text-[#D93829]" />
              <span>Stage 01 · Single Origin Terroir</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5EDE6] leading-[1.1]">
              FROM BEAN.
            </h2>

            <p className="text-xs sm:text-sm text-[#DDD2C7] max-w-lg mx-auto leading-relaxed">
              3,500 feet above the Western Ghats in Chikmagalur, Karnataka. Hand-picked ripe Arabica cherries mature slowly under a native two-tier forest canopy.
            </p>

            <div className="pt-1 text-[11px] sm:text-xs font-mono text-[#9E8F84] tracking-wide">
              Misty Hills · Volcanic Red Soil · Shade Canopy
            </div>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* STAGE 02: THE POURED CUP (9-Bar Pressure Barista Pull) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: cupOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center z-20 pointer-events-none"
        >
          {/* Visual: Steaming Artisanal Pour & Cup */}
          <motion.div
            style={{ scale: cupScale }}
            className="relative w-52 h-52 sm:w-72 sm:h-72 mx-auto mb-3 sm:mb-4 flex items-center justify-center pointer-events-auto"
          >
            <div className="absolute inset-0 rounded-full bg-[#D93829]/20 blur-2xl animate-pulse" />

            {/* Animated Pour Stream */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1.5 z-20 h-24 overflow-hidden pointer-events-none">
              <motion.div
                style={{ height: pourHeight }}
                className="w-full bg-gradient-to-b from-[#E2B26C] via-[#C89058] to-[#603813] rounded-full shadow-[0_0_10px_rgba(226,178,108,0.8)]"
              />
            </div>

            {/* Cup Photography Container */}
            <div className="relative w-44 h-44 sm:w-60 sm:h-60 rounded-2xl overflow-hidden shadow-2xl border border-[#3A2E27] bg-[#140E0A]">
              <img
                src={BrandAssets.craftPour}
                alt="Artisanal espresso pour creating crema and latte art"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0907]/70 via-transparent to-transparent" />
            </div>

            {/* Extraction Spec Badge */}
            <div className="absolute -bottom-2 right-2 sm:right-4 px-2.5 py-1 rounded-lg bg-[#0D0907]/90 border border-[#3A2E27] text-left text-xs shadow-xl backdrop-blur-md">
              <div className="text-[9px] text-[#9E8F84] uppercase font-mono">Dose & Pull</div>
              <div className="font-bold text-[#E2B26C] font-mono text-[11px] tabular-nums">7g · 9 Bar · 25s</div>
            </div>
          </motion.div>

          {/* Typography for Stage 2 */}
          <motion.div
            style={{ y: cupTextY, opacity: cupTextOpacity }}
            className="max-w-2xl mx-auto space-y-3 px-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18110D]/90 border border-[#3A2E27] backdrop-blur-md text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#E2B26C]">
              <Coffee className="w-3.5 h-3.5 text-[#D93829]" />
              <span>Stage 02 · Master Extraction</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5EDE6] leading-[1.1]">
              TO CUP.
            </h2>

            <p className="text-xs sm:text-sm text-[#DDD2C7] max-w-lg mx-auto leading-relaxed">
              Ground fresh on precision burrs and extracted under 9 bars of hydraulic pressure. Velvety steamed micro-foam crowns intense espresso in our signature ceramic.
            </p>

            <div className="pt-1 text-[11px] sm:text-xs font-mono text-[#9E8F84] tracking-wide">
              Italian Drum Roasted · Golden Crema · Silky Microfoam
            </div>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* STAGE 03: CAFÉ ATMOSPHERE (Bustling Indian Café & Connection) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: cafeOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center z-30"
        >
          {/* Ambient Background Visual: Bustling Café Space */}
          <motion.div
            style={{ scale: cafeScale }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <img
              src={BrandAssets.cafeAmbience}
              alt="Warm vibrant Café Coffee Day bustling urban interior"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0907] via-[#0D0907]/80 to-black/60" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0D0907]/50 to-[#0D0907]/95" />
          </motion.div>

          {/* Content for Stage 3 */}
          <motion.div
            style={{ y: cafeTextY, opacity: cafeTextOpacity }}
            className="relative z-10 max-w-3xl mx-auto space-y-4 px-4"
          >
            {/* Official Logo */}
            <div className="flex justify-center">
              <CCDLogo className="w-12 h-14 sm:w-16 sm:h-18 drop-shadow-2xl hover:scale-105 transition-transform" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18110D]/90 border border-[#3A2E27] backdrop-blur-md text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#E2B26C] shadow-lg">
              <Users className="w-3.5 h-3.5 text-[#D93829]" />
              <span>Stage 03 · India's Authentic Third Place</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5EDE6] leading-[1.08] text-balance">
              TO CONNECTION.
            </h1>

            <p className="text-xs sm:text-base text-[#DDD2C7] max-w-xl mx-auto font-sans leading-relaxed">
              From Brigade Road in 1996 to thousands of daily conversations across India. Million-dollar startup pitches, first dates, and timeless reunions.
            </p>

            <div className="text-xs sm:text-sm font-serif italic text-[#C89058] tracking-wide">
              "A Lot Can Happen Over Coffee"
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate('/menu')}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#D93829] hover:bg-[#B92B1D] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xl hover:shadow-red-950/50 flex items-center justify-center gap-2 group"
              >
                <span>Explore Master Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/stores')}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#1C130E]/90 hover:bg-[#281D17] text-[#EDE8E1] border border-[#3A2E27] font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MapPin className="w-4 h-4 text-[#C89058]" />
                <span>Find Nearest Café</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Floating Navigation & Phase Indicators */}
        <div className="relative z-40 px-4 sm:px-6 pb-3 sm:pb-4 flex items-center justify-between">
          {/* Scroll progress cue */}
          <div className="flex items-center gap-2 text-xs text-[#9E8F84]">
            <ChevronDown className="w-4 h-4 text-[#D93829] animate-bounce" />
            <span className="hidden sm:inline">Scroll to transform from Bean to Cup to Connection</span>
            <span className="sm:hidden">Scroll to experience</span>
          </div>

          {/* Interactive Phase Indicator Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#140E0A]/90 border border-[#2F221B] rounded-xl backdrop-blur-md shadow-2xl">
            <button
              onClick={() => scrollToStage(0.05)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activePhase === 'bean'
                  ? 'bg-[#D93829] text-white shadow'
                  : 'text-[#9E8F84] hover:text-[#EDE8E1]'
              }`}
            >
              <span>01</span>
              <span className="hidden md:inline">Bean</span>
            </button>
            <button
              onClick={() => scrollToStage(0.48)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activePhase === 'cup'
                  ? 'bg-[#D93829] text-white shadow'
                  : 'text-[#9E8F84] hover:text-[#EDE8E1]'
              }`}
            >
              <span>02</span>
              <span className="hidden md:inline">Cup</span>
            </button>
            <button
              onClick={() => scrollToStage(0.95)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activePhase === 'connection'
                  ? 'bg-[#D93829] text-white shadow'
                  : 'text-[#9E8F84] hover:text-[#EDE8E1]'
              }`}
            >
              <span>03</span>
              <span className="hidden md:inline">Connection</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCDExperience;
