import { useRecoilState } from 'recoil'
import { getAllJobsData } from '../util'
import { allJobsState, keywords, proposals, selectedFilter } from '../options/atoms'
import { useEffect } from 'react'
import { keywordProps } from '../util/types'
import useBgJobs from './use-bg-job'

const useOpJobs = () => {
  const [allJobs, setAllJobs] = useRecoilState(allJobsState)
  const [filter, setSelectedFilter] = useRecoilState(selectedFilter)
  const [keys, setKeywords] = useRecoilState(keywords)
  const [allProposals, setAllProposals] = useRecoilState(proposals)
  const { getBgLocalJobs, getBgKeywords, deleteLocalKeywordsCount } = useBgJobs()

  useEffect(() => {
    console.log('called')
    getLocalJobs()
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.alert === 'Update State') {
        setAllJobs(request.jobsByKeyword)

        chrome.storage.local.get(['newComingJobs'], (res: any) => {
          let arr

          if (res?.newComingJobs?.length) {
            arr = [...res.newComingJobs, ...request.allKeywordJobs]
          } else {
            arr = request.allKeywordJobs
          }
          const uniqueVal = removeDuplicates(arr)
          chrome.storage.local.set({ newComingJobs: uniqueVal }).then(() => {})
        })

        sendResponse({ success: true })
      }
    })
  }, [])

  const getNewComingJobs = async () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['newComingJobs'], (res) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve(res.newComingJobs || [])
        }
      })
    })
  }

  const removeSeenJobs = (jobs: any) => {
    chrome.storage.local.set({ newComingJobs: jobs }).then(() => {})
  }

  function removeDuplicates(arr: any) {
    if (arr?.length) {
      return arr.filter((obj: any, index: any) => {
        return (
          index ===
          arr.findIndex((elem: any) => {
            return JSON.stringify(elem) === JSON.stringify(obj)
          })
        )
      })
    }
    return []
  }

  const getLocalJobs = () => {
    chrome.storage.local.get('jobsByKeyword', (res) => {
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

  const getFilter = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('filter', (res) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          setSelectedFilter(res.filter || '')
          // resolve(res.filter || '')
        }
      })
    })
  }

  const setFilter = async (filter: string) => {
    chrome.storage.local.set({ filter })
  }

  return {
    getLocalJobs,
    setLocalJobs,
    getNewComingJobs,
    removeSeenJobs,
    allJobs,
    deleteLocalJobs,
    setLocalKeywords,
    setFilter,
    getFilter,
  }
}

export default useOpJobs
