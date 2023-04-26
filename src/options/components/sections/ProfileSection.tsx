import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { proposals } from '../../atoms'
import { BinIcon, PenIcon } from '../../../util/Icons'
import { proposalsProps } from '../../../util/types'

export default function ProfileSection() {
  const [values, setValues] = useState<proposalsProps>({ profile: "", proposal: "", name: "", experience:0, skills:[], portfolio: "", clients: [] })
  const [emptyFields, setEmptyFields] = useState({ profile: false, proposal: false })
  const { setProposal, getProposals } = useOpJobs()
  const [allProposals, setAllProposals] = useRecoilState(proposals)

  const submitHandler = async (e: any) => {
    e.preventDefault()
    if (!values.profile && !values.proposal && values.profile.trim() === '') {
      setEmptyFields((prevState) => ({
        profile: !prevState.profile,
        proposal: !prevState.proposal,
      }))
      return
    } else if (!values.profile || values.profile.trim() === '') {
      setEmptyFields((prevState) => ({ ...prevState, profile: !prevState.profile }))
      return
    } else if (!values.proposal) {
      setEmptyFields((prevState) => ({ ...prevState, proposal: !prevState.proposal }))
      return
    } else {
      setValues({ profile: '', proposal: '', skills: [], name: '', experience: 0, portfolio: "" })
      document.querySelectorAll("input").forEach((ele: any) => {
        ele.value = ""
      })
      setProposal([values]).then((res) => {
        getProposals().then((data: any) => {
          setAllProposals(data)
        })
      })
    }
  }

  useEffect(() => {
    getProposals().then((res: any) => {
      setAllProposals(res)
    })
  }, [])

  return (
    <div className="flex items-center justify-center">
      <div className="container flex">
        <form className="flex flex-col space-y-9 mt-8 items-center">
          <div className="text-2xl font-bold">Create New Profile</div>
          <div className="flex gap-x-4">
            <input
              type="text"
              placeholder="Enter Profile"
              // onBlur={() =>
              //   setEmptyFields({
              //     profile: false,
              //     proposal: false,
              //   })
              // }
              className={`bg-transparent border ${
                !emptyFields?.profile ? 'border-white' : 'border-red-600'
              } rounded-md px-3 py-2 text-lg`}
              onChange={(e) => setValues((prev: any) => ({ ...prev, profile: e.target.value }))}
              pattern="[a-zA-Z]+"
            />
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setValues((prev: any) => ({ ...prev, name: e.target.value }))}
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
            />
          </div>
          <div className="flex gap-x-4">
            <input
              type="number"
              placeholder="Enter Experience"
              onChange={(e) => setValues((prev: any) => ({ ...prev, experience: e.target.value }))}
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
            />
            <input
              type="text"
              placeholder="Enter Skills"
              onChange={(e) =>
                setValues((prev: any) => ({ ...prev, skills: e.target.value.trim().split(/[ ,]+/g) }))
              }
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
            />
          </div>
          <div className="flex gap-x-4">
            <input
              type="text"
              placeholder="Porfolio Link"
              onChange={(e) => setValues((prev: any) => ({ ...prev, portfolio: e.target.value }))}
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
            />
            <input
              type="text"
              placeholder="Enter Clients"
              onChange={(e) => setValues((prev: any) => ({ ...prev, clients: e.target.value.trim().split(/[ ,]+/g) }))}
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
            />
          </div>
          <textarea
            rows={4}
            value={values.proposal}
            placeholder="Enter proposal description"
          //   onBlur={() =>
          //     setEmptyFields({
          //       profile: false,
          //       proposal: false,
          //     })
          // }
            className={`bg-transparent border ${
              !emptyFields?.proposal ? 'border-white' : 'border-red-600'
            } rounded-md px-4 py-2 text-lg w-[33rem]`}
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
        <div className="w-full font-bold flex flex-col space-y-9 mt-8 items-center">
          <div className="text-2xl">Created Profiles</div>
          <div className="w-10/12 gap-y-2 flex flex-col">
            {allProposals.map((proposal: any, index) => (
              <div
                key={index}
                className="bg-custom-bg h-16 py-4 px-4 flex rounded-md justify-between"
              >
                <div className="text-lg">{proposal.profile}</div>
                <div className="flex gap-x-4">
                  <span className="p-1 bg-gray-700 rounded-md hover:cursor-pointer">
                    <PenIcon />
                  </span>
                  <span className="p-1 bg-gray-700 rounded-md hover:cursor-pointer">
                    <BinIcon fillColor="white" strokeColor="black" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
