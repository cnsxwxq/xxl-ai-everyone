<template>
  <a-layout-footer class="footer">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-brand">
          <img src="@/assets/xxl-bjwz.png" alt="Logo" class="footer-logo" />
          <p class="footer-slogan">智能应用生成平台</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4 class="footer-heading">产品</h4>
            <ul class="footer-list">
              <li><a href="/">首页</a></li>
              <li><a href="/user/login">登录</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">支持</h4>
            <ul class="footer-list">
              <li><a href="mailto:support@example.com">联系我们</a></li>
              <li><a href="/admin/appManage">管理后台</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-divider"></div>
        <p class="copyright">© 2026 向心链. All rights reserved.</p>
      </div>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 40px 24px 20px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.footer-brand {
  flex: 0 0 auto;
  text-align: center;
}

.footer-logo {
  height: 100px;
  width: 100px;
  margin-bottom: 12px;
  border-radius: 8px;
}

.footer-title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
}

.footer-slogan {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.footer-links {
  display: flex;
  gap: 60px;
}

.footer-column {
  min-width: 120px;
}

.footer-heading {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list li {
  margin-bottom: 10px;
}

.footer-list a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-list a:hover {
  color: #fff;
}

.footer-bottom {
  padding-top: 20px;
}

.footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
}

.copyright {
  margin: 0;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-main {
    flex-direction: column;
    gap: 30px;
  }

  .footer-brand {
    flex: none;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
    gap: 40px;
  }

  .footer-column {
    text-align: center;
  }
}
</style>
