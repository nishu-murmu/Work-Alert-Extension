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
  return filtered
}

export const mergeJobs = async() => {
  const previousJobs = await chrome.storage.local.get("jobsByKeyword")
  console.log(previousJobs,'previous')
  let newJobs = []
  try {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === 'from_background') {
        newJobs = request.newJobs
        console.log(newJobs, 'new jobs from background')
        sendResponse('Response from option to background')
      }
    })
  } catch (err) {
    console.log(err, 'error')
  }
}

const handleHTMLcoding = (text: string) => {
  return he.decode(text)
}

export const truncate = (string: string) => {
  const decodedText = handleHTMLcoding(string)
  return decodedText.length > 190 ? decodedText.substring(0, 190) + ' ...' : decodedText
}

export const timeRange = (time: string): {range: string | number, type: string} => {
  const range: number = Date.now() - Number(new Date(time))
  const hours: number = Math.floor(range / (60 * 60 * 1000))
  if(hours > 24) return {range:Math.floor(hours/ 24), type:'days'}
  if(hours === 0) return {range:Math.floor(range / (60 * 1000)),type: 'minutes'}
  else return {range:hours.toFixed(0), type: 'hours'}
}