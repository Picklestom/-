const app = document.getElementById("app");

const MBTI_QUESTIONS = [
  {
    id: "mbti_ei_1",
    type: "scale",
    round: 0,
    prompt: "比起独处，我更容易在热闹场合迅速进入状态。",
    scoringTags: ["mbti"],
    mbtiBias: "E",
  },
  {
    id: "mbti_ei_2",
    type: "scale",
    round: 0,
    prompt: "遇到压力时，我更愿意自己消化而不是立刻找人讨论。",
    scoringTags: ["mbti"],
    mbtiBias: "I",
  },
  {
    id: "mbti_sn_1",
    type: "scale",
    round: 0,
    prompt: "我看作品时会先注意构图、细节、材质等可见信息。",
    scoringTags: ["mbti"],
    mbtiBias: "S",
  },
  {
    id: "mbti_sn_2",
    type: "scale",
    round: 0,
    prompt: "我经常把一段歌词或镜头延展出象征意义和抽象联想。",
    scoringTags: ["mbti"],
    mbtiBias: "N",
  },
  {
    id: "mbti_tf_1",
    type: "scale",
    round: 0,
    prompt: "评价作品时，我会优先判断结构是否严密。",
    scoringTags: ["mbti"],
    mbtiBias: "T",
  },
  {
    id: "mbti_tf_2",
    type: "scale",
    round: 0,
    prompt: "评价作品时，我更先感受它是否触动情绪和人性经验。",
    scoringTags: ["mbti"],
    mbtiBias: "F",
  },
  {
    id: "mbti_jp_1",
    type: "scale",
    round: 0,
    prompt: "我习惯按计划完成文化输入（书单、片单、展览安排）。",
    scoringTags: ["mbti"],
    mbtiBias: "J",
  },
  {
    id: "mbti_jp_2",
    type: "scale",
    round: 0,
    prompt: "我更喜欢临场发现“今天想看什么”，不太提前规划。",
    scoringTags: ["mbti"],
    mbtiBias: "P",
  },
];

const ROUND_QUESTIONS = [
  {
    id: "r1_a",
    type: "choice",
    round: 1,
    prompt: "你重生后第一个周五夜，朋友喊你出门，你会：",
    options: [
      { label: "去独立书店听分享，散场后写 200 字感受", score: 90, tone: "deep" },
      { label: "跟朋友去看商业片，结束后认真讨论镜头", score: 72, tone: "mix" },
      { label: "刷短视频到凌晨，明天再说", score: 30, tone: "casual" },
      { label: "去网红打卡只拍照，不看内容", score: 20, tone: "surface" },
    ],
    scoringTags: ["base", "story"],
    mbtiBias: null,
  },
  {
    id: "r1_b",
    type: "scale",
    round: 1,
    prompt: "我愿意接触不熟悉的艺术形式（戏剧、诗歌、实验音乐等）。",
    scoringTags: ["base"],
    mbtiBias: null,
  },
  {
    id: "r1_c",
    type: "choice",
    round: 1,
    prompt: "手机里突然弹出“限免艺术展”提醒，你最可能：",
    options: [
      { label: "立即预约，顺便查策展主题", score: 88, tone: "deep" },
      { label: "先收藏，看看有没有同伴", score: 70, tone: "mix" },
      { label: "路过再说，不专门去", score: 45, tone: "casual" },
      { label: "直接划掉，感觉麻烦", score: 18, tone: "surface" },
    ],
    scoringTags: ["story"],
    mbtiBias: null,
  },
  {
    id: "r2_a",
    type: "scale",
    round: 2,
    prompt: "过去三个月，我有稳定文化活动参与（展览/演出/读书会/观影）。",
    scoringTags: ["base"],
    mbtiBias: null,
  },
  {
    id: "r2_b",
    type: "choice",
    round: 2,
    prompt: "重生第二周目，你在二手书市场捡到一本旧诗集，接下来会：",
    options: [
      { label: "读完并标注喜欢段落，再分享给朋友", score: 92, tone: "deep" },
      { label: "拍照发社媒，配一句今日心情", score: 63, tone: "mix" },
      { label: "放进书架，等有空再看", score: 52, tone: "casual" },
      { label: "当作拍照道具，内容不重要", score: 24, tone: "surface" },
    ],
    scoringTags: ["base", "story"],
    mbtiBias: null,
  },
  {
    id: "r2_c",
    type: "scale",
    round: 2,
    prompt: "我会主动了解作品背后的时代背景、作者经历和流派线索。",
    scoringTags: ["base"],
    mbtiBias: null,
  },
  {
    id: "r3_a",
    type: "choice",
    round: 3,
    prompt: "最终周目，你要做“年度文艺复盘”，你会：",
    options: [
      { label: "整理书影音清单 + 写下改变自己的 3 个瞬间", score: 94, tone: "deep" },
      { label: "列一份推荐榜单，附一句短评", score: 74, tone: "mix" },
      { label: "只发九宫格，文案是“随便看看”", score: 42, tone: "casual" },
      { label: "懒得复盘，直接开下一局", score: 26, tone: "surface" },
    ],
    scoringTags: ["story"],
    mbtiBias: null,
  },
  {
    id: "r3_b",
    type: "scale",
    round: 3,
    prompt: "我有持续性的创作输出（写作、摄影、音乐、设计、手作等）。",
    scoringTags: ["base"],
    mbtiBias: null,
  },
  {
    id: "r3_c",
    type: "scale",
    round: 3,
    prompt: "艺术体验会影响我的情绪管理、生活方式或价值判断。",
    scoringTags: ["base"],
    mbtiBias: null,
  },
];

