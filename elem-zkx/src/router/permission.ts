import VueRouter, { Route } from 'vue-router'
import { constantRoutes } from '@/router/constantRouter'
import { asyncRoutes } from './asyncRouter'
import { RouterNextFunction } from '@/models/ant.model'

const createRouter = () =>
  new VueRouter({
    // mode: 'history',
    base: process.env.VUE_APP_BASE_URL || '/',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: constantRoutes.concat(asyncRoutes)
  })

const router = createRouter()

export const defaultRoutePath = '/cog/job'

router.beforeEach(async (to: Route, _: Route, next: RouterNextFunction) => {
  // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  const cancelArr = window.axiosCancel
  cancelArr.forEach((ele) => {
    ele.cancel('取消了请求') // 在失败函数中返回这里自定义的错误信息
  })
  window.axiosCancel = []
  next()
})

router.afterEach((to: Route) => {
  // set page title
  document.title = `${to.meta.title} - ${process.env.VUE_APP_HTML_TITLE}`
})

// 这里根据单页面name的指向不同，去访问的接口域名也不同
router.beforeResolve((to, from, next) => {
  next()
})

export default router
