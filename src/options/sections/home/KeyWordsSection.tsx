import { useEffect, useLayoutEffect, useState } from 'react'
import KeyWordCards from '../../components/commonComponent/KeyWordCard'
import useBgJobs from '../../../customHooks/use-bg-job'
import { useRecoilState } from 'recoil'
import { keywordCount, keywords, userState } from '../../atoms'
import { proposalsProps } from '../../../util/types'
import useOpJobs from '../../../customHooks/use-option-jobs'

const KeyWordsSection: React.FC = () => {
  const { getLocalKeywordsCount } = useBgJobs()
  const { getJobs } = useOpJobs()
  const [keys, setKeywords] = useRecoilState(keywords)
  const [keywordType, setKeywordType] = useState<string>('created')

  const [keywordsCount, setKeywordsCount] = useRecoilState<any[]>(keywordCount)

  // useEffect(() => {
  //   getLocalKeywordsCount().then((res: any) => {
  //     setKeywordsCount(res)
  //   })

  //   chrome.runtime.onMessage.addListener((req) => {
  //     if (req.key === 'addKeyCount') {
  //       getLocalKeywordsCount().then((res: any) => {
  //         setKeywordsCount(res)
  //       })
  //     }
  //     if (req.key === 'deleteKeyCount') {
  //       getLocalKeywordsCount().then((res: any) => {
  //         setKeywordsCount(res)
  //       })
  //     }
  //   })
  // }, [])

  useEffect(() => {
    getJobs().then((res: any) => {
      console.log('check', res)
      res.filter((item: proposalsProps) => {
        if (keywordType === 'created') {
          setKeywords(res.filter((item: any) => !item.status))
        } else {
          setKeywords(res.filter((item: any) => item.status))
        }
      })
    })
  }, [keywordType])

  return (
    <div className="w-[1300px]">
      <div className={`text-xl flex justify-center gap-x-6`}>
        <div
          onClick={() => setKeywordType('created')}
          className={`hover:text-green-500 cursor-pointer mt-3 py-1 font-bold ${
            keywordType === 'created' && 'text-green-500'
          }`}
        >
          Keywords
        </div>
        <div
          onClick={() => setKeywordType('deleted')}
          className={`hover:text-green-500 cursor-pointer mt-3 py-1 font-bold ${
            keywordType === 'deleted' && 'text-green-500'
          }`}
        >
          Deleted Keywords
        </div>
      </div>
      <div
        id="keywords"
        className="w-[90%] flex items-center mx-auto overflow-y-hidden justify-center"
      >
        <KeyWordCards keywordsCount={keywordsCount} />
      </div>
    </div>
  )
}
export default KeyWordsSection
