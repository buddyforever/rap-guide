import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import { useInterval } from './Hooks/useInterval'
import Logo from './Layout/Logo'
import { StyledContent, CenteredContent } from '../styles/PageStyles'

const logoVariants = {
  initial: { scale: 0.9, opacity: 1, rotate: 360 },
  show: { scale: 1.1, opacity: 1, rotate: 0 },
  exit: { scale: 0, opacity: 0 }
}

const Loader = () => {

  const [dots, setDots] = useState(".");
  let numDots = 1;
  let str = ".";

  function addDot() {
    if (numDots === 3) {
      numDots = 1;
    } else {
      numDots++;
    }
    setDots(str.repeat(numDots));
  }

  useInterval(addDot, 300);

  return (
    <StyledContent>
      <CenteredContent>
        <AnimatePresence exitBeforeEnter>
          <StyledLoader>
            <Logo
              variants={logoVariants}
              id="loader"
              transition={{
                yoyo: Infinity,
                duration: 2,
                ease: "backInOut"
              }} />
            {/*<span>{dots}</span>*/}
          </StyledLoader>
        </AnimatePresence>
      </CenteredContent>
    </StyledContent>
  )
}

export default Loader

const StyledLoader = styled(motion.div)`
  width: 300px;
  font-size: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`