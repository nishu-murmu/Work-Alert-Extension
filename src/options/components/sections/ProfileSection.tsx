import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { proposals } from '../../atoms'
import { BinIcon, PenIcon } from '../../../util/Icons'
import { proposalsProps } from '../../../util/types'
import { useContent } from '../../../customHooks/use-content'

export default function ProfileSection() {
  const [values, setValues] = useState<proposalsProps>({
    profile: '',
    proposal: '',
    name: '',
    experience: '0',
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
  const [expError, setExpError] = useState(false)
  const { setProposal, getProposals, deleteProposal } = useContent()
  const [allProposals, setAllProposals] = useRecoilState(proposals)
  const [editFlag, setEditFlag] = useState({ status: false, name: '' })

  const deleteHandler = async (proposal: any) => {
    const res: any = await deleteProposal(proposal)
    if (res) {
      setAllProposals(res)
    }
  }
  const submitHandler = async (e: any) => {
    clearState()
    e.preventDefault()
    const { profile, proposal, name, experience, skills } = values

    if (!profile || !proposal || !name || skills.length === 0 || expError || !experience) {
      expError
        ? setEmptyFields((prevState) => ({
            ...prevState,
            profile: !profile,
            proposal: !proposal,
            name: !name,
            experience: true,
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
    } else {
      setValues({ profile: '', proposal: '', skills: [], name: '', experience: '', portfolio: '' })
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
  }

  const clearState = () => {
    setEmptyFields({
      profile: false,
      proposal: false,
      name: false,
      experience: false,
      skills: false,
    })
    // setExpError(false)
  }

  useEffect(() => {
    getProposals().then((res: any) => {
      setAllProposals(res)
    })
  }, [])

  return (
    <div className="flex items-center justify-center">
      <div className="container flex">
        <form className="flex flex-col mt-8 items-center">
          <div className="text-2xl font-bold">
            {editFlag.status ? `Edit ${editFlag.name} Profile` : 'Create New Profile'}
          </div>
          <div className="flex gap-x-4 mt-9">
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
          <div className="flex gap-x-4 mt-9">
            <input
              type="text"
              id="experience-input"
              value={values.experience}
              pattern="[0-9]+"
              placeholder="Enter Experience"
              onBlur={() => clearState()}
              onChange={(e) => {
                const input = e.target.value
                const value = parseInt(input)
                if (isNaN(value)) {
                  setExpError(true)
                  setValues((prev: any) => ({ ...prev, experience: e.target.value }))
                } else {
                  setExpError(false)
                  setValues((prev: any) => ({ ...prev, experience: value }))
                }
              }}
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
          {expError && (
            <div className="flex items-center justify-between w-full rounded-md px-7 text-red-600 py-2 text-md">
              <div> Enter valid experience </div>
              <div></div>
            </div>
          )}

          <div className={`flex gap-x-4 ${expError ? ' mt-2' : 'mt-9'}`}>
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
            className={`bg-transparent border mt-9 ${
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
            (emptyFields?.experience && !expError) ||
            emptyFields?.skills) && (
            <div className="text-red-600 text-md mt-3 text-center">Please fill all the fields</div>
          )}
          <button
            type="submit"
            onClick={(e) => submitHandler(e)}
            className={`${
              emptyFields?.profile ||
              emptyFields?.proposal ||
              emptyFields?.name ||
              (emptyFields?.experience && !expError) ||
              emptyFields?.skills
                ? 'mt-7'
                : 'mt-9'
            } hover:text-gray-400 border w-2/5 mx-auto bg-transparent place-content-center border-white text-lg px-5 py-2 rounded-md`}
          >
            {editFlag.status ? `Edit Profile` : 'Create Profile'}
          </button>
        </form>
        <div className="w-full font-bold flex flex-col space-y-9 mt-8 items-center">
          <div className="text-2xl">Created Profiles</div>
          <div className="w-10/12 gap-y-2 flex flex-col">
            {allProposals.length > 0 ? (
              <>
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
                      <button
                        onClick={() => {
                          deleteHandler(proposal)
                        }}
                        className="p-1 bg-gray-700 rounded-md"
                      >
                        <BinIcon fillColor="white" strokeColor="black" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-xl text-green-500 flex items-center justify-center">
                You haven't added any Proposals yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
