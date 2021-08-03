import { RouteConfig } from 'vue-router'

export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '系统登录',
      icon: 'pic-center',
      hidden: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/account/Login.vue')
  },
  {
    path: '/',
    redirect: '/cog/job',
    meta: {
      title: '系统登录',
      icon: 'pic-center',
      hidden: true
    }
  },
  {
    path: '*',
    meta: {
      title: 'Not Found',
      icon: 'pic-center',
      hidden: true
    },
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/error/404.vue')
  }
]
