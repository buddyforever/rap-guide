import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import { getLocalStorage } from '../../utilities/LocalStorage'
import DisplayLesson from '../Lesson/DisplayLesson'
import { Heading, MediumSpace } from '../../styles/PageStyles'
import auth from '../../auth/auth'
import useGlobal from '../../store/Store'
import LessonDashboard from '../Lesson/LessonDashboard'
import { LessonContext } from '../../context/LessonContext'
import { UserContext } from '../../context/UserContext'

export const Lesson = () => {

  const { lesson, setLesson } = useContext(LessonContext);
  const { user } = useContext(UserContext);

  let { id } = useParams();

  function loadLesson() {
    if (getLocalStorage("lessons")) {
      const selectedLesson = getLocalStorage("lessons").filter(lesson => lesson.lessonId === id)[0];
      selectedLesson.guide = getLocalStorage("guides").filter(guide => guide.videoId === selectedLesson.videoId)[0];
      selectedLesson.guide.lyrics = selectedLesson.lyrics;
      setLesson(selectedLesson);
    }
  }

  useEffect(() => {
    loadLesson();
  }, []);

  if (lesson) {
    return (
      <StyledContent>
        {user && user.type === 'educator' ?
          <LessonDashboard /> : (<DisplayLesson />)
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
