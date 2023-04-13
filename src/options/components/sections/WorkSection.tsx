import WordCard from '../commonComponent/WorkCard'

const WorkSection: React.FC = () => {
  return (
    <>
      <div className="text-2xl flex justify-center gap-x-6">
        <div>20</div>
        <div>Browser Extension</div>
      </div>
      <div id="keywords" className="w-4/5 mx-auto justify-center">
        <WordCard />
      </div>
    </>
  )
}
export default WorkSection
