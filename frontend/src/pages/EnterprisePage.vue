<template>
  <div id="enterprisePage">
    <h2 class="title">企业版</h2>
    <div class="desc">专为大型组织设计的完整解决方案</div>

    <a-card class="intro-card" :bordered="false">
      <a-typography-title :level="3">企业级特性</a-typography-title>
      <a-typography-paragraph>
        XxinLink 企业版提供完整的私有化部署方案，支持超大规模团队协作，
        具备高可用架构设计和全面的安全保障体系。
      </a-typography-paragraph>
    </a-card>

    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :md="12" v-for="feature in enterpriseFeatures" :key="feature.title">
        <a-card class="feature-card" :bordered="false">
          <template #avatar>
            <component :is="feature.icon" class="feature-icon" />
          </template>
          <template #title>{{ feature.title }}</template>
          <template #default>{{ feature.description }}</template>
        </a-card>
      </a-col>
    </a-row>

    <a-card class="contact-card" :bordered="false">
      <a-typography-title :level="4">联系我们</a-typography-title>
      <a-typography-paragraph>
        了解企业版更多详情，获取定制化解决方案和报价方案。
      </a-typography-paragraph>
      <a-space direction="vertical" style="width: 100%">
        <a-button type="primary" size="large" block>
          <template #icon><PhoneOutlined /></template>
          400-850-0030
        </a-button>
        <a-button size="large" block>
          <template #icon><MailOutlined /></template>
          enterprise@xxinlink.com
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import {
  CloudServerOutlined,
  LockOutlined,
  TeamOutlined,
  ToolOutlined,
  LineChartOutlined,
  SafetyOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons-vue'

const enterpriseFeatures = reactive([
  {
    icon: CloudServerOutlined,
    title: '私有化部署',
    description: '支持在企业自有服务器或私有云上部署，数据完全自主掌控。',
  },
  {
    icon: LockOutlined,
    title: '数据安全',
    description: '端到端加密、细粒度权限控制、全面的审计日志。',
  },
  {
    icon: TeamOutlined,
    title: '超大规模团队',
    description: '支持万人级别的团队协作，跨部门项目共享和管理。',
  },
  {
    icon: ToolOutlined,
    title: 'DevOps 集成',
    description: '与 GitLab、Jenkins 等主流 DevOps 工具无缝集成。',
  },
  {
    icon: LineChartOutlined,
    title: '使用分析',
    description: '详细的使用统计、效能分析和可视化报表。',
  },
  {
    icon: SafetyOutlined,
    title: '合规认证',
    description: '通过 SOC2、ISO27001 等安全合规认证。',
  },
])
</script>

<style scoped>
#enterprisePage {
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
  height: 100%;
}

.feature-icon {
  font-size: 24px;
  color: #667eea;
}

.contact-card {
  margin-top: 24px;
  border-radius: 8px;
  text-align: center;
}
</style>
