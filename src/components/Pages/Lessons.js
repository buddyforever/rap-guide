import React, { useState, useEffect } from 'react'
import { StyledContent, Heading } from '../../styles/PageStyles'
import { getLocalStorage } from '../../utilities/LocalStorage'

export const Lessons = () => {

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // TODO Get actual data
    if (getLocalStorage("lessons")) {
      setLessons(JSON.parse(getLocalStorage("lessons")));
    } else {

    }
  }, [])

  return (
    <StyledContent>
      <Heading>
        <h1>Lessons</h1>
      </Heading>
      <div>
        {lessons.length < 1 && <p>No lessons available. Please contact your teacher.</p>}
        {lessons && lessons.map(lesson => {
          return (
            <div>{lesson}</div>
          )
        })}
      </div>
    </StyledContent>
  )
}

export default Lessons;

