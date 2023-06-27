import { useRecoilState } from 'recoil'
import { getAllJobsData } from '../util'
import { allJobsState, keywordsAtom, proposals, selectedFilter, userState } from '../options/atoms'
import { keywordProps, proposalsProps } from '../util/types'
import useBgJobs from './use-bg-job'
import { useSupabase } from './use-supabase'

const useOpJobs = () => {
  const [allJobs, setAllJobs] = useRecoilState(allJobsState)
  const [filter, setSelectedFilter] = useRecoilState(selectedFilter)
  const [keys, setKeywords] = useRecoilState(keywordsAtom)
  const [user, setUser] = useRecoilState(userState)
  const [allProposals, setAllProposals] = useRecoilState(proposals)
  const { getBgLocalJobs, deleteLocalKeywordsCount } = useBgJobs()
  const { createKeyword, getAllKeywords, updateKeyword } = useSupabase()

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

  const deleteJobs = (keywords: keywordProps): Promise<boolean> => {
    return new Promise((resolve) => {
      updateKeyword({ ...keywords, status: true }).then((res: any) => {
        if (res[0]?.id) {
          getJobs().then((data: any) => {
            setKeywords(data.filter((item: any) => !item.status))
            resolve(true)
          })
        }
      })
    })
  }

  const restoreJobs = (keywords: keywordProps): Promise<boolean> => {
    return new Promise((resolve) => {
      updateKeyword({ ...keywords, status: false }).then((res: any) => {
        if (res[0]?.id) {
          getJobs().then((data: any) => {
            setKeywords(data.filter((item: any) => item.status))
            resolve(true)
          })
        }
      })
    })
  }

  const getJobs = async (): Promise<proposalsProps[]> => {
    return new Promise((resolve) => {
      getAllKeywords().then((res: proposalsProps[]) => {
        const result = res.filter((keywords: keywordProps | any) => {
          if (keywords.user_id === user?.id) {
            return keywords
          }
        })
        resolve(result)
      })
    })
  }

  const setJobs = async ({
    keyword,
    rssLink,
    user_id,
    isPublic,
  }: {
    keyword: string
    rssLink: string
    user_id: any
    isPublic: boolean
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      getAllJobsData({ keyword, rssLink }).then((res) => {
        console.log({ res })
        createKeyword({ keyword, rssLink, user_id, isPublic, status: false }).then((res: any) => {
          if (res?.[0]?.id) {
            getJobs().then((keywords: any) => {
              setKeywords(keywords.filter((item: any) => !item.status))
              resolve(true)
            })
          }
        })
      })
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
    deleteJobs,
    restoreJobs,
    setJobs,
    getJobs,
    setFilter,
    getFilter,
  }
}

export default useOpJobs
