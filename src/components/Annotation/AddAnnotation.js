import React, { useState, useEffect } from 'react'
import AnnotationForm from './AnnotationForm'

export const AddAnnotation = ({ closeModal }) => {
  return (
    <AnnotationForm lyric="My Lyric" closeModal={closeModal} />
  )
}

export default AddAnnotation;
