import React, { useState } from 'react';
import { OFFERS_DATA } from '../data/stories';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { Tag, Sparkles, Check, Copy, ArrowRight, ShieldCheck } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { applyPromo, setIsCartOpen } = useCart();
  const { navigate } = useRouter();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard?.writeText?.(code);
    setCopiedCode(code);
    applyPromo(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Header */}
      <div className="bg-[#140E0A] border-b border-[#261B15] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
            <Tag className="w-4 h-4" />
            <span>Café Moments & Rewards</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EDE6]">
            Exclusive Coffee Perks & Offers
          </h1>
          <p className="text-sm sm:text-base text-[#9E8F84] max-w-2xl leading-relaxed">
            Special discounts, welcome privileges, and sunset frappe perks crafted for our community of coffee lovers across India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERS_DATA.map((offer) => {
            const isCopied = copiedCode === offer.code;
            return (
              <div
                key={offer.id}
                className="bg-[#140E0A] border border-[#2B1F18] hover:border-[#D93829]/60 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group transition-all"
              >
                {offer.highlight && (
                  <div className="absolute top-0 right-0 bg-[#D93829] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Special Perk
                  </div>
                )}

                <div className="space-y-3">
                  <div className="text-2xl font-display font-bold text-[#E2B26C]">
                    {offer.discount}
                  </div>
                  <h3 className="font-semibold text-lg text-[#F5EDE6]">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#DDD2C7] leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#231710]">
                  {/* Code box */}
                  <div className="p-3 rounded-xl bg-[#1C130E] border border-[#2F221B] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#9E8F84]">Coupon Code</div>
                      <div className="font-mono text-sm font-bold text-[#F5EDE6] tracking-wider">
                        {offer.code}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyAndApply(offer.code)}
                      className="px-3 py-1.5 bg-[#251B15] hover:bg-[#32231B] text-xs font-semibold text-[#DDD2C7] rounded-lg border border-[#3A2E27] transition-colors flex items-center gap-1.5"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                          <span className="text-[#4ADE80]">Applied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Apply</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-[11px] text-[#7A6C62] leading-tight space-y-1">
                    <div>Validity: {offer.validTill}</div>
                    <div>Terms: {offer.terms}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CCD Rewards Club Teaser */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#18110D] border border-[#2B1F18] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E2B26C]">
              <Sparkles className="w-4 h-4" />
              <span>Café Coffee Day Rewards Programme</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#F5EDE6]">
              Earn Sips on Every Visit
            </h3>
            <p className="text-xs sm:text-sm text-[#9E8F84] leading-relaxed">
              Every ₹100 spent unlocks reward points redeemable for complimentary espressos, birthday brownie upgrades, and seasonal origin tastings across India.
            </p>
          </div>

          <button
            onClick={() => {
              navigate('/menu');
              setIsCartOpen(true);
            }}
            className="px-6 py-3 bg-[#D93829] hover:bg-[#B92B1D] text-white font-semibold text-xs rounded-xl transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>Start an Order & Earn Points</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
