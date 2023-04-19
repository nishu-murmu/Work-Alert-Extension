import { getAllJobsData } from '../util'

const useBgJobs = () => {
  const getBgLocalJobs = async () => {
    const result = await chrome.storage.local.get('jobsByKeyword')
    return result.jobsByKeyword
  }

  const setLocalJobs = (keyword: string, rssLink: string) => {
    getAllJobsData({ keyword, rssLink }).then((data) => {
    })
  }

  const setLocalJobsToStorage = (jobsByKeyword: any) => {
    chrome.storage.local.set({ jobsByKeyword })
  }

  return { getBgLocalJobs, setLocalJobs, setLocalJobsToStorage }
}

export default useBgJobs
