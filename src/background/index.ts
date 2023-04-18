import { getAllJobsData } from "../util"
chrome.alarms.create({
    periodInMinutes: 1,
    when: 1,
})

interface keywordsProps {
  keyword: string
  rssLink?: string
}

chrome.alarms.onAlarm.addListener(async() => {
    const value= await chrome.storage.local.get("jobsByKeyword")
    const allJobs = value.jobsByKeyword
    let newAllJobs:any[] =[]
    allJobs.forEach(async (keyword:keywordsProps) => {
       const result = await getAllJobsData(keyword)
       newAllJobs.push({keyword:keyword.keyword, jobs: result})
    })
    setInterval(() => {
      chrome.runtime.sendMessage({ type: 'from_background', newJobs: newAllJobs }, (response) => {
        console.log(response, 'response')
      })
    }, 60000)
    
})

export {}
