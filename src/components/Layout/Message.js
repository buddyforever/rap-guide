import React, { useState } from 'react'

const Message = ({ message }) => {

  if (!message) return null

  const { type = 'info', title, text } = message;

  return (
    <>
      {title && <h3>{title}</h3>}
      {text}
    </>
  )
}

export default Message