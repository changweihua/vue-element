import request from '@/utils/request'
import {
  AccountBehaviorPermissionModel,
  AccountProfileModel,
  JwtAuthResultModel
} from '@/models/account.model'
import { ApiObjectResult } from '@/models/api.result'

export const auth = (data: any) => {
  return new Promise<JwtAuthResultModel>((resolve, reject) => {
    request({
      url: `/api/auth/jwtauth`,
      method: 'POST',
      data,
      headers: { fields: ['username', 'password'] }
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getPermissionList = () => {
  return new Promise<ApiObjectResult<AccountBehaviorPermissionModel>>(
    (resolve, reject) => {
      request({
        url: `/api/account/permission`,
        method: 'GET'
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  )
}

export const getAccountProfile = () => {
  return new Promise<ApiObjectResult<AccountProfileModel>>(
    (resolve, reject) => {
      request({
        url: `/api/account/profile`,
        method: 'GET'
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  )
}

export const getCaptchaCode = () => {
  return new Promise<any>((resolve, reject) => {
    request({
      url: `/api/auth/captcha`,
      method: 'GET',
      responseType: 'arraybuffer'
    })
      .then((res) => {
        return (
          'data:image/png;base64,' +
          btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )
        )
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const refresh = (data: any) => {
  return new Promise<JwtAuthResultModel>((resolve, reject) => {
    request({
      url: `/api/auth/jwtauth`,
      method: 'POST',
      data
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
