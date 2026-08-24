// Utility to localize slide title, bullets, and scripts for EN/KO mode

const slideTitleTranslations = {
  // Week 1
  "THEURGICON: 신의 학교에 오신 것을 환영합니다": "THEURGICON: Welcome to the School of the Gods",
  "1968년 스튜어트 브랜드의 선언 (We Are as Gods)": "1968: Stewart Brand's Manifesto — We Are as Gods",
  "신의 탄생(Theogony)에서 신의 학교(Theurgicon)로": "From Theogony (Birth of Gods) to Theurgicon (School of Governance)",
  "금주의 핵심 질문: 우리는 신의 권능을 다룰 준비가 되었는가?": "Core Inquiry: Are We Prepared to Wield the Power of Gods?",
  "83대 기적의 기술 분류 체계 총론": "Taxonomy of the 83 Miracles of Technology: Global Overview",
  
  // Universal Patterns
  "도입 및 학습 목표": "Introduction & Learning Objectives",
  "원전 텍스트 정밀 해체": "Textual Exegesis & Theoretical Foundations",
  "기하급수 이론 및 수식 모델": "Exponential Theory & Mathematical Models",
  "글로벌 데이터 & 실증 케이스": "Global Empirical Case Studies",
  "사회적·철학적 역설 (So What?)": "Philosophical Implications & Societal Paradoxes",
  "세미나 토론 및 캡스톤 과제": "Seminar Debates & Capstone Studio Assignment"
};

export function localizeSlideTitle(title, lang) {
  if (!title) return '';
  if (lang !== 'en') return title;

  if (slideTitleTranslations[title]) {
    return slideTitleTranslations[title];
  }

  // Regex replacement for Korean subtitles/phrases
  let enTitle = title
    .replace(/신의 학교에 오신 것을 환영합니다/g, 'Welcome to the School of the Gods')
    .replace(/스튜어트 브랜드의 선언/g, "Stewart Brand's Declaration")
    .replace(/신의 탄생\(Theogony\)/g, 'Theogony (Birth of Gods)')
    .replace(/신의 학교\(Theurgicon\)/g, 'Theurgicon (School of Gods)')
    .replace(/금주의 핵심 질문/g, 'Core Weekly Inquiry')
    .replace(/우리는 신의 권능을 다룰 준비가 되었는가\?/g, 'Are We Ready to Wield Godlike Power?')
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
    .replace(/철학적 고찰/g, 'Philosophical Synthesis');

  return enTitle;
}

export function localizeBullet(bullet, lang) {
  if (!bullet) return '';
  if (lang !== 'en') return bullet;

  return bullet
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
    .replace(/거룩한 거버넌스 훈련/g, 'Sacred Moral Governance Training');
}

export function localizeScriptContent(content, speaker, lang) {
  if (!content) return '';
  if (lang !== 'en') return content;

  // Provide high-fidelity English dialogue for the foundational faculty
  if (content.includes('환영합니다. 오늘 우리는 단순한 기술 세미나가 아니라')) {
    return "Welcome, everyone. Today we are not opening a simple tech seminar, but the doors to Theurgicon—the most audacious master's curriculum in human history. Dr. Elena, could you explain why we call this crucible 'Theurgicon' rather than just a school?";
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

  // Fallback: Return clean formatted dialogue
  return content;
}
