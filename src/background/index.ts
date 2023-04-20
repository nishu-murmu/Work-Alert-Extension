import useBgJobs from '../customHooks/use-bg-job'
import { compareArrays, compareJobs, countJobsKeywords, getAllJobsData, notify } from '../util'
import { keywordProps } from '../util/types'

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: `chrome-extension://${chrome.runtime.id}/options.html`,
  })
})

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: `chrome-extension://${chrome.runtime.id}/options.html`,
  })
})

chrome.alarms.create({
  periodInMinutes: 0.05,
  when: 1,
})

interface keywordsProps {
  keyword: string
  rssLink?: string
}

const { setLocalJobsToStorage } = useBgJobs()

chrome.alarms.onAlarm.addListener(async () => {
  const value = await chrome.storage.local.get('jobsByKeyword')
  const allJobs: keywordsProps[] = value.jobsByKeyword
  let newAllJobs: any[] = []

  for (const keyword in allJobs) {
    let key = allJobs[keyword]
    const result = await getAllJobsData(key)
    newAllJobs.push({ keyword: key.keyword, jobs: result, rssLink: key.rssLink })
  }

  // Get previous all jobs
  const previousAllJobs = await chrome.storage.local.get('jobsByKeyword')

  const allKeywordJobs = compareJobs(previousAllJobs, newAllJobs)

  // if have all keyword new jobs, show notification
  if (allKeywordJobs?.length > 0) {
    const keywordObj = countJobsKeywords(allKeywordJobs)
    notify(keywordObj) // send Notification
    setLocalJobsToStorage(newAllJobs)
  }
})
export {}
