import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import auth from '../../auth/auth'
import { Editor } from '@tinymce/tinymce-react';
import { Button, ButtonBlock, FormBlock, FormPage, Form, LinkButton } from '../../styles/FormStyles'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import Topic from '../Topic'
import Lyric from '../Guide/Lyric'
import { Modal } from "../../styles/ModalStyles"
import Checkbox from "../Form/Checkbox"
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faCopy, faStar } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Message from '../Layout/Message'
import { UserContext } from '../../context/UserContext'

const variants = {
  open: { x: "-50vw", opacity: 1 },
  closed: { x: "100%", opacity: 0 }
}

const pageVariants = {
  initial: { x: "50px", opacity: 0 },
  show: { x: 0, opacity: 1 },
  exit: { opacity: 0 },
}

export const AddLesson = () => {

  /* Context */
  const { user } = useContext(UserContext);

  /* Paramaters */
  let { id } = useParams(); // Guide

  /* Queries */
  const { loading, data } = useQuery(GET_GUIDE, {
    variables: {
      id: id
    }
  })
  const [createLesson] = useMutation(CREATE_LESSON);

  const [guide, setGuide] = useState(null);
  const [lessonDescription, setLessonDescription] = useState("<div>This is the lesson details");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const [page, setPage] = useState(0);
  const [maxStudents, setMaxStudents] = useState(null);
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("");
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedLyric, setSelectedLyric] = useState(null);
  const [noteType, setNoteType] = useState("Note");
  const [note, setNote] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [lessonSignupUrl, setLessonSignupUrl] = useState();
  const [message, setMessage] = useState(false);

  function closeModal() {
    setIsNoteOpen(false);
  }

  function assignAllLyrics(e) {
    e.preventDefault();
    setLyrics(prevState => prevState.map(lyric => {
      return !lyric.example ? {
        ...lyric,
        assigned: true
      } : lyric
    }))
  }

  function assignNoLyrics(e) {
    e.preventDefault();
    setLyrics(prevState => prevState.map(lyric => {
      return !lyric.example ? {
        ...lyric,
        assigned: false
      } : lyric
    }))
  }

  function updateAssigned(id, value) {
    setLyrics(prevState => prevState.map(lyric => {
      if (lyric.id === id) {
        return {
          ...lyric,
          assigned: value
        }
      } else {
        return lyric;
      }
    }))
  }

  /* TOPICS */
  function addTopic(topic) {
    if (topic.length === 0) return
    setTopics((prevState) => [...prevState, topic]);
    setTopic("");
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTopic(e.target.value);
    }
  }

  function removeTopic(topicToRemove) {
    // If there is only one topic it ends up being null
    if (topics.length === 1) {
      setTopics([]);
    } else {
      setTopics(prevState => {
        return prevState.filter(topic => {
          if (topic === topicToRemove) return false
          return true
        })
      })
    }
  }

  // TinyMCE Editors
  function handlelessonDescriptionContent(content, editor) {
    setLessonDescription(content);
  }
  function handleNoteContent(content, editor) {
    setNote(content);
  }

  /* LYRICS */
  function saveNote() {
    setLyrics((prevState) => {
      return prevState.map(lyric => {
        if (lyric.id === selectedLyric.id) {
          return {
            ...lyric,
            example: noteType === "Example" ? true : false,
            notes: note,
            assigned: noteType === "Note" ? true : false
          }
        } else {
          return lyric;
        }
      })
    });
    setNote("");
    setNoteType("Note");
    closeModal();
  }

  function selectLyric(lyric) {
    setNoteType(lyric => lyric.example ? "Example" : "Note");
    setNote(lyric.notes);
    setSelectedLyric(lyric);
  }

  /* SAVE THE LESSON */
  async function saveLesson(e) {
    e.preventDefault();

    let domain
    if (window.location.port) {
      domain = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    } else {
      domain = window.location.protocol + "//" + window.location.hostname;
    }

    let filteredLyrics = lyrics.filter(lyric => {
      if (!lyric.assigned && !lyric.example) return false
      return true
    });

    await createLesson({
      variables: {
        lessonTitle,
        lessonDescription,
        maxStudents: parseInt(maxStudents),
        guide: {
          id: id
        },
        account: {
          id: "ck8qmxihbkhqq0b20saifky4d"
        },
        topics: topics.map(topic => {
          return {
            status: "PUBLISHED",
            topic,
            guides: {
              connect: {
                id: guide.id
              }
            }
          }
        }),
        lessonLyrics: filteredLyrics.map(lyric => {
          return {
            status: "PUBLISHED",
            isExample: lyric.example,
            isAssigned: lyric.assigned,
            notes: lyric.notes,
            lyric: {
              connect: {
                id: lyric.id
              }
            }
          }
        })
      }
    }).then(({ data: { createLesson } }) => {
      setLessonSignupUrl(domain + "/lesson/signup/" + createLesson.id);
      setPage(3);
    })
  }

  /* Effects */
  // Scroll to the top when the page changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page]);

  useEffect(() => {
    if (!data) return
    setGuide(data.guide);
    setTopics(data.guide.topics.map(topic => {
      return topic.topic
    }));
    setLyrics(data.guide.lyrics.map(lyric => {
      return {
        isExample: false,
        isAssigned: false,
        notes: '',
        ...lyric
      }
    }));
  }, [data])

  if (loading || !guide) return null;
  return (
    <StyledContent>
      <div>
        <Heading>
          <h1>Lesson Setup</h1>
          <h2>{lessonTitle.length ? lessonTitle : "Creating a lesson for"} - <a href={`https://www.youtube.com/watch?v=${guide.videoId}`} target="_blank">{guide.videoTitle}</a></h2>
        </Heading>
        <Message message={message} />
        <Form>
          {page === 0 &&
            <FormPage initial="initial" animate="show" exit="exit" variants={variants}>
              <FormBlock>
                <h3>Lesson Details</h3>
                <p>This is placeholder text that will describe what this rich text editor is for.</p>
                <MediumSpace style={{ display: "flex", justifyContent: "space-between" }}>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="Give this lesson a name..." />
                </MediumSpace>
                <Editor
                  initialValue="<p></p>"
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
                  onEditorChange={handlelessonDescriptionContent}
                />
              </FormBlock>
              <FormBlock>
                <label>Enter the topic(s) that this lesson plan aim's to cover.</label>
                <div style={{ display: "flex" }}>
                  <input type="text" value={topic} placeholder="Climate Chaos" onKeyPress={handleKeyPress} onChange={(e) => setTopic(e.target.value)} />
                  <Button style={{ marginLeft: "1rem", width: "200px" }} onClick={(e) => { e.preventDefault(); addTopic(topic) }}>Add Topic</Button>
                </div>
                <MediumSpace>
                  {topics.map(topic => (
                    <Topic
                      key={topic}
                      topic={topic}
                      onRemove={() => removeTopic(topic)} />
                  ))}
                </MediumSpace>
              </FormBlock>
            </FormPage>
          }

          {page === 1 &&
            <FormPage initial="initial" animate="show" exit="exit" variants={pageVariants}>
              <FormBlock>
                <h3>Lyrics</h3>
                <p>Select which lyrics are available for annotation. You can also add notes or create an example annotation.</p>
              </FormBlock>
              <FormBlock>
                <p>
                  <LinkButton onClick={assignAllLyrics}>Assign All</LinkButton> | <LinkButton onClick={assignNoLyrics}>Assign None</LinkButton>
                </p>
                {lyrics.map(lyric => (
                  <StyledLyric
                    key={lyric.id}
                    className={
                      lyric.assigned && !lyric.example ? "assigned"
                        : lyric.example ? "example"
                          : selectedLyric && selectedLyric.id === lyric.id ? "selected"
                            : ""
                    }
                  >
                    <div>
                      <span className="options">
                        {!lyric.example &&
                          <label style={{ display: "inline-block", marginBottom: 0 }}>
                            <Checkbox
                              alt="Assign this lyric"
                              style={{ cursor: "pointer" }}
                              checked={lyric.assigned}
                              onChange={(e) => {
                                updateAssigned(lyric.id, e.target.checked);
                                selectLyric(lyric);
                              }}
                            />
                          </label>
                        }
                      </span>
                      <span
                        className="lyric"
                        role="button"
                        onClick={() => {
                          selectLyric(lyric);
                          setIsNoteOpen(true)
                        }}
                        style={{ cursor: "pointer" }}>
                        {lyric.lyric}
                        {lyric.example &&
                          <span style={{ marginLeft: "1rem", color: "rgba(35,163,213)" }}>
                            <FontAwesomeIcon icon={faStar} />
                          </span>
                        }
                        {lyric.notes.length > 0 && !lyric.example && (
                          <span style={{ marginLeft: "1rem", color: "#DD3333" }}>
                            <FontAwesomeIcon icon={faComment} />
                          </span>)
                        }
                      </span>
                    </div>
                  </StyledLyric>
                ))}
              </FormBlock>
            </FormPage>
          }

          {page === 2 &&
            <FormPage initial="initial" animate="show" exit="exit" variants={variants}>
              <FormBlock>
                <h3>Students</h3>
                <p>Enter the maximum number of students expected to enroll in this class.</p>
              </FormBlock>
              <FormBlock>
                <input
                  type="number"
                  value={maxStudents}
                  onChange={(e) => setMaxStudents(e.target.value)}
                  placeholder="20..." />
              </FormBlock>
            </FormPage>
          }

          {page === 3 &&
            <FormPage initial="initial" animate="show" exit="exit" variants={variants}>
              <FormBlock>
                <h3>All Done!</h3>
                <p>Your course is now ready for enrollment. Send the following url to your students so that they can sign up.</p>
              </FormBlock>
              <FormBlock>
                <CopyToClipboard text={lessonSignupUrl}
                  onCopy={() => setMessage({ text: "The link has been copied to your clipboard." })}>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      readOnly
                      value={lessonSignupUrl}
                    />
                    <Button
                      title="Click to copy the url to your clipboard"
                      style={{ marginLeft: "1rem", width: "100px" }}
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon icon={faCopy} /> Copy
                        </Button>
                  </div>
                </CopyToClipboard>
              </FormBlock>
            </FormPage>
          }

          <ButtonBlock
            style={{ position: "sticky", bottom: 0, paddingBottom: "2.5rem", backgroundColor: "white" }}
          >
            {page === 0 && <Link to="">Cancel</Link>}
            {page > 0 && page < 3 && <Button onClick={(e) => {
              e.preventDefault();
              setPage(page - 1)
            }}>Back</Button>
            }
            {page < 2 && <Button onClick={(e) => {
              e.preventDefault();
              setPage(page + 1)
            }}>Next</Button>
            }
            {page === 2 && <Button onClick={saveLesson}>Save Lesson</Button>}
            {page === 3 && <Button onClick={() => setRedirect(true)}>View Lessons</Button>}
          </ButtonBlock>
        </Form>
      </div>
      <Modal
        variants={variants}
        initial="closed"
        animate={isNoteOpen ? "open" : "closed"}
        transition={{ damping: 300 }} >
        {selectedLyric &&
          <div>
            <Heading>
              <h1>Add {noteType}</h1>
              <AnimatePresence>
                {selectedLyric &&
                  <motion.h2
                    style={{ color: "#DD3333" }}
                    key={selectedLyric.id}
                    variants={pageVariants}
                    initial="initial"
                    animate="show"
                    exit={{ display: "none" }}>
                    {selectedLyric.lyric}
                  </motion.h2>
                }
              </AnimatePresence>
            </Heading>
            <FormBlock>
              <Editor
                initialValue="<p></p>"
                value={note}
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
                onEditorChange={handleNoteContent}
              />
              <MediumSpace style={{ textAlign: "right" }}>
                <p>
                  <label style={{ cursor: "pointer" }}>
                    <span style={{ marginRight: "1rem" }}>Make this an example annotation </span>
                    <Checkbox
                      checked={noteType === "Example" || selectedLyric.example === true}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNoteType("Example");
                        } else {
                          setNoteType("Note");
                        }
                      }}
                    />
                  </label>
                </p>
              </MediumSpace>
            </FormBlock>
            <ButtonBlock>
              <LinkButton onClick={() => setIsNoteOpen(false)}>Cancel</LinkButton>
              <Button onClick={saveNote}>Save {noteType}</Button>
            </ButtonBlock>
          </div>
        }
      </Modal>
      {redirect && <Redirect to="/lessons" />}
    </StyledContent>
  )
}

