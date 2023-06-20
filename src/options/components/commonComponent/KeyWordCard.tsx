import { BinIcon } from '../../../util/Icons'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { useRecoilState } from 'recoil'
import { clickedKeyword, isJobs, keywordCount, keywords } from '../../atoms'
import useBgJobs from '../../../customHooks/use-bg-job'
import { useRef } from 'react'
import { keywordProps } from '../../../util/types'

const KeyWordCards: React.FC<{ keywordsCount: any; keys: any }> = ({ keywordsCount, keys }) => {
  const { deleteLocalJobs } = useOpJobs()
  const { deleteLocalKeywordsCount } = useBgJobs()

  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [clickKeyword, setClickKeyword] = useRecoilState(clickedKeyword)
  const divRef = useRef<HTMLDivElement>(null)

  const clickHandler = (key: any) => {
    setIsClicked(!isClick)
    setClickKeyword(key)
    deleteLocalKeywordsCount(key.keyword)
  }

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
                <button onClick={() => deleteLocalJobs(item.keyword)}>
                  <BinIcon
                    fillColor="black"
                    className={'hover:cursor-pointer z-50'}
                    strokeColor="gray"
                  />
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
