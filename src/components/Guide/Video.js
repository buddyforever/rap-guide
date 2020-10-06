import React from 'react'
import styled from 'styled-components'

import { MediumSpace } from "../../styles/PageStyles"

const Video = ({ videoTitle, videoUrl }) => {
  return (
    <StyledVideo>
      <div className="video">
        <iframe title={videoTitle} width="100%" src={videoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </StyledVideo>
  )
}

export default Video

export const StyledVideo = styled.div`
  margin-bottom: 5rem;
  border-radius: 5px;
  background-color: black;
  box-shadow: 0 0 40px 0 rgba(0,0,0,0.2),
              0 0 20px 0 rgba(0,0,0,0.5),
              0 0 10px 0 rgba(0,0,0,0.5),
              0 0 5px 0 rgba(0,0,0,1);

  .video {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px; height: 0; overflow: hidden;
    background-color: black;
    border-radius: 5px;
  }

  .video iframe,
  .video object,
  .video embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
