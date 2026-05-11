import Image from "next/image";
import { AppointmentForm } from "./components/appointment-form";

const navItems = [
  { href: "#profile", label: "简介" },
  { href: "#experience", label: "经历" },
  { href: "#projects", label: "项目" },
  { href: "#publications", label: "成果" },
  { href: "#appointment", label: "预约" },
];

const tags = ["氧化应激", "神经损伤", "细胞自噬", "铁死亡", "lncRNA", "心肌肥厚"];

const workExperience = [
  {
    period: "2023.08 至今",
    title: "黑龙江中医药大学 · 博士后在站",
    description: "开展博士后科研工作。",
  },
  {
    period: "2020.09 至今",
    title: "哈尔滨医科大学 · 基础医学院 · 讲师",
    description:
      "承担教学与科研工作，持续推进神经损伤、细胞命运调控等方向研究。",
  },
  {
    period: "2015.07 - 2020.08",
    title: "哈尔滨医科大学 · 基础医学院 · 助教",
    description: "参与基础医学教学与科研训练。",
  },
];

const education = [
  {
    period: "2017.09 - 2020.12",
    degree: "博士 · 生理学",
    school: "哈尔滨医科大学",
  },
  {
    period: "2013.09 - 2015.06",
    degree: "硕士 · 基础医学七年制",
    school: "哈尔滨医科大学",
  },
  {
    period: "2008.09 - 2013.06",
    degree: "学士 · 基础医学七年制",
    school: "哈尔滨医科大学",
  },
];

const projects = [
  {
    label: "主持 · 黑龙江省自然科学基金联合引导项目",
    title: "SLC38A2 通过 FPN 抑制铁死亡调节海马神经衰老机制研究",
    detail: "项目编号：LH2024H019 · 2024.07 - 2027.07 · 10 万元 · 在研",
    lead: true,
  },
  {
    label: "主持 · 优秀青年教师基础研究支持计划",
    title: "靶向调控转运体 SLC38A2 改善 AD 小鼠海马神经元铁死亡机制的研究",
    detail: "项目编号：2023-KYYWF-0251 · 2024.01 - 2026.12 · 3 万元 · 在研",
    lead: true,
  },
  {
    label: "参与 · 国家自然科学基金委员会联合基金项目",
    title:
      "整合多组学数据解析 RNA 结合蛋白为靶标的抗肝纤维化药物筛选与评价",
    detail: "项目编号：U24A20645 · 2025.01.01 - 2028.12.31 · 260 万元 · 在研",
  },
  {
    label: "参与 · 国家自然科学基金委员会面上项目",
    title: "剪接因子 hnRNPA2B1 调控 GPX4 可变剪接诱发心肌细胞铁死亡机制研究",
    detail: "项目编号：82370279 · 2024.01.01 - 2027.12.31 · 49 万元 · 在研",
  },
];

const publications = [
  {
    role: "共同第一作者 · 2022",
    title:
      "Melatonin Attenuates H2O2-Induced Oxidative Injury by Upregulating LncRNA NEAT1 in HT22 Hippocampal Cells",
    journal: "International Journal of Molecular Sciences, 23(21):12891",
  },
  {
    role: "唯一第一作者 · 2021",
    title:
      "Melatonin Protects HT22 Hippocampal Cells from H2O2-Induced Injury by Increasing Beclin1 and Atg Protein Levels to Activate Autophagy",
    journal: "Current Pharmaceutical Design, 27(3)",
  },
  {
    role: "唯一第一作者 · 2023",
    title: "Sex differences in stress-induced hyperalgesia and its mechanisms",
    journal: "Journal of Neuroscience Research, 102(1)",
  },
  {
    role: "唯一第一作者 · 2018",
    title:
      "Long non-coding RNA Gm2199 rescues liver injury and promotes hepatocyte proliferation through the upregulation of ERK1/2",
    journal: "Cell Death & Disease, 9(6)",
  },
  {
    role: "共同第一作者 · 2024",
    title:
      "lncRNA Gm20257 alleviates pathological cardiac hypertrophy by modulating the PGC-1α-mitochondrial complex IV axis",
    journal: "Frontiers of Medicine, 18(4)",
  },
];

