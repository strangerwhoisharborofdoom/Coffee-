import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { CCDLogo } from '../common/CCDLogo';
import { Coffee, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#0A0705] border-t border-[#231710] text-[#9E8F84] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <CCDLogo className="w-9 h-10 drop-shadow" />
              <span className="font-display text-xl font-bold text-[#F5EDE6]">
                Café Coffee Day
              </span>
            </div>
            <p className="text-sm text-[#B3A498] leading-relaxed max-w-sm">
              India's pioneer café network, serving single-origin shade-grown Arabica from the misty hills of Chikmagalur, Karnataka since 1996.
            </p>
            <div className="text-xs text-[#E2B26C] font-serif italic pt-1">
              "A Lot Can Happen Over Coffee"
            </div>
          </div>

          {/* Column: Menu & Coffee */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDD2C7]">
              Menu & Coffee
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('/menu')} className="hover:text-[#F5EDE6] transition-colors">
                  Handcrafted Coffees
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/menu')} className="hover:text-[#F5EDE6] transition-colors">
                  The Devil's Own & Frappes
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/menu')} className="hover:text-[#F5EDE6] transition-colors">
                  Café Bites & Savouries
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/menu')} className="hover:text-[#F5EDE6] transition-colors">
                  Sizzling Brownies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/coffee')} className="hover:text-[#F5EDE6] transition-colors">
                  Chikmagalur Estates
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Cafés & Spaces */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDD2C7]">
              Cafés & Spaces
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('/stores')} className="hover:text-[#F5EDE6] transition-colors">
                  Café Finder (Cities & Highways)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/community')} className="hover:text-[#F5EDE6] transition-colors">
                  Work & Meeting Spaces
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/story')} className="hover:text-[#F5EDE6] transition-colors">
                  Brigade Road 1996 Heritage
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/offers')} className="hover:text-[#F5EDE6] transition-colors">
                  Active Offers & Perks
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/stories')} className="hover:text-[#F5EDE6] transition-colors">
                  The CCD Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Company & Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDD2C7]">
              Company & Care
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('/careers')} className="hover:text-[#F5EDE6] transition-colors">
                  Barista Careers
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#F5EDE6] transition-colors">
                  Customer Care & Support
                </button>
              </li>
              <li>
                <a
                  href="https://www.cafecoffeeday.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#F5EDE6] transition-colors"
                >
                  <span>Official Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#F5EDE6] transition-colors">
                  Store Franchise Inquiries
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C140F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © 1996–{new Date().getFullYear()} Café Coffee Day · Coffee Day Enterprises Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/contact')} className="hover:text-[#DDD2C7] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/contact')} className="hover:text-[#DDD2C7] transition-colors">
              Terms of Service
            </button>
            <button onClick={() => navigate('/contact')} className="hover:text-[#DDD2C7] transition-colors">
              FSSAI Compliance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
