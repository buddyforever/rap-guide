import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import data from '../../data/data.js'
import auth from '../../auth/auth'
import { Editor } from '@tinymce/tinymce-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { Select, Button } from '../../styles/FormStyles'
import { setLocalStorage, clearLocalStorage } from '../../utilities/LocalStorage'

export const AddLesson = () => {

  let { id } = useParams();

  const [video, setVideo] = useState(null)
  const [lessonDetails, setLessonDetils] = useState("<p>This is the lesson details");
  const [lessonDocuments, setLessonDocuments] = useState(["This is the document title.pdf"]);

  function loadData() {
    if (!video) {
      if (localStorage.getItem("video")) {
        setVideo(JSON.parse(localStorage.getItem("video")));
      } else {
        setVideo(data.videos.filter(video => video.id === parseInt(id))[0]);
      }
    }
  }

  function addLesson() {
    const lesson = {
      lesson_id: 1,
      video_id: id,
      details: lessonDetails,
      documents: lessonDocuments
    };

    setLocalStorage("lesson", JSON.stringify(lesson));
  }

  function handleEditorChange(content, editor) {
    setLessonDetils(content);
  }

  function handleAddDocument(document) {
    // TODO Create function to handle managing documents
  }

  useEffect(() => {
    loadData();
  }, [video]);

  return (
    <StyledContent>
      {
        !video ? <div>LOADING...</div> : (
          <div>
            <header>
              <h1>Lesson Setup for {video.title}</h1>
            </header>

            <form>
              <div className="form-block">
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
              </div>
              <div className="form-block">
                <h3>Supporting Documents</h3>
                <p>This is placeholder text that will describe what kind of documents can be added and how to manage them.</p>

                <div className="upload-container">
                  <span>Click or Drop files here to be uploaded</span>
                </div>

                <div className="attachments">
                  <StyledAttachment className="attachment">
                    <span className="attachment__type">
                      <FontAwesomeIcon icon={faFilePdf} />
                    </span>
                    <span className="attachment__title">
                      <a href="">This is the document title.pdf</a>
                    </span>
                    <span className="attachment__visible">
                      <Select>
                        <option value="0">Visible To Me & My Students</option>
                        <option value="1">Visible To Teachers Only</option>
                        <option value="2">Visible To Me Only</option>
                      </Select>
                    </span>
                  </StyledAttachment>
                </div>
              </div>

              <div className="form-block edges button-group">
                <Link to="">Cancel</Link>
                <Button onClick={addLesson}>Next</Button>
              </div>
            </form>
          </div>
        )
      }
    </StyledContent>
  )
}

export default AddLesson;

const StyledContent = styled.div`
  header {
        margin: 25px 0;
  }

  form {
    h3 {
      margin-bottom: 1rem;
    }
    p {
        margin-bottom: 1rem;
    }
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

  .upload-container {
    margin: 25px 0;
    height: 75px;
    border: 1px dashed black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
      background-color: #f3f3f3;
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

  .attachment__type {
    color: #DD3333;
  }
`