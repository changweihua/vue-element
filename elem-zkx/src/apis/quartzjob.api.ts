import request from '@/utils/request'
import {
  ApiListResult,
  ApiObjectResult,
  ApiPagerResult
} from '@/models/api.result'
import {
  QuartzJobClassListModel,
  QuartzJobListModel,
  QuartzJobModel
} from '@/models/quartzjob.model'

export const getPagedQuartzJobList = (
  pageIndex: number,
  pagerSize: number,
  params?: any
) => {
  return new Promise<ApiPagerResult<QuartzJobListModel>>((resolve, reject) => {
    request({
      // url: `/apsis/quartzjob/columnpager/${pageIndex}/${pagerSize}`,
      url: '/api/cog/job',
      method: 'GET',
      params
    })
      .then((res) => {
        console.log('res')
        resolve(res['data'])
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getAllQuartzJobList = () => {
  return new Promise<ApiPagerResult<QuartzJobListModel>>((resolve, reject) => {
    request({
      url: `/apsis/quartzjob/all`,
      method: 'GET',
      params: {}
    })
      .then((res) => {
        resolve(res['data'])
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const createQuartzJob = (data: any) => {
  return new Promise<ApiObjectResult<QuartzJobModel>>((resolve, reject) => {
    request({
      url: `/apsis/quartzjob`,
      method: 'POST',
      data: data
    })
      .then((res) => {
        resolve(res['data'])
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const deleteQuartzJob = (data: any) => {
  return new Promise<ApiObjectResult<QuartzJobListModel>>((resolve, reject) => {
    request({
      url: `/apsis/quartzjob`,
      method: 'DELETE',
      params: data
    })
      .then((res) => {
        resolve(res['data'])
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getQuartzJobClass = (params: any) => {
  return new Promise<ApiListResult<QuartzJobClassListModel>>(
    (resolve, reject) => {
      request({
        url: `/apsis/quartzjob/QuartzJobClass`,
        method: 'GET',
        params
      })
        .then((res) => {
          resolve(res['data'])
        })
        .catch((err) => {
          reject(err)
        })
    }
  )
}
