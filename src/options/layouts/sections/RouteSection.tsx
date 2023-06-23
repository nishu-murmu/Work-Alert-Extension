import { useNavigate } from 'react-router-dom'

function RouteSection({ setRoute }: any) {
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex items-center justify-center space-x-5 text-lg mt-5">
        <button
          onClick={() => {
            navigate('/home')
          }}
          className="hover:text-green-500"
        >
          Home
        </button>
        <div>/</div>
        <button
          onClick={() => {
            navigate('/profile')
          }}
          className="hover:text-green-500"
        >
          Profile
        </button>
        <div>/</div>
        <button
          onClick={() => {
            navigate('/public')
          }}
          className="hover:text-green-500"
        >
          Public
        </button>
      </div>
    </div>
  )
}

export default RouteSection
