import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, BookOpen, Users, Award } from 'lucide-react';
import { courseMetadata } from '../data/courseOverview';

export default function HeroBanner({ lang, onSelectPhase, onExploreClick }) {
  return (
    <section className="relative pt-12 pb-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/15 via-purple-600/15 to-emerald-500/10 blur-[120px] pointer-events-none -z-10" />

      {/* Main Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Official Graduate Seminar Portal' : '대학원 공식 마스터 세미나 포털'}</span>
        </div>

        <h1 className="font-['Syne'] font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] mb-6">
          <span className="text-white">WE ARE AS </span>
          <span className="gradient-text-cyan">GODS</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
          {lang === 'en' 
            ? 'A 15-week master blueprint for engineering planetary abundance, bio-hybrid consciousness, and conquering existential crises in the exponential era.'
            : '83가지 기적의 기술과 6D 프레임워크, 3중 실존적 침투 위기 해독, 그리고 1,000억 달러 Giga-XPRIZE로 완성하는 기하급수 풍요의 마스터 아키텍처.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={onExploreClick}
            className="btn-primary flex items-center gap-2"
          >
            <span>{lang === 'en' ? 'Explore 15-Week Lectures' : '15주 강의 탐색하기'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href="#faculty"
            className="btn-secondary flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>{lang === 'en' ? 'Meet the 3 Faculty' : '3인 교수진 프로필'}</span>
          </a>
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto">
          <div className="glass-panel p-4 text-center">
            <div className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-cyan-400">15</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">{lang === 'en' ? 'Weeks of Mastery' : '15주 마스터 커리큘럼'}</div>
          </div>
          <div className="glass-panel p-4 text-center">
            <div className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-emerald-400">675</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">{lang === 'en' ? 'Interactive Slides' : '전체 슬라이드 완비'}</div>
          </div>
          <div className="glass-panel p-4 text-center">
            <div className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-purple-400">83</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">{lang === 'en' ? 'Miracles Cataloged' : '기적의 기술 목록'}</div>
          </div>
          <div className="glass-panel p-4 text-center">
            <div className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-amber-400">$100B</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">{lang === 'en' ? 'Giga-XPRIZE Purse' : '엑스프라이즈 상금'}</div>
          </div>
        </div>
      </div>

      {/* 4 Phases Showcase Cards */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>{lang === 'en' ? 'The 4 Evolutionary Phases' : '4대 진화 페이즈 로드맵'}</span>
          </h2>
          <span className="text-xs text-slate-400">{lang === 'en' ? 'Click to filter lectures' : '페이즈를 클릭하여 필터링'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {courseMetadata.phases.map((phase) => (
            <div
              key={phase.id}
              onClick={() => onSelectPhase(phase.phaseNumber)}
              className="glass-panel p-6 cursor-pointer group hover:scale-[1.02] transition-all relative overflow-hidden flex flex-col justify-between"
              style={{
                borderLeft: `4px solid ${phase.color}`
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="text-xs font-bold px-2.5 py-1 rounded-md"
                    style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                  >
                    PHASE {phase.phaseNumber}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{phase.weeks}</span>
                </div>

                <h3 className="font-['Outfit'] text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {lang === 'en' ? phase.name : phase.nameKo}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {lang === 'en' ? phase.description : phase.descriptionKo}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] font-semibold text-slate-400 group-hover:text-white">
                <span>{phase.sessionIds.length} {lang === 'en' ? 'Sessions' : '개 세션'}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">View →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
