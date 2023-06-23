import { useState } from 'react'
import { BinIcon, PenIcon } from '../../../util/Icons'
import { proposalsProps } from '../../../util/types'
import CustomModal from '../../components/commonComponent/core/CustomModal'
import { useContent } from '../../../customHooks/use-content'
import { proposals } from '../../atoms'
import { useRecoilState } from 'recoil'

const CreatedProfiles: React.FC<{
  setIndex: any
  setValues: any
  setEditFlag: any
  setToggleModal: any
  toggleModal: boolean
  allProposals: proposalsProps[]
}> = ({ setIndex, setValues, setEditFlag, setToggleModal }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allProposals, setAllProposals] = useRecoilState(proposals)
  const { deleteProposal } = useContent()
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function confirm(index: string) {
    setLoading(true)
    deleteHandler(index)
  }
  const deleteHandler = async (index: string) => {
    const proposal = allProposals.slice().reverse()[parseInt(index)]
    const res: any = await deleteProposal(proposal)
    if (res) {
      setAllProposals(res)
      setLoading(false)
    }
  }
  return (
    <div className="w-full font-bold flex flex-col space-y-9 mt-8 items-center">
      <div className="text-2xl">Created Profiles</div>
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
                        setToggleModal(true)
                        setIndex(index.toString())
                        openModal()
                      }}
                      className="p-1 bg-gray-700 rounded-md"
                    >
                      <BinIcon fillColor="white" strokeColor="black" />
                    </button>
                    <CustomModal
                      confirm={() => confirm(index.toString())}
                      loading={loading}
                      closeModal={closeModal}
                      openModal={openModal}
                      isOpen={isOpen}
                      modal_title="Delete Profile"
                      modal_description="Are you sure you want to delete this Profile?"
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
