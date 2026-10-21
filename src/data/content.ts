const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1080&q=80`

export const PROFILE = {
  name: '金超',
  initials: 'JC',
  role: 'AI 产品经理',
  email: 'jinchao@patrickstarai.com',
  location: 'CHINA',
  since: '2023',
  socials: [
    { label: 'GitHub', href: 'https://github.com/lieelemonster' },
    { label: '微信', href: '#' },
    { label: '即刻', href: '#' },
    { label: '小红书', href: '#' },
  ],
}

export const VIEWPOINT = {
  headline: '做产品先看清用户、场景和问题，再谈方案和工具。',
  items: [
    { title: '用户', note: '先搞清楚是谁在用、他们真正在意什么，而不是我们想当然他们需要什么。' },
    { title: '场景', note: '产品发生在具体场景里：什么时候用、在哪里用、前后还有什么步骤，决定了方案能不能落地。' },
    { title: '问题', note: '先把问题定义清楚、值得不值得做，再决定用什么方案；问题没找准，方案再漂亮也没用。' },
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
    name: 'AI 购买助手',
    pitch: '问卷式收集购买需求，结合本地产品库给出推荐，帮用户更快锁定合适商品。',
    category: 'AI 产品',
    tags: ['Python', 'LLM', '推荐'],
    preview: img('photo-1472851294608-062f824d29cc'),
    demo: 'https://github.com/lieelemonster/AI-Purchase-Assistant',
    source: 'https://github.com/lieelemonster/AI-Purchase-Assistant',
  },
  {
    name: 'AI 生态日报',
    pitch: '基于 agents-radar，用 DeepSeek 自动汇总 AI CLI、Agent、基础设施与社区动态，生成中英文日报。',
    category: 'AI 工具',
    tags: ['TypeScript', 'DeepSeek', '自动化'],
    preview: img('photo-1460925895917-afdab827c52f'),
    demo: 'https://github.com/lieelemonster/ai-agents-daily',
    source: 'https://github.com/lieelemonster/ai-agents-daily',
  },
  {
    name: '智能客服',
    pitch: '拾物 Dify 智能客服：Node.js 后端与买家聊天界面，面向跨境电商卖家的多平台客服场景。',
    category: 'AI 客服',
    tags: ['JavaScript', 'Dify', 'Node.js'],
    preview: img('photo-1577563908411-5077b6dc7624'),
    demo: 'https://github.com/lieelemonster/shiwu-ai-customer-service',
    source: 'https://github.com/lieelemonster/shiwu-ai-customer-service',
  },
  {
    name: 'AI 作曲',
    pitch: 'AI 写三版中文歌词，再用规则作曲生成约 1 分钟钢琴旋律与伴奏小样（React + FastAPI）。',
    category: 'Vibe Coding',
    tags: ['Python', 'React', 'FastAPI'],
    preview: img('photo-1511379938547-c1f69419868d'),
    demo: 'https://github.com/lieelemonster/AI-zuoqu',
    source: 'https://github.com/lieelemonster/AI-zuoqu',
  },
]

export const PRACTICE = {
  years: { product: 3, ai: 1 },
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
    category: 'ERP 复盘',
    title: '跨境 ERP 从 0 到 1 复盘：一个传统 PM 的四个阶段和三个 AI 用法',
    excerpt: '三套系统各说各话，仓库靠表格拼业务。一个传统PM如何把跨境ERP从0做到1，以及AI真正帮上忙、帮不上忙的地方。',
    date: '2026.10.18',
    cover: img('photo-1696838163915-3649669f300f'),
    href: 'articles/caguuu-erp-0to1.html',
  },
{
    category: '转型复盘',
    title: '从ChatGPT早期用户到AI产品经理：一个传统PM的转型复盘',
    excerpt: '我今年26岁，做了两年传统产品经理，又做了一年多AI产品经理。这篇文章讲为什么转、怎么转、转的时候卡在哪，以及一套可照着走的步骤。',
    date: '2026.10.18',
    cover: img('photo-1678366633407-7f49da199a42'),
    href: 'articles/chatgpt-to-ai-pm.html',
  },
{
    category: '产品思考',
    title: '从ERP到AI客服：我这两年看到的产品经理能力变化',
    excerpt: '从 Caguuu ERP 到「多客AI」，两年两段产品经历。聊聊传统PM和AI产品经理在能力边界、工作方式上的真实变化。',
    date: '2026.10.18',
    cover: img('photo-1654198340681-a2e0fc449f1b'),
    href: 'articles/erp-to-ai-pm.html',
  },
{
    category: 'AI 客服',
    title: '客服机器人答非所问，用户为什么宁愿等人工？我做「多客AI」的一次复盘',
    excerpt: '客服机器人答非所问，用户宁愿等人工。复盘「多客AI」：跨境电商卖家真正需要什么样的AI客服，以及我们怎么改才见效。',
    date: '2026.10.18',
    cover: img('photo-1655841439659-0afc60676b70'),
    href: 'articles/duoke-ai-review.html',
  },
]

export const ABOUT = {
  headline: '白天做产品，晚上写代码，偶尔写点字。',
  bio: '计算机科学与技术本科，持有计算机二级证书，获得过校园编程比赛二等奖。做过传统产品经理，现在专注 AI 产品，持续关注前沿 AI 技术，在技术可行性和用户价值之间做判断。工作之外，我会用 Vibe Coding 把想法快速做成可交互的原型，再把过程写成文章。',
  interests: ['AI 产品', '大模型应用', 'Vibe Coding', '写作'],
  milestones: [
    { value: '3年+', label: '产品经理经验' },
    { value: '1年+', label: 'AI 产品经理经验' },
    { value: '4', label: '个人 Vibe Coding 项目' },
  ],
  journey: [
    { year: '2023', title: '产品经理 · 上海卡谷电子商务有限公司', tags: ['B 端', '跨境电商'] },
    { year: '2025', title: 'AI 产品经理 · 深圳美云集网络科技有限责任公司', tags: ['LLM', 'RAG'] },
  ],
  photos: [img('photo-1499750310107-5fef28a66643'), img('photo-1783663911692-130a88e6ccc3')],
}

export const ASK_AI = {
  suggestions: ['你是做什么的？', '最有代表性的项目？', '你怎么看 AI 产品？', '怎么联系你？'],
  answers: [
    {
      keys: ['做什么', '是谁', '介绍', '经历', '背景'],
      text: '我是金超，一名 AI 产品经理，计算机科学与技术本科。2023 年开始做产品经理，2025 年起专注 AI 产品。平时也用 Vibe Coding 把想法快速做成可交互的原型。',
    },
    {
      keys: ['项目', '作品', '代表', 'demo'],
      text: '网站上收录了 4 个个人项目：AI 购买助手、AI 生态日报、智能客服和 AI 作曲。往上翻到 01 / SELECTED WORK 可以看到详情和链接。',
    },
    {
      keys: ['看法', '观点', '怎么看', '理念', 'ai 产品'],
      text: '我做产品最看重三件事：用户、场景、问题。先搞清楚是谁、在什么场景下遇到什么问题，再谈方案和工具。',
    },
    {
      keys: ['联系', '邮箱', '微信', '合作', '招聘'],
      text: `欢迎来聊！邮箱是 ${'jinchao@patrickstarai.com'}，页面最底部也有其他联系方式。`,
    },
    {
      keys: ['工具', '技术栈', 'cursor', 'claude'],
      text: '日常主力是 Claude Code、Cursor 和 DeepSeek，设计用 Figma，快速出界面会用 v0。02 / IN PRACTICE 里的工具箱可以拖着玩。',
    },
  ],
  fallback: '这个问题我还没准备好答案 :) 你可以问问我的经历、项目、对 AI 产品的看法，或者直接发邮件聊。',
}
