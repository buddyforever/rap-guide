import React from 'react'
import { StyledNavLink } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavButton = ({ children, icon, to, ...rest }) => {
  return (
    <StyledNavLink {...rest} to={to} activeClassName="active">
      {icon && <FontAwesomeIcon icon={icon} />}
      <span>{children}</span>
    </StyledNavLink>
  )
}

export default NavButton

/* Default Props */
StyledNavLink.defaultProps = {
  theme: {
    colors: {
      primary: "#5A67D8",
    }
  }
}

