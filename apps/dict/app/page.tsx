import { PageShell } from "@latesight/ui/page-shell";
import { DictionarySearch } from "./dictionary-search";

export default function DictHomePage() {
  return (
    <PageShell>
      <section className="page-section hero-grid" id="lookup">
        <DictionarySearch />
      </section>

      <section className="page-section" id="structure">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">01 / Operating Scope</p>
            <h2>第一阶段只做最重要的查询体验。</h2>
          </div>
          <p>首版将优先实现输入、结果、发音和例句，不提前堆积复杂功能，保持界面秩序与工具效率。</p>
        </div>
        <div className="dict-metrics">
          <article className="surface-panel dict-metric">
            <p className="meta-label">Focus</p>
            <h3>Readable Definitions</h3>
            <p>释义、词性、例句和发音入口会按清晰层级排列，减少视觉噪音。</p>
          </article>
          <article className="surface-panel dict-metric">
            <p className="meta-label">System</p>
            <h3>Shared With Main Site</h3>
            <p>顶栏、页脚、文字链接和焦点反馈沿用主站规范，保持站点网络一致性。</p>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
