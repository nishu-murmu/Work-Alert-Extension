import { useRecoilState } from 'recoil'
import { keyWordList } from '../../atoms'
import KeyWordCards from '../commonComponent/KeyWordCard'
import { useEffect } from 'react'

const KeyWordsSection: React.FC = () => {
  return (
    <>
      <div className="text-2xl flex justify-center gap-x-6">
        <div>Keywords</div>
      </div>
      <div id="keywords" className="w-4/5 mx-auto justify-center">
        <KeyWordCards />
      </div>
    </>
  )
}
export default KeyWordsSection