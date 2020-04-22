import React, { useState, useEffect, useContext } from 'react'
import { Heading, MediumSpace, StyledContent, HtmlContent } from '../../styles/PageStyles'
import DisplayGuide from '../Guide/DisplayGuide'
import { UserContext } from '../../context/UserContext'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const DisplayLesson = ({ id }) => {

  /* Context */
  const { user } = useContext(UserContext)

  /* Queries */
  const { loading, data, refetch } = useQuery(GET_LESSON_BY_ID, {
    variables: {
      id
    }
  });
  const [createAnnotation] = useMutation(CREATE_ANNOTATION)

  function handleAddAnnotation(annotation) {
    createAnnotation({
      variables: {
        isSubmitted: annotation.isSubmitted,
        account: user.id,
        lessonLyric: annotation.lessonLyricId
      }
    })
  }

  if (loading) return null
  return (
    <StyledContent>
      <Heading>
        <h1>{data.lesson.lessonTitle}</h1>
      </Heading>
      <HtmlContent>
        <MediumSpace dangerouslySetInnerHTML={{ __html: data.lesson.lessonDescription }} />
      </HtmlContent>
      <hr />
      <DisplayGuide guide={data.lesson.guide} addAnnotation={handleAddAnnotation} refetch={refetch} />
    </StyledContent>
  )
}

export default DisplayLesson

const GET_LESSON_BY_ID = gql`
  query getLesson($id: ID!) {
    lesson(where: { id: $id }) {
      id
      lessonTitle
      lessonDescription
      maxStudents
      account {
        id
      }
      guide {
        videoUrl
        videoTitle
        topics {
          id
          topic
        }
        lyrics {
          id
          lyric
          lessonLyrics(where: { lesson: {id: $id } }) {
            id
            annotations {
              id
              annotation
            }
            isAssigned
            isExample
            notes
          }
        }
      }
      topics {
        id
        topic
      }
    }
  }
`

const CREATE_ANNOTATION = gql`
  mutation createAnnotation(
    $isSubmitted: Boolean!,
    $account: ID!,
    $lessonLyric: ID!
  ){
    createAnnotation(data: {
      status:PUBLISHED
      isSubmitted: $isSubmitted
      account: {
        connect: { id: $account }
      }
      lessonLyric: {
        connect: { id: $lessonLyric }
      }
    }){
      id
    }
  }
`