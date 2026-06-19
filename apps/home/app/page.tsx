import { PageShell } from "@latesight/ui/page-shell";
import { SiteCard } from "@latesight/ui/site-card";

const sites = [
  {
    name: "Word Lens",
    domain: "dict.ibmx.net",
    description: "单词查询、释义浏览、发音与例句整合的第一个工具站。",
    status: "Coming soon"
  }
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="page-section hero-grid hero-grid--single" id="index">
        <div className="hero-copy">
          <p className="section-eyebrow">Network / Precision / Utility</p>
          <h1>一个面向效率工具的个人站点网络。</h1>
          <p>
            Latesight 以统一的品牌框架承载多个次级站点。首页负责索引、归档与导流，工具站则聚焦单一任务，保持专业、克制、理性的交互体验。
          </p>
        </div>
      </section>

      <section className="page-section" id="sites">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">01 / Site Index</p>
            <h2>当前站点目录</h2>
          </div>
          <p>先从单词查询工具站开始，后续所有次级站点都将沿用同一套视觉系统和交互规则。</p>
        </div>
        <div className="card-grid">
          {sites.map((site) => (
            <SiteCard key={site.domain} {...site} />
          ))}
        </div>
      </section>

      <section className="page-section" id="about">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">02 / Structure</p>
            <h2>统一品牌，分离能力。</h2>
          </div>
        </div>
        <div className="hero-panel">
          <p className="panel-copy">
            顶栏、页脚、按钮、输入框、链接反馈和版式节奏会在首页与所有工具站之间保持一致。
            每个站点只在内容密度和核心工作流上做定制，而不会割裂成不同风格的产品。
          </p>
          <a className="text-link" href="https://dict.latesight.com">
            打开第一个工具站
          </a>
        </div>
      </section>
    </PageShell>
  );
}
