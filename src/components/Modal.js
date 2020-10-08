import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Modal = ({ children }) => {
  return (
    <StyledModal
      className="modal"
    >
      <motion.article
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ delay: 0.5 }}
        className="modal__content">
        {children}
      </motion.article>
    </StyledModal>
  )
}

const StyledModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;

  .modal__content {
    max-width: 100ch;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 40px 0 rgba(0,0,0,0.1),
              0 0 20px 0 rgba(0,0,0,0.2),
              0 0 10px 0 rgba(0,0,0,0.2),
              0 0 5px 0 rgba(0,0,0,0.4);
  }
`
