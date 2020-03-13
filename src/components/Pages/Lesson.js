import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import { setLocalStorage, getLocalStorage } from '../../utilities/LocalStorage'
import AddLesson from '../Lesson/AddLesson'

export const Lesson = () => {

  let { id } = useParams();

  const [lesson, setLesson] = useState(null);

  function loadLesson() {
    setLesson(localStorage.getItem("lesson") ? localStorage.getItem("lesson") : null);
  }

  useEffect(() => {
    loadLesson();
  }, [lesson]);

  return (
    <StyledContent>
      {lesson ? <h1>{lesson}</h1> : <p>There are currently no lessons available.</p>}
    </StyledContent>
  )
}

export default Lesson;

const StyledContent = styled.div`

`