const PERSONALIZED_BY_AXIS = {
  EI: {
    E: {
      id: "p_e",
      type: "choice",
      prompt: "在公共场合聊到作品时，你通常：",
      options: [
        { label: "主动发起讨论，拉大家一起讲感受", score: 86, tone: "mix" },
        { label: "等别人先开口，我再补充观点", score: 70, tone: "mix" },
        { label: "只听不说，回家再慢慢想", score: 58, tone: "deep" },
        { label: "直接转移话题", score: 24, tone: "surface" },
      ],
      scoringTags: ["story"],
      mbtiBias: "E",
    },
    I: {
      id: "p_i",
      type: "scale",
      prompt: "我会主动留出独处时间做深度阅读、观影或创作。",
      scoringTags: ["base"],
      mbtiBias: "I",
    },
  },
  SN: {
    S: {
      id: "p_s",
      type: "scale",
      prompt: "我欣赏作品时很在意质感、画面、节奏等可感知细节。",
      scoringTags: ["base"],
      mbtiBias: "S",
    },
    N: {
      id: "p_n",
      type: "scale",
      prompt: "我容易从作品延伸到隐喻、象征和人生议题。",
      scoringTags: ["base"],
      mbtiBias: "N",
    },
  },
  TF: {
    T: {
      id: "p_t",
      type: "choice",
      prompt: "你给电影打分时更看重：",
      options: [
        { label: "结构、叙事、技法完成度", score: 82, tone: "deep" },
        { label: "情感力量，但也要逻辑自洽", score: 76, tone: "mix" },
        { label: "只要当下爽就行", score: 38, tone: "casual" },
        { label: "热搜讨论度高就高分", score: 25, tone: "surface" },
      ],
      scoringTags: ["story", "base"],
      mbtiBias: "T",
    },
    F: {
      id: "p_f",
      type: "choice",
      prompt: "你给电影打分时更看重：",
      options: [
        { label: "是否共情到人物，是否触动内心", score: 85, tone: "deep" },
        { label: "氛围到位就行，逻辑可适当放宽", score: 72, tone: "mix" },
        { label: "看完就算，没必要细想", score: 33, tone: "casual" },
        { label: "别人说好就跟着好", score: 20, tone: "surface" },
      ],
      scoringTags: ["story", "base"],
      mbtiBias: "F",
    },
  },
};

