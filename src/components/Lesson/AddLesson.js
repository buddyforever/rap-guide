import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import auth from '../../auth/auth'
import { Editor } from '@tinymce/tinymce-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { Select, Button, ButtonBlock, FormBlock, FormPage, Form, DropZone, LinkButton } from '../../styles/FormStyles'
import { StyledContent, Heading } from '../../styles/PageStyles'
import { setLocalStorage, getLocalStorage } from '../../utilities/LocalStorage'
import Lyric from '../Guide/Lyric'
import { Modal } from "../../styles/ModalStyles"

const variants = {
  open: { x: "-50vw" },
  closed: { x: "100%" },
}

export const AddLesson = () => {

  let { id } = useParams();

  const [guide, setGuide] = useState();
  const [lessonDetails, setLessonDetils] = useState("<div>This is the lesson details");
  const [attachments, setAttachments] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [emailToAdd, setEmailToAdd] = useState("");
  const [emails, setEmails] = useState([]);

  const [isNoteOpen, setIsNoteOpen] = useState(false);

  function closeModal() {
    setIsNoteOpen(false);
  }

  function addStudent(e) {
    e.preventDefault();
    setEmails(prevState => [...prevState, emailToAdd]);
    setEmailToAdd("");
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      addStudent(e);
    }
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

  function addAttachment() {
    let attachment = {
      title: "This is a document title.pdf"
    }
    setAttachments(prevState => [...prevState, attachment]);
  }

  function handleAddDocument(document) {
    // TODO Create function to handle managing documents
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
                <FormPage>
                  <FormBlock>
                    <h3>Lesson Details</h3>
                    <p>This is placeholder text that will describe what this rich text editor is for.</p>
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
                  <FormBlock>
                    <h3>Supporting Documents</h3>
                    <p>This is placeholder text that will describe what kind of documents can be added and how to manage them.</p>

                    <DropZone onClick={addAttachment}>
                      <span>Click or Drop files here to be uploaded</span>
                    </DropZone>

                    <div className="attachments">
                      {attachments.map(attachment => (
                        <StyledAttachment className="attachment">
                          <span className="attachment__type">
                            <FontAwesomeIcon icon={faFilePdf} />
                          </span>
                          <span className="attachment__title">
                            <a href="">{attachment.title}</a>
                          </span>
                          <span className="attachment__visible">
                            <Select>
                              <option value="0">Visible To Me & My Students</option>
                              <option value="1">Visible To Teachers Only</option>
                              <option value="2">Visible To Me Only</option>
                            </Select>
                          </span>
                        </StyledAttachment>
                      ))}

                    </div>
                  </FormBlock>
                </FormPage>
              }

              {page === 1 &&
                <FormPage>
                  <FormBlock>
                    <h3>Lyrics</h3>
                    <p>Select which lyrics are available for annotation. If no lyrics are assigned all lyrics will be available for students to annotate.</p>
                  </FormBlock>
                  <FormBlock>
                    <p>
                      <LinkButton onClick={selectAllLyrics}>Assign All</LinkButton> | <LinkButton onClick={selectNoLyrics}>Assign None</LinkButton>
                    </p>
                    {lyrics.map(lyric => (
                      <StyledLyric className={lyric.assigned ? "active" : ""}>
                        <span>{lyric.example ? "* " : ""}{lyric.lyric}</span>
                        <span className="options">
                          <input
                            type="checkbox"
                            name="assigned"
                            checked={lyric.assigned}
                            onChange={(e) => {
                              updateAssigned(lyric.id, e.target.checked);
                            }} /> Assign | <input type="checkbox"
                              name="example"
                              checked={lyric.example}
                              onChange={(e) => {
                                updateExample(lyric.id, e.target.checked);
                              }} /> Example | <a href="#" onClick={() => setIsNoteOpen(true)}>Add Note</a>
                        </span>
                      </StyledLyric>
                    ))}
                  </FormBlock>
                </FormPage>
              }

              {page === 2 &&
                <FormPage>
                  <FormBlock>
                    <h3>Students</h3>
                    <p>Enter the email addresses of the students you wish to enroll in this lesson.</p>
                  </FormBlock>
                  <FormBlock>
                    <label>Enter Email Address</label>
                    <div style={{ display: "flex" }}>
                      <input type="text" value={emailToAdd} placeholder="someone@domain.com" onChange={(e) => setEmailToAdd(e.target.value)} onKeyPress={handleKeyPress} />
                      <Button style={{ marginLeft: "1rem", width: "200px" }} onClick={addStudent}>Add Student</Button>
                    </div>
                  </FormBlock>
                  <FormBlock>
                    {emails.map(email => (
                      <div>{email}</div>

                    ))}
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
    padding-left: 1rem;
    font-size: 1.2rem;
    opacity: 0;
    transition: all .3s ease;
  }

  &:hover .options {
    opacity: 1;
  }
`