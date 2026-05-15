<template>
  <div id="productOverviewPage">
    <h2 class="title">产品概览</h2>
    <div class="desc">了解 XxinLink 智能应用生成平台</div>

    <a-card class="intro-card" :bordered="false">
      <a-typography-title :level="3">平台简介</a-typography-title>
      <a-typography-paragraph>
        XxinLink 是一款基于 AI 技术的零代码应用生成平台。用户只需描述需求，AI 即可自动分析、
        生成并部署完整的应用程序。大幅降低开发门槛，让创意快速变为现实。
      </a-typography-paragraph>
    </a-card>

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :md="8">
        <a-card class="feature-card" hoverable>
          <template #cover>
            <div class="feature-icon">
              <RobotOutlined />
            </div>
          </template>
          <a-card-meta title="AI 智能生成" description="输入需求描述，AI 自动分析并生成完整代码" />
        </a-card>
      </a-col>
      <a-col :xs="24" :md="8">
        <a-card class="feature-card" hoverable>
          <template #cover>
            <div class="feature-icon">
              <ThunderboltOutlined />
            </div>
          </template>
          <a-card-meta title="极速部署" description="一键部署到云端，获得可访问的应用地址" />
        </a-card>
      </a-col>
      <a-col :xs="24" :md="8">
        <a-card class="feature-card" hoverable>
          <template #cover>
            <div class="feature-icon">
              <EditOutlined />
            </div>
          </template>
          <a-card-meta title="可视化编辑" description="实时预览应用效果，随时与 AI 对话修改" />
        </a-card>
      </a-col>
    </a-row>

    <a-card class="tech-card" title="技术架构" :bordered="false">
      <a-descriptions :column="{ xs: 1, sm: 2, md: 3 }">
        <a-descriptions-item label="前端框架">Vue 3 + Vite + TypeScript</a-descriptions-item>
        <a-descriptions-item label="UI 组件库">Ant Design Vue</a-descriptions-item>
        <a-descriptions-item label="后端框架">Spring Boot 3</a-descriptions-item>
        <a-descriptions-item label="AI 框架">LangChain4j + LangGraph4j</a-descriptions-item>
        <a-descriptions-item label="数据库">MySQL 8 + Redis</a-descriptions-item>
        <a-descriptions-item label="部署方式">Docker</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {
  RobotOutlined,
  ThunderboltOutlined,
  EditOutlined,
} from '@ant-design/icons-vue'
</script>

<style scoped>
#productOverviewPage {
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

.intro-card {
  margin-bottom: 24px;
  border-radius: 8px;
}

.feature-card {
  border-radius: 8px;
  text-align: center;
}

.feature-icon {
  font-size: 48px;
  padding: 32px;
  color: #667eea;
  background: linear-gradient(135deg, #667eea22, #764ba222);
}

.tech-card {
  margin-top: 24px;
  border-radius: 8px;
}
</style>
