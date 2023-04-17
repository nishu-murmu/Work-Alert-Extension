import axios from 'axios'
import XMLParser from 'fast-xml-parser'
import { jobsProps, keywordProps } from './types'
import he from 'he'
import useOpJobs from '../customHooks/use-option-jobs'
import useBgJobs from '../customHooks/use-bg-job'
import { useEffect } from 'react'
const parser = new XMLParser.XMLParser()

export const getAllJobsData = async (keywords: keywordProps) => {
  let filtered: jobsProps[] = []
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

        xmlJobList.rss.channel.item.map((item: jobsProps) =>
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
            uid: item.guid && item.guid,
            keyword: keywords.keyword,
            __seen: false,
            notification_triggered: false,
          }),
        )
      })
      .catch((error) => {
        console.log(error)
      })
  getLocalJobs().then((allJobs) => {
    let prevJobs = allJobs || []

    // prevent duplicate logic
    if(prevJobs.filter((item: keywordProps) => item.rssLink === keywords.rssLink).length === 0) {
      // setting local storage first and syncing it
      chrome.storage.local.set({
        jobsByKeyword: [
          ...prevJobs,
          { jobs: filtered, rssLink: keywords.rssLink, keyword: keywords.keyword },
        ],
      })
    }
    getLocalJobs()
  })
}

const handleHTMLcoding = (text: string) => {
  return he.decode(text)
}

export const truncate = (string: string) => {
  const decodedText = handleHTMLcoding(string)
  return decodedText.length > 190 ? decodedText.substring(0, 190) + ' ...' : decodedText
}

export const timeRange = (time: string): number | string => {
  const range: number = Date.now() - Number(new Date(time))
  const hours: number = range / Number(60 * 60 * 10000)
  if (parseInt(hours.toFixed(0)) == 0) return Number((Number(hours.toFixed(4)) * 60).toFixed(2))
  else return hours.toFixed(0)
}