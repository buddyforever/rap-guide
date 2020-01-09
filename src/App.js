import React, { useState } from 'react';
import Layout from './components/Layout'
import styled from 'styled-components'

function App() {
  const [annotation, setAnnotation] = useState(null);

  const annotations = [
    "<h4>First Annotation Information</h4><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Voluptate alias reiciendis ad repellendus! Qui nostrum modi repellat.</p>",
    "<h4>Second Annotation Information</h4><p>doloremque ea unde molestias impedit quaerat officiis, necessitatibus quas nulla laboriosam a labore.</p>"
  ]

  return (
    <Layout>
      <div>
        <h1>RAP GUIDE TO CONSCIOUSNESS</h1>
        <StyledColumns>
          <div>
            <div className="video">
              <iframe title="dylan" width="100%" src="https://www.youtube.com/embed/HuI2hL1QYrk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
          <div>
            <h2>Dylan</h2>
            <h3>From the new album "The Rap Guide to Consciousness"</h3>
            <p>
              Music produced and mixed by Tom Caruana<br />
              Keys by Simon Kendall <br />
              Cuts by Mr. Simmonds <br />
              Video animation by Olivia Sebesky
            </p>
          </div>
        </StyledColumns>

        <StyledColumns>
          <div className="lyrics">
            <span>Aww</span>
            <span>You know that feelin' when you're chillin' like a villian</span>
            <span
              className="annotated"
              onClick={() => setAnnotation(annotations[0])}
              onMouseEnter={() => setAnnotation(annotations[0])}
            >
              Dealin' with no stress, like a room with no ceilin'
            </span>
            <span>Just open, and you like the rhyme "-illin"</span>
            <span
              className="annotated"
              onClick={() => setAnnotation(annotations[1])}
              onMouseEnter={() => setAnnotation(annotations[1])}
            >
              So much, you name your first son Dylan?
            </span>
            <span>That's the feelin' I had November 12th</span>
          </div>
          {annotation &&
            <StyledAnnotation>
              <div dangerouslySetInnerHTML={{ __html: annotation }} />
            </StyledAnnotation>
          }
        </StyledColumns>
      </div>
    </Layout>
  );
}

export default App;

const StyledAnnotation = styled.div`
  border-left: 3px solid #dd3333;
  padding: 2.5rem;
`;

const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 5rem;

  .video {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px; height: 0; overflow: hidden;
    margin-bottom: 5rem;
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

  p {
    line-height: 2.8rem;
  }

  h2 {
    font-weight: 500;
  }

  h3 {
    font-weight: 300;
    margin-bottom: 2.5rem;
  }

  .lyrics {
    span {
      display: block;
      margin-bottom: 0.5rem;
      transition: all .3s ease;
      padding: .5rem;
    }

    span.annotated {
      cursor: pointer;
      background-color: #ffe1e1;
    }

    span.annotated:hover {
      background-color: #DD3333;
      color: #fff7f7;
    }
  }
`;

