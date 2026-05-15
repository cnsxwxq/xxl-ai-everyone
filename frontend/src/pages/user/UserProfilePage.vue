<template>
  <div id="userProfilePage">
    <h2 class="title">个人信息</h2>
    <div class="desc">管理您的账户信息</div>

    <a-spin :spinning="loading">
      <a-card class="profile-card" :bordered="false">
        <!-- 头像区域 -->
        <div class="avatar-section">
          <a-avatar :size="100" :src="formState.userAvatar" />
          <a-button class="avatar-upload" type="link" disabled>
            更换头像
          </a-button>
        </div>

        <a-divider />

        <!-- 基本信息 -->
        <a-form
          :model="formState"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 16 }"
          name="profile"
          @finish="handleSubmit"
        >
          <a-form-item label="用户账号">
            <a-input v-model:value="formState.userAccount" disabled />
          </a-form-item>

          <a-form-item
            label="用户昵称"
            name="userName"
            :rules="[{ required: true, message: '请输入昵称' }]"
          >
            <a-input
              v-model:value="formState.userName"
              placeholder="请输入昵称"
              :maxlength="30"
              show-count
            />
          </a-form-item>

          <a-form-item label="个人简介" name="userProfile">
            <a-textarea
              v-model:value="formState.userProfile"
              placeholder="写一段简介介绍自己"
              :rows="4"
              :maxlength="200"
              show-count
            />
          </a-form-item>

          <a-form-item label="用户角色">
            <a-tag :color="formState.userRole === 'admin' ? 'purple' : 'blue'">
              {{ formState.userRole === 'admin' ? '管理员' : '普通用户' }}
            </a-tag>
          </a-form-item>

          <a-form-item label="注册时间">
            <span class="info-text">{{ formatTime(formState.createTime) }}</span>
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 16, offset: 4 }">
            <a-space>
              <a-button type="primary" html-type="submit" :loading="submitting">
                保存修改
              </a-button>
              <a-button @click="resetForm">重置</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useLoginUserStore } from '@/stores/loginUser.ts'
import { updateUser, getLoginUser } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const loginUserStore = useLoginUserStore()
const loading = ref(false)
const submitting = ref(false)

const formState = reactive({
  userAccount: '',
  userName: '',
  userAvatar: '',
  userProfile: '',
  userRole: '',
  createTime: '',
})

const originalFormState = reactive({ ...formState })

const loadUserInfo = async () => {
  loading.value = true
  try {
    await loginUserStore.fetchLoginUser()
    const user = loginUserStore.loginUser
    formState.userAccount = user.userAccount ?? ''
    formState.userName = user.userName ?? ''
    formState.userAvatar = user.userAvatar ?? ''
    formState.userProfile = user.userProfile ?? ''
    formState.userRole = user.userRole ?? ''
    formState.createTime = user.createTime ?? ''
    Object.assign(originalFormState, { ...formState })
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    const res = await updateUser({
      id: loginUserStore.loginUser.id,
      userName: formState.userName,
      userProfile: formState.userProfile,
    })
    if (res.data.code === 0) {
      message.success('个人信息更新成功')
      await loginUserStore.fetchLoginUser()
      Object.assign(originalFormState, { ...formState })
    } else {
      message.error('更新失败，' + res.data.message)
    }
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  Object.assign(formState, { ...originalFormState })
}

const formatTime = (time?: string) => {
  if (!time) return '-'
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped>
#userProfilePage {
  max-width: 720px;
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

.profile-card {
  background: #fff;
  border-radius: 8px;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
}

.avatar-upload {
  font-size: 13px;
  color: #999;
}

.info-text {
  color: #666;
  font-size: 14px;
}
</style>
