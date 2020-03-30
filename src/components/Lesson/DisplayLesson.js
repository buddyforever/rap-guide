import React, { useState, useEffect, useContext } from 'react'
import { Heading, MediumSpace, StyledContent } from '../../styles/PageStyles'
import DisplayGuide from '../Guide/DisplayGuide'
import { getLocalStorage } from '../../utilities/LocalStorage'
import { LessonContext } from '../../context/LessonContext'

const DisplayLesson = () => {

  const { lesson, setLesson } = useContext(LessonContext);

  function handleAddAnnotation(annotation) {
    alert("Annotation added: ", annotation);
  }

  return (
    <StyledContent>
      <Heading>
        <h1>{lesson.title}</h1>
      </Heading>
      <MediumSpace dangerouslySetInnerHTML={{ __html: lesson.details }} />
      <hr />
      <DisplayGuide guide={lesson.guide} annotations={lesson.annotations} addAnnotation={handleAddAnnotation} />
    </StyledContent>
  )
}

export default DisplayLesson