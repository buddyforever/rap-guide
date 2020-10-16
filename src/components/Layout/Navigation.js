import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'

import { useAuth0 } from "../../react-auth0-spa";
import { UserContext } from '../../context/UserContext'

export const Navigation = ({ isOpen, toggleMenu }) => {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const { user } = useContext(UserContext)

  if (isAuthenticated && !user) return null;
  return (
    <StyledNavigation animate className={isOpen ? 'open' : ''}>
      <NavLink exact to="/" activeClassName="active" onClick={toggleMenu}>Home</NavLink>
      <NavLink exact to="/explore" activeClassName="active" onClick={toggleMenu}>Explore</NavLink>
      <NavLink to="/lessons" activeClassName="active" onClick={toggleMenu}>Lessons</NavLink>
      <NavLink to="/request" activeClassName="active" onClick={toggleMenu}>Request</NavLink>
      <NavLink to="/about" activeClassName="active" onClick={toggleMenu}>About</NavLink>
      <NavLink to="/contact" activeClassName="active" onClick={toggleMenu}>Contact</NavLink>
      {
        !isAuthenticated &&
        <button onClick={loginWithRedirect}>Login/Signup</button>
      }
      {
        isAuthenticated && user &&
        <>
          <NavLink to="/profile" activeClassName="active" onClick={toggleMenu}>Profile</NavLink>
          {['jessejburton@gmail.com', 'bababrinkman.com'].includes(user.email) &&
            <a href="https://rap-guide-v2.vercel.app/">Admin</a>
          }
          <button onClick={logout}>Logout</button>
        </>
      }
    </StyledNavigation>
  )
}

export default Navigation;

const StyledNavigation = styled(motion.div)`
  position: fixed;
  height: 100vh;
  top: 0;
  right: -30rem;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin-top: 10rem;
  transition: all .4s ease-in-out;
  z-index: 5000;
  box-shadow: 0 0 0 100vw rgba(0,0,0,0.0);

  @media only screen and (max-width: 400px) {
    left: 100vw;
    width: 100vw;
  }

  &.open {
    box-shadow: 0 0 0 100vw rgba(0,0,0,0.5);
    right: 0;
    @media only screen and (max-width: 400px) {
      left: 0;
    }
  }

  a,
  button {
    color: inherit;
    text-decoration: none;
    padding: 2rem;
    text-transform: uppercase;
    position: relative;
    display: inline;
    transition: all .2s ease;
    text-align: center;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 2.2rem;
    font-weight: 400;
  }

  button {
    background-color: transparent;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
  }

  a.active {
    border-left: 5px solid #DD3333;
  }

  a:hover,
  button:hover {
    background-color: #DD3333;
  }

`;