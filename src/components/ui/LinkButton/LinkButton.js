import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { hexToRgba } from '../../../utilities/colors'

const LinkButton = ({ children, iconLeft, iconRight, onClick, round, ...rest }) => {

  /* Theme Context */
  const themeContext = useContext(ThemeContext);

  /* Handle adding any necessary classes */
  let classes = []
  if (round | themeContext.buttons.defaultRound) classes.push("round");

  return (
    <StyledLinkButton
      onClick={onClick}
      className={classes.length ? classes.join(" ") : ""}
      {...rest}>
      {iconLeft && <FontAwesomeIcon icon={iconLeft} />}
      <span>{children}</span>
      {iconRight && <FontAwesomeIcon icon={iconRight} />}
    </StyledLinkButton>
  )
}

export default LinkButton

const StyledLinkButton = styled.button`
  border: none;
  background: none;
  transition: color 0.3s ease;
  font-size: 1.6rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: 500;
  outline: none;
  transition: background-color .3s ease;

  /* Give some space for an icon */
  svg+span,
  span+svg {
    margin-left: 1rem;
  }

  &.round {
    border-radius: ${props => props.theme.buttons.buttonBorderRadius};
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.subtle};
  }

  &:focus {
    box-shadow: 0 0 2px 2px rgba(${props => hexToRgba(props.theme.colors.focus, 0.4)});
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`

/* Default Props */
StyledLinkButton.defaultProps = {
  theme: {
    colors: {
      primary: "#5A67D8",
      subtle: "",
      focus: "#90CDF4"
    },
    buttons: {
      buttonBorderRadius: "5px",
    }
  }
}
