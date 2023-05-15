import { jobsProps, keywordProps } from '../../../util/types'
import { clickedKeyword } from '../../atoms'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'
import RenderCard from './RenderCard'
import { useEffect, useState } from 'react'

const WorkCards: React.FC = () => {
  const { allJobs } = useOpJobs()
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
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
const ss = [
  {
    budget: '$1,000\n',
    date: '2023-05-15T04:36:00.000Z',
  },
  {
    budget: null,
    date: '2023-05-15T02:39:00.000Z',
  },
  {
    budget: null,
    date: '2023-05-15T00:16:00.000Z',
  },
  {
    budget: '$90\n',
    date: '2023-05-14T16:43:00.000Z',
  },
  {
    budget: '$1,000\n',
    date: '2023-05-14T14:36:00.000Z',
  },
  {
    budget: null,
    date: '2023-05-14T14:19:00.000Z',
  },
  {
    budget: '$250\n',
    date: '2023-04-12T05:13:00.000Z',
  },
  {
    budget: null,
    date: '2023-04-17T18:23:00.000Z',
  },
  {
    budget: '$100\n',
    date: '2023-05-14T00:01:00.000Z',
  },
  {
    budget: '$500\n',
    date: '2023-05-13T18:14:00.000Z',
  },
]
