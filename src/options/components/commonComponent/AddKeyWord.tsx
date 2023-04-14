import { useState } from 'react'
import { getAllJobsData, getAllJobsLocalStorage, getJobsLocalStorage } from '../../../util'

const AddKeyWordSection: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [rssLink, setRssLink] = useState<string>('')

  const getJobsData = async () => {
    const allJobs = await getAllJobsData({ keyword, rssLink })

    const jobs = await getJobsLocalStorage()
    console.log(jobs, 'just jobs')

    const allJobsLocal = await getAllJobsLocalStorage()
    console.log(allJobsLocal, 'all jobs local')

    if (allJobsLocal.filter((item) => item.keyword === keyword).length === 0)
      chrome.storage.local.set({
        allJobs: [...allJobsLocal, { keyword, rssLink, jobs: jobs }],
      })

    setKeyword('')
    setRssLink('')
  }

  return (
    <div className="flex justify-center flex-col gap-y-4">
      <div id="btn-group" className="gap-x-4 flex place-content-center">
        <input
          type="text"
          placeholder="Keyword"
          value={keyword}
          className="bg-transparent border border-white rounded-md px-4 py-2 text-lg"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="UpWork RSS Feed"
          value={rssLink}
          className="bg-transparent px-4 py-2 text-lg border border-white rounded-md"
          onChange={(e) => setRssLink(e.target.value)}
        />
      </div>
      <button
        onClick={() => getJobsData()}
        className=" border w-2/5 mx-auto bg-transparent place-content-center border-white text-lg px-5 py-2 rounded-md"
      >
        Add New Keyword
      </button>
    </div>
  )
}
export default AddKeyWordSection
