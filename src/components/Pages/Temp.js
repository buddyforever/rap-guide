import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'

import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Temp = () => {

  const [message, setMessage] = useState("")
  const [completed, setCompleted] = useState(0)


  const { loading, data, refetch } = useQuery(GET_ANNOTATIONS)

  const [updateAnnotation] = useMutation(UPDATE_ANNOTATION_ORDER)
  return null
  useEffect(() => {
    /*     if (data) {
          setMessage(`loaded ${data.annotations.length} annotations`)
          let shuffledAnnotations = shuffle(data.annotations)
          shuffledAnnotations.map((annotation, index) => {
            updateAnnotation({
              variables: {
                id: annotation.id,
                order: index
              }
            })
            setCompleted(prevState => prevState + 1)
          })
        } */
  }, [data])

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  if (loading) return null
  return (
    <StyledContent style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>{message}</h1>
      <h2>Updated {completed} annotations.</h2>
    </StyledContent>
  )
}

export default Temp;

const GET_ANNOTATIONS = gql`
  query annotations {
    annotations{
      id
      annotation
      order
    }
  }
`

const UPDATE_ANNOTATION_ORDER = gql`
  mutation updateOrder($id: ID!,$order: Int!) {
    updateAnnotation(
      where: { id: $id }
      data: {
        order: $order
      }) {
        id
        order
      }
    }
`