import { ChangeEvent } from 'react'
import { QueryProps, proposalsProps } from '../../../util/types'
import { RefreshIcon, SpinnerLoader } from '../../../util/Icons'
import { config } from '../../../util/config'

const ProposalForm: React.FC<{
  refresh: boolean
  isConnected: boolean
  loading: boolean
  isSelected: boolean
  textarea: string
  selectedProfile: string
  setIsInbuilt: React.Dispatch<React.SetStateAction<boolean>>
  proposals: proposalsProps[]
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedProfile: React.Dispatch<React.SetStateAction<string>>
  setQuery: React.Dispatch<React.SetStateAction<QueryProps>>
  openSlider: () => void
  callSession: () => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  sendQueryToGPT: () => Promise<void>
  closeGPTAns: () => void
}> = ({
  refresh,
  setQuery,
  isSelected,
  textarea,
  selectedProfile,
  proposals,
  openSlider,
  setSelectedProfile,
  setIsSelected,
  setIsInbuilt,
  sendQueryToGPT,
  callSession,
  isConnected,
  setLoading,
  loading,
  closeGPTAns,
}) => {
  return (
    <>
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
            {config.proposal_tone.map((tone) => (
              <option key={tone.key} value={tone.key}>
                {tone.value}
              </option>
            ))}
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
            {config.proposal_limit.map((limit) => (
              <option key={limit.key} value={limit.key}>
                {limit.value}
              </option>
            ))}
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
                <span className="py-[2px]">{loading && <SpinnerLoader className="h-4 w-4" />}</span>
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
        {/* <ReactMarkdown className='rounded-lg w-full h-[28rem] overflow-y-auto outline-none border-none text-black bg-white p-3'>{textarea}</ReactMarkdown> */}
      </div>
    </>
  )
}

export default ProposalForm
