import React from 'react'
import AnnotationForm from './AnnotationForm'

export const AddAnnotation = ({ lessonLyric, closeModal, saveAnnotation }) => {
  return (
    <AnnotationForm lessonLyric={lessonLyric} cancel={closeModal} saveAnnotation={saveAnnotation} />
  )
}

export default AddAnnotation;
