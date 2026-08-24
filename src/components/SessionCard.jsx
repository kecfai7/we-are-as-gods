import React from 'react';
import { BookOpen, Layers, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SessionCard({ session, lang, onOpenSession }) {
  const getPhaseBadge = (phase) => {
    switch (phase) {
      case 1: return { color: '#00F0FF', labelEn: 'Phase 1: Cognition', labelKo: 'Phase 1: 기하급수 인지' };
      case 2: return { color: '#10B981', labelEn: 'Phase 2: Miracles', labelKo: 'Phase 2: 현실적 기적' };
      case 3: return { color: '#F59E0B', labelEn: 'Phase 3: Crisis', labelKo: 'Phase 3: 실존적 위기' };
      case 4: return { color: '#8B5CF6', labelEn: 'Phase 4: Evolution', labelKo: 'Phase 4: 인류의 진화' };
      default: return { color: '#00F0FF', labelEn: 'Phase 1', labelKo: 'Phase 1' };
    }
  };

  const badge = getPhaseBadge(session.phase);

  return (
    <div 
      onClick={() => onOpenSession(session)}
      className="glass-panel p-6 cursor-pointer group flex flex-col justify-between hover:scale-[1.01] transition-all relative overflow-hidden"
    >
      {/* Top Tag & Slide Count */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span 
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${badge.color}15`, color: badge.color, border: `1px solid ${badge.color}40` }}
            >
              WEEK {session.weekNumber < 10 ? `0${session.weekNumber}` : session.weekNumber}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {lang === 'en' ? badge.labelEn : badge.labelKo}
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 bg-white/5 px-2.5 py-0.5 rounded-md">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>{lang === 'en' ? '45 Slides' : '45개 슬라이드'}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-['Outfit'] font-bold text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
          {lang === 'en' ? session.titleEn : session.titleKo}
        </h3>

        {/* Reading Assignment */}
        <p className="text-xs text-slate-400 line-clamp-1 flex items-center gap-1.5 mb-4">
          <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>{session.reading || 'Peter Diamandis & Steven Kotler (2026)'}</span>
        </p>

        {/* Module Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">
            {lang === 'en' ? 'M1: Intro' : 'M1: 도입'}
          </span>
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">
            {lang === 'en' ? 'M2: Text' : 'M2: 원전'}
          </span>
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">
            {lang === 'en' ? 'M3: Math' : 'M3: 수식'}
          </span>
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">
            {lang === 'en' ? 'M4: Cases' : 'M4: 사례'}
          </span>
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">
            {lang === 'en' ? 'M5: So What' : 'M5: 역설'}
          </span>
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">
            {lang === 'en' ? 'M6: Debate' : 'M6: 토론'}
          </span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-300">
        <span className="flex items-center gap-1 text-slate-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{lang === 'en' ? '3-Presenter Script Ready' : '3인 스크립트 완비'}</span>
        </span>
        <span className="flex items-center gap-1 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
          {lang === 'en' ? 'Launch Slide Deck' : '슬라이드 열기'} →
        </span>
      </div>
    </div>
  );
}
