import { useRecoilState } from 'recoil'
import { getAllJobsData } from '../util'
import { allJobsState, jobsState } from '../options/atoms'
import { useEffect } from 'react'
import { jobsProps } from '../util/types'

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

  const setLocalJobs = (keyword: string, rssLink?: string) => {
    // delete keycard logic
    if (!rssLink) {
      chrome.storage.local.set({
        jobsByKeyword: allJobs.filter((item) => item.keyword !== keyword),
      })
      getLocalJobs()
    } else {
      getAllJobsData({ keyword, rssLink })
    }
  }

  return { getLocalJobs, setLocalJobs, allJobs }
}

export default useOpJobs
