import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Navigation from './Navigation'
import auth from '../../auth/auth'
import { getLocalStorage } from '../../utilities/LocalStorage'
import Logo from './Logo'
import SocialIcons from '../SocialIcons'
import { UserContext } from '../../context/UserContext'

export const Header = () => {

  const { user } = useContext(UserContext)

  const [menuIsOpen, setMenuIsOpen] = useState(false);

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
          <div className="logo__image">
            <Link to="/">
              <Logo alt="RapGuide.com" />
            </Link>
          </div>
          {user && (
            <div className="profile">
              <Link to="/profile">
                <span className="profile__image">
                  <img src={user.image} alt="Profile Image" />
                </span> <span>{user.nameFirst} {user.nameLast}<br /><em style={{ fontSize: "1.2rem" }}>{user.type}</em></span>
              </Link>
            </div>
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
    display: flex;
    align-items: center;
  }

  .header-right {
    display: flex;
  }

  .header-right__social {
    padding: 0 4rem;
    text-align: right;
    margin-top: 7px;
  }

  img {
    height: 10rem;
  }

  .hamburger {
    outline: none;
  }

  .profile__image {
    width: 4rem;
    height: 4rem;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &.scrolled {
    height: 8rem;

    .logo__image img {
      height: 8rem;
    }
  }
`;