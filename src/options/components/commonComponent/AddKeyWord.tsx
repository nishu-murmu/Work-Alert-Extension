import { useEffect, useState } from 'react'
import { getAllJobsData } from '../../../util'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { useRecoilState } from 'recoil'
import { allJobsState, jobsState } from '../../atoms'
import useBgJobs from '../../../customHooks/use-bg-job'

const AddKeyWordSection: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [rssLink, setRssLink] = useState<string>('')
  const [jobs, setJobs] = useRecoilState(jobsState)
  const [allJobs, setallJobs] = useRecoilState(allJobsState)
  const { getLocalJobs, setLocalJobs } = useBgJobs()

  const getJobsData = async () => {
    if (!allJobs || allJobs?.filter((item: any) => item.keyword === keyword).length === 0)
      // if (allJobs === undefined) setAllJobs([])
      chrome.storage.local.set({
        allJobs: [...allJobs, { keyword, rssLink, jobs }],
      })

    setKeyword('')
    setRssLink('')
  }
  useEffect(() => {}, [allJobs])

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
        onClick={() => setLocalJobs(keyword, rssLink)}
        className=" border w-2/5 mx-auto bg-transparent place-content-center border-white text-lg px-5 py-2 rounded-md"
      >
        Add New Keyword
      </button>
    </div>
  )
}
export default AddKeyWordSection
