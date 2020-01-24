import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const VideoThumb = ({ id, title, thumbnail, topics }) => {
  return (
    <StyledVideoThumb>
      <Link className="video_link" to={`/video/${id}`}>
        <div className="video_thumbnail">
          <img src={thumbnail} alt={title} />
        </div>
        <h4>{title}</h4>
      </Link>
      <div className="video_details">
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
      </div>
    </StyledVideoThumb>
  )
}

export default VideoThumb;

const StyledVideoThumb = styled.div`
  .video_thumbnail {
    overflow: hidden;

    img {
      width: 100%;
      height: 200px;
      height: 15rem;
      object-fit: cover;
      transition: all .5s ease;
    }
  }

  .video_link {
    color: inherit;
    text-decoration: none;
  }

  .video_link:hover {

    img {
      transform: scale(1.1);
    }

    h4 {
      letter-spacing: 1px;
    }
  }

  h4 {
    margin: 1rem 0;
    font-size: 1.8rem;
    transition: all .3s ease;
  }



  .video_details {
    a, a:link {
      text-decoration: none;
      color: inherit;
      box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
      transition: all .3s ease;
      padding: 0 .2rem;
    }

    a:hover {
      background-color: rgba(221, 51, 51, 0.6);
      color: white;
      box-shadow: inset 0 -4px rgba(221, 51, 51, 0);
    }
  }

`;