const MBTI_DESCRIPTIONS = {
  INTJ: "战略型审美策展人：擅长在复杂作品中看到结构之美。",
  INTP: "观念型灵感观察者：偏爱思想实验和跨界连接。",
  ENTJ: "行动型文化组织者：能把审美兴趣做成可执行项目。",
  ENTP: "跳跃型创意实验体：对新形式和新表达敏感。",
  INFJ: "洞察型叙事感受者：擅长捕捉作品背后的意义。",
  INFP: "诗意型共情创作者：重视情感真实和个体表达。",
  ENFJ: "共鸣型文化连接者：善于用艺术促进理解。",
  ENFP: "灵感型氛围点火者：热衷探索多元审美路径。",
  ISTJ: "秩序型经典收藏家：重视长期稳定的文化积累。",
  ISFJ: "温和型人文守护者：偏爱有温度的生活叙事。",
  ESTJ: "执行型内容排程师：擅长把兴趣变成习惯。",
  ESFJ: "互动型艺术分享者：通过社交放大文化体验。",
  ISTP: "技艺型细节探索者：关注手感、材料和工艺。",
  ISFP: "感官型美学实践者：善于从日常捕捉美。",
  ESTP: "现场型体验玩家：偏爱沉浸感和即时反馈。",
  ESFP: "舞台型氛围制造者：对音乐、表演和视觉刺激反应强。",
};

const AXIS_TIPS = {
  E: "每月组织一次“文艺局”，把输入变成可讨论内容。",
  I: "每周固定 90 分钟“安静文艺时段”，做深度沉浸。",
  S: "每次体验后记录 3 个具体细节，训练感官观察力。",
  N: "每次体验后写 3 条隐喻联想，扩展作品理解维度。",
  T: "试试“结构拆解法”：剧情、镜头、声音各写一句评价。",
  F: "试试“情绪曲线法”：标记作品触动你的三个节点。",
  J: "建立固定节奏：如每两周一展或每周一片一评。",
  P: "保留随机探索窗口：每周一次无目的文化漫游。",
};

const STAGE_TITLES = {
  1: ["地下室诗人", "咖啡馆句号收藏家", "展厅社牛", "灵感路由器"],
  2: ["旧书摊炼金师", "人间观察摄影机", "叙事调酒师", "城市浪漫策展人"],
  3: ["后现代摆渡人", "情绪蒙太奇导演", "审美连击大师", "文艺宇宙继承者"],
};

const state = {
  mbtiAnswers: {},
  mbtiType: "",
  mbtiScore: 0,
  round: 0,
  roundAnswers: {
    1: {},
    2: {},
    3: {},
  },
  stageTitles: [],
};

function start() {
  renderIntro();
}

function renderIntro() {
  app.innerHTML = `
    <div class="chapter">序章 · 重开人生</div>
    <h2>欢迎来到文艺重生模拟器</h2>
    <p class="desc">你将先完成 MBTI 快测，获得初始命格；随后经历三周目选择，每轮会结算阶段称号。最终给你一个可截图的文艺指数结论。</p>
    <div class="barrage">
      <span>“这次重生我不当背景板”</span>
      <span>“文艺不是端着，是会玩”</span>
      <span>“可认真可搞笑，都算你会活”</span>
    </div>
    <div class="actions">
      <button class="primary" id="go-mbti">开始第一幕：MBTI 快测</button>
    </div>
    <div class="notice">提醒：本测评为娱乐化互动，不替代专业心理评估。</div>
  `;

  document.getElementById("go-mbti").addEventListener("click", renderMbtiStep);
}

function renderMbtiStep() {
  const questions = MBTI_QUESTIONS;
  app.innerHTML = `
    <div class="chapter">第一幕 · 初始命格</div>
    <h2>MBTI 快测（8题）</h2>
    <p class="desc">请按“最近 3 个月”的状态作答。1=非常不同意，5=非常同意。</p>
    <form id="mbti-form">
      ${questions.map((q, i) => questionHtml(q, i + 1)).join("")}
      <div class="actions">
        <button class="primary" type="submit">生成我的 MBTI 命格</button>
      </div>
    </form>
  `;

  const form = document.getElementById("mbti-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const answers = readAnswers(form, questions);
    if (!answers) {
      alert("MBTI 还有题没答完。");
      return;
    }
    state.mbtiAnswers = answers;
    const parsed = calcMbti(answers);
    state.mbtiType = parsed.type;
    state.mbtiScore = parsed.mbtiScore;
    state.round = 1;
    renderRound(1);
  });
}

