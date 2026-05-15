import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import UserProfilePage from '@/pages/user/UserProfilePage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'
import AppManagePage from '@/pages/admin/AppManagePage.vue'
import AppChatPage from '@/pages/app/AppChatPage.vue'
import AppEditPage from '@/pages/app/AppEditPage.vue'
import ChatManagePage from '@/pages/admin/ChatManagePage.vue'
import IndustryInfoPage from '@/pages/IndustryInfoPage.vue'
import ProductOverviewPage from '@/pages/product/ProductOverviewPage.vue'
import ProductFeaturesPage from '@/pages/product/ProductFeaturesPage.vue'
import ProductPricingPage from '@/pages/product/ProductPricingPage.vue'
import EnterprisePage from '@/pages/EnterprisePage.vue'
import PricingPage from '@/pages/PricingPage.vue'
import ChangelogPage from '@/pages/ChangelogPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: HomePage,
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginPage,
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterPage,
    },
    {
      path: '/user/profile',
      name: '个人信息',
      component: UserProfilePage,
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: UserManagePage,
    },
    {
      path: '/admin/appManage',
      name: '应用管理',
      component: AppManagePage,
    },
    {
      path: '/admin/chatManage',
      name: '对话管理',
      component: ChatManagePage,
    },
    {
      path: '/app/chat/:id',
      name: '应用对话',
      component: AppChatPage,
    },
    {
      path: '/app/edit/:id',
      name: '编辑应用',
      component: AppEditPage,
    },
    {
      path: '/industry',
      name: '行业信息',
      component: IndustryInfoPage,
    },
    {
      path: '/product/overview',
      name: '产品概览',
      component: ProductOverviewPage,
    },
    {
      path: '/product/features',
      name: '核心功能',
      component: ProductFeaturesPage,
    },
    {
      path: '/product/pricing',
      name: '定价方案',
      component: ProductPricingPage,
    },
    {
      path: '/enterprise',
      name: '企业版',
      component: EnterprisePage,
    },
    {
      path: '/pricing',
      name: '价格',
      component: PricingPage,
    },
    {
      path: '/changelog',
      name: '更新日志',
      component: ChangelogPage,
    },
  ],
})

export default router
