import { useRecoilState } from 'recoil'
import { getAllJobsData } from '../util'
import { allJobsState, jobsState } from '../options/atoms'
import { useEffect, useState } from 'react'
import { jobsProps, keywordProps } from '../util/types'

const useOpJobs = () => {
  const [allJobs, setallJobs] = useRecoilState(allJobsState)
  const [jobsFlag, setJobsFlag] = useState(false)

  useEffect(() => {
    getLocalJobs()
  }, [jobsFlag])

  const getLocalJobs = () => {
    chrome.storage.local.get('jobsByKeyword', (res) => {
      setallJobs(res.jobsByKeyword)
      setJobsFlag(!jobsFlag)
    })
  }

  const setLocalJobs = async (keyword: string, rssLink?: string) => {
    // delete keycard logic
    if (!rssLink) {
      chrome.storage.local.set({
        jobsByKeyword: allJobs.filter((item) => item.keyword !== keyword),
      })
      getLocalJobs()
    } else {
      const ans = await getAllJobsData({ keyword, rssLink })
      console.log({ ans })
      return true
    }
    return false
  }

  const viewJobsHandler = (keyword: keywordProps) => {
    chrome.storage.local.set({
      jobsByKeyword: allJobs
        .map((a) => {
          if (a.jobs) {
            return {
              ...a,
              jobs: a.jobs.map((job) => ({
                ...job,
                __seen: true,
              })),
            }
          } else {
            return a
          }
        }),
    })
    getLocalJobs()
  }

  return { getLocalJobs, setLocalJobs, viewJobsHandler ,allJobs }
}

export default useOpJobs
