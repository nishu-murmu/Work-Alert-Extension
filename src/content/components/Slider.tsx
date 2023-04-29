import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CrossIcon } from '../../util/Icons'
import { useContent } from '../../customHooks/use-content'
import { QueryProps, proposalsProps } from '../../util/types'

const Slider: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<string>('')
  const [inbuilt, setIsInbuilt] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [query, setQuery] = useState<QueryProps>({
    profile: '',
    proposal: '',
    name: '',
    experience: '0',
    skills: [],
    portfolio: '',
    clients: [],
    tone: "",
    range_of_words:"",
    optional_info: "",
    job_description:''
  })
  const [proposals, setProposals] = useState<proposalsProps[]>([])
  const { fillProposal } = useContent()

  const { getProposals } = useContent()
  
  useEffect(() => {
    //@ts-ignore
    document.querySelector('.up-truncation-label') && document.querySelector('.up-truncation-label').click()

    getProposals().then((res: any) => {
      setProposals(res)
    })
    chrome.runtime.sendMessage({ type: 'session_call' })

    chrome.runtime.onMessage.addListener((req) => {
      if (req.type === 'generated_ans') {
        console.log((req.data).slice(7).trim(), "string")
        //@ts-ignore
        // textareaRef.current?.innerText = req.data.mesage
      }
    })
  }, [])

  function closeSlider() {
    window.postMessage({ toggleSlider: false })
    window.postMessage({ from: 'FROM_SLIDER' })
  }

  function sendQueryToGPT() {
    chrome.runtime.sendMessage({type:"get_ans", query})
  }

  useEffect(() => {
    console.log({query, proposals})
  }, [query, proposals])

  useEffect(() => {
    setQuery((prev: QueryProps) => ({
      ...prev,
      ...proposals?.find((profile: any) => profile.profile === selectedProfile),
    }))

    //@ts-ignore
    setQuery((prev: QueryProps)=>({...prev,job_description:document.querySelector('#up-truncation-1')?.innerHTML as HTMLSpanElement}))
  }, [selectedProfile])

  return (
    <div className="right-2 fixed px-4 py-2 h-screen w-2/6 bg-black text-white">
      <div className="header-section flex">
        <button onClick={() => closeSlider()}>
          <CrossIcon className="mt-2 h-12 w-12 m-2" strokeColor="green" />
        </button>
        <h2 className="text-3xl m-4 text-green-600 font-extrabold">Write a Proposal</h2>
      </div>
      <div className="main-section">
        <div className="flex w-full px-4">
          <select
            name="keywords"
            className=" w-full py-3 px-2 hover:cursor-pointer rounded-lg text-black"
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
            <div className="grid w-full px-4 my-3 h-10 text-black grid-cols-2 gap-x-2">
              <select
                name="tone"
                id="tone"
                className={`py-3 px-2 rounded-lg hover:cursor-pointer`}
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
              <select
                name="limit"
                id="limit"
                className={`py-3 px-2 rounded-lg hover:cursor-pointer`}
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
            <div className="px-4 w-full py-2">
              <label className={` text-white font-medium`} htmlFor="proposal">
                Optional Information:
              </label>
              <textarea
                className={`rounded-lg w-full text-black p-3`}
                name="optional"
                id="optional"
                cols={30}
                rows={2}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setQuery((prev: QueryProps) => ({ ...prev, optional_info: e.target.value }))
                }
              ></textarea>
            </div>
            <div className="px-4 w-full">
              <button
                onClick={() => sendQueryToGPT()}
                className="w-full rounded-lg bg-green-700 text-white py-2"
                id="submit"
              >
                Submit to GPT
              </button>
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
            className="rounded-lg w-full text-black p-3"
            cols={30}
            rows={10}
            ref={textareaRef}
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
