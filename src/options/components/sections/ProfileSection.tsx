import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { proposals } from '../../atoms'

export default function ProfileSection() {
  const [values, setValues] = useState({ skill: '', proposal: '' })
  const [emptyFields, setEmptyFields] = useState({ skill: false, proposal: false })
  const { setProposal, getProposals } = useOpJobs()
  const [allProposals, setAllProposals] = useRecoilState(proposals)

  const submitHandler = async (e: any) => {
    e.preventDefault()
    if (!values.skill && !values.proposal && values.skill.trim() === '') {
      setEmptyFields((prevState) => ({
        skill: !prevState.skill,
        proposal: !prevState.proposal,
      }))
      return
    } else if (!values.skill || values.skill.trim() === '') {
      setEmptyFields((prevState) => ({ ...prevState, skill: !prevState.skill }))
      return
    } else if (!values.proposal) {
      setEmptyFields((prevState) => ({ ...prevState, proposal: !prevState.proposal }))
      return
    } else {
      setValues({ skill: '', proposal: '' })
      setProposal([values]).then((res) => {
        getProposals().then((data: any) => {
          setAllProposals(data)
        })
      })
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="container">
        <form className="flex flex-col space-y-9 mt-8 items-center">
          <input
            type="text"
            placeholder="Enter skill"
            value={values.skill}
            onBlur={() =>
              setEmptyFields({
                skill: false,
                proposal: false,
              })
            }
            className={`bg-transparent border ${
              !emptyFields?.skill ? 'border-white' : 'border-red-600'
            } rounded-md px-4 py-2 text-lg`}
            onChange={(e) => setValues((prev: any) => ({ ...prev, skill: e.target.value }))}
            pattern="[a-zA-Z]+"
          />
          <textarea
            rows={4}
            cols={90}
            placeholder="Enter proposal description"
            onBlur={() =>
              setEmptyFields({
                skill: false,
                proposal: false,
              })
            }
            value={values.proposal}
            className={`bg-transparent border ${
              !emptyFields?.proposal ? 'border-white' : 'border-red-600'
            } rounded-md px-4 py-2 text-lg`}
            onChange={(e) => setValues((prev: any) => ({ ...prev, proposal: e.target.value }))}
          />
          <button
            type="submit"
            onClick={(e) => submitHandler(e)}
            className=" hover:text-gray-400 border w-2/5 mx-auto bg-transparent place-content-center border-white text-lg px-5 py-2 rounded-md"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  )
}
