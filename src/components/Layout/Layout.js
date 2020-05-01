import React from 'react'
import { useLocation } from 'react-router-dom'

import { StyledMainContent } from '../../styles/PageStyles.js'
import Header from './Header'
import Footer from './Footer'
import { useMessage } from '../ui/Message/useMessage'

export const Layout = ({ children }) => {

  const location = useLocation();
  //const { message, setMessage, Message } = useMessage()


  return (
    <>
      <Header />
      <StyledMainContent location={location} key={location.pathname}>
        {children}
      </StyledMainContent>
      <Footer />
    </>
  )
}

export default Layout;

