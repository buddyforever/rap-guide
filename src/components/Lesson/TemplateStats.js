import React from 'react'
import styled from 'styled-components'

import { Split } from '../../styles/PageStyles'

export const TemplateStats = ({ lesson }) => {

  const numComments = lesson.annotations.reduce((sum, annotation) => {
    return sum + annotation.comments.length
  }, 0)
  const numLikes = lesson.annotations.reduce((sum, annotation) => {
    return sum + annotation.likes.length
  }, 0)

  return (
    <Split>
      <div>
        <StyledStats>
          <div>Number annotations required per student</div>
          <Data>{lesson.numAnnotations}</Data>
          <div>Max Annotations per Lyric</div>
          <Data>{Math.ceil(lesson.numAnnotations * lesson.maxStudents / lesson.lyrics.length)}</Data>
          <div>Number upvotes required per student</div>
          <Data>{lesson.minLikes}</Data>
          <div>Number comments required per student</div>
          <Data>{lesson.minComments}</Data>
        </StyledStats>
      </div>
      <div>
        <StyledStats>
          <div>Number of Students</div>
          <Data>{lesson.accounts.length}</Data>
          <div>Number of Annotations Submitted</div>
          <Data>{lesson.annotations.length}</Data>
          <div>Number of Upvotes Collected</div>
          <Data>{numLikes}</Data>
          <div>Number of Comments Submitted</div>
          <Data>{numComments}</Data>
        </StyledStats>
      </div>
    </Split>
  )
}

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: auto 75px;
  width: 100%;
  gap: 10px;
  margin-bottom: 25px;
  font-size: 18px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 3px;
  border: 1px solid #dddddd;
  margin-top: 10px;
`

const Data = styled.span`
  font-size: 3rem;
  margin-right: 1rem;
  color: #DD3333;
  font-weight: 700;
`