import React, { useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import SessionGrid from './components/SessionGrid';
import MiraclesMatrix from './components/MiraclesMatrix';
import Simulator6D from './components/Simulator6D';
import SimulatorUniverse25 from './components/SimulatorUniverse25';
import GigaXprizeBoard from './components/GigaXprizeBoard';
import SlideViewerModal from './components/SlideViewerModal';
import CourseFooter from './components/CourseFooter';
import { sessionsList } from './data/sessionsData';

export default function App() {
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' | 'miracles' | 'simulators' | 'xprize'
  const [lang, setLang] = useState('en'); // 'en' | 'ko'
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalSession, setActiveModalSession] = useState(null);

  const handleOpenSession = (session) => {
    setActiveModalSession(session);
  };

  const handleSelectPhase = (phaseNum) => {
    setSelectedPhase(phaseNum);
    setActiveTab('curriculum');
    const elem = document.getElementById('curriculum-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    setActiveTab('curriculum');
    const elem = document.getElementById('curriculum-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060913] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* Always display Hero Banner when on curriculum or top */}
        {activeTab === 'curriculum' && (
          <HeroBanner
            lang={lang}
            onSelectPhase={handleSelectPhase}
            onExploreClick={handleExploreClick}
          />
        )}

        {/* Tab 1: Curriculum & 15-Week Sessions */}
        {activeTab === 'curriculum' && (
          <SessionGrid
            lang={lang}
            selectedPhase={selectedPhase}
            setSelectedPhase={setSelectedPhase}
            searchQuery={searchQuery}
            onOpenSession={handleOpenSession}
          />
        )}

        {/* Tab 2: 83 Miracles Database */}
        {activeTab === 'miracles' && (
          <MiraclesMatrix
            lang={lang}
            onSelectSession={(weekNum) => {
              const sess = sessionsList.find(s => s.weekNumber === weekNum);
              if (sess) handleOpenSession(sess);
            }}
          />
        )}

        {/* Tab 3: Interactive Simulators */}
        {activeTab === 'simulators' && (
          <section className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="badge badge-amber text-xs mb-2">Interactive Physics & Math Engine</span>
              <h2 className="font-['Syne'] font-extrabold text-3xl text-white">
                {lang === 'en' ? 'Course Simulation Laboratory' : '기하급수 & 생태 시뮬레이션 실험실'}
              </h2>
            </div>

            <Simulator6D lang={lang} />
            <SimulatorUniverse25 lang={lang} />
          </section>
        )}

        {/* Tab 4: $100B Giga-XPRIZE Studio */}
        {activeTab === 'xprize' && (
          <GigaXprizeBoard lang={lang} />
        )}
      </main>

      {/* Slide Viewer Fullscreen Modal */}
      {activeModalSession && (
        <SlideViewerModal
          session={activeModalSession}
          initialSlide={1}
          onClose={() => setActiveModalSession(null)}
          lang={lang}
        />
      )}

      {/* Course Global Footer */}
      <CourseFooter lang={lang} />
    </div>
  );
}
