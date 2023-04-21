import React, { useState } from 'react'

const MyComponent = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <button
        onClick={() => {
          setCounter((prev) => prev + 1)
        }}
      >
        Counter: {counter}
      </button>
    </div>
  )
}

export default MyComponent
