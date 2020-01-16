import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from 'styled-components'

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <StyledMainContent>
        {children}
      </StyledMainContent>
      <Footer />
    </div>
  )
}

export default Layout;

const StyledMainContent = styled.main`
  max-width: 100rem;
  margin: 0 auto;
  padding-top: 12rem;
`;