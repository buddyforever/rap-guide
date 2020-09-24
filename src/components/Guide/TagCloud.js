import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Tag } from '../../styles/TagStyles'

const minFontSize = 1.4;
const maxFontSize = 4;

const TagCloud = ({ selectTag, tags }) => {

  const values = tags.map(tag => tag.count);
  const minMax = getMinMax(values);

  function getMinMax(arr) {
    return {
      min: Math.min(...arr),
      max: Math.max(...arr)
    }
  }

  function getFontSize(value) {
    return -(((minMax.min - value) / (minMax.max - minMax.min)) * (maxFontSize - minFontSize)) + minFontSize
  }

  function handleTagClick(tag) {
    selectTag(tag);
  }

  return (
    <StyledTagCloud>
      {tags.map(tag => (
        <Tag
          whileHover={{ scale: 1.1, rotate: '3deg' }}
          key={tag.id}
          onClick={() => handleTagClick(tag.topic)}
          size={getFontSize(tag.count)}
        >{tag.topic}</Tag>
      ))
      }
    </StyledTagCloud >
  )
}

export default TagCloud;

const StyledTagCloud = styled.div`
  text-align: center;
`


