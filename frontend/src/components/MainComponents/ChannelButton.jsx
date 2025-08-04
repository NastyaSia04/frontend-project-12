import React from 'react'
import classNames from 'classnames'

const ChannelButton = ({ id, name, currentChannelId,  onClick, removable = false, onRemove, onRename }) => {
  const isActive = id === currentChannelId

  const buttonClass = classNames(
    'w-100',
    'rounded-0',
    'text-start',
    'btn',
    {
      'btn-secondary': isActive, // активный канал
    }
  )

  const toggleClass = classNames(
    'flex-grow-0',
    'dropdown-toggle',
    'dropdown-toggle-split',
    'btn',
    {
      'btn-secondary': isActive,
    }
  )

  if (!removable) {
    return (
      <li className='nav-item w-100'>
        <button
          type='button'
          className={buttonClass}
          onClick={onClick}
        >
          <span className='me-1'>#</span>{name}
        </button>
      </li>
    )
  }

  return (
    <li className='nav-item w-100'>
      <div className='btn-group d-flex'>
        <button
          type='button'
          className={buttonClass}
          onClick={onClick}
        >
          <span className='me-1'>#</span>{name}
        </button>
        <button
          type='button'
          className={toggleClass}
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <span className='visually-hidden'>Управление каналом</span>
        </button>
        <ul className='dropdown-menu'>
          <li>
            <button className='dropdown-item' type='button' onClick={() => onRemove(id)}>
              Удалить
            </button>
          </li>
          <li>
            <button className='dropdown-item' type='button' onClick={() => onRename(id, name)}>
              Переименовать
            </button>
          </li>
        </ul>
      </div>
    </li>
  )  
}

export default ChannelButton
