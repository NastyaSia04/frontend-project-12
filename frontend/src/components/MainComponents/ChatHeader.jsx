import React from 'react'

const ChatHeader = ({ channelName, messageCount }) => (
  <div className='bg-light mb-4 p-3 shadow-sm small'>
    <p className='m-0'><b># {channelName}</b></p>
    <span className='text-muted'>{messageCount} сообщений</span>
  </div>
)

export default ChatHeader