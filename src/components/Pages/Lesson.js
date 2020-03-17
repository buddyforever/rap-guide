import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import { setLocalStorage, getLocalStorage } from '../../utilities/LocalStorage'
import AddLesson from '../Lesson/AddLesson'
import { Heading, MediumSpace } from '../../styles/PageStyles'

export const Lesson = () => {

  let { id } = useParams();

  const [lesson, setLesson] = useState(null);

  function loadLesson() {
    if (getLocalStorage("lessons")) {
      setLesson(getLocalStorage("lessons").filter(lesson => lesson.lessonId === id)[0]);
    }
  }

  useEffect(() => {
    loadLesson();
  }, []);

  return (
    <StyledContent>
      {lesson &&
        <>
          <Heading>
            <h1>{lesson.title}</h1>
          </Heading>
          <MediumSpace dangerouslySetInnerHTML={{ __html: lesson.details }} />
        </>
      }
    </StyledContent>
  )
}

export default Lesson;

const StyledContent = styled.div`

`
