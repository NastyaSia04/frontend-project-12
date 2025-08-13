import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const ChannelButton = ({
  channel,                
  currentChannelId,
  onClick,
  onRemove,
  onRename,
}) => {
  const { t } = useTranslation()
  
  console.log('ChannelButton props.channel:', channel)
  const { id, name, removable } = channel
  const displayName = typeof name === 'object' && name !== null ? name.name : name

  const isActive = id === currentChannelId

  const buttonClass = classNames(
    'w-100',
    'rounded-0',
    'text-start',
    'btn',
    {
      'btn-secondary': isActive,
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
          onClick={() => onClick(id)}
        >
          <span className='me-1'>#</span>{displayName}
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
          onClick={() => onClick(id)}
        >
          <span className='me-1'>#</span>{displayName}
        </button>
        <button
          type='button'
          className={toggleClass}
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <span className='visually-hidden'>{t('channels.manageChannel')}</span>
        </button>
        <ul className='dropdown-menu'>
          <li>
            <button className='dropdown-item' type='button' onClick={() => onRemove(id)}>
              {t('channels.remove')}
            </button>
          </li>
          <li>
            <button className='dropdown-item' type='button' onClick={() => onRename(id, displayName)}>
              {t('channels.rename')}
            </button>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default ChannelButton
