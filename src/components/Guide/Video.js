import React from 'react'
import { StyledVideo, MediumSpace } from "../../styles/PageStyles"

const Video = ({ guide }) => {
  return (
    <MediumSpace>
      <StyledVideo>
        <div className="video">
          <iframe title={guide.videoTitle} width="100%" src={guide.videoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </StyledVideo>
    </MediumSpace>
  )
}

export default Video