import React, { useEffect, useState } from 'react'
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
  const [emptyFields, setEmptyFields] = useState({
    profile: false,
    proposal: false,
    name: false,
    experience: false,
    skills: false,
  })
  const { setProposal, getProposals } = useOpJobs()
  const [allProposals, setAllProposals] = useRecoilState(proposals)
  const [editFlag, setEditFlag] = useState({ status: false, name: '' })

  const submitHandler = async (e: any) => {
    clearState()
    e.preventDefault()
    const { profile, proposal, name, experience, skills } = values
    if (!profile || !proposal || !name || skills.length === 0 || !experience) {
      experience === 0
        ? setEmptyFields((prevState) => ({
            ...prevState,
            profile: !profile,
            proposal: !proposal,
            name: !name,
            skills: !skills.length,
          }))
        : setEmptyFields((prevState) => ({
            ...prevState,
            profile: !profile,
            proposal: !proposal,
            name: !name,
            experience: !experience,
            skills: !skills.length,
          }))
      return
    }

    setValues({ profile: '', proposal: '', skills: [], name: '', experience: 0, portfolio: '' })
    document.querySelectorAll('input').forEach((ele: any) => {
      ele.value = ''
    })

    const res: any = await setProposal([values], editFlag.name)

    if (res) {
      setEditFlag({ name: '', status: false })

      getProposals().then((data: any) => {
        setAllProposals(data)
      })
    }
  }

  const clearState = () => {
    setEmptyFields({
      profile: false,
      proposal: false,
      name: false,
      experience: false,
      skills: false,
    })
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
              onBlur={() => clearState()}
              onClickCapture={() => clearState()}
            />
            <input
              type="text"
              placeholder="Enter Name"
              value={values.name}
              onChange={(e) => setValues((prev: any) => ({ ...prev, name: e.target.value }))}
              className={`bg-transparent border ${
                !emptyFields?.name ? 'border-white' : 'border-red-600'
              } rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
              onBlur={() => clearState()}
              onClickCapture={() => clearState()}
            />
          </div>
          <div className="flex gap-x-4">
            <input
              type="number"
              value={values.experience}
              placeholder="Enter Experience"
              onBlur={() => clearState()}
              onChange={(e) => setValues((prev: any) => ({ ...prev, experience: e.target.value }))}
              className={`bg-transparent border ${
                !emptyFields?.experience ? 'border-white' : 'border-red-600'
              } rounded-md px-3 py-2 text-lg`}
              onClickCapture={() => clearState()}
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
              onBlur={() => clearState()}
              className={`bg-transparent border ${
                !emptyFields?.skills ? 'border-white' : 'border-red-600'
              } rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
              onClickCapture={() => clearState()}
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
              onBlur={() => clearState()}
              onClickCapture={() => clearState()}
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
              onBlur={() => clearState()}
              className={`bg-transparent border rounded-md px-3 py-2 text-lg`}
              pattern="[a-zA-Z]+"
              onClickCapture={() => clearState()}
            />
          </div>
          <textarea
            rows={4}
            value={values.proposal}
            placeholder="Enter proposal description"
            className={`bg-transparent border ${
              !emptyFields?.proposal ? 'border-white' : 'border-red-600'
            } rounded-md px-4 py-2 text-lg w-[33rem]`}
            onBlur={() => clearState()}
            onChange={(e) => {
              setValues((prev: any) => ({ ...prev, proposal: e.target.value }))
            }}
            onClickCapture={() => clearState()}
          />
          {(emptyFields?.profile ||
            emptyFields?.proposal ||
            emptyFields?.name ||
            emptyFields?.experience ||
            emptyFields?.skills) && (
            <div className="text-red-600 text-md text-center">Please fill all the fields</div>
          )}
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
