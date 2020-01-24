import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom"
import data from '../data/data.js'

export const Video = () => {

  let { id } = useParams();

  const [video, setVideo] = useState(null)
  const [annotation, setAnnotation] = useState(["abc", "def"])


  useEffect(() => {
    setVideo(data.videos.filter(video => video.id === parseInt(id))[0]);
  }, []);

  return (
    <div>
      {!video ? <div>LOADING...</div> : (
        <div>
          <h1>{video.album.title}</h1>
          <StyledColumns>
            <div>
              <div className="video">
                <iframe title={video.title} width="100%" src={video.embedUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
            <div>
              <h2>{video.title}</h2>
              <h3>From the album "{video.album.title}"</h3>
              <div className="credits">
                {video.credits.map((credit, index) => {
                  return (
                    <span key={index}>{credit.what} by {credit.who}</span>
                  )
                })}
              </div>
            </div>
          </StyledColumns>

          <StyledColumns>
            <div className="lyrics">
              {video.lyrics.map((lyric, index) => {
                return <span key={index}>{lyric}</span>
              })}
            </div>
            {annotation &&
              <StyledAnnotation>
                <div dangerouslySetInnerHTML={{ __html: annotation }} />
              </StyledAnnotation>
            }
          </StyledColumns>
        </div>
      )}
    </div>
  )
}

export default Video;

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

  .credits span {
    display: block;
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
