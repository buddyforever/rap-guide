import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Navigation = ({ isOpen }) => {
  return (
    <StyledNavigation className={isOpen ? 'open' : ''}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/">Rap Guides</NavLink>
      <NavLink to="/">Teachers</NavLink>
      <NavLink to="/">Make a Rap Guide</NavLink>
      <NavLink to="/">Login / Signup</NavLink>
      <NavLink to="/">Contact</NavLink>
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
  margin-top: 7rem;
  transition: all .4s ease-in-out;
  z-index: 5000;

  &.open {
    left: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    padding: 2rem;
    text-transform: uppercase;
    position: relative;
    display: inline;
    transition: all .2s ease;
  }

  a:hover {
    background-color: #DD3333;
  }

`;