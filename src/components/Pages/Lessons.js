import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { UserContext } from '../../context/UserContext'
import { StyledContent, Heading, LargeSpace, ThreeGrid, MediumSpace } from '../../styles/PageStyles'
import Loader from '../Loader'
import VideoThumb from '../Guide/VideoThumb'
import { dateFormat } from '../../utilities/DateFormat'
import { useAuth0 } from "../../react-auth0-spa";
import { LinkButton } from '../ui/LinkButton'
import { Button } from '../ui/Button'
import { FormBlock } from '../../styles/FormStyles'
import { Message } from '../ui/Message'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_LESSONS_BY_ACCOUNT } from '../../queries/lessons'
import { GET_CODE } from '../../queries/codes'
import { UPDATE_ACCOUNT_TYPE } from '../../queries/accounts'
import { GET_ANNOTATIONS_BY_ACCOUNT } from '../../queries/annotations'

export const Lessons = () => {

  /* Authentication */
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  /* Context */
  const { user, setUser } = useContext(UserContext);

  /* State */
  const [recentAnnotations, setRecentAnnotations] = useState([]);
  const [accessCode, setAccessCode] = useState("");

  /* Helpers */
  const [message, setMessage] = useState(null);

  /* Queries */
  const { loading: loadingLessons, data } = useQuery(GET_LESSONS_BY_ACCOUNT, {
    variables: {
      id: user ? user.id : null
    }
  });
  const { refetch: refetchCode } = useQuery(GET_CODE, {
    variables: {
      code: null
    }
  });
  const [updateAccountType] = useMutation(UPDATE_ACCOUNT_TYPE)

  const { loading: loadingHistory, data: dataHistory } = useQuery(GET_ANNOTATIONS_BY_ACCOUNT, {
    variables: {
      id: user ? user.id : null
    }
  });

  /* Functions */
  /* TODO - eventually it would be good to move this into a resolver */
  function confirmAccessCode() {
    refetchCode({
      code: accessCode
    }).then(response => {
      if (response.data.code) {
        switch (response.data.code.action.action) {
          case "UPDATE_TYPE":
            updateAccountType({
              variables: {
                email: user.email,
                type: response.data.code.action.type
              }
            }).then(response => {
              setUser(prevState => ({
                ...user,
                type: 'educator'
              }))
              setMessage({
                title: "Account Upgraded",
                type: "success",
                text: "You now have educator access."
              })
            })
            break;
          default:
            alert("NONE")
            break;
        }

      } else {
        setMessage({
          title: "Invalid Code",
          type: "error",
          text: "You have entered an invalid access code."
        })
      }
    })
  }

  function displayAnnotationActivity(annotation) {

    let lessonTitle = annotation.lesson.lessonTitle;
    let lessonLink = `/lesson/${annotation.lesson.id}`
    let dateUpdated = annotation.updatedAt;

    // Submitted
    if (annotation.isSubmitted && !annotation.isApproved) {
      return (
        <p key={annotation.id}>
          You <strong>submitted</strong> an annotation for <Link to={lessonLink}><strong>{lessonTitle}</strong></Link> on <em>{dateFormat(dateUpdated)}</em>
        </p>
      )
    }
    // Saved
    if (!annotation.isSubmitted && !annotation.isRequestRevisions && !annotation.isApproved) {
      return (
        <p key={annotation.id}>
          You <strong>saved</strong> an annotation for <Link to={lessonLink}><strong>{lessonTitle}</strong></Link> on <em>{dateFormat(dateUpdated)}</em>
        </p>
      )
    }

    // Revisions Requested
    if (annotation.isRequestRevisions && !annotation.isApproved) {
      return (
        <p key={annotation.id}>
          Your teacher requested <strong>revisions</strong> to your annotation for <Link to={lessonLink}><strong>{lessonTitle}</strong></Link> on <em>{dateFormat(dateUpdated)}</em>
        </p>
      )
    }

    // Revisions Requested
    if (annotation.isApproved) {
      return (
        <p key={annotation.id}>
          Your teacher has <strong>APPROVED</strong> your annotation for <Link to={lessonLink}><strong>{lessonTitle}</strong></Link> on <em>{dateFormat(dateUpdated)}</em>
        </p>
      )
    }

  }

  /* Effects */
  useEffect(() => {
    if (dataHistory && dataHistory.annotations) {
      setRecentAnnotations(dataHistory.annotations);
    }
  }, [dataHistory])

  if (loading || loadingLessons || loadingHistory) return <Loader />
  if (!isAuthenticated) {
    return (
      <StyledContent>
        <Heading>
          <h1>Lessons</h1>
          <p>Currently only students and teachers are able to view lessons. Please <LinkButton onClick={loginWithRedirect}>Login</LinkButton> to access this content.</p>
        </Heading>
      </StyledContent>
    )
  }

  if (!data) return null
  return (
    <StyledContent>
      <Heading>
        <h1>Lessons</h1>
      </Heading>
      {data.lessons.length === 0 && <p>There are no lessons available.</p>}
      {(user.type === "student" && recentAnnotations.length > 0) &&
        <LargeSpace>
          <h3>Recent Activity</h3>
          {recentAnnotations.map(annotation => {
            return displayAnnotationActivity(annotation);
          })}
        </LargeSpace>
      }
      <ThreeGrid>
        {data.lessons.map(lesson => {
          return (
            <VideoThumb
              key={lesson.id}
              link={`/lesson/${lesson.id}`}
              lesson={lesson}
              guide={lesson.guide} />
          )
        })}
      </ThreeGrid>
      <MediumSpace>
        <h2>Access Code</h2>
        <FormBlock>
          <p>If you have received an access code, enter it here:</p>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="enter access code..." />
            <Button
              secondary
              style={{ marginLeft: "1rem", width: "150px", height: "auto" }}
              onClick={(e) => { e.preventDefault(); confirmAccessCode(e.target.value) }}
              iconLeft={faPlus}>SUBMIT</Button>
          </div>
        </FormBlock>
      </MediumSpace>
      {
        message &&
        <Message
          toast
          dismiss={() => setMessage(null)}
          type={message.type}
          title={message.title}>
          {message.text}
        </Message>
      }
    </StyledContent>
  )
}

export default Lessons;

