import { useRecoilState } from "recoil";
import { proposalIndex, proposals } from "../../atoms";
import { useContent } from "../../../customHooks/use-content";
import { ModalProps } from "../../../util/types";

const Modal = ({
  toggleModal,
  setTogggleModal,
}: ModalProps) => {
  const [allProposals, setAllProposals] = useRecoilState(proposals)
  const [index, setIndex] = useRecoilState(proposalIndex)
  const { deleteProposal } = useContent()

  const deleteHandler = async () => {
    const proposal = allProposals.slice().reverse()[parseInt(index)]
    const res: any = await deleteProposal(proposal)
    if (res) {
      setAllProposals(res)
    }
  }

  return (
    <div>
      {toggleModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-30"></div>

          <div className="modal-container bg-custom-bg w-3/12 rounded-lg shadow-lg z-50">
            <div className="modal-content p-4">
              <h2 className="text-xl font-bold mb-4">Modal Title</h2>
              <p>Are you sure you want to delete the profile?</p>
              <div className="flex gap-x-2">
                <button
                  onClick={() => {
                    setTogggleModal((prev: boolean) => !prev)
                    deleteHandler()
                  }}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Yes
                </button>
                <button onClick={() => setTogggleModal((prev: boolean) => !prev)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal;
