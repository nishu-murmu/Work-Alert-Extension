import React, { useEffect, useState } from 'react'
import { useContent } from '../../customHooks/use-content'
import { QueryProps, proposalsProps } from '../../util/types'
import useGPT from '../../customHooks/use-gpt'
import unescape from 'unescape-js'
import { getGptAnsFromBG } from '../../util'
import { proposalQuery } from '../../util/config'
import ProposalForm from './proposal/ProposalForm'
import ProposalFooter from './proposal/ProposalFooter'

const Proposal: React.FC = () => {
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
    skills: '',
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
    let shadowRoot = document.querySelector('#proposal-slider')?.shadowRoot?.host
    //@ts-ignore
    shadowRoot.style.display = 'none'
    //@ts-ignore
    shadowRoot.style.zIndex = '-1'
  }

  const sendQueryToGPT = async () => {
    const res: any = await getToken()

    if (res && res?.gpt_access_token) {
      if (selectedProfile != '' && selectedProfile != `select_profile`) {
        setIsSelected(false)
        getGptAnsFromBG({
          from: 'Proposal.tsx',
          query: proposalQuery(query),
          type: 'get_client_ans_from_gpt',
          callback: (str: string) => {
            setIsConnected(true)
            setLoading(true)
            if (str.length > 0) setTextArea(unescape(str))
            else {
              setLoading(false)
              setIsConnected(false)
            }
          },
        })
      } else {
        setIsSelected(true)
      }
    } else {
      window.open('https://chat.openai.com/auth/login', '_blank')
    }
  }

  function closeGPTAns() {
    chrome.runtime.sendMessage({ type: 'close_ans' })
    setIsConnected(false)
  }

  const fillProposal = (proposal: string | undefined) => {
    const textarea = document.querySelector('.up-textarea') as HTMLTextAreaElement
    if (proposal)
      textarea.value = `${proposal}\n ${
        proposals?.find((proposal: proposalsProps) => proposal.profile === selectedProfile)
          ?.portfolio
      }`
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
    getToken().then((res: any) => {
      if (!res?.gpt_access_token) {
        callSession()
      }
    })
  }, [])

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
    <>
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
        {!inbuilt && (
          <ProposalForm
            callSession={callSession}
            closeGPTAns={closeGPTAns}
            isConnected={isConnected}
            loading={loading}
            refresh={refresh}
            sendQueryToGPT={sendQueryToGPT}
            setLoading={setLoading}
            textarea={textarea}
            setQuery={setQuery}
          />
        )}

        <ProposalFooter
          closeSlider={closeSlider}
          fillProposal={fillProposal}
          inbuilt={inbuilt}
          isConnected={isConnected}
          proposals={proposals}
          selectedProfile={selectedProfile}
          textarea={textarea}
        />
      </div>
    </>
  )
}

export default Proposal
