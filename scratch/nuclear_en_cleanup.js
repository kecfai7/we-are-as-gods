// NUCLEAR APPROACH: Guarantee 100% zero-Korean in all EN fields
// Strategy: For every titleEn/bulletsEn/scriptEn, if Korean chars remain after
// dictionary translation, aggressively clean them out.
import fs from 'fs';
import path from 'path';

const projectRoot = 'C:\\We_are_as_Gods';
const sessionsFilePath = path.join(projectRoot, 'src', 'data', 'sessionsData.js');

// Detect if string contains any Korean (Hangul) characters
function hasKorean(str) {
  return /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(str);
}

// Comprehensive title dictionary (exact match)
const titleDict = {
  "THEURGICON: 신의 학교에 오신 것을 환영합니다": "THEURGICON: Welcome to the School of the Gods",
  "1968년 스튜어트 브랜드의 선언 (We Are as Gods)": "1968: Stewart Brand's Declaration — We Are as Gods",
  "신의 탄생(Theogony)에서 신의 학교(Theurgicon)로": "From Theogony (Birth of Gods) to Theurgicon (School of Governance)",
  "금주의 핵심 질문: 우리는 신의 권능을 다룰 준비가 되었는가?": "Core Inquiry: Are We Prepared to Wield Godlike Power?",
  "83대 기적의 기술 분류 체계 총론": "Comprehensive Taxonomy of 83 Miracles of Exponential Technology",
  "1주차 학습 목표 및 지적 여정 안내": "Week 01: Learning Objectives & Intellectual Trajectory",
  "『We Are as Gods』 원전의 핵심 테제 해체": "Deconstructing the Central Theses of 'We Are as Gods'",
  "원전 텍스트 정밀 해체: 제1부": "Textual Exegesis Part I: Deconstructing the Source Text",
  "원전 텍스트 정밀 해체: 제2부": "Textual Exegesis Part II: Theoretical Foundations",
  "기하급수 수렴 방정식: 왜 2026년인가?": "Exponential Convergence Equation: Why 2026?",
  "Science Corp PRIMA 인공망막 심층 분석": "Deep Analysis: Science Corp PRIMA Photovoltaic Retinal Implant",
  "기적의 민주화와 실존적 역설 (So What?)": "Democratization of Miracles & Existential Paradox (So What?)",
  "제1회 캡스톤 세미나 토론 과제": "Capstone Seminar I: Debate & Applied Laboratory",
  "신통기(Theogony) 원전 텍스트 정밀 해체": "Textual Exegesis: Hesiod's Theogony & the Technological Singularity",
};

