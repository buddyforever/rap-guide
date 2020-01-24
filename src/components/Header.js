import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Navigation from './Navigation'

export const Header = () => {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <>
      <StyledHeader>
        <div>
          <button
            className={menuIsOpen ? "hamburger hamburger--collapse is-active" : "hamburger hamburger--collapse"}
            type="button"
            onClick={toggleMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <h1><Link to="/">RAP<strong>GUIDE</strong><span>.com</span></Link></h1>
        </div>
        <div className="search">
          <input type="text" placeholder="What are you looking for?..." />
          <button><FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </StyledHeader>
      <Navigation isOpen={menuIsOpen} toggleMenu={toggleMenu} />
    </>
  )
}

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  width: 100vw;
  height: 6rem;
  background-color: #0A0405;
  color: white;
  margin-bottom: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5000;

  h1 {
    display: inline-block;
    font-size: 3rem;
    line-height: 4rem;
    font-weight: 400;

    strong {
      font-weight: 700;
    }

    span {
      font-weight: 300;
      font-size: 2rem;
    }

    a, a:link {
      color: inherit;
      text-decoration: none;
    }
  }

  .hamburger {
    outline: none;
  }

  .search {
    padding-right: 3rem;
    display: flex;
    align-items: center;

    input[type=text] {
      min-width: 600px;
      padding: 0 1rem;
      height: 4rem;
      border: none;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      font-size: 1.6rem;
    }

    button {
      background-color: #333;
      color: white;
      height: 4rem;
      cursor: pointer;
      padding: 0 2rem;
      border: none;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      transition: all .3s ease;
      outline: none;

      &:hover {
        background-color: #999;
      }
    }
  }
`;