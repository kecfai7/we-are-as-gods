import React, { useState } from 'react';
import { Award, DollarSign, CheckCircle2, TrendingUp, Sparkles, Trophy, Rocket, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GigaXprizeBoard({ lang }) {
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [fundedTeams, setFundedTeams] = useState([4]); // Team 5 (Mars City) default winner

  const teams = [
    {
      id: 1,
      name: "Global Superconducting Clean Grid",
      nameKo: "글로벌 상온 초전도 청정 그리드",
      prize: "$15 Billion USD",
      score: 95,
      icon: "⚡",
      domain: "Infinite Energy",
      domainKo: "무한 청정 에너지",
      mtp: "Eliminate 100% of global power transmission loss, liberating 10,000 TWh of clean energy annually.",
      mtpKo: "전 지구 송전 손실 100% 제거 및 연간 10,000 TWh 청정 전기 해방",
      metric: "1,000 km ambient superconductor wire at 295K & 10GW zero loss transmission.",
      metricKo: "295K 1기압 1,000km 초전도 선재 가설 및 10GW 무손실 송전 실증",
      leverage: "25× ($375B Private Capital Generated)"
    },
    {
      id: 2,
      name: "Epigenetic 50-Year Biological Age Reversal",
      nameKo: "생체 나이 50년 후성유전학적 역전 (LEV)",
      prize: "$20 Billion USD",
      score: 98,
      icon: "🧬",
      domain: "Longevity & Healthspan",
      domainKo: "장수 및 건강수명",
      mtp: "Reset a 70-year-old's cellular tissue to the pristine vitality of a 20-year-old.",
      mtpKo: "70세 노인의 세포 조직을 20세 청년의 생체 나이로 역전시켜 영구 젊음 제공",
      metric: "50-year DNA methylation clock reset across 100 clinical human trials.",
      metricKo: "100명 인간 임상에서 야마나카 인자 기반 생체 시계 50년 역전 실측치 증명",
      leverage: "40× ($800B Private Capital Generated)"
    },
    {
      id: 3,
      name: "Gigaton Atmospheric Direct Carbon Mineralization",
      nameKo: "행성 대기 탄소 100억 톤 직접 포집 및 광물화",
      prize: "$15 Billion USD",
      score: 94,
      icon: "🌍",
      domain: "Planetary Restoration",
      domainKo: "행성 생태 복원",
      mtp: "Restore pre-industrial atmospheric CO2 (280 ppm) at under $20 per ton.",
      mtpKo: "산업화 이전의 대기 농도(280 ppm)로 복원하는 톤당 $20 이하 초대형 포집 시스템",
      metric: "10 Gigatons/year permanent basalt mineralization verified by satellite eDNA.",
      metricKo: "연간 100억 톤 현무암 영구 광물화 실시간 위성 검증 통과",
      leverage: "30× ($450B Private Capital Generated)"
    },
    {
      id: 4,
      name: "Ultra-High-Resolution Zero-Knowledge Telepathy Mesh",
      nameKo: "초연결 뉴로 프라이버시 텔레파시망 & 초공감 문명",
      prize: "$15 Billion USD",
      score: 96,
      icon: "🧠",
      domain: "Cognitive Evolution",
      domainKo: "인지 진화 & 초연결",
      mtp: "Break the 50 bps speech bottleneck to enable 100 Mbps silent empathetic thought transfer.",
      mtpKo: "50 bps 언어 병목을 깨고 초당 100 Mbps 무음성 공감 텔레파시 통신망 구축",
      metric: "99% silent speech decoder accuracy with zero-knowledge on-device thought firewall.",
      metricKo: "99% 무음성 디코더 정확도 및 온디바이스 영지식 생각 방화벽 완성",
      leverage: "20× ($300B Private Capital Generated)"
    },
    {
      id: 5,
      name: "Autonomous 1,000-Person Mars City (Biosphere 3.0)",
      nameKo: "우주 25 탈출을 위한 화성 자족 도시 바이오스피어 3.0",
      prize: "$20 Billion USD",
      score: 99,
      icon: "🚀",
      domain: "Space & Multi-Planetary",
      domainKo: "우주 & 다행성 문명",
      mtp: "Make humanity a multi-planetary immortal civilization to permanently shatter the Universe 25 trap.",
      mtpKo: "인류를 다행성 불멸 문명으로 진화시켜 우주 25의 멸종 덫을 영구 분쇄",
      metric: "1,000 humans living 10 years on Mars surface with 100% autonomous closed-loop ISRU.",
      metricKo: "1,000명이 외부 보급 없이 10년간 자급자족하는 완전 폐쇄 생태계 완성",
      leverage: "50× ($1,000B Private Capital Generated)"
    },
    {
      id: 6,
      name: "Global PFAS & Microplastics Total SCWO Destruction",
      nameKo: "전 지구 PFAS 및 미세플라스틱 100% 완전 분해 SCWO",
      prize: "$15 Billion USD",
      score: 97,
      icon: "💧",
      domain: "Planetary Detox",
      domainKo: "행성 정화 및 해독",
      mtp: "Eradicate forever chemicals from all global waterways and human brains using supercritical water.",
      mtpKo: "초임계수를 이용해 전 지구 수계와 인체 뇌 속 잔류 화학물질 100% 박멸",
      metric: "10,000 SCWO modular plants deployed decomposing 100M tons/day with 99.999% C-F destruction.",
      metricKo: "10,000기 모듈러 플랜트 가동으로 일 1억 톤 C-F 결합 99.999% 완전 분해",
      leverage: "35× ($525B Private Capital Generated)"
    }
  ];

  const handleFund = (teamIdx) => {
    if (!fundedTeams.includes(teamIdx)) {
      setFundedTeams([...fundedTeams, teamIdx]);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const activeTeam = teams[selectedTeam];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>{lang === 'en' ? 'Phase 4: Week 15 Grand Capstone Pitch Studio' : 'Phase 4: 15주차 최종 종합 캡스톤 스튜디오'}</span>
          </div>
          <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl text-white">
            {lang === 'en' ? '$100 Billion Giga-XPRIZE Interactive Board' : '1,000억 달러 Giga-XPRIZE 심사 보드'}
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-purple-950/40 border border-purple-500/40 px-4 py-2 rounded-xl text-purple-300 font-mono text-xs font-bold shadow-[0_0_20px_rgba(139,92,246,0.2)]">
          <span>{lang === 'en' ? 'Global Purse: $100 Billion USD' : '글로벌 총 상금: 1,000억 달러 (100B USD)'}</span>
        </div>
      </div>

      {/* Grid: 6 Teams Selection Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {teams.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setSelectedTeam(idx)}
            className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
              selectedTeam === idx
                ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.35)]'
                : 'glass-panel hover:border-purple-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{t.icon}</span>
              <span className="text-[10px] font-bold font-mono text-cyan-300">Team 0{t.id}</span>
            </div>
            <div className="font-['Outfit'] font-bold text-xs text-white truncate">
              {lang === 'en' ? t.name : t.nameKo}
            </div>
            <div className="text-[10px] font-mono text-purple-300 mt-1 font-semibold">{t.prize}</div>
          </button>
        ))}
      </div>

      {/* Detail Focus Panel for Active Team */}
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 8 Cols: Project Pitch Specs */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-purple text-xs">
                {lang === 'en' ? `TEAM 0${activeTeam.id} PROPOSAL` : `팀 0${activeTeam.id} 제안서`}
              </span>
              <span className="badge badge-cyan text-xs">
                {lang === 'en' ? activeTeam.domain : activeTeam.domainKo}
              </span>
              <span className="badge badge-amber text-xs">
                {lang === 'en' ? `Score: ${activeTeam.score}/100` : `심사 점수: ${activeTeam.score}/100`}
              </span>
            </div>

            <h3 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl text-white">
              {lang === 'en' ? activeTeam.name : activeTeam.nameKo}
            </h3>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                {lang === 'en' ? 'Massive Transformative Purpose (MTP):' : '거대 변혁적 목표 (MTP):'}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                "{lang === 'en' ? activeTeam.mtp : activeTeam.mtpKo}"
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'en' ? 'Auditable Target Metric:' : '검증 가능한 핵심 목표 지표:'}
              </div>
              <p className="text-xs text-slate-300 bg-white/5 p-3 rounded-lg border border-slate-800/80 font-mono">
                {lang === 'en' ? activeTeam.metric : activeTeam.metricKo}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
              <span className="text-slate-400">
                {lang === 'en' ? 'Prize Allocation: ' : '상금 배정: '}
                <strong className="text-purple-300 font-mono text-sm">{activeTeam.prize}</strong>
              </span>
              <span className="text-slate-400">
                {lang === 'en' ? 'Capital Multiplier: ' : '민간 자본 승수 효과: '}
                <strong className="text-emerald-400 font-mono text-sm">{activeTeam.leverage}</strong>
              </span>
            </div>
          </div>

          {/* Right 4 Cols: Funding & Smart Contract Simulation */}
          <div className="lg:col-span-4 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between text-center space-y-6">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-3xl mx-auto mb-3 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                {activeTeam.icon}
              </div>
              <div className="font-['Syne'] text-xl font-bold text-white mb-1">
                {activeTeam.prize}
              </div>
              <p className="text-[11px] text-slate-400">
                {lang === 'en' ? 'Smart Contract Escrow Allocation' : '블록체인 스마트 계약 에스크로 배정'}
              </p>
            </div>

            <div>
              <button
                onClick={() => handleFund(selectedTeam)}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  fundedTeams.includes(selectedTeam)
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'btn-primary'
                }`}
              >
                {fundedTeams.includes(selectedTeam) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'en' ? 'Giga-Fund Allocated ✓' : '펀딩 승인 완료 ✓'}</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Simulate $100B Award' : '상금 수여 시뮬레이션'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
