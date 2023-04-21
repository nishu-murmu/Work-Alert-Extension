import useBgJobs from '../customHooks/use-bg-job'
import { compareJobs, countJobsKeywords, getAllJobsData, notify, separateCounts } from '../util'

let OptionsUrl = `chrome-extension://${chrome.runtime.id}/options.html`
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: OptionsUrl,
  })
})

chrome.action.onClicked.addListener(() => {
  tabChange()
})

const tabChange = () => {
  chrome.tabs.query({}, (tabs) => {
    if(!tabs.find(tab => tab.url === OptionsUrl)) {
      chrome.tabs.create({
        url: OptionsUrl
      })
    } else {
      chrome.tabs.query({url: OptionsUrl}, (tabs:any) => {
        chrome.tabs.update(tabs[0].id, { active: true })
      })
    }
  })
}

chrome.alarms.create({
  periodInMinutes: 0.05,
  when: 1,
})

interface keywordsProps {
  keyword: string
  rssLink?: string
}

const { setLocalJobsToStorage, setLocalKeywordsCount } = useBgJobs()

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

    const result = separateCounts(allKeywordJobs)
    setLocalKeywordsCount(result)
    setLocalJobsToStorage(newAllJobs)
  }
})
export {}
