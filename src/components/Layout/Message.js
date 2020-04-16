import React, { useState } from 'react'
import { Autoreply } from '../../styles/FormStyles'

const Message = ({ message }) => {

  if (!message) return null

  const { type = 'info', title, text } = message;

  return (
    <Autoreply
      className={type}
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
    >
      {title && <h3>{title}</h3>}
      {text}
    </Autoreply>
  )
}

export default Message