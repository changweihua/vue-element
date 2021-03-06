import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

import { cogModule } from '@/store/modules/cogModule'
import { appModule } from '@/store/modules/appModule'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence<any>({
  storage: window.localStorage
})

export default new Vuex.Store<any>({
  plugins: [vuexLocal.plugin],
  modules: {
    cog: cogModule,
    app: appModule
  }
})
