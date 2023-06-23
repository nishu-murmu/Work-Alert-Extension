import { useEffect, useLayoutEffect } from 'react'
import KeyWordCards from '../../components/commonComponent/KeyWordCard'
import useBgJobs from '../../../customHooks/use-bg-job'
import { useRecoilState } from 'recoil'
import { keywordCount, keywords, userState } from '../../atoms'
import { proposalsProps } from '../../../util/types'

const KeyWordsSection: React.FC = () => {
  const { getBgKeywords, getLocalKeywordsCount } = useBgJobs()
  const [keys, setKeywords] = useRecoilState(keywords)
  const [user, setUser] = useRecoilState(userState)

  const [keywordsCount, setKeywordsCount] = useRecoilState<any[]>(keywordCount)

  useEffect(() => {
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

  useEffect(() => {
    getBgKeywords().then((res: any) => {
      console.log('check', res)
      const result = res.filter((item: proposalsProps) => {
        if (item.user_id === user?.user?.id) {
          return item
        }
      })
      console.log({ result })
      setKeywords(result)
    })
  }, [])

  return (
    <div className="w-[1300px]">
      <div className={`text-2xl flex justify-center gap-x-[22rem]`}>
        <div className="text-green-500 mt-3 py-1 font-bold">Keywords</div>
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
