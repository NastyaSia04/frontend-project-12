import React from 'react'
import { PlusSquare } from 'react-bootstrap-icons'

const AddChannelButton = ({ onclick }) => (
  <button
    type='button'
    className='p-0 text-primary btn btn-group-vertical'
    aria-label='Добавить канал'
    onClick={onclick}
  >
    <PlusSquare size={20} />
    <span className='visually-hidden'>+</span>
  </button>
)

export default AddChannelButton