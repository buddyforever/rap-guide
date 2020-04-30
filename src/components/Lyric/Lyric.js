import React, { useState } from 'react'
import styled from 'styled-components'

const Lyric = ({ lyric, selected = false, ...rest }) => {

  let isAssigned = lyric.annotations
  let isAnnotated = lyric.anotations && lyric.annotations.length
  let isSubmitted = false
  let isExample = false
  if (isAnnotated) {
    isSubmitted = lyric.annotations.find(annotation => annotation.isSubmitted)
    isExample = lyric.annotations.find(annotation => annotation.isExample)
  }

  /* Handle adding any necessary classes */
  let classes = []
  if (isAssigned) classes.push("assigned");
  if (isAnnotated) classes.push("annotated");
  if (isSubmitted) classes.push("submitted");
  if (isExample) classes.push("example");
  if (selected) classes.push("selected");

  return (
    <StyledLyric className={classes.length ? classes.join(" ") : ""} {...rest}>
      {lyric.lyric}
    </StyledLyric>
  )
}

export default Lyric

const StyledLyric = styled.div`
  font-size: 1.8rem;
  line-height: 2.75rem;
  margin-bottom: 2px;
  padding-left: .5rem;
  transition: background-color .3s ease;

  &.assigned {
    background-color: #EDF2F7;
    cursor: pointer;

    &:hover {
      background-color: #E2E8F0;
    }
  }

  &.selected {
    background-color: #FEFCBF;
    cursor: pointer;

    &:hover {
      background-color: #FAF089;
    }
  }

  &.annotated {
    background-color: red;
  }

  &.submitted {
    background-color: yellow;
  }

  &.example {
    background-color: blue;
  }

`