import { useRef, useState } from 'react'
import useOpJobs from '../../../customHooks/use-option-jobs'
import useBgJobs from '../../../customHooks/use-bg-job'
import { keywordProps } from '../../../util/types'
import CustomInput from '../../components/commonComponent/core/CustomInput'
import { useSupabase } from '../../../customHooks/use-supabase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { userState } from '../../atoms'
import { useRecoilState } from 'recoil'

const AddKeyWordSection: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [rssLink, setRssLink] = useState<string>('')
  const [valid, setIsValid] = useState<boolean>(true)
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [included, setIncluded] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { createKeyword } = useSupabase()
  const [emptyFields, setEmptyFields] = useState<{
    emptyKeyword: boolean
    emptyRsl: boolean
  }>({
    emptyKeyword: false,
    emptyRsl: false,
  })
  const { setLocalJobs, setJobs } = useOpJobs()
  const { getJobs } = useOpJobs()
  const [user, setUser] = useRecoilState(userState)

  const submitHandler = async (keyword: string, rssLink: string) => {
    const regex = new RegExp('^https://www.upwork.com/ab/feed/jobs/rss?')
    const keywords = await getJobs()
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
    } else {
      setKeyword('')
      setRssLink('')
      inputRef.current?.focus()
      setIsValid(true)
      setEmptyFields({ emptyKeyword: false, emptyRsl: false })

      setJobs({ keyword, rssLink, user_id: user?.id, isPublic }).then((res: boolean) => {
        if (res) {
          toast('Keyword Saved!')
        }
      })
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
        <div>
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            onChange={() => setIsPublic((prev) => !prev)}
          />
          <label htmlFor="isPublic" className="text-lg px-4 py-2 cursor-pointer">
            Want to make it Public?
          </label>
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}
export default AddKeyWordSection
