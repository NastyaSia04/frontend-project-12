import React from 'react'

const ChannelButton = ({ name, onClick }) => (
  <li className='nav-item w-100'>
    <button
      type='button'
      className='w-100 rounded-0 text-start btn btn-secondary'
      onClick={onClick}
    >
      <span className='me-1'>#</span>{name}
    </button>
  </li>
)

export default ChannelButton