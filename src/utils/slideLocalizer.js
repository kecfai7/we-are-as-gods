// Comprehensive Academic English Translation Engine for EXPO-701: We Are as Gods

// 1. Precise Academic Slide Title Localizer
export function localizeSlideTitle(title, lang) {
  if (!title) return '';
  if (lang !== 'en') return title;

  // Exact Match Dictionary for Core Archetypes
  const exactTitles = {
    // Week 1
    "THEURGICON: 신의 학교에 오신 것을 환영합니다": "THEURGICON: Welcome to the Crucible of Divine Governance",
    "1968년 스튜어트 브랜드의 선언 (We Are as Gods)": "1968: Stewart Brand's Declaration — We Are as Gods",
    "신의 탄생(Theogony)에서 신의 학교(Theurgicon)로": "From Theogony (Birth of Gods) to Theurgicon (School of Ethics)",
    "금주의 핵심 질문: 우리는 신의 권능을 다룰 준비가 되었는가?": "Weekly Core Inquiry: Are We Prepared to Wield Godlike Power?",
    "83대 기적의 기술 분류 체계 총론": "Comprehensive Taxonomy of the 83 Miracles of Exponential Technology",
    "1주차 학습 목표 및 지적 여정 안내": "Week 01 Learning Objectives & Intellectual Trajectory",
    "신통기(Theogony) 원전 텍스트 정밀 해체": "Textual Exegesis: Hesiod's Theogony & the Technological Singularity",
    "기하급수 수렴 방정식: 왜 2026년인가?": "Exponential Convergence Equation: Why 2026?",
    "Science Corp PRIMA 인공망막 심층 분석": "Empirical Breakthrough: Science Corp's PRIMA Photovoltaic Retinal Implant",
    "기적의 민주화와 실존적 역설 (So What?)": "Democratization of Miracles & The Civilizational Paradox",
    "제1회 캡스톤 세미나 토론 과제": "Capstone Seminar Debate & Applied Laboratory 01",
    
    // Week 2
    "인지적 현기증 (Cognitive Vertigo)의 정의": "Defining Cognitive Vertigo: Cognitive Overload in the Exponential Era",
    "구조 매핑(Structure Mapping) 이론": "Dedre Gentner's Structure Mapping Engine: Mythic Analogy to Physics",
    "인간 뇌의 진화적 대역폭 한계": "Evolutionary Bandwidth Limits of the Human Primate Brain",
    
    // Week 3
    "6D 프레임워크의 수학적 정의": "Mathematical Formalization of Peter Diamandis' 6Ds Framework",
    "기만적 성장 단계(Deception Phase)의 함정": "Navigating the Deception Phase: Sub-Linear Mirage to Hyper-Exponential Explosion",
    
    // Week 4
    "가치 밀도(Value Density)와 해방의 사다리": "Value Density Dynamics & Humanity's Liberation Ladder",
    
    // Week 14
    "유니버스 25 (Universe 25) 실험 총론": "John Calhoun's Universe 25: Behavioral Sink & The Paradise Paradox",
    "인구 멸종 곡선과 현대 문명의 제1의 죽음": "Demographic Extinction Dynamics & Humanity's 'First Death'",
    
    // Week 15
    "1,000억 달러 Giga-XPRIZE 최종 설계": "Engineering the $100 Billion Giga-XPRIZE Architecture"
  };

  if (exactTitles[title]) {
    return exactTitles[title];
  }

  // Systematic Academic Term Replacement
  let en = title
    .replace(/^(\d+)주차\s*학습\s*목표\s*및\s*지적\s*여정\s*안내/g, 'Week $1 Learning Objectives & Intellectual Trajectory')
    .replace(/^(\d+)주차\s*학습\s*목표/g, 'Week $1 Learning Objectives')
    .replace(/원전\s*텍스트\s*정밀\s*해체/g, 'Textual Exegesis & Theoretical Foundations')
    .replace(/기하급수\s*이론\s*및\s*수식\s*모델/g, 'Exponential Theory & Mathematical Models')
    .replace(/글로벌\s*데이터\s*&\s*실증\s*케이스/g, 'Global Empirical Data & Case Studies')
    .replace(/사회적[·\s]*철학적\s*역설\s*\(So What\?\)/g, 'Philosophical Implications & Societal Paradoxes (So What?)')
    .replace(/세미나\s*토론\s*및\s*실습\s*과제/g, 'Seminar Debates & Capstone Assignment')
    .replace(/신의 학교에 오신 것을 환영합니다/g, 'Welcome to the School of the Gods')
    .replace(/신의 학교/g, 'School of the Gods (Theurgicon)')
    .replace(/신의 탄생/g, 'Theogony (Birth of Gods)')
    .replace(/기하급수적 성장/g, 'Exponential Growth')
    .replace(/기만적 성장/g, 'Deception Phase')
    .replace(/가치 밀도/g, 'Value Density')
    .replace(/데이터 기반 낙관주의/g, 'Data-Driven Optimism')
    .replace(/지능 폭발/g, 'Intelligence Explosion')
    .replace(/거대 연산/g, 'Compute Scaling')
    .replace(/재생 의학/g, 'Regenerative Medicine')
    .replace(/합성 생물학/g, 'Synthetic Biology')
    .replace(/신체적 침투/g, 'Physical Infiltration')
    .replace(/대사 질환/g, 'Metabolic Collapse')
    .replace(/편향의 폭주/g, 'Bias Cascade')
    .replace(/마인드 2\.0/g, 'Mind 2.0')
    .replace(/의식의 확장/g, 'Expansion of Consciousness')
    .replace(/낙원의 역설/g, 'The Paradise Paradox')
    .replace(/유니버스 25/g, 'Universe 25')
    .replace(/종합 세미나/g, 'Grand Capstone Seminar')
    .replace(/Giga-XPRIZE 설계/g, 'Engineering the $100B Giga-XPRIZE')
    .replace(/핵심 메커니즘/g, 'Core Mechanism')
    .replace(/사례 연구/g, 'Case Study')
    .replace(/수식 분석/g, 'Mathematical Model')
    .replace(/철학적 성찰/g, 'Philosophical Synthesis')
    .replace(/심층 분석/g, 'In-Depth Analysis');

  return en;
}

