import useBgJobs from '../customHooks/use-bg-job'
import useGPT from '../customHooks/use-gpt'
import {
  compareJobs,
  countJobsKeywords,
  getAllJobsData,
  notify,
  separateCounts,
  timeRange,
} from '../util'
import { config } from '../util/config'
import { jobsProps } from '../util/types'
const { setLocalJobsToStorage, setLocalKeywordsCount } = useBgJobs()
const { getSession, generateAns, closeAns } = useGPT()
interface keywordsProps {
  keyword: string
  rssLink?: string
}
let OptionsUrl = `chrome-extension://${chrome.runtime.id}/options.html`

chrome.runtime.onInstalled.addListener(async () => {
  chrome.tabs.create(
    {
      url: OptionsUrl,
    },
    () => {
      updateBadge()
    },
  )
})

chrome.action.onClicked.addListener(() => {
  tabChange()
})

const tabChange = () => {
  chrome.tabs.query({}, (tabs) => {
    if (!tabs.find((tab) => tab.url === OptionsUrl)) {
      chrome.tabs
        .create({
          url: OptionsUrl,
        })
        .then(() => redirectSection())
    } else {
      chrome.tabs.query({ url: OptionsUrl }, (tabs: any) => {
        chrome.tabs.update(tabs[0].id, { active: true }).then(() => redirectSection())
      })
    }
  })
}

const updateBadge = async () => {
  const result = await chrome.storage.local.get('keywordsCount')
  const total =
    result.keywordsCount &&
    result.keywordsCount.reduce((acc: any, item: any) => {
      return acc + item.count
    }, 0)
  if (total !== 0) chrome.action.setBadgeText({ text: total ? total.toString() : '' })
  else chrome.action.setBadgeText({ text: '' })
}

const redirectWindow = () => {
  chrome.windows.getCurrent({ populate: false }, (current) => {
    let id = current.id
    if (id) chrome.windows.update(id, { focused: true }).then(() => redirectSection())
  })
}

const redirectSection = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    let tabId: any = tabs[0]?.id
    chrome.tabs.sendMessage(tabId, { type: 'notification_clicked' })
  })
}

chrome.alarms.create({
  periodInMinutes: config.API_INTERVAL,
  when: 1,
})

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

  let allKeywordJobs = compareJobs(previousAllJobs, newAllJobs)
  allKeywordJobs = allKeywordJobs.slice().filter((job: jobsProps) => {
    if (timeRange(job.date).type === 'minutes' && timeRange(job.date).range <= '30') return job
  })
  // if have all keyword new jobs, show notification
  if (allKeywordJobs?.length) {
    const keywordObj = countJobsKeywords(allKeywordJobs)
    notify(keywordObj) // send Notification
    const result = separateCounts(allKeywordJobs)
    setLocalKeywordsCount(result)
    setLocalJobsToStorage(newAllJobs, allKeywordJobs)
    updateBadge()
  }
})

chrome.runtime.onMessage.addListener((req) => {
  if (req.key === 'deleteKeyCount' || req.key === 'addKeyCount') {
    updateBadge()
  }
})

chrome.notifications.onClicked.addListener(() => {
  tabChange()
  redirectWindow()
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'session_call') {
    getSession().then((res) => {
      sendResponse({ success: res })
    })
  }
  if (request.type === 'close_ans') {
    closeAns()
  }
  if (request.type === 'get_ans') {
    generateAns(request.query)
  }
  return true
})

export {}
