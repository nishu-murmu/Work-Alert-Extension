import useBgJobs from '../customHooks/use-bg-job'
import { compareArrays, countJobsKeywords, getAllJobsData } from '../util'
import { keywordProps } from '../util/types'
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

  const previousAllJobs = await chrome.storage.local.get('jobsByKeyword')

  previousAllJobs?.jobsByKeyword?.map((keyword: keywordProps) => {
    let jobs = newAllJobs.find((key) => key.keyword === keyword.keyword)
    const newJobs = compareArrays(keyword.jobs, jobs?.jobs ? jobs.jobs : [])
    console.log(newJobs, 'new jobs')
    const keywordObj = countJobsKeywords(newAllJobs)
    if(newJobs.length > 0) {
      chrome.notifications.create(
        {
          type: 'basic',
          title: 'New Job Alert',
          message: JSON.stringify(keywordObj),
          iconUrl:
            'https://png.pngtree.com/png-vector/20201028/ourmid/pngtree-phone-icon-in-solid-circle-png-image_2380227.jpg',
          requireInteraction: true,
        },
        () => {},
      )
    }
  })
  setLocalJobsToStorage(newAllJobs)
})
export {}
