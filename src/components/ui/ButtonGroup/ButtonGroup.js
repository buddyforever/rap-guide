import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components';
import styled from 'styled-components'

const ButtonGroup = ({ children, round }) => {

  /* Theme Context */
  const themeContext = useContext(ThemeContext);

  /* Handle adding any necessary classes */
  let classes = []
  if (round | themeContext.buttons.defaultRound) classes.push("round");

  return (
    <StyledButtonGroup className={classes.length ? classes.join(" ") : ""}>
      {children}
    </StyledButtonGroup>
  )
}
export default ButtonGroup

/* Styles */
const StyledButtonGroup = styled.div`
  display: flex;

  button+button {
    margin: 0;
    border-left: none!important;
  }

  &.round {
    button:first-child {
      border-bottom-left-radius: ${props => props.theme.buttons.buttonBorderRadius};
      border-top-left-radius: ${props => props.theme.buttons.buttonBorderRadius};
    }

    button:last-child {
      border-bottom-right-radius: ${props => props.theme.buttons.buttonBorderRadius};
      border-top-right-radius: ${props => props.theme.buttons.buttonBorderRadius};
    }
  }
`

/* Default Props */
StyledButtonGroup.defaultProps = {
  theme: {
    buttons: {
      buttonTextColor: "#FFFFFF",
      buttonBorderRadius: "12px",
    }
  }
}