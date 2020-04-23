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
        <div className="wrapper">
          <div className="logo">
            <Link to="/">
              <Logo alt="RapGuide.com" />
            </Link>
          </div>
          <div className="header-right">
            {user && (
              <div className="profile">
                <Link to="/profile">
                  <span className="profile__image">
                    <img src={user.image} alt="Profile Image" />
                  </span>
                  <span>{user.nameFirst} {user.nameLast}<br />
                    {user.type !== 'public' &&
                      <em style={{ fontSize: "1.2rem" }}>{user.type}</em>
                    }
                  </span>
                </Link>
              </div>
            )}
            <button
              className={menuIsOpen ? "hamburger hamburger--collapse is-active" : "hamburger hamburger--collapse"}
              type="button"
              onClick={toggleMenu}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
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
  z-index: 1000;

  .wrapper {
    max-width: 100vw;
    padding: 0 3rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu__button {
    position: absolute;
    right: 3rem;
    top: 2rem;
  }

  .profile {
    padding-right: 3rem;
    @media only screen and (max-width: 575px) {
      display: none;
    }
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
    align-items: center;
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