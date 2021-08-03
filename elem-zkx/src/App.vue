<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <router-view @lang_changed="changeLocale" />
  </transition>
</template>

<script>
import zhCN from 'element-ui/lib/locale/lang/zh-CN'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const EN = 'en-us'
const ZH = 'zh-cn'
// 引入marked
// const marked = require('marked')

export default {
  name: 'app',
  data() {
    return {
      locale: zhCN,
      localeval: 'zh-cn',
      localtheme: process.env.VUE_APP_PRIMARY_COLOR,
      isRouterAlive: true
    }
  },
  provide() {
    // 子组件用到的inject
    return {
      Mreload: this.Mreload
    }
  },
  mounted() {
    this.changeLocale(localStorage.getItem('locale') || this.getDefaultLang())
  },
  methods: {
    moment,
    Mreload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    getDefaultLang() {
      let lang = navigator.language || navigator.userLanguage
      lang = lang.substr(0, 2)
      return lang
    },
    changeLocale(localeval) {
      this.localeval = localeval
      localStorage.setItem('locale', localeval)
      if (localeval === EN) {
        moment.locale(EN)
        this.$i18n.locale = EN
        this.locale = null
      } else {
        moment.locale(ZH)
        this.$i18n.locale = ZH
        this.locale = zhCN
      }
    }
  }
}
</script>

<style lang="less">
@deep: ~'>>>';
html,
body {
  margin: 0;
  padding: 0;
  background: #f0f2f5;
}

* {
  font-family: PingFangSC;
}

#app {
  font-family: 'PingFangSC', Avenir, Helvetica, Arial, sans-serif !important;
  display: flex;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  font-weight: 500;
  font-size-adjust: 0.5;
}

#app @{deep} * {
  font-family: 'PingFangSC', Avenir, Helvetica, Arial, sans-serif !important;
  // font-size: 14px;
  font-weight: 500;
  font-size-adjust: 0.5;
}

#app /deep/ * {
  font-family: 'PingFangSC', Avenir, Helvetica, Arial, sans-serif !important;
  // font-size: 14px;
  font-weight: 500;
  font-size-adjust: 0.5;
}

#app ::v-deep * {
  font-family: 'PingFangSC', Avenir, Helvetica, Arial, sans-serif !important;
  // font-size: 14px;
  font-weight: 500;
  font-size-adjust: 0.5;
}
</style>
