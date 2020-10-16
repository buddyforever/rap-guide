import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Navigation from './Navigation'
import Logo from './Logo'
import { UserContext } from '../../context/UserContext'
import { useAuth0 } from "../../react-auth0-spa";

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_ACCOUNT_BY_EMAIL, CREATE_ACCOUNT } from '../../queries/accounts'

export const Header = ({ showModal }) => {

  /* Auth */
  const { loading, isAuthenticated, user: profile } = useAuth0();

  /* State */
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  /* Queries */
  const { refetch } = useQuery(GET_ACCOUNT_BY_EMAIL, { variables: { email: "" } });
  const [createAccount] = useMutation(CREATE_ACCOUNT);

  /* Context */
  const { user, setUser } = useContext(UserContext);

  /* Functions */
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  }

  // TODO - Test the display name animal chooser once more before pushing
  async function getUserDetails(email) {
    const { data: { account } } = await refetch({ email: email });

    if (account) {
      setUser(prevState => {
        return {
          ...profile,
          id: account.id,
          type: account.type,
          isViewOnly: account.isViewOnly,
          displayName: account.displayName
        }
      })
    } else {
      // Create public account
      // TODO - Add image and name when creating account
      await createAccount({
        variables: {
          email: profile.email,
          type: "public"
        }
      }).then(({ data: { createAccount } }) => {
        setUser(prevState => {
          return {
            ...profile,
            id: createAccount.id,
            type: createAccount.type
          }
        })
      });
    }
  }

  useEffect(() => {
    if (!profile) return
    if (isAuthenticated && !user) {
      getUserDetails(profile.email);
    }
  }, [profile])

  useEffect(() => {
    if (user && user.displayName === "") showModal(true)
  }, [user])

  if (loading) return null;
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
            {user && isAuthenticated && (
              <div className="profile">
                <Link to="/profile">
                  <span className="profile__image">
                    <img src={user.picture} alt="Profile Image" />
                  </span>
                  <span>{user.name}<br />
                    {user.type !== 'public' &&
                      <em>{user.type} {user.isViewOnly && <span>(DEMO)</span>}</em>
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
  top: 0;
  width: 100vw;
  background-color: #0A0405;
  color: white;
  z-index: 1000;
  overflow: hidden;
  height: 10rem;

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

    em {
      font-size: 1.2rem;
      color: #999;
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