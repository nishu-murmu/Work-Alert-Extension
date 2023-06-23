import { useEffect, useState } from 'react'
import { BinIcon, PenIcon } from '../../../util/Icons'
import { proposalsProps } from '../../../util/types'
import CustomModal from '../../components/commonComponent/core/CustomModal'
import { useContent } from '../../../customHooks/use-content'
import { proposals } from '../../atoms'
import { useRecoilState } from 'recoil'
import RestoreIcon from '@heroicons/react/24/outline/ArrowLeftCircleIcon'

const CreatedProfiles: React.FC<{
  index: string
  setIndex: any
  setValues: any
  setEditFlag: any
}> = ({ index, setIndex, setValues, setEditFlag }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileType, setProfileType] = useState<string>('created')
  const [allProposals, setAllProposals] = useRecoilState(proposals)
  const { deleteProposal, getProposals, restoreProposal } = useContent()
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  async function confirm(isDeleted: boolean) {
    setLoading(true)
    const proposal = isDeleted
      ? allProposals
          .slice()
          .reverse()
          .filter((item: any) => !item.status)[parseInt(index)]
      : allProposals
          .slice()
          .reverse()
          .filter((item: any) => item.status)[parseInt(index)]
    const res: any = isDeleted ? await deleteProposal(proposal) : restoreProposal(proposal)
    if (res) {
      setAllProposals(res)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProposals().then((res: any) => {
      if (profileType === 'created') {
        setAllProposals(res.filter((item: any) => !item.status))
      } else {
        setAllProposals(res.filter((item: any) => item.status))
      }
    })
  }, [profileType])

  return (
    <div className="w-full font-bold flex flex-col space-y-9 mt-8 items-center">
      <div className="text-xl flex gap-x-2">
        <button
          onClick={() => setProfileType('created')}
          className={`${profileType === 'created' && 'text-green-500'} hover:text-green-500`}
        >
          Created Profiles
        </button>
        <div>/</div>
        <button
          onClick={() => setProfileType('deleted')}
          className={`${profileType === 'deleted' && 'text-green-500'} hover:text-green-500`}
        >
          Delete Profiles
        </button>
      </div>
      <div className="w-10/12 gap-y-2 flex flex-col">
        {allProposals.length > 0 ? (
          <>
            {allProposals
              ?.slice()
              .reverse()
              .map((proposal: any, index) => (
                <div
                  key={index}
                  id={index.toString()}
                  className="bg-custom-bg h-16 py-4 px-4 flex rounded-md justify-between"
                >
                  <div className="text-lg">{proposal.profile}</div>
                  <div className="flex gap-x-4">
                    {!proposal.status && (
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
                    )}
                    <button
                      onClick={() => {
                        setIndex(index.toString())
                        openModal()
                      }}
                      className="p-1 bg-gray-700 rounded-md"
                    >
                      {!proposal.status ? (
                        <BinIcon fillColor="white" strokeColor="black" />
                      ) : (
                        <RestoreIcon fill="white" stroke="black" className="h-5 w-5" />
                      )}
                    </button>
                    <CustomModal
                      confirm={() => confirm(!proposal.status)}
                      loading={loading}
                      closeModal={closeModal}
                      isOpen={isOpen}
                      modal_title={`${!proposal.status ? 'Delete Profile' : 'Restore Profile'}`}
                      modal_description={`Are you sure you want to ${
                        !proposal.status ? 'delete' : 'restore'
                      } this Profile?`}
                    />
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
  )
}

export default CreatedProfiles
