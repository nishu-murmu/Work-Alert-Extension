import axios from 'axios'
import XMLParser from 'fast-xml-parser'
import { keywordProps } from './types'
import useOpJobs from '../customHooks/use-option-jobs'
import useBgJobs from '../customHooks/use-bg-job'
const parser = new XMLParser.XMLParser()

export const getAllJobsData = async (keywords: keywordProps) => {
  let filtered: {}[] = []
  const { getLocalJobs } = useBgJobs()

  const url = keywords.rssLink
  if (url)
    await fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((response) => response.text())
      .then((response) => {
        const original = response
        let xmlJobList = parser.parse(original)

        xmlJobList.rss.channel.item.map((item: any) => {
          filtered.push({
            title: item.title.replace(' - Upwork', ''),
            link: item.link,
            date: new Date(
              (item.description.match(/<b>Posted On<\/b>: ([^<]+)/) || [
                null,
                new Date().toUTCString(),
              ])[1],
            ).toJSON(),
            budget: (item.description.match(/<b>Budget<\/b>: ([^<]+)/) || [null, null])[1],
            hourly: (item.description.match(/<b>Hourly Range<\/b>: ([^<]+)/) || [null, null])[1],
            description: item.description
              .replace(/< b>Posted On<\/b>: [^<]+<br \/>/, '')
              .replace(/<b>Budget<\/b>: [^<]+<br \/>/, '')
              .replace(/<b>Hourly Range<\/b>: [^<]+<br \/>/, '')
              .replace(/<b>Hourly Range<\/b>: [^<]+<br \/>/, '')
              .replace(/<b>Skills<\/b>:([^<]+)/, '')
              .replace(/<b>Country<\/b>:([^<]+)/, '')
              .replace(/<b>Category<\/b>:([^<]+)/, '')
              .replace(/<b>posted on<\/b>:([^<]+)/i, '')
              .replace(/<a href="([^]+)/, '')
              .replace(/(<br \/>)+/g, '')
              .replace(/(&nbsp;)+/g, ''),
            uid: item.guid,
            keyword: keywords.keyword,
            __seen: false,
            notification_triggered: false,
          })
        })
      })
      .catch((error) => {
        console.log(error)
      })
  getLocalJobs().then((allJobs) => {
    let prevJobs = allJobs || []
    console.log(allJobs, 'jobs')
    chrome.storage.local.set({
      jobsByKeyword: [
        ...prevJobs,
        { jobs: filtered, rssLink: keywords.rssLink, keyword: keywords.keyword },
      ],
    })
  })
  return filtered
}
