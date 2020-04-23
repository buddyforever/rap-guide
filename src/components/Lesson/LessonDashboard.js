import React, { useState, useEffect } from 'react'
import { StyledContent, Heading, Split, LargeSpace, ActivityList } from '../../styles/PageStyles'
import { Button, Autoreply, FormBlock } from '../../styles/FormStyles'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@apollo/react-hooks'
import { GET_LESSON_BY_ID } from '../../queries/lessons'
import Loader from '../Loader'
import Message from '../Layout/Message'

const LessonDashboard = ({ id }) => {

  /* Queries */
  const { loading, data } = useQuery(GET_LESSON_BY_ID, {
    variables: {
      id
    }
  });

  /* State */
  const [message, setMessage] = useState(false);

  let domain
  if (window.location.port) {
    domain = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
  } else {
    domain = window.location.protocol + "//" + window.location.hostname;
  }

  const [lessonSignupUrl, setLessonSignupUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!data) return
    setLessonSignupUrl(domain + "/lesson/signup/" + data.lesson.id)
  }, [data]);

  if (loading) return <Loader />
  console.log(data.lesson)
  return (
    <StyledContent>
      <Heading>
        <h1>Educator Dashboard</h1>
      </Heading>
      <Message message={message} />
      <Heading>
        <Split>
          <div>
            <h2>{data.lesson.lessonTitle}</h2>
          </div>
          <div style={{ display: "flex", "justifyContent": "flex-end" }}>
            <CopyToClipboard
              text={lessonSignupUrl}
              onCopy={() => setMessage({ text: `The following link has been copied to your clipboard. ${lessonSignupUrl}` })}>
              <div>
                <input
                  type="hidden"
                  readOnly
                  value={lessonSignupUrl}
                />
                <Button
                  title="Click to copy the signup url to your clipboard"
                  style={{ marginRight: "1rem" }}
                  onClick={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={faCopy} /> Copy Signup Link
                    </Button>
              </div>
            </CopyToClipboard>
            <Link to={"/lesson/edit/" + data.lesson.id}>
              <Button>Edit Lesson</Button>
            </Link>
          </div>
        </Split>
      </Heading>
      <LargeSpace>
        <Split>
          <div>
            <p>
              <Data>
                {data.lesson.lessonStudents ? data.lesson.lessonStudents.length : 0}/{data.lesson.maxStudents}
              </Data>
              <span>Students enrolled</span>
            </p>
            <p>
              <Data>
                {data.lesson.lessonLyrics.filter(lyric => lyric.isAssigned).length}/{data.lesson.guide.lyrics.length}
              </Data>
              <span>Lyrics assigned</span>
            </p>
            <p>
              <Data>
                {data.lesson.lessonLyrics.filter(lyric => lyric.annotations.find(annotation => annotation.isSubmitted)).length}
              </Data>
              <span>Submitted annotations</span>
            </p>
          </div>
          <div>
            {/*
            <h2>Recent Activity</h2>
            <ActivityList>
              <li><a href="mailto:jessejburton@gmail.com">jessejburton@gmail.com</a> just enrolled in your course.</li>
              <li><a href="mailto:jessejburton@gmail.com">jessejburton@gmail.com</a> just submitted an <a href="#">annotation</a>.</li>
            </ActivityList>
            */}
          </div>
        </Split>
      </LargeSpace>
      <LargeSpace>
        <Heading>
          <h2>Students</h2>
        </Heading>
        {!data.lesson.lessonStudents.length && (<div>
          <p style={{ fontWeight: "bold" }}>There are currently no students enrolled in this lesson.</p>
          <p>If you haven't already done so, you can send the signup link to your students to enable them to enroll.</p>
          <FormBlock style={{ margin: "5rem 0" }}>
            <CopyToClipboard
              text={lessonSignupUrl}
              onCopy={() => setCopied(true)}>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  readOnly
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
        {data.lesson.lessonStudents.map(({ account }) => (
          <Student key={account.id}>
            <div>
              <div className="image">
                <img src={account.image} alt={account.nameFirst + ' ' + account.nameLast} />
              </div>
            </div>
            <div>{account.nameFirst} {account.nameLast}</div>
            <div><a href={`mailto:${account.email}`}>{account.email}</a></div>
            <div>
              {account.annotations.length && account.annotations.find(annotation => annotation.isSubmitted) ? "Submitted" : account.annotations.find(annotation => annotation.isApproved) ? "Approved" : "Not Submitted"}
            </div>
          </Student>
        ))}
      </LargeSpace>
    </StyledContent>
  )
}

export default LessonDashboard;

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

