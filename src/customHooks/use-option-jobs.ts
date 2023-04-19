import { useRecoilState } from 'recoil'
import { getAllJobsData } from '../util'
import { allJobsState, jobsState } from '../options/atoms'
import { useEffect, useState } from 'react'
import { jobsProps, keywordProps } from '../util/types'
import useBgJobs from './use-bg-job'

const useOpJobs = () => {
  const [allJobs, setallJobs] = useRecoilState(allJobsState)
  const { getBgLocalJobs } = useBgJobs()

  useEffect(() => {
    getLocalJobs()
  }, [])

  const getLocalJobs = () => {
    chrome.storage.local.get('jobsByKeyword', (res) => {
      setallJobs(res.jobsByKeyword)
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

      getBgLocalJobs().then((allJobs) => {
        let prevJobs = allJobs || []

        // prevent duplicate logic
        if (prevJobs.filter((item: keywordProps) => item.rssLink === rssLink).length === 0) {
          // setting local storage first and syncing it

          chrome.storage.local.set({
            jobsByKeyword: [...prevJobs, { jobs: ans, rssLink: rssLink, keyword: keyword }],
          })
          chrome.storage.local.get('jobsByKeyword', (data) => {
            setallJobs(data.jobsByKeyword)
          })
        }
      })
      return true
    }
    return false
  }

  const viewJobsHandler = (keyword: keywordProps) => {
    chrome.storage.local.set({
      jobsByKeyword: allJobs.map((a) => {
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

  return { getLocalJobs, setLocalJobs, viewJobsHandler, allJobs }
}

export default useOpJobs
