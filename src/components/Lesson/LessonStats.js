import React from 'react'
import styled from 'styled-components'

import { DotWave } from '../ui/Loader'

import { useQuery } from '@apollo/react-hooks'
import { GET_COMMENTS_AND_LIKES } from '../../queries/lessons'

import { Split } from '../../styles/PageStyles'

export const LessonStats = ({ lesson, students, submittedAnnotations }) => {

  const { data, loading } = useQuery(GET_COMMENTS_AND_LIKES, {
    variables: {
      id: lesson.id
    }
  })


  if (loading) return <DotWave />
  console.log(data)
  const lyricsWithAnnotations = lesson.lyrics.filter(lyric => lyric.annotations.length)
  const annotationsWithComments = data.annotations.filter(annotation => annotation.comments.length)
  const annotationsWithLikes = data.annotations.filter(annotation => annotation.likes.length)

  return (
    <Split>
      <div>
        <h2>Lesson Settings</h2>
        <StyledStats>
          <div>
            Number of Students
        </div>
          <Data>{lesson.maxStudents}</Data>
          <div>
            Number annotations required per student
        </div>
          <Data>{lesson.numAnnotations}</Data>
          <div>
            Number annotatable lyrics
        </div>
          <Data>{lesson.lyrics.length}</Data>
          <div>
            Number upvotes required / student
        </div>
          <Data>{lesson.minLikes}</Data>
          <div>
            Number comments required
        </div>
          <Data>0</Data>
        </StyledStats>
      </div>
      <div>
        <h2>Lesson Results</h2>
        <StyledStats>
          <div>
            Number of Students Enrolled
          </div>
          <Data>{students.length}</Data>
          <div>
            Number of Annotations Submitted
          </div>
          <Data>{submittedAnnotations}</Data>
          <div>
            Number of Lyrics Annotated
          </div>
          <Data>{lyricsWithAnnotations.length}</Data>
          <div>
            Max Annotations per Lyric
          </div>
          <Data>{Math.ceil(lesson.numAnnotations * lesson.maxStudents / lesson.lyrics.length)}</Data>
          <div>
            Number of Upvotes Submitted
          </div>
          <Data>{annotationsWithLikes.length}</Data>
          <div>
            Number of Comments Submitted
          </div>
          <Data>{annotationsWithComments.length}</Data>
          {/*
            <div>
              Star Rating Distribution
            </div>
            <Data>0</Data>
          */}
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