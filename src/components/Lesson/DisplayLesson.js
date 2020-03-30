import React, { useState, useEffect, useContext } from 'react'
import { Heading, MediumSpace, StyledContent } from '../../styles/PageStyles'
import DisplayGuide from '../Guide/DisplayGuide'
import { getLocalStorage, setLocalStorage } from '../../utilities/LocalStorage'
import { LessonContext } from '../../context/LessonContext'

const DisplayLesson = () => {

  const { lesson, setLesson } = useContext(LessonContext);

  // Need to make this accept an annotation object containing the lyric ID
  // User, annotation, date etc and it needs to go to lesson.annotations
  // Then the hover in DisplayGuide.js needs to check lesson.annotations to display
  // instead of the lyric.
  function handleAddAnnotation(annotation, lyric) {
    let annotationObj = {
      annotation: annotation,
      lyricId: lyric.id,
      status: "saved"
    }
    if (!lesson.annotations) lesson.annotations = [];
    lesson.annotations.push(annotationObj);
    setLesson({ ...lesson });
    saveLessons(); // TODO this will update the database
  }

  function saveLessons() {
    const newLessons = getLocalStorage("lessons").map(l => {
      if (l.id === lesson.id) {
        return lesson;
      } else {
        return l
      }
    });
    setLocalStorage("lessons", JSON.stringify(newLessons));
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