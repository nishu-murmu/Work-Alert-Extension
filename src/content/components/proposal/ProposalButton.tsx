import React from 'react'

const ProprosalButton: React.FC = () => {
  function toggleSlider() {
    let shadowRoot = document.querySelector('#proposal-slider')?.shadowRoot?.host
    //@ts-ignore
    shadowRoot.style.display = 'flex'
    //@ts-ignore
    shadowRoot.style.zIndex = '99999999'
  }

  return (
    <button
      onClick={() => toggleSlider()}
      style={{
        backgroundColor: 'green',
        padding: '12px 16px',
        borderRadius: '10px',
        color: 'white',
        border: 'transparent',
        cursor: 'pointer',
      }}
    >
      Write Proposal
    </button>
  )
}

export default ProprosalButton
