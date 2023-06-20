import { useEffect, useState } from 'react'
import KeyWordCards from '../../commonComponent/KeyWordCard'
import useBgJobs from '../../../../customHooks/use-bg-job'
import { useRecoilState } from 'recoil'
import { keywordCount, keywords } from '../../../atoms'

const KeyWordsSection: React.FC = () => {
  const { getBgKeywords, getLocalKeywordsCount } = useBgJobs()
  const [keys, setKeywords] = useRecoilState(keywords)

  const [keywordsCount, setKeywordsCount] = useRecoilState<any[]>(keywordCount)

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
  }, [])

  return (
    <div className="w-[1300px]">
      <div
        className={`text-2xl flex justify-center ${
          keywordsCount.length > 0 ? 'gap-x-[22rem]' : ''
        }`}
      >
        <div className="text-green-500 mt-3 py-1 font-bold">Keywords</div>
        {keywordsCount.length > 0 && (
          <button className="text-green-500 mt-3 font-bold px-6 py-1 border-white border rounded-md">
            Export
          </button>
        )}
      </div>
      <div
        id="keywords"
        className="w-[90%] flex items-center mx-auto overflow-y-hidden justify-center"
      >
        <KeyWordCards keywordsCount={keywordsCount} keys={keys} />
      </div>
    </div>
  )
}
export default KeyWordsSection
