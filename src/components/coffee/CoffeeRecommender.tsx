import React, { useState } from 'react';
import { Product } from '../../types';
import { MENU_PRODUCTS } from '../../data/menu';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { Sparkles, ArrowRight, RotateCcw, Check, Heart } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: { label: string; desc: string; value: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'temperature',
    title: 'How do you like your brew today?',
    subtitle: 'Choose your desired temperature profile',
    options: [
      { label: 'Hot & Steaming', desc: 'Warm comfort, velvety froth & rich aroma', value: 'hot' },
      { label: 'Icy & Refreshing', desc: 'Chilled, blended frappes & crushed ice', value: 'cold' }
    ]
  },
  {
    id: 'strength',
    title: 'What strength matches your vibe?',
    subtitle: 'Intensity of the espresso extraction',
    options: [
      { label: 'Strong & Bold', desc: 'Dark roast, intense crema, punchy kick', value: 'strong' },
      { label: 'Smooth & Balanced', desc: 'Mellow, silky milk, gentle cacao notes', value: 'smooth' }
    ]
  },
  {
    id: 'flavor',
    title: 'Sweet indulgence or pure coffee notes?',
    subtitle: 'Select your preferred palate',
    options: [
      { label: 'Sweet & Indulgent', desc: 'Chocolate fudge, vanilla foam, caramel notes', value: 'sweet' },
      { label: 'Classic & Unsweetened', desc: 'Authentic roasted beans & pure decoction', value: 'classic' }
    ]
  }
];

export const CoffeeRecommender: React.FC = () => {
  const { navigate } = useRouter();
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommended, setRecommended] = useState<Product[] | null>(null);

  const handleSelect = (questionId: string, value: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate recommendation based on real CCD catalogue
      computeRecommendation(updated);
    }
  };

  const computeRecommendation = (ans: Record<string, string>) => {
    let matches: Product[] = [];

    if (ans.temperature === 'cold') {
      if (ans.flavor === 'sweet') {
        matches = MENU_PRODUCTS.filter(p => p.id === 'devils-own' || p.id === 'kaapi-nirvana');
      } else {
        matches = MENU_PRODUCTS.filter(p => p.id === 'cold-sparkle-espresso' || p.id === 'tropical-iceberg');
      }
    } else {
      // Hot
      if (ans.strength === 'strong') {
        if (ans.flavor === 'classic') {
          matches = MENU_PRODUCTS.filter(p => p.id === 'espresso-bold' || p.id === 'south-indian-kaapi');
        } else {
          matches = MENU_PRODUCTS.filter(p => p.id === 'cappuccino-classic' || p.id === 'cafe-mocha');
        }
      } else {
        // Smooth
        if (ans.flavor === 'sweet') {
          matches = MENU_PRODUCTS.filter(p => p.id === 'cafe-mocha' || p.id === 'cafe-latte');
        } else {
          matches = MENU_PRODUCTS.filter(p => p.id === 'cafe-latte' || p.id === 'cappuccino-classic');
        }
      }
    }

    if (matches.length === 0) {
      matches = [MENU_PRODUCTS[0], MENU_PRODUCTS[5]];
    }
    setRecommended(matches);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setRecommended(null);
  };

  return (
    <div className="bg-[#18110D] border border-[#2F221B] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D93829]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
            <Sparkles className="w-4 h-4" />
            <span>Discover Your Cup</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5EDE6]">
            Find Your Café Coffee Day Match
          </h2>
          <p className="text-xs sm:text-sm text-[#9E8F84]">
            Tell us your taste moods in 3 questions. We’ll pour the exact right recommendation.
          </p>
        </div>

        {!recommended ? (
          <div className="space-y-6">
            {/* Step progress bar */}
            <div className="flex items-center justify-between text-xs text-[#9E8F84] mb-4">
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full h-1 bg-[#281D17] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D93829] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Current Question */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-[#F5EDE6]">
                  {QUESTIONS[currentStep].title}
                </h3>
                <p className="text-xs text-[#9E8F84]">
                  {QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {QUESTIONS[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(QUESTIONS[currentStep].id, opt.value)}
                    className="text-left p-4 rounded-xl bg-[#120C09] hover:bg-[#231711] border border-[#2F221B] hover:border-[#D93829] transition-all group space-y-1.5 focus:outline-none"
                  >
                    <div className="font-semibold text-sm text-[#F5EDE6] group-hover:text-[#D93829] transition-colors flex items-center justify-between">
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#D93829]" />
                    </div>
                    <p className="text-xs text-[#9E8F84] leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs text-[#9E8F84] hover:text-[#EDE8E1] transition-colors underline"
              >
                ← Back to previous question
              </button>
            )}
          </div>
        ) : (
          /* Recommended Results */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="p-3 rounded-lg bg-[#251B15] border border-[#3A2E27] text-center text-xs text-[#DDD2C7]">
              Crafted from our actual CCD menu catalogue based on your palate preference.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommended.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#120C09] border border-[#2F221B] rounded-xl p-4 flex flex-col justify-between space-y-3 group hover:border-[#D93829] transition-colors"
                >
                  <div className="space-y-2">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden relative bg-[#1E1510]">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.badge && (
                        <div className="absolute top-2 left-2 bg-[#D93829] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          {item.badge}
                        </div>
                      )}
                    </div>
                    <div className="pt-1">
                      <h4 className="font-semibold text-sm text-[#F5EDE6] group-hover:text-[#D93829] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#9E8F84] line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#261B15] flex items-center justify-between">
                    <span className="text-sm font-bold text-[#E2B26C] tabular-nums">
                      ₹{item.price}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="px-2.5 py-1.5 text-xs text-[#DDD2C7] hover:text-white hover:bg-[#20150F] rounded border border-[#33241A] transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => addItem(item, 1)}
                        className="px-3 py-1.5 bg-[#D93829] hover:bg-[#B92B1D] text-white text-xs font-semibold rounded transition-colors"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs text-[#9E8F84] hover:text-[#EDE8E1] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start over with different preferences</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
