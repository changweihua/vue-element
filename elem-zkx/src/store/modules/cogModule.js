import { getPagedQuartzJobList } from '@/apis/quartzjob.api'

const cogModule = {
  state: {
    configurationList: [],
    pager: {}
  },
  mutations: {
    setList(state, rows) {
      state.jobList = rows.slice()
    },
    setPager(state, pager) {
      state.jobPager = Object.assign({}, state.jobPager, pager)
    }
  },
  actions: {
    fetchList({ commit }, query) {
      console.log('fetchList')
      getPagedQuartzJobList(
        Object.assign(
          {
            pagerSize: 20,
            pagerIndex: 1
          },
          query
        )
      )
        .then((res) => {
          console.log('res')
          const data = res.data
          commit('setList', data.items)
          commit('setPager', { total: data.totalCount })
        })
        .catch((err) => {
          console.log('err')
          console.log(err)
        })
    }
  }
}

export { cogModule }
