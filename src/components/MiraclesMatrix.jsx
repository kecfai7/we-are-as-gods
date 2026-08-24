import React, { useState } from 'react';
import { miraclesCategories, miraclesList } from '../data/miraclesData';
import { Sparkles, Search, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export default function MiraclesMatrix({ lang, onSelectSession }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMiracles = miraclesList.filter((m) => {
    const matchCat = activeCategory === 'all' || m.category === activeCategory;
    const matchSearch = searchQuery === '' || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.nameKo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.impact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'en' ? 'Theurgicon Technology Inventory' : '테우르기콘 기하급수 기술 인벤토리'}</span>
          </div>
          <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl text-white">
            {lang === 'en' ? '83 Miracles of Technology Matrix' : '83대 기적의 기술 데이터베이스'}
          </h2>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Filter miracles...' : '기적의 기술 검색...'}
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--border-subtle)] focus:border-emerald-400 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {miraclesCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                : 'glass-panel text-slate-300 hover:text-white hover:border-emerald-500/40'
            }`}
          >
            {lang === 'en' ? cat.name : cat.nameKo}
          </button>
        ))}
      </div>

      {/* Miracles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMiracles.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-6 flex flex-col justify-between group hover:scale-[1.01] hover:border-emerald-500/50 transition-all relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  MIRACLE #{item.id < 10 ? `0${item.id}` : item.id}
                </span>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  {item.session}
                </span>
              </div>

              <h3 className="font-['Outfit'] font-bold text-base text-white group-hover:text-emerald-300 transition-colors mb-1">
                {lang === 'en' ? item.name : item.nameKo}
              </h3>

              <div className="text-[11px] text-emerald-400 font-mono font-bold mb-3">
                ⚡ Key Metric: {item.metric}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {item.impact}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px] font-medium">
                Status: <strong className="text-slate-300 font-semibold">{item.maturity}</strong>
              </span>
              <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read in Course →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