function questionHtml(q, order) {
  const tagText = q.type === "scale" ? "态度量表题" : "行为选择题";
  return `
    <div class="question">
      <p class="q-title">${order}. ${q.prompt}</p>
      <p class="q-tag">${tagText}</p>
      ${q.type === "scale" ? renderScale(q.id) : renderChoices(q.id, q.options)}
    </div>
  `;
}

function renderScale(name) {
  const labels = ["非常不同意", "不同意", "中立", "同意", "非常同意"];
  return `
    <div class="scale">
      ${[1, 2, 3, 4, 5]
        .map(
          (v, idx) => `
            <label class="opt">
              <input type="radio" name="${name}" value="${v}" />
              ${v}. ${labels[idx]}
            </label>
          `
        )
        .join("")}
    </div>
  `;
}

function renderChoices(name, options) {
  return `
    <div class="choices">
      ${options
        .map(
          (opt, idx) => `
            <label class="opt">
              <input type="radio" name="${name}" value="${idx}" />
              ${opt.label}
            </label>
          `
        )
        .join("")}
    </div>
  `;
}

function readAnswers(form, questions) {
  const out = {};
  for (const q of questions) {
    const selected = form.querySelector(`input[name="${q.id}"]:checked`);
    if (!selected) {
      return null;
    }
    out[q.id] = Number(selected.value);
  }
  return out;
}

function calcMbti(answers) {
  const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (const q of MBTI_QUESTIONS) {
    const v = answers[q.id];
    const pos = q.mbtiBias;
    const neg = opposite(pos);
    score[pos] += v;
    score[neg] += 6 - v;
  }

  const type =
    (score.E >= score.I ? "E" : "I") +
    (score.S >= score.N ? "S" : "N") +
    (score.T >= score.F ? "T" : "F") +
    (score.J >= score.P ? "J" : "P");

  const mbtiWeight = { N: 40, F: 28, P: 20, I: 12 };
  const raw = type
    .split("")
    .reduce((sum, letter) => sum + (mbtiWeight[letter] || 0), 0);

  return { type, mbtiScore: raw };
}

function opposite(letter) {
  const pair = { E: "I", I: "E", S: "N", N: "S", T: "F", F: "T", J: "P", P: "J" };
  return pair[letter];
}

function axisLetter(type, axis) {
  if (axis === "EI") return type[0];
  if (axis === "SN") return type[1];
  if (axis === "TF") return type[2];
  return type[3];
}

function buildRoundQuestions(round, type) {
  const base = ROUND_QUESTIONS.filter((q) => q.round === round);
  const axisByRound = { 1: "EI", 2: "SN", 3: "TF" };
  const axis = axisByRound[round];
  const letter = axisLetter(type, axis);
  const template = PERSONALIZED_BY_AXIS[axis][letter];
  const personalized = { ...template, round, id: `${template.id}_${round}` };
  return [...base, personalized];
}

function renderRound(round) {
  const roundQuestions = buildRoundQuestions(round, state.mbtiType);
  const roundTitle = `第 ${round} 周目`;
  app.innerHTML = `
    <div class="chapter">第二幕 · 三周目重生</div>
    <h2>${roundTitle}</h2>
    <p class="desc">MBTI 命格：<strong>${state.mbtiType}</strong>。本轮包含行为选择题与态度量表题。答完后会解锁阶段称号。</p>
    <div class="barrage">
      <span>“如果人生重来，我先把审美拉满”</span>
      <span>“文艺不端着，先快乐再深刻”</span>
      <span>“第 ${round} 周目加载中...”</span>
    </div>
    <form id="round-form">
      ${roundQuestions.map((q, i) => questionHtml(q, i + 1)).join("")}
      <div class="actions">
        <button class="primary" type="submit">结算本周目</button>
      </div>
    </form>
  `;

  const form = document.getElementById("round-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const answers = readAnswers(form, roundQuestions);
    if (!answers) {
      alert("本周目还有题没答完。");
      return;
    }

    state.roundAnswers[round] = answers;
    const scores = evaluateRound(roundQuestions, answers);
    const title = pickStageTitle(round, scores.roundAvg);
    state.stageTitles.push(title);
    renderRoundSummary(round, title, scores.roundAvg);
  });
}

