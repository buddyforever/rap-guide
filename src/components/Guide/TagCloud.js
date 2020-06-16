import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Tag } from '../../styles/TagStyles'

const minFontSize = 2;
const maxFontSize = 3;

const TagCloud = ({ selectTag, tags }) => {

  const [minMax, setMinMax] = useState([]);

  useEffect(() => {
    const values = tags.map(tag => tag.lessons.length);
    setMinMax(getMinMax(values));
  }, [tags])

  function getMinMax(arr) {
    return {
      min: Math.min(...arr),
      max: Math.max(...arr)
    }
  }

  function getFontSize(value) {
    return (((minMax.min - value) / (minMax.max - minMax.min)) * (maxFontSize - minFontSize)) + minFontSize
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
          size={2}
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


