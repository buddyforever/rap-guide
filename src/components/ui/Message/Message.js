import React, { useContext, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

const variants = {
  show: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0, marginTop: 0 }
}

const Message = ({
  children,
  toast,
  round,
  dismiss,
  autoDismiss = 4000,
  type = "default",
  title,
  ...rest
}) => {

  const [isOpen, setIsOpen] = useState(true);

  /* Theme Context */
  const themeContext = useContext(ThemeContext);

  /* Get the theme options */
  let icon = themeContext.message[type].icon;
  let props = Object.assign(themeContext.message[type], themeContext.message["base"])

  /* Handle adding any necessary classes */
  let classes = []
  classes.push("message")
  classes.push(type)
  if (toast) classes.push("toast")
  if (round || props.defaultRound) classes.push("round");

  /* Handle close */
  function handleClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen && autoDismiss) {
      setTimeout(handleClose, autoDismiss)
    }
  }, [isOpen])

  return (
    <AnimatePresence onExitComplete={dismiss}>
      {isOpen &&
        <StyledMessage
          variants={variants}
          initial={{ height: 0, opacity: 0 }}
          animate="show"
          exit="exit"
          className={classes.length ? classes.join(" ") : ""}
          type={type}
          {...props}
          {...rest}>
          <div className="message-content">
            {dismiss &&
              <button className="message-close" onClick={handleClose}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            }
            <div className="message-icon"><FontAwesomeIcon icon={icon} /></div>
            <div className="message-text">
              {title && <h5>{title}</h5>}
              <div dangerouslySetInnerHTML={{ __html: children }} />
            </div>
          </div>
        </StyledMessage>
      }
    </AnimatePresence>
  )
}

export default Message

/* Styled */
const StyledMessage = styled(motion.div)`
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
  z-index: 5000;

  .message-content {
    padding: 2rem;
    display: flex;
    align-items: top;
  }

  .message-icon {
    margin-top: -0.7rem;
    margin-right: 2rem;
    font-size: 3.4rem;
  }

  .message-close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    background: transparent;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.1;
    transition: opacity .3s ease, transform .3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &:hover .message-close {
    opacity: 1;
  }

  &.toast {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    margin: 0;

    .message-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .message-close {
      right: 5rem;
    }
  }

  /* From Theme */
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};

  .message-icon {
    color: ${props => props.borderColor};
  }

  .message-close {
    color: ${props => props.color};
  }

  &.round {
    border-radius: ${props => props.borderRadius};
  }
`

/* Default Props */
StyledMessage.defaultProps = {
  borderRadius: "5px",
  color: "#2A4365",
  backgroundColor: "#BEE3F8",
  borderColor: "#90CDF4",
  icon: faInfoCircle,
  type: "default"
}

