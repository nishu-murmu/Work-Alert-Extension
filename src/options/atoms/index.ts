import { atom } from 'recoil'
import { jobsProps, keywordProps } from '../../util/types'

export const keyWordState = atom({
  key: 'keywordState',
  default: {} as keywordProps,
})

export const keyWordList = atom({
  key: 'keywordList',
  default: [] as keywordProps[],
})

export const jobsState = atom({
  key: 'jobs',
  default: {} as jobsProps,
})

export const allJobsState = atom({
  key: 'allJobs',
  default: [] as keywordProps[],
})
