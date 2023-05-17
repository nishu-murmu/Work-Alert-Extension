import React, { ChangeEvent, useEffect, useState } from 'react'
import { CrossIcon, RefreshIcon, SpinnerLoader } from '../../util/Icons'
import { useContent } from '../../customHooks/use-content'
import { QueryProps, proposalsProps } from '../../util/types'
import useGPT from '../../customHooks/use-gpt'
import unescape from 'unescape-js'

const Slider: React.FC = () => {
  const { getToken, deleteToken } = useGPT()
  const [selectedProfile, setSelectedProfile] = useState<string>('')
  const [inbuilt, setIsInbuilt] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [textarea, setTextArea] = useState<string>('')
  const [query, setQuery] = useState<QueryProps>({
    profile: '',
    proposal: '',
    name: '',
    experience: '0',
    skills: [],
    portfolio: '',
    client: '',
    tone: '',
    job_description: '',
    range_of_words: '',
    optional_info: '',
  })
  const [proposals, setProposals] = useState<proposalsProps[]>([])
  const [refresh, setRefresh] = useState(false)
  const { getProposals } = useContent()
  const [toggleSlide, setToggleSlide] = useState<boolean>(true)

  function openSlider() {
    setToggleSlide(true)
  }

  const callSession = () => {
    chrome.runtime.sendMessage({ type: 'session_call' }, (res: any) => {
      if (res && res?.success === true) {
        setRefresh(false)
      } else {
        deleteToken()
        setRefresh(true)
      }
    })
  }
  function closeSlider() {
    let shadowRoot = document.querySelector("#root-id")?.shadowRoot
    //@ts-ignore
    shadowRoot.querySelector("#render").style.display = "none"
  }

  const sendQueryToGPT = async () => {
    const res: any = await getToken()

    if (res && res?.gpt_access_token) {
      if (selectedProfile != '' && selectedProfile != `select_profile`) {
        setIsSelected(false)
        setLoading(true)
        chrome.runtime.sendMessage({ type: 'get_ans', query })
      } else {
        setIsSelected(true)
      }
    } else {
      window.open('https://chat.openai.com/auth/login', '_blank')
      openSlider()
    }
  }

  function closeGPTAns() {
    chrome.runtime.sendMessage({ type: 'close_ans' })
    setIsConnected(false)
  }

  const fillProposal = (proposal: string | undefined) => {
    const textarea = document.querySelector('.up-textarea') as HTMLTextAreaElement
    if (proposal) textarea.value = proposal
    const event = new Event('input', { bubbles: true })
    textarea.dispatchEvent(event)
  }

  useEffect(() => {
    //@ts-ignore
    const label: any = document.querySelector('.up-truncation-label')
    document.querySelector('.up-truncation-label') && label.click()

    getProposals().then((res: any) => {
      setProposals(res)
    })
    callSession()
    chrome.runtime.onMessage.addListener((req) => {
      if (req.error && req.error == true) {
        setLoading(false)
      } else if (req.type === 'generated_ans') {
        setIsConnected(req.isClosed)

        let result = req.data.slice(req.data.indexOf('parts'), req.data.indexOf('status'))
        result = result?.slice(10, result.length - 6)
        if (result !== '') setTextArea(unescape(result))
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    window.postMessage({ toggleSlider: toggleSlide })
  }, [toggleSlide])

  useEffect(() => {
    setQuery((prev: QueryProps) => ({
      ...prev,
      ...proposals?.find((profile: any) => profile.profile === selectedProfile),
    }))
    const up: any = document.querySelector('#up-truncation-1')
    //@ts-ignore
    setQuery((prev: QueryProps) => ({
      ...prev,
      job_description: up?.innerHTML as HTMLSpanElement,
    }))
  }, [selectedProfile])

  return (
    <div className={`right-2 fixed px-4 py-2 h-screen w-2/6 bg-black text-white`}>
      <div className="header-section flex w-full ">
        <button onClick={() => closeSlider()}>
          <CrossIcon className="h-8 w-8 my-2 mx-3" strokeColor="green" />
        </button>
        <div className="text-2xl w-full my-4 text-center text-green-600 font-extrabold">
          Write a Proposal
        </div>
      </div>

      <div className="main-section">
        <div className="flex w-full px-4 flex-col">
          <select
            name="keywords"
            className={`py-3 px-2 rounded-lg ${
              isSelected ? 'border-1 border-red-600' : 'border-0'
            } w-full cursor-pointer drop-shadow-md duration-300 outline-none border-none text-black`}
            id="keywords"
            value={selectedProfile}
            onChange={(e) => {
              setSelectedProfile(e.target.value)
              setIsSelected(false)
            }}
          >
            <option value="select_profile">Select Profile</option>
            {proposals &&
              proposals.map((proposal: any) => (
                <option key={proposal.profile} value={proposal.profile}>
                  {proposal.profile}
                </option>
              ))}
          </select>
          {isSelected && <span className="text-red-400 pt-1 pl-4">Please select a profile</span>}
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
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setQuery((prev: QueryProps) => ({ ...prev, client: e.target.value }))
                }}
                type="text"
                id="client"
                className="rounded-lg w-full text-black p-3 outline-none border-none"
                placeholder="Enter Client:"
              />
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
            <div className="px-4 w-full flex gap-x-2">
              {refresh ? (
                <>
                  <button
                    onClick={() => {
                      window.open('https://chat.openai.com/auth/login', '_blank')
                      openSlider()
                    }}
                    className="w-full rounded-lg bg-green-600 text-white py-2 flex flex-row justify-center gap-x-3"
                    id="submit"
                  >
                    Login to ChatGPT
                  </button>
                  <button
                    onClick={() => {
                      callSession()
                    }}
                  >
                    <RefreshIcon />
                  </button>
                </>
              ) : (
                <>
                  {!isConnected && (
                    <button
                      onClick={() => {
                        loading && setLoading(false)
                        !loading && sendQueryToGPT()
                      }}
                      disabled={loading}
                      className="w-full rounded-lg bg-green-600 text-white py-2 flex flex-row justify-center gap-x-3"
                      id="submit"
                    >
                      {!loading && (
                        <span className="py-[-3px]">
                          {isConnected ? 'generating answer ...' : 'Generate Proposal'}
                        </span>
                      )}
                      <span className="py-[2px]">
                        {loading && <SpinnerLoader className="h-4 w-4" />}
                      </span>
                    </button>
                  )}
                </>
              )}

              {isConnected && (
                <button
                  onClick={() => {
                    closeGPTAns()
                    setLoading(false)
                  }}
                  className="bg-custom-bg rounded-lg py-2 px-3 text-white w-full"
                >
                  Stop generating
                </button>
              )}
            </div>
            <div className="w-full px-4 my-2">
              <label className=" text-white font-semibold" htmlFor="proposal">
                Generated Proposal:
              </label>
              <textarea
                name="proposal"
                id="proposal"
                className="rounded-lg w-full text-black outline-none border-none p-3"
                cols={30}
                rows={13}
                defaultValue={textarea}
              ></textarea>
            </div>
          </>
        ) : (
          <></>
        )}

        <div
          onClick={() => {
            fillProposal(
              inbuilt
                ? proposals?.find(
                    (proposal: proposalsProps) => proposal.profile === selectedProfile,
                  )?.proposal
                : textarea != ''
                ? textarea
                : '',
            )
            closeSlider()
          }}
          className="px-4 mt-2 w-full"
        >
          {!isConnected && <button className="w-full bg-green-600 py-2 rounded-lg">Fill</button>}
        </div>
      </div>
    </div>
  )
}

export default Slider
