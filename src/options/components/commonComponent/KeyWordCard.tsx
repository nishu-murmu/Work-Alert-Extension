import { BinIcon } from '../../../util/Icons'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { useRecoilState } from 'recoil'
import { clickedKeyword, isJobs, keywordCount, keywords } from '../../atoms'
import useBgJobs from '../../../customHooks/use-bg-job'
import { useEffect, useRef } from 'react'
import { keywordProps } from '../../../util/types'

const KeyWordCards = () => {
  const { viewJobsHandler, deleteLocalJobs } = useOpJobs()
  const { getBgKeywords, getLocalKeywordsCount, deleteLocalKeywordsCount } = useBgJobs()

  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [clickKeyword, setClickKeyword] = useRecoilState(clickedKeyword)
  const [keywordsCount, setKeywordsCount] = useRecoilState<any[]>(keywordCount)
  const [keys, setKeywords] = useRecoilState(keywords)
  const divRef = useRef<HTMLDivElement>(null)

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
      if (req.key === 'addKeyCount') {
        getLocalKeywordsCount().then((res: any) => {
          setKeywordsCount(res)
        })
      }
      if (req.key === 'deleteKeyCount') {
        getLocalKeywordsCount().then((res: any) => {
          setKeywordsCount(res)
        })
      }
    })
    document.addEventListener("keydown", onKeyDownPress)

    return () => {
      document.removeEventListener("keydown", onKeyDownPress)
    }
  }, [])

  const onKeyDownPress = (e: KeyboardEvent) => {
    console.log("check click")
    if (e.key === 'Enter') {
      console.log(e.key, 'key')
      divRef.current?.click()
    }
  }

  document.querySelectorAll(".flex.justify-between.items-center.gap-x-3.text-lg.border.cursor-pointer").forEach((card) => {
    card.setAttribute("tabIndex", "0")
  })

  return (
    <div className="container py-2 mt-2 rounded-xl w-full space-y-4 flex-col overflow-y-scroll max-h-[calc(100vh-290px)]">
      {keys?.length > 0 ? (
        keys.map((item: keywordProps) => (
          <div
            key={item.keyword}
            ref={divRef}
            onClick={() =>
              clickHandler({
                keyword: item.keyword,
                jobs: item.jobs,
                isClicked: true,
                rssLink: item.rssLink,
              })
            }
            className={`flex justify-between items-center gap-x-3 text-lg border cursor-pointer ${keywordsCount && keywordsCount.find((key: any) => key.keyword === item.keyword)?.count
              ? 'border-green-400'
              : 'border-none'
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
              className="flex items-center justify-between w-full"
            >
              <div className="flex flex-col items-start justify-center">
                <div className="text-sm text-gray-400">Keyword</div>
                <span className="text-lg hover:underline">{item.keyword}</span>
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
        ))
      ) : (
        <div className="text-2xl   mt-6 flex items-center justify-center">
          You haven't added any keywords yet.
        </div>
      )}
    </div>
  )
}
export default KeyWordCards
