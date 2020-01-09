import React from 'react'
import styled from 'styled-components'

export const Footer = () => {
  return (
    <StyledFooter>
      <p>copyright &copy; 2020 rapguide.com</p>
    </StyledFooter>
  )
}

export default Footer;

const StyledFooter = styled.footer`
  max-width: 100rem;
  margin: 0 auto;
  font-size: 1.6rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;