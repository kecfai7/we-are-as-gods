import React, { useState } from 'react';
import { Activity, TrendingUp, HelpCircle, RefreshCw } from 'lucide-react';

export default function Simulator6D({ lang }) {
  const [doublingTime, setDoublingTime] = useState(18); // months
  const [initialValue, setInitialValue] = useState(0.01);
  const [totalYears, setTotalYears] = useState(15);
  const [deceptionThreshold, setDeceptionThreshold] = useState(1.0);

  // Generate curve points
  const points = [];
  const totalMonths = totalYears * 12;
  const step = 6; // every 6 months

  for (let m = 0; m <= totalMonths; m += step) {
    const years = m / 12;
    const value = initialValue * Math.pow(2, m / doublingTime);
    const linearValue = initialValue + (years * 0.5);
    const isDeception = value < deceptionThreshold;

    points.push({
      month: m,
      year: years.toFixed(1),
      expValue: value,
      linearValue: linearValue,
      isDeception
    });
  }

  const maxExp = points[points.length - 1].expValue;

  return (
    <div className="glass-panel p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>{lang === 'en' ? 'Phase 1: Week 03 Mathematical Framework' : 'Phase 1: 3주차 기하급수 수학 모델'}</span>
          </div>
          <h3 className="font-['Syne'] font-bold text-xl sm:text-2xl text-white">
            {lang === 'en' ? '6D Exponential Growth & Deception Simulator' : '6D 기하급수 성장 및 잠복기 시뮬레이터'}
          </h3>
        </div>

        <div className="text-xs text-slate-400 font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-slate-800">
          y(t) = y_0 · 2^(t / T_d)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 4 Cols: Sliders */}
        <div className="lg:col-span-4 space-y-5 bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">{lang === 'en' ? 'Doubling Time (T_d):' : '더블링 주기 (T_d):'}</span>
              <span className="text-cyan-400 font-mono font-bold">{doublingTime} Months</span>
            </div>
            <input
              type="range"
              min="6"
              max="36"
              step="2"
              value={doublingTime}
              onChange={(e) => setDoublingTime(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              {lang === 'en' ? 'Moore’s Law standard is 18-24 months.' : '무어의 법칙 표준은 약 18~24개월입니다.'}
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">{lang === 'en' ? 'Deception Threshold:' : '기만적 잠복기 임계치:'}</span>
              <span className="text-amber-400 font-mono font-bold">{deceptionThreshold}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={deceptionThreshold}
              onChange={(e) => setDeceptionThreshold(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              {lang === 'en' ? 'Linear observers perceive growth as "zero" below this threshold.' : '이 임계치 미만에서는 세상이 기술 발전을 눈치채지 못합니다.'}
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">{lang === 'en' ? 'Simulation Horizon:' : '시뮬레이션 기간:'}</span>
              <span className="text-purple-400 font-mono font-bold">{totalYears} Years</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={totalYears}
              onChange={(e) => setTotalYears(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
            <strong className="text-cyan-300">💡 6D Law:</strong> Digitized → Deceptive → Disruptive → Dematerialized → Demonetized → Democratized.
          </div>
        </div>

        {/* Right 8 Cols: Visual Chart Representation */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-[#0B1020] p-6 rounded-2xl border border-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'en' ? 'Exponential vs Linear Trajectory' : '기하급수 vs 선형적 성장 궤적 비교'}
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                Exponential y(t)
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                Linear Expectation
              </span>
            </div>
          </div>

          {/* SVG Custom Responsive Chart */}
          <div className="w-full h-64 relative flex items-end justify-between gap-1 border-b border-l border-slate-700/80 p-2">
            {points.map((pt, idx) => {
              const heightPercent = Math.min(100, Math.max(4, (pt.expValue / maxExp) * 100));
              const linearPercent = Math.min(100, Math.max(4, (pt.linearValue / maxExp) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center bg-slate-900 border border-slate-700 text-[10px] text-white p-2 rounded shadow-xl z-20 whitespace-nowrap pointer-events-none">
                    <span className="font-bold text-cyan-300">Year {pt.year}</span>
                    <span>Exp: {pt.expValue > 1000 ? pt.expValue.toExponential(2) : pt.expValue.toFixed(2)}x</span>
                    <span className="text-slate-400">{pt.isDeception ? '⚠️ Deceptive Phase' : '🚀 Disruptive Chaos'}</span>
                  </div>

                  {/* Exponential Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      pt.isDeception 
                        ? 'bg-gradient-to-t from-amber-500/40 to-amber-400/80' 
                        : 'bg-gradient-to-t from-cyan-500/50 to-cyan-300'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Summary Callout */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Final Growth Multiple:</span>
              <span className="text-cyan-400 font-bold font-mono text-base">
                {maxExp > 1000000 ? maxExp.toExponential(2) : maxExp.toFixed(1)}×
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Deception Horizon:</span>
              <span className="text-amber-400 font-bold font-mono text-base">
                {points.filter(p => p.isDeception).length * step / 12} Years
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[11px]">Inflection Velocity:</span>
              <span className="text-purple-400 font-bold font-mono text-base">
                Instant Chaos 💥
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
