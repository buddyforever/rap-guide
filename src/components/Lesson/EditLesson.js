import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import auth from '../../auth/auth'
import { Editor } from '@tinymce/tinymce-react';
import { Select, Button, ButtonBlock, FormBlock, FormPage, Form, DropZone, LinkButton, Autoreply } from '../../styles/FormStyles'
import { Tag } from '../../styles/TagStyles'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { setLocalStorage, getLocalStorage } from '../../utilities/LocalStorage'
import Lyric from '../Guide/Lyric'
import { Modal } from "../../styles/ModalStyles"
import Checkbox from "../Form/Checkbox"
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faCopy } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

  let { id } = useParams();

  const [guide, setGuide] = useState();
  const [lessonDetails, setLessonDetils] = useState("<div>This is the lesson details");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [maximumStudents, setMaximumStudents] = useState(null);
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedLyric, setSelectedLyric] = useState(null);
  const [noteType, setNoteType] = useState("Note");
  const [note, setNote] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [lessonSignupUrl, setLessonSignupUrl] = useState();
  const [copied, setCopied] = useState(false);

  function closeModal() {
    setIsNoteOpen(false);
  }

  function selectAllLyrics(e) {
    e.preventDefault();
    setLyrics(prevState => prevState.map(lyric => {
      return {
        ...lyric,
        assigned: true
      }
    }))
  }

  function selectNoLyrics(e) {
    e.preventDefault();
    setLyrics(prevState => prevState.map(lyric => {
      return {
        ...lyric,
        assigned: false
      }
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
    setTopics((prevState) => [...prevState, topic]);
    setTopic("");
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTopic(e.target.value);
    }
  }

  /* TODO - move to utility or remove if not needed after adding database */
  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  function saveLesson(e) {
    e.preventDefault();

    const lesson = {
      lessonId: guidGenerator(),
      videoId: id,
      title: lessonTitle,
      details: lessonDetails,
      topics: topics,
      lyrics: lyrics,
      maxStudents: maximumStudents,
      students: []
    };

    // TODO Create a better hash for the URL
    setLessonSignupUrl(window.location.protocol + "//" + window.location.hostname + "/lesson/signup/" + lesson.lessonId);

    // TODO make this update if exists - might not be needed in Local Storage proto
    let lessons = getLocalStorage("lessons") ? getLocalStorage("lessons") : [];
    lessons.push(lesson);
    setLocalStorage("lessons", JSON.stringify(lessons));

    setPage(3);
  }

  function handleLessonDetailsContent(content, editor) {
    setLessonDetils(content);
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
            assigned: true
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

  /* GUIDES */
  function loadGuide() {
    setGuide(getLocalStorage("guides").filter(guide => guide.videoId = id)[0]);
  }

  useEffect(() => {
    loadGuide();
    window.scrollTo(0, 0)
  }, [page]);

  useEffect(() => {
    // Get the lyrics ready for the lesson
    if (guide && lyrics.length === 0) {
      setLyrics(guide.lyrics.map(lyric => {
        return {
          lyric: lyric.lyric,
          id: lyric.id,
          assigned: false,
          example: false,
          notes: ""
        }
      }))
    }
  }, [guide]);

  useEffect(() => {
    console.log(lyrics);
  }, [lyrics]);



  return (
    <StyledContent>
      {
        !guide ? <div>LOADING...</div> : (
          <div>
            <Heading>
              <h1>Lesson Setup</h1>
              <h2>Creating a lesson for - <a href={`https://www.youtube.com/watch?v=${guide.videoId}`} target="_blank">{guide.title}</a></h2>
            </Heading>

            {copied && (
              <Autoreply
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
              >
                <p>The link has been copied to your clipboard.</p>
              </Autoreply>
            )}

            <Form>
              {page === 0 &&
                <FormPage initial="initial" animate="show" exit="exit" variants={variants}>
                  <FormBlock>
                    <h3>Lesson Details</h3>
                    <p>This is placeholder text that will describe what this rich text editor is for.</p>
                    <MediumSpace style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <input
                          type="text"
                          value={lessonTitle}
                          onChange={(e) => setLessonTitle(e.target.value)}
                          placeholder="Give this lesson a name..." />
                      </div>
                      <div>
                        <Select>
                          <option value="">-- Select a Lesson Template (optional) --</option>
                          <option value="">Sample Lesson</option>
                          <option value="">Another Template</option>
                        </Select>
                      </div>
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
                      onEditorChange={handleLessonDetailsContent}
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
                        <Tag
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}>{topic}</Tag>
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
                      <LinkButton onClick={selectAllLyrics}>Assign All</LinkButton> | <LinkButton onClick={selectNoLyrics}>Assign None</LinkButton>
                    </p>
                    {lyrics.map(lyric => (
                      <StyledLyric key={lyric.id} className={lyric.assigned ? "active" : ""}>
                        <label style={{ marginBottom: 0 }}>
                          <span className="options">
                            <Checkbox
                              checked={lyric.assigned}
                              onChange={(e) => {
                                updateAssigned(lyric.id, e.target.checked);
                                selectLyric(lyric);
                              }}
                            />
                          </span>
                          <span
                            role="button"
                            onClick={() => setIsNoteOpen(true)}
                            style={{ cursor: "pointer" }}>
                            {lyric.example ? "* " : ""}{lyric.lyric}
                            {lyric.notes.length > 0 && (
                              <span style={{ marginLeft: "1rem", color: "#DD3333" }}>
                                <FontAwesomeIcon icon={faComment} />
                              </span>)
                            }
                          </span>
                        </label>
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
                      type="text"
                      value={maximumStudents}
                      onChange={(e) => setMaximumStudents(e.target.value)}
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
                      onCopy={() => setCopied(true)}>
                      <div style={{ display: "flex" }}>
                        <input
                          type="text"
                          readonly
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
        )
      }
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

  &:hover {
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
  }

  &.active {
    cursor: pointer;
    background-color:  rgba(221, 51, 51, 0.2);
  }

  &.active:hover {
    background-color: #DD3333;
    color: #fff7f7;
  }

  .options {
    padding: 0 1rem;
    opacity: 0;
    transition: all .3s ease;
  }

  &:hover .options,
  &.active .options {
    opacity: 1;
  }
`