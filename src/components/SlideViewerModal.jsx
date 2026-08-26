import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X, ChevronLeft, ChevronRight, Monitor,
  MessageSquare, Sparkles, Clock, Play, Pause,
  RotateCcw, Volume2, VolumeX, Type, Maximize
} from 'lucide-react';
import mermaid from 'mermaid';
import { renderLatexInText, renderFormulaBox } from '../utils/katexRenderer';

export default function SlideViewerModal({ session, initialSlide = 1, onClose, lang }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlide - 1);
  const [mermaidSvg, setMermaidSvg] = useState('');
  const [isPresenterOpen, setIsPresenterOpen] = useState(false); // Oikos-style: default hidden, button to open

  // Presenter panel state (ported from Oikos PresenterMode)
  const [seconds, setSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [fontSize, setFontSize] = useState('text-base');
  const [speakingText, setSpeakingText] = useState(null);

  const slides = session?.slides || [];
  const currentSlide = slides[currentSlideIndex] || null;
  const nextSlideData = currentSlideIndex < slides.length - 1 ? slides[currentSlideIndex + 1] : null;

  // Timer
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // TTS
  const speakText = (textToSpeak) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingText === textToSpeak) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);
    setSpeakingText(textToSpeak);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
    }
  }, [currentSlideIndex]);

  const cycleFontSize = () => {
    if (fontSize === 'text-sm') setFontSize('text-base');
    else if (fontSize === 'text-base') setFontSize('text-lg');
    else if (fontSize === 'text-lg') setFontSize('text-xl');
    else setFontSize('text-sm');
  };

  const fontSizeMap = {
    'text-sm': '14px',
    'text-base': '16px',
    'text-lg': '18px',
    'text-xl': '20px',
  };

  // Mermaid init
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false, theme: 'dark', securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif',
      themeVariables: {
        darkMode: true, background: '#0D1322', primaryColor: '#101828',
        primaryTextColor: '#F8FAFC', primaryBorderColor: '#00F0FF',
        lineColor: '#00F0FF', secondaryColor: '#1E293B', tertiaryColor: '#0F172A'
      }
    });
  }, []);

  const displayMermaid = lang === 'en'
    ? (currentSlide?.mermaidEn || currentSlide?.mermaid)
    : (currentSlide?.mermaidKo || currentSlide?.mermaid);

  useEffect(() => {
    if (!displayMermaid) { setMermaidSvg(''); return; }
    (async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, displayMermaid);
        setMermaidSvg(svg);
      } catch { setMermaidSvg(''); }
    })();
  }, [currentSlideIndex, session, lang, displayMermaid]);


  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsPresenterOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onClose]);

  // Body scroll lock
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = orig; };
  }, []);

  // Fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  };

  if (!currentSlide) return null;

  // Data selection by language
  const displayTitle = lang === 'en'
    ? (currentSlide.titleEn || currentSlide.titleKo)
    : (currentSlide.titleKo || currentSlide.titleEn);
  const displayBullets = lang === 'en'
    ? (currentSlide.bulletsEn || currentSlide.bulletsKo || [])
    : (currentSlide.bulletsKo || currentSlide.bulletsEn || []);
  const rawScript = lang === 'en'
    ? (currentSlide.scriptEn || currentSlide.scriptKo)
    : (currentSlide.scriptKo || currentSlide.scriptEn);

  // Module labels
  const getModuleLabel = (modNum) => {
    if (lang === 'en') {
      switch (modNum) {
        case 1: return 'Module 1: Introduction & Agenda Setting';
        case 2: return 'Module 2: Textual Exegesis & Foundations';
        case 3: return 'Module 3: Exponential Math & Frameworks';
        case 4: return 'Module 4: Global Data & Case Studies';
        case 5: return 'Module 5: Philosophical Paradoxes';
        case 6: return 'Module 6: Seminar & Capstone Lab';
        default: return `Module ${modNum}`;
      }
    }
    switch (modNum) {
      case 1: return 'Module 1: 도입 및 어젠다 세팅';
      case 2: return 'Module 2: 원전 텍스트 정밀 해체';
      case 3: return 'Module 3: 기하급수 이론 및 수식 모델';
      case 4: return 'Module 4: 글로벌 데이터 & 실증 케이스';
      case 5: return 'Module 5: 사회적·철학적 역설';
      case 6: return 'Module 6: 세미나 토론 및 실습 과제';
      default: return `Module ${modNum}`;
    }
  };

  // Parse script into speaker lines (3-Presenter format & Student Capstone Defenses)
  const parseScriptLines = (raw) => {
    if (!raw) return [];
    return raw.split('\n').map((line, idx) => {
      let trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('####') || trimmed.startsWith('> **🎙️')) return null;
      // Clean leading markdown quote
      trimmed = trimmed.replace(/^>\s*/, '');

      let speaker = 'Prof. Peter Kim';
      let avatar = '👑';
      let roleLabel = lang === 'en' ? 'Lead Chair' : '석좌교수';
      let badgeClass = 'text-amber-300 bg-amber-950/40 border-amber-500/30';
      let content = trimmed;

      if (trimmed.includes('Dr. Elena Vance') || trimmed.includes('엘레나')) {
        speaker = 'Dr. Elena Vance';
        avatar = '🔬';
        roleLabel = lang === 'en' ? 'Biophysics' : '수석연구원';
        badgeClass = 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30';
        content = trimmed.replace(/.*(?:Dr\.\s*Elena\s*Vance|엘레나\s*박사|Dr\.\s*Elena)\s*[:：]\s*/i, '');
      } else if (trimmed.includes('TA Marcus Brody') || trimmed.includes('Marcus Brody') || trimmed.includes('마커스')) {
        speaker = 'TA Marcus Brody';
        avatar = '⚡';
        roleLabel = lang === 'en' ? 'Engineering' : '딥테크조교';
        badgeClass = 'text-cyan-300 bg-cyan-950/40 border-cyan-500/30';
        content = trimmed.replace(/.*(?:TA\s*Marcus\s*Brody|Marcus\s*Brody|마커스\s*조교)\s*[:：]\s*/i, '');
      } else if (trimmed.includes('Sarah Jenkins') || trimmed.includes('Team 1')) {
        speaker = 'Sarah Jenkins (Team 1)';
        avatar = '⚡';
        roleLabel = lang === 'en' ? 'Superconductor Lead' : '팀 1 발표자';
        badgeClass = 'text-yellow-300 bg-yellow-950/40 border-yellow-500/30';
        content = trimmed.replace(/.*(?:Sarah\s*Jenkins[^:：]*)\s*[:：]\s*/i, '');
      } else if (trimmed.includes('Dr. Aris Thorne') || trimmed.includes('Team 2')) {
        speaker = 'Dr. Aris Thorne (Team 2)';
        avatar = '🧬';
        roleLabel = lang === 'en' ? 'Epigenetics Lead' : '팀 2 발표자';
        badgeClass = 'text-rose-300 bg-rose-950/40 border-rose-500/30';
        content = trimmed.replace(/.*(?:Dr\.\s*Aris\s*Thorne[^:：]*)\s*[:：]\s*/i, '');
      } else if (trimmed.includes('Maya Lin') || trimmed.includes('Team 3')) {
        speaker = 'Maya Lin (Team 3)';
        avatar = '🌍';
        roleLabel = lang === 'en' ? 'Climate Systems Lead' : '팀 3 발표자';
        badgeClass = 'text-teal-300 bg-teal-950/40 border-teal-500/30';
        content = trimmed.replace(/.*(?:Maya\s*Lin[^:：]*)\s*[:：]\s*/i, '');
      } else if (trimmed.includes('Kenji Sato') || trimmed.includes('Team 4')) {
        speaker = 'Kenji Sato (Team 4)';
        avatar = '🧠';
        roleLabel = lang === 'en' ? 'Neuro-Privacy Lead' : '팀 4 발표자';
        badgeClass = 'text-indigo-300 bg-indigo-950/40 border-indigo-500/30';
        content = trimmed.replace(/.*(?:Kenji\s*Sato[^:：]*)\s*[:：]\s*/i, '');
      } else if (trimmed.includes('Alex Rivera') || trimmed.includes('Team 5')) {
        speaker = 'Alex Rivera (Team 5)';
        avatar = '🚀';
        roleLabel = lang === 'en' ? 'Mars Architecture Lead' : '팀 5 발표자';
        badgeClass = 'text-orange-300 bg-orange-950/40 border-orange-500/30';
        content = trimmed.replace(/.*(?:Alex\s*Rivera[^:：]*)\s*[:：]\s*/i, '');
      } else if (trimmed.includes('Chloe Bennett') || trimmed.includes('Team 6')) {
        speaker = 'Chloe Bennett (Team 6)';
        avatar = '🧪';
        roleLabel = lang === 'en' ? 'Chemical Systems Lead' : '팀 6 발표자';
        badgeClass = 'text-purple-300 bg-purple-950/40 border-purple-500/30';
        content = trimmed.replace(/.*(?:Chloe\s*Bennett[^:：]*)\s*[:：]\s*/i, '');
      } else if (trimmed.includes('Prof. Peter Kim') || trimmed.includes('김 피터') || trimmed.includes('피터 교수')) {
        speaker = 'Prof. Peter Kim';
        avatar = '👑';
        roleLabel = lang === 'en' ? 'Lead Chair' : '석좌교수';
        badgeClass = 'text-amber-300 bg-amber-950/40 border-amber-500/30';
        content = trimmed.replace(/.*(?:Prof\.\s*Peter\s*Kim|김\s*피터\s*교수|피터\s*교수)\s*[:：]\s*/i, '');
      }

      // Remove any lingering bold wrapper on speech
      content = content.replace(/^\*\*|\*\*$/g, '').trim();

      return { id: idx, speaker, avatar, roleLabel, badgeClass, content };
    }).filter(item => item && item.content && item.content.length > 0);
  };

  const scriptItems = parseScriptLines(rawScript);

  return createPortal(
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      width: '100vw', height: '100vh', zIndex: 999999,
      backgroundColor: '#0B132B', display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: "'Inter', 'Outfit', sans-serif"
    }}>

      {/* ═══════════════════ HEADER BAR (Oikos Univ style) ═══════════════════ */}
      <header style={{
        height: '56px', minHeight: '56px', flexShrink: 0,
        backgroundColor: 'rgba(11, 19, 43, 0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
        padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        {/* Left: Brand & Session */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(6, 182, 212, 0.3)'
          }}>
            <Sparkles style={{ width: '20px', height: '20px', color: '#FFF' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 700, color: '#FFF', fontSize: '13px', letterSpacing: '0.04em' }}>
                WE ARE AS GODS
              </span>
              <span style={{
                fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
                backgroundColor: 'rgba(0, 240, 255, 0.15)', color: '#67E8F9',
                fontWeight: 600, border: '1px solid rgba(0, 240, 255, 0.3)'
              }}>
                WEEK {String(session.weekNumber).padStart(2, '0')}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0, maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {lang === 'en' ? session.titleEn : session.titleKo}
            </p>
          </div>
        </div>

        {/* Center: Slide counter & nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Slide counter badge */}
          <div style={{
            padding: '4px 14px', borderRadius: '9999px',
            backgroundColor: '#1E293B', border: '1px solid #334155',
            fontSize: '12px', fontWeight: 600, color: '#67E8F9',
            fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <span>Slide</span>
            <span style={{ fontWeight: 800, color: '#FFF' }}>{currentSlideIndex + 1}</span>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ color: '#94A3B8' }}>{slides.length}</span>
          </div>
          {/* Nav buttons */}
          <button onClick={() => setCurrentSlideIndex(prev => Math.max(prev - 1, 0))}
            disabled={currentSlideIndex === 0}
            style={{
              padding: '6px', borderRadius: '8px', cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
              backgroundColor: '#1E293B', border: '1px solid #334155', color: '#CBD5E1',
              opacity: currentSlideIndex === 0 ? 0.3 : 1, display: 'flex'
            }}>
            <ChevronLeft style={{ width: '16px', height: '16px' }} />
          </button>
          <button onClick={() => setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1))}
            disabled={currentSlideIndex === slides.length - 1}
            style={{
              padding: '6px', borderRadius: '8px', cursor: currentSlideIndex === slides.length - 1 ? 'not-allowed' : 'pointer',
              backgroundColor: '#1E293B', border: '1px solid #334155', color: '#CBD5E1',
              opacity: currentSlideIndex === slides.length - 1 ? 0.3 : 1, display: 'flex'
            }}>
            <ChevronRight style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        {/* Right: Presenter toggle, Fullscreen, Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Presenter Mode Toggle (Oikos style) */}
          <button
            onClick={() => setIsPresenterOpen(prev => !prev)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s',
              backgroundColor: isPresenterOpen ? '#06B6D4' : '#1E293B',
              color: isPresenterOpen ? '#0F172A' : '#67E8F9',
              border: isPresenterOpen ? '1px solid #22D3EE' : '1px solid rgba(0, 240, 255, 0.3)',
              boxShadow: isPresenterOpen ? '0 0 16px rgba(6, 182, 212, 0.3)' : 'none'
            }}
            title="Toggle Presenter Teleprompter View [P]"
          >
            <Monitor style={{ width: '14px', height: '14px' }} />
            <span>Presenter Mode [P]</span>
          </button>

          {/* Fullscreen */}
          <button onClick={toggleFullScreen}
            style={{
              padding: '6px', borderRadius: '8px',
              backgroundColor: '#1E293B', border: '1px solid #334155',
              color: '#94A3B8', cursor: 'pointer', display: 'flex'
            }}
            title="Toggle Fullscreen">
            <Maximize style={{ width: '16px', height: '16px' }} />
          </button>

          {/* Close */}
          <button onClick={onClose}
            style={{
              padding: '6px', borderRadius: '8px',
              backgroundColor: '#1E293B', border: '1px solid #334155',
              color: '#94A3B8', cursor: 'pointer', display: 'flex'
            }}
            title="Close (Esc)">
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </header>

      {/* ═══════════════════ MAIN CONTENT AREA ═══════════════════ */}
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex' }}>

        {/* ─────── LEFT: SLIDE DECK (full width, shrinks when presenter is open) ─────── */}
        <div style={{
          flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(135deg, #0B132B, #0F172A, #090D16)'
        }}>
          {/* Slide content area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '40px 48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ maxWidth: '960px', width: '100%' }}>
              {/* Module badge + slide ID */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span className="badge badge-purple" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '4px 12px' }}>
                  {getModuleLabel(currentSlide.moduleNumber)}
                </span>
                <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>
                  Slide ID: W{session.weekNumber}-S{String(currentSlide.slideNumber).padStart(2, '0')}
                </span>
              </div>

              {/* Slide Title */}
              <h1
                style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 800,
                  color: '#FFFFFF', lineHeight: 1.3, marginBottom: '24px', letterSpacing: '-0.02em'
                }}
                dangerouslySetInnerHTML={{ __html: renderLatexInText(displayTitle) }}
              />

              {/* Bullets */}
              {displayBullets?.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                  {displayBullets.map((bullet, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      fontSize: '15px', color: '#CBD5E1', lineHeight: 1.6,
                      backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: '16px 20px',
                      borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      <span style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        backgroundColor: '#00F0FF', marginTop: '8px', flexShrink: 0,
                        boxShadow: '0 0 8px #00F0FF'
                      }} />
                      <span dangerouslySetInnerHTML={{
                        __html: renderLatexInText(bullet)
                      }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Formula Block */}
              {currentSlide.formula && (
                <div style={{
                  backgroundColor: 'rgba(8, 47, 73, 0.4)', border: '1px solid rgba(0, 240, 255, 0.4)',
                  padding: '20px', borderRadius: '16px', marginBottom: '28px',
                  boxShadow: '0 0 25px rgba(0, 240, 255, 0.12)'
                }}>
                  <div style={{ fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', color: '#00F0FF', fontWeight: 700, marginBottom: '10px' }}>
                    MATHEMATICAL MODEL
                  </div>
                  <div
                    style={{ color: '#BAE6FD', fontSize: '18px', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}
                    dangerouslySetInnerHTML={{ __html: renderFormulaBox(currentSlide.formula) }}
                  />
                </div>
              )}


              {/* Mermaid Diagram */}
              {mermaidSvg ? (
                <div style={{
                  backgroundColor: '#0D1322', border: '1px solid rgba(0, 240, 255, 0.3)',
                  padding: '24px', borderRadius: '16px', marginBottom: '28px',
                  boxShadow: '0 0 30px rgba(0, 240, 255, 0.15)',
                  overflowX: 'auto', display: 'flex', justifyContent: 'center'
                }}>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    dangerouslySetInnerHTML={{ __html: mermaidSvg }} />
                </div>
              ) : displayMermaid ? (
                <div style={{
                  backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '20px', borderRadius: '16px', marginBottom: '28px',
                  fontFamily: 'monospace', fontSize: '12px', color: '#CBD5E1', overflowX: 'auto'
                }}>
                  <pre>{displayMermaid}</pre>
                </div>
              ) : null}

            </div>
          </div>

          {/* Bottom slider bar */}
          <div style={{
            padding: '12px 48px', borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0,
            backgroundColor: 'rgba(11, 19, 43, 0.6)'
          }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
              Slide {currentSlideIndex + 1} / {slides.length}
            </span>
            <input
              type="range" min="0" max={slides.length - 1}
              value={currentSlideIndex}
              onChange={(e) => setCurrentSlideIndex(parseInt(e.target.value, 10))}
              style={{ width: '100%', height: '6px', accentColor: '#00F0FF', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* ─────── RIGHT: PRESENTER TELEPROMPTER DRAWER (Oikos Univ PresenterMode) ─────── */}
        {isPresenterOpen && (
          <div style={{
            width: '480px', flexShrink: 0,
            backgroundColor: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(24px)',
            borderLeft: '1px solid rgba(0, 240, 255, 0.2)',
            display: 'flex', flexDirection: 'column',
            boxShadow: '-4px 0 30px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden'
          }}>
            {/* Presenter Header */}
            <div style={{
              padding: '12px 14px',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderBottom: '1px solid #1E293B',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22D3EE', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#67E8F9', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Presenter Teleprompter
                </span>
              </div>

              {/* Timer */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                backgroundColor: 'rgba(30, 41, 59, 0.8)', padding: '4px 10px',
                borderRadius: '9999px', border: '1px solid #334155'
              }}>
                <Clock style={{ width: '12px', height: '12px', color: '#67E8F9' }} />
                <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#FDE68A' }}>
                  {formatTime(seconds)}
                </span>
                <span style={{ fontSize: '10px', color: '#64748B', fontFamily: 'monospace' }}>/ 60:00</span>
                <button onClick={() => setIsTimerActive(!isTimerActive)}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px', display: 'flex' }}>
                  {isTimerActive ? <Pause style={{ width: '11px', height: '11px' }} /> : <Play style={{ width: '11px', height: '11px' }} />}
                </button>
                <button onClick={() => { setSeconds(0); setIsTimerActive(false); }}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px', display: 'flex' }}>
                  <RotateCcw style={{ width: '11px', height: '11px' }} />
                </button>
              </div>
            </div>

            {/* Slide Info Bar */}
            <div style={{
              padding: '8px 14px',
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              borderBottom: '1px solid rgba(30, 41, 59, 0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                <span style={{
                  padding: '2px 8px', borderRadius: '4px',
                  backgroundColor: 'rgba(0, 240, 255, 0.15)', color: '#67E8F9',
                  fontFamily: 'monospace', fontWeight: 700, fontSize: '11px',
                  border: '1px solid rgba(0, 240, 255, 0.3)'
                }}>
                  {currentSlideIndex + 1} / {slides.length}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px' }}>
                  {displayTitle}
                </span>
              </div>

              {/* Font size cycle */}
              <button onClick={cycleFontSize}
                style={{
                  padding: '3px 8px', borderRadius: '6px',
                  backgroundColor: '#1E293B', border: '1px solid #334155',
                  color: '#94A3B8', cursor: 'pointer', fontSize: '10px', fontFamily: 'monospace',
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                <Type style={{ width: '12px', height: '12px' }} />
                <span>{fontSize.replace('text-', '').toUpperCase()}</span>
              </button>
            </div>

            {/* Script Tab Label */}
            <div style={{
              padding: '8px 14px',
              backgroundColor: 'rgba(0, 240, 255, 0.05)',
              borderBottom: '1px solid rgba(0, 240, 255, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles style={{ width: '12px', height: '12px', color: '#67E8F9' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#67E8F9' }}>
                  Spoken Teleprompter Script
                </span>
              </div>
              {rawScript && (
                <button
                  onClick={() => speakText(rawScript)}
                  style={{
                    padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700,
                    backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.3)',
                    color: '#67E8F9', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                  }}>
                  {speakingText === rawScript
                    ? <><VolumeX style={{ width: '11px', height: '11px', color: '#FDE68A' }} /><span>Stop</span></>
                    : <><Volume2 style={{ width: '11px', height: '11px' }} /><span>Read All</span></>
                  }
                </button>
              )}
            </div>

            {/* Script Content Stream */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {scriptItems.length > 0 ? (
                scriptItems.map((item) => (
                  <div key={item.id} style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px', padding: '12px 14px'
                  }}>
                    {/* Speaker header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>{item.avatar}</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFF' }}>{item.speaker}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.badgeClass}`}>
                          {item.roleLabel}
                        </span>
                        <button
                          onClick={() => speakText(item.content)}
                          style={{
                            background: 'none', border: 'none', padding: '2px',
                            color: speakingText === item.content ? '#FDE68A' : '#475569',
                            cursor: 'pointer', display: 'flex'
                          }}
                          title="Read this line aloud"
                        >
                          <Volume2 style={{ width: '12px', height: '12px' }} />
                        </button>
                      </div>
                    </div>
                    {/* Script text */}
                    <p style={{
                      fontSize: fontSizeMap[fontSize] || '16px',
                      lineHeight: 1.7, fontWeight: 400, color: '#E2E8F0', margin: 0
                    }}>
                      {item.content}
                    </p>
                  </div>
                ))
              ) : (
                <div style={{
                  textAlign: 'center', padding: '48px 16px', color: '#475569',
                  fontSize: '12px', fontStyle: 'italic',
                  backgroundColor: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px',
                  border: '1px solid rgba(0, 240, 255, 0.15)'
                }}>
                  No spoken script provided for this slide.
                </div>
              )}
            </div>

            {/* Next Slide Preview */}
            {nextSlideData && (
              <div style={{
                padding: '10px 14px',
                borderTop: '1px solid rgba(30, 41, 59, 0.8)',
                backgroundColor: 'rgba(15, 23, 42, 0.5)'
              }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Next Slide ({currentSlideIndex + 2} / {slides.length})
                </span>
                <div style={{
                  marginTop: '4px', padding: '8px 10px', borderRadius: '8px',
                  backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid #1E293B', opacity: 0.7
                }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#CBD5E1', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {lang === 'en' ? (nextSlideData.titleEn || nextSlideData.titleKo) : (nextSlideData.titleKo || nextSlideData.titleEn)}
                  </p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div style={{
              padding: '10px 14px',
              borderTop: '1px solid #1E293B',
              backgroundColor: 'rgba(11, 17, 32, 0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontSize: '11px', color: '#64748B'
            }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                📖 {session.reading}
              </span>
              <span style={{ fontFamily: 'monospace' }}>EXPO-701</span>
            </div>
          </div>
        )}
      </main>
    </div>,
    document.body
  );
}
