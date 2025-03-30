import { createContentLoader } from 'vitepress'

export default createContentLoader('**/*.md', {
  includeSrc: false, // 包含原始 markdown 源?
  excerpt: true,    // 包含摘录?
  transform(rawData) {
    return rawData.sort((a, b) => {
      return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
    }).filter(item => {
      return item.frontmatter?.hidden !== true;
    })
  }
})