export default function Home() {
  return (
    <>
      <p className="trial-banner">试用版</p>
      <header className="hero">
        <nav className="topbar" aria-label="页面导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <section className="hero__content" id="profile">
          <p className="eyebrow">个人学术简历</p>
          <div className="hero__grid">
            <div>
              <h1>高强</h1>
              <p className="hero__role">哈尔滨医科大学 · 基础医学院 · 讲师</p>
              <p className="hero__summary">
                长期围绕神经损伤、氧化应激、自噬、铁死亡与非编码 RNA
                调控机制开展研究，关注细胞命运调控在神经退行性疾病、心血管病理重构及肝损伤修复中的作用。
              </p>
            </div>
            <figure className="hero__visual">
              <Image
                src="/assets/hero-research.png"
                alt="神经元、RNA、线粒体与细胞信号通路组成的抽象科研插画"
                fill
                priority
                sizes="(max-width: 860px) calc(100vw - 28px), 50vw"
              />
            </figure>
          </div>

          <div className="hero__footer">
            <aside className="hero__card" aria-label="核心信息">
              <span className="metric">2020 至今</span>
              <strong>哈尔滨医科大学基础医学院任教</strong>
              <p>
                博士后在站，主持黑龙江省自然科学基金联合引导项目等课题。
              </p>
            </aside>

            <div className="tags" aria-label="研究关键词">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className="section section--split" id="experience">
          <div className="section__intro">
            <p className="eyebrow">Experience</p>
            <h2>教育与工作经历</h2>
            <p>
              从基础医学七年制培养到生理学博士训练，再到高校教学与博士后研究，形成了基础医学、细胞生物学与疾病机制研究的连续积累。
            </p>
          </div>

          <div className="timeline">
            {workExperience.map((item) => (
              <article className="timeline__item" key={`${item.period}-${item.title}`}>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section__heading">
            <p className="eyebrow">Education</p>
            <h2>教育经历</h2>
          </div>
          <div className="education-grid">
            {education.map((item) => (
              <article key={`${item.period}-${item.degree}`}>
                <span>{item.period}</span>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--warm" id="projects">
          <div className="section__heading">
            <p className="eyebrow">Research Grants</p>
            <h2>近五年科研项目</h2>
          </div>

          <div className="research-spotlight">
            <figure className="research-spotlight__image">
              <Image
                src="/assets/research-cycle.png"
                alt="RNA 调控、氧化应激、自噬、铁死亡与线粒体功能形成循环关系的抽象科研插画"
                fill
                sizes="(max-width: 860px) calc(100vw - 28px), 300px"
              />
            </figure>
            <div>
              <p className="eyebrow">Research Focus</p>
              <h3>围绕细胞命运调控的疾病机制研究</h3>
              <p>
                以氧化应激和细胞稳态失衡为切入点，连接非编码
                RNA、线粒体功能、自噬与铁死亡等关键过程，解释神经损伤、心肌肥厚和组织修复中的分子机制。
              </p>
            </div>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article
                className={`project${project.lead ? " project--lead" : ""}`}
                key={project.title}
              >
                <div>
                  <span className="project__label">{project.label}</span>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="publications">
          <div className="section__heading">
            <p className="eyebrow">Selected Publications</p>
            <h2>代表性论文</h2>
          </div>

          <div className="publication-grid">
            {publications.map((publication) => (
              <article className="publication" key={publication.title}>
                <span>{publication.role}</span>
                <div>
                  <h3>{publication.title}</h3>
                  <p>{publication.journal}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--warm" id="appointment">
          <div className="appointment-shell">
            <div className="appointment-copy">
              <p className="eyebrow">Appointment</p>
              <h2>预约交流</h2>
              <p>
                如需学术合作、课题沟通或公开分享邀请，可在这里留下您的联系信息与期望时间。表单会通过后端写入
                Supabase 的预约表，不会直接暴露数据库访问给浏览器。
              </p>

              <div className="appointment-notes">
                <article>
                  <span>01</span>
                  <h3>服务端入库</h3>
                  <p>浏览器只提交到本站接口，真正写库发生在后端 Session Pool 连接中。</p>
                </article>
                <article>
                  <span>02</span>
                  <h3>信息可扩展</h3>
                  <p>数据库除了标准列，还会保留原始表单 JSON，方便后续扩充字段。</p>
                </article>
              </div>
            </div>

            <div className="appointment-panel">
              <AppointmentForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>基于个人简历整理的精选版学术主页 · 适合公开展示与快速浏览</p>
      </footer>
    </>
  );
}
