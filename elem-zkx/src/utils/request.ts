import axios from 'axios'
import { sign } from '@/utils/crypt'
import { Message } from 'element-ui'

const platform = process.env.VUE_APP_PLATFORM
const instance = axios.create({
  baseURL: '/',
  timeout: 3 * 60 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    platform
  }
})

const ignoreList = ['/refresh', '/login', '/code']

window.axiosCancel = [] // 全局定义一个存放取消请求的标识

instance.interceptors.request.use(
  (config) => {
    // 如果接口需要签名, 则通过请求时,headers中传递sign参数true
    if (config.headers.fields) {
      config = sign(config) // 核心签名逻辑，独立封装了处理函数
    }
    config.headers['Content-Type'] = 'application/json'
    config.cancelToken = new axios.CancelToken((cancel) => {
      window.axiosCancel.push({
        cancel
      })
    })

    if (ignoreList.find((url) => config.url && config.url.indexOf(url) >= 0)) {
      return Promise.resolve(config)
    }

    return Promise.resolve(config)
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    if (error.response) {
      // 对响应错误做点什么
      const config = error.response.config
      const result = error.response.data
      if (error.message.includes('timeout')) {
        // 判断请求异常信息中是否含有超时timeout字符串
        Message.error('当前请求已超时！') // `${error.message}`)
        return Promise.reject({
          handled: true,
          isSucceed: false,
          connectionId: '',
          proxyInfo: '',
          message: '当前请求已超时！'
        }) // reject这个错误信息
      } else if (error.message.includes('500')) {
        Message.error(`${error.response.data}`)
        return Promise.reject({
          message: `${error.response.data}`
        }) // reject这个错误信息
      } else if (error.response && error.response.status === '400') {
        Message.error(`${config.url}\r\n${result.message}`)
        return Promise.reject({
          url: `${config.url}`,
          message: `${result.message}`
        }) // reject这个错误信息
      }
    } else {
      // 处理断网的情况 请求超时或断网时 更新state的network状态
    }
    return Promise.reject(error)
  }
)

export default instance
