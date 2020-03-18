import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import { getLocalStorage } from '../../utilities/LocalStorage'
import AddLesson from '../Lesson/AddLesson'
import { Heading, MediumSpace } from '../../styles/PageStyles'
import auth from '../../auth/auth'
import useGlobal from '../../store/Store'
import LessonDashboard from '../Lesson/LessonDashboard'

export const Lesson = () => {

  let { id } = useParams();
  const [globalState, globalActions] = useGlobal();

  const [lesson, setLesson] = useState(null);

  function loadLesson() {
    if (getLocalStorage("lessons")) {
      setLesson(getLocalStorage("lessons").filter(lesson => lesson.lessonId === id)[0]);
    }
  }

  useEffect(() => {
    loadLesson();
  }, []);

  if (lesson) {
    return (
      <StyledContent>
        {auth.isAuthenticated() && globalState.type === 'educator' ?
          <LessonDashboard lesson={lesson} /> : (
            <>
              <Heading>
                <h1>{lesson.title}</h1>
              </Heading>
              <MediumSpace dangerouslySetInnerHTML={{ __html: lesson.details }} />
            </>
          )
        }
      </StyledContent>
    )
  } else {
    return (<StyledContent><Heading><h1>LOADING...</h1></Heading></StyledContent>)
  }
}

export default Lesson;

const StyledContent = styled.div`

`
