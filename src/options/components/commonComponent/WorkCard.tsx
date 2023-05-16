import { jobsProps, keywordProps } from '../../../util/types'
import { clickedKeyword, selectedFilter } from '../../atoms'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'
import RenderCard from './RenderCard'
import { useEffect, useState } from 'react'

const WorkCards: React.FC = () => {
  const { allJobs, getFilter } = useOpJobs()
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  const [filter, setSelectedFilter] = useRecoilState(selectedFilter)
  let jobs = allJobs.find((keyword: keywordProps) => keyword.keyword === clickKeyword.keyword)?.jobs

  const [sortedJobs, setSortedJobs] = useState<any>([])
  const handleSortJobs = () => {
    // @ts-ignore
    let filteredJobs = [...jobs].sort((a, b) => new Date(b.date) - new Date(a.date))

    if (filter === 'time') {
      // @ts-ignore
      filteredJobs = [...jobs].sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    if (filter === 'budget') {
      //@ts-ignore
      filteredJobs = [...jobs].sort((a, b) => {
        if (a.budget === null || a.budget === undefined) return 1
        if (b.budget === null || b.budget === undefined) return -1
        return (
          parseInt(b?.budget?.replace(/[\n$,]/g, '') || '') -
          parseInt(a?.budget?.replace(/[\n$,]/g, '') || '')
        )
      })
    }
    setSortedJobs(filteredJobs)
  }
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      handleSortJobs()
      async function getfilters() {
        const filter = await getFilter()
      }
      getfilters()
    }
    return () => {}
  }, [jobs, filter])

  return (
    <div className={`grid grid-cols-3 grid-flow-row w-full flex-col gap-y-4 py-2 gap-4`}>
      {sortedJobs &&
        sortedJobs.length > 0 &&
        sortedJobs.map((item: jobsProps, index: any) => (
          <RenderCard item={item} key={index} flag={false} />
        ))}
    </div>
  )
}

export default WorkCards
