import useBgJobs from '../customHooks/use-bg-job'
import { compareJobs, countJobsKeywords, getAllJobsData, notify, separateCounts } from '../util'
const { setLocalJobsToStorage, setLocalKeywordsCount } = useBgJobs()
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
            chrome.tabs.create({
                url: OptionsUrl,
            })
        } else {
            chrome.tabs.query({ url: OptionsUrl }, (tabs: any) => {
                chrome.tabs.update(tabs[0].id, { active: true })
            })
        }
    })
}

const updateBadge = async () => {
    const result = await chrome.storage.local.get('keywordsCount')
    const total = result.keywordsCount && result.keywordsCount.reduce((acc: any, item: any) => {
        return acc + item.count
    }, 0)
    if (total !== 0) chrome.action.setBadgeText({ text: total.toString() })
    else chrome.action.setBadgeText({ text: '' })
}

const redirectWindow = () => {
    chrome.windows.getCurrent({ populate: false }, (current) => {
        let id = current.id
        if (id) chrome.windows.update(id, { focused: true })
    })
}

chrome.alarms.create({
    periodInMinutes: 0.05,
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

    const allKeywordJobs = compareJobs(previousAllJobs, newAllJobs)

    // if have all keyword new jobs, show notification
    if (allKeywordJobs?.length > 0) {
        const keywordObj = countJobsKeywords(allKeywordJobs)
        notify(keywordObj) // send Notification
        const result = separateCounts(allKeywordJobs)
        setLocalKeywordsCount(result)
        setLocalJobsToStorage(newAllJobs, allKeywordJobs)
    }
})

chrome.runtime.onMessage.addListener((req) => {
    if (req.key === 'addKeyCount') {
        updateBadge()
    }
    if (req.key === 'deleteKeyCount') {
        updateBadge()
    }
})

chrome.notifications.onClicked.addListener(() => {
    tabChange()
    redirectWindow()
})
export { }
