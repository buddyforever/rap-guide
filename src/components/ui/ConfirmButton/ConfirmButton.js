import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components';
import styled from 'styled-components'
import { Button } from '../Button'
import { motion } from 'framer-motion'

const ConfirmButton = ({ children, onConfirm, onClick = null, style, ...rest }) => {

  /* Theme Context */
  const themeContext = useContext(ThemeContext);

  /* State */
  const [confirm, setConfirm] = useState(false)

  function toggleConfirm() {
    if (onClick) {
      onClick(!confirm)
    }
    setConfirm(prevState => !prevState)
  }

  function handleConfirm() {
    toggleConfirm()
    onConfirm()
  }

  return (
    <StyledConfirmButton style={style} className="confirm-button">
      {!confirm &&
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button onClick={toggleConfirm} {...rest}>
            {children}
          </Button>
        </motion.span>
      }
      {confirm &&
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <strong>Are you sure you?</strong>
          <Button secondary onClick={toggleConfirm} {...rest}>No</Button>
          <Button onClick={handleConfirm} {...rest}>Yes</Button>
        </motion.span>
      }
    </StyledConfirmButton>
  )
}
export default ConfirmButton

/* Styles */
const StyledConfirmButton = styled.div`
  display: inline;

  &+.confirm-button {
    margin-left: 1rem;
  }

  /* Theme Styles */
  strong {
    color: ${props => props.theme.colors.primary};
    margin-right: 1rem;
  }
`

/* Default Props */
StyledConfirmButton.defaultProps = {
  theme: {
    colors: {
      primary: "#5A67D8",
      primaryDark: "#434190",
      focus: "#90CDF4"
    },
    buttons: {
      buttonTextColor: "#FFFFFF",
      buttonBorderRadius: "12px",
    }
  }
}