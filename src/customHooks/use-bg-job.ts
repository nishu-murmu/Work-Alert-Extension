import { getAllJobsData } from '../util'
import { keywordProps } from '../util/types'

const useBgJobs = () => {
  const getBgLocalJobs = async () => {
    const result = await chrome.storage.local.get('jobsByKeyword')
    return result.jobsByKeyword
  }

  const getBgKeywords = async (): Promise<keywordProps[]> => {
    const result = await chrome.storage.local.get('keywords')
    return result.keywords
  }

  const setLocalJobs = (keyword: string, rssLink: string) => {
    getAllJobsData({ keyword, rssLink }).then((data) => {})
  }

  const setLocalJobsToStorage = (jobsByKeyword: any, allKeywordJobs: any) => {
    chrome.storage.local.set({ jobsByKeyword })

    chrome.runtime.sendMessage(
      { alert: 'Update State', jobsByKeyword, allKeywordJobs },
      (response) => {},
    )
  }

  const getLocalKeywordsCount = async () => {
    const result = await chrome.storage.local.get('keywordsCount')
    return result.keywordsCount
  }

  const setLocalKeywordsCount = (newKeywords: any) => {
    getLocalKeywordsCount().then((prevKeywords) => {
      prevKeywords = prevKeywords || []
      let value = [...prevKeywords, ...newKeywords].reduce((acc: any, curr: any) => {
        const index = acc.findIndex((item: any) => item.keyword === curr.keyword)
        if (index === -1) {
          return [...acc, curr]
        } else {
          acc[index].count += curr.count
          return acc
        }
      }, [])
      chrome.storage.local.set({ keywordsCount: value }, () => {
        chrome.runtime.sendMessage({ type: 'addKeyCount' })
      })
    })
  }

  const deleteLocalKeywordsCount = (keyword: string) => {
    getLocalKeywordsCount().then(
      (keywordsCount: any) => {
        if (keywordsCount) {
          const filteredCounts = keywordsCount.filter((key: any) => key.keyword !== keyword)
          chrome.storage.local.set({ keywordsCount: filteredCounts }, () => {
            chrome.runtime.sendMessage({ key: 'deleteKeyCount' })
          })
        }
      },
    )
  }

  return {
    getBgLocalJobs,
    setLocalJobs,
    setLocalJobsToStorage,
    getBgKeywords,
    getLocalKeywordsCount,
    setLocalKeywordsCount,
    deleteLocalKeywordsCount,
  }
}

export default useBgJobs
