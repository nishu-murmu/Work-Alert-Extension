import { getAllJobsData } from '../util'

const useBgJobs = () => {
  const getLocalJobs = async () => {
    const result = await chrome.storage.local.get('jobsByKeyword')
    return result.jobsByKeyword
  }

  const setLocalJobs = (keyword: string, rssLink: string) => {
    getAllJobsData({ keyword, rssLink }).then((data) => {
      console.log(data)
    })
  }

  return { getLocalJobs, setLocalJobs }
}

export default useBgJobs