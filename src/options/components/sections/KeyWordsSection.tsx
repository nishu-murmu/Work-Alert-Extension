import KeyWordCards from '../commonComponent/KeyWordCard'

const KeyWordsSection: React.FC = () => {
  return (
    <>
      <div className="text-2xl flex justify-center gap-x-6">
        <div>Keywords</div>
      </div>
      <div id="keywords" className="flex items-center justify-center">
        <KeyWordCards />
      </div>
    </>
  )
}
export default KeyWordsSection
