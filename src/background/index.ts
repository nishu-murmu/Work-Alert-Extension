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

  const updatedJobs = compareArrays(previousAllJobs.jobsByKeyword, newAllJobs)

  // if (previousAllJobs?.jobsByKeyword)
  previousAllJobs?.jobsByKeyword?.map((keyword: keywordProps) => {
    let jobs = newAllJobs.find((key) => key.keyword === keyword.keyword)
    const newJob = compareArrays(keyword.jobs, jobs?.jobs ? jobs.jobs : [])

    console.log(newJob, 'new jobs')
    setLocalJobsToStorage(newAllJobs)
  })
  if (newAllJobs.length > 0) {
    const keywordObj = countJobsKeywords(newAllJobs)
    // Create a new notification
    console.log('notify')
    chrome.notifications.create('JobNotification', {
      type: 'basic',
      title: 'New Job Alert',
      message: JSON.stringify(keywordObj),
      iconUrl:
        'https://png.pngtree.com/png-vector/20201028/ourmid/pngtree-phone-icon-in-solid-circle-png-image_2380227.jpg',
      requireInteraction: true,
    })
  }
})
// {
// budget: '$1,500\n'
// date: '2023-04-19T06:25:00.000Z'
// description: 'Need someone on urgent basis who can develop UI for our application.It is a web application need to be done on Flutter. Figma designs would be provided along with all required functional APIs. The backend is already been done and the designs are ready too. Around 30 screens need to be developed into a responsive UI. Someone who can start immediately and can deliver it in three weeks.'
// hourly: null
// keyword: 'Reactjs'
// link: 'https://www.upwork.com/jobs/Flutter-Web-App-development_%7E017a8df7512bfa7f58?source=rss'
// notification_triggered: false
// title: 'Flutter Web App UI development'
// uid: 'https://www.upwork.com/jobs/Flutter-Web-App-development_%7E017a8df7512bfa7f58?source=rss'
// __seen: false
// }

export {}
