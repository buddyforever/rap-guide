import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { hexToRgba } from '../../../utilities/colors'

const Button = ({
  children,
  inverted,
  round,
  iconLeft,
  iconRight,
  onClick,
  small,
  large,
  secondary,
  iconHover,
  ...rest
}) => {

  /* Theme Context */
  const themeContext = useContext(ThemeContext);

  /* Handle adding any necessary classes */
  let classes = []
  if (small) classes.push("small");
  if (large) classes.push("large");
  if (secondary) classes.push("secondary");
  if (inverted) classes.push("inverted");
  if (iconHover) classes.push("icon-hover");
  if (round | themeContext.buttons.defaultRound) classes.push("round");

  return (
    <StyledButton onClick={onClick} className={classes.length ? classes.join(" ") : ""} {...rest}>
      {iconLeft && <FontAwesomeIcon icon={iconLeft} />}
      <span>{children}</span>
      {iconRight && <FontAwesomeIcon icon={iconRight} />}
    </StyledButton>
  )
}
export default Button

/* Styles */
const StyledButton = styled.button`
  border: none;
  padding: 0 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  font-size: 1.6rem;
  height: 4.5rem;
  font-weight: 400;
  text-transform: uppercase;
  outline: none;

  &.small {
    padding: 0 1rem;
    font-size: 1.4rem;
    height: 3.5rem;
  }

  &.large {
    font-size: 1.8rem;
    height: 5rem;
  }

  /* Give some space for an icon */
  span+svg,
  svg+span {
    margin-left: 1rem;
  }

  &.icon-hover {
    svg {
      opacity: 0;
      width: 0;
      pointer-events: none;
      transition: width .3s ease, opacity .3s ease;
    }

    span+svg,
    svg+span {
      margin-left: 0;
    }

    &:hover {
      span+svg,
      svg+span {
        margin-left: 1rem;
      }

      svg {
        opacity: 1;
        width: 1em;
      }
    }

  }

  /* Give space if more than one button are in a row */
  &+button {
    margin-left: 1rem;
  }

  /* From Theme */
  color: ${props => props.theme.buttons.buttonTextColor};
  background-color: ${props => props.theme.colors.primary};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    color: ${props => props.theme.buttons.buttonTextColor};
  }

  &:focus {
    box-shadow: 0 0 2px 2px rgba(${props => hexToRgba(props.theme.colors.focus, 0.7)});
  }

  &.inverted {
    color: ${props => props.theme.colors.primary};
    background-color: transparent;
    border: 2px solid ${props => props.theme.colors.primary};
  }

  &.inverted:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    border-color: ${props => props.theme.colors.primaryDark};
    color: ${props => props.theme.buttons.buttonTextColor};
  }

  &.round {
    border-radius: ${props => props.theme.buttons.buttonBorderRadius};
  }

  &.secondary {
    color: ${props => props.theme.buttons.buttonTextColorDark};
    background-color: ${props => props.theme.colors.secondary};
    border-color: ${props => props.theme.colors.secondary};

    &:hover {
      color: ${props => props.theme.buttons.buttonTextColor};
      background-color: ${props => props.theme.colors.secondaryDark};
      border-color: ${props => props.theme.colors.secondaryDark};
    }
  }
`

/* Default Props */
StyledButton.defaultProps = {
  theme: {
    colors: {
      primary: "#5A67D8",
      primaryDark: "#434190",
      secondary: "#CBD5E0",
      secondaryDark: "#4A5568",
      focus: "#90CDF4"
    },
    buttons: {
      buttonTextColor: "#FFFFFF",
      buttonTextColorDark: "#1A202C",
      buttonBorderRadius: "12px",
    }
  }
}