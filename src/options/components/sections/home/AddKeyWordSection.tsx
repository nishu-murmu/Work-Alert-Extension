import { useRef, useState } from 'react'
import useOpJobs from '../../../../customHooks/use-option-jobs'
import useBgJobs from '../../../../customHooks/use-bg-job'
import { keywordProps } from '../../../../util/types'
import CustomInput from '../../commonComponent/core/CustomInput'

const AddKeyWordSection: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [rssLink, setRssLink] = useState<string>('')
  const [valid, setIsValid] = useState<boolean>(true)
  const [included, setIncluded] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [emptyFields, setEmptyFields] = useState<{
    emptyKeyword: boolean
    emptyRsl: boolean
  }>({
    emptyKeyword: false,
    emptyRsl: false,
  })
  const { setLocalJobs, setLocalKeywords } = useOpJobs()
  const { getBgKeywords } = useBgJobs()

  const submitHandler = async (keyword: string, rssLink: string) => {
    const regex = new RegExp('^https://www.upwork.com/ab/feed/jobs/rss?')
    const keywords = await getBgKeywords()
    if (!keyword && !rssLink && keyword.trim() === '') {
      setEmptyFields((prevState) => ({ ...prevState, emptyRsl: !prevState.emptyRsl }))
      setEmptyFields((prevState) => ({ ...prevState, emptyKeyword: !prevState.emptyKeyword }))
      return
    } else if (!keyword || keyword.trim() === '')
      setEmptyFields((prevState) => ({ ...prevState, emptyKeyword: !prevState.emptyRsl }))
    else if (!rssLink)
      setEmptyFields((prevState) => ({ ...prevState, emptyRsl: !prevState.emptyKeyword }))
    else if (!regex.test(rssLink)) {
      setIsValid(false)
    } else if (keywords && keywords.map((item: keywordProps) => item.keyword).includes(keyword)) {
      setIncluded(true)
    } else if (keywords && keywords.map((item: keywordProps) => item.rssLink).includes(rssLink)) {
      setIncluded(true)
    } else {
      setKeyword('')
      setRssLink('')
      inputRef.current?.focus()
      setIsValid(true)
      setEmptyFields({ emptyKeyword: false, emptyRsl: false })

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
    setEmptyFields({ emptyKeyword: false, emptyRsl: false })
    setIncluded(false)
    setIsValid(true)
  }

  return (
    <div className="container">
      <div className=" flex justify-center items-center flex-col gap-y-4">
        <div id="btn-group" className="gap-x-4 flex place-content-center">
          <CustomInput
            id="Keyword"
            name="Keyword"
            type="text"
            ref={inputRef}
            placeholder="Keyword"
            onFocus={() => clearState()}
            value={keyword}
            className={`bg-transparent border ${
              !emptyFields?.emptyKeyword ? 'border-white' : 'border-red-600'
            } rounded-md px-4 py-2 text-lg`}
            onChange={(e) => setKeyword(e.target.value)}
            pattern="[a-zA-Z0-9]+"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => submitOnKeyDown(e)}
          />
          <CustomInput
            type="text"
            id="Rss"
            name="Rss"
            placeholder="UpWork RSS Feed"
            value={rssLink}
            onFocus={() => clearState()}
            className={`bg-transparent border ${
              !emptyFields?.emptyRsl ? 'border-white' : 'border-red-600'
            } rounded-md px-4 py-2 text-lg`}
            onChange={(e) => setRssLink(e.target.value)}
            onKeyDown={(e) => submitOnKeyDown(e)}
            onBlur={() => clearState()}
          />
        </div>
        {(emptyFields?.emptyRsl || emptyFields?.emptyKeyword) && (
          <div className="text-red-600 text-md text-center">Please fill all the fields</div>
        )}
        {!valid && <div className="text-red-600 text-md text-center">Enter a valid RSS Link</div>}
        {included && (
          <div className="text-red-600 text-md text-center">
            Keyword and RssLink should be unique.
          </div>
        )}
        <button
          onClick={() => submitHandler(keyword, rssLink)}
          className=" hover:text-gray-400 border w-[57%] mx-auto bg-transparent place-content-center border-white text-lg px-5 py-2 rounded-md"
        >
          Add New Keyword
        </button>
      </div>
    </div>
  )
}
export default AddKeyWordSection
