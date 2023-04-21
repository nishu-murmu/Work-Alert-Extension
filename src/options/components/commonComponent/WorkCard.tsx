import { useState } from 'react'
import { timeRange, truncate } from '../../../util'
import { jobsProps, keywordProps } from '../../../util/types'
import { clickedKeyword } from '../../atoms'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'
import RenderCard from './RenderCard'

const WorkCards: React.FC = () => {
  const [readMoreClicked, setReadMoreClicked] = useState(false)
  const { allJobs } = useOpJobs()
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  const [clickedValue, setClickedValue] = useState<string | undefined>('')
  let jobs = allJobs.find((keyword: keywordProps) => keyword.keyword === clickKeyword.keyword)?.jobs

  return (
    <div
      className={`grid grid-cols-3 grid-flow-row w-full flex-col gap-y-4 overflow-y-scroll max-h-[780px] py-2 gap-4`}
    >
      {jobs &&
        jobs.map((item: jobsProps,index) => (
          <RenderCard item={item} key={index} />
        ))}
    </div>
  )
}

export default WorkCards
