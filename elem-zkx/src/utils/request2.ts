import axios, { AxiosRequestConfig } from 'axios'
import moment from 'moment'
import { sign } from '@/utils/crypt'
import router from '@/router/permission'
import { AccountModule } from '@/store/modules/account'
import { AnyFunction } from '@/models/ant.model'
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

const refreshTokenRequest = () => {
  // instance是当前request.ts中已创建的axios实例
  instance.defaults.headers.token = AccountModule.refreshToken
  return instance.post('/apsis/auth/jwtauth', {
    // eslint-disable-next-line @typescript-eslint/camelcase
    refresh_token: AccountModule.refreshToken,
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_id: 'client_id',
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_secret: 'client_secret',
    // eslint-disable-next-line @typescript-eslint/camelcase
    grant_type: 'refresh_token'
  })
}

const toLogin = () => {
  // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  const cancelArr = window.axiosCancel
  cancelArr.forEach((ele) => {
    ele.cancel('取消了请求') // 在失败函数中返回这里自定义的错误信息
  })
  window.axiosCancel = []
  // 清token
  AccountModule.LogoutAsync().then(() => {
    router.replace('/login')
    window.location.reload()
  })
  // 执行
}

const ignoreList = ['/refresh', '/auth', '/login', '/code']
const ignorePrefixs = ['/airwuxi']

window.axiosCancel = [] // 全局定义一个存放取消请求的标识
// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests: AnyFunction[] = []

instance.interceptors.request.use(
  (config) => {
    config.cancelToken = new axios.CancelToken((cancel) => {
      window.axiosCancel.push({
        cancel
      })
    })
    if (!navigator.onLine) {
      // 断网提示
      window.axiosCancel[window.axiosCancel.length - 1].cancel('网络故障')
    }

    // 如果接口需要签名, 则通过请求时,headers中传递sign参数true
    if (config.headers.fields) {
      config = sign(config) // 核心签名逻辑，独立封装了处理函数
    }
    config.headers['Content-Type'] = 'application/json'

    if (ignorePrefixs.find((prefix) => (config.url || '').startsWith(prefix))) {
      return Promise.resolve(config)
    }
    if (ignoreList.find((url) => config.url && config.url.indexOf(url) >= 0)) {
      return Promise.resolve(config)
    }

    // 在发送请求之前做些什么
    const now = parseInt(moment().format('X'))

    // && UserModule.expires_at > now
    if (AccountModule.accessToken && AccountModule.expiresAt > now) {
      config.headers.Authorization = `${process.env.VUE_APP_AUTHENTICATION_SCHEMA} ${AccountModule.accessToken}`
    } else {
      // 立即刷新token
      if (!isRefreshing) {
        isRefreshing = true
        refreshTokenRequest()
          .then((res) => {
            console.log(res)
            const accessToken = res.data.accessToken
            const refreshToken = res.data.refreshToken
            const expiresAt = res.data.expiresAt
            const refreshExpiresAt = res.data.refreshExpiresAt
            config.headers.Authorization = `${process.env.VUE_APP_AUTHENTICATION_SCHEMA} ${accessToken}`
            AccountModule.RefreshToken({
              accessToken,
              refreshToken,
              expiresAt,
              refreshExpiresAt
            })
            isRefreshing = false
            return accessToken
          })
          .then((token) => {
            requests.forEach((cb) => cb(token))
            // 执行完成后，清空队列
            requests = []
          })
          .catch((err) => {
            console.log(err)
            toLogin()
          })
          .finally(() => {
            isRefreshing = false
          })
      }
      const retryOriginalRequest = new Promise<AxiosRequestConfig>(
        (resolve) => {
          requests.push((token: string) => {
            // 因为config中的token是旧的，所以刷新token后要将新token传进来
            config.headers.Authorization = `${process.env.VUE_APP_AUTHENTICATION_SCHEMA} ${token}`
            resolve(config)
          })
        }
      )
      return retryOriginalRequest
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
      } else if (error.response && error.response.status === '403') {
        Message.error(`${config.url}\r\n${result.message}`)
        return Promise.reject({
          url: `${config.url}`,
          message: `${result.message}`
        }) // reject这个错误信息
      } else if (error.response && error.response.status === '401') {
        if (!isRefreshing) {
          isRefreshing = true
          return refreshTokenRequest()
            .then((res) => {
              console.log(res)
              const accessToken = res.data.accessToken
              const refreshToken = res.data.refreshToken
              const expiresAt = res.data.expiresAt
              const refreshExpiresAt = res.data.refreshExpiresAt
              config.headers.Authorization = `${process.env.VUE_APP_AUTHENTICATION_SCHEMA} ${accessToken}`
              AccountModule.RefreshToken({
                accessToken,
                refreshToken,
                expiresAt,
                refreshExpiresAt
              })
              // 已经刷新了token，将所有队列中的请求进行重试
              requests.forEach((cb) => cb(accessToken))
              requests = []
              return instance(config)
            })
            .catch((err) => {
              console.log(err)
              toLogin()
            })
            .finally(() => {
              isRefreshing = false
            })
        } else {
          // 正在刷新token，将返回一个未执行resolve的promise
          return new Promise((resolve) => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            requests.push((token: string) => {
              config.headers.Authorization = `${process.env.VUE_APP_AUTHENTICATION_SCHEMA} ${token}`
              resolve(instance(config))
            })
          })
        }
      }
    } else {
      // 处理断网的情况 请求超时或断网时 更新state的network状态
      return Promise.reject({
        message: `网络已断开!`
      }) // reject这个错误信息
    }
    return Promise.reject(error)
  }
)

export default instance