function evaluateRound(questions, answers) {
  const scores = questions.map((q) => scoreQuestion(q, answers[q.id]));
  const roundAvg = average(scores.map((s) => s.value));
  return { roundAvg };
}

function scoreQuestion(q, answerValue) {
  if (q.type === "scale") {
    const value = ((answerValue - 1) / 4) * 100;
    return { value, tags: q.scoringTags, tone: "deep" };
  }
  const chosen = q.options[answerValue];
  return { value: chosen.score, tags: q.scoringTags, tone: chosen.tone };
}

function pickStageTitle(round, score) {
  const list = STAGE_TITLES[round];
  if (score < 40) return list[0];
  if (score < 62) return list[1];
  if (score < 82) return list[2];
  return list[3];
}

function renderRoundSummary(round, title, roundAvg) {
  const next = round + 1;
  const message =
    roundAvg >= 80
      ? "你这周目像开了审美外挂，稳定输出。"
      : roundAvg >= 55
      ? "你在“好玩”和“深度”之间找到了不错平衡。"
      : "你这周目主打一个随性，下一轮还来得及翻盘。";

  app.innerHTML = `
    <div class="chapter">阶段结算</div>
    <div class="stage-card">
      <p class="stage-title">${title}</p>
      <p class="stage-sub">周目均分：${Math.round(roundAvg)}。${message}</p>
    </div>
    <div class="actions">
      ${round < 3 ? `<button class="primary" id="next-round">进入第 ${next} 周目</button>` : '<button class="primary" id="to-final">进入终局结算</button>'}
      <button class="secondary" id="restart">重新开档</button>
    </div>
  `;

  document.getElementById("restart").addEventListener("click", resetAll);
  if (round < 3) {
    document.getElementById("next-round").addEventListener("click", () => {
      state.round = next;
      renderRound(next);
    });
  } else {
    document.getElementById("to-final").addEventListener("click", renderFinalResult);
  }
}

function collectScoring() {
  const baseScores = [];
  const storyScores = [];
  const tones = [];

  for (const round of [1, 2, 3]) {
    const questions = buildRoundQuestions(round, state.mbtiType);
    const answers = state.roundAnswers[round];

    questions.forEach((q) => {
      const scored = scoreQuestion(q, answers[q.id]);
      if (q.scoringTags.includes("base")) baseScores.push(scored.value);
      if (q.scoringTags.includes("story")) storyScores.push(scored.value);
      tones.push(scored.tone);
    });
  }

  return {
    baseScore: Math.round(average(baseScores)),
    storyScore: Math.round(average(storyScores)),
    tones,
  };
}

