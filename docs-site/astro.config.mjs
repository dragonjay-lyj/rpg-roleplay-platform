// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Stellatrix 文档站。单一 Markdown 源 = src/content/docs/(从 app 的 frontend/help 迁入)。
// 产物同时:① 部署 CF Pages → docs.stellatrix.icu(全站导航/搜索/SEO);
//          ② /embed/<slug> 去框架壳的嵌入视图,供 app 内 HelpDrawer 以 iframe 同控件打开。
export default defineConfig({
  site: 'https://docs.stellatrix.icu',
  integrations: [
    starlight({
      title: 'Stellatrix 文档',
      description: 'Stellatrix / RPG Roleplay 使用文档 —— 剧本、卡牌、记忆、世界书、酒馆、编辑器、自部署。',
      defaultLocale: 'root',
      locales: { root: { label: '简体中文', lang: 'zh-CN' } },
      customCss: ['./src/styles/custom.css'],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      pagination: false,
      sidebar: [
        { label: '开始上手', items: ['wizard', 'new-game-wizard', 'input', 'tasks'] },
        { label: '内容管理', items: ['scripts', 'cards', 'saves', 'memory', 'modules', 'worldbook', 'characters', 'branches'] },
        { label: '游戏内面板', items: ['game-characters', 'game-composer', 'game-memory', 'game-timeline', 'game-worldbook'] },
        { label: '进阶玩法', items: ['tavern', 'timeline', 'branch-graph', 'image-gen'] },
        { label: '创作工具', items: ['md-editor', 'review', 'scripts-review'] },
        { label: '配置', items: ['settings-models', 'settings-params', 'settings-memory', 'settings-modelparams', 'settings-modules', 'mcp'] },
        { label: '管理', items: ['admin'] },
      ],
    }),
  ],
});
