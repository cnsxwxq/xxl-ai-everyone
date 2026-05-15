<template>
  <div id="productPricingPage">
    <h2 class="title">定价方案</h2>
    <div class="desc">灵活的选择，满足不同规模的需求</div>

    <a-row :gutter="[24, 24]" justify="center">
      <a-col :xs="24" :md="8" v-for="plan in plans" :key="plan.name">
        <a-card
          class="pricing-card"
          :class="{ 'pricing-card-featured': plan.featured }"
          hoverable
        >
          <div v-if="plan.featured" class="featured-badge">推荐</div>
          <div class="plan-header">
            <h3>{{ plan.name }}</h3>
            <div class="plan-price">
              <span class="currency">¥</span>
              <span class="amount">{{ plan.price }}</span>
              <span class="period">/{{ plan.period }}</span>
            </div>
          </div>
          <a-divider />
          <ul class="plan-features">
            <li v-for="feature in plan.features" :key="feature">
              <CheckCircleOutlined class="check-icon" />
              {{ feature }}
            </li>
          </ul>
          <a-button
            type="primary"
            :block="true"
            size="large"
            :ghost="!plan.featured"
          >
            {{ plan.buttonText }}
          </a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { CheckCircleOutlined } from '@ant-design/icons-vue'

const plans = reactive([
  {
    name: '免费版',
    price: '0',
    period: '月',
    featured: false,
    buttonText: '立即开始',
    features: [
      '每天 10 次代码生成',
      '基础应用预览',
      '社区支持',
      '基础模板库',
    ],
  },
  {
    name: '专业版',
    price: '99',
    period: '月',
    featured: true,
    buttonText: '立即升级',
    features: [
      '无限次数代码生成',
      '一键云端部署',
      '优先技术支持',
      '高级模板库',
      '实时协作编辑',
      'API 调用权限',
    ],
  },
  {
    name: '企业版',
    price: '499',
    period: '月',
    featured: false,
    buttonText: '联系我们',
    features: [
      '私有化部署',
      '专属技术支持',
      '自定义模板',
      '团队协作管理',
      '数据安全加密',
      '定制化开发',
    ],
  },
])
</script>

<style scoped>
#productPricingPage {
  max-width: 1200px;
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
  margin-bottom: 32px;
  font-size: 14px;
}

.pricing-card {
  border-radius: 12px;
  text-align: center;
  position: relative;
  height: 100%;
}

.pricing-card-featured {
  border: 2px solid #667eea;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.featured-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  padding: 4px 16px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.plan-header h3 {
  margin: 0 0 16px;
  font-size: 20px;
}

.plan-price {
  color: #667eea;
}

.currency {
  font-size: 20px;
  vertical-align: top;
}

.amount {
  font-size: 48px;
  font-weight: 700;
}

.period {
  font-size: 14px;
  color: #999;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 24px 0;
  text-align: left;
}

.plan-features li {
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.check-icon {
  color: #52c41a;
}
</style>
