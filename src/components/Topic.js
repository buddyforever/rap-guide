import React from 'react'
import { Tag } from '../styles/TagStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Topic = ({ topic, onRemove }) => {
  return (
    <Tag
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1, rotate: '3deg' }}>
      {topic}
      <span className="remove" onClick={onRemove}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </Tag>
  )
}

export default Topic