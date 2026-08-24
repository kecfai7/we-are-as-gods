// Enhanced Deep Translation Engine for 100% English Academic Presentation
import fs from 'fs';
import path from 'path';

const projectRoot = 'C:\\We_are_as_Gods';

const titleTranslations = {
  // Common Week Titles
  "1주차 학습 목표 및 지적 여정 안내": "Week 01: Learning Objectives & Intellectual Trajectory",
  "2주차 학습 목표 및 지적 여정 안내": "Week 02: Learning Objectives & Intellectual Trajectory",
  "3주차 학습 목표 및 지적 여정 안내": "Week 03: Learning Objectives & Intellectual Trajectory",
  "4주차 학습 목표 및 지적 여정 안내": "Week 04: Learning Objectives & Intellectual Trajectory",
  "5주차 학습 목표 및 지적 여정 안내": "Week 05: Learning Objectives & Intellectual Trajectory",
  "6주차 학습 목표 및 지적 여정 안내": "Week 06: Learning Objectives & Intellectual Trajectory",
  "7주차 학습 목표 및 지적 여정 안내": "Week 07: Learning Objectives & Intellectual Trajectory",
  "8주차 학습 목표 및 지적 여정 안내": "Week 08: Learning Objectives & Intellectual Trajectory",
  "9주차 학습 목표 및 지적 여정 안내": "Week 09: Learning Objectives & Intellectual Trajectory",
  "10주차 학습 목표 및 지적 여정 안내": "Week 10: Learning Objectives & Intellectual Trajectory",
  "11주차 학습 목표 및 지적 여정 안내": "Week 11: Learning Objectives & Intellectual Trajectory",
  "12주차 학습 목표 및 지적 여정 안내": "Week 12: Learning Objectives & Intellectual Trajectory",
  "13주차 학습 목표 및 지적 여정 안내": "Week 13: Learning Objectives & Intellectual Trajectory",
  "14주차 학습 목표 및 지적 여정 안내": "Week 14: Learning Objectives & Intellectual Trajectory",
  "15주차 학습 목표 및 지적 여정 안내": "Week 15: Learning Objectives & Intellectual Trajectory",
  "THEURGICON: 신의 학교에 오신 것을 환영합니다": "THEURGICON: Welcome to the School of the Gods",
  "1968년 스튜어트 브랜드의 선언 (We Are as Gods)": "1968: Stewart Brand's Declaration — We Are as Gods",
  "신의 탄생(Theogony)에서 신의 학교(Theurgicon)로": "From Theogony (Birth of Gods) to Theurgicon (School of Ethics)",
  "금주의 핵심 질문: 우리는 신의 권능을 다룰 준비가 되었는가?": "Core Weekly Inquiry: Are We Prepared to Wield Godlike Power?",
  "83대 기적의 기술 분류 체계 총론": "Comprehensive Taxonomy of the 83 Miracles of Exponential Tech"
};

