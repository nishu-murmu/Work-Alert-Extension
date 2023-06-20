import { proposalsProps } from '../../../util/types'

const ProposalFooter: React.FC<{
  fillProposal: (proposal: string | undefined) => void
  proposals: proposalsProps[]
  inbuilt: boolean
  isConnected: boolean
  textarea: string
  closeSlider: () => void
  selectedProfile: string
}> = ({
  fillProposal,
  inbuilt,
  proposals,
  selectedProfile,
  textarea,
  isConnected,
  closeSlider,
}) => {
  return (
    <div
      onClick={() => {
        fillProposal(
          inbuilt
            ? proposals?.find((proposal: proposalsProps) => proposal.profile === selectedProfile)
                ?.prebuilt
            : textarea != ''
            ? textarea
            : '',
        )
        closeSlider()
      }}
      className="px-4 mt-2 w-full"
    >
      {!isConnected && <button className="w-full bg-green-600 py-2 rounded-lg">Fill</button>}
    </div>
  )
}

export default ProposalFooter
