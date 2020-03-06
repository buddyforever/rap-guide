import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import auth from '../auth/auth'

export const Navigation = ({ isOpen, toggleMenu }) => {

  const handleLogout = () => {
    auth.logout();
    window.location = "/";
  }

  return (
    <StyledNavigation className={isOpen ? 'open' : ''}>
      <NavLink exact to="/" activeClassName="active" onClick={toggleMenu}>Explore</NavLink>
      <NavLink to="/lessons" activeClassName="active" onClick={toggleMenu}>Lessons</NavLink>
      <NavLink to="/request" activeClassName="active" onClick={toggleMenu}>Request</NavLink>
      <NavLink to="/about" activeClassName="active" onClick={toggleMenu}>About</NavLink>
      <NavLink to="/contact" activeClassName="active" onClick={toggleMenu}>Contact</NavLink>
      {/* {
        !auth.isAuthenticated() &&
        <NavLink to="/login" activeClassName="active" onClick={toggleMenu}>Login / Signup</NavLink>
      }
      {
        auth.isAuthenticated() &&
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      } */}
    </StyledNavigation>
  )
}

export default Navigation;

const StyledNavigation = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;
  left: -30rem;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin-top: 10rem;
  transition: all .4s ease-in-out;
  z-index: 5000;

  &.open {
    left: 0;
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
  }

  button {
    background-color: transparent;
    border: none;
    text-transform: uppercase;
    text-align: left;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 300;
    font-family: 'Ubuntu', sans-serif;
  }

  a.active {
    border-left: 5px solid #DD3333;
  }

  a:hover,
  button:hover {
    background-color: #DD3333;
  }

`;