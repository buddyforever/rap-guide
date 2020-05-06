import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const containerVariants = {
  start: {},
  end: {}
}

const dotVariants = {
  start: {
    x: 0
  },
  end: {
    x: 10
  }
}

const dotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'linear'
}

const DotWiggle = ({ ...rest }) => {
  return (
    <DotContainer initial="start" animate="end" variants={containerVariants}>
      <Dot variants={dotVariants} transition={dotTransition} {...rest} />
      <Dot variants={dotVariants} transition={dotTransition} {...rest} />
      <Dot variants={dotVariants} transition={dotTransition} {...rest} />
    </DotContainer>
  )
}

export default DotWiggle

const DotContainer = styled(motion.div)`

`

const Dot = styled(motion.div)`
  width: ${props => props.size * 10 + "px" || "10px"};
  height: ${props => props.size * 10 + "px" || "10px"};
  background-color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: inline-block;
  margin-right: 1rem;
`

/* Default Props */
Dot.defaultProps = {
  size: 1,
  theme: {
    colors: {
      primary: "#5A67D8"
    }
  }
}