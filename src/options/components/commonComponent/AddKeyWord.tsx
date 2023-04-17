import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { allJobsState, isEmpty, jobsState } from '../../atoms'
import useBgJobs from '../../../customHooks/use-bg-job'
import useOpJobs from '../../../customHooks/use-option-jobs'

const AddKeyWordSection: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [rssLink, setRssLink] = useState<string>('')
  const [jobs, setJobs] = useRecoilState(jobsState)
  const [allJobs, setallJobs] = useRecoilState(allJobsState)
  const [isEmptyFields, setIsEmptyFields] = useRecoilState(isEmpty)
  const { setLocalJobs, getLocalJobs } = useOpJobs()

  const submitHandler = (keyword: string, rssLink: string) => {
    if (!keyword || !rssLink) {
      setIsEmptyFields((prevState) => !prevState)
    } else {
      setLocalJobs(keyword, rssLink)
      setTimeout(() => {
        getLocalJobs()
      }, 1000);
    }
  }

  return (
    <div className="flex justify-center flex-col gap-y-4">
      <div id="btn-group" className="gap-x-4 flex place-content-center">
        <input
          type="text"
          placeholder="Keyword"
          onFocus={() => setIsEmptyFields(false)}
          value={keyword}
          className={`bg-transparent border ${
            !isEmptyFields ? 'border-white' : 'border-red-600'
          } rounded-md px-4 py-2 text-lg`}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="UpWork RSS Feed"
          value={rssLink}
          onFocus={() => setIsEmptyFields(false)}
          className={`bg-transparent border ${
            !isEmptyFields ? 'border-white' : 'border-red-600'
          } rounded-md px-4 py-2 text-lg`}
          onChange={(e) => setRssLink(e.target.value)}
        />
      </div>
      {isEmptyFields && (
        <div className="text-red-600 text-md text-center">Please fill all the fields</div>
      )}
      <button
        onClick={() => submitHandler(keyword, rssLink)}
        className=" border w-2/5 mx-auto bg-transparent place-content-center border-white text-lg px-5 py-2 rounded-md"
      >
        Add New Keyword
      </button>
    </div>
  )
}
export default AddKeyWordSection
