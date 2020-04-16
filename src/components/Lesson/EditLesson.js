import React from 'react'
import LessonForm from './LessonForm'

const EditLesson = () => {

  const lesson = {
    guide: {
      videoId: "abc123",
      title: "Dylan"
    }
  }

  return (
    <LessonForm lesson={lesson} />
  )
}

export default EditLesson