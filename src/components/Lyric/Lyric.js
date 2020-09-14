import React, { useState } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Lyric = ({
  lyric,
  selected = false,
  isSelectable = false,
  isPublic = false,
  weight = null,
  hasMyAnnotation = false,
  mineOnly = false,
  maxWeight = 1,
  ...rest }) => {

  let isAssigned = lyric.annotations
  let isAnnotated = lyric.annotations && lyric.annotations.length > 0
  let isSubmitted = false
  let isExample = false
  let hasNote = lyric.notes && lyric.notes.length ? true : false
  let isFull = false
  if (isAnnotated) {
    isSubmitted = lyric.annotations.find(annotation => annotation.isSubmitted)
  }
  if (hasNote) {
    isExample = lyric.notes.find(note => note.isExample)
  }
  if (weight >= maxWeight) {
    isFull = true
  }

  if (mineOnly && !hasMyAnnotation) {
    isAnnotated = false
    isSubmitted = false
  }

  /* Handle adding any necessary classes */
  let classes = ["lyric"]
  if (isAssigned) classes.push("assigned");
  if (isAnnotated) classes.push("annotated");
  if (isSubmitted) classes.push("submitted");
  if (isExample) classes.push("example");
  if (selected) classes.push("selected");
  if (isPublic) classes.push("public")
  if (hasNote) classes.push("noted");
  if (isFull) classes.push("full");
  if (isSelectable || isAssigned || isAnnotated || isSubmitted) classes.push("selectable");

  return (
    <StyledLyric
      className={classes.length ? classes.join(" ") : ""}
      {...rest}
      title={isFull ? "This lyric already has enough annotations, please select a different one" : ""}
    >
      {lyric.lyric}
      {isExample &&
        <span><FontAwesomeIcon icon={faStar} /></span>
      }({weight})
    </StyledLyric>
  )
}

export default Lyric

const StyledLyric = styled.div`
  font-size: 1.8rem;
  line-height: 2.75rem;
  margin-bottom: 2px;
  padding: 0 .5rem;
  transition: background-color .3s ease;

  span {
    color: #CBD5E0;
    margin-left: 0.5rem;
    font-size: 1.4rem;
  }

  &.selectable {
    cursor: pointer!important;
  }

  &.assigned {
    background-color: #EDF2F7;

    &:hover {
      background-color: #E2E8F0;
    }
  }

  &.noted {
    background-color: #CBD5E0;
  }

  &.selected {
    background-color: #FEFCBF;

    &:hover {
      background-color: #FAF089;
    }

    span {
      color:  #FAF089;
    }
  }

  &.annotated:not(.public) {
    box-shadow: inset 0 -6px rgba(221, 51, 51, 0.5);

    &:hover {
      background-color: rgba(221, 51, 51, 0.5);
      color: black;
    }
  }

  &.annotated.public {
    background-color: #baccd1;
  }

  &.example {
    background-color: #BEE3F8;

    span {
      color: #90CDF4;
    }
  }

  &.hovering {
    background-color: #FEFCBF!important;
  }

  &.annotated.hovering:not(.note),
  &.annotated.selected {
    background-color: rgba(221, 51, 51, 0.5);
    color: black;
  }

  &.submitted,
  &.submitted:hover,
  &.submitted.hovering {
    background-color: #519d37!important;
    color: white!important;
    cursor: not-allowed!important;
    box-shadow: none!important;
  }

  &.full {
    background-color: #a61c1c!important;
    color: white!important;
  }
`