function average(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calcFinalLevel(score) {
  if (score < 35) return "萌芽期";
  if (score < 55) return "积累期";
  if (score < 75) return "进阶期";
  if (score < 90) return "高能期";
  return "艺术体质";
}

function contrastHighlight(finalScore, tones) {
  const surfaceCount = tones.filter((t) => t === "surface").length;
  const deepCount = tones.filter((t) => t === "deep").length;

  if (finalScore >= 80 && surfaceCount >= 3) {
    return "反差梗：你表面“随便看看”，内里却是隐藏型审美王者。";
  }
  if (finalScore <= 45 && deepCount >= 4) {
    return "反差梗：你是“精神上文艺巨人，行动上拖延诗人”。";
  }
  if (finalScore >= 70 && deepCount >= 5) {
    return "反差梗：你不是装文艺，你是把文艺活成日常了。";
  }
  return "反差梗：你的文艺值和生活状态基本同频，稳扎稳打型选手。";
}

function buildRecommendations(type) {
  const letters = type.split("");
  return [
    AXIS_TIPS[letters[0]],
    AXIS_TIPS[letters[1]],
    AXIS_TIPS[letters[2]],
    AXIS_TIPS[letters[3]],
  ];
}

function buildShareTexts(result) {
  const funny = [
    "#重生之我是文艺逼",
    `我测出 ${result.mbtiType}，文艺指数 ${result.finalScore}（${result.level}）。`,
    `命格称号：${result.titles.join(" / ")}`,
    `${result.highlights[0]}`,
    "结论：这号练下去，朋友圈文案不会再空心。",
  ].join("\n");

  const serious = [
    "文艺指数测评结果",
    `MBTI：${result.mbtiType}`,
    `总分：${result.finalScore}（${result.level}）`,
    `阶段称号：${result.titles.join("、")}`,
    `观察：${result.highlights[0]}`,
  ].join("\n");

  return { funny, serious };
}

function renderFinalResult() {
  const scorePack = collectScoring();
  const finalScore = Math.round(state.mbtiScore * 0.2 + scorePack.baseScore * 0.5 + scorePack.storyScore * 0.3);
  const level = calcFinalLevel(finalScore);
  const highlights = [contrastHighlight(finalScore, scorePack.tones)];
  const recommendations = buildRecommendations(state.mbtiType);

  const result = {
    mbtiType: state.mbtiType,
    finalScore,
    level,
    titles: state.stageTitles,
    highlights,
    recommendations,
    shareText: {},
  };

  result.shareText = buildShareTexts(result);

  const desc = MBTI_DESCRIPTIONS[state.mbtiType] || "你有自己独特的文艺路径。";

  app.innerHTML = `
    <div class="chapter">终章 · 命运结算</div>
    <h2>你的文艺人生结算完成</h2>
    <p class="desc">${desc}</p>
    <div>
      <span class="badge">MBTI：${result.mbtiType}</span>
      <span class="badge">命格：${result.titles.join(" · ")}</span>
    </div>

    <div class="grid">
      <article class="metric">
        <h3>总分</h3>
        <div class="v">${result.finalScore}</div>
        <p class="small">等级：${result.level}</p>
      </article>
      <article class="metric">
        <h3>MBTI 倾向分（20%）</h3>
        <div class="v">${state.mbtiScore}</div>
        <p class="small">根据 MBTI 字母倾向换算</p>
      </article>
      <article class="metric">
        <h3>基础文艺分（50%）</h3>
        <div class="v">${scorePack.baseScore}</div>
        <p class="small">审美、求知、创作、参与</p>
      </article>
      <article class="metric">
        <h3>周目剧情分（30%）</h3>
        <div class="v">${scorePack.storyScore}</div>
        <p class="small">重生选择与行动倾向</p>
      </article>
    </div>

    <div class="box"><strong>反差梗结论：</strong>${result.highlights[0]}</div>

    <div class="box">
      <strong>四条个性化建议</strong>
      <ul class="list">${result.recommendations.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>

    <div class="share">
      <h3>分享文案（搞笑版）</h3>
      <p id="share-funny">${escapeHtml(result.shareText.funny)}</p>
      <div class="actions">
        <button class="ghost" id="copy-funny">复制搞笑版</button>
      </div>
    </div>

    <div class="share">
      <h3>分享文案（认真版）</h3>
      <p id="share-serious">${escapeHtml(result.shareText.serious)}</p>
      <div class="actions">
        <button class="ghost" id="copy-serious">复制认真版</button>
      </div>
    </div>

    <div class="actions">
      <button class="primary" id="restart-final">再重生一次</button>
    </div>

    <div class="notice">免责声明：本结果用于娱乐和自我观察，不作为医学或临床判断依据。</div>
  `;

  document.getElementById("copy-funny").addEventListener("click", () => copyText(result.shareText.funny));
  document.getElementById("copy-serious").addEventListener("click", () => copyText(result.shareText.serious));
  document.getElementById("restart-final").addEventListener("click", resetAll);
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert("已复制到剪贴板。");
  } catch (_e) {
    alert("复制失败，请手动复制。\n\n" + text);
  }
}

function resetAll() {
  state.mbtiAnswers = {};
  state.mbtiType = "";
  state.mbtiScore = 0;
  state.round = 0;
  state.roundAnswers = { 1: {}, 2: {}, 3: {} };
  state.stageTitles = [];
  renderIntro();
}

start();
