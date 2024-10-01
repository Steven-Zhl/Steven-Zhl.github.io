// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'
// 开启RSS支持（RSS配置）
import type { Theme } from '@sugarat/theme'

const baseUrl = 'https://Steven-Zhl.github.io'
const RSS: Theme.RSSOptions = {
  title: 'Steven\'s Blog',
  baseUrl,
  copyright: 'Copyright (c) 2023-2024, Steven-Zhl',
  description: '我思故我在',
  language: 'zh-CN',
  image: 'https://Steven-Zhl.github.io/logo.png',
  favicon: 'https://Steven-Zhl.github.io/favicon.ico',
}

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // search: false,

  // markdown 图表支持（会增加一定的构建耗时）
  mermaid: true,

  // 页脚
  footer: {
    // message 字段支持配置为HTML内容，配置多条可以配置为数组
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    copyright: 'MIT License',
    // icpRecord: {
    //   name: '蜀ICP备19011724号',
    //   link: 'https://beian.miit.gov.cn/'
    // },
    // securityRecord: {
    //   name: '公网安备xxxxx',
    //   link: 'https://www.beian.gov.cn/portal/index.do'
    // },
  },

  // 主题色修改
  themeColor: 'el-blue',

  // 文章默认作者
  author: 'Steven-Zhl',

  // 友链
  friend: [
    {
      nickname: '蒟蒻zExNocs',
      des: 'Man who like fishing.',
      avatar: 'https://avatars.githubusercontent.com/u/90168974',
      url: 'https://www.zexnocs.top/',
    }
  ],
  // Giscus评价系统
  comment: {
    type: 'giscus',
    options: {
      repo: 'Steven-Zhl/Steven-Zhl.github.io',
      repoId: 'R_kgDOM530yA',
      category: 'Announcements',
      categoryId: 'DIC_kwDOM530yM4Ci9HN',
      inputPosition: 'top'
    },
    mobileMinify: true
  }
})

export { blogTheme }
