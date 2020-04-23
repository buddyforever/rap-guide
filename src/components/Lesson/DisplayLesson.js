import React, { useContext } from 'react'
import { Heading, MediumSpace, StyledContent, HtmlContent } from '../../styles/PageStyles'
import DisplayGuide from '../Guide/DisplayGuide'
import { UserContext } from '../../context/UserContext'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_LESSON_BY_ID } from '../../queries/lessons'

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
  const [updateAnnotation] = useMutation(UPDATE_ANNOTATION)

  function handleAddAnnotation({ annotation, isSubmitted, lessonLyricId }) {
    if (!annotation.id) {
      createAnnotation({
        variables: {
          isSubmitted: isSubmitted,
          account: user.id,
          lessonLyric: lessonLyricId,
          annotation: annotation.annotation
        }
      }).then((createAnnotation) => {
        refetch()
      })
    } else {
      updateAnnotation({
        variables: {
          id: annotation.id,
          isSubmitted: isSubmitted,
          annotation: annotation.annotation
        }
      }).then((updateAnnotation) => {
        refetch()
      })
    }
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
      <DisplayGuide guide={data.lesson.guide} addAnnotation={handleAddAnnotation} />
    </StyledContent>
  )
}

export default DisplayLesson

const CREATE_ANNOTATION = gql`
  mutation createAnnotation(
    $isSubmitted: Boolean!,
    $account: ID!,
    $annotation: String!,
    $lessonLyric: ID!
  ){
    createAnnotation(data: {
      status:PUBLISHED
      isSubmitted: $isSubmitted
      annotation: $annotation
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

const UPDATE_ANNOTATION = gql`
  mutation updateAnnotation(
    $id: ID,
    $isSubmitted: Boolean!,
    $annotation: String!,
  ){
    updateAnnotation(
      where: { id: $id },
      data: {
      status:PUBLISHED
      isSubmitted: $isSubmitted
      annotation: $annotation
    }){
      id
    }
  }
`