import React, { useState, useEffect } from 'react'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import Message from '../Layout/Message';

import { getLocalStorage, setLocalStorage } from '../../utilities/LocalStorage'

export const Temp = () => {

  /* State */
  const [guideId, setGuideId] = useState("");
  const [lyrics, setLyrics] = useState("");

  /* Queries */
  const [createLyric] = useMutation(CREATE_LYRIC);

  /* Helpers */
  const [message, setMessage] = useState(null);

  function importLyrics() {
    const lyrics_arr = lyrics.split(",");

    lyrics_arr.map(async (lyric, index) => {
      await createLyric({
        variables: {
          guide: {
            "id": guideId
          },
          lyric: lyric,
          order: index
        }
      })
    })
    setMessage({
      text: lyrics_arr.length + " lyrics added"
    })
  }

  useEffect(() => {
    const guides = getLocalStorage("guides");
    const lyrics_parsed = guides[0].lyrics.map(lyric => lyric.lyric);
    lyrics_parsed.map(lyric => {
      setLyrics(prevState => prevState + "," + lyric);
    })
  }, [])

  return (
    <StyledContent>
      <Heading>
        <h1>Utility Page</h1>
      </Heading>
      <Message message={message} />
      <MediumSpace>
        <input
          type="text"
          value={guideId}
          onChange={(e) => setGuideId(e.target.value)}
          placeholder="Guide ID" />
        <textarea
          style={{ width: "100%", height: "300px" }}
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Lyrics (comma seperated)">
        </textarea>
        <button onClick={importLyrics}>Import Lyrics</button>
      </MediumSpace>
    </StyledContent >
  )
}

export default Temp;

const CREATE_LYRIC = gql`
  mutation createLyrics(
    $lyric: String!,
    $order:Int!,
    $guide: GuideWhereUniqueInput!
  ){
    createLyrics(data: {
      status: PUBLISHED
      lyric: $lyric
      order: $order
      guide: {
        connect: $guide
      }
    }){
      id
      lyric
      order
    }
  }
`

