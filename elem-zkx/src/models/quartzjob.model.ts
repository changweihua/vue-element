export interface QuartzJobModel {
  id: string
  jobIdentity: string
  jobName: string
  jobLabel: string
  jobGroup: string
  jobCron: string
  jobDescription: string
  jobClass: string
  jobData: string
  jobStatus: number
}

export const emprtyQuartzJob: QuartzJobModel = {
  id: '',
  jobIdentity: '',
  jobName: '',
  jobLabel: '',
  jobGroup: '',
  jobCron: '',
  jobDescription: '',
  jobClass: '',
  jobData: '',
  jobStatus: 1
}

export interface QuartzJobListModel {
  id: string
  jobIdentity: string
  jobName: string
  jobLabel: string
  jobGroup: string
  jobCron: string
  jobDescription: string
  jobClass: string
  jobData: string
  jobStatus: number
  jobTriggers: string[]
}
export interface QuartzJobClassListModel {
  name: string
  fullName: string
  namespace: string
}
