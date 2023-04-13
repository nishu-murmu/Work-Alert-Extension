import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { keyWordState } from '../../atoms'

const AddKeyWordSection: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [rssLink, setRssLink] = useState<string>('')
  const [keywordState, setKeywordState] = useRecoilState(keyWordState)
  return (
    <div className="flex justify-center flex-col gap-y-4">
      <div id="btn-group" className="gap-x-4 flex place-content-center">
        <input
          type="text"
          placeholder="Keyword"
          className="bg-transparent border border-white rounded-md px-4 py-2 text-lg"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="UpWork RSS Feed"
          className="bg-transparent px-4 py-2 text-lg border border-white rounded-md"
          onChange={(e) => setRssLink(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          console.log({ keyword, rssLink })
          setKeywordState({ keyword, rssLink })
        }}
        className=" border w-2/5 mx-auto bg-transparent place-content-center border-white text-lg px-5 py-2 rounded-md"
      >
        Add New Keyword
      </button>
    </div>
  )
}
export default AddKeyWordSection
