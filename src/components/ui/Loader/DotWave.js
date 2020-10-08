import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1
    }
  },
  end: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const dotVariants = {
  start: {
    y: "0%"
  },
  end: {
    y: "100%"
  }
}

const dotTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: 'easeInOut'
}

export const DotWave = ({ ...rest }) => {
  return (
    <DotWaveContainer initial="start" animate="end" variants={containerVariants}>
      <Dot variants={dotVariants} transition={dotTransition} {...rest} />
      <Dot variants={dotVariants} transition={dotTransition} {...rest} />
      <Dot variants={dotVariants} transition={dotTransition} {...rest} />
    </DotWaveContainer>
  )
}

export default DotWave

const DotWaveContainer = styled(motion.div)`

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
      primary: "#DD3333"
    }
  }
}