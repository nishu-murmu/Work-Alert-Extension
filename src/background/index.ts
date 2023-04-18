import useBgJobs from '../customHooks/use-bg-job'
import { compareArrays, getAllJobsData } from '../util'
import { keywordProps } from '../util/types'
chrome.alarms.create({
  periodInMinutes: 0.05,
  when: 1,
})

interface keywordsProps {
  keyword: string
  rssLink?: string
}

const {setLocalJobsToStorage}=useBgJobs()

chrome.alarms.onAlarm.addListener(async () => {
  const value = await chrome.storage.local.get('jobsByKeyword')
  const allJobs: keywordsProps[] = value.jobsByKeyword
  let newAllJobs: any[] = []

  for (const keyword in allJobs) {
    let key = allJobs[keyword]
    const result = await getAllJobsData(key)
    newAllJobs.push({ keyword: key.keyword, jobs: result,rssLink:key.rssLink })
  }

  const previousAllJobs = await chrome.storage.local.get('jobsByKeyword')

  const updatedJobs = compareArrays(previousAllJobs.jobsByKeyword, newAllJobs)

  // if (previousAllJobs?.jobsByKeyword)
    previousAllJobs.jobsByKeyword.map((keyword: keywordProps) => {
      let jobs = newAllJobs.find((key) => key.keyword === keyword.keyword)
      const newJob = compareArrays(keyword.jobs, jobs?.jobs ? jobs.jobs : [])
      if (Array.isArray(newJob)) {
        console.log(newJob, 'new job hai')
        // keyword.jobs?.push(...newJob)
      }
      console.log({newAllJobs, prev:previousAllJobs.jobsByKeyword}, 'new and prev')
      setLocalJobsToStorage(newAllJobs)
    })
})

// chrome.runtime.onInstalled.addListener(()=>{
//   chrome.storage.local.clear()

// })

export {}
