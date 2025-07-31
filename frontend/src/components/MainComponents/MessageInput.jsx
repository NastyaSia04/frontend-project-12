import React from 'react'
import { ArrowRightSquare } from 'react-bootstrap-icons'

const MessageInput = ({ message, onChange, onSubmit }) => (
  <div className='mt-auto px-5 py-3'>
    <form onSubmit={onSubmit} className='py-1 border rounded-2' noValidate>
      <div className='input-group has-validation'>
        <input
          name='body'
          placeholder='Введите сообщение...'
          className='border-0 p-0 ps-2 form-control'
          aria-label='Новое сообщение'
          value={message}
          onChange={onChange}
        />
        <button
          type='submit'
          className='btn btn-group-vertical'
          aria-label='Отправить'
          disabled={!message.trim()}
        >
          <ArrowRightSquare size={20} />
          <span className='visually-hidden'>Отправить</span>
        </button>
      </div>
    </form>
  </div>
)

export default MessageInput