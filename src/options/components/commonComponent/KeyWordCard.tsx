import { BinIcon } from '../../../util/Icons'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { useRecoilState } from 'recoil'
import { clickedKeyword, isJobs, keywordsAtom, proposalIndex } from '../../atoms'
import { useEffect, useRef, useState } from 'react'
import { keywordProps } from '../../../util/types'
import RestoreIcon from '@heroicons/react/24/outline/ArrowLeftCircleIcon'
import CustomModal from './core/CustomModal'
import SkeletonLoader from '../../../content/components/Loaders/Skeleton'

const KeyWordCards: React.FC<{ keywordsLoading: boolean }> = ({ keywordsLoading }) => {
  const { deleteJobs, restoreJobs, getJobs } = useOpJobs()
  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [keywords, setKeywords] = useRecoilState(keywordsAtom)
  const [clickKeyword, setClickKeyword] = useRecoilState(clickedKeyword)
  const [index, setIndex] = useRecoilState(proposalIndex)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
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

  async function confirm(isDeleted?: boolean) {
    setLoading(true)
    const keyword = isDeleted
      ? keywords.slice().filter((item: any) => item.status)[parseInt(index)]
      : keywords.slice().filter((item: any) => !item.status)[parseInt(index)]
    const res: any = !isDeleted ? await deleteJobs(keyword) : restoreJobs(keyword)
    if (res) {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="container py-2 mt-2 rounded-xl w-full space-y-4 flex-col">
      <div className="flex flex-wrap items-center justify-center gap-[1.8rem] overflow-y-auto">
        {keywordsLoading ? (
          <SkeletonLoader
            className="flex gap-x-4"
            gridCount={2}
            boxLoaderHeight="82px"
            boxLoaderWidth="500px"
          />
        ) : keywords?.length ? (
          keywords.map((item: keywordProps, index: number) => {
            return (
              <div
                key={item.keyword}
                id={index.toString()}
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
                className={`flex max-w-[490px] w-full justify-between items-center gap-x-3 text-lg border cursor-pointer bg-custom-bg rounded-md p-4`}
              >
                <button
                  onClick={() => {
                    setIndex(index.toString())
                    openModal()
                  }}
                >
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
                <CustomModal
                  confirm={() => confirm(item.status)}
                  loading={loading}
                  id={item.keyword}
                  closeModal={closeModal}
                  isOpen={isOpen}
                  modal_title={`${!item.status ? 'Delete Keyword' : 'Restore Keyword'}`}
                  modal_description={`Are you sure you want to ${
                    !item.status ? 'delete' : 'restore'
                  } this Keyword?`}
                />
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
                    {/* {keywordsCount &&
                      keywordsCount.find((key: any) => key.keyword === item.keyword)?.count && (
                        <span className="text-lg text-black py-1 px-3 bg-green-500 rounded-full">
                          {keywordsCount &&
                            keywordsCount.find((key: any) => key.keyword === item.keyword)?.count}
                        </span>
                      )} */}
                  </div>
                </div>
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
