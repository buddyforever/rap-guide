import React from 'react'
import styled from 'styled-components'

export const Header = () => {
  return (
    <StyledHeader>
      <div className="content-container">
        <h1>RAP<strong>GUIDE</strong><span>.com</span></h1>
      </div>
    </StyledHeader>
  )
}

export default Header;

const StyledHeader = styled.header`
  height: 7rem;
  background-color: #0A0405;
  color: white;
  margin-bottom: 5rem;

  .content-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 100rem;
    margin: 0 auto;
  }

  h1 {
    font-size: 3.6rem;
    line-height: 4rem;
    font-weight: 400;
  }

  h1 strong {
    font-weight: 700;
  }

  h1 span {
    font-weight: 300;
    font-size: 2rem;
  }
`;