import React from 'react'


const ProprosalButton: React.FC = () => {

  function toggleSlider() {
    let shadowRoot = document.querySelector("#root-id")?.shadowRoot
    //@ts-ignore
    shadowRoot.querySelector("#render").style.display = "block"
  }

  return (
    <button onClick={() => toggleSlider()} style={{backgroundColor: "green", padding: "12px 16px", borderRadius: "10px", color: 'white', border: 'transparent', cursor: 'pointer'}}>
      Write Proposal
    </button>
  )
}

export default ProprosalButton
