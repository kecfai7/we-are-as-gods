import fs from 'fs';
import path from 'path';

const projectRoot = 'C:\\We_are_as_Gods';

const sessionTitles = {
  1: { en: "Week 01: Theogony & Theurgicon — Institutionalizing Modern Miracles", ko: "Week 01: 신통기(神統記)와 테우르기콘 — 83가지 기적의 기술" },
  2: { en: "Week 02: Cognitive Vertigo & Structure Mapping — Bridging the Savanna Gap", ko: "Week 02: 인지적 현기증과 구조 매핑" },
  3: { en: "Week 03: The 6Ds Framework & The Deception Trap — Mathematics of Growth", ko: "Week 03: 6D 프레임워크와 기만적 성장의 함정" },
  4: { en: "Week 04: Value Density & The Liberation Ladder — Dematerializing Scarcity", ko: "Week 04: 가치 밀도와 인류를 구원한 사다리" },
  5: { en: "Week 05: Data-Driven Optimism & The Mekong Miracle — Leapfrogging Logistics", ko: "Week 05: 데이터 기반 낙관주의와 메콩 델타의 기적" },
  6: { en: "Week 06: The Economics of Intelligence Explosion — Compute Scaling & AI", ko: "Week 06: 지능 폭발의 경제학과 거대 연산" },
  7: { en: "Week 07: Regenerative Medicine & Bio-Hybrid Horizons — PRIMA Retinal Chips", ko: "Week 07: 재생 의학과 바이오 하이브리드 인터페이스" },
  8: { en: "Week 08: Synthetic Biology & Biosphere Telemetry — Engineering Life & Planet GPT", ko: "Week 08: 합성 생물학의 윤리와 행성 단위 감시망" },
  9: { en: "Week 09: Physical Infiltration & Evolutionary Mismatch — PFAS & Microplastics", ko: "Week 09: 신체적 침투와 환경의 진화적 미스매치" },
  10: { en: "Week 10: The Caloric Trap & Metabolic Optimization — GLP-1s & Bliss Point", ko: "Week 10: 영양의 풍요와 기하급수적 대사 질환" },
  11: { en: "Week 11: The Cognitive Trap & Informational Poisoning — Bias Cascades & Holy Terror", ko: "Week 11: 편향의 폭주와 인지적 중독" },
  12: { en: "Week 12: Mind 2.0: Ruthless Discernment & The Neuroscience of Flow", ko: "Week 12: 마인드 2.0: 기하급수 시대의 무자비한 분별력과 몰입" },
  13: { en: "Week 13: The Cyborg Mind: BCI Telepathy & Scalable Compassion", ko: "Week 13: 의식의 확장과 텔레파시의 기술적 구현" },
  14: { en: "Week 14: The Paradise Paradox & Universe 25 — Escaping Behavioral Sinks", ko: "Week 14: 낙원의 역설과 사회적 자살" },
  15: { en: "Week 15: The Theurgic Civilization & Planetary Stewardship — $100B Giga-XPRIZE", ko: "Week 15: 종합 세미나: 1,000억 달러 Giga-XPRIZE 설계" }
};

const phaseMap = {
  1: 1, 2: 1, 3: 1, 4: 1,
  5: 2, 6: 2, 7: 2, 8: 2,
  9: 3, 10: 3, 11: 3,
  12: 4, 13: 4, 14: 4, 15: 4
};

