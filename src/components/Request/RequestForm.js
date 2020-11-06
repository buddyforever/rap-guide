import React, { useState, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Editor } from '@tinymce/tinymce-react';

import { ThreeGrid, Heading, MediumSpace } from '../../styles/PageStyles'
import { Card } from '../Card'
import { Button } from '../ui'
import Loader from "../Loader"
import { MultiText } from '../ui/MultiText/MultiText'
import { Form, FormBlock, ButtonBlock } from '../../styles/FormStyles'
import { dateFormat } from '../../utilities/DateFormat'
import { UserContext } from '../../context/UserContext'
import { useAuth0 } from "../../react-auth0-spa";

import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_REQUEST, GET_REQUESTS } from '../../queries/requests'
import { SEARCH_VIDEOS } from '../../queries/guides'

export const RequestForm = ({ refetchRequests, setMessage }) => {

  const { isAuthenticated, loginWithRedirect } = useAuth0()

  /* Context */
  const { user, setUser } = useContext(UserContext)

  const [rapGuideTitle, setRapGuideTitle] = useState("")
  const [urls, setUrls] = useState([])
  const [thumb, setThumb] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [rapGuideInformation, setRapGuideInformation] = useState("")
  const [videosToShow, setVideosToShow] = useState([])
  const [searching, setSearching] = useState(false)

  /* Queries */
  const { loading, data, refetch } = useQuery(SEARCH_VIDEOS, {
    variables: {
      term: '-------'
    }
  })
  const [createRequest] = useMutation(CREATE_REQUEST)

  function handleRapGuideInformation(content, editor) {
    setRapGuideInformation(content);
  }

  function handleCreateRequest(e) {
    e.preventDefault()

    let errors = []
    if (rapGuideTitle.length === 0) {
      errors.push("<p>Please enter a Title for your request</p>");
    }
    if (rapGuideInformation.length === 0) {
      errors.push("<p>Please enter some Information about your Idea</p>");
    }

    if (errors.length) {
      setMessage({
        type: "error",
        title: "Please fix these errors",
        text: errors.join(" ")
      })
      return
    }

    createRequest({
      variables: {
        title: rapGuideTitle,
        account: user.id,
        urls: JSON.stringify(urls),
        thumb: thumb || '',
        information: rapGuideInformation
      }
    }).then(() => {
      window.scrollTo(0, 0);
      setRapGuideTitle("")
      setRapGuideInformation("")
      setUrls([])
      setThumb(null)
      setMessage({
        autoDismiss: 10000,
        type: "success",
        title: "Thank You!",
        text: "Your request has been received, your request will show up <a href='#requests'>down below</a> once it has been approved!"
      })
    })
  }

  function searchVideos(term) {
    refetch({
      term: term
    }).then(response => {
      const { data } = response
      if (!data) return

      let videos = data.guides
      data.topics.map(topic => {
        topic.guides.map(guide => {
          if (!videos.find(video => video.id === guide.id)) {
            videos.push(guide)
          }
        })
        return null
      })
      setVideosToShow(videos)
      setSearching(false)
    })
  }

  async function uploadFile(file_data) {
    setUploading(true)
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

    setUploading(false)
    const file = await response.json()
    return file.secure_url;
  }

  function handleChangeFile(e) {
    uploadFile(e.target.files[0]).then((file_url) => {
      setThumb(file_url)
    })
  }

  useEffect(() => {
    if (
      !isAuthenticated ||
      !rapGuideTitle ||
      (rapGuideTitle.length < 3) ||
      searching
    ) return
    setSearching(true)
    searchVideos(rapGuideTitle)
  }, [rapGuideTitle])

  return (
    <Form onSubmit={handleCreateRequest}>
      <Heading style={{ paddingBottom: 0 }}>
        <h1>
          {
            rapGuideTitle.length
              ? 'Rap Guide to ' + rapGuideTitle
              : 'I wish there was a Rap Guide to ...'
          }
        </h1>
      </Heading>
      <FormBlock>
        <input
          type="text"
          placeholder="Enter you Rap Guide Name..."
          value={rapGuideTitle}
          onChange={(e) => setRapGuideTitle(e.target.value)} />
      </FormBlock>
      {loading && <Loader />}
      {(
        isAuthenticated &&
        rapGuideTitle &&
        !loading &&
        data &&
        videosToShow.length > 0) &&
        <motion.div
          key="existing-guides"
          initial={{ opacity: 0, scaleY: 0, height: 0 }}
          animate={{ opacity: 1, scaleY: 1, height: 'auto' }}
        >
          <h3><span>Existing</span> Videos</h3>
          <h2>Is one of these what you're looking for?</h2>
          <MediumSpace>
            <ThreeGrid>
              {videosToShow.map(video => {
                return (
                  <Card
                    initial={{
                      opacity: 0,
                      y: 100
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -50
                    }}
                    noHover={true}
                    key={video.id}
                    title={video.videoTitle}
                    topics={video.topics}
                    link={`/guide/${video.videoSlug}`}
                    headingSize="3rem"
                    image={video.videoThumb}
                    color="#DD3333"
                    buttonText="View Video"
                  />
                )
              })}
            </ThreeGrid>
          </MediumSpace>
        </motion.div>
      }
      {(rapGuideTitle && !isAuthenticated) &&
        <motion.div
          key="please-signup"
          initial={{ opacity: 0, scaleY: 0, height: 0 }}
          animate={{ opacity: 1, scaleY: 1, height: 'auto' }}
          exit={{ opacity: 0, scaleY: 0, height: 0 }}
        >
          <p><strong className="red">GREAT IDEA!</strong> Thank you, for your willingness to share it!</p>
          <p>Please <a href="/profile" onClick={loginWithRedirect} alt="Sign Up">create an account</a> first so that we know who to get in touch with if the request gets created.</p>
        </motion.div>
      }
      {(rapGuideTitle && isAuthenticated) &&
        <motion.div
          key="request-submit"
          initial={{ opacity: 0, scaleY: 0, height: 0 }}
          animate={{ opacity: 1, scaleY: 1, height: 'auto' }}
          exit={{ opacity: 0, scaleY: 0, height: 0 }}
        >
          <FormBlock>
            <h2><span>No luck?</span> didn't find what you're looking for?</h2>
            <h3>Tell us more about your idea!</h3>
            <Editor
              initialValue={rapGuideInformation}
              apiKey="6fh30tpray4z96bvzqga3vqcj57v5hvg2infqk924uvnxr13"
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | link | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
              }}
              onEditorChange={handleRapGuideInformation}
              placeHolder="About your idea..."
            />
          </FormBlock>
          <FormBlock>
            <h3>Thumbnail <span style={{ fontSize: '16px', fontWeight: '400' }}>* optional but recommended</span></h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <input
                  name="thumb"
                  type="file"
                  onChange={handleChangeFile} />
              </div>
              {uploading && <div>Uploading...<br /><Loader /></div>}
              {(thumb && thumb.length) &&
                <div
                  style={{
                    backgroundColor: "black",
                    width: "400px",
                    height: "225px",
                    margin: "25px auto 0 auto"
                  }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain"
                    }}
                    src={thumb}
                    alt={thumb}
                  />
                </div>
              }
            </div>
          </FormBlock>
          <FormBlock>
            <h3>Suggested Sources</h3>
            <MultiText value={urls} setValue={setUrls} placeholder="http://" />
          </FormBlock>
          <ButtonBlock>
            <span></span>
            <Button>REQUEST</Button>
          </ButtonBlock>
        </motion.div>
      }
    </Form>
  )
}
