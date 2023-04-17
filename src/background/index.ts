import { getAllJobsData } from "../util"
import { jobsProps } from "../util/types"
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
    setTimeout(() => {
        console.log(newAllJobs,'new jobs')
    }, 1000);
})

export {}
