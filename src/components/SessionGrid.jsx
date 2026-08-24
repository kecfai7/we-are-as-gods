import React, { useState } from 'react';
import SessionCard from './SessionCard';
import { sessionsList } from '../data/sessionsData';
import { Filter, Search, BookOpen } from 'lucide-react';

export default function SessionGrid({ lang, selectedPhase, setSelectedPhase, searchQuery, onOpenSession }) {
  const filteredSessions = sessionsList.filter((session) => {
    const matchPhase = selectedPhase === 'all' || session.phase === Number(selectedPhase);
    const matchSearch = searchQuery === '' || 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.slides.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchPhase && matchSearch;
  });

  return (
    <section id="curriculum-section" className="max-w-7xl mx-auto px-6 py-12">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'en' ? 'Master Syllabus & Slide Repository' : '15주 마스터 강의 교안 및 슬라이드 저장소'}</span>
          </div>
          <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl text-white">
            {lang === 'en' ? '15-Week Master Curriculum' : '15주차 세미나 전체 교안'}
          </h2>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-[rgba(255,255,255,0.03)] p-1.5 rounded-xl border border-[var(--border-subtle)]">
          <button
            onClick={() => setSelectedPhase('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedPhase === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {lang === 'en' ? 'All (15 Weeks)' : '전체 (15주)'}
          </button>

          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPhase(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPhase === p
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Phase {p}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      {filteredSessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => (
            <SessionCard
              key={session.weekNumber}
              session={session}
              lang={lang}
              onOpenSession={onOpenSession}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center my-8">
          <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">
            {lang === 'en' ? 'No Sessions Found' : '검색 결과가 없습니다'}
          </h3>
          <p className="text-xs text-slate-400">
            {lang === 'en' ? 'Try adjusting your search query or phase filters.' : '검색어나 페이즈 필터를 변경해 보세요.'}
          </p>
        </div>
      )}
    </section>
  );
}
