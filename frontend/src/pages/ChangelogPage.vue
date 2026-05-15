<template>
  <div id="changelogPage">
    <h2 class="title">更新日志</h2>
    <div class="desc">持续迭代，功能不断进化</div>

    <a-timeline>
      <a-timeline-item
        v-for="item in changelog"
        :key="item.version"
        :color="item.featured ? 'blue' : 'gray'"
      >
        <a-card class="version-card" :bordered="false">
          <template #title>
            <div class="version-header">
              <h3>v{{ item.version }}</h3>
              <a-tag v-if="item.featured" color="blue">最新</a-tag>
              <a-tag v-if="item.isEnterprise" color="purple">企业版</a-tag>
              <span class="version-date">{{ item.date }}</span>
            </div>
          </template>
          <ul class="changelog-list">
            <li v-for="(change, index) in item.changes" :key="index">
              <a-tag :color="getChangeColor(change.type)">{{ change.type }}</a-tag>
              {{ change.content }}
            </li>
          </ul>
        </a-card>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const changelog = reactive([
  {
    version: '2.1.0',
    date: '2026-05-15',
    featured: true,
    isEnterprise: false,
    changes: [
      { type: '新增', content: 'AI 工作流可视化编排功能' },
      { type: '优化', content: '代码生成速度提升 40%' },
      { type: '修复', content: '修复移动端预览显示异常问题' },
    ],
  },
  {
    version: '2.0.5',
    date: '2026-04-28',
    featured: false,
    isEnterprise: false,
    changes: [
      { type: '新增', content: '支持自定义模板市场' },
      { type: '优化', content: '改进 AI 对话交互体验' },
    ],
  },
  {
    version: '2.0.0',
    date: '2026-03-20',
    featured: false,
    isEnterprise: false,
    changes: [
      { type: '重大', content: '全新 Vite 重构版本发布' },
      { type: '新增', content: '多语言国际化支持' },
      { type: '优化', content: '全新 UI 设计语言' },
    ],
  },
  {
    version: '1.5.0',
    date: '2026-01-15',
    featured: false,
    isEnterprise: true,
    changes: [
      { type: '新增', content: '企业版私有化部署支持' },
      { type: '新增', content: '团队协作与权限管理' },
    ],
  },
])

const getChangeColor = (type: string) => {
  const colorMap: Record<string, string> = {
    '新增': 'green',
    '优化': 'blue',
    '修复': 'orange',
    '重大': 'red',
  }
  return colorMap[type] || 'default'
}
</script>

<style scoped>
#changelogPage {
  max-width: 960px;
  padding: 24px;
  margin: 24px auto;
}

.title {
  text-align: center;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1f;
}

.desc {
  text-align: center;
  color: #bbb;
  margin-bottom: 24px;
  font-size: 14px;
}

.version-card {
  border-radius: 8px;
}

.version-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.version-header h3 {
  margin: 0;
  font-size: 18px;
}

.version-date {
  color: #999;
  font-size: 13px;
  margin-left: auto;
}

.changelog-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.changelog-list li {
  padding: 6px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
