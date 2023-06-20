import { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { proposalIndex, proposals } from '../../atoms'
import { BinIcon, PenIcon } from '../../../util/Icons'
import { proposalsProps } from '../../../util/types'
import { useContent } from '../../../customHooks/use-content'
import Modal from '../commonComponent/Modal'
import CreatedProfiles from './profile/CreatedProfiles'
import CreateProfile from './profile/CreateProfile'

export default function ProfileSection() {
  const [values, setValues] = useState<proposalsProps>({
    profile: '',
    proposal: '',
    name: '',
    experience: '0',
    skills: '',
    portfolio: '',
    client: '',
  })
  const [emptyFields, setEmptyFields] = useState({
    profile: false,
    proposal: false,
    name: false,
    experience: false,
    skills: false,
  })
  const [expError, setExpError] = useState(false)
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const [index, setIndex] = useRecoilState(proposalIndex)
  const { setProposal, getProposals } = useContent()
  const [allProposals, setAllProposals] = useRecoilState(proposals)
  const [editFlag, setEditFlag] = useState({ status: false, name: '' })

  const submitHandler = async (e: ChangeEvent<HTMLButtonElement>) => {
    clearState()
    e.preventDefault()
    const { profile, proposal, name, skills } = values

    if (!profile || !proposal || !name || expError) {
      expError
        ? setEmptyFields((prevState) => ({
            ...prevState,
            profile: !profile,
            proposal: !proposal,
            name: !name,
            skills: !skills,
          }))
        : setEmptyFields((prevState) => ({
            ...prevState,
            profile: !profile,
            proposal: !proposal,
            name: !name,
          }))
      return
    } else {
      setValues({
        profile: '',
        proposal: '',
        skills: '',
        name: '',
        experience: '',
        portfolio: '',
        prebuilt: '',
      })
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
        <CreateProfile
          values={values}
          clearState={clearState}
          submitHandler={submitHandler}
          editFlag={editFlag}
          emptyFields={emptyFields}
          setValues={setValues}
          expError={expError}
        />
        <CreatedProfiles
          allProposals={allProposals}
          setEditFlag={setEditFlag}
          setIndex={setIndex}
          setToggleModal={setToggleModal}
          setValues={setValues}
          toggleModal={toggleModal}
        />
      </div>
    </div>
  )
}