// 2. Comprehensive Academic Bullet Point Localizer
export function localizeBullet(bullet, lang) {
  if (!bullet) return '';
  if (lang !== 'en') return bullet;

  let en = bullet
    // Section Labels
    .replace(/지식\(Knowledge\):/g, '<strong style="color:#00F0FF">Knowledge:</strong>')
    .replace(/방법론\(Methodology\):/g, '<strong style="color:#10B981">Methodology:</strong>')
    .replace(/실증 분석\(Empirical Analysis\):/g, '<strong style="color:#F59E0B">Empirical Analysis:</strong>')
    .replace(/철학적 성찰\(Synthesis\):/g, '<strong style="color:#8B5CF6">Synthesis:</strong>')
    .replace(/핵심 개념\(Key Concepts\):/g, '<strong style="color:#00F0FF">Key Concepts:</strong>')
    .replace(/학술적 토대\(Academic Foundation\):/g, '<strong style="color:#10B981">Academic Foundation:</strong>')
    
    // Core Concepts & Translations
    .replace(/83가지 성서적 기적의 10대 카테고리와 현대 기술 동기화 매핑 완벽 숙지\./g, 'Mastering the synchronization mapping of the 83 biblical miracles across 10 technological categories.')
    .replace(/Dedre Gentner의 구조 매핑\(Structure Mapping\)을 적용하여 신기술의 심층 메커니즘 해체\./g, "Applying Dedre Gentner's Structure Mapping Engine to dissect deep underlying mechanisms of emerging tech.")
    .replace(/Science Corp의 PRIMA 2mm 태양광 인공망막 시스템 기술 규격 및 임상 데이터 분석\./g, "Analyzing technical specifications and clinical trial data for Science Corp's PRIMA 2mm photovoltaic retinal implant.")
    .replace(/기적의 민주화가 가져오는 실존적 역설과 Theurgicon 거버넌스 프레임워크 수립\./g, 'Establishing Theurgicon governance frameworks to address existential paradoxes of democratized miracles.')
    
    .replace(/신의 능력의 인류화\(Theogony\)와 신의 학교\(Theurgicon\) 개설 선언/g, 'Humanization of Divine Power (Theogony) & Inauguration of the School of Governance (Theurgicon)')
    .replace(/개인 도구\(Personal Tools\)의 해방에서 기하급수 생명공학\/초지능의 통제로 전환/g, 'Transition from personal tools liberation to planetary governance of biotech and superintelligence')
    .replace(/신들의 탄생\/인간의 신격화/g, 'Birth of gods / Human deification')
    .replace(/신의 권능을 다루는 학교/g, 'Academic Crucible for Godlike Technologies')
    .replace(/헤시오도스의 신통기/g, "Hesiod's Theogony")
    .replace(/기하급수 기술의 융합을 통해 인류 자체가 신적 종족으로 진화하는 과정/g, 'Evolution of humanity into a planetary godlike species via exponential convergence')
    .replace(/신의 권능을 획득한 인류가 스스로를 파멸시키지 않도록 지적·도덕적 거버넌스를 가르치는 기관/g, 'Institutions cultivating cognitive and moral governance to prevent civilizational self-annihilation')
    .replace(/생물학적 한계/g, 'Biological Limitations')
    .replace(/6D 수렴 & 기적의 일상화/g, '6Ds Convergence & Routine Miracles')
    .replace(/인류의 신격화/g, 'Human Apotheosis')
    .replace(/거룩한 거버넌스 훈련/g, 'Sacred Moral Governance Training')
    .replace(/1968년 Whole Earth Catalog 창간호 표지 선언문/g, '1968 Whole Earth Catalog Debut Cover Manifesto')
    .replace(/개인 도구\(Personal Tools\)의 해방/g, 'Liberation of Personal Tools')
    .replace(/기하급수 생명공학\/초지능의 통제/g, 'Planetary Governance of Exponential Biotech & Superintelligence');

  return en;
}

