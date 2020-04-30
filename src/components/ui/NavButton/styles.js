import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const StyledNavLink = styled(NavLink)`
  border: none;
  background: none;
  transition: color 0.3s ease;
  font-size: 2rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: 500;
  outline: none;
  text-decoration: none;

  /* Give some space for an icon */
  svg {
    margin-right: 1rem;
  }

  &:hover,
  &.active {
    color: ${props => props.theme.colors.primary};
  }

  &.active {
    font-weight: 600;
  }
`