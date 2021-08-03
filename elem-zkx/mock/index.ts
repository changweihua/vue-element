import Mock from 'mockjs'

import api from './api'

// Mock.setup({
//   timeout: '300-600'
// })

Mock.mock('/api/cog/job', 'get', api.getJobList)

export default Mock
