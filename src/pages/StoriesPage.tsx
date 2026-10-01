import React from 'react';
import { STORIES_DATA } from '../data/stories';
import { useRouter } from '../context/RouterContext';
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react';

export const StoriesPage: React.FC = () => {
  const { navigate } = useRouter();
  const featured = STORIES_DATA[0];
  const others = STORIES_DATA.slice(1);

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Header */}
      <div className="bg-[#140E0A] border-b border-[#261B15] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
            <BookOpen className="w-4 h-4" />
            <span>The Café Coffee Day Journal</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EDE6]">
            Dispatches on Coffee, Culture & India
          </h1>
          <p className="text-sm sm:text-base text-[#9E8F84] max-w-2xl leading-relaxed">
            Stories from our high-altitude coffee estates in Chikmagalur, barista craft revelations, and essays on how modern India gathers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Featured Story */}
        {featured && (
          <div
            onClick={() => navigate(`/stories/${featured.slug}`)}
            className="bg-[#140E0A] border border-[#2B1F18] hover:border-[#D93829]/60 rounded-2xl overflow-hidden cursor-pointer shadow-2xl grid grid-cols-1 lg:grid-cols-12 group transition-all"
          >
            <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto bg-[#1C130E] overflow-hidden min-h-[320px]">
              <img
                src={featured.image}
                alt={featured.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A] via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#E2B26C] font-semibold uppercase tracking-wider">
                  <span>{featured.category}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5EDE6] group-hover:text-[#D93829] transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-sm text-[#DDD2C7] leading-relaxed line-clamp-3">
                  {featured.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#261B15] flex items-center justify-between text-xs text-[#9E8F84]">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#C89058]" />
                  <span>{featured.author}</span>
                </div>
                <span className="text-[#D93829] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Article →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Editorial Grid */}
        <div className="space-y-6">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5EDE6]">
            More From the Journal
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {others.map((story) => (
              <div
                key={story.slug}
                onClick={() => navigate(`/stories/${story.slug}`)}
                className="bg-[#140E0A] border border-[#2B1F18] hover:border-[#D93829]/60 rounded-xl overflow-hidden cursor-pointer flex flex-col justify-between space-y-4 group transition-all shadow-lg"
              >
                <div className="aspect-[16/9] bg-[#1C130E] overflow-hidden relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded">
                    {story.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs text-[#9E8F84]">
                      {story.publishedDate} · {story.readTime}
                    </div>
                    <h4 className="font-display text-xl font-bold text-[#F5EDE6] group-hover:text-[#D93829] transition-colors leading-snug">
                      {story.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#DDD2C7] line-clamp-2 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#231710] flex items-center justify-between text-xs">
                    <span className="text-[#9E8F84]">{story.author}</span>
                    <span className="text-[#C89058] font-medium group-hover:underline">
                      Read Story →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
