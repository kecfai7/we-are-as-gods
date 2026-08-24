import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Play, Maximize2, Minimize2, 
  BookOpen, MessageSquare, Layers, Sparkles, User, HelpCircle, Download
} from 'lucide-react';
import mermaid from 'mermaid';

export default function SlideViewerModal({ session, initialSlide = 1, onClose, lang }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlide - 1);
  const [mermaidSvg, setMermaidSvg] = useState('');

  const slides = session?.slides || [];
  const currentSlide = slides[currentSlideIndex] || null;

  // Initialize Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif',
      themeVariables: {
        darkMode: true,
        background: '#0D1322',
        primaryColor: '#101828',
        primaryTextColor: '#F8FAFC',
        primaryBorderColor: '#00F0FF',
        lineColor: '#00F0FF',
        secondaryColor: '#1E293B',
        tertiaryColor: '#0F172A'
      }
    });
  }, []);

  // Render Mermaid Diagram when current slide changes
  useEffect(() => {
    if (!currentSlide || !currentSlide.mermaid) {
      setMermaidSvg('');
      return;
    }

    const renderChart = async () => {
      try {
        const id = `mermaid-${Date.now()}`;
        const { svg } = await mermaid.render(id, currentSlide.mermaid);
        setMermaidSvg(svg);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setMermaidSvg('');
      }
    };

    renderChart();
  }, [currentSlideIndex, session]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onClose]);

  if (!currentSlide) return null;

  // Format presenter lines
  const parseScriptLines = (rawScript) => {
    if (!rawScript) return [];
    return rawScript.split('\n').map((line, idx) => {
      let speaker = 'Prof. Peter Kim';
      let avatar = '👑';
      let roleLabel = lang === 'en' ? 'Lead Chair' : '석좌교수';
      let badgeClass = 'text-amber-300 bg-amber-950/40 border-amber-500/30';
      let content = line;

      if (line.includes('Dr. Elena Vance:')) {
        speaker = 'Dr. Elena Vance';
        avatar = '🔬';
        roleLabel = lang === 'en' ? 'Biophysics' : '수석연구원';
        badgeClass = 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30';
        content = line.replace(/.*Dr\. Elena Vance:\s*/, '');
      } else if (line.includes('TA Marcus Brody:')) {
        speaker = 'TA Marcus Brody';
        avatar = '⚡';
        roleLabel = lang === 'en' ? 'Engineering' : '딥테크조교';
        badgeClass = 'text-cyan-300 bg-cyan-950/40 border-cyan-500/30';
        content = line.replace(/.*TA Marcus Brody:\s*/, '');
      } else if (line.includes('Prof. Peter Kim:')) {
        speaker = 'Prof. Peter Kim';
        avatar = '👑';
        roleLabel = lang === 'en' ? 'Lead Chair' : '석좌교수';
        badgeClass = 'text-amber-300 bg-amber-950/40 border-amber-500/30';
        content = line.replace(/.*Prof\. Peter Kim:\s*/, '');
      }

      return { speaker, avatar, roleLabel, badgeClass, content, id: idx };
    });
  };

  const scriptItems = parseScriptLines(currentSlide.script);

  const getModuleLabel = (modNum) => {
    if (lang === 'en') {
      switch (modNum) {
        case 1: return 'Module 1: Introduction & Agenda Setting';
        case 2: return 'Module 2: Textual Exegesis & Foundations';
        case 3: return 'Module 3: Exponential Math & Frameworks';
        case 4: return 'Module 4: Global Data & Case Studies 1~9';
        case 5: return 'Module 5: Philosophical So What & Paradoxes';
        case 6: return 'Module 6: Seminar Debates & Capstone Lab';
        default: return `Module ${modNum}`;
      }
    } else {
      switch (modNum) {
        case 1: return 'Module 1: 도입 및 어젠다 세팅';
        case 2: return 'Module 2: 원전 텍스트 정밀 해체';
        case 3: return 'Module 3: 기하급수 이론 및 수식 모델';
        case 4: return 'Module 4: 글로벌 데이터 & 실증 케이스 1~9';
        case 5: return 'Module 5: 사회적·철학적 역설 (So What?)';
        case 6: return 'Module 6: 세미나 토론 및 실습 과제';
        default: return `Module ${modNum}`;
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060913]/95 backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Top Modal Bar */}
      <div className="px-6 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-3">
          <span className="badge badge-cyan text-xs">
            WEEK {session.weekNumber < 10 ? `0${session.weekNumber}` : session.weekNumber}
          </span>
          <span className="text-xs font-bold text-slate-400 hidden sm:inline">|</span>
          <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-lg">
            {lang === 'en' ? session.titleEn : session.titleKo}
          </h2>
        </div>

        {/* Center Progress & Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs font-mono text-cyan-300">
            <span>{lang === 'en' ? 'Slide' : '슬라이드'}</span>
            <span className="font-bold text-white">{currentSlide.slideNumber}</span>
            <span className="text-slate-500">/</span>
            <span>45</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentSlideIndex === 0}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 disabled:opacity-30 transition-all"
              title="Previous Slide (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))}
              disabled={currentSlideIndex === slides.length - 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 disabled:opacity-30 transition-all"
              title="Next Slide (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-all"
          title="Close Viewer (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Slide Stage Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left 7 Cols: Slide Presentation Canvas */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#0A0F1E] to-[#060913] border-r border-slate-800/80">
          <div>
            {/* Module Badge & Slide Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full">
                {getModuleLabel(currentSlide.moduleNumber)}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Slide ID: W{session.weekNumber}-S{currentSlide.slideNumber < 10 ? `0${currentSlide.slideNumber}` : currentSlide.slideNumber}
              </span>
            </div>

            {/* Slide Title */}
            <h1 className="font-['Outfit'] font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight leading-snug mb-6">
              {currentSlide.title}
            </h1>

            {/* Bullets Content */}
            {currentSlide.bullets && currentSlide.bullets.length > 0 && (
              <div className="space-y-3 mb-6">
                {currentSlide.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-slate-800/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_6px_#00F0FF]" />
                    <span dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />
                  </div>
                ))}
              </div>
            )}

            {/* Formula Block */}
            {currentSlide.formula && (
              <div className="bg-cyan-950/30 border border-cyan-500/30 p-4 rounded-xl mb-6 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold mb-1 tracking-wider">MATHEMATICAL MODEL</div>
                <div className="font-mono text-cyan-200 text-sm sm:text-base font-bold overflow-x-auto">
                  {currentSlide.formula}
                </div>
              </div>
            )}

            {/* Mermaid Render Area */}
            {mermaidSvg ? (
              <div className="bg-[#0D1322] border border-cyan-500/30 p-5 rounded-2xl mb-6 shadow-[0_0_25px_rgba(0,240,255,0.15)] overflow-x-auto flex items-center justify-center">
                <div 
                  className="w-full flex justify-center"
                  dangerouslySetInnerHTML={{ __html: mermaidSvg }} 
                />
              </div>
            ) : currentSlide.mermaid ? (
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6 font-mono text-xs text-slate-300 overflow-x-auto">
                <pre>{currentSlide.mermaid}</pre>
              </div>
            ) : null}
          </div>

          {/* Quick Slide Slider Bar */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center gap-4">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              {lang === 'en' ? 'Slide' : '슬라이드'} {currentSlideIndex + 1} / 45
            </span>
            <input
              type="range"
              min="0"
              max="44"
              value={currentSlideIndex}
              onChange={(e) => setCurrentSlideIndex(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Right 5 Cols: 3-Presenter Tiki-Taka Script & Discussion Studio */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#080D1A] overflow-hidden">
          {/* Header Tab in Studio */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold font-['Syne'] uppercase tracking-wider text-white">
                {lang === 'en' ? '3-Presenter Authentic Dialogue Script' : '3인 교수진 티키타카 대화 스크립트'}
              </span>
            </div>
            <span className="badge badge-purple text-[10px]">
              {lang === 'en' ? 'Live Audio Sync' : '실시간 동기화'}
            </span>
          </div>

          {/* Script Dialogue Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {scriptItems.length > 0 ? (
              scriptItems.map((item) => (
                <div key={item.id} className="glass-panel p-4 border border-slate-800/80 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.avatar}</span>
                      <span className="font-['Outfit'] font-bold text-xs text-white">
                        {item.speaker}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.badgeClass}`}>
                      {item.roleLabel}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {item.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                {lang === 'en' ? 'No presenter dialogue recorded for this slide.' : '이 슬라이드에 등록된 교수진 스크립트가 없습니다.'}
              </div>
            )}
          </div>

          {/* Reading Anchor Note */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
            <span className="truncate max-w-[280px]">
              📖 {session.reading}
            </span>
            <span className="text-slate-500 font-mono text-[11px]">EXPO-701</span>
          </div>
        </div>
      </div>
    </div>
  );
}
