import KeyWordCards from '../../commonComponent/KeyWordCard'

const KeyWordsSection: React.FC = () => {
  return (
    <div className="w-[1300px]">
      <div className="text-2xl flex justify-center gap-x-6">
        <div className="text-green-500 mt-3 font-bold">Keywords</div>
      </div>
      <div
        id="keywords"
        className="w-[90%] flex items-center mx-auto overflow-y-hidden justify-center"
      >
        <KeyWordCards />
      </div>
    </div>
  )
}
export default KeyWordsSection
