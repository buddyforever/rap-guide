import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { UserContext } from '../../context/UserContext'
import { StyledMainContent } from '../../styles/PageStyles.js'
import Header from './Header'
import Footer from './Footer'
import { AnimalChooser } from '../AnimalChooser'
import { Modal } from '../Modal'

export const Layout = ({ children }) => {

  /* Context */
  const { user } = useContext(UserContext)

  const [isModal, setIsModal] = useState(false)

  /* Router */
  const location = useLocation();

  return (
    <>
      <div className={isModal ? 'modal-open' : 'modal-closed'}>
        <Header showModal={setIsModal} />
        <StyledMainContent
          location={location}
          key={location.pathname}
        >
          {children}
        </StyledMainContent>
        <Footer />
      </div>
      <AnimatePresence exitBeforeEnter>
        {isModal &&
          <Modal>
            <div style={{ padding: "5rem" }}>
              <h1
                style={{
                  fontSize: '2.4rem',
                  textAlign: 'center',
                  marginBottom: '4rem'
                }}
              >
                Welcome to <strong className="red">RapGuide.com</strong></h1>
              <AnimalChooser closeModal={() => {
                setIsModal(false)
              }} />
            </div>
          </Modal>
        }
      </AnimatePresence>
    </>
  )
}

export default Layout;

