import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const minFontSize = 2;
const maxFontSize = 3;

const TagCloud = ({ selectTag }) => {

  const [tags, setTags] = useState([]);
  const [minMax, setMinMax] = useState([]);

  useEffect(() => {
    // TODO get the tags from a database
    setTags([
      {
        id: 1,
        tag: "Climate Chaos",
        count: 2
      },
      {
        id: 2,
        tag: "Religion",
        count: 3
      },
      {
        id: 3,
        tag: "Consciousness",
        count: 6
      },
      {
        id: 4,
        tag: "Culture",
        count: 2
      },
      {
        id: 5,
        tag: "Evolution",
        count: 4
      },
      {
        id: 6,
        tag: "Human Nature",
        count: 4
      }
    ])
  }, [])

  useEffect(() => {
    const values = tags.map(tag => tag.count);
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
          onClick={() => handleTagClick(tag.id)}
          size={getFontSize(tag.count)}
        >{tag.tag}</Tag>
      ))
      }
    </StyledTagCloud >
  )
}

export default TagCloud;

const StyledTagCloud = styled.div`
  margin: 5rem 0;
  text-align: center;
`

const Tag = styled(motion.div)`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  font-size: ${props => props.size + 'rem'};
  background-color: #EEE;
  cursor: pointer;
`
