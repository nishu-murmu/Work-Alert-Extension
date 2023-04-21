import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { allJobsState, isEmpty, jobsState } from '../../atoms'
import useOpJobs from '../../../customHooks/use-option-jobs'

const AddKeyWordSection: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [rssLink, setRssLink] = useState<string>('')
  const [valid, setIsValid] = useState<boolean>(true)
  const [jobs, setJobs] = useRecoilState(jobsState)
  const [allJobs, setAllJobs] = useRecoilState(allJobsState)
  const [isEmptyFields, setIsEmptyFields] = useRecoilState(isEmpty)
  const { setLocalJobs, getLocalJobs, setLocalKeywords } = useOpJobs()

  const submitHandler = async (keyword: string, rssLink: string) => {
    const regex = new RegExp('^https://www.upwork.com/ab/feed/jobs/rss?')
    if (!keyword || !rssLink) {
      setIsEmptyFields((prevState) => !prevState)
    } else if (!regex.test(rssLink)) {
      setIsValid(false)
    } else {
      setKeyword('')
      setRssLink('')
      setIsValid(true)
      await setLocalKeywords(keyword, rssLink)
      await setLocalJobs(keyword, rssLink)
    }
  }

  const submitOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      submitHandler(keyword, rssLink)
    }
  }

  const clearState = () => {
    setIsEmptyFields(false)
    setIsValid(true)
  }

  return (
    <div className="flex justify-center flex-col gap-y-4">
      <div id="btn-group" className="gap-x-4 flex place-content-center">
        <input
          type="text"
          placeholder="Keyword"
          onFocus={() => clearState()}
          value={keyword}
          className={`bg-transparent border ${
            !isEmptyFields ? 'border-white' : 'border-red-600'
          } rounded-md px-4 py-2 text-lg`}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => submitOnKeyDown(e)}
        />
        <input
          type="text"
          placeholder="UpWork RSS Feed"
          value={rssLink}
          onFocus={() => clearState()}
          className={`bg-transparent border ${
            !isEmptyFields ? 'border-white' : 'border-red-600'
          } rounded-md px-4 py-2 text-lg`}
          onChange={(e) => setRssLink(e.target.value)}
          onKeyDown={(e) => submitOnKeyDown(e)}
        />
      </div>
      {isEmptyFields && (
        <div className="text-red-600 text-md text-center">Please fill all the fields</div>
      )}
      {!valid && <div className="text-red-600 text-md text-center">Enter a valid RSS Link</div>}
      <button
        onClick={() => submitHandler(keyword, rssLink)}
        className=" hover:text-gray-400 border w-2/5 mx-auto bg-transparent place-content-center border-white text-lg px-5 py-2 rounded-md"
      >
        Add New Keyword
      </button>
    </div>
  )
}
export default AddKeyWordSection
