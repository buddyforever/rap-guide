import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { StyledContent, Heading, Split, LargeSpace, MediumSpace } from '../../styles/PageStyles'
import { FormBlock } from '../../styles/FormStyles'
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'
import Loader from '../Loader'
import { Message } from '../ui/Message'
import { dateFormat } from '../../utilities/DateFormat'
import { Modal } from "../../styles/ModalStyles"
import ReviewAnnotation from '../Annotation/ReviewAnnotation'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_LESSON_BY_ID } from '../../queries/lessons'
import { REVIEW_ANNOTATION } from '../../queries/annotations'

const variants = {
  open: { x: "-50vw" },
  closed: { x: "100%" },
}

const domain = window.location.port ?
  window.location.protocol + "//" + window.location.hostname + ":" + window.location.port :
  window.location.protocol + "//" + window.location.hostname

const LessonDashboardTeacher = ({ lesson, refetch }) => {

  /* Queries */
  const [reviewAnnotation] = useMutation(REVIEW_ANNOTATION);

  /* State */
  const [message, setMessage] = useState(false);
  const [isAnnotationOpen, setIsAnnotationOpen] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [lessonSignupUrl, setLessonSignupUrl] = useState(domain + "/lesson/signup/" + lesson.id);

  /* Non State Variables */
  const students = lesson.accounts.filter(account => account.type === 'student');

  /* Functions */
  function openAnnotationReview(annotation) {
    setSelectedAnnotation(annotation);
    setIsAnnotationOpen(true);
  }

  function closeModal() {
    setSelectedAnnotation(null);
    setIsAnnotationOpen(false);
  }

  function handleApproveAnnotation(annotation) {
    reviewAnnotation({
      variables: {
        id: annotation.id,
        isApproved: annotation.isApproved ? annotation.isApproved : false,
        isSubmitted: annotation.isSubmitted,
        note: annotation.note.note,
        teacherAccountId: annotation.note.account.id
      }
    }).then(() => {
      refetch();
      closeModal();
    });
  }

  function handleRejectAnnotation(annotation) {
    reviewAnnotation({
      variables: {
        id: annotation.id,
        isApproved: annotation.isApproved ? annotation.isApproved : false,
        isSubmitted: annotation.isSubmitted,
        note: annotation.note.note,
        teacherAccountId: annotation.note.account.id
      }
    }).then(() => {
      refetch();
      closeModal();
    });;
  }

  return (
    <StyledContent className="dashboard">
      <Heading>
        <h1>Lesson Dashboard</h1>
        <MediumSpace>
          <LinkButton
            iconLeft={faBackward}
            as={Link}
            to="/lessons">Back to Lessons</LinkButton>
        </MediumSpace>
      </Heading>
      {message &&
        <Message
          toast
          dismiss={() => setMessage(null)}
          title={message.title || ""}
          type={message.type || "default"}>
          {message.text}
        </Message>
      }
      <Heading>
        <Split>
          <div>
            <h2>{lesson.lessonTitle}</h2>
          </div>
          <div style={{ display: "flex", "justifyContent": "flex-end" }}>
            <CopyToClipboard
              text={lessonSignupUrl}
              onCopy={() => setMessage({ title: "The following link has been copied to your clipboard.", text: lessonSignupUrl })}>
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
            <Link to={"/lesson/edit/" + lesson.id}>
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
                {students.length}/{lesson.maxStudents}
              </Data>
              <span>Students enrolled</span>
            </p>
            <p>
              <Data>
                {lesson.lyrics.length}/{lesson.guide.lyrics.length}
              </Data>
              <span>Lyrics assigned</span>
            </p>
            <p>
              <Data>
                {lesson.lyrics.filter(lyric => lyric.annotations.find(annotation => annotation.isSubmitted)).length}
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
        {!students.length && (<div>
          <p style={{ fontWeight: "bold" }}>There are currently no students enrolled in this lesson.</p>
          <p>If you haven't already done so, you can send the signup link to your students to enable them to enroll.</p>
          <FormBlock style={{ margin: "5rem 0" }}>
            <CopyToClipboard
              text={lessonSignupUrl}
              onCopy={() => setMessage({ text: `The following link has been copied to your clipboard. ${lessonSignupUrl}` })}>
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
        {students.map(account => {
          let hasAnnotations = account.annotations.length;
          let submittedAnnotations = [];
          let approvedAnnotations = [];
          let savedAnnotations = [];
          if (hasAnnotations) {
            savedAnnotations = account.annotations.filter(annotation => !annotation.isSubmitted)
            submittedAnnotations = account.annotations.filter(annotation => annotation.isSubmitted)
            approvedAnnotations = account.annotations.filter(annotation => annotation.isApproved)
          }
          return (<Student key={account.id}>
            <div>
              <div className="image">
                <img src={account.image} alt={account.nameFirst + ' ' + account.nameLast} />
              </div>
            </div>
            <div>{account.nameFirst} {account.nameLast}</div>
            <div><a href={`mailto:${account.email}`}>{account.email}</a></div>
            <div>
              {!hasAnnotations && "No Annotations"}
              {savedAnnotations.map(annotation => (
                <div key={annotation.id}>
                  <LinkButton
                    onClick={() => openAnnotationReview(annotation)}>
                    Saved {dateFormat(annotation.updatedAt)}
                  </LinkButton>
                </div>
              ))}
              {submittedAnnotations.map(annotation => (
                <div key={annotation.id}>
                  <LinkButton
                    onClick={() => openAnnotationReview(annotation)}>
                    Submitted {dateFormat(annotation.updatedAt)}
                  </LinkButton>
                </div>
              ))}
              {approvedAnnotations.map(annotation => (
                <div key={annotation.id}>
                  <LinkButton
                    onClick={() => openAnnotationReview(annotation)}>
                    Approved {dateFormat(annotation.updatedAt)}
                  </LinkButton>
                </div>
              ))}
            </div>
          </Student>
          )
        })}
      </LargeSpace>
      <Modal
        variants={variants}
        initial="closed"
        animate={isAnnotationOpen ? "open" : "closed"}
        transition={{ damping: 300 }} >
        {selectedAnnotation &&
          <ReviewAnnotation
            annotation={selectedAnnotation}
            closeModal={closeModal}
            rejectAnnotation={handleRejectAnnotation}
            approveAnnotation={handleApproveAnnotation} />
        }
      </Modal>
    </StyledContent>
  )
}

export default LessonDashboardTeacher;

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

