import React, { useState } from 'react';

import { Message as MessageComponent } from './'

export const useMessage = (initialState = null) => {
  const [message, setMessage] = useState(initialState);

  const Message = () => {
    if (!message) return null
    return (
      <MessageComponent {...message} />
    )
  }

  return [
    message,
    setMessage,
    Message
  ]
}