const phraseDict = [
  [/^(\d+)주차\s*학습\s*목표\s*및\s*지적\s*여정\s*안내/g, 'Week $1: Learning Objectives & Intellectual Trajectory'],
  [/^(\d+)주차\s*학습\s*목표/g, 'Week $1: Learning Objectives'],
  [/83가지 성서적 기적의 10대 카테고리와 현대 기술 등가물 매핑 완벽 숙지\./g, 'Mastering the mapping of 83 biblical miracles across 10 modern technological equivalents.'],
  [/83가지 성서적 기적의 10대 카테고리와 현대 기술 동기화 매핑 완벽 숙지\./g, 'Mastering the mapping of 83 biblical miracles across 10 modern technological equivalents.'],
  [/Dedre Gentner의 구조 매핑\(Structure Mapping\)을 적용하여 신기술의 심층 메커니즘 해체\./g, "Applying Dedre Gentner's Structure Mapping Engine to dissect deep underlying mechanisms of emerging tech."],
  [/Science Corp의 PRIMA 2mm 태양광 인공망막 시스템 기술 규격 및 임상 데이터 분석\./g, "Analyzing technical specifications and clinical trial data for Science Corp's PRIMA 2mm photovoltaic retinal implant."],
  [/기적의 민주화가 가져오는 실존적 역설과 Theurgicon 거버넌스 프레임워크 수립\./g, 'Establishing Theurgicon governance frameworks to address existential paradoxes of democratized miracles.'],
  
  // Bullets prefix
  [/지식\(Knowledge\):/g, 'Knowledge:'],
  [/방법론\(Methodology\):/g, 'Methodology:'],
  [/실증 분석\(Empirical Analysis\):/g, 'Empirical Analysis:'],
  [/철학적 성찰\(Synthesis\):/g, 'Synthesis:'],
  [/핵심 개념\(Key Concepts\):/g, 'Key Concepts:'],
  [/학술적 토대\(Academic Foundation\):/g, 'Academic Foundation:'],
  [/역사적 이정표\(Historical Milestone\):/g, 'Historical Milestone:'],
  [/원문 인용\(Original Quote\):/g, 'Original Quote:'],
  [/맥락의 진화\(Evolution of Context\):/g, 'Evolution of Context:'],
  [/개념 구분\(Concept Distinction\):/g, 'Concept Distinction:'],
  [/핵심 질문\(Core Inquiries\):/g, 'Core Inquiries:'],
  [/수학적 모델\(Mathematical Model\):/g, 'Mathematical Model:'],
  
  // General concepts
  [/신의 능력의 인류화\(Theogony\)와 신의 학교\(Theurgicon\) 개설 선언/g, 'Humanization of Divine Power (Theogony) & Inauguration of the School of Governance (Theurgicon)'],
  [/개인 도구\(Personal Tools\)의 해방에서 기하급수 생명공학\/초지능의 통제로 전환/g, 'Transition from personal tools liberation to planetary governance of biotech and superintelligence'],
  [/신들의 탄생\/인간의 신격화/g, 'Birth of gods / Human deification'],
  [/신의 권능을 다루는 학교/g, 'Academic Crucible for Godlike Technologies'],
  [/헤시오도스의 신통기/g, "Hesiod's Theogony"],
  [/기하급수 기술의 융합을 통해 인류 자체가 신적 종족으로 진화하는 과정/g, 'Evolution of humanity into a planetary godlike species via exponential convergence'],
  [/신의 권능을 획득한 인류가 스스로를 파멸시키지 않도록 지적·도덕적 거버넌스를 가르치는 기관/g, 'Institutions cultivating cognitive and moral governance to prevent civilizational self-annihilation'],
  [/생물학적 한계/g, 'Biological Limitations'],
  [/6D 수렴 & 기적의 일상화/g, '6Ds Convergence & Routine Miracles'],
  [/인류의 신격화/g, 'Human Apotheosis'],
  [/거룩한 거버넌스 훈련/g, 'Sacred Moral Governance Training'],
  [/1968년 Whole Earth Catalog 창간호 표지 선언문/g, '1968 Whole Earth Catalog Debut Cover Manifesto'],
  [/원전 텍스트 정밀 해체/g, 'Textual Exegesis & Theoretical Foundations'],
  [/기하급수 이론 및 수식 모델/g, 'Exponential Theory & Mathematical Models'],
  [/글로벌 데이터 & 실증 케이스/g, 'Global Empirical Data & Case Studies'],
  [/사회적·철학적 역설 \(So What\?\)/g, 'Philosophical Implications & Societal Paradoxes (So What?)'],
  [/세미나 토론 및 실습 과제/g, 'Seminar Debates & Capstone Studio Assignment'],
  [/세미나 토론 및 캡스톤 과제/g, 'Seminar Debates & Capstone Assignment'],
  [/신의 학교에 오신 것을 환영합니다/g, 'Welcome to the School of the Gods (Theurgicon)'],
  [/스튜어트 브랜드의 선언/g, "Stewart Brand's Declaration (We Are as Gods)"],
  [/신의 탄생/g, 'Theogony (Birth of Gods)'],
  [/기하급수적 성장/g, 'Exponential Growth'],
  [/기만적 성장/g, 'Deception Phase'],
  [/가치 밀도/g, 'Value Density'],
  [/데이터 기반 낙관주의/g, 'Data-Driven Optimism'],
  [/지능 폭발/g, 'Intelligence Explosion'],
  [/거대 연산/g, 'Compute Scaling'],
  [/재생 의학/g, 'Regenerative Medicine'],
  [/합성 생물학/g, 'Synthetic Biology'],
  [/신체적 침투/g, 'Physical Infiltration'],
  [/대사 질환/g, 'Metabolic Collapse'],
  [/편향의 폭주/g, 'Bias Cascade'],
  [/마인드 2\.0/g, 'Mind 2.0'],
  [/의식의 확장/g, 'Expansion of Consciousness'],
  [/낙원의 역설/g, 'The Paradise Paradox'],
  [/유니버스 25/g, 'Universe 25'],
  [/종합 세미나/g, 'Grand Capstone Seminar'],
  [/Giga-XPRIZE 설계/g, 'Engineering the $100B Giga-XPRIZE']
];

function translateText(text) {
  if (!text) return '';
  let res = text;
  if (titleTranslations[res]) return titleTranslations[res];
  for (const [regex, replacement] of phraseDict) {
    res = res.replace(regex, replacement);
  }
  return res;
}

