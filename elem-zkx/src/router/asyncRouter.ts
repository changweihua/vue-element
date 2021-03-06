import { RouteConfig } from 'vue-router'
import HyperAdminLayout from '@/layouts/HyperAdminLayout.vue'
import Holder from '@/layouts/Holder.vue'

export const asyncRoutes: Array<RouteConfig> = [
  {
    path: '/cog',
    name: 'cog',
    component: HyperAdminLayout,
    redirect: 'job',
    meta: {
      title: '系统设置',
      icon: 'cog-solid',
      svg: true,
      hidden: false,
      code: '0'
    },
    children: [
      {
        path: 'job',
        name: 'job',
        meta: {
          title: '任务设置',
          icon: 'dashboard',
          svg: true,
          hidden: false,
          code: '0'
        },
        component: () =>
          import(/* webpackChunkName: "Job" */ '../views/cog/job/Job.vue')
      }
    ]
  },
  {
    path: '/cog2',
    name: 'cog2',
    component: HyperAdminLayout,
    redirect: 'job2',
    meta: {
      title: '系统设置2',
      icon: 'cog-solid',
      svg: true,
      hidden: false,
      code: '0'
    },
    children: [
      {
        path: 'job2',
        name: 'job2',
        meta: {
          title: '任务设置2',
          icon: 'dashboard',
          svg: true,
          hidden: false,
          code: '0'
        },
        component: Holder,
        children: [
          {
            path: 'job21',
            name: 'job21',
            meta: {
              title: '任务设置2-1',
              icon: 'dashboard',
              svg: true,
              hidden: false,
              code: '0'
            },
            component: () =>
              import(/* webpackChunkName: "Job" */ '../views/cog/job/Job2.vue')
          },
          {
            path: 'job22',
            name: 'job22',
            meta: {
              title: '任务设置2-2',
              icon: 'dashboard',
              svg: true,
              hidden: false,
              code: '0'
            },
            component: () =>
              import(/* webpackChunkName: "Job" */ '../views/cog/job/Job.vue')
          }
        ]
      }
    ]
  }
]
