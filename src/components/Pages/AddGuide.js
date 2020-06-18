import React, { useState, useEffect } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { FormBlock, ButtonBlock } from '../../styles/FormStyles'
import { Tag } from '../../styles/TagStyles'
import { Message } from '../ui/Message'
import { Button } from '../ui/Button'
import { DotWave as Loader } from '../ui'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_GUIDE } from '../../queries/guides'
import { GET_ALL_TOPICS, CREATE_TOPIC } from '../../queries/topics'

export const AddGuide = () => {

  /* State */
  const [videoTitle, setVideoTitle] = useState("")
  const [videoID, setVideoID] = useState("")
  const [videoThumb, setVideoThumb] = useState("images/default.png")
  const [message, setMessage] = useState(null)
  const [allTopics, setAllTopics] = useState(null)
  const [topics, setTopics] = useState([])
  const [topic, setTopic] = useState("")
  const [thumbnail, setThumbnail] = useState(null)

  /* Queries */
  const [addGuide] = useMutation(CREATE_GUIDE)
  const [createTopic] = useMutation(CREATE_TOPIC)

  const { loading, data, refetch } = useQuery(GET_ALL_TOPICS)

  async function uploadFile(file_data) {
    const data = new FormData()
    data.append('file', file_data)
    data.append('upload_preset', 'rap_guide')

    const response = await fetch(
      '	https://api.cloudinary.com/v1_1/burtonmedia/image/upload',
      {
        method: "POST",
        body: data
      }
    )

    const file = await response.json()

    return file.secure_url;

  }

  async function addVideo() {
    if (
      videoTitle.length === 0 ||
      videoID.length === 0
    ) {
      setMessage({
        type: "error",
        title: "Check all fields",
        text: `All of the fields on this form are required`
      })
      return
    }

    // Upload Thumbnail
    if (thumbnail) {
      await uploadFile(thumbnail).then((file_url) => {
        addGuide({
          variables: {
            videoTitle,
            videoUrl: `https://www.youtube.com/embed/${videoID}`,
            videoID,
            videoThumb: file_url,
            topics: topics.map(topic => {
              return {
                id: topic.id
              }
            })
          }
        }).then((response) => {
          setMessage({
            type: "success",
            title: "Video Added",
            text: `The video <strong>${videoTitle}</strong> has been added`
          })

          setVideoTitle("");
          setVideoID("");
          setTopics([]);
        })
      })
    } else {
      addGuide({
        variables: {
          videoTitle,
          videoUrl: `https://www.youtube.com/embed/${videoID}`,
          videoID,
          videoThumb,
          topics: topics.map(topic => {
            return {
              id: topic.id
            }
          })
        }
      }).then((response) => {
        setMessage({
          type: "success",
          title: "Video Added",
          text: `The video <strong>${videoTitle}</strong> has been added`
        })

        setVideoTitle("");
        setVideoID("");
        setTopics([]);
      })
    }
  }

  /* TOPICS */
  function addTopic() {
    if (topic.length === 0 || topics.includes(topic)) {
      setTopic("")
      return
    }

    const exists = allTopics.find(t => t.topic === topic)
    if (exists) {
      setTopics(prevState => ([
        exists,
        ...prevState
      ]))
    } else {
      createTopic({
        variables: {
          topic: topic
        }
      }).then(response => {
        setTopics(prevState => ([
          response.data.createTopic,
          ...prevState
        ]))
      })

    }
    setTopic("");
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTopic();
    }
  }

  function handleChangeFile(e) {
    setThumbnail(e.target.files[0])
  }

  function removeTopic(topicToRemove) {
    // If there is only one topic it ends up being null
    if (topics.length === 1) {
      setTopics([]);
    } else {
      setTopics(prevState => {
        return prevState.filter(topic => {
          if (topic.id === topicToRemove.id) return false
          return true
        })
      })
    }
  }

  useEffect(() => {
    if (data) {
      setAllTopics(data.topics);
    }
  }, [data])

  if (loading) return <Loader />
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
          <label>Video ID</label>
          <p style={{ fontSize: "14px", maxWidth: "100%" }}>Just the ID part of the url ie. https://youtube.com/watch?v=<strong>r2TWtjhNDww</strong></p>
          <input
            type="text"
            placeholder="Video ID"
            value={videoID}
            onChange={e => setVideoID(e.target.value)} />
        </FormBlock>
        <FormBlock>
          <label>Thumbnail</label>
          <p>
            <input type="file" name="file" onChange={handleChangeFile} />
          </p>
        </FormBlock>
        <FormBlock>
          <h3>Topics</h3>
          <p>Enter the topic(s) that this video aim's to cover.</p>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              value={topic}
              placeholder="Climate Chaos..."
              onKeyPress={handleKeyPress}
              onChange={(e) => setTopic(e.target.value)} />
            <Button
              secondary
              style={{ marginLeft: "1rem", width: "100px", height: "auto" }}
              onClick={(e) => { e.preventDefault(); addTopic(e.target.value) }}
              iconLeft={faPlus}>Add</Button>
          </div>
          <MediumSpace>
            {topics.map(topic => (
              <Tag
                key={topic.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}>{topic.topic}</Tag>
            ))}
          </MediumSpace>
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