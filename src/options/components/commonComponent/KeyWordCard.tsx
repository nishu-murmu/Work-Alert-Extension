import { BinIcon } from '../../../util/Icons'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { useRecoilState } from 'recoil'
import { clickedKeyword, isJobs, keywordCount, keywords } from '../../atoms'
import useBgJobs from '../../../customHooks/use-bg-job'
import { useEffect } from 'react'
import { keywordProps } from '../../../util/types'

const KeyWordCards = () => {
  const { allJobs, setLocalJobs, viewJobsHandler, deleteLocalJobs } = useOpJobs()
  const { getBgKeywords, getLocalKeywordsCount, deleteLocalKeywordsCount } = useBgJobs()

  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [clickKeyword, setClickKeyword] = useRecoilState(clickedKeyword)
  const [keywordsCount, setKeywordsCount] = useRecoilState<any[]>(keywordCount)
  const [keys, setKeywords] = useRecoilState(keywords)

  const clickHandler = (key: any) => {
    setIsClicked(!isClick)
    setClickKeyword(key)
    viewJobsHandler(key)
    deleteLocalKeywordsCount(key.keyword)
  }

  useEffect(() => {
    getBgKeywords().then((res: any) => setKeywords(res))

    getLocalKeywordsCount().then((res: any) => {
      setKeywordsCount(res)
    })

    chrome.runtime.onMessage.addListener((req) => {
      if (req.type === 'addKeyCount') {
        getLocalKeywordsCount().then((res: any) => {
          setKeywordsCount(res)
        })
      }
      if (req.type === 'deleteKeyCount') {
        getLocalKeywordsCount().then((res: any) => {
          setKeywordsCount(res)
        })
      }
    })
  }, [])

  return (
    <div className=" w-full flex-col gap-y-4 overflow-y-scroll max-h-[560px] py-2">
      {keys?.length > 0 ? (
        keys.map((item: keywordProps) => (
          <div
            onClick={() =>
              clickHandler({
                keyword: item.keyword,
                jobs: item.jobs,
                isClicked: true,
                rssLink: item.rssLink,
              })
            }
            key={item.keyword}
            className={`border cursor-pointer ${
              keywordsCount.find((key: any) => key.keyword === item.keyword)?.count
                ? 'border-green-400'
                : 'border-none'
            } bg-custom-bg rounded-md p-4 m-2`}
          >
            <div className="flex justify-between">
              <div>
                <div className="text-sm pl-12 text-gray-400">Keyword</div>
                <div className="flex justify-between text-lg">
                  <div className="flex gap-x-6">
                    <span onClick={() => deleteLocalJobs(item.keyword)}>
                      <BinIcon
                        fillColor="black"
                        className={'hover:cursor-pointer'}
                        strokeColor="gray"
                      />
                    </span>
                    <span className="text-lg hover:underline">{item.keyword}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                {keywordsCount.find((key: any) => key.keyword === item.keyword)?.count && (
                  <span className="text-lg text-black py-1 px-3 bg-green-500 rounded-full">
                    {keywordsCount.find((key: any) => key.keyword === item.keyword)?.count}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-2xl   mt-6 flex items-center justify-center">
          You haven't added any keywords yet.{' '}
        </div>
      )}
    </div>
  )
}
export default KeyWordCards
