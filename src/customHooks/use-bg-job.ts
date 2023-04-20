import { getAllJobsData } from '../util'
import { keywordProps } from '../util/types'

const useBgJobs = () => {
  const getBgLocalJobs = async () => {
    const result = await chrome.storage.local.get('jobsByKeyword')
    return result.jobsByKeyword
  }

  const getBgKeywords = async (): Promise<keywordProps[]> => {
    const result = await chrome.storage.local.get('keywords')
    return result.keywords
  }

  const setLocalJobs = (keyword: string, rssLink: string) => {
    getAllJobsData({ keyword, rssLink }).then((data) => {})
  }

  const setLocalJobsToStorage = (jobsByKeyword: any) => {
    chrome.storage.local.set({ jobsByKeyword })

    chrome.runtime.sendMessage({ alert: 'Update State', jobsByKeyword }, (response) => {})
  }

  return { getBgLocalJobs, setLocalJobs, setLocalJobsToStorage, getBgKeywords }
}

export default useBgJobs