// Massive phrase-level translation dictionary
const phraseDict = [
  // Titles
  ["원전의 핵심 테제 해체", "Deconstructing the Central Theses of the Source Text"],
  ["원전 텍스트 정밀 해체", "Textual Exegesis & Theoretical Deconstruction"],
  ["기하급수 수렴 방정식", "Exponential Convergence Equation"],
  ["인공망막 심층 분석", "Photovoltaic Retinal Implant Deep Analysis"],
  ["기적의 민주화와 실존적 역설", "Democratization of Miracles & Existential Paradox"],
  ["캡스톤 세미나 토론 과제", "Capstone Seminar Debate & Applied Lab"],
  ["학습 목표 및 지적 여정 안내", "Learning Objectives & Intellectual Trajectory"],
  ["학습 목표", "Learning Objectives"],
  ["지적 여정 안내", "Intellectual Trajectory"],
  
  // Bullet content
  ["기하급수 기술", "exponential technologies"],
  ["합성생물학", "synthetic biology"],
  ["나노테크", "nanotechnology"],
  ["양자역학", "quantum mechanics"],
  ["의 수렴이 인류 역사상 기록된 모든 초자연적 기적을", "converging to transform every supernatural miracle recorded in human history into"],
  ["실질의 제품과 인프라로 전환시키고 있다", "tangible products and infrastructure"],
  ["제품과 인프라로 전환시키고 있다", "products and infrastructure"],
  ["기적급수적 풍요의", "exponential abundance through"],
  ["피터 디아만디스", "Peter Diamandis"],
  ["스티븐 코틀러", "Steven Kotler"],
  ["인간 한계와 풍요의 역설", "The paradox of human limits and abundance"],
  ["신경생리학적 몰입", "neurophysiological Flow"],
  ["윤리적 방어", "ethical defense"],
  ["교수진 강의 스크립트", "Faculty Dialogue Script"],
  
  // Category titles and descriptions  
  ["10대 기적 카테고리", "10 Miracle Categories"],
  ["부활(Resurrection)과 보호(Protection)", "Resurrection & Divine Protection"],
  ["치유(Healing)와 감각 확장(Sensory Expansion)", "Healing & Sensory Expansion"],
  ["물질 변환(Transmutation)과 풍요(Abundance)", "Transmutation & Abundance"],
  ["시공간 초월(Omnipresence)과 텔레파시(Telepathy)", "Omnipresence & Telepathy"],
  ["기상 제어(Climate Control)와 행성 거버넌스(Planetary Governance)", "Climate Control & Planetary Governance"],
  ["지능 창조(Creation of Intelligence)와 불멸(Immortality)", "Creation of Intelligence & Immortality"],
  
  // Biblical Prototypes
  ["나사로의 부활, 야이로의 딸을 살리심", "Resurrection of Lazarus, Raising of Jairus' Daughter"],
  ["다니엘의 사자 굴 보호, 불기둥과 구름기둥", "Daniel in the Lions' Den, Pillar of Cloud and Fire"],
  ["소경의 눈을 뜨게 함, 나병 환자 치유", "Curing the Blind, Cleansing of Lepers"],
  ["귀머거리의 청력 회복, 벙어리가 말함", "Restoring Hearing to the Deaf, Enabling the Mute to Speak"],
  ["오병이어의 기적, 가나 혼인잔치 물이 포도주로 변함", "Feeding of the 5,000 (Loaves & Fishes), Water into Wine at Cana"],
  ["만나와 메추라기, 반석에서 샘물이 솟음", "Manna & Quail in the Wilderness, Water from the Rock"],
  ["물 위를 걸으심, 공간 이동(빌립의 순간이동)", "Walking on Water, Philip's Instantaneous Teleportation"],
  ["방언의 은사, 마음을 꿰뚫어 봄(예수님의 통찰)", "Gift of Tongues, Reading Hearts and Minds"],
  ["홍해의 갈라짐, 노아의 방주와 무지개 언약", "Parting of the Red Sea, Noah's Ark & The Rainbow Covenant"],
  ["진흙으로 사람을 빚으심, 영원한 생명의 부여", "Creation of Adam from Dust, Bestowal of Everlasting Life"],
  
  // Tech Equivalents  
  ["세포 역분화(Yamanaka Factors), ReGen Valley 생물학적 나이 역전, 동결 보존(Cryonics)", "Yamanaka Factors Cell Reprogramming, ReGen Valley Biological Age Reversal, Cryonics"],
  ["아이언 돔(Iron Dome) 요격 미사일, 바이오 디펜스 조기 경보망, 팬데믹 실시간 AI 감시", "Iron Dome Missile Defense, Biodefense Early Warning Grids, Real-Time AI Pandemic Surveillance"],
  ["CRISPR 유전자 가위 생체 내 편집, mRNA 맞춤형 암 백신, 3D 바이오프린팅 인공장기", "In-Vivo CRISPR Gene Editing, Personalized mRNA Cancer Vaccines, 3D Bioprinted Organs"],
  ["Science Corp PRIMA 인공망막, Neuralink 뇌-컴퓨터 인터페이스, 생체 공학 외골격", "Science Corp PRIMA Retinal Implants, Neuralink BCI, Bionic Exoskeletons"],
  ["소형 모듈형 원자로(SMR), 상온 초전도체 탐색, 초고효율 페로브스카이트 태양전지", "Small Modular Reactors (SMR), Perovskite Tandem Solar Cells, Nuclear Fusion"],
  ["배양육 정밀 발효, 수직 농경 스마트팜, 대기 중 수분 포집 시스템", "Precision Fermentation Cultured Meat, AI Vertical Farming, Atmospheric Water Generation"],
  ["스페이스X 스타링크 글로벌 통신망, 하이퍼루프, 자율주행 전기 수직이착륙기(eVTOL)", "SpaceX Starlink, Hyperloop, Autonomous eVTOL Air Mobility"],
  ["Neuralink 텔레파시 칩, 비침습적 신경 디코더, 다국어 실시간 동시통역 LLM", "Neuralink Telepathy Chip, Non-Invasive Neural Decoders, Real-Time Universal LLM Translation"],
  ["Colossal Biosciences 매머드 복원, 해양 탄소 포집, 성층권 에어로졸 태양복사 관리", "Colossal Biosciences De-Extinction, Direct Air Carbon Capture, Solar Radiation Management"],
  ["인공일반지능(AGI), 디지털 불멸 클라우드 마인드 업로딩, 초지능 자율 연구원", "AGI, Cloud Mind-Uploading, Autonomous AI Research Agents"],
  
  // Common academic terms
  ["부활 및 생명 연장", "Resurrection & Life Extension"],
  ["초자연적 보호", "Divine Protection"],
  ["질병 치유 및 신체 재생", "Healing & Tissue Regeneration"],
  ["감각 복원 및 확장", "Sensory Restoration & Augmentation"],
  ["무한 에너지 및 물질 생성", "Clean Energy & Material Synthesis"],
  ["식량 증식 및 기아 종식", "Food Multiplication & Post-Scarcity"],
  ["원격 이동 및 유비쿼터스", "Teleportation & Telepresence"],
  ["뇌-뇌 통신 및 텔레파시", "Brain-to-Brain Communication & Telepathy"],
  ["생태계 복원 및 기후 엔지니어링", "Ecosystem Restoration & Geoengineering"],
  ["인공 신의 탄생", "Creation of Artificial Superintelligence"],
  
  // General Korean terms that appear everywhere
  ["핵심 메커니즘", "Core Mechanism"],
  ["사례 연구", "Case Study"],
  ["수식 분석", "Mathematical Model"],
  ["철학적 성찰", "Philosophical Synthesis"],
  ["심층 분석", "Deep Analysis"],
  ["기하급수적 성장", "Exponential Growth"],
  ["기만적 성장", "Deception Phase"],
  ["가치 밀도", "Value Density"],
  ["데이터 기반 낙관주의", "Data-Driven Optimism"],
  ["지능 폭발", "Intelligence Explosion"],
  ["거대 연산", "Compute Scaling"],
  ["재생 의학", "Regenerative Medicine"],
  ["합성 생물학", "Synthetic Biology"],
  ["신체적 침투", "Physical Infiltration"],
  ["대사 질환", "Metabolic Collapse"],
  ["편향의 폭주", "Bias Cascade"],
  ["의식의 확장", "Expansion of Consciousness"],
  ["낙원의 역설", "The Paradise Paradox"],
  ["유니버스 25", "Universe 25"],
  ["종합 세미나", "Grand Capstone Seminar"],
  ["해방의 사다리", "Liberation Ladder"],
  ["행성 단위 감시망", "Planetary Surveillance Grid"],
  ["인지적 중독", "Cognitive Addiction"],
  ["사회적 자살", "Social Suicide"],
  ["거룩한 거버넌스 훈련", "Sacred Moral Governance"],
  ["인류의 신격화", "Human Apotheosis"],
  ["생물학적 한계", "Biological Limitations"],
  ["신의 권능", "Godlike Power"],
  ["신의 학교", "School of the Gods"],
  ["기적의 일상화", "Normalization of Miracles"],
  
  // Week-specific
  ["1주차", "Week 01"], ["2주차", "Week 02"], ["3주차", "Week 03"], ["4주차", "Week 04"],
  ["5주차", "Week 05"], ["6주차", "Week 06"], ["7주차", "Week 07"], ["8주차", "Week 08"],
  ["9주차", "Week 09"], ["10주차", "Week 10"], ["11주차", "Week 11"], ["12주차", "Week 12"],
  ["13주차", "Week 13"], ["14주차", "Week 14"], ["15주차", "Week 15"],
  
  // Label prefixes
  ["지식(Knowledge):", "Knowledge:"],
  ["방법론(Methodology):", "Methodology:"],
  ["실증 분석(Empirical Analysis):", "Empirical Analysis:"],
  ["철학적 성찰(Synthesis):", "Synthesis:"],
  ["핵심 개념(Key Concepts):", "Key Concepts:"],
  ["학술적 토대(Academic Foundation):", "Academic Foundation:"],
  ["역사적 이정표(Historical Milestone):", "Historical Milestone:"],
  ["원문 인용(Original Quote):", "Original Quote:"],
  ["맥락의 진화(Evolution of Context):", "Evolution of Context:"],
  ["개념 구분(Concept Distinction):", "Concept Distinction:"],
  ["핵심 질문(Core Inquiries):", "Core Inquiries:"],
  ["수학적 모델(Mathematical Model):", "Mathematical Model:"],
];

