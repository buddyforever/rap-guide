import React from 'react'
import styled from 'styled-components'

export const VideoThumb = ({ id, title, thumbnail, topics }) => {
  return (
    <StyledVideoThumb>
      <img src={thumbnail} />
      <h4><a href={`/video/${id}`}>{title}</a></h4>
      <div>
        <strong>From: </strong>
        <a href="#">Album Name</a>
      </div>
      <div>
        <strong>Topics: </strong>
        {
          topics.map(topic => {
            return (<span><a href="#">{topic}</a>,</span>)
          })
        }
      </div>
    </StyledVideoThumb>
  )
}

export default VideoThumb;

const StyledVideoThumb = styled.div`
  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
  }

  h4 {
    margin: 1rem 0;
    font-size: 1.8rem;
  }

  h4 a {
    color: inherit;
    text-decoration: none;
    transition: all .3s ease;
  }

  h4 a:hover {
    letter-spacing: 1px;
  }

`;