// 3. Faculty Dialogue Script Localizer
export function localizeScriptContent(content, speaker, lang) {
  if (!content) return '';
  if (lang !== 'en') return content;

  if (content.includes('환영합니다. 오늘 우리는 단순한 기술 세미나가 아니라')) {
    return "Welcome, scholars. Today we are not opening a standard tech seminar, but the gates to Theurgicon—the most audacious master's curriculum in human history. Dr. Elena, could you explain why we call this crucible 'Theurgicon' rather than just a school?";
  }
  if (content.includes("'Theurgy'는 고대 그리스어로 신의 기적적인 권능")) {
    return "Certainly, Prof. Peter. 'Theurgy' in ancient Greek refers to the divine rite of performing miracles. Today in 2026, humanity has literally acquired the powers of mythological gods through CRISPR gene editing, Artificial General Intelligence, and Brain-Computer Interfaces. Graduate school must no longer be a place of rote memorization, but the temple for training cognitive frameworks to govern godlike power.";
  }
  if (content.includes("옛날엔 바다를 가르고 장님을 눈뜨게 하는 게")) {
    return "Haha, precisely! In ancient times, parting the seas and curing blindness was reserved exclusively for deities; now it is just another engineering ticket in Silicon Valley and biotech labs. But the existential problem is: our tools are omnipotent, while our biological brains remain primates on the savannah 100,000 years ago!";
  }
  if (content.includes("정확한 지적입니다, 마커스. 권능의 폭발과 지혜의 지체")) {
    return "Spot on, Marcus. The explosion of raw power versus the lag of wisdom—bridging this civilizational chasm is the ultimate raison d'être of this 15-week curriculum.";
  }
  if (content.includes("스튜어트 브랜드가 저 유명한 문장을 썼을 때")) {
    return "In 1968, when Stewart Brand wrote that famous line, people considered it a hippie exaggeration. But sixty years later, it has become the most rigorous scientific fact.";
  }
  if (content.includes("브랜드가 저 말을 썼을 때는 고작 개인이 카메라나")) {
    return "When Brand coined that, it was about individuals buying pocket calculators or cameras. Now we are rewriting the biosphere genome and scanning the entire Earth in real time with tens of thousands of satellites.";
  }
  if (content.includes("그렇습니다. 브랜드의 선언에서 가장 중요한 단어는")) {
    return "Indeed. The most critical word in Brand's declaration is not 'Gods', but 'Get good at it'. Becoming gods is already a fait accompli; our only question is whether we can wield it with wisdom and mastery.";
  }

  return content;
}
