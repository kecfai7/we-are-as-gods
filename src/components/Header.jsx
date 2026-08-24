import React from 'react';
import { Sparkles, Globe, Search, BookOpen, Compass, Activity, Award, Maximize2 } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, lang, setLang, searchQuery, setSearchQuery }) {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="glass-nav sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-[var(--border-subtle)]">
      <div className="flex items-center gap-8">
        {/* Course Logo */}
        <div 
          onClick={() => setActiveTab('curriculum')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-[2px] shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0A0E17] rounded-[10px] flex items-center justify-center font-extrabold text-cyan-400 text-sm tracking-wider">
              701
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold font-['Syne'] text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                WE ARE AS GODS
              </span>
              <span className="badge badge-cyan text-[10px] px-2 py-0.5">EXPO-701</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              {lang === 'en' ? 'Survival Guide for the Age of Abundance' : '기하급수 기술과 풍요의 설계도'}
            </div>
          </div>
        </div>

        {/* Main Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[rgba(255,255,255,0.03)] p-1 rounded-xl border border-[var(--border-subtle)]">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'curriculum' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? '15-Week Curriculum' : '15주 커리큘럼'}</span>
          </button>

          <button
            onClick={() => setActiveTab('miracles')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'miracles' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? '83 Miracles Database' : '83대 기적 백과'}</span>
          </button>

          <button
            onClick={() => setActiveTab('simulators')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'simulators' 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Interactive Simulators' : '시뮬레이터'}</span>
          </button>

          <button
            onClick={() => setActiveTab('xprize')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'xprize' 
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_12px_rgba(139,92,246,0.25)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? '$100B Giga-XPRIZE' : '$100B 엑스프라이즈'}</span>
          </button>
        </nav>
      </div>

      {/* Right Controls: Search, Lang, Fullscreen */}
      <div className="flex items-center gap-3">
        {/* Search input */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search slides, formulas, cases...' : '슬라이드, 수식, 케이스 검색...'}
            className="bg-[rgba(255,255,255,0.05)] border border-[var(--border-subtle)] focus:border-cyan-400 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none w-56 transition-all"
          />
        </div>

        {/* Language Switcher */}
        <button
          onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-[var(--border-subtle)] hover:border-cyan-400 text-xs font-bold text-slate-300 hover:text-white transition-all"
          title="Toggle English / Korean"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'en' ? 'EN' : 'KO'}</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullScreen}
          className="p-2 rounded-xl bg-white/5 border border-[var(--border-subtle)] hover:border-cyan-400 text-slate-400 hover:text-white transition-all"
          title="Toggle Fullscreen Mode"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
