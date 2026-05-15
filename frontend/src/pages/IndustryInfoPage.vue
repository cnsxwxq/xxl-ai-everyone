<template>
  <div id="industryInfoPage">
    <h2 class="title">行业信息</h2>
    <div class="desc">AI 行业动态与趋势洞察</div>

    <!-- 数据概览卡片 -->
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card" :bordered="false">
          <a-statistic
            title="AI 应用生成总数"
            :value="stats.totalApps"
            suffix="个"
          >
            <template #prefix>
              <AppstoreOutlined class="stat-icon blue" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card" :bordered="false">
          <a-statistic
            title="活跃用户"
            :value="stats.activeUsers"
            suffix="人"
          >
            <template #prefix>
              <UserOutlined class="stat-icon green" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card" :bordered="false">
          <a-statistic
            title="本月部署"
            :value="stats.monthlyDeploys"
            suffix="次"
          >
            <template #prefix>
              <CloudUploadOutlined class="stat-icon purple" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card" :bordered="false">
          <a-statistic
            title="代码行数生成"
            :value="stats.totalCodeLines"
            suffix="万行"
          >
            <template #prefix>
              <CodeOutlined class="stat-icon orange" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <!-- AI 行业趋势 -->
    <a-card class="section-card" title="AI 行业趋势" :bordered="false">
      <a-timeline>
        <a-timeline-item color="#667eea">
          <strong>2025 年 AI 编程工具市场爆发</strong>
          <p class="timeline-desc">
            全球 AI 编程助手用户突破 5000 万，企业级 AI 应用生成成为新风口。
          </p>
        </a-timeline-item>
        <a-timeline-item color="#52c41a">
          <strong>多模态 AI 模型成熟</strong>
          <p class="timeline-desc">
            文本生成代码、图像生成、视频生成等多模态能力融合，AI 应用场景持续扩展。
          </p>
        </a-timeline-item>
        <a-timeline-item color="#fa8c16">
          <strong>低代码 + AI 深度融合</strong>
          <p class="timeline-desc">
            自然语言驱动应用生成成为主流，从需求描述到完整应用一键交付。
          </p>
        </a-timeline-item>
        <a-timeline-item color="#eb2f96">
          <strong>AI Agent 工作流标准化</strong>
          <p class="timeline-desc">
            智能体编排、工具调用、多步骤推理等 AI 工作流技术成为企业标配。
          </p>
        </a-timeline-item>
      </a-timeline>
    </a-card>

    <!-- 热门技术栈 -->
    <a-card class="section-card" title="热门 AI 技术栈" :bordered="false">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :sm="12" v-for="item in techStacks" :key="item.name">
          <a-card class="tech-card" hoverable>
            <div class="tech-header">
              <span class="tech-name">{{ item.name }}</span>
              <a-tag :color="item.tagColor">{{ item.level }}</a-tag>
            </div>
            <p class="tech-desc">{{ item.desc }}</p>
            <a-progress
              :percent="item.usage"
              :stroke-color="item.progressColor"
              :format="() => `采用率 ${item.usage}%`"
            />
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import {
  AppstoreOutlined,
  UserOutlined,
  CloudUploadOutlined,
  CodeOutlined,
} from '@ant-design/icons-vue'

const stats = reactive({
  totalApps: 12856,
  activeUsers: 3420,
  monthlyDeploys: 892,
  totalCodeLines: 3840,
})

const techStacks = reactive([
  {
    name: 'LangChain4j',
    desc: 'Java 生态 AI 开发框架，提供完整的 LLM 集成与工具调用能力',
    level: '热门',
    tagColor: 'red',
    usage: 78,
    progressColor: '#667eea',
  },
  {
    name: 'Spring AI',
    desc: 'Spring 官方 AI 开发套件，原生集成 Spring Boot 生态',
    level: '推荐',
    tagColor: 'blue',
    usage: 65,
    progressColor: '#52c41a',
  },
  {
    name: 'DeepSeek',
    desc: '国产高性能大语言模型，性价比极佳，支持复杂推理任务',
    level: '火热',
    tagColor: 'orange',
    usage: 92,
    progressColor: '#fa8c16',
  },
  {
    name: 'Vue 3 + Vite',
    desc: '现代前端开发组合，构建响应式 AI 应用交互界面',
    level: '稳定',
    tagColor: 'green',
    usage: 85,
    progressColor: '#eb2f96',
  },
])
</script>

<style scoped>
#industryInfoPage {
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

.stat-card {
  background: #fff;
  border-radius: 8px;
  text-align: center;
}

.stat-icon {
  font-size: 24px;
}

.stat-icon.blue {
  color: #667eea;
}

.stat-icon.green {
  color: #52c41a;
}

.stat-icon.purple {
  color: #722ed1;
}

.stat-icon.orange {
  color: #fa8c16;
}

.section-card {
  background: #fff;
  border-radius: 8px;
  margin-top: 16px;
}

.timeline-desc {
  color: #666;
  margin: 4px 0 0;
  font-size: 13px;
  line-height: 1.6;
}

.tech-card {
  border-radius: 8px;
}

.tech-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.tech-name {
  font-size: 15px;
  font-weight: 600;
  color: #1d1d1f;
}

.tech-desc {
  color: #666;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 12px;
}
</style>
