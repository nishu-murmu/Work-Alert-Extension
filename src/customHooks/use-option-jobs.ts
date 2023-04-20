import { useRecoilState } from 'recoil'
import { getAllJobsData } from '../util'
import { allJobsState, jobsState, keywords } from '../options/atoms'
import { useEffect, useState } from 'react'
import { jobsProps, keywordProps } from '../util/types'
import useBgJobs from './use-bg-job'

const useOpJobs = () => {
  const [allJobs, setAllJobs] = useRecoilState(allJobsState)
  const [keys, setKeywords] = useRecoilState(keywords)
  const { getBgLocalJobs, getBgKeywords, deleteLocalKeywordsCount } = useBgJobs()

  useEffect(() => {
    getLocalJobs()
  }, [])

  const getLocalJobs = () => {
    chrome.storage.local.get('jobsByKeyword', (res) => {
      // chrome.storage.local.set({jobsByKeyword:res})
      setAllJobs(res.jobsByKeyword)
    })
  }

  const deleteLocalJobs = (keyword: string) => {
    getBgKeywords().then((keywords: any) => {
      let filteredKeywords = keywords.filter((a: any) => a.keyword !== keyword)
      chrome.storage.local.set({ keywords: filteredKeywords }).then(() => {
        getBgKeywords().then((keywords: any) => {
          setKeywords(keywords)
        })
      })
    })

    getBgLocalJobs().then((jobsByKeyword: any) => {
      let filteredJobs = jobsByKeyword.filter((a: any) => a.keyword !== keyword)
      chrome.storage.local.set({ jobsByKeyword: filteredJobs }).then(() => {
        getBgLocalJobs().then((jobsByKeyword: any) => {
          setAllJobs(jobsByKeyword)
        })
      })
    })
    deleteLocalKeywordsCount(keyword)
  }

  const setLocalKeywords = async (keyword: string, rssLink: string) => {
    getBgKeywords().then((keywords: any) => {
      let arr = keywords || []
      if (arr?.filter((item: keywordProps) => item.rssLink === rssLink).length === 0) {
        chrome.storage.local.set({ keywords: [...arr, { keyword, rssLink }] }).then(() => {
          getBgKeywords().then((keywords: any) => {
            setKeywords(keywords)
          })
        })
      }
    })
  }

  const setLocalJobs = async (keyword: string, rssLink?: string) => {
    const currentJobs = await getAllJobsData({ keyword, rssLink })
    if (currentJobs) {
      getBgLocalJobs().then((allJobs: any) => {
        let prevJobs = allJobs || []

        if (prevJobs.filter((item: keywordProps) => item.rssLink === rssLink).length === 0) {
          chrome.storage.local
            .set({
              jobsByKeyword: [
                ...prevJobs,
                { jobs: currentJobs, rssLink: rssLink, keyword: keyword },
              ],
            })
            .then(() => {
              getLocalJobs()
            })
        }
      })
    }
  }

  const viewJobsHandler = (keyword: keywordProps) => {
    chrome.storage.local.get('jobsByKeyword', (res) => {})
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
    chrome.storage.local.get('jobsByKeyword', (res) => {
    })
    getLocalJobs()
  }

  return { getLocalJobs, setLocalJobs, viewJobsHandler, allJobs, deleteLocalJobs, setLocalKeywords }
}

export default useOpJobs