function parseMarkdownSlides(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return new Map();
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const slidesMap = new Map();

  const slideRegex = /### Slide\s*(\d+)[\s:：]+([^\n]+)/g;
  const slideIndices = [];
  let match;

  while ((match = slideRegex.exec(raw)) !== null) {
    slideIndices.push({
      slideNumber: parseInt(match[1], 10),
      rawTitle: match[2].trim(),
      index: match.index
    });
  }

  for (let i = 0; i < slideIndices.length; i++) {
    const cur = slideIndices[i];
    const nextIndex = (i + 1 < slideIndices.length) ? slideIndices[i + 1].index : raw.length;
    const slideChunk = raw.slice(cur.index, nextIndex);

    // Module calculation
    let moduleNumber = 1;
    if (cur.slideNumber >= 1 && cur.slideNumber <= 5) moduleNumber = 1;
    else if (cur.slideNumber >= 6 && cur.slideNumber <= 15) moduleNumber = 2;
    else if (cur.slideNumber >= 16 && cur.slideNumber <= 25) moduleNumber = 3;
    else if (cur.slideNumber >= 26 && cur.slideNumber <= 35) moduleNumber = 4;
    else if (cur.slideNumber >= 36 && cur.slideNumber <= 42) moduleNumber = 5;
    else moduleNumber = 6;

    // Extract bullets
    const bullets = [];
    const bulletLines = slideChunk.match(/^[ \t]*-[ \t]+([^\n]+)/gm);
    if (bulletLines) {
      for (const bl of bulletLines) {
        const cleaned = bl.replace(/^[ \t]*-[ \t]+/, '').trim();
        if (cleaned && !cleaned.startsWith('**🎙️')) {
          bullets.push(cleaned);
        }
      }
    }

    // Extract Mermaid
    let mermaid = '';
    const mermaidMatch = slideChunk.match(/```mermaid\r?\n([\s\S]*?)\r?\n```/);
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
    let script = '';
    const scriptTikiMatch = slideChunk.match(/> \*\*🎙️[^\n]*\*\*\r?\n> ?\r?\n([\s\S]*?)(?=(?:\r?\n---|\r?\n### Slide|$))/);
    if (scriptTikiMatch) {
      script = scriptTikiMatch[1]
        .split('\n')
        .map(l => l.replace(/^>\s?/, '').trim())
        .filter(l => l.length > 0)
        .join('\n');
    } else {
      const scriptOldMatch = slideChunk.match(/#### 교수진 강의 스크립트[\s\S]*?(?=(?:---|### Slide|$))/);
      if (scriptOldMatch) {
        script = scriptOldMatch[0].replace(/#### 교수진 강의 스크립트\s*/, '').trim();
      }
    }

    slidesMap.set(cur.slideNumber, {
      slideNumber: cur.slideNumber,
      title: cur.rawTitle,
      moduleNumber,
      bullets,
      mermaid,
      formula,
      script
    });
  }

  return slidesMap;
}

const allSessions = [];

for (let w = 1; w <= 15; w++) {
  const enFile = path.join(projectRoot, `session${w}_EN.md`);
  const koFile = path.join(projectRoot, `session${w}.md`);

  const enSlidesMap = parseMarkdownSlides(enFile);
  const koSlidesMap = parseMarkdownSlides(koFile);

  const slides = [];
  for (let s = 1; s <= 45; s++) {
    const enSlide = enSlidesMap.get(s) || {};
    const koSlide = koSlidesMap.get(s) || {};

    const slideNumber = s;
    const moduleNumber = enSlide.moduleNumber || koSlide.moduleNumber || (s <= 5 ? 1 : s <= 15 ? 2 : s <= 25 ? 3 : s <= 35 ? 4 : s <= 42 ? 5 : 6);
    const titleEn = enSlide.title || koSlide.title || `Slide ${s}`;
    const titleKo = koSlide.title || enSlide.title || `슬라이드 ${s}`;
    const bulletsEn = enSlide.bullets && enSlide.bullets.length > 0 ? enSlide.bullets : (koSlide.bullets || []);
    const bulletsKo = koSlide.bullets && koSlide.bullets.length > 0 ? koSlide.bullets : (enSlide.bullets || []);
    const mermaid = enSlide.mermaid || koSlide.mermaid || '';
    const formula = enSlide.formula || koSlide.formula || '';
    const scriptEn = enSlide.script || koSlide.script || '';
    const scriptKo = koSlide.script || enSlide.script || '';

    slides.push({
      slideNumber,
      moduleNumber,
      titleKo,
      titleEn,
      bulletsKo,
      bulletsEn,
      mermaid,
      formula,
      scriptKo,
      scriptEn,
      title: titleEn
    });
  }

  const titles = sessionTitles[w];

  allSessions.push({
    weekNumber: w,
    titleEn: titles.en,
    titleKo: titles.ko,
    phase: phaseMap[w],
    reading: "Peter Diamandis & Steven Kotler, *We Are as Gods* (Simon & Schuster, 2026)",
    totalSlides: slides.length,
    slides
  });
}

const output = `export const sessionsList = ${JSON.stringify(allSessions, null, 2)};\n`;
fs.writeFileSync(path.join(projectRoot, 'src', 'data', 'sessionsData.js'), output, 'utf-8');
console.log(`Successfully synced all 15 master sessions (675 slides) to sessionsData.js! Total bytes: ${Buffer.byteLength(output, 'utf8')}`);
