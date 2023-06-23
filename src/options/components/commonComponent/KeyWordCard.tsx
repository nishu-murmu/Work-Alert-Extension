import { BinIcon } from '../../../util/Icons'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { useRecoilState } from 'recoil'
import { clickedKeyword, isJobs, keywords } from '../../atoms'
import { useEffect, useRef, useState } from 'react'
import { keywordProps } from '../../../util/types'
import RestoreIcon from '@heroicons/react/24/outline/ArrowLeftCircleIcon'
import CustomModal from './core/CustomModal'

const KeyWordCards: React.FC<{ keywordsCount: any }> = ({ keywordsCount }) => {
  const { deleteJobs, restoreJobs } = useOpJobs()
  const [keys, setKeywords] = useRecoilState(keywords)
  const [loading, setLoading] = useState(false)
  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [isOpen, setIsOpen] = useState(false)
  const [clickKeyword, setClickKeyword] = useRecoilState(clickedKeyword)
  const divRef = useRef<HTMLDivElement>(null)

  const clickHandler = (key: any) => {
    setIsClicked(!isClick)
    setClickKeyword(key)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  async function confirm(keyword: keywordProps, isDeleted?: boolean) {
    setLoading(true)
    const res: any = isDeleted ? await deleteJobs(keyword) : restoreJobs(keyword)
    if (res) {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log({ keys })
  }, [keys])

  return (
    <div className="container py-2 mt-2 rounded-xl w-full space-y-4 flex-col">
      <div className="flex flex-wrap items-center justify-center gap-[1.8rem] overflow-y-auto">
        {keys?.length ? (
          keys.map((item: keywordProps, index: number) => {
            return (
              <div
                key={item.keyword}
                ref={divRef}
                tabIndex={index}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter') {
                    clickHandler({
                      keyword: item.keyword,
                      jobs: item.jobs,
                      isClicked: true,
                      rssLink: item.rssLink,
                    })
                  }
                }}
                className={`flex max-w-[490px] w-full justify-between items-center gap-x-3 text-lg border cursor-pointer ${
                  keywordsCount &&
                  keywordsCount.find((key: any) => key.keyword === item.keyword)?.count
                    ? 'border-green-400'
                    : 'border-transparent'
                } bg-custom-bg rounded-md p-4`}
              >
                <button onClick={() => openModal()}>
                  {!item.status ? (
                    <BinIcon
                      fillColor="black"
                      className={'hover:cursor-pointer z-50'}
                      strokeColor="gray"
                    />
                  ) : (
                    <RestoreIcon fill="white" stroke="black" className="h-6 w-6" />
                  )}
                </button>
                <div
                  onClick={() =>
                    clickHandler({
                      keyword: item.keyword,
                      jobs: item.jobs,
                      isClicked: true,
                      rssLink: item.rssLink,
                    })
                  }
                  className="flex items-center justify-between w-full "
                >
                  <div className="flex flex-col items-start justify-center">
                    <div className="text-sm text-gray-400">Keyword</div>
                    <span className="text-lg line-clamp-1 hover:underline">{item.keyword}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    {keywordsCount &&
                      keywordsCount.find((key: any) => key.keyword === item.keyword)?.count && (
                        <span className="text-lg text-black py-1 px-3 bg-green-500 rounded-full">
                          {keywordsCount &&
                            keywordsCount.find((key: any) => key.keyword === item.keyword)?.count}
                        </span>
                      )}
                  </div>
                </div>
                <CustomModal
                  confirm={() => confirm(item, item.status)}
                  loading={loading}
                  closeModal={closeModal}
                  openModal={openModal}
                  isOpen={isOpen}
                  modal_title={`${!item.status ? 'Delete Keyword' : 'Restore Keyword'}`}
                  modal_description={`Are you sure you want to ${
                    !item.status ? 'delete' : 'restore'
                  } this Keyword?`}
                />
              </div>
            )
          })
        ) : (
          <div className="text-2xl   mt-6 flex items-center justify-center">
            You haven't added any keywords yet.
          </div>
        )}
      </div>
    </div>
  )
}
export default KeyWordCards
