import { BinIcon } from '../../../util/Icons'
import useOpJobs from '../../../customHooks/useOptionJobs'

const KeyWordCard = () => {
  const { allJobs } = useOpJobs()

  return (
    <div className="flex flex-col gap-y-4 overflow-y-scroll h-[440px] py-2">
      {allJobs &&
        allJobs.map((item) => (
          <div
            key={item.keyword}
            className=" border border-green-400 hover:cursor-pointer rounded-md p-8 m-2"
          >
            <div className="text-sm pl-12 text-gray-400">Keyword</div>
            <div className="flex justify-between text-lg">
              <div className="flex gap-x-6">
                <BinIcon fillColor="black" strokeColor="gray" />
                <span className="text-lg hover:underline hover:cursor-pointer">{item.keyword}</span>
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
