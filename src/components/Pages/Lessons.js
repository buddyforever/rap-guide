import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../context/UserContext'
import { StyledContent, Heading, LargeSpace } from '../../styles/PageStyles'
import { ThreeGrid } from '../../styles/PageStyles'
import Loader from '../Loader'
import VideoThumb from '../Guide/VideoThumb'
import { dateFormat } from '../../utilities/DateFormat'

import { useQuery } from '@apollo/react-hooks'
import { GET_LESSONS_BY_ACCOUNT } from '../../queries/lessons'
import { GET_ANNOTATIONS_BY_ACCOUNT } from '../../queries/annotations'

export const Lessons = () => {

  /* Context */
  const { user } = useContext(UserContext);

  /* State */
  const [recentAnnotations, setRecentAnnotations] = useState([]);

  /* Queries */
  const { loading, data } = useQuery(GET_LESSONS_BY_ACCOUNT, {
    variables: {
      id: user ? user.id : null
    }
  });

  const { loading: loadingHistory, data: dataHistory } = useQuery(GET_ANNOTATIONS_BY_ACCOUNT, {
    variables: {
      id: user ? user.id : null
    }
  });

  /* Functions */
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

  if (loading || loadingHistory) return <Loader />
  if (!data) {
    return (
      <StyledContent>
        <Heading>
          <h1>Lessons</h1>
          <p>Currently only students and teachers are able to view lessons. Please <Link to="/login">Login</Link> to access this content.</p>
        </Heading>
      </StyledContent>
    )
  }

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
    </StyledContent >
  )
}

export default Lessons;

