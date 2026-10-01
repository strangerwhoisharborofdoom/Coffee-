import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { storyService } from '../services/storyService';
import { JournalArticle } from '../types';
import { ArrowLeft, Clock, Share2, Check, User, BookOpen } from 'lucide-react';

export const StoryDetailPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const [story, setStory] = useState<JournalArticle | null>(null);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (params.slug) {
      storyService.getBySlug(params.slug).then(res => {
        if (res) setStory(res);
      });
    }
  }, [params.slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story?.title || 'Café Coffee Day Journal',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-[#0D0907] flex items-center justify-center p-6 text-center text-[#9E8F84]">
        <div className="space-y-4">
          <p className="text-base text-[#F5EDE6]">Article not found.</p>
          <button
            onClick={() => navigate('/stories')}
            className="px-4 py-2 bg-[#D93829] text-white rounded-lg text-xs font-semibold"
          >
            Back to Journal
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Top back bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/stories')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9E8F84] hover:text-[#EDE8E1] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18110D] border border-[#2B1F18] text-xs text-[#DDD2C7] hover:text-white hover:border-[#D93829] transition-colors"
        >
          {shared ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
              <span className="text-[#4ADE80]">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-10 space-y-6">
        <div className="flex items-center gap-2 text-xs text-[#E2B26C] font-semibold uppercase tracking-wider">
          <span>{story.category}</span>
          <span>·</span>
          <span>{story.readTime}</span>
          <span>·</span>
          <span className="text-[#9E8F84]">{story.publishedDate}</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EDE6] leading-tight">
          {story.title}
        </h1>

        <p className="text-base sm:text-lg text-[#DDD2C7] leading-relaxed italic border-l-2 border-[#D93829] pl-4">
          {story.subtitle}
        </p>

        <div className="pt-2 flex items-center gap-3 text-xs text-[#9E8F84] border-t border-[#231710]">
          <div className="w-8 h-8 rounded-full bg-[#1F1712] border border-[#33251D] flex items-center justify-center text-[#E2B26C]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-[#F5EDE6]">{story.author}</div>
            <div className="text-[11px] text-[#7A6C62]">{story.authorRole}</div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#18110D] border border-[#2B1F18] shadow-2xl">
          <img
            src={story.image}
            alt={story.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6 text-[#DDD2C7] text-base leading-relaxed font-sans">
        {story.content.map((paragraph, index) => (
          <p key={index} className="first-letter:text-3xl first-letter:font-serif first-letter:text-[#D93829] first-letter:mr-1">
            {paragraph}
          </p>
        ))}

        {/* Footer info box */}
        <div className="mt-12 p-6 rounded-xl bg-[#140E0A] border border-[#261B15] space-y-2 text-xs text-[#9E8F84]">
          <div className="text-white font-semibold flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#D93829]" />
            <span>Café Coffee Day Heritage Series</span>
          </div>
          <p>
            Café Coffee Day documents the evolution of India's coffee culture, origin terroir, and social history. All articles are verified against Coffee Day Enterprises historical archives.
          </p>
        </div>
      </div>
    </article>
  );
};