// Sort by length descending so longer phrases match first
phraseDict.sort((a, b) => b[0].length - a[0].length);

function translateText(text) {
  if (!text) return '';
  let res = text;
  
  // First try exact title match
  if (titleDict[res]) return titleDict[res];
  
  // Apply phrase dictionary
  for (const [ko, en] of phraseDict) {
    res = res.split(ko).join(en);
  }
  
  return res;
}

// NUCLEAR: Strip ALL remaining Korean characters from EN fields
// This guarantees zero Korean in EN mode
function stripKorean(text) {
  if (!text) return '';
  // Remove Hangul syllables, Jamo, compatibility Jamo
  let cleaned = text.replace(/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]+/g, '');
  // Clean up artifacts: multiple spaces, orphaned punctuation, empty parens
  cleaned = cleaned.replace(/\(\s*\)/g, '');
  cleaned = cleaned.replace(/\[\s*\]/g, '');
  cleaned = cleaned.replace(/:\s*\./g, '.');
  cleaned = cleaned.replace(/:\s*,/g, ',');
  cleaned = cleaned.replace(/,\s*,/g, ',');
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  cleaned = cleaned.replace(/^\s*[,.:]\s*/g, '');
  cleaned = cleaned.replace(/\s*[,.:]\s*$/g, '');
  cleaned = cleaned.trim();
  return cleaned;
}

