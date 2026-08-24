import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, ChevronLeft, ChevronRight, Play, Maximize2, Minimize2, 
  BookOpen, MessageSquare, Layers, Sparkles, User, HelpCircle, Download
} from 'lucide-react';
import mermaid from 'mermaid';
import { localizeSlideTitle, localizeBullet, localizeScriptContent } from '../utils/slideLocalizer';

export default function SlideViewerModal({ session, initialSlide = 1, onClose, lang }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlide - 1);
  const [mermaidSvg, setMermaidSvg] = useState('');
  const [showScript, setShowScript] = useState(true); // Default: visible (Oikos Univ style dual-view)

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

  // Body scroll lock when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

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

      return {
        id: idx,
        speaker,
        avatar,
        roleLabel,
        badgeClass,
        content: content.trim()
      };
    }).filter(item => item.content.length > 0);
  };

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

  const rawScript = lang === 'en' ? (currentSlide.scriptEn || currentSlide.scriptKo) : (currentSlide.scriptKo || currentSlide.scriptEn);
  const scriptItems = parseScriptLines(rawScript);
  const displayTitle = lang === 'en' ? (currentSlide.titleEn || currentSlide.titleKo) : (currentSlide.titleKo || currentSlide.titleEn);
  const displayBullets = lang === 'en' ? (currentSlide.bulletsEn || currentSlide.bulletsKo || []) : (currentSlide.bulletsKo || currentSlide.bulletsEn || []);

  return createPortal(
    <div 
      style={{ 
        position: 'fixed',
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 999999, 
        backgroundColor: '#060913',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Top Modal Navigation Bar */}
      <div 
        style={{ 
          backgroundColor: '#0B1120', 
          minHeight: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge badge-cyan text-xs font-bold">
            WEEK {session.weekNumber < 10 ? `0${session.weekNumber}` : session.weekNumber}
          </span>
          <span style={{ color: '#475569', fontWeight: 'bold' }}>|</span>
          <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF', maxWidth: '600px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {lang === 'en' ? session.titleEn : session.titleKo}
          </h2>
        </div>

        {/* Center Controls: Script Toggle & Slide Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Presenter Script Toggle Button */}
          <button
            onClick={() => setShowScript(!showScript)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: showScript ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              color: showScript ? '#C4B5FD' : '#94A3B8',
              border: showScript ? '1px solid rgba(139, 92, 246, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)'
            }}
            title="Toggle Presenter Dialogue Script"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>
              {lang === 'en' 
                ? (showScript ? 'Hide Script' : '🎙️ Presenter Script') 
                : (showScript ? '스크립트 숨기기' : '🎙️ 교수진 스크립트')}
            </span>
          </button>

          {/* Slide Progress Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0F172A', border: '1px solid #1E293B', padding: '5px 12px', borderRadius: '9999px', fontSize: '12px', fontFamily: 'monospace', color: '#00F0FF' }}>
            <span>{lang === 'en' ? 'Slide' : '슬라이드'}</span>
            <span style={{ fontWeight: 'bold', color: '#FFFFFF' }}>{currentSlide.slideNumber}</span>
            <span style={{ color: '#64748B' }}>/</span>
            <span>45</span>
          </div>

          {/* Prev / Next Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentSlideIndex === 0}
              style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#0F172A', border: '1px solid #1E293B', color: '#CBD5E1', cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer', opacity: currentSlideIndex === 0 ? 0.3 : 1 }}
              title="Previous Slide (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))}
              disabled={currentSlideIndex === slides.length - 1}
              style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#0F172A', border: '1px solid #1E293B', color: '#CBD5E1', cursor: currentSlideIndex === slides.length - 1 ? 'not-allowed' : 'pointer', opacity: currentSlideIndex === slides.length - 1 ? 0.3 : 1 }}
              title="Next Slide (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          style={{ padding: '6px 8px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Close Viewer (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Slide Presentation Stage (Flex Container) */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', width: '100%', position: 'relative' }}>
        
        {/* Center/Left: Slide Presentation Canvas */}
        <div 
          style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            overflowY: 'auto', 
            padding: '32px 40px',
            backgroundColor: '#0A0F1E',
            width: '100%'
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
            {/* Module Badge & Slide ID */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-purple text-xs font-bold uppercase tracking-wider px-3 py-1">
                {getModuleLabel(currentSlide.moduleNumber)}
              </span>
              <span style={{ fontSize: '12px', color: '#64748B', fontFamily: 'monospace' }}>
                Slide ID: W{session.weekNumber}-S{currentSlide.slideNumber < 10 ? `0${currentSlide.slideNumber}` : currentSlide.slideNumber}
              </span>
            </div>

            {/* Slide Title */}
            <h1 className="font-['Outfit']" style={{ fontSize: '28px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1.3, marginBottom: '24px', letterSpacing: '-0.02em' }}>
              {displayTitle}
            </h1>

            {/* Bullets Content */}
            {displayBullets && displayBullets.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {displayBullets.map((bullet, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#CBD5E1', lineHeight: 1.6, backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00F0FF', marginTop: '8px', flexShrink: 0, boxShadow: '0 0 8px #00F0FF' }} />
                    <span dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #FFFFFF; font-weight: 700;">$1</strong>') }} />
                  </div>
                ))}
              </div>
            )}

            {/* Formula Block */}
            {currentSlide.formula && (
              <div style={{ backgroundColor: 'rgba(8, 47, 73, 0.4)', border: '1px solid rgba(0, 240, 255, 0.4)', padding: '20px', borderRadius: '16px', marginBottom: '28px', boxShadow: '0 0 25px rgba(0, 240, 255, 0.12)' }}>
                <div style={{ fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', color: '#00F0FF', fontWeight: '700', marginBottom: '6px', letterSpacing: '0.05em' }}>
                  MATHEMATICAL MODEL
                </div>
                <div style={{ fontFamily: 'monospace', color: '#BAE6FD', fontSize: '16px', fontWeight: '700', overflowX: 'auto' }}>
                  {currentSlide.formula}
                </div>
              </div>
            )}

            {/* Mermaid Render Area */}
            {mermaidSvg ? (
              <div style={{ backgroundColor: '#0D1322', border: '1px solid rgba(0, 240, 255, 0.3)', padding: '24px', borderRadius: '16px', marginBottom: '28px', boxShadow: '0 0 30px rgba(0, 240, 255, 0.15)', overflowX: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div 
                  style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                  dangerouslySetInnerHTML={{ __html: mermaidSvg }} 
                />
              </div>
            ) : currentSlide.mermaid ? (
              <div style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '16px', marginBottom: '28px', fontFamily: 'monospace', fontSize: '12px', color: '#CBD5E1', overflowX: 'auto' }}>
                <pre>{currentSlide.mermaid}</pre>
              </div>
            ) : null}
          </div>

          {/* Quick Slide Slider Bar */}
          <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
              {lang === 'en' ? 'Slide' : '슬라이드'} {currentSlideIndex + 1} / 45
            </span>
            <input
              type="range"
              min="0"
              max={slides.length - 1}
              value={currentSlideIndex}
              onChange={(e) => setCurrentSlideIndex(parseInt(e.target.value, 10))}
              style={{ width: '100%', height: '6px', accentColor: '#00F0FF', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Right: 3-Presenter Authentic Dialogue Script Drawer (Collapsible) */}
        {showScript && (
          <div 
            style={{ 
              width: '420px', 
              flexShrink: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              backgroundColor: '#080D1A', 
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden' 
            }}
          >
            {/* Header Tab in Studio */}
            <div 
              style={{ 
                padding: '16px', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
                backgroundColor: '#0B1120', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span className="font-['Syne']" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FFFFFF' }}>
                  {lang === 'en' ? '3-Presenter Authentic Script' : '3인 교수진 스크립트'}
                </span>
              </div>
              <span className="badge badge-purple text-[10px]">
                {lang === 'en' ? 'Live Audio Sync' : '실시간 동기화'}
              </span>
            </div>

            {/* Script Dialogue Stream */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {scriptItems.length > 0 ? (
                scriptItems.map((item) => (
                  <div key={item.id} style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>{item.avatar}</span>
                        <span className="font-['Outfit']" style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF' }}>
                          {item.speaker}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.badgeClass}`}>
                        {item.roleLabel}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6, fontWeight: '500' }}>
                      {item.content}
                    </p>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748B', fontSize: '12px' }}>
                  {lang === 'en' ? 'No presenter dialogue recorded for this slide.' : '이 슬라이드에 등록된 교수진 스크립트가 없습니다.'}
                </div>
              )}
            </div>

            {/* Reading Anchor Note */}
            <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#0B1120', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                📖 {session.reading}
              </span>
              <span style={{ color: '#64748B', fontFamily: 'monospace' }}>EXPO-701</span>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
