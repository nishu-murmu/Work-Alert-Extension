import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { proposals } from '../../atoms'
import { BinIcon, PenIcon } from '../../../util/Icons'
import { proposalsProps } from '../../../util/types'

export default function ProfileSection() {
  const [values, setValues] = useState<proposalsProps>({
    profile: '',
    proposal: '',
    name: '',
    experience: 0,
    skills: [],
    portfolio: '',
    clients: [],
  })
  const [emptyFields, setEmptyFields] = useState({ profile: false, proposal: false })
  const { setProposal, getProposals } = useOpJobs()
  const [allProposals, setAllProposals] = useRecoilState(proposals)
  const [editFlag, setEditFlag] = useState({ status: false, name: '' })

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
      setValues({ profile: '', proposal: '', skills: [], name: '', experience: 0, portfolio: '' })
      document.querySelectorAll('input').forEach((ele: any) => {
        ele.value = ''
      })

      const res: any = await setProposal([values], editFlag.name)

      if (res) {
        setEditFlag({
          name: '',
          status: false,
        })

        getProposals().then((data: any) => {
          setAllProposals(data)
        })
      }
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
          <div className="text-2xl font-bold">
            {editFlag.status ? `Edit ${editFlag.name} Profile` : 'Create New Profile'}
          </div>
          <div className="flex gap-x-4">
            <input
              type="text"
              placeholder="Enter Profile"
              value={values.profile}
              className={`bg-transparent border ${
                !emptyFields?.profile ? 'border-white' : 'border-red-600'
              } rounded-md px-3 py-2 text-lg`}
              onChange={(e) => setValues((prev: any) => ({ ...prev, profile: e.target.value }))}
              pattern="[a-zA-Z]+"
            />
            <input
              type="text"
              placeholder="Enter Name"
              value={values.name}
              onChange={(e) => setValues((prev: any) => ({ ...prev, name: e.target.value }))}
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
            />
          </div>
          <div className="flex gap-x-4">
            <input
              type="number"
              value={values.experience}
              placeholder="Enter Experience"
              onChange={(e) => setValues((prev: any) => ({ ...prev, experience: e.target.value }))}
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
            />
            <input
              type="text"
              placeholder="Enter Skills"
              value={values.skills}
              onChange={(e) =>
                setValues((prev: any) => ({
                  ...prev,
                  skills: e.target.value.trim().split(/[ ,]+/g),
                }))
              }
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
            />
          </div>
          <div className="flex gap-x-4">
            <input
              type="text"
              placeholder="Porfolio Link"
              value={values.portfolio}
              onChange={(e) => setValues((prev: any) => ({ ...prev, portfolio: e.target.value }))}
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
            />
            <input
              type="text"
              placeholder="Enter Clients"
              value={values.clients}
              onChange={(e) =>
                setValues((prev: any) => ({
                  ...prev,
                  clients: e.target.value.trim().split(/[ ,]+/g),
                }))
              }
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
            />
          </div>
          <textarea
            rows={4}
            value={values.proposal}
            placeholder="Enter proposal description"
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
            {editFlag.status ? `Edit Profile` : 'Create Profile'}
          </button>
        </form>
        <div className="w-full font-bold flex flex-col space-y-9 mt-8 items-center">
          <div className="text-2xl">Created Profiles</div>
          <div className="w-10/12 gap-y-2 flex flex-col">
            {allProposals?.map((proposal: any, index) => (
              <div
                key={index}
                className="bg-custom-bg h-16 py-4 px-4 flex rounded-md justify-between"
              >
                <div className="text-lg">{proposal.profile}</div>
                <div className="flex gap-x-4">
                  <button
                    onClick={() => {
                      setValues(proposal)
                      setEditFlag({
                        name: proposal.profile,
                        status: true,
                      })
                    }}
                    className="p-1 bg-gray-700 rounded-md"
                  >
                    <PenIcon />
                  </button>
                  <button className="p-1 bg-gray-700 rounded-md">
                    <BinIcon fillColor="white" strokeColor="black" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
