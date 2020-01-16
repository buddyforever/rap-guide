import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Navigation from './Navigation'

export const Header = () => {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <>
      <StyledHeader>
        <div>
          <button
            className={menuIsOpen ? "hamburger hamburger--collapse is-active" : "hamburger hamburger--collapse"}
            type="button"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <h1>RAP<strong>GUIDE</strong><span>.com</span></h1>
        </div>
        <div>
          <input type="text" placeholder="What are you looking for?..." />
          <button><FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </StyledHeader>
      <Navigation isOpen={menuIsOpen} />
    </>
  )
}

export default Header;

const StyledHeader = styled.header`
  height: 7rem;
  background-color: #0A0405;
  color: white;
  margin-bottom: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    display: inline-block;
    font-size: 3.6rem;
    line-height: 4rem;
    font-weight: 400;

    strong {
      font-weight: 700;
    }

    span {
      font-weight: 300;
      font-size: 2rem;
    }
  }

  input[type=text] {
    min-width: 600px;
    padding: 1.5rem;
    border: 1px solid #333333;
    border-radius: 3px;
    font-size: 1.8rem;
  }

  .hamburger {
    outline: none;
  }
`;