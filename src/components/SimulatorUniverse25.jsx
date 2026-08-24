import React, { useState } from 'react';
import { Skull, AlertTriangle, Play, Pause, RefreshCw, HeartHandshake } from 'lucide-react';

export default function SimulatorUniverse25({ lang }) {
  const [currentDay, setCurrentDay] = useState(560);

  const timelineDataEn = [
    { day: 0, pop: 8, phase: 'Phase A: Establishment', event: '8 Healthy Mice (4M, 4F) introduced to 2.7m square paradise. Scarcity = 0%.' },
    { day: 104, pop: 20, phase: 'Phase A: First Generation', event: 'First litters born. Social bonds strong, territorial spaces healthy.' },
    { day: 220, pop: 180, phase: 'Phase B: Rapid Exploitation', event: 'Population doubling every 55 days. Perfect exponential growth.' },
    { day: 315, pop: 620, phase: 'Phase C: Stagnation Peak', event: 'Peak population (620 mice). All 256 nesting apartments claimed. Role loss begins.' },
    { day: 450, pop: 600, phase: 'Phase C: Behavioral Sink', event: 'Young males lose purpose. Indiscriminate violence erupts in central plaza.' },
    { day: 560, pop: 580, phase: 'Phase D: The Beautiful Ones', event: 'Birth of "Beautiful Ones". Social withdrawal, zero mating, grooming only.' },
    { day: 750, pop: 420, phase: 'Phase D: Die-off Acceleration', event: 'Mortality exceeds births. Mothers abandon nests. No social play.' },
    { day: 920, pop: 120, phase: 'Phase D: The Last Conception', event: 'FINAL conception in Universe 25. Permanent cessation of reproduction.' },
    { day: 1200, pop: 95, phase: 'Phase D: Senescence', event: 'Aging generation of Beautiful Ones. Zero attempts to breed.' },
    { day: 1500, pop: 25, phase: 'Phase D: The Final Few', event: '25 elderly mice remain. Food untouched, infinite water.' },
    { day: 1780, pop: 0, phase: 'Phase D: Total Extinction', event: 'Last surviving male dies. Population reaches 0. Extinction complete.' }
  ];

  const timelineDataKo = [
    { day: 0, pop: 8, phase: 'Phase A: 정착기 (Establishment)', event: '4쌍의 건강한 쥐(8마리)를 2.7m 낙원에 도입. 결핍 0%.' },
    { day: 104, pop: 20, phase: 'Phase A: 1세대 출현', event: '첫 새끼 출산. 사회적 유대감과 영역권 건강하게 형성.' },
    { day: 220, pop: 180, phase: 'Phase B: 기하급수 폭발기', event: '55일마다 개체 수 2배 증가. 완벽한 기하급수 번식.' },
    { day: 315, pop: 620, phase: 'Phase C: 정체 및 포화기', event: '최대 개체 수 도달(620마리). 모든 아파트 점유 완료. 역할 결핍 시작.' },
    { day: 450, pop: 600, phase: 'Phase C: 행동 싱크(Behavioral Sink)', event: '젊은 수컷들이 설 자리를 잃음. 중앙 광장에서 무차별 폭력 발생.' },
    { day: 560, pop: 580, phase: 'Phase D: 아름다운 자들(Beautiful Ones)', event: '"아름다운 자들" 출현. 사회적 단절, 번식 포기, 그루밍만 지속.' },
    { day: 750, pop: 420, phase: 'Phase D: 사망률 역전 가속', event: '사망률이 출생률을 초월. 어미가 새끼를 버리고 공격.' },
    { day: 920, pop: 120, phase: 'Phase D: 최후의 임신', event: '우주 25 역사의 마지막 임신. 이후 번식 완전 중단.' },
    { day: 1200, pop: 95, phase: 'Phase D: 노화기', event: '아름다운 자들의 집단 노화. 짝짓기 시도 0건.' },
    { day: 1500, pop: 25, phase: 'Phase D: 최후의 생존자', event: '25마리의 노령 쥐만 잔존. 무제한 음식은 그대로 방치됨.' },
    { day: 1780, pop: 0, phase: 'Phase D: 완전 멸종', event: '마지막 수컷 사망. 개체 수 0 마리. 종의 완전한 자발적 멸종.' }
  ];

  const timelineData = lang === 'en' ? timelineDataEn : timelineDataKo;

  // Interpolate current population
  const getInterpolatedData = (day) => {
    for (let i = 0; i < timelineData.length - 1; i++) {
      if (day >= timelineData[i].day && day <= timelineData[i + 1].day) {
        const t0 = timelineData[i];
        const t1 = timelineData[i + 1];
        const ratio = (day - t0.day) / (t1.day - t0.day);
        const pop = Math.round(t0.pop + ratio * (t1.pop - t0.pop));
        return { pop, phase: day < 104 ? t0.phase : day < 315 ? 'Phase B' : day < 560 ? 'Phase C' : 'Phase D', event: t1.event };
      }
    }
    return timelineData[timelineData.length - 1];
  };

  const currentStatus = getInterpolatedData(currentDay);

  return (
    <div className="glass-panel p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Skull className="w-4 h-4" />
            <span>{lang === 'en' ? 'Phase 4: Week 14 Ecological Collapse Simulator' : 'Phase 4: 14주차 생태 멸종 모델'}</span>
          </div>
          <h3 className="font-['Syne'] font-bold text-xl sm:text-2xl text-white">
            {lang === 'en' ? 'John Calhoun’s Universe 25 Extinction Timeline' : '존 칼훈의 우주 25 인구 멸종 시뮬레이터'}
          </h3>
        </div>

        <div className="text-xs text-slate-400 font-mono bg-rose-950/40 text-rose-300 border border-rose-800/40 px-3 py-1.5 rounded-lg">
          The First Death → The Second Death
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 4 Cols: Day Slider & Status */}
        <div className="lg:col-span-5 space-y-6 bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase text-slate-400">
                {lang === 'en' ? 'Simulation Day:' : '시뮬레이션 일자:'}
              </span>
              <span className="text-2xl font-extrabold font-mono text-rose-400">Day {currentDay}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1780"
              step="10"
              value={currentDay}
              onChange={(e) => setCurrentDay(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Day 0 ({lang === 'en' ? '8 Mice' : '8마리'})</span>
              <span>Day 560 ({lang === 'en' ? 'Peak' : '정점'})</span>
              <span>Day 1780 ({lang === 'en' ? '0 Mice' : '0마리'})</span>
            </div>
          </div>

          {/* Quick Jump Milestone Buttons */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {lang === 'en' ? 'Jump to Historical Milestone:' : '역사적 마일스톤 바로가기:'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setCurrentDay(0)} className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 text-xs font-medium text-left">
                {lang === 'en' ? '🌱 Day 0: 8 Adam Mice' : '🌱 Day 0: 8마리 도입'}
              </button>
              <button onClick={() => setCurrentDay(315)} className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 text-xs font-medium text-left">
                {lang === 'en' ? '⚠️ Day 315: 620 Peak' : '⚠️ Day 315: 620마리 정점'}
              </button>
              <button onClick={() => setCurrentDay(560)} className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-400 text-slate-300 text-xs font-medium text-left">
                {lang === 'en' ? '🪞 Day 560: Beautiful Ones' : '🪞 Day 560: 아름다운 자들'}
              </button>
              <button onClick={() => setCurrentDay(920)} className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-400 text-slate-300 text-xs font-medium text-left">
                {lang === 'en' ? '🚫 Day 920: Births = 0' : '🚫 Day 920: 출생률 0'}
              </button>
            </div>
          </div>

          {/* Current Day Metric Readouts */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{lang === 'en' ? 'Living Population:' : '생존 개체 수:'}</span>
              <span className="font-mono font-bold text-white text-sm">{currentStatus.pop} {lang === 'en' ? 'Mice' : '마리'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{lang === 'en' ? 'Current Phase:' : '현재 단계:'}</span>
              <span className="font-bold text-amber-400">{currentStatus.phase}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{lang === 'en' ? 'Reproductive Vitality:' : '생식 활성도:'}</span>
              <span className={`font-bold ${currentDay > 920 ? 'text-rose-400' : currentDay > 560 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {currentDay > 920 
                  ? (lang === 'en' ? '0% (Irreversibly Dead)' : '0% (비가역적 중단)')
                  : currentDay > 560 
                    ? (lang === 'en' ? '12% (Severely Impaired)' : '12% (심각한 손상)')
                    : (lang === 'en' ? '100% (Healthy)' : '100% (건강)')}
              </span>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Detailed Ecological Event & Graph */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-[#0B1020] p-6 rounded-2xl border border-slate-800">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {lang === 'en' ? 'Ecological & Psychological Diagnostic:' : '생태 및 신경심리학적 진단:'}
            </span>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
              <strong className="text-rose-400 block mb-1">
                {currentDay >= 1780 
                  ? (lang === 'en' ? '💀 DAY 1780: THE SILENT END' : '💀 DAY 1780: 침묵의 종말')
                  : currentDay >= 920 
                    ? (lang === 'en' ? '🛑 DAY 920: THE POINT OF NO RETURN' : '🛑 DAY 920: 되돌릴 수 없는 임계점')
                    : currentDay >= 560 
                      ? (lang === 'en' ? '🪞 DAY 560: THE BEAUTIFUL ONES' : '🪞 DAY 560: 아름다운 자들의 출현')
                      : (lang === 'en' ? '🌾 DAYS 0~315: THE GOLDEN AGE' : '🌾 DAYS 0~315: 황금 번식기')}
              </strong>
              {currentStatus.event}
            </div>

            {/* Visual Timeline Bar representation */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Phase A ({lang === 'en' ? 'Growth' : '성장'})</span>
                <span>Phase B ({lang === 'en' ? 'Boom' : '폭발'})</span>
                <span>Phase C ({lang === 'en' ? 'Sink' : '정체'})</span>
                <span className="text-rose-400 font-bold">
                  Phase D ({lang === 'en' ? 'Beautiful Ones Extinction' : '아름다운 자들과 멸종'})
                </span>
              </div>
              <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
                <div style={{ width: '6%' }} className="bg-cyan-500" title="Phase A" />
                <div style={{ width: '12%' }} className="bg-emerald-500" title="Phase B" />
                <div style={{ width: '14%' }} className="bg-amber-500" title="Phase C" />
                <div style={{ width: '68%' }} className="bg-gradient-to-r from-purple-500 to-rose-600" title="Phase D" />
              </div>
            </div>
          </div>

          {/* Civilizational Lesson Callout */}
          <div className="mt-6 p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-slate-300 leading-relaxed">
            <strong className="text-purple-300 block mb-1">
              💡 {lang === 'en' ? 'The First Death Warning for 2026 Humanity:' : '2026 인류를 향한 제1의 죽음 경고:'}
            </strong>
            {lang === 'en'
              ? 'When artificial intelligence and automated robotics remove all physical scarcity, humanity will degenerate like Universe 25 unless we anchor ourselves in massive transformative purpose (Moonshots).'
              : '인공지능과 로봇이 모든 생존 마찰을 제거할 때, 인류는 문샷 목적(Moonshot Purpose)을 품지 않으면 우주 25의 쥐들처럼 스스로 번식을 멈추고 멸종할 것입니다.'}
          </div>
        </div>
      </div>
    </div>
  );
}