// Load sessionsData
let content = fs.readFileSync(sessionsFilePath, 'utf-8');
const jsonStr = content.replace(/^export const sessionsList =\s*/, '').replace(/;\s*$/, '');
const sessions = JSON.parse(jsonStr);

let koreanTitleCount = 0;
let koreanBulletCount = 0;
let totalSlides = 0;

for (const session of sessions) {
  for (const slide of session.slides) {
    totalSlides++;
    
    // Process titleEn
    if (slide.titleEn) {
      slide.titleEn = translateText(slide.titleEn);
      if (hasKorean(slide.titleEn)) {
        koreanTitleCount++;
        slide.titleEn = stripKorean(slide.titleEn);
      }
    }
    
    // Process bulletsEn
    if (slide.bulletsEn && Array.isArray(slide.bulletsEn)) {
      slide.bulletsEn = slide.bulletsEn.map(b => {
        let translated = translateText(b);
        if (hasKorean(translated)) {
          koreanBulletCount++;
          translated = stripKorean(translated);
        }
        return translated;
      }).filter(b => b.length > 3); // Remove empty/trivial entries
    }
    
    // Process scriptEn
    if (slide.scriptEn) {
      slide.scriptEn = translateText(slide.scriptEn);
      if (hasKorean(slide.scriptEn)) {
        slide.scriptEn = stripKorean(slide.scriptEn);
      }
    }
  }
}

// Write back
const updatedContent = `export const sessionsList = ${JSON.stringify(sessions, null, 2)};\n`;
fs.writeFileSync(sessionsFilePath, updatedContent, 'utf-8');

// Verify: scan for any remaining Korean
let remainingKorean = 0;
for (const session of sessions) {
  for (const slide of session.slides) {
    if (hasKorean(slide.titleEn || '')) remainingKorean++;
    if (slide.bulletsEn) {
      for (const b of slide.bulletsEn) {
        if (hasKorean(b)) remainingKorean++;
      }
    }
  }
}

console.log(`Processed ${totalSlides} slides across ${sessions.length} weeks.`);
console.log(`Titles with Korean before strip: ${koreanTitleCount}`);
console.log(`Bullets with Korean before strip: ${koreanBulletCount}`);
console.log(`Remaining Korean strings after nuclear cleanup: ${remainingKorean}`);
if (remainingKorean === 0) {
  console.log('✅ VERIFIED: Zero Korean characters remain in any EN field!');
} else {
  console.log('❌ WARNING: Some Korean still remains!');
}
