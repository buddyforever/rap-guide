import React from 'react'
import AnnotationForm from './AnnotationForm'

export const AddAnnotation = ({ lyric, closeModal, saveAnnotation }) => {
  return (
    <AnnotationForm lyric={lyric} cancel={closeModal} saveAnnotation={saveAnnotation} />
  )
}

export default AddAnnotation;
