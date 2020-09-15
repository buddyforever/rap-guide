import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Tag } from '../../styles/TagStyles'
import ReactWordcloud from 'react-wordcloud';

const minFontSize = 2;
const maxFontSize = 3;

const TagCloud = ({ selectTag, tags }) => {

  const callbacks = {
    getWordColor: word => word.value > 2 ? "black" : "red",
    onWordClick: selectTag,
    onWordMouseOver: null,
    getWordTooltip: word => ``,
  }
  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
  };
  const size = [1000, 800];

  const words = tags.map(tag => {
    return {
      text: tag.topic,
      value: tag.count
    }
  })
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
    <ReactWordcloud
      callbacks={callbacks}
      options={options}
      size={size}
      words={words}
    />
  );

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


