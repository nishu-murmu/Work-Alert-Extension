import { useEffect, useState } from 'react'
import KeyWordCards from '../../components/commonComponent/KeyWordCard'
import { useRecoilState } from 'recoil'
import { keywordTypeAtom, keywordsAtom } from '../../atoms'
import useOpJobs from '../../../customHooks/use-option-jobs'

const KeyWordsSection: React.FC = () => {
  const { getJobs } = useOpJobs()
  const [keywords, setKeywords] = useRecoilState(keywordsAtom)
  const [loading, setLoading] = useState(false)
  const [keywordType, setKeywordType] = useRecoilState(keywordTypeAtom)

  useEffect(() => {
    setLoading(true)
    getJobs().then((res: any) => {
      if (res.length > 0) {
        if (keywordType === 'created') {
          setKeywords(res?.filter((item: any) => !item.status))
        }
        if (keywordType === 'deleted') {
          setKeywords(res?.filter((item: any) => item.status))
        }
        setLoading(false)
      }
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
        <KeyWordCards keywordsLoading={loading} />
      </div>
    </div>
  )
}
export default KeyWordsSection
