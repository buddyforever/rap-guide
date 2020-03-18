import React, { useState, useEffect } from 'react'
import { StyledContent, Heading, Split, StyledVideo, LargeSpace, ActivityList } from '../../styles/PageStyles'
import { Button } from '../../styles/FormStyles'
import { Link } from 'react-router-dom'
import { getLocalStorage } from '../../utilities/LocalStorage'
import styled from 'styled-components'

const EditLesson = ({ lesson }) => {

  const [video, setVideo] = useState();

  // Needs to come from Lesson
  const [students, setStudents] = useState([
    {
      nameFirst: "Jesse",
      nameLast: "Burton",
      email: "jessejburton@gmail.com",
      image: 'https://lh3.googleusercontent.com/a-/AOh14GhFljvVF8Gd9N-zHCjhihwEDLpIo1bmYqMUMOuXvw=s96-c',
      submitted: []
    }
  ])

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
          <Heading>
            <Split>
              <div>
                <h2>{lesson.title}</h2>
              </div>
              <div style={{ textAlign: "right" }}>
                <Link to={"/lesson/edit/" + lesson.lessonId}>
                  <Button>Edit Lesson</Button>
                </Link>
              </div>
            </Split>
          </Heading>
          <LargeSpace>
            <Split>
              <div>
                <h2>Lesson Data</h2>
                <p><strong>Students</strong> <span>0/{lesson.maxStudents}</span> enrolled</p>
                <p><strong>Lyrics</strong> <span>{lesson.lyrics.filter(lyric => lyric.assigned).length}/{lesson.lyrics.length}</span> assigned</p>
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
            {students.map(student => (
              <Student>
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
`