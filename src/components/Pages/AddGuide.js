import React, { useState } from 'react'

import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { FormBlock, ButtonBlock } from '../../styles/FormStyles'
import { Message } from '../ui/Message'
import { Button } from '../ui/Button'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_GUIDE } from '../../queries/guides'

export const AddGuide = () => {

  /* State */
  const [videoTitle, setVideoTitle] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [videoID, setVideoID] = useState("")
  const [message, setMessage] = useState(null)

  /* Queries */
  const [addGuide] = useMutation(CREATE_GUIDE)

  function addVideo() {
    if (
      videoTitle.length === 0 ||
      videoUrl.length === 0 ||
      videoID.length === 0
    ) {
      setMessage({
        type: "error",
        title: "Check all fields",
        text: `All of the fields on this form are required`
      })
      return
    }

    addGuide({
      variables: {
        videoTitle,
        videoUrl,
        videoID
      }
    }).then((response) => {
      setMessage({
        type: "success",
        title: "Video Added",
        text: `The video <strong>${videoTitle}</strong> has been added`
      })

      setVideoTitle("");
      setVideoUrl("");
      setVideoID("");
    })

  }

  return (
    <StyledContent style={{ paddingBottom: "5rem" }}>
      <Heading>
        <h1>Add New Video</h1>
      </Heading>
      <MediumSpace>
        <FormBlock>
          <label>Video Title</label>
          <input
            type="text"
            placeholder="Video Title"
            value={videoTitle}
            onChange={e => setVideoTitle(e.target.value)} />
        </FormBlock>
        <FormBlock>
          <label>Video URL</label>
          <input
            type="text"
            placeholder="Video URL"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)} />
        </FormBlock>
        <FormBlock>
          <label>Video ID</label>
          <p>Just the ID part of the url ie. youtube.com/watch?v=<strong>r2TWtjhNDww</strong></p>
          <input
            type="text"
            placeholder="Video ID"
            value={videoID}
            onChange={e => setVideoID(e.target.value)} />
        </FormBlock>
        <ButtonBlock>
          <Button onClick={addVideo}>Add Video</Button>
        </ButtonBlock>
      </MediumSpace>
      {message &&
        <Message
          toast
          dismiss={() => setMessage(null)}
          type={message.type}
          title={message.title}>
          {message.text}
        </Message>
      }
    </StyledContent>
  )
}

export default AddGuide