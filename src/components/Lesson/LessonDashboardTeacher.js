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
import { LessonStats } from '../Lesson/LessonStats'
import { Modal } from "../../styles/ModalStyles"
import ReviewAnnotation from '../Annotation/ReviewAnnotation'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { REVIEW_ANNOTATION } from '../../queries/annotations'
import { UPDATE_LESSON_STATUS, GET_LESSON_STUDENTS } from '../../queries/lessons'

const variants = {
  open: { x: "-50vw" },
  closed: { x: "100%" },
}

const domain = window.location.port ?
  window.location.protocol + "//" + window.location.hostname + ":" + window.location.port :
  window.location.protocol + "//" + window.location.hostname

const LessonDashboardTeacher = ({ setViewMode, lesson, refetch }) => {

  /* Queries */
  const { data, loading, refetch: refetchStudents } = useQuery(GET_LESSON_STUDENTS, {
    variables: {
      id: lesson.id
    }
  })
  const [reviewAnnotation] = useMutation(REVIEW_ANNOTATION);
  const [updateLessonStatusMutation] = useMutation(UPDATE_LESSON_STATUS);

  /* State */
  const [message, setMessage] = useState(false);
  const [isAnnotationOpen, setIsAnnotationOpen] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [lessonSignupUrl, setLessonSignupUrl] = useState("E" + lesson.id);
  const [students, setStudents] = useState([]);
  const [submittedAnnotations, setSubmittedAnnotations] = useState(0);

  /* Functions */
  function updateLessonStatus(e) {
    updateLessonStatusMutation({
      variables: {
        id: lesson.id,
        lessonStatus: e.target.value
      }
    }).then(response => {
      setMessage({
        type: "success",
        title: "Status Updated",
        text: `Lesson status has been changed to <strong>${response.data.updateLesson.lessonStatus}</strong>`
      })
    })
  }

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
        isRequestRevisions: false,
        comment: annotation.comment.comment,
        teacherAccountId: annotation.comment.account.id
      }
    }).then(() => {
      refetch();
      refetchStudents();
      closeModal();
    });
  }

  function handleRejectAnnotation(annotation) {
    let comment = annotation.comment.comment;
    reviewAnnotation({
      variables: {
        id: annotation.id,
        isApproved: annotation.isApproved ? annotation.isApproved : false,
        isSubmitted: annotation.isSubmitted,
        isRequestRevisions: true,
        comment: comment,
        teacherAccountId: annotation.comment.account.id
      }
    }).then(() => {
      refetch();
      refetchStudents();
      closeModal();
    });
  }

  useEffect(() => {
    if (data) {
      setStudents(data.accounts);

      // Set the number of submitted annotations
      let num = 0

      lesson.accounts.map(account => {
        if (account.annotations && account.annotations.length > 0) {
          num += account.annotations.filter(annotation => annotation.isSubmitted).length
        }
      })

      setSubmittedAnnotations(num)
    }
  }, [data])

  if (loading) return <Loader />
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
            <FormBlock space="1rem">
              <select
                value={lesson.lessonStatus}
                onChange={updateLessonStatus}>
                <option value="Draft">Draft</option>
                <option value="In Session">In Session</option>
                <option value="Closed">Closed</option>
                <option value="Closed *">Closed (* allow late submissions)</option>
              </select>
            </FormBlock>
          </div>
          <div style={{ display: "flex", "justifyContent": "flex-end" }}>
            {lesson.lessonStatus === "In Session" &&
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
                    title="Click to copy the access code to your clipboard"
                    style={{ marginRight: "1rem" }}
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faCopy} /> Copy Access Code
                    </Button>
                </div>
              </CopyToClipboard>
            }
            <Link to={"/lesson/edit/" + lesson.id}>
              <Button>Edit Lesson</Button>
            </Link>
            <Button
              style={{ marginLeft: "1rem" }}
              onClick={() => setViewMode(true)}>
              View Lesson
            </Button>
          </div>
        </Split>
      </Heading>
      <LargeSpace>
        <LessonStats
          lesson={lesson}
          students={students}
          submittedAnnotations={submittedAnnotations} />
        <div>
          <p><Link to={`/annotations/${lesson.id}`}>View Annotations</Link></p>
        </div>
      </LargeSpace>
      <LargeSpace>
        <Heading>
          <h2>Students</h2>
        </Heading>
        {!students.length && (<div>
          <p style={{ fontWeight: "bold" }}>There are currently no students enrolled in this lesson.</p>
          {lesson.lessonStatus === "In Session" &&
            <div>
              <p>If you haven't already done so, you can send the signup link to your students to enable them to enroll.</p>
              <FormBlock style={{ margin: "5rem 0" }}>
                <CopyToClipboard
                  text={lessonSignupUrl}
                  onCopy={() => setMessage({ text: `The following code has been copied to your clipboard <strong>${lessonSignupUrl}</strong>. Send this code to your students to use to access this lesson.` })}>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      readOnly
                      value={lessonSignupUrl}
                    />
                    <Button
                      title="Click to copy the access code to your clipboard"
                      style={{ marginLeft: "1rem", width: "200px" }}
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon icon={faCopy} /> Copy Access Code
                </Button>
                  </div>
                </CopyToClipboard>
              </FormBlock>
            </div>
          }
        </div>)}
        {students.map(account => {
          let hasAnnotations = account.annotations.length;
          let submittedAnnotations = [];
          let approvedAnnotations = [];
          let reviewedAnnotations = [];
          if (hasAnnotations) {
            reviewedAnnotations = account.annotations.filter(annotation => annotation.isRequestRevisions && !annotation.isSubmitted)
            submittedAnnotations = account.annotations.filter(annotation => annotation.isSubmitted && !annotation.isApproved)
            approvedAnnotations = account.annotations.filter(annotation => annotation.isApproved)
          }
          return (
            <Student key={account.id}>
              <div><a href={`mailto:${account.email}`}>{account.email}</a></div>
              <div><strong>{account.likes.length}</strong> upvoted annotations</div>
              <div>
                {(
                  !hasAnnotations ||
                  submittedAnnotations.length === 0 &&
                  approvedAnnotations.length === 0 &&
                  reviewedAnnotations.length === 0) && "Not Submitted"}
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
                {reviewedAnnotations.map(annotation => {
                  return (
                    <div key={annotation.id}>
                      <LinkButton
                        onClick={() => openAnnotationReview(annotation)}>
                        Reviewed {dateFormat(annotation.updatedAt)}
                      </LinkButton>
                    </div>
                  )
                })}
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
    </StyledContent >
  )
}

export default LessonDashboardTeacher;

const Student = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #EEE;
  border-radius: 3px;
  text-align: center;
  margin-bottom: 1rem;

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


