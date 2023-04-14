import { useRecoilState } from 'recoil'
import { getAllJobsData } from '../util'
import { allJobsState, jobsState } from '../options/atoms'
import { useEffect } from 'react'

const useOpJobs = () => {
  const [allJobs, setallJobs] = useRecoilState(allJobsState)

  useEffect(() => {
    getLocalJobs()
    return () => {}
  }, [])

  const getLocalJobs = () => {
    chrome.storage.local.get('jobsByKeyword', (res) => {
      setallJobs(res.jobsByKeyword)
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
