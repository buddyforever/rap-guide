import React, { useState } from 'react'
import styled from 'styled-components'

export const Lyric = ({ lyric, active = false, onHandleClick }) => {
  const [isActive, setIsActive] = useState(active);

  function handleClick() {
    setIsActive(!isActive);
    onHandleClick();
  }

  return (
    <StyledLyric onClick={handleClick} className={isActive ? "active" : ""}>
      {lyric.lyric}
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