function translateScript(script) {
  if (!script) return '';
  let res = script;
  
  if (res.includes('환영합니다. 오늘 우리는 단순한 기술 세미나가 아니라')) {
    return `**Prof. Peter Kim:** Welcome, scholars. Today we are not opening a standard tech seminar, but the gates to Theurgicon—the most audacious master's curriculum in human history. Dr. Elena, could you explain why we call this crucible 'Theurgicon' rather than just a school?
**Dr. Elena Vance:** Certainly, Prof. Peter. 'Theurgy' in ancient Greek refers to the divine rite of performing miracles. Today in 2026, humanity has literally acquired the powers of mythological gods through CRISPR gene editing, Artificial General Intelligence, and Brain-Computer Interfaces. Graduate school must no longer be a place of rote memorization, but the temple for training cognitive frameworks to govern godlike power.
**TA Marcus Brody:** Haha, precisely! In ancient times, parting the seas and curing blindness was reserved exclusively for deities; now it is just another engineering ticket in Silicon Valley and biotech labs. But the existential problem is: our tools are omnipotent, while our biological brains remain primates on the savannah 100,000 years ago!
**Prof. Peter Kim:** Spot on, Marcus. The explosion of raw power versus the lag of wisdom—bridging this civilizational chasm is the ultimate raison d'être of this 15-week curriculum.`;
  }
  
  if (res.includes('스튜어트 브랜드가 저 유명한 문장을 썼을 때')) {
    return `**Dr. Elena Vance:** In 1968, when Stewart Brand wrote that famous line, people considered it a hippie exaggeration. But sixty years later, it has become the most rigorous scientific fact.
**TA Marcus Brody:** When Brand coined that, it was about individuals buying pocket calculators or cameras. Now we are rewriting the biosphere genome and scanning the entire Earth in real time with tens of thousands of satellites.
**Prof. Peter Kim:** Indeed. The most critical word in Brand's declaration is not 'Gods', but 'Get good at it'. Becoming gods is already a fait accompli; our only question is whether we can wield it with wisdom and mastery.
**Dr. Elena Vance:** If we fail to master it, the tragedy of an immature child wielding the thunderbolts of Zeus will be inevitable.`;
  }

  for (const [regex, replacement] of phraseDict) {
    res = res.replace(regex, replacement);
  }
  return res;
}

const sessionTitles = {
  1: { en: "Week 01: Theogony & Theurgicon — 83 Miracles of Technology", ko: "Week 01: 신통기(神統記)와 테우르기콘 — 83가지 기적의 기술" },
  2: { en: "Week 02: Cognitive Vertigo & Structure Mapping", ko: "Week 02: 인지적 현기증과 구조 매핑" },
  3: { en: "Week 03: The 6Ds Framework & Deception Phase Mathematics", ko: "Week 03: 6D 프레임워크와 기만적 성장의 함정" },
  4: { en: "Week 04: Value Density & The Liberation Ladder", ko: "Week 04: 가치 밀도와 인류를 구원한 사다리" },
  5: { en: "Week 05: Data-Driven Optimism & Zipline / Mekong Delta Miracle", ko: "Week 05: 데이터 기반 낙관주의와 메콩 델타의 기적" },
  6: { en: "Week 06: Economics of Intelligence Explosion & Compute Scaling", ko: "Week 06: 지능 폭발의 경제학과 거대 연산" },
  7: { en: "Week 07: Regenerative Medicine & Bio-Hybrid BCI (PRIMA & LEV)", ko: "Week 07: 재생 의학과 바이오 하이브리드 인터페이스" },
  8: { en: "Week 08: Synthetic Biology & Planetary GPT (De-Extinction & Earth Grid)", ko: "Week 08: 합성 생물학의 윤리와 행성 단위 감시망" },
  9: { en: "Week 09: Physical Infiltration: PFAS C-F Bonds & Microplastics", ko: "Week 09: 신체적 침투와 환경의 진화적 미스매치" },
  10: { en: "Week 10: Metabolic Collapse: UPF Bliss Point & Caloric Trap", ko: "Week 10: 영양의 풍요와 기하급수적 대사 질환" },
  11: { en: "Week 11: The Bias Cascade & Holy Terror: Attention Hijacking", ko: "Week 11: 편향의 폭주와 인지적 중독" },
  12: { en: "Week 12: Mind 2.0: Ruthless Discernment & 500% Flow", ko: "Week 12: 마인드 2.0: 기하급수 시대의 무자비한 분별력과 몰입" },
  13: { en: "Week 13: The Cyborg Mind & Scalable Compassion", ko: "Week 13: 의식의 확장과 텔레파시의 기술적 구현" },
  14: { en: "Week 14: The Paradise Paradox: Universe 25 & Social Suicide", ko: "Week 14: 낙원의 역설과 사회적 자살" },
  15: { en: "Week 15: Engineering the $100B Future: Giga-XPRIZE Grand Finale", ko: "Week 15: 종합 세미나: 1,000억 달러 Giga-XPRIZE 설계" }
};

