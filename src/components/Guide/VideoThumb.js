import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faComments } from '@fortawesome/free-solid-svg-icons'

export const VideoThumb = ({ guide, lesson, link }) => {

  let students;
  let title = guide.videoTitle;
  let url = link || `/guide/${guide.id}`
  if (lesson) {
    students = lesson.accounts.filter(account => account.type === "student").length;
    title = lesson.lessonTitle
  }

  return (
    <StyledVideoThumb
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      style={{ backgroundColor: "black" }}
      className="video"
    >
      <Link to={url}>
        <div>
          <div>
            <div className="video__image" to={url}>
              <div
                className="video__image-background"
                style={{ backgroundImage: `url(${guide.videoThumb})` }}>
              </div>
              <div className="video__title">{title}</div>
            </div>
          </div>
          {lesson &&
            <div className="lesson__details">
              <span>
                <FontAwesomeIcon icon={faUserFriends} /> {students}/{lesson.maxStudents} Students
              </span>
              <span>
                <FontAwesomeIcon icon={faComments} /> 5 Annotations
              </span>
            </div>
          }
          <div className="video__topics">
            <div>
              {
                guide.topics.map((topic) => {
                  return (<span key={topic.topic}>{topic.topic}</span>)
                })
              }
            </div>
          </div>
        </div>
      </Link>
    </StyledVideoThumb>
  )
}

export default VideoThumb;

const StyledVideoThumb = styled(motion.div)`
  background-color: black;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;

  a {
    text-decoration: none;
  }

  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 5px 0px rgba(64,34,34,0.9), 0 0 25px 0 rgba(64,34,34,0.6);
    opacity: 0;
    transition: opacity .5s ease;
  }

  &:hover {
    &::after {
      opacity: 1;
    }

    .video__image-background {
      transform: scale(1.2);
    }
  }

  .lesson {
    &__details {
      display: flex;
      justify-content: space-around;
      padding: 1.5rem 1rem 0 1rem;

      span {
        background-color: #DD3333;
        color: #FFFFFF;
        font-size: 1.2rem;
        padding: .5rem 1rem;
        border-radius: 2px;
      }
    }
  }

  .video {
    &__image {
      width: 100%;
      height: 200px;
      display: block;
      position: relative;
      overflow: hidden;

      @media screen and (max-width: 768px) {
        height: 300px;
      }
    }

    &__image-background {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: black;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      transition: transform 2s linear;
    }

    &__title {
      position: absolute;
      width: 100%;
      bottom: 0;
      color: #FFFFFF;
      padding: 5rem 0 0.5rem 1rem;
      text-align: center;
      font-size: 1.8rem;
      transition: all .3s ease;
      font-weight: 400;
      letter-spacing: 2px;
      line-height: 1.5em;
      background: linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,0.5),rgba(0,0,0,0.0));
      opacity: 1;
    }

    &__topics {
      background-color: #000000;
      color: #FFFFFF;
      text-align: center;
      padding: 2rem;
      word-wrap: break-word;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        text-decoration: none;
        color: inherit;
        box-shadow: inset 0 -4px rgba(221, 51, 51, 0.5);
        transition: all .3s ease;
        padding: 0 .2rem;
        white-space: nowrap;
        margin: 0 .2rem;
        display: inline-block;
      }
    }
  }
`;