import React from 'react';
import { BookOpen, Layers, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SessionCard({ session, lang, onOpenSession }) {
  const getPhaseBadge = (phase) => {
    switch (phase) {
      case 1: return { color: '#00F0FF', label: 'Phase 1: Cognition' };
      case 2: return { color: '#10B981', label: 'Phase 2: Miracles' };
      case 3: return { color: '#F59E0B', label: 'Phase 3: Crisis' };
      case 4: return { color: '#8B5CF6', label: 'Phase 4: Evolution' };
      default: return { color: '#00F0FF', label: 'Phase 1' };
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
            <span className="text-[11px] text-slate-500 font-medium">{badge.label}</span>
          </div>

          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 bg-white/5 px-2.5 py-0.5 rounded-md">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>45 Slides</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-['Outfit'] font-bold text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
          {session.title}
        </h3>

        {/* Reading Assignment */}
        <p className="text-xs text-slate-400 line-clamp-1 flex items-center gap-1.5 mb-4">
          <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>{session.reading || 'Peter Diamandis & Steven Kotler (2026)'}</span>
        </p>

        {/* Module Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">M1: Intro</span>
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">M2: Text</span>
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">M3: Math</span>
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">M4: Cases 1~9</span>
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">M5: So What</span>
          <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">M6: Debate</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-300">
        <span className="flex items-center gap-1 text-slate-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>3-Presenter Script Ready</span>
        </span>
        <span className="flex items-center gap-1 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
          {lang === 'en' ? 'Launch Slide Deck' : '슬라이드 열기'} →
        </span>
      </div>
    </div>
  );
}
