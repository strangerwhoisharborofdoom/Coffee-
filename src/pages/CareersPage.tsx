import React, { useState } from 'react';
import { Briefcase, Award, CheckCircle2, Send, Coffee, Users, MapPin } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState('Barista & Coffee Specialist');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const careerTracks = [
    {
      title: 'Certified Barista & Brewing Specialist',
      department: 'Store Operations',
      locations: 'Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata',
      desc: 'Master the espresso machine, craft latte art, and deliver the signature CCD experience. Full training provided at our Barista Training Academy.'
    },
    {
      title: 'Café General Manager',
      department: 'Hospitality Leadership',
      locations: 'Major Metros & Highway Food Plazas',
      desc: 'Lead a team of hospitality professionals, manage store inventory and revenue, and maintain uncompromising quality standards.'
    },
    {
      title: 'Quality & Coffee Cupping Specialist',
      department: 'Agronomy & Roasting',
      locations: 'Chikmagalur, Karnataka',
      desc: 'Work directly with plantation growers and roasting facilities to evaluate green bean quality, moisture levels, and cup cupping scores.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Header */}
      <div className="bg-[#140E0A] border-b border-[#261B15] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
            <Briefcase className="w-4 h-4" />
            <span>Careers at Café Coffee Day</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EDE6]">
            Craft the Future of Indian Coffee
          </h1>
          <p className="text-sm sm:text-base text-[#9E8F84] max-w-2xl leading-relaxed">
            Join the team that built India’s café culture from the ground up. We train, nurture, and celebrate coffee professionals across the country.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Open Roles */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#F5EDE6]">
            Open Career Tracks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerTracks.map((trk) => (
              <div
                key={trk.title}
                className="p-6 rounded-2xl bg-[#140E0A] border border-[#2B1F18] flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="text-[11px] font-semibold text-[#D93829] uppercase tracking-wider">
                    {trk.department}
                  </div>
                  <h3 className="font-semibold text-lg text-[#F5EDE6]">
                    {trk.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#9E8F84]">
                    <MapPin className="w-3.5 h-3.5 text-[#C89058] shrink-0" />
                    <span>{trk.locations}</span>
                  </div>
                  <p className="text-xs text-[#DDD2C7] leading-relaxed pt-1">
                    {trk.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setRole(trk.title);
                    window.scrollTo({ top: 700, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 bg-[#251B15] hover:bg-[#32231B] text-[#DDD2C7] text-xs font-semibold rounded-lg border border-[#3A2E27] transition-colors"
                >
                  Apply for this Role
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto bg-[#140E0A] border border-[#2B1F18] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold text-[#F5EDE6]">
              Submit Your Expression of Interest
            </h3>
            <p className="text-xs text-[#9E8F84]">
              Selected candidates are invited for in-person evaluations and sensory training at our regional hubs.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-[#1B291A] border border-[#2B442A] text-center space-y-2 text-[#86EFAC]">
              <CheckCircle2 className="w-10 h-10 mx-auto text-[#4ADE80]" />
              <div className="font-semibold text-base">Application Received!</div>
              <p className="text-xs text-[#DDD2C7]">
                Thank you for applying for the role of <strong>{role}</strong>. Our human resources talent team will review your credentials and contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Applying For</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Preferred City</label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru, Mumbai"
                    className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Coffee Experience & Statement</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your background and passion for coffee..."
                  className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D93829] hover:bg-[#B92B1D] text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
              >
                <Send className="w-4 h-4" />
                <span>Submit Application to CCD Careers</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
