import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import LessonLyricsForm from './LessonLyricsForm'
import LessonDetailsForm from './LessonDetailsForm'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { FormPage } from '../../styles/FormStyles'
import { LinkButton } from '../ui/LinkButton'
import Loader from '../Loader'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_LESSON_BY_ID } from '../../queries/lessons'
import { UPDATE_LESSON_DETAILS } from '../../queries/lessons'

const pageVariants = {
  initial: { x: "50px", opacity: 0 },
  show: { x: 0, opacity: 1 },
  exit: { opacity: 0 },
}

const EditLesson = () => {

  /* Paramaters */
  let { id, page } = useParams();
  console.log(page);

  /* State */
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);

  /* Queries */
  const { loading, data, refetch } = useQuery(GET_LESSON_BY_ID, {
    variables: {
      id: id
    }
  })
  const [updateLesson] = useMutation(UPDATE_LESSON_DETAILS);

  /* Functions */
  function updateLessonDetails(lesson) {
    updateLesson({
      variables: {
        ...lesson
      }
    }).then(response => {
      setCurrentPage(2);
    });
  }

  function updateLessonLyrics(lyrics) {
    console.log(lyrics);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage])

  if (loading) return <Loader />
  return (
    <StyledContent className="editor">
      <Heading>
        <h1>Lesson Editor</h1>
        <MediumSpace>
          <LinkButton
            className={currentPage === 1 ? "active" : ""}
            onClick={() => setCurrentPage(1)}>Lesson Details</LinkButton>
          <LinkButton
            className={currentPage === 2 ? "active" : ""}
            onClick={() => setCurrentPage(2)}>Assign Lyrics</LinkButton>
          <LinkButton
            as={Link}
            to={`/lesson/${id}`}>Lesson Dashboard</LinkButton>
        </MediumSpace>
      </Heading>
      {currentPage === 1 &&
        <FormPage initial="initial" animate="show" exit="exit" variants={pageVariants}>
          <LessonDetailsForm lesson={data.lesson} onSubmit={updateLessonDetails} />
        </FormPage>
      }
      {currentPage === 2 &&
        <FormPage initial="initial" animate="show" exit="exit" variants={pageVariants}>
          <LessonLyricsForm refetch={refetch} lesson={data.lesson} onSubmit={updateLessonLyrics} />
        </FormPage>
      }
    </StyledContent>
  )
}

export default EditLesson