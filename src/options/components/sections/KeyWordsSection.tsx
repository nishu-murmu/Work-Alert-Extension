import KeyWordCard from '../commonComponent/KeyWordCard'

const KeyWordsSection: React.FC = () => {
  return (
    <>
      <div className="text-2xl flex justify-center gap-x-6">
        <div>20</div>
        <div>Browser Extension</div>
      </div>
      <div id="keywords" className="w-4/5 mx-auto justify-center">
        <KeyWordCard />
      </div>
    </>
  )
}
export default KeyWordsSection
