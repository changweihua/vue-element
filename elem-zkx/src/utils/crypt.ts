// tslint:disable
import * as Crypto from 'crypto-js'
import * as lodash from 'lodash'
import { AxiosRequestConfig } from 'axios'

const crypt = (fields: any, params: any) => {
  // 获取到秒级的时间戳,与后端对应
  const timeStamp = new Date()
    .getTime()
    .toString()
    .substr(0, 10)

  const header = {
    'Content-Type': 'application/json',
    appId: 'pmes',
    timeStamp,
    nonce: timeStamp,
    signature: ''
  }

  if (fields && fields.length > 0) {
    let signStr = lodash.toString(header.timeStamp)

    const fieldArr = []

    for (const field in fields) {
      fieldArr.push(fields[field])
    }

    const sArray = fieldArr.sort()

    // url参数签名
    const arr = []

    for (const item of sArray) {
      arr.push(item + '=' + lodash.toString(params[item]))
    }
    signStr = arr.join('&')

    // 签名核心逻辑
    const newsignStr = lodash
      .sortBy(signStr, (s: string) => s.charCodeAt(0))
      .join('')

    const s = Crypto.MD5(newsignStr).toString()

    header.signature = s
  }
  return header
}

/**
 * 接口参数签名
 * @param {*} config 请求配置
 */
export const sign = (config: AxiosRequestConfig) => {
  // 获取到秒级的时间戳,与后端对应
  const timeStamp = new Date()
    .getTime()
    .toString()
    .substr(0, 10)

  const header = {
    appId: 'pmes',
    timeStamp,
    nonce: timeStamp,
    signature: ''
  }

  let signStr = lodash.toString(header.timeStamp)

  const fieldArr = []

  for (const field in config.headers.fields) {
    if (config.headers.fields[field]) {
      fieldArr.push(config.headers.fields[field])
    }
  }

  if (fieldArr.length === 0 && config.params) {
    for (const p in config.params) {
      if (p) {
        fieldArr.push(p)
      }
    }
  }

  const sArray = fieldArr.sort()

  if (config.params) {
    // url参数签名
    const arr = []

    for (const item of sArray) {
      if (item) {
        arr.push(item + '=' + lodash.toString(config.params[item]))
      }
    }
    signStr = arr.join('&')
  } else if (config.data) {
    // request body参数的内容
    const arr = []

    // signStr += JSON.stringify(config.data)
    for (const item of sArray) {
      if (item) {
        arr.push(item + '=' + lodash.toString(config.data[item]))
      }
      // signStr += item + lodash.toString(config.data[item])
    }
    signStr = arr.join('&')
  }

  // 签名核心逻辑
  const newsignStr = lodash
    .sortBy(signStr, (ss: string) => ss.charCodeAt(0))
    .join('')

  const s = Crypto.MD5(newsignStr).toString()

  header.signature = s

  config = Object.assign(config, { headers: header })

  return config
}

export default { sign, crypt }
