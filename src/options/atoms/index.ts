import { atom } from 'recoil'
import { jobsProps, keywordProps } from '../../util/types'

export const jobsState = atom({
  key: 'jobs',
  default: {} as jobsProps,
})

export const allJobsState = atom({
  key: 'allJobs',
  default: [] as keywordProps[],
})

export const isJobs = atom({
  key: 'isJobs',
  default: false,
})

export const clickedKeyword = atom({
  key: 'clickedKeyword',
  default: {},
})
