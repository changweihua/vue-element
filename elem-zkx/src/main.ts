import Vue from 'vue'
import App from './App.vue'
import router from './router/permission'
import store from './store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import '@/assets/fonts/font.less'

Vue.config.productionTip = false

import animated from 'animate.css'
Vue.use(animated)

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

// Or as a directive
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective)

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

import '@/directives/resizes'
import '@/directives/permissions'
import '@/directives/outsideclick'
import '@/directives/watermark'

import { config } from 'vuex-module-decorators'
// Set rawError to true by default on all @Action decorators
config.rawError = true

// 这个是你刚刚写的index.js的路径
import tableHeight from '@/directives/tableHeight'
// 表格自适应指令
Vue.use(tableHeight)

import('../mock')

// import i18n from '@/assets/locales'
import VueI18n from 'vue-i18n'
import LangENUS from '@/langs/en-us'
import LangZHCN from '@/langs/zh-cn'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-cn',
  messages: {
    'en-us': LangENUS,
    'zh-cn': LangZHCN
  }
})

// i18n

import ElementUI, { Loading, Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/fonts/font.less'

Vue.use(ElementUI)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$messagebox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

import './icons'

// import './components'

import filters from '@/filters/filter'

/* 注册过滤器 */
Object.keys(filters).forEach((key: string) => {
  Vue.filter(key, (filters as any)[key])
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
  const olo: any = originalPush.call(this, location)
  return olo.catch((err: any) => err)
}

// Router.prototype.push = function push(
//   location: any,
//   onResolve: any,
//   onReject: any
// ) {
//   if (onResolve || onReject) {
//     return originalPush.call(this, location, onResolve, onReject)
//   }
//   const olo:any = originalPush.call(this, location)
//   return olo.catch((err: any) => err)
// }

window.axiosCancel = [] // 全局定义一个存放取消请求的标识
window.axiosPending = []

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