export default AddLesson;

const StyledContentd = styled.div`
  header {
        margin: 25px 0;
  }

  form {
    .form-block {
        margin: 2.5rem 0;
    }

    .attachments {
      display: flex;
      flex-direction: column;
      column-gap: 2.5rem;
      width: 100%;
      margin-top: 2.5rem;
    }
  }

  .edges {
    display: flex;
    justify-content: space-between;
  }

  .button-group {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid black;
  }
`

const StyledAttachment = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  .attachment__type {
    color: #DD3333;
  }
`

const StyledLyric = styled.div`
  margin-bottom: 0.5rem;
  transition: all .3s ease;
  padding: .5rem;
  cursor: pointer;
  display: block;
  position: relative;

  .lyric {
    padding: 0.5rem;
  }

  &:hover .lyric {
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
  }

  &.selected .lyric {
    font-weight: bold;
    color: #DD3333;
  }

  .options {
    position: absolute;
    left: -3rem;
    padding: 0 1rem;
    opacity: 0;
    transition: all .3s ease;
  }

  &:hover .options,
  &.assigned .options {
    opacity: 1;
  }

  &.example .lyric {
    cursor: pointer;
    background-color:  rgba(35,163,213,0.3);
  }

  &.assigned:hover .lyric {
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
  }

  &.assigned .lyric {
    cursor: pointer;
    background-color:  rgba(221, 51, 51, 0.2);
  }

`

const GET_GUIDE = gql`
  query getGuide($id:ID!) {
    guide(where: {id:$id}) {
      id
      videoId
      videoUrl
      videoTitle
      videoThumb
      topics {
        id
        topic
      }
      lyrics {
        id
        lyric
      }
    }
  }
`

const CREATE_LESSON = gql`
  mutation createLesson(
    $lessonTitle:String!,
    $lessonDescription:String!,
    $maxStudents: Int!,
    $guide: GuideWhereUniqueInput!,
    $account: AccountWhereUniqueInput!,
    $topics: [TopicCreateWithoutLessonsInput!],
    $lessonLyrics: [LessonLyricCreateWithoutLessonInput!]
  ) {
    createLesson(data: {
      status: PUBLISHED
      lessonTitle: $lessonTitle
      lessonDescription: $lessonDescription
      maxStudents: $maxStudents
      guide: { connect: $guide }
      account: { connect: $account }
      topics: { create: $topics }
      lessonLyrics: { create: $lessonLyrics }
    }){
    id
    }
  }
`