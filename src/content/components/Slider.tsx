import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react'
import { CrossIcon } from '../../util/Icons'
import { useContent } from '../../customHooks/use-content'
import { QueryProps, proposalsProps } from '../../util/types'
import useGPT from '../../customHooks/use-gpt'

const Slider: React.FC = () => {
  const { getToken } = useGPT()
  const [selectedProfile, setSelectedProfile] = useState<string>('')
  const [inbuilt, setIsInbuilt] = useState<boolean>(false)
  const [query, setQuery] = useState<QueryProps>({
    profile: '',
    proposal: '',
    name: '',
    experience: '0',
    skills: [],
    portfolio: '',
    clients: [],
    tone: '',
    range_of_words: '',
    optional_info: '',
  })
  const [proposals, setProposals] = useState<proposalsProps[]>([])
  const [refresh, setRefresh] = useState(true)
  const { fillProposal } = useContent()
  const [toggleSlide, setToggleSlide] = useState<boolean>(true)

  const { getProposals } = useContent()

  useEffect(() => {
    getProposals().then((res: any) => {
      setProposals(res)
    })
    callSession()
  }, [])

  useEffect(() => {
    window.postMessage({ toggleSlider: toggleSlide })
  }, [toggleSlide])

  function openSlider() {
    setToggleSlide(true)
  }

  const callSession = () => {
    chrome.runtime.sendMessage({ type: 'session_call' }, (res: any) => {
      if (res?.success == true) {
        setRefresh(false)
      } else {
        setRefresh(true)
      }
    })
  }

  function closeSlider() {
    window.postMessage({ toggleSlider: false })
    window.postMessage({ from: 'FROM_SLIDER' })
  }

  const sendQueryToGPT = async () => {
    const res = await getToken()
    if (res == true) {
      setQuery((prev: QueryProps) => ({
        ...prev,
        ...proposals?.find((profile: any) => profile.profile === selectedProfile),
      }))
    } else {
      window.open('https://chat.openai.com/', '_blank')
      openSlider()
    }
  }

  return (
    <div className="right-2 fixed px-4 py-2 h-screen w-2/6 bg-black text-white">
      <div className="header-section flex w-full ">
        <button onClick={() => closeSlider()}>
          <CrossIcon className="h-8 w-8 my-2 mx-3" strokeColor="green" />
        </button>
        <div className="text-2xl w-full my-4 text-center text-green-600 font-extrabold">
          Write a Proposal
        </div>
      </div>
      <div className="main-section">
        <div className="flex w-full px-4">
          <select
            name="keywords"
            className="py-3 px-2 rounded-lg border-0 w-full cursor-pointer drop-shadow-md duration-300 outline-none border-none text-black"
            id="keywords"
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value)}
          >
            <option value="select_profile">Select Profile</option>
            {proposals &&
              proposals.map((proposal: any) => (
                <option key={proposal.profile} value={proposal.profile}>
                  {proposal.profile}
                </option>
              ))}
          </select>
        </div>
        <div className="py-2 px-4 flex gap-x-4 group">
          <input
            className="group-hover:cursor-pointer"
            type="checkbox"
            id="inbuilt"
            onClick={() => setIsInbuilt((prev) => !prev)}
          />
          <label className="group-hover:cursor-pointer" htmlFor="inbuilt">
            Use the inbuilt proposal.
          </label>
        </div>
        {!inbuilt ? (
          <>
            <div className="grid w-full px-4 my-3 h-10  text-black grid-cols-2 gap-x-6">
              <div>
                <select
                  name="tone"
                  id="tone"
                  className={`py-3 px-2 rounded-lg border-0 w-full cursor-pointer drop-shadow-md duration-300 outline-none border-none`}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setQuery((prev: QueryProps) => ({ ...prev, tone: e.target.value }))
                  }
                >
                  <option value="select">Select Tone</option>
                  <option value="formal">Formal</option>
                  <option value="informal">InFormal</option>
                  <option value="neutral">Neutral</option>
                  <option value="friendly">Friendly</option>
                </select>
              </div>
              <div>
                <select
                  name="limit"
                  id="limit"
                  className={`py-3 px-2 rounded-lg border-0 w-full cursor-pointer drop-shadow-md duration-300 outline-none border-none`}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setQuery((prev: QueryProps) => ({ ...prev, range_of_words: e.target.value }))
                  }
                >
                  <option value="default">Select Range of words</option>
                  <option value="app_50">Approx 50</option>
                  <option value="app_100">Approx 100</option>
                  <option value="app_150">Approx 150</option>
                  <option value="app_200">Approx 200</option>
                </select>
              </div>
            </div>
            <div className="px-4 w-full py-2">
              <label className={` text-white font-medium`} htmlFor="proposal">
                Optional Information:
              </label>
              <textarea
                className={`rounded-lg w-full text-black p-3 outline-none border-none`}
                name="optional"
                id="optional"
                cols={30}
                rows={2}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setQuery((prev: QueryProps) => ({ ...prev, optional_info: e.target.value }))
                }
              ></textarea>
            </div>
            {/* {console.log({ refresh })} */}
            <div className="px-4 w-full flex space-x-3">
              <button
                onClick={() => sendQueryToGPT()}
                className="w-full rounded-lg bg-green-600 text-white py-2"
                id="submit"
              >
                Submit to GPT
              </button>
              {refresh ? (
                <button
                  onClick={() => {
                    setRefresh(false)
                    callSession()
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="w-full px-4 my-2">
          <label className=" text-white font-semibold" htmlFor="proposal">
            Generated Proposal:
          </label>
          <textarea
            name="proposal"
            id="proposal"
            className="rounded-lg w-full text-black outline-none border-none p-3"
            cols={30}
            rows={10}
            defaultValue={
              inbuilt
                ? proposals?.find((profile: any) => profile.profile === selectedProfile)?.proposal
                : ''
            }
          ></textarea>
        </div>
        <div
          onClick={() => {
            fillProposal(
              inbuilt
                ? proposals?.find((profile: any) => profile.profile === selectedProfile)?.proposal
                : '',
            )
          }}
          className="px-4 mt-2 w-full"
        >
          <button className="w-full bg-green-600 py-2 rounded-lg">Fill</button>
        </div>
      </div>
    </div>
  )
}

export default Slider
