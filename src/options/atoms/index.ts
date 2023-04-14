import { atom } from 'recoil'
import { keywordProps } from '../../util/types'

export const keyWordState = atom({
  key: 'keywordState',
  default: {} as keywordProps,
})

export const keyWordList = atom({
  key: 'keywordList',
  default: [] as keywordProps[],
})
