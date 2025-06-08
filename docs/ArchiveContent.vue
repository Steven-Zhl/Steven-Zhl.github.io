<script lang="ts" setup>
import { computed } from 'vue'
import { data } from './.vitepress/theme/posts.data'
const { yearMap, postMap } = data
import { useRouter } from 'vitepress'

const router = useRouter()

const timelineData = computed(() => {
  const years = Object.keys(yearMap)
    .filter(year => year !== 'Inval') // 过滤掉无效日期
    .sort((a, b) => b.localeCompare(a)) // 按年份降序排序

  return years.map(year => ({
    year,
    articles: yearMap[year].map(url => postMap[url]).filter(article => article.title) // 过滤掉没有标题的文章
  }))
})

const getTagColor = (index) => {
  const colors = ['primary', 'success', 'info', 'warning', 'danger']
  return colors[index % colors.length]
}
</script>

<template>
  <div class="archive-container">
    <el-timeline class="archive-timeline">
      <el-timeline-item v-for="(yearData, yearIndex) in timelineData" :key="yearData.year" :timestamp="yearData.year"
        placement="top" size="large" type="primary">
        <div class="year-content">
          <div class="article-grid">
            <div v-for="(article, articleIndex) in yearData.articles" :key="articleIndex" class="article-card">
              <div class="article-header">
                <a :href="article.url" class="article-title" :title="article.title">
                  {{ article.title }}
                </a>
                <span class="article-date">{{ article.date.string }}</span>
              </div>
              <div class="article-tags" v-if="article.tags && article.tags.length">
                <el-tag v-for="(tag, tagIndex) in article.tags" :key="tagIndex" :type="getTagColor(tagIndex)"
                  style="cursor: pointer;" @click="() => router.go(`/?tag=${tag}`)">
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
.archive-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  .archive-timeline {
    padding-left: 0;
    list-style-type: none;

    :deep(.el-timeline-item__timestamp) {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--vp-c-brand-1);
      margin-bottom: 1rem;
    }
  }

  .year-content {
    margin-top: 1rem;
  }

  .article-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .article-card {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--vp-c-brand-1);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .article-header {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .article-title {
    display: block;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    text-decoration: none;
    line-height: 1.4;
    margin-bottom: 0.5rem;
    transition: color 0.2s ease;

    &:hover {
      color: var(--vp-c-brand-1);
    }
  }

  .article-date {
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
    font-family: var(--vp-font-family-mono);
  }

  .article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .archive-container {
      padding: 1rem 0.5rem;
    }

    .archive-title {
      font-size: 2rem;
    }

    .article-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .article-header {
      display: block;
    }

    .article-card {
      padding: 1rem;
    }

    .archive-timeline {
      :deep(.el-timeline-item__timestamp) {
        font-size: 1.2rem;
      }
    }
  }

  /* 暗色主题适配 */
  @media (prefers-color-scheme: dark) {
    .article-card {
      &:hover {
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>