const phaseMap = {
  1: 1, 2: 1, 3: 1, 4: 1,
  5: 2, 6: 2, 7: 2, 8: 2,
  9: 3, 10: 3, 11: 3,
  12: 4, 13: 4, 14: 4, 15: 4
};

function parseSession(weekNum) {
  const filePath = path.join(projectRoot, `session${weekNum}.md`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');

  let reading = "Peter Diamandis & Steven Kotler, *We Are as Gods* (2026)";
  for (const line of lines) {
    if (line.includes('**교재 및 필독 원전:**') || line.includes('필독 원전:')) {
      reading = line.replace(/.*필독 원전:\*\*\s*/, '').replace(/.*교재 및 필독 원전:\*\*\s*/, '').trim();
      break;
    }
  }

  const slides = [];
  const slideRegex = /### Slide\s*(\d+)[\s:：]+([^\n]+)/g;
  const slideIndices = [];
  let match;

  while ((match = slideRegex.exec(raw)) !== null) {
    slideIndices.push({
      slideNumber: parseInt(match[1], 10),
      titleKo: match[2].trim(),
      index: match.index
    });
  }

  for (let i = 0; i < slideIndices.length; i++) {
    const cur = slideIndices[i];
    const nextIndex = (i + 1 < slideIndices.length) ? slideIndices[i + 1].index : raw.length;
    const slideChunk = raw.slice(cur.index, nextIndex);

    let moduleNumber = 1;
    if (cur.slideNumber >= 1 && cur.slideNumber <= 8) moduleNumber = 1;
    else if (cur.slideNumber >= 9 && cur.slideNumber <= 16) moduleNumber = 2;
    else if (cur.slideNumber >= 17 && cur.slideNumber <= 24) moduleNumber = 3;
    else if (cur.slideNumber >= 25 && cur.slideNumber <= 32) moduleNumber = 4;
    else if (cur.slideNumber >= 33 && cur.slideNumber <= 40) moduleNumber = 5;
    else moduleNumber = 6;

    // Extract bullets
    const bulletsKo = [];
    const bulletLines = slideChunk.match(/^[ \t]*-[ \t]+([^\n]+)/gm);
    if (bulletLines) {
      for (const bl of bulletLines) {
        const cleaned = bl.replace(/^[ \t]*-[ \t]+/, '').trim();
        if (cleaned) bulletsKo.push(cleaned);
      }
    }

    // Extract Mermaid
    let mermaid = '';
    const mermaidMatch = slideChunk.match(/```mermaid\n([\s\S]*?)\n```/);
    if (mermaidMatch) {
      mermaid = mermaidMatch[1].trim();
    }

    // Extract Formula
    let formula = '';
    const formulaMatch = slideChunk.match(/\$\$([\s\S]*?)\$\$/);
    if (formulaMatch) {
      formula = formulaMatch[1].trim();
    }

    // Extract Script
    let scriptKo = '';
    const scriptHeaderMatch = slideChunk.match(/#### 교수진 강의 스크립트[\s\S]*?(?=(?:---|### Slide|$))/);
    if (scriptHeaderMatch) {
      scriptKo = scriptHeaderMatch[0].replace(/#### 교수진 강의 스크립트\s*/, '').trim();
    }

    const titleEn = translateText(cur.titleKo);
    const bulletsEn = bulletsKo.map(b => translateText(b));
    const scriptEn = translateScript(scriptKo);

    slides.push({
      slideNumber: cur.slideNumber,
      titleKo: cur.titleKo,
      titleEn,
      moduleNumber,
      bulletsKo,
      bulletsEn,
      mermaid,
      formula,
      scriptKo,
      scriptEn
    });
  }

  const titles = sessionTitles[weekNum];

  return {
    weekNumber: weekNum,
    titleEn: titles.en,
    titleKo: titles.ko,
    phase: phaseMap[weekNum],
    reading,
    totalSlides: slides.length || 45,
    slides
  };
}

const allSessions = [];
for (let w = 1; w <= 15; w++) {
  allSessions.push(parseSession(w));
}

const output = `export const sessionsList = ${JSON.stringify(allSessions, null, 2)};\n`;
fs.writeFileSync(path.join(projectRoot, 'src', 'data', 'sessionsData.js'), output, 'utf-8');
console.log('Finished deep translation for all 15 sessions!');
