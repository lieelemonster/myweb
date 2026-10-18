const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1080&q=80`

export const PROFILE = {
  name: '金超',
  initials: 'JC',
  role: 'AI 产品经理',
  email: 'jinchao@example.com',
  location: 'CHINA',
  since: '2019',
  socials: [
    { label: 'GitHub', href: '#' },
    { label: '微信', href: '#' },
    { label: '即刻', href: '#' },
    { label: '小红书', href: '#' },
  ],
}

export const VIEWPOINT = {
  headline: 'AI 产品的护城河不在模型，而在对场景的理解，和对体验的耐心。',
  items: [
    { title: '场景先于技术', note: '先找到值得被解决的问题，再决定用不用 AI、用多少 AI。' },
    { title: '评测就是需求', note: '没有评测集的 AI 需求是不完整的，把“好”定义成可度量的标准。' },
    { title: '原型胜过文档', note: '能用 Vibe Coding 一天跑通的想法，就不要花一周写 PRD。' },
  ],
}

export type Project = {
  name: string
  pitch: string
  category: string
  tags: string[]
  preview: string
  demo: string
  source: string
}

export const PROJECTS: Project[] = [
  {
    name: 'MeetingMind',
    pitch: '会议结束即生成待办与决策记录，告别会后手动整理纪要。',
    category: 'AI 产品',
    tags: ['Cursor', 'Whisper', 'LLM API'],
    preview: img('photo-1666027092835-7e668416b7c8'),
    demo: '#',
    source: '#',
  },
  {
    name: 'PRD Copilot',
    pitch: '一句话需求自动扩写为结构化 PRD，补全边界条件与验收标准。',
    category: '效率工具',
    tags: ['v0', 'Claude', 'React'],
    preview: img('photo-1532190872407-280735d27e08'),
    demo: '#',
    source: '#',
  },
  {
    name: 'Insight Radar',
    pitch: '聚合应用商店与社区评论，自动聚类用户痛点并追踪情绪变化。',
    category: 'AI 产品',
    tags: ['Cursor', 'LLM API', 'Supabase'],
    preview: img('photo-1637946175559-22c4fe13fc54'),
    demo: '#',
    source: '#',
  },
  {
    name: 'Pill Reminder',
    pitch: '为长辈设计的极简用药提醒，拍照即识别药盒并生成服药计划。',
    category: 'Vibe Coding',
    tags: ['Bolt', 'Vision API', 'PWA'],
    preview: img('photo-1603539947678-cd3954ed515d'),
    demo: '#',
    source: '#',
  },
  {
    name: 'Focus Widget',
    pitch: '桌面专注小组件，根据日程自动切换勿扰模式与白噪音。',
    category: 'Vibe Coding',
    tags: ['Claude Code', 'Tauri'],
    preview: img('photo-1776702683574-f91f73a3cd26'),
    demo: '#',
    source: '#',
  },
  {
    name: 'Copy Lab',
    pitch: '营销文案 A/B 生成器，一次产出多版本并预测点击率表现。',
    category: '效率工具',
    tags: ['v0', 'LLM API', 'Vercel'],
    preview: img('photo-1601784551446-20c9e07cdbdb'),
    demo: '#',
    source: '#',
  },
]

export const PRACTICE = {
  years: { product: 6, ai: 3 },
  questions: [
    { key: 'WHY', q: '为什么值得做？', a: '先算清楚用户每天在这件事上浪费多少时间，再谈 AI 能省下多少。' },
    { key: 'WORKFLOW', q: 'AI 怎么嵌进工作流？', a: '不做新入口，优先嵌进用户已有的工具里，让 AI 出现在恰好需要的那一步。' },
    { key: 'FAILURE', q: '模型出错了怎么办？', a: '默认它会错：可预览、可撤销、可人工接管，并把每一次失败沉淀进评测集。' },
    { key: 'RETURN', q: '怎么衡量回报？', a: '看留存与任务完成率，而不是调用量；单次成本必须小于它创造的价值。' },
  ],
}

export const TOOLS = [
  'Claude Code',
  'Cursor',
  'VS Code',
  'DeepSeek',
  'ChatGPT',
  'Figma',
  'v0',
  'Dify',
  'Notion',
  'Midjourney',
  'Supabase',
]

export type Article = {
  category: string
  title: string
  excerpt: string
  date: string
  cover: string
  href: string
}

export const ARTICLES: Article[] = [
  {
    category: 'AI 落地',
    title: '从 Demo 到上线：大模型产品的最后一公里',
    excerpt: '多数 AI 项目死在 PoC 之后。本文拆解评测体系、成本模型与兜底策略，聊聊如何让大模型能力真正进入业务流程。',
    date: '2025.06.18',
    cover: img('photo-1678366633407-7f49da199a42'),
    href: '#',
  },
  {
    category: '产品设计',
    title: '对话式界面不是万能解：何时该放弃聊天框',
    excerpt: '聊天框降低了入门门槛，也抬高了表达成本。结合三个真实案例，讨论结构化 UI 与自然语言交互的边界。',
    date: '2025.05.30',
    cover: img('photo-1655841439659-0afc60676b70'),
    href: '#',
  },
  {
    category: '行业洞察',
    title: 'Agent 元年之后：SaaS 的定价逻辑正在被改写',
    excerpt: '按席位收费的时代正在松动。从结果付费到用量计费，我们观察到的五种新商业模式与其背后的产品假设。',
    date: '2025.05.12',
    cover: img('photo-1654198340681-a2e0fc449f1b'),
    href: '#',
  },
  {
    category: 'AI 落地',
    title: '用 RAG 做企业知识库，我们踩过的 7 个坑',
    excerpt: '切片策略、权限隔离、引用溯源、冷启动数据……一份来自一线项目的复盘清单，帮你少走弯路。',
    date: '2025.04.26',
    cover: img('photo-1696838163915-3649669f300f'),
    href: '#',
  },
  {
    category: '产品设计',
    title: '设计 AI 的“不确定性”：给用户恰到好处的掌控感',
    excerpt: '模型输出天然不稳定。如何通过预览、可撤销与渐进披露，让用户既信任结果，又随时能接管。',
    date: '2025.04.08',
    cover: img('photo-1709625862266-014ef072fd93'),
    href: '#',
  },
  {
    category: '行业洞察',
    title: '产品经理的新基本功：Prompt、评测与数据飞轮',
    excerpt: 'AI 时代 PM 的核心竞争力在迁移。从写 PRD 到写评测集，聊聊角色边界的变化与能力重构路径。',
    date: '2025.03.21',
    cover: img('photo-1637775297458-7443ffd545b2'),
    href: '#',
  },
]

export const ABOUT = {
  headline: '白天做产品，晚上写代码，偶尔写点字。',
  bio: '我相信好的 AI 产品应该让人感觉不到 AI 的存在。工作之外，我会把脑子里冒出来的小想法用 Vibe Coding 做成能用的东西，再把过程写成文章。',
  interests: ['产品', 'AI', '写作', '游戏', '摄影', '数码'],
  milestones: [
    { value: '2000+', label: 'Vibe Coding 实践时长 / 小时' },
    { value: '6年+', label: '互联网产品经验' },
    { value: '30万+', label: '思考与复盘字数' },
  ],
  journey: [
    { year: '2019', title: '入行产品', tags: ['B 端', 'SaaS'] },
    { year: '2021', title: '负责增长与数据产品', tags: ['增长', '数据'] },
    { year: '2023', title: '转向大模型应用', tags: ['LLM', 'RAG'] },
    { year: '2025', title: 'AI 原生产品 + Vibe Coding', tags: ['Agent', '独立开发'] },
  ],
  photos: [img('photo-1499750310107-5fef28a66643'), img('photo-1783663911692-130a88e6ccc3')],
}

export const ASK_AI = {
  suggestions: ['你是做什么的？', '最有代表性的项目？', '你怎么看 AI 产品？', '怎么联系你？'],
  answers: [
    {
      keys: ['做什么', '是谁', '介绍', '经历', '背景'],
      text: '我是金超，一名 AI 产品经理，有 6 年互联网产品经验，近 3 年专注大模型应用落地。平时也用 Vibe Coding 把想法快速做成原型。',
    },
    {
      keys: ['项目', '作品', '代表', 'demo'],
      text: '比较有代表性的是 MeetingMind（会议纪要自动生成待办）和 Insight Radar（用户评论痛点聚类）。往上翻到 01 / SELECTED WORK 可以看到全部作品。',
    },
    {
      keys: ['看法', '观点', '怎么看', '理念', 'ai 产品'],
      text: '我的核心判断是：AI 产品的护城河不在模型，而在对场景的理解和对体验的耐心。场景先于技术，评测就是需求，原型胜过文档。',
    },
    {
      keys: ['联系', '邮箱', '微信', '合作', '招聘'],
      text: `欢迎来聊！邮箱是 ${'jinchao@example.com'}，页面最底部也有其他联系方式。`,
    },
    {
      keys: ['工具', '技术栈', 'cursor', 'claude'],
      text: '日常主力是 Claude Code、Cursor 和 DeepSeek，设计用 Figma，快速出界面会用 v0。02 / IN PRACTICE 里的工具箱可以拖着玩。',
    },
  ],
  fallback: '这个问题我还没准备好答案 :) 你可以问问我的经历、项目、对 AI 产品的看法，或者直接发邮件聊。',
}
