import React from 'react'
import styled from 'styled-components'

export const Lyric = ({ id, lyric, annotations, displayAnnotation, addAnnotation }) => {

  function handleClick() {
    if (annotations.length > 0) {
      displayAnnotation(annotations)
    } else {
      let newAnnotation = {
        id: 1,
        annotation: `<p>This is an annotation from lyric.js ${id} at ${Date.now()}</p>`
      }

      addAnnotation(id, newAnnotation)
    }

  }

  return (
    <StyledLyric className={annotations.length > 0 ? 'annotated' : ''} onClick={() => handleClick(annotations)}>
      {lyric}
    </StyledLyric >
  )
}

export default Lyric;

const StyledLyric = styled.span`
  margin-bottom: 0.5rem;
  transition: all .3s ease;
  padding: .5rem;
  cursor: pointer;

  :not(.annotated):hover {
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
  }

  &.annotated {
    cursor: pointer;
    background-color:  rgba(221, 51, 51, 0.2);
  }

  &.annotated:hover {
    background-color: #DD3333;
    color: #fff7f7;
  }
`;