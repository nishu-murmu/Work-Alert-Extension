import { jobsProps, keywordProps } from '../../../util/types'
import { clickedKeyword, selectedFilter } from '../../atoms'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'
import RenderCard from './RenderCard'
import { useEffect, useState } from 'react'

const WorkCards: React.FC = () => {
  const { allJobs } = useOpJobs()
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  const [filter, setSelectedFilter] = useRecoilState(selectedFilter)
  let jobs = allJobs.find((keyword: keywordProps) => keyword.keyword === clickKeyword.keyword)?.jobs

  const [sortedJobs, setSortedJobs] = useState<any>([])
  const handleSortJobs = () => {
    // @ts-ignore
    let filteredJobs = [...jobs].sort((a, b) => new Date(b.date) - new Date(a.date))

    setSortedJobs(filteredJobs)
  }
  useEffect(() => {
    if (jobs && jobs.length > 0) handleSortJobs()
    return () => {}
  }, [jobs])

  return (
    <div
      className={`grid grid-cols-3 grid-flow-row w-full flex-col gap-y-4 overflow-y-scroll max-h-[780px] py-2 gap-4`}
    >
      {sortedJobs &&
        sortedJobs.length > 0 &&
        sortedJobs.map((item: jobsProps, index: any) => (
          <RenderCard item={item} key={index} flag={false} />
        ))}
    </div>
  )
}

export default WorkCards