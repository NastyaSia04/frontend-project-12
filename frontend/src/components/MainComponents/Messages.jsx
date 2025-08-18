import { useEffect, useRef } from 'react'

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [messages])

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages.map(message => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          :
          {' '}
          {message.body}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages
