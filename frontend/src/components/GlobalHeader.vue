<template>
  <a-layout-header class="header">
    <div class="header-container">
      <!-- 左侧：Logo和标题 -->
      <div class="header-left">
        <RouterLink to="/">
          <div class="header-brand">
            <img src="@/assets/logo.png" alt="Logo" class="brand-logo" />
            <span class="brand-name">XxinLink</span>
          </div>
        </RouterLink>
      </div>

      <!-- 中间：导航菜单 -->
      <div class="header-nav">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="horizontal"
          :items="menuItems"
          @click="handleMenuClick"
        />
      </div>

      <!-- 右侧：用户操作区域 -->
      <div class="header-right">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown>
              <a-space>
                <a-avatar :src="loginUserStore.loginUser.userAvatar" />
                {{ loginUserStore.loginUser.userName ?? '无名' }}
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="goToProfile">
                    <IdcardOutlined />
                    个人信息
                  </a-menu-item>
                  <a-menu-item @click="goToIndustry">
                    <GlobalOutlined />
                    行业信息
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item @click="doLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else class="auth-buttons">
            <a-button type="text" href="/user/login">登录</a-button>
            <a-button type="primary" href="/user/register">注册</a-button>
          </div>
        </div>
      </div>

      <!-- 移动端菜单按钮 -->
      <div class="mobile-menu-button">
        <a-button type="text" @click="toggleMobileMenu">
          <MenuOutlined />
        </a-button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <a-collapse v-model:activeKey="mobileMenuActive">
      <a-collapse-panel key="1" :showArrow="false">
        <template #header>
          <span class="mobile-menu-title">菜单</span>
        </template>
        <a-menu
          mode="vertical"
          :items="menuItems"
          @click="handleMobileMenuClick"
        />
        <div class="mobile-auth-buttons">
          <a-button block href="/user/login">登录</a-button>
          <a-button type="primary" block href="/user/register">注册</a-button>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { type MenuProps, message } from 'ant-design-vue'
import { useLoginUserStore } from '@/stores/loginUser.ts'
import { userLogout } from '@/api/userController.ts'
import {
  LogoutOutlined,
  HomeOutlined,
  MenuOutlined,
  AppstoreOutlined,
  UserOutlined,
  DollarOutlined,
  FileTextOutlined,
  IdcardOutlined,
  GlobalOutlined,
} from '@ant-design/icons-vue'

const loginUserStore = useLoginUserStore()
const router = useRouter()

// 当前选中菜单
const selectedKeys = ref<string[]>(['/'])
const mobileMenuActive = ref<string[]>([])

// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path]
})

// 菜单配置项
const originItems = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '首页',
    title: '首页',
  },
  {
    key: 'product',
    icon: () => h(AppstoreOutlined),
    label: '产品',
    title: '产品',
    children: [
      {
        key: '/product/overview',
        label: '产品概览',
      },
      {
        key: '/product/features',
        label: '核心功能',
      },
      {
        key: '/product/pricing',
        label: '定价方案',
      },
    ],
  },
  {
    key: 'enterprise',
    icon: () => h(UserOutlined),
    label: '企业版',
    title: '企业版',
  },
  {
    key: 'pricing',
    icon: () => h(DollarOutlined),
    label: '价格',
    title: '价格',
  },
  {
    key: 'changelog',
    icon: () => h(FileTextOutlined),
    label: '更新日志',
    title: '更新日志',
  },
]

// 过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((menu) => {
    const menuKey = menu?.key as string
    if (menuKey?.startsWith('/admin')) {
      const loginUser = loginUserStore.loginUser
      if (!loginUser || loginUser.userRole !== 'admin') {
        return false
      }
    }
    return true
  })
}

// 展示在菜单的路由数组
const menuItems = computed<MenuProps['items']>(() => filterMenus(originItems))

// 处理菜单点击
const handleMenuClick: MenuProps['onClick'] = (e) => {
  const key = e.key as string
  selectedKeys.value = [key]
  // 跳转到对应页面
  if (key.startsWith('/')) {
    router.push(key)
  }
}

// 处理移动端菜单点击
const handleMobileMenuClick: MenuProps['onClick'] = (e) => {
  handleMenuClick(e)
  mobileMenuActive.value = []
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  if (mobileMenuActive.value.length > 0) {
    mobileMenuActive.value = []
  } else {
    mobileMenuActive.value = ['1']
  }
}

// 退出登录
const doLogout = async () => {
  const res = await userLogout()
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出登录成功')
    await router.push('/user/login')
  } else {
    message.error('退出登录失败，' + res.data.message)
  }
}

const goToProfile = () => {
  router.push('/user/profile')
}

const goToIndustry = () => {
  router.push('/industry')
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 0 24px;
  height: auto;
  line-height: normal;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  height: 64px;
}

.header-left {
  flex-shrink: 0;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand-logo {
  height: 36px;
  width: auto;
  border-radius: 8px;
}

.brand-name {
  font-size: 22px;
  font-weight: 700;
  color: #667eea;
  letter-spacing: -0.5px;
}

@media (max-width: 768px) {
  .brand-name {
    font-size: 18px;
  }
  
  .brand-logo {
    height: 28px;
  }
}

.header-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.auth-buttons {
  display: flex;
  gap: 12px;
}

.user-login-status {
  display: flex;
  align-items: center;
}

.ant-menu-horizontal {
  border-bottom: none !important;
  line-height: 62px;
}

.ant-menu-horizontal .ant-menu-item {
  font-weight: 500;
}

.ant-menu-horizontal .ant-menu-item:hover {
  color: #667eea;
}

.mobile-menu-button {
  display: none;
}

.mobile-menu-title {
  font-weight: 600;
  font-size: 16px;
}

.mobile-auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .header-nav {
    display: none;
  }

  .header-right {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .header {
    padding: 0 16px;
  }

  .header-container {
    height: 56px;
  }
}

@media (min-width: 993px) {
  .ant-collapse {
    display: none;
  }
}
</style>
