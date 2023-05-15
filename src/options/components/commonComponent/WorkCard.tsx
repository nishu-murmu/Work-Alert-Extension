import { jobsProps, keywordProps } from '../../../util/types'
import { clickedKeyword, selectedFilter } from '../../atoms'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'
import RenderCard from './RenderCard'
import { useLayoutEffect } from 'react'

const WorkCards: React.FC = () => {
  const { allJobs } = useOpJobs()
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  const [filter, setSelectedFilter] = useRecoilState(selectedFilter)
  let jobs = allJobs.find((keyword: keywordProps) => keyword.keyword === clickKeyword.keyword)?.jobs

  if(filter) {
    //@ts-ignorets
    jobs = jobs?.slice()?.sort((a,b): number => {
      if(filter === "budget") {
        console.log(a?.budget?.replace(/[\n$,]/g,""),b?.budget?.replace(/[\n$,]/g,""))
        return Number(a?.budget?.replace(/[\n$,]/g,"")) - Number(b?.budget?.replace(/[\n$,]/g,""))
      }
      if(filter === "time") {
        //@ts-ignore
        return Date(a.date) - Date(b.date)
      }
      return 0
    })
  }

  useLayoutEffect(() => {
    chrome.storage.local.get(['filter'], (res) => {
      setSelectedFilter(res.filter)
    })
  }, [])
  
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
