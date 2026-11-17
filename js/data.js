/* =========================================================
   网站内容数据 —— 以后改内容 / 加作品，只需要改这个文件
   ========================================================= */
window.SITE = {
  name: "张修瑞",
  nameEn: ["ZHANG", "XIURUI"],
  roles: ["People Strategist", "Visual Storyteller", "Business Builder"],
  heroLead: "懂业务的 HR，会讲故事的操盘手。<br />NUS 技术与创新管理硕士在读。",
  timezone: "Asia/Singapore",

  // 宣言：*星号包裹* 的词会高亮
  manifesto: {
    en: ["I turn", "*people*, *data*", "& *stories*", "into growth."],
    cn: "我做过酒店督导、投行研究、工厂管理和 HR，也把家族的酸汤生意从小作坊做成了标准化工厂。换了很多角色，做的其实是同一件事：把人、数据和故事组织起来，让它们变成增长。",
  },

  // 学历 —— 亮点板块。badges: [显示前缀, 数字, 后缀, 说明, 计数起点]
  education: [
    {
      level: "Master",
      period: "2026 —",
      short: "NUS",
      cn: "新加坡国立大学",
      en: "National University of Singapore",
      degreeCn: "技术与创新管理 硕士",
      degreeEn: "MSc in Management of Technology & Innovation",
      badges: [
        ["#", 10, "", "QS 2027 世界排名 · 亚洲第 1", 100],
        ["#", 15, "", "THE 2027 世界排名 · 亚洲第 3", 100],
        ["#", 16, "", "U.S. News 2026-27 · 亚洲第 2", 100],
      ],
      seal: "QS #10 · THE #15 · ASIA #1 · ",
    },
    {
      level: "Bachelor",
      period: "2021 — 2025",
      short: "NEU",
      cn: "东北大学",
      en: "Northeastern University, China",
      degreeCn: "工商管理 本科",
      degreeEn: "Bachelor of Management in Business Administration",
      badges: [
        ["", 985, "", "工程重点建设高校", 0],
        ["", 4, "次", "校园奖学金", 0],
        ["", 2, "次", "创新创业奖学金", 0],
      ],
    },
  ],
  extras: [
    ["Language", "IELTS 6.5 · 中文母语"],
    ["Based in", "Singapore"],
  ],

  // 四个核心能力 —— 层叠卡片
  pillars: [
    {
      en: "People & Organisation",
      cn: "人才与组织",
      claim: "从简历入库到组织变革，HR 链条的每一环我都亲手做过。",
      proofs: [
        ["30", "min", "让新员工掌握核心操作的上岗带教"],
        ["0→1", "", "推动家族企业从亲情化管理走向制度化"],
      ],
      tags: ["招聘", "培训", "人才盘点", "SOP", "组织变革"],
    },
    {
      en: "Data → Decision",
      cn: "数据驱动决策",
      claim: "先看数据，再下判断。我习惯把数字翻译成能拍板的结论。",
      proofs: [
        ["12,432", "", "份乡村青少年样本，清洗并做交叉分析"],
        ["52.82", "亿", "产业产值数据，拆解成销售团队 KPI"],
      ],
      tags: ["人效分析", "大数据分析", "Excel 建模", "尽职调查"],
    },
    {
      en: "Visual Storytelling",
      cn: "视觉叙事",
      claim: "把枯燥的政策、报表和方案，讲成别人愿意看完的东西。",
      proofs: [
        ["BP", "", "商业计划书与路演 PPT 全案操刀"],
        ["PS · AI · PR", "", "海报、短视频、公众号一手包办"],
      ],
      tags: ["路演", "PPT 咨询级", "视频剪辑", "雇主品牌"],
    },
    {
      en: "Business Building",
      cn: "商业操盘",
      claim: "不只做职能岗。我真的把生意从零做起来过。",
      proofs: [
        ["4.15", "×", "景区文创产品销量增长"],
        ["700", "万", "争取到的政府产业扶持投资"],
      ],
      tags: ["产品研发", "渠道拓展", "供应链", "电商运营"],
    },
  ],

  // 经历：每段只留一句话的成就
  journey: [
    { year: "2021", org: "东北大学 · 985", role: "工商管理 本科", line: "四次校园奖学金、两次创新创业奖学金，两拿挑战杯省级奖项" },
    { year: "2022", org: "最黔线食品", role: "酒店经理 · 区域督导", line: "疫情期间带店做出历史最佳营收" },
    { year: "2023", org: "国泰君安证券", role: "投行部研究助理", line: "用人效数据参与尽调与股权激励项目" },
    { year: "2024", org: "扬锐精密五金", role: "生产管理员", line: "巡线、带教，用工时和良品率反推人效" },
    { year: "2024—26", org: "最黔线酸汤", role: "项目负责人", line: "小作坊 → 获 700 万投资的标准化工厂" },
    { year: "2026", org: "江南航天信息", role: "综合主管", line: "招聘、档案、视频、跨部门沟通一肩挑" },
    { year: "Now", org: "新加坡国立大学 · QS #10", role: "MSc MOTI", line: "技术与创新管理，把方法论升级到全球视角" },
  ],

  // 案例：挑战 → 行动 → 结果
  cases: [
    {
      id: "suantang",
      title: "最黔线酸汤",
      en: "Sour Soup, Standardised",
      tagline: "把一口家乡味，做成一条产业链",
      role: "项目负责人 · 家族企业",
      period: "2024 — 2026",
      metric: { value: 700, suffix: "万", label: "政府产业扶持投资" },
      color: ["#d7261e", "#ff8a3d"],
      cover: "",
      challenge: "传统西红柿酸汤有地域口味壁垒，江浙沪消费者接受度低；作坊式生产风味不稳定。",
      action: [
        "主导研发糟辣椒基底酸汤，用差异化产品切入全国市场",
        "整合上游作坊，建立洞坛发酵工艺与标准化生产 SOP",
        "搭建“B 端供餐 + C 端电商”双轨销售，用产业数据制定销售 KPI",
        "作为二代接班人引入现代管理制度，平衡亲情与制度",
      ],
      results: ["¥700 万扶持", "复购率 +25%", "电商占比 28.6%", "非标转化率预计 +30%"],
    },
    {
      id: "zhaogongshan",
      title: "“赵”财进宝",
      en: "A Mountain, Rebranded",
      tagline: "给一座景区做了一套会卖货的 IP",
      role: "设计总监",
      period: "2023 — 2024",
      metric: { value: 4.15, decimals: 2, suffix: "×", label: "景区文创产品销量增长" },
      color: ["#ff4d1f", "#ffb800"],
      cover: "",
      challenge: "四川赵公山景区文创同质化，游客“祈福”的情感需求没有被产品接住。",
      action: [
        "深入景区一线调研，锚定“文化共鸣”与“社交货币”两个需求",
        "主导文创 IP 视觉体系，落地 32 款覆盖全旅程的周边",
        "统筹 5 人跨学科团队，按特长分工，周期缩短 20%",
        "操刀商业计划书与路演，促成景区与异业跨界合作",
      ],
      results: ["销量 ×4.15", "2 月峰值 ×14.22", "净利率 +32%", "挑战杯省三等奖"],
    },
    {
      id: "career-edu",
      title: "城乡职业规划共同体",
      en: "12,432 Voices",
      tagline: "听一万两千个乡村孩子讲他们的未来",
      role: "核心成员 · 数据与路演",
      period: "2022 — 2023",
      metric: { value: 12432, suffix: "", label: "份有效调研样本" },
      color: ["#3a6bff", "#8fd3ff"],
      cover: "",
      challenge: "乡村青少年与职校生缺乏职业规划资源，帮扶政策找不到精准切入点。",
      action: [
        "回收并清洗全国 12 县区 12,432 份样本，做交叉分析",
        "参与数万字论文，提出“家-校-企-政”四方联动模型",
        "独立负责参赛与答辩 PPT，把复杂数据讲成清晰的故事",
        "统筹决赛展位设计与海报、手册等物料",
      ],
      results: ["12 县区", "12,432 样本", "挑战杯省一等奖"],
    },
  ],

  // 作品集 —— 骨架阶段是占位，之后替换成真实作品（media 填图片或 mp4 路径）
  works: [
    { title: "Poster Series", type: "Graphic", year: "2022", media: "" },
    { title: "Training Film", type: "Video", year: "2026", media: "" },
    { title: "IP Merch", type: "Product", year: "2024", media: "" },
    { title: "Pitch Deck", type: "Presentation", year: "2023", media: "" },
    { title: "WeChat Stories", type: "Content", year: "2026", media: "" },
    { title: "Expo Booth", type: "Spatial", year: "2023", media: "" },
  ],

  toolkit: ["Photoshop", "Illustrator", "Premiere", "剪映", "Excel", "PowerPoint", "招聘", "培训", "人才测评", "项目管理", "数据分析", "路演"],
  honors: ["挑战杯学术科技作品竞赛 · 省一等奖", "挑战杯创业计划竞赛 · 省三等奖", "创新创业奖学金 ×2", "校园奖学金 ×4"],

  contact: {
    email: "zhangxiurui@u.nus.edu",
    wechatQr: "assets/wechat-qr.svg",
  },
};
