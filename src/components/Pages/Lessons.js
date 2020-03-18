import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledContent, Heading, Thumbnail } from '../../styles/PageStyles'
import { getLocalStorage } from '../../utilities/LocalStorage'
import { FourGrid } from '../../styles/PageStyles'
import { Link } from 'react-router-dom'

export const Lessons = () => {

  const [guides, setGuides] = useState();
  const [lessons, setLessons] = useState([]);

  /* LESSONS */
  function loadLessons() {
    if (guides) {
      // TODO Get actual data
      if (getLocalStorage("lessons")) {
        setLessons(getLocalStorage("lessons").map(lesson => {
          const guide = guides.filter(guide => guide.videoId === lesson.videoId)[0];
          return {
            ...lesson,
            thumbnail: guide.thumbnail,
            videoTitle: guide.title
          }
        }));
      }
    }
  }

  useEffect(() => {
    loadLessons();
  }, [guides]);

  /* GUIDES */
  function loadGuides() {
    setGuides(getLocalStorage("guides"));
  }

  useEffect(() => {
    loadGuides();
  }, []);

  return (
    <StyledContent>
      <Heading>
        <h1>Lessons</h1>
      </Heading>
      {lessons.length === 0 && <p>There are no lessons available.</p>}
      <FourGrid>
        {lessons.map(lesson => (
          <StyledVideoThumb>
            <h4>{lesson.title}</h4>
            <Link className="video_link" to={`/lesson/${lesson.lessonId}`}>
              <div className="video_thumbnail">
                <img src={lesson.thumbnail} alt={lesson.title} />
              </div>
              <h4>{lesson.videoTitle}</h4>
            </Link>
            <div className="video_details">
              <div style={{ marginBottom: "1rem" }}>
                <p><strong>Students</strong> <span>0/{lesson.maxStudents}</span></p>
                <p><strong>Lyrics</strong> <span>{lesson.lyrics.filter(lyric => lyric.assigned).length}/{lesson.lyrics.length}</span></p>
              </div>
              {
                lesson.topics.map((topic, index) => {
                  return (<a href="#" key={index}>{topic}</a>)
                })
              }
            </div>
          </StyledVideoThumb>
        ))}
      </FourGrid>
    </StyledContent >
  )
}

export default Lessons;

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
    font-weight: 400;
    text-align: center;
  }

  .video_details {
    text-align: center;
    a, a:link {
      text-decoration: none;
      color: inherit;
      box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
      transition: all .3s ease;
      padding: 0 .2rem;
      white-space: nowrap;
      margin: 0 .2rem;
    }

    a:hover {
      background-color: rgba(221, 51, 51, 0.6);
      color: white;
      box-shadow: inset 0 -4px rgba(221, 51, 51, 0);
    }

    p {
      line-height: 2.4rem;
    }

    p span {
      font-size: 2rem;
    }
  }

`;