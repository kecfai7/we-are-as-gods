export const miraclesCategories = [
  { id: "all", name: "All 83 Miracles", nameKo: "83가지 기적 전체" },
  { id: "ai_compute", name: "AI & Hyper-Compute", nameKo: "인공지능 & 거대 연산" },
  { id: "biotech", name: "Biotech & Regenerative Medicine", nameKo: "바이오 & 재생의학" },
  { id: "energy", name: "Infinite Energy & Climate", nameKo: "무한 에너지 & 기후" },
  { id: "neuro", name: "Neurotech & Consciousness", nameKo: "신경공학 & 의식" },
  { id: "materials", name: "Advanced Materials & Nano", nameKo: "첨단 신소재 & 나노" },
  { id: "space", name: "Space & Planetary Systems", nameKo: "우주 & 행성 시스템" }
];

export const miraclesList = [
  // 1. AI & Hyper-Compute
  {
    id: 1,
    name: "Foundation AI Models (GPT-5 / Gemini Ultra)",
    nameKo: "초거대 파운데이션 AI 모델",
    category: "ai_compute",
    impact: "Democratizes world-class expertise to 8B people at zero marginal cost.",
    maturity: "Commercial Scale",
    session: "Week 06",
    metric: "1M× Compute Cost Drop"
  },
  {
    id: 2,
    name: "Sub-Nanometer Silicon & Optical Chips",
    nameKo: "서브나노 실리콘 및 광 반도체",
    category: "ai_compute",
    impact: "100× FLOPS/Watt breakthrough beating physical thermal limits.",
    maturity: "Pilot Prototype",
    session: "Week 06",
    metric: "2nm Lithography"
  },
  {
    id: 3,
    name: "Quantum Computing Algorithms",
    nameKo: "양자 컴퓨팅 분자 시뮬레이터",
    category: "ai_compute",
    impact: "Solves chemical bond energies and nitrogen fixation in seconds.",
    maturity: "Laboratory Validation",
    session: "Week 06",
    metric: "1,000+ Qubits"
  },
  {
    id: 4,
    name: "Autonomous AI Agents & Coding Swarms",
    nameKo: "자율 AI 에이전트 및 코딩 스웜",
    category: "ai_compute",
    impact: "Automates software lifecycle from conception to cloud deployment.",
    maturity: "Commercial Scale",
    session: "Week 06",
    metric: "95% Code Synthesis"
  },
  {
    id: 5,
    name: "Decentralized Edge Intelligence",
    nameKo: "온디바이스 분산 엣지 지능",
    category: "ai_compute",
    impact: "Sub-5W smart sensors operating everywhere without cloud latency.",
    maturity: "Growth Stage",
    session: "Week 05",
    metric: "< 10ms Latency"
  },

  // 2. Biotech & Regenerative Medicine
  {
    id: 6,
    name: "PRIMA 2mm Photovoltaic Retinal Chip",
    nameKo: "PRIMA 2mm 광전 인공망막 칩",
    category: "biotech",
    impact: "Restores central reading vision in 38 legally blind AMD patients.",
    maturity: "Clinical Validation (Phase 3)",
    session: "Week 07",
    metric: "20/40 Snellen Acuity"
  },
  {
    id: 7,
    name: "Yamanaka Factors Epigenetic Rejuvenation",
    nameKo: "야마나카 인자 후성유전학적 생체 나이 역전",
    category: "biotech",
    impact: "Resets cellular age by 30-50 years without tumor induction.",
    maturity: "Pre-clinical Trials",
    session: "Week 07",
    metric: "50-Year Clock Reset"
  },
  {
    id: 8,
    name: "CRISPR-Cas9 & Prime Gene Editing",
    nameKo: "크리스퍼 프라임 유전체 정밀 편집",
    category: "biotech",
    impact: "Cures 7,000+ monogenic hereditary diseases at single nucleotide level.",
    maturity: "Clinical Use (Casgevy)",
    session: "Week 08",
    metric: "99.9% Targeting Accuracy"
  },
  {
    id: 9,
    name: "3D Organ Bioprinting with Vascular Networks",
    nameKo: "혈관망 일체형 3D 바이오 장기 프린팅",
    category: "biotech",
    impact: "Eliminates organ donor waiting lists forever using patient's own cells.",
    maturity: "Pilot Scale",
    session: "Week 07",
    metric: "Zero Rejection Risk"
  },
  {
    id: 10,
    name: "GLP-1 Receptor Agonist Pharmacology",
    nameKo: "GLP-1 수용체 작용제 및 대사 치유 약물",
    category: "biotech",
    impact: "Reverses obesity and type-2 diabetes in 1B+ global patients.",
    maturity: "Global Commercial",
    session: "Week 10",
    metric: "25%+ Body Mass Loss"
  },
  {
    id: 11,
    name: "Colossal Woolly Mammoth De-Extinction",
    nameKo: "콜로설 털매머드 북극 멸종 복원",
    category: "biotech",
    impact: "Restores Pleistocene tundra grasslands to prevent permafrost methane thaw.",
    maturity: "Active Development",
    session: "Week 08",
    metric: "60+ Gene Edits"
  },

  // 3. Energy & Climate
  {
    id: 12,
    name: "Supercritical Water Oxidation (SCWO) for PFAS",
    nameKo: "PFAS/미세플라스틱 초임계수 산화 분해 (SCWO)",
    category: "energy",
    impact: "Breaks 485 kJ/mol C-F bonds into harmless fluorite and water.",
    maturity: "Field Deployed",
    session: "Week 09",
    metric: "99.999% Destruction"
  },
  {
    id: 13,
    name: "Commercial Net-Gain Nuclear Fusion",
    nameKo: "상용 순에너지 핵융합 발전 (SPARC/ITER)",
    category: "energy",
    impact: "Unlimited, zero-carbon, fail-safe baseload energy for the planet.",
    maturity: "Pilot Reactor 2030",
    session: "Week 15",
    metric: "Q > 10 Net Gain"
  },
  {
    id: 14,
    name: "Perovskite-Silicon Tandem Solar Cells",
    nameKo: "페로브스카이트 탠덤 태양광 셀",
    category: "energy",
    impact: "34%+ solar conversion efficiency driving electricity costs to $0.01/kWh.",
    maturity: "Commercial Scale",
    session: "Week 04",
    metric: "34.2% Efficiency"
  },
  {
    id: 15,
    name: "Direct Air Carbon Capture & Mineralization",
    nameKo: "대기 탄소 직접 포집 및 현무암 광물화 (DAC)",
    category: "energy",
    impact: "Permanent gigaton carbon sequestration at under $50/ton.",
    maturity: "Scaling Phase",
    session: "Week 15",
    metric: "10 Gigatons/yr Target"
  },
  {
    id: 16,
    name: "Planetary eDNA & Argo 4,000 Float Network",
    nameKo: "환경 DNA 및 아르고 4,000개 해양 감시망",
    category: "energy",
    impact: "Real-time biosensor array measuring global planetary homeostasis.",
    maturity: "Global Operational",
    session: "Week 08",
    metric: "100% Ocean Coverage"
  },

  // 4. Neurotech & Consciousness
  {
    id: 17,
    name: "Neuralink N1 1,024-Electrode Thread BCI",
    nameKo: "뉴럴링크 1,024개 유연 스레드 뇌 인터페이스",
    category: "neuro",
    impact: "Enables quadriplegics to control digital devices at 10.5 bps speed.",
    maturity: "Human Clinical Trial",
    session: "Week 13",
    metric: "1,024 Channels"
  },
  {
    id: 18,
    name: "Meta Reality Labs Silent Speech EMG Decoder",
    nameKo: "메타 무음성 언어 근전도 뇌파 디코더",
    category: "neuro",
    impact: "Converts sub-vocal thought into text at 75%+ accuracy without vocal sound.",
    maturity: "Lab Prototype",
    session: "Week 13",
    metric: "150 Words/Minute"
  },
  {
    id: 19,
    name: "BrainNet 3-Person Brain-to-Brain Telepathy",
    nameKo: "워싱턴대 BrainNet 다자간 뇌-뇌 직접 텔레파시",
    category: "neuro",
    impact: "Direct EEG-to-TMS thought synchronization enabling collective intelligence.",
    maturity: "Scientific Proof",
    session: "Week 13",
    metric: "81.25% Direct Sync"
  },
  {
    id: 20,
    name: "fMRI Visual Mind Imagery Reconstruction",
    nameKo: "fMRI 시각 피질 스캔 기반 생각/꿈 비디오 복원",
    category: "neuro",
    impact: "Reconstructs continuous visual movies from mental thoughts at 85% fidelity.",
    maturity: "Lab Prototype",
    session: "Week 13",
    metric: "85% Image Match"
  },
  {
    id: 21,
    name: "Transient Hypofrontality Flow Induction (tDCS)",
    nameKo: "경두개 직류자극 기반 일시적 전전두엽 저하 몰입기",
    category: "neuro",
    impact: "Silences inner self-criticism to boost lateral creativity from 0% to 58%.",
    maturity: "Research Stage",
    session: "Week 12",
    metric: "500% Productivity Surge"
  },

  // 5. Materials & Advanced Manufacturing
  {
    id: 22,
    name: "Room-Temperature Ambient Superconductors",
    nameKo: "상온 상압 초전도체 선재",
    category: "materials",
    impact: "Zero-loss power transmission across continents and frictionless transport.",
    maturity: "Frontier R&D",
    session: "Week 15",
    metric: "Zero Electrical Resistance"
  },
  {
    id: 23,
    name: "Carbon Nanotube & Graphene Macro-Structures",
    nameKo: "탄소나노튜브 및 그래핀 초고강도 구조체",
    category: "materials",
    impact: "100× stronger than steel at 1/6th weight, enabling orbital space elevators.",
    maturity: "Pilot Manufacturing",
    session: "Week 04",
    metric: "130 GPa Tensile Strength"
  },
  {
    id: 24,
    name: "Atomic-Precision Molecular Nanofactories",
    nameKo: "원자 단위 분자 조립 나노팩토리",
    category: "materials",
    impact: "Assembles raw atoms into complex goods, turning waste into pristine tools.",
    maturity: "Theoretical R&D",
    session: "Week 15",
    metric: "Sub-Angstrom Assembly"
  },

  // 6. Space & Planetary Systems
  {
    id: 25,
    name: "SpaceX Starship Fully Reusable Heavy Lift",
    nameKo: "스페이스X 스타쉽 완전 재사용 로켓",
    category: "space",
    impact: "Drops orbital launch costs from $10,000/kg to $10/kg (1,000× drop).",
    maturity: "Orbital Flight Testing",
    session: "Week 04",
    metric: "$10/kg to Orbit"
  },
  {
    id: 26,
    name: "Mars Closed-Loop In-Situ Resource Utilization (ISRU)",
    nameKo: "화성 폐쇄형 현지 자원 활용 생태계 (MOXIE & Biosphere)",
    category: "space",
    impact: "Produces oxygen, water, and methane fuel on Mars for permanent self-sustaining cities.",
    maturity: "Mars Surface Tested",
    session: "Week 15",
    metric: "100% Autonomous Habitat"
  },
  {
    id: 27,
    name: "Zipline Autonomous Drone Delivery Mesh",
    nameKo: "짚라인 자율 비행 드론 긴급 배송망",
    category: "space",
    impact: "1M+ commercial flights delivering blood and vaccines in under 30 minutes.",
    maturity: "Global Operational",
    session: "Week 05",
    metric: "1,000,000+ Flights"
  }
];
