import React, { useState } from 'react'
import styled from 'styled-components'
import useGlobal from "../store/Store"
import VideoThumb from './VideoThumb'

export const Home = () => {

  const [globalState, globalActions] = useGlobal();
  const [annotation, setAnnotation] = useState(null);

  return (
    <StyledContent>
      <div className="rap-guides">
        <h1>RAP GUIDES</h1>
        <div className="four-columns">
          <VideoThumb
            id="uHGlCi9jOWY"
            title="Data Science"
            thumbnail="https://picsum.photos/400/200"
            topics={["topic 1", "topic 2", "topic 3"]} />
          <VideoThumb
            id="vGrxereJ1nQ"
            title="Fahrenheit 45"
            thumbnail="https://picsum.photos/400/200?2"
            topics={["topic 1", "topic 2", "topic 3"]} />
          <VideoThumb
            id="HuI2hL1QYrk"
            title="Dylan"
            thumbnail="https://picsum.photos/400/200?3"
            topics={["topic 1", "topic 2", "topic 3"]} />
          <VideoThumb
            id="YiWfRx2RiSI"
            title="Senescence"
            thumbnail="https://picsum.photos/400/200?4"
            topics={["topic 1", "topic 2", "topic 3"]} />
          <VideoThumb
            id="uHGlCi9jOWY"
            title="Data Science"
            thumbnail="https://picsum.photos/400/200"
            topics={["topic 1", "topic 2", "topic 3"]} />
          <VideoThumb
            id="vGrxereJ1nQ"
            title="Fahrenheit 45"
            thumbnail="https://picsum.photos/400/200?2"
            topics={["topic 1", "topic 2", "topic 3"]} />
          <VideoThumb
            id="HuI2hL1QYrk"
            title="Dylan"
            thumbnail="https://picsum.photos/400/200?3"
            topics={["topic 1", "topic 2", "topic 3"]} />
          <VideoThumb
            id="YiWfRx2RiSI"
            title="Senescence"
            thumbnail="https://picsum.photos/400/200?4"
            topics={["topic 1", "topic 2", "topic 3"]} />
        </div>
      </div>
    </StyledContent>
  )
}

export default Home;

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
    row-gap: 5rem;
  }

  h1 {
    margin-bottom: 5rem;
  }
`;

