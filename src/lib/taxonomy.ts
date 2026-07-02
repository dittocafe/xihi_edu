export const pathwayLabels: Record<string, string> = {
  high_school: "高中阶段",
  undergraduate: "本科阶段",
  mainland_to_grad: "陆本申研",
  resources: "资源库"
};

export const stageLabels: Record<string, string> = {
  grade_9: "9年级",
  grade_10: "10年级",
  grade_11: "11年级",
  grade_12: "12年级",
  college_year_1: "大一",
  college_year_2: "大二",
  college_year_3: "大三",
  college_year_4: "大四",
  gap_year: "Gap",
  grad_application: "申研",
  early_career: "初入职场"
};

export const destinationLabels: Record<string, string> = {
  us: "美国",
  uk: "英国",
  hk: "香港",
  singapore: "新加坡",
  europe: "欧洲",
  canada: "加拿大",
  australia: "澳大利亚",
  mainland: "中国大陆",
  cross_region: "跨地区比较"
};

export const decisionTopicLabels: Record<string, string> = {
  school_choice: "选校",
  curriculum: "课程体系",
  test_prep: "标化",
  ap: "AP",
  summer_program: "夏校",
  research: "科研",
  activities: "活动规划",
  competition: "竞赛",
  consultant: "顾问选择",
  essay: "文书",
  college_list: "选校名单",
  early_application: "早申",
  regular_application: "常规申请",
  offer_choice: "Offer选择",
  visa: "签证",
  housing: "住宿",
  parent_role: "家长边界",
  parent_child_communication: "亲子沟通",
  mental_health: "心理与适应",
  internship: "实习",
  career: "就业",
  graduate_school: "硕士申请",
  phd: "博士申请",
  recommendation: "推荐信",
  gpa: "GPA",
  budget: "预算与成本"
};

export const resourceTypeLabels: Record<string, string> = {
  beijing_resources: "北京资源",
  shanghai_resources: "上海资源",
  nonlocal_family: "外地家庭",
  online_resources: "线上资源",
  school_info: "学校信息",
  test_prep: "标化资源",
  summer_program: "夏校资源",
  research_program: "科研项目",
  competition: "竞赛资源",
  consultant: "顾问资源",
  essay_service: "文书资源",
  parent_community: "家长社群",
  student_group: "学生组织",
  internship: "实习资源",
  official_info: "官方信息",
  data_source: "数据来源"
};

export const contentRoleLabels: Record<string, string> = {
  framework: "判断框架",
  timeline: "时间线",
  checklist: "清单",
  explainer: "概念解释",
  case_note: "个案观察",
  resource_note: "资源判断",
  seasonal: "时令提醒",
  opinion: "观点手记"
};

export const audienceLabels: Record<string, string> = {
  parents: "家长",
  students: "学生",
  counselors: "顾问/老师"
};

export function labels(values: string[] = [], dictionary: Record<string, string>) {
  return values.map((value) => dictionary[value] ?? value);
}

export function hasAny(values: string[] = [], targets: string[] = []) {
  return targets.length === 0 || targets.some((target) => values.includes(target));
}

export function publicArticles(articles: any[]) {
  return articles
    .filter((article) => article.data.public)
    .sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime());
}

export function relatedArticles(
  articles: any[],
  options: {
    pathway?: string;
    stages?: string[];
    decisionTopics?: string[];
    resourceTypes?: string[];
    limit?: number;
  }
) {
  const limit = options.limit ?? 4;

  return publicArticles(articles)
    .filter((article) => !options.pathway || article.data.pathways.includes(options.pathway))
    .filter((article) => hasAny(article.data.stages, options.stages ?? []))
    .filter((article) => hasAny(article.data.decision_topics, options.decisionTopics ?? []))
    .filter((article) => hasAny(article.data.resource_types, options.resourceTypes ?? []))
    .slice(0, limit);
}
