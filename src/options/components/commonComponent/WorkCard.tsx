import { jobsProps, keywordProps } from '../../../util/types'
import { clickedKeyword } from '../../atoms'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'
import RenderCard from './RenderCard'

const WorkCards: React.FC = () => {
  const { allJobs } = useOpJobs()
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  let jobs = allJobs.find((keyword: keywordProps) => keyword.keyword === clickKeyword.keyword)?.jobs
  return (
    <div
      className={`grid grid-cols-3 grid-flow-row w-full flex-col gap-y-4 overflow-y-scroll max-h-[780px] py-2 gap-4`}
    >
      {jobs &&
        jobs.map((item: jobsProps, index) => <RenderCard item={item} key={index} flag={false} />)}
    </div>
  )
}

export default WorkCards
