import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Navigation from './Navigation'
import auth from '../../auth/auth'
import { getLocalStorage } from '../../utilities/LocalStorage'
import useGlobal from '../../store/Store'
import Logo from './Logo'
import SocialIcons from '../SocialIcons'

export const Header = () => {

  const [globalState, globalActions] = useGlobal();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [name, setName] = useState(null);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <>
      <StyledHeader>
        <div className="logo">
          <button
            className={menuIsOpen ? "hamburger hamburger--collapse is-active" : "hamburger hamburger--collapse"}
            type="button"
            onClick={toggleMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <div>
            <Link to="/">
              <Logo src={globalState.logo} alt="RapGuide.com" />
            </Link>
          </div>
          {globalState.name.length > 0 && (
            <div className="profile"><Link to="/profile">{globalState.name} ({globalState.type})</Link></div>
          )}
        </div>
        <div className="header-right">
          <div className="header-right__social">
            <SocialIcons />
          </div>
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
  height: 10rem;
  background-color: #0A0405;
  color: white;
  margin-bottom: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5000;

  .logo {
    display: flex;
    align-items: center;
  }

  .profile a {
    color: white;
    text-decoration: none;
    font-size: 1.8rem;
  }

  .header-right {
    display: flex;
    flex-direction: column;
  }

  .header-right__social {
    padding-right: 4rem;
    text-align: right;
    margin-top: 7px;
  }

  img {
    height: 10rem;
  }

  .hamburger {
    outline: none;
  }

  }
`;