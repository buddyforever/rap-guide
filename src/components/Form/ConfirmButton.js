import React, { useState } from 'react'
import { Button } from '../../styles/FormStyles'
import { motion } from 'framer-motion'

const ConfirmButton = ({ handleClick = null, handleConfirm, children }) => {

  const [confirm, setConfirm] = useState(false)

  function toggleConfirm() {
    if (handleClick) {
      handleClick(!confirm)
    }
    setConfirm(prevState => !prevState)
  }

  return (
    <>
      {!confirm &&
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button onClick={toggleConfirm}>
            {children}
          </Button>
        </motion.span>
      }
      {confirm &&
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <strong style={{ color: '#DD3333' }}>Are you sure you?</strong>
          <Button className="secondary" style={{ margin: '0 0.5rem' }} onClick={handleConfirm}>Yes</Button>
          <Button style={{ margin: '0 0.5rem' }} onClick={toggleConfirm}>No</Button>
        </motion.span>
      }
    </>
  )
}

export default ConfirmButton