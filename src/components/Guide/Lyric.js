import React, { useState } from 'react'
import styled from 'styled-components'

export const Lyric = ({ active = false, children }) => {

  const [isActive, setIsActive] = useState(active);

  return (
    <StyledLyric onClick={() => setIsActive(!isActive)} className={isActive ? "active" : ""}>
      {children}
    </StyledLyric>
  )
}

export default Lyric;

const StyledLyric = styled.span`
  margin-bottom: 0.5rem;
  transition: all .3s ease;
  padding: .5rem;
  cursor: pointer;
  display: block;

  &:hover {
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
  }

  &.active {
    cursor: pointer;
    background-color:  rgba(221, 51, 51, 0.2);
  }

  &.active:hover {
    background-color: #DD3333;
    color: #fff7f7;
  }
`;