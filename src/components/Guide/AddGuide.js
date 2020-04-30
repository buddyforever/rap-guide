import React, { useState } from 'react'
import { StyledContent, Heading } from '../../styles/PageStyles'
import { Button } from '../ui/Button'

const AddGuide = () => {

  const [pastedText, setPastedText] = useState("");
  const [convertedLyrics, setConvertedLyrics] = useState("");

  function convertToLyrics() {
    let newText = pastedText.split("\n");

    newText = newText.map((lyric, index) => ({
      id: index,
      lyric: lyric,
      annotations: []
    }))

    setConvertedLyrics(JSON.stringify(newText));
  }

  return (
    <StyledContent>
      <Heading>
        <h1>Add Rap Guide</h1>
      </Heading>
      <textarea style={{ width: "100%", height: "300px" }} value={pastedText} onChange={(e) => setPastedText(e.target.value)}></textarea>
      <Button onClick={convertToLyrics}>Convert To Lyrics</Button>
      <textarea style={{ width: "100%", height: "300px" }} value={convertedLyrics} readonly></textarea>
    </StyledContent>
  )
}

export default AddGuide;