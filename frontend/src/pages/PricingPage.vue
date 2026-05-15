<template>
  <div id="pricingPage">
    <h2 class="title">价格方案</h2>
    <div class="desc">简单透明的定价，按需选择</div>

    <a-result
      title="价格详情"
      sub-title="请访问定价方案页面查看详细的套餐信息和功能对比"
    >
      <template #icon>
        <DollarOutlined style="font-size: 64px; color: #667eea;" />
      </template>
      <template #extra>
        <a-button type="primary" size="large" @click="goToPricing">
          查看定价方案
        </a-button>
      </template>
    </a-result>

    <a-card class="faq-card" title="常见问题" :bordered="false">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="可以免费试用吗？">
          <p>是的，我们提供 14 天全功能免费试用，无需绑定信用卡。</p>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="如何升级或降级套餐？">
          <p>您可以随时在账户设置中升级或降级套餐，变更将立即生效。</p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="支持哪些支付方式？">
          <p>我们支持支付宝、微信支付、信用卡、银行转账等多种支付方式。</p>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="企业版有哪些定制服务？">
          <p>企业版包括私有化部署、定制开发、技术培训、专属客服等增值服务。</p>
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { DollarOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const activeKey = ref(['1'])

const goToPricing = () => {
  router.push('/product/pricing')
}
</script>

<style scoped>
#pricingPage {
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
  margin-bottom: 32px;
  font-size: 14px;
}

.faq-card {
  margin-top: 32px;
  border-radius: 8px;
}
</style>
