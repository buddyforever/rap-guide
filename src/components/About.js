import React, { useState } from 'react'
import styled from 'styled-components'
import VideoThumb from './VideoThumb'
import data from '../data/data'

export const About = () => {

  const [videos, setVideos] = useState(data.videos);

  return (
    <StyledContent>
      <div className="callout">
        <h1>TEACHER CALLOUT SIGN UP LOG IN ETC</h1>
      </div>
      <div className="text">
        <h1>ABOUT THIS SITE / JOIN THE DISCUSSION</h1>
      </div>
    </StyledContent>
  )
}

export default About;

const StyledContent = styled.div`

  min-height: 50vh;

  .callout,
  .text {
    text-align: center;
    font-size: 2.4rem;
    padding: 5rem 0;
    margin: 2.5rem;
    border: 1px solid black;
  }

  .rap-guides {
    padding: 5rem 0;
  }

  .four-columns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 2.5rem;
  }

  h2 {
    margin-bottom: 2.5rem;
  }
`;

