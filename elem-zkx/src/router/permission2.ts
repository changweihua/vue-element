import VueRouter, { Route } from 'vue-router'
import { PermissionModule } from '@/store/modules/permission'
import { constantRoutes } from '@/router/constantRouter'
import moment from 'moment'
import { AccountModule } from '@/store/modules/account'
import { RouterNextFunction } from '@/models/ant.model'

const createRouter = () =>
  new VueRouter({
    // mode: 'history',
    base: process.env.VUE_APP_BASE_URL || '/',
    // base: process.env.PUBLISH_PATH,
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()
const whiteList = ['/login']
export const defaultRoutePath = '/cog/job'

router.beforeEach(async (to: Route, _: Route, next: RouterNextFunction) => {
  // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  const cancelArr = window.axiosCancel
  cancelArr.forEach((ele) => {
    ele.cancel('取消了请求') // 在失败函数中返回这里自定义的错误信息
  })
  window.axiosCancel = []
  const now = parseInt(moment().format('X'))

  // 查看 JWTToken 是否为空
  if (AccountModule.accessToken && AccountModule.refreshExpiresAt > now) {
    if (to.path === '/login') {
      next(`${defaultRoutePath}`)
    } else {
      console.log(window.isRouterGenerated)
      if (!window.isRouterGenerated) {
        try {
          PermissionModule.GenerateRoutes()
          const routers = PermissionModule.dynamicRouters
          console.log(routers)
          router.addRoutes(routers)
          window.isRouterGenerated = true

          next({
            ...to,
            replace: true
          })
        } catch (err) {
          PermissionModule.ResetRoutesAsync().finally(() => {
            next({
              name: 'login'
            })
          })
        }
      } else {
        if (to.path === '/') {
          // // 跳转至用户第一个菜单
          // const menu = PermissionModule.menu
          // if (menu.findIndex((m) => m.path === '/dashboard') >= 0) {
          //   next('/dashboard')
          // } else {
          //   next(menu[0].children[0].path)
          // }
          next(`${defaultRoutePath}`)
        } else {
          next()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      if (to.path === '/') {
        next(`${defaultRoutePath}`)
      } else {
        next()
      }
    } else {
      next(`/login`)
      // this.$router.push({ name: 'home', params: { userId: wise }})
      // next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach((to: Route) => {
  // set page title
  document.title = `${to.meta.title} - ${process.env.VUE_APP_HTML_TITLE}`
})

// 这里根据单页面name的指向不同，去访问的接口域名也不同
router.beforeResolve((to, from, next) => {
  // Check user
  // if (!Meteor.loggingIn() && !Meteor.userId()) {
  //   next({ path: '/login' })
  // } else {
  //   userIsInRole
  //     .callPromise({ role: to.name })
  //     .then(result => {
  //       if (result) {
  //         next()
  //       } else {
  //         next(false)
  //         alert('no roles')
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err.reason)
  //     })
  // }

  // let url
  // if (
  //   to.matched[0].name == 'broker-shop' ||
  //   to.matched[0].name == 'information'
  // ) {
  //   url = 'https://ddd.zhaoshang800.com'
  // } else if (to.matched[0].name == 'brokerage-list') {
  //   url = 'https://aaa.zhaoshang800.com'
  // } else if (to.matched[0].name == 'sellhot') {
  //   url = 'https://bbb.zhaoshang800.com'
  // } else if (to.matched[0].name == 'enterprise-index') {
  //   url = 'http://ccc.zhaoshang800.com'
  // } else {
  //   url = 'https://' + location.host
  // }
  // Vue.prototype.$http.defaults.baseURL = url
  next()
})

export function resetRouter() {
  const newRouter = createRouter()
  // tslint:disable no-empty-interface
  // @ts-expect-error
  router && (router.matcher = newRouter.matcher)

  // eslint-disable-next-line @typescript-eslint/camelcase
  // router.matcher = newRouter.matcher // the relevant part
}

export default router
