import { useRecoilState } from 'recoil'
import { getAllJobsData } from '../util'
import { allJobsState, jobsState } from '../options/atoms'

const useOpJobs = () => {
  const [allJobs, setallJobs] = useRecoilState(allJobsState)

  const getLocalJobs = () => {
    chrome.storage.local.get('jobsByKeyword', (res) => {
      console.log(res, 'response')
      setallJobs(res.jobs)
    })
  }

  const setLocalJobs = (keyword: string, rssLink: string) => {
    getAllJobsData({ keyword, rssLink }).then((data) => {
      console.log(data)
      setallJobs(data)
    })
  }

  return { getLocalJobs, setLocalJobs, allJobs }
}

export default useOpJobs
