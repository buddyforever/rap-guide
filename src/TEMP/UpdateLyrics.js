import React, { useState, useEffect } from 'react'
import { StyledContent } from '../../styles/PageStyles'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_GUIDE_BY_ID } from '../../queries/guides'
import gql from 'graphql-tag'

export const Temp = () => {

  const { loading, data, refetch } = useQuery(GET_GUIDE_BY_ID, {
    variables: {
      id: "ck92muqx9193w0b84he8cdlnu"
    }
  })

  const [updateLyricBar] = useMutation(UPDATE_LYRIC_BAR);
  const [updateLyricText] = useMutation(UPDATE_LYRIC);
  const [updateLyricOrder] = useMutation(UPDATE_LYRIC_ORDER);
  const [removeLyricById] = useMutation(REMOVE_LYRIC);

  function updateOrder(id, order) {
    updateLyricOrder({
      variables: {
        id: id,
        order: parseInt(order)
      }
    }).then(response => {
      console.log(response);
    })
  }

  function updateLyric(id, lyric) {
    updateLyricText({
      variables: {
        id: id,
        lyric: lyric
      }
    }).then(response => {
      console.log(response);
      refetch();
    })
  }

  function updateBar(id, bar) {
    updateLyricBar({
      variables: {
        id: id,
        bar: parseInt(bar)
      }
    }).then(response => {
      console.log(response);
    })
  }

  async function removeLyric(id) {
    await removeLyricById({
      variables: {
        id: id
      }
    }).then(response => {
      console.log(response);
      refetch();
    })
  }

  let currentBar = 1;
  let nextBar = false;

  if (loading) return null
  return (
    <StyledContent style={{ paddingTop: "15rem", width: "100%" }}>
      <div style={{ position: "fixed", marginTop: "-5rem", right: "3rem" }}><button onClick={() => refetch()} style={{ padding: "1rem" }}>REFETCH</button></div>
      {data.guide.lyrics.map(lyric => {
        nextBar = (currentBar !== lyric.bar);
        currentBar = lyric.bar;
        return (
          <p key={lyric.id}>
            {nextBar && <div><br /><br /><br /></div>}
            <strong>{lyric.lyric}</strong><br />
            <input
              onChange={(e) => updateOrder(lyric.id, e.target.value)}
              placeholder={lyric.order}
              style={{ width: "5rem" }} />
            <input onBlur={(e) => updateLyric(lyric.id, e.target.value)}
              placeholder={lyric.lyric}
              style={{ width: "50ch" }} />
            <input
              onChange={(e) => updateBar(lyric.id, e.target.value)}
              placeholder={lyric.bar}
              style={{ width: "5rem" }} />
            <button onClick={(e) => removeLyric(lyric.id)}>REMOVE</button>
          </p>
        )
      })}
    </StyledContent >
  )
}

export default Temp;


const UPDATE_LYRIC_BAR = gql`
  mutation updateLyric(
    $id: ID,
    $bar: Int!
  ){
    updateLyric(
      where: { id: $id },
      data: {
      bar: $bar
    }){
      id
    }
  }
`

const UPDATE_LYRIC = gql`
  mutation updateLyric(
    $id: ID,
    $lyric: String!
  ){
    updateLyric(
      where: { id: $id },
      data: {
      lyric: $lyric
    }){
      id
    }
  }
`

const UPDATE_LYRIC_ORDER = gql`
  mutation updateLyric(
    $id: ID,
    $order: Int!
  ){
    updateLyric(
      where: { id: $id },
      data: {
      order: $order
    }){
      id
    }
  }
`

const REMOVE_LYRIC = gql`
  mutation deleteLyric(
    $id: ID
  ){
    deleteLyric(where: { id: $id }){
      id
    }
  }
`
