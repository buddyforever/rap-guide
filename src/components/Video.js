import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom"
import data from '../data/data.js'
import Lyric from './Lyric'

export const Video = () => {

  let { id } = useParams();

  const [video, setVideo] = useState(null)
  const [lyrics, setLyrics] = useState([])
  const [annotation, setAnnotation] = useState(null)

  function displayAnnotation(annotations) {
    setAnnotation(annotations[0]);
  }

  function loadData() {
    if (video) {
      setLyrics(video.lyrics);
    } else {
      if (localStorage.getItem("video")) {
        setVideo(JSON.parse(localStorage.getItem("video")));
      } else {
        setVideo(data.videos.filter(video => video.id === parseInt(id))[0]);
      }
    }
  }

  function saveData() {
    let newVideo = video;
    video.lyrics = lyrics;
    setVideo(newVideo);
    localStorage.setItem("video", JSON.stringify(newVideo));
  }

  function addAnnotation(lyricId, annotation) {
    let newLyrics = lyrics;
    newLyrics.filter(lyric => lyric.id === lyricId)[0].annotations.push(annotation);
    setLyrics(newLyrics);

    setAnnotation(annotation);
    saveData();
  }

  useEffect(() => {
    loadData();
  }, [video]);

  return (
    <div>
      {!video ? <div>LOADING...</div> : (
        <div>
          <h1>{video.album.title}</h1>
          <StyledColumns className="top">
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
              {lyrics.map((lyric) => {
                return (
                  <Lyric
                    id={lyric.id}
                    key={lyric.id}
                    displayAnnotation={displayAnnotation}
                    addAnnotation={addAnnotation}
                    lyric={lyric.lyric}
                    annotations={lyric.annotations}
                  />
                )
              })}
            </div>
            <div>
              {annotation &&
                <StyledAnnotation>
                  <div dangerouslySetInnerHTML={{ __html: annotation.annotation }} />
                </StyledAnnotation>
              }
            </div>
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

  &.top {
    position: sticky;
  }

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
    display: flex;
    flex-direction: column;
  }
`;
