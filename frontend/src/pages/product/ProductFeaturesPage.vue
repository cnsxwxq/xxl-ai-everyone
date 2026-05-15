<template>
  <div id="productFeaturesPage">
    <h2 class="title">核心功能</h2>
    <div class="desc">强大的 AI 应用生成能力</div>

    <a-list :grid="{ gutter: 16, xs: 1, sm: 1, md: 2 }" :data-source="features" :loading="loading">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card hoverable class="feature-item">
            <div class="feature-header">
              <component :is="item.icon" class="feature-icon" />
              <h3>{{ item.title }}</h3>
            </div>
            <p class="feature-desc">{{ item.description }}</p>
            <a-tag :color="item.tagColor">{{ item.level }}</a-tag>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import {
  CodeOutlined,
  CloudOutlined,
  EyeOutlined,
  TeamOutlined,
  SafetyOutlined,
  BulbOutlined,
} from '@ant-design/icons-vue'

const loading = reactive(false)

const features = reactive([
  {
    icon: CodeOutlined,
    title: '智能代码生成',
    description: '基于 AI 大模型，根据自然语言需求描述，自动生成完整的前后端代码，支持多种技术栈。',
    level: '核心',
    tagColor: 'blue',
  },
  {
    icon: CloudOutlined,
    title: '一键云端部署',
    description: '生成的应用程序可一键部署到云端，自动配置域名和 HTTPS，获得公网可访问地址。',
    level: '核心',
    tagColor: 'green',
  },
  {
    icon: EyeOutlined,
    title: '实时预览编辑',
    description: '应用生成后实时预览效果，支持可视化编辑页面元素，随时与 AI 对话调整细节。',
    level: '核心',
    tagColor: 'purple',
  },
  {
    icon: TeamOutlined,
    title: '多用户协作',
    description: '支持团队协作，共享应用开发成果，实时同步修改历史和对话记录。',
    level: '企业',
    tagColor: 'orange',
  },
  {
    icon: SafetyOutlined,
    title: '企业级安全',
    description: '完善的用户权限管理、数据加密传输、审计日志等企业级安全功能。',
    level: '企业',
    tagColor: 'red',
  },
  {
    icon: BulbOutlined,
    title: 'AI 工作流编排',
    description: '基于 LangGraph4j 的 AI 工作流引擎，支持复杂业务场景的智能编排和自动化执行。',
    level: '高级',
    tagColor: 'cyan',
  },
])
</script>

<style scoped>
#productFeaturesPage {
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

.feature-item {
  border-radius: 8px;
  height: 100%;
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.feature-icon {
  font-size: 32px;
  color: #667eea;
}

.feature-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.feature-desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}
</style>
