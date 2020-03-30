import React, { useState, useEffect, useContext } from 'react'
import { StyledContent, Heading, Split, StyledVideo, LargeSpace, ActivityList } from '../../styles/PageStyles'
import { Button, Autoreply, FormBlock } from '../../styles/FormStyles'
import { Link } from 'react-router-dom'
import { getLocalStorage } from '../../utilities/LocalStorage'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { LessonContext } from '../../context/LessonContext'

const EditLesson = () => {

  const [video, setVideo] = useState();

  const { lesson, setLesson } = useContext(LessonContext);

  let domain
  if (window.location.port) {
    domain = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
  } else {
    domain = window.location.protocol + "//" + window.location.hostname;
  }

  const [lessonSignupUrl, setLessonSignupUrl] = useState(domain + "/lesson/signup/" + lesson.lessonId);
  const [copied, setCopied] = useState(false);
  const [students, setStudents] = useState(lesson.students || [])

  function loadVideo() {
    if (getLocalStorage("guides")) {
      setVideo(getLocalStorage("guides").filter(guide => guide.videoId === lesson.videoId)[0]);
    }
  }

  useEffect(() => {
    loadVideo();
  }, []);

  return (
    <StyledContent>
      {lesson &&
        <>
          <Heading>
            <h1>Educator Dashboard</h1>
          </Heading>
          {copied && (
            <Autoreply
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
            >
              <p>The signup url for this lesson has been copied to your clipboard.</p>
              <p style={{ "fontStyle": "italic", "fontSize": "1.2rem" }}>{lessonSignupUrl}</p>
            </Autoreply>
          )}
          <Heading>
            <Split>
              <div>
                <h2>{lesson.title}</h2>
              </div>
              <div style={{ display: "flex", "justifyContent": "flex-end" }}>
                <CopyToClipboard
                  text={lessonSignupUrl}
                  onCopy={() => setCopied(true)}>
                  <div>
                    <input
                      type="hidden"
                      readonly
                      value={lessonSignupUrl}
                    />
                    <Button
                      title="Click to copy the signup url to your clipboard"
                      style={{ marginRight: "1rem" }}
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon icon={faCopy} /> Copy Signup Url
                    </Button>
                  </div>
                </CopyToClipboard>
                <Link to={"/lesson/edit/" + lesson.lessonId}>
                  <Button>Edit Lesson</Button>
                </Link>
              </div>
            </Split>
          </Heading>
          <LargeSpace>
            <Split>
              <div>
                <p><Data>{lesson.students ? lesson.students.length : 0}/{lesson.maxStudents}</Data> <span>Students enrolled</span></p>
                <p><Data>{lesson.lyrics.filter(lyric => lyric.assigned).length}/{lesson.lyrics.length}</Data> Lyrics assigned</p>
                <p><Data>{lesson.annotations.length}</Data> Submitted annotations</p>
              </div>
              <div>
                <h2>Recent Activity</h2>
                <ActivityList>
                  <li><a href="mailto:jessejburton@gmail.com">jessejburton@gmail.com</a> just enrolled in your course.</li>
                  <li><a href="mailto:jessejburton@gmail.com">jessejburton@gmail.com</a> just submitted an <a href="#">annotation</a>.</li>
                </ActivityList>
              </div>
            </Split>
          </LargeSpace>
          <LargeSpace>
            <Heading>
              <h2>Students</h2>
            </Heading>
            {!students.length && (<div>
              <p style={{ fontWeight: "bold" }}>There are currently no students enrolled in this lesson.</p>
              <p>If you haven't already done so, you can send the signup link to your students to enable them to enroll.</p>
              <FormBlock style={{ margin: "5rem 0" }}>
                <CopyToClipboard
                  text={lessonSignupUrl}
                  onCopy={() => setCopied(true)}>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      readonly
                      value={lessonSignupUrl}
                    />
                    <Button
                      title="Click to copy the signup url to your clipboard"
                      style={{ marginLeft: "1rem", width: "200px" }}
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon icon={faCopy} /> Copy Signup Url
                    </Button>
                  </div>
                </CopyToClipboard>
              </FormBlock>
            </div>)}
            {students.map((student, index) => (
              <Student key={index}>
                <div>
                  <div className="image">
                    <img src={student.image} alt={student.nameFirst + ' ' + student.nameLast} />
                  </div>
                </div>
                <div>{student.nameFirst} {student.nameLast}</div>
                <div><a href={`mailto:${student.email}`}>{student.email}</a></div>
                <div>
                  {student.submitted.length ? "submitted" : "not submitted"}
                </div>
              </Student>
            ))}
          </LargeSpace>
        </>
      }
    </StyledContent>
  )
}

export default EditLesson;

const Student = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr;
  align-items: center;
  column-gap: 2.5rem;
  padding: 1rem;
  background-color: #EEE;
  border-radius: 3px;
  text-align: center;

  .image {
    border-radius: 50%;
    overflow: hidden;
    height: 4rem;
    width: 4rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  a, a:link {
    text-decoration: none;
    color: inherit;
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
    transition: all .3s ease;
    padding: 0 .2rem;
    white-space: nowrap;
    margin: 0 .2rem;
  }

  a:hover {
    background-color: rgba(221, 51, 51, 0.6);
    color: white;
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0);
  }
`

const Data = styled.span`
  font-size: 3rem;
  margin-right: 1rem;
  color: #DD3333;
  font-weight: 700;
`