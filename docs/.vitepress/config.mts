import { defineConfig } from 'vitepress'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Steven' s Blog",
  description: "我思故我在",
  lang: "zh-CN", // 同样被用于<html>标签的lang属性

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/', props: { icon: "mdi-home" } },
      { text: '关于', link: '/about.html', props: { icon: "mdi-information" } },
      { text: '归档', link: '/archive.html', props: { icon: "mdi-archive" } },
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    math: true
  },

  vite: {
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    },
    ssr: {
      noExternal: [/\.css$/, /^vuetify/],
    },
  },
  lastUpdated: true
})
