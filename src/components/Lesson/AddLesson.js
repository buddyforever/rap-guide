import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import auth from '../../auth/auth'
import { Editor } from '@tinymce/tinymce-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { Select, Button, ButtonBlock, FormBlock, FormPage, Form, DropZone, LinkButton } from '../../styles/FormStyles'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { setLocalStorage, getLocalStorage } from '../../utilities/LocalStorage'
import Lyric from '../Guide/Lyric'
import { Modal } from "../../styles/ModalStyles"
import Checkbox from "../Form/Checkbox"
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  initial: { x: "50px", opacity: 0 },
  show: { x: 0, opacity: 1 },
  exit: { opacity: 0 },
}

export const AddLesson = () => {

  let { id } = useParams();

  const [guide, setGuide] = useState();
  const [lessonDetails, setLessonDetils] = useState("<div>This is the lesson details");
  const [attachments, setAttachments] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [maximumStudents, setMaximumStudents] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  function closeModal() {
    setIsNoteOpen(false);
  }

  function loadGuide() {
    setGuide(JSON.parse(getLocalStorage("guides")).filter(guide => guide.videoId = id)[0]);
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
      return {
        ...lyric,
        assigned: lyric.id === id ? value : lyric.assigned
      }
    }))
  }

  function updateExample(id, value) {
    setLyrics(prevState => prevState.map(lyric => {
      return {
        ...lyric,
        example: lyric.id === id ? value : lyric.example
      }
    }))
  }

  function saveLesson() {
    const lesson = {
      lesson_id: 1,
      video_id: id,
      details: lessonDetails,
      documents: attachments,
      lyrics: lyrics,
      students: students
    };

    setLocalStorage("lesson", JSON.stringify(lesson));
  }

  function handleEditorChange(content, editor) {
    setLessonDetils(content);
  }

  useEffect(() => {
    loadGuide();
  }, []);

  useEffect(() => {
    // Get the lyrics ready for the lesson
    if (guide) {
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

  return (
    <StyledContent>
      {
        !guide ? <div>LOADING...</div> : (
          <div>
            <Heading>
              <h1>Lesson Setup</h1>
              <h2>Creating a lesson for - <a href={`https://www.youtube.com/watch?v=${guide.videoId}`} target="_blank">{guide.title}</a></h2>
            </Heading>

            <Form>
              {page === 0 &&
                <FormPage initial="initial" animate="show" exit="exit" variants={variants}>
                  <FormBlock>
                    <h3>Lesson Details</h3>
                    <p>This is placeholder text that will describe what this rich text editor is for.</p>
                    <MediumSpace style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ width: "360px" }}>
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
                      onEditorChange={handleEditorChange}
                    />
                  </FormBlock>
                </FormPage>
              }

              {page === 1 &&
                <FormPage initial="initial" animate="show" exit="exit" variants={variants}>
                  <FormBlock>
                    <h3>Lyrics</h3>
                    <p>Select which lyrics are available for annotation. If no lyrics are assigned all lyrics will be available for students to annotate.</p>
                  </FormBlock>
                  <FormBlock>
                    {lyrics.map(lyric => (
                      <StyledLyric role="button" onClick={() => setIsNoteOpen(true)} className={lyric.assigned ? "active" : ""}>
                        <label style={{ marginBottom: 0, cursor: "pointer" }}>
                          <span className="options">
                            <Checkbox
                              checked={lyric.assigned}
                              onChange={(e) => {
                                updateAssigned(lyric.id, e.target.checked);
                              }}
                            />
                          </span>
                          {lyric.example ? "* " : ""}{lyric.lyric}
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
                    <label>Number of Students</label>
                    <input type="text" value={maximumStudents} onChange={(e) => setMaximumStudents(e.target.value)} />
                  </FormBlock>
                </FormPage>
              }

              <ButtonBlock>
                {page === 0 && <Link to="">Cancel</Link>}
                {page > 0 && <Button onClick={(e) => {
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
        <h1>Add Note</h1>
        <FormBlock>
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
            onEditorChange={handleEditorChange}
          />
        </FormBlock>
        <ButtonBlock>
          <LinkButton onClick={() => setIsNoteOpen(false)}>Cancel</LinkButton>
          <Button onClick={() => setIsNoteOpen(false)}>Save Note</Button>
        </ButtonBlock>
      </Modal>
    </StyledContent >
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