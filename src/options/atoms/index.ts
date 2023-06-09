import { atom } from 'recoil'
import { jobsProps, keywordProps, proposalsProps } from '../../util/types'

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
  default: false as boolean,
})

export const clickedKeyword = atom({
  key: 'clickedKeyword',
  default: { keyword: '', jobs: [] },
})

export const proposals = atom({
  key: 'proposals',
  default: [] as proposalsProps[],
})

export const clickedValue = atom({
  key: 'clickedValue',
  default: '' as string,
})

export const isEmpty = atom({
  key: 'isEmpty',
  default: false as boolean,
})

export const keywords = atom({
  key: 'keywords',
  default: [],
})

export const keywordCount: any = atom({
  key: 'keywordsCount',
  default: [] as [],
})

export const selectedFilter = atom({
  key: 'selectedFilter',
  default: 'default' as string,
})

export const proposalIndex = atom({
  key: 'proposalIndex',
  default: "" as string,
})