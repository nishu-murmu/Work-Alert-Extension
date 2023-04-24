export default function RouteSection({ setRoute }: any) {
  return (
    <div>
      <div className="flex items-center justify-center space-x-5 text-lg mt-5">
        <button
          onClick={() => {
            setRoute('home')
          }}
          className="hover:text-green-500"
        >
          Home
        </button>
        <div>/</div>
        <button
          onClick={() => {
            setRoute('profile')
          }}
          className="hover:text-green-500"
        >
          Profile
        </button>
      </div>
    </div>
  )
}
