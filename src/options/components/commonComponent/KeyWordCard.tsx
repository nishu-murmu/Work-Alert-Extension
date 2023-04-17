import { BinIcon } from '../../../util/Icons'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { RecoilState, useRecoilState } from 'recoil'
import { clickedKeyword, isJobs } from '../../atoms'
import { useEffect } from 'react'

const KeyWordCard = () => {
  const { allJobs, setLocalJobs, getLocalJobs } = useOpJobs()
  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  const clickHandler = (key: any) => {
    setIsClicked((prev) => !prev)
    setIsClickKeyword(key)
  }
  console.log(allJobs, 'all jobs')

  return (
    <div className="flex flex-col gap-y-4 overflow-y-scroll h-[440px] py-2">
      {allJobs &&
        allJobs.map((item) => (
          <div key={item.keyword} className=" border border-green-400 rounded-md p-8 m-2">
            <div className="text-sm pl-12 text-gray-400">Keyword</div>
            <div className="flex justify-between text-lg">
              <div className="flex gap-x-6">
                <span onClick={() => setLocalJobs(item.keyword)}>
                  <BinIcon
                    fillColor="black"
                    className={'hover:cursor-pointer'}
                    strokeColor="gray"
                  />
                </span>
                <span
                  className="text-lg hover:underline hover:cursor-pointer"
                  onClick={() => clickHandler({ keyword: item.keyword, jobs: item.jobs })}
                >
                  {item.keyword}
                </span>
              </div>
              <span className="text-lg text-black py-2 px-3 bg-green-500 rounded-full">
                {item.jobs && item.jobs?.length}
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}
export default KeyWordCard
