import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import store from './store'
// ==> 白名单
const whiteList = ['/login', '/404']
// 前置守卫
router.beforeEach(async(to, from, next) => {
  // 转化路由前打开进度条
  nProgress.start()
  // 获取到token
  const token = store.getters.token
  // 访问权限拦截
  if (token) {
    if (to.path === '/login') {
      next('/')
      nProgress.done()
    } else {
      if (!store.getters.userId) await store.dispatch('user/getUserInfo')
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nProgress.done()
    }
  }
})
// 后置守卫  关闭进度条
router.afterEach(() => nProgress.done())
