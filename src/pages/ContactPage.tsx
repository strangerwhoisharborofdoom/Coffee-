import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Building, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Header */}
      <div className="bg-[#140E0A] border-b border-[#261B15] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
            <Building className="w-4 h-4" />
            <span>Café Coffee Day Help & Corporate</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EDE6]">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-[#9E8F84] max-w-2xl leading-relaxed">
            Reach out to our customer experience team, corporate headquarters in Bengaluru, or explore franchise and institutional coffee solutions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="p-6 rounded-2xl bg-[#140E0A] border border-[#2B1F18] space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
                <MapPin className="w-4 h-4" />
                <span>Corporate Headquarters</span>
              </div>
              <div>
                <h3 className="font-semibold text-base text-[#F5EDE6]">
                  Coffee Day Enterprises Ltd.
                </h3>
                <p className="text-xs text-[#DDD2C7] leading-relaxed mt-1">
                  Coffee Day Square, 23/2 Vittal Mallya Road,<br />
                  Bengaluru — 560 001, Karnataka, India
                </p>
              </div>
            </div>

            {/* Helpline Card */}
            <div className="p-6 rounded-2xl bg-[#140E0A] border border-[#2B1F18] space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C89058]">
                <Phone className="w-4 h-4" />
                <span>Customer Care & Feedback</span>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-[#F5EDE6]">
                  Toll Free Hotline: 1800 102 5333
                </div>
                <div className="text-xs text-[#9E8F84]">
                  Operational Monday to Saturday: 9:00 AM – 7:00 PM IST
                </div>
              </div>
            </div>

            {/* Email Inquiries */}
            <div className="p-6 rounded-2xl bg-[#140E0A] border border-[#2B1F18] space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E2B26C]">
                <Mail className="w-4 h-4" />
                <span>Direct Inquiries</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#9E8F84] block">Guest Feedback:</span>
                  <a href="mailto:customercare@cafecoffeeday.com" className="font-mono text-[#DDD2C7] hover:text-[#D93829]">
                    customercare@cafecoffeeday.com
                  </a>
                </div>
                <div>
                  <span className="text-[#9E8F84] block">Franchise & Institutional:</span>
                  <a href="mailto:business@cafecoffeeday.com" className="font-mono text-[#DDD2C7] hover:text-[#D93829]">
                    business@cafecoffeeday.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-[#140E0A] border border-[#2B1F18] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-[#F5EDE6]">
                Send Us a Note
              </h2>
              <p className="text-xs text-[#9E8F84]">
                Share your café experience, compliment a barista, or ask us any questions about our coffees.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-[#1B291A] border border-[#2B442A] text-center space-y-3 text-[#86EFAC]">
                <CheckCircle2 className="w-12 h-12 mx-auto text-[#4ADE80]" />
                <div className="font-semibold text-lg">Thank You for Reaching Out</div>
                <p className="text-xs text-[#DDD2C7] max-w-md mx-auto">
                  Your message has been logged with our customer experience team. We respond to all inquiries within 24 to 48 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Inquiry Subject</label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                    >
                      <option value="experience">Café Experience & Feedback</option>
                      <option value="order">Order & Pickup Support</option>
                      <option value="business">Franchise & Institutional Coffee</option>
                      <option value="corporate">Media & Corporate Relations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#DDD2C7] block mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-3.5 py-2.5 bg-[#18110D] border border-[#2F221B] rounded-lg text-xs text-[#F5EDE6] focus:outline-none focus:border-[#D93829]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D93829] hover:bg-[#B92B1D] text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Café Coffee Day</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
