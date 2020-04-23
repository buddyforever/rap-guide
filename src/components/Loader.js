import React, { useState, useEffect } from 'react'
import { StyledContent, CenteredContent } from '../styles/PageStyles'
import styled from 'styled-components'
import { useInterval } from './Hooks/useInterval'

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
        <StyledLoader><span>Loading</span> <span>{dots}</span></StyledLoader>
      </CenteredContent>
    </StyledContent>
  )
}

export default Loader

const StyledLoader = styled.div`
  width: 300px;
  font-size: 4rem;

  span {
    display: inline;
  }
`