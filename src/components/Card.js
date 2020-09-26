import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { Button } from './ui/Button'

function splitFirstWord(string) {
  return [string.split(" ")[0], string.indexOf(' ') > 0 ? string.substr(string.indexOf(' ')) : '']
}

function getWindowSize() {
  return { width: window.innerWidth, height: window.innerHeight }
}

export const Card = ({
  title,
  topics,
  status,
  stats,
  image,
  link,
  lesson = null,
  headingSize = "2.4rem",
  badge = null,
  color = "#249FD7",
  classes,
  showTags = true,
  buttonText = "View More...",
  ...rest
}) => {

  const [titleA, titleB] = splitFirstWord(title)

  const [isMobile, setIsMobile] = useState(false)
  const [windowSize, setWindowSize] = useState(getWindowSize())

  function updateWindowSize() {
    const windowSize = getWindowSize()
    if (windowSize.width < 750) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    setWindowSize(windowSize)
  }

  useEffect(() => {
    updateWindowSize()
    window.addEventListener("resize", updateWindowSize);
  }, [])

  return (
    <Link to={link}>
      <StyledCard
        color={color}
        badgeColor={badge && badge.color ? badge.color : color}
        className={classes ? classes : ""}
        headingSize={headingSize}
        {...rest}
      >
        <motion.div
          className="card"
          whileHover={!isMobile && {
            height: "450px",
            y: "-125px",
            scale: 1.05,
            transition: {
              duration: 0.4,
              stiffness: 10
            }
          }}
        >
          {badge && <div className="badge">{badge.label}</div>}
          <div className="image-container">
            <img src={image} alt={title} />
            <div className="image-transition"></div>
          </div>
          <div className="content">
            <h2><span>{titleA}</span>{titleB}</h2>
            <div className="stats">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: stat.color || "#34343d" }}
                ><span>{stat.value}</span>{stat.label}</div>
              ))}
            </div>
            {showTags &&
              <div className="topics">
                {topics.map(topic => (
                  <span key={topic.topic}>{topic.topic}</span>
                ))}
              </div>
            }
            {lesson &&
              <div className="lesson-details">
                <span className="highlight">{lesson.className}</span>
                <span>{lesson.instructorName}</span>
                <span>{lesson.institutionName}</span>
              </div>
            }
            <div className="cta">
              <span>{buttonText}</span>
            </div>
          </div>
        </motion.div>
      </StyledCard>
    </Link>
  )
}

const StyledCard = styled(motion.div)`
  width: 100%;
  height: 200px;
  color: white;
  position: relative;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  transition: opacity .1s ease;
  background-color: black;

  &.dimmed {
    opacity: 0.4!important;
  }

  .card {
    background-color: black;
    position: absolute;
    height: 200px;
    width: 100%;
    backface-visibility: hidden;

    &::after {
      content: '';
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
      transition: opacity .4s ease;
    }
  }

  .badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 3px 5px;
    z-index: 100;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    background-color: ${props => props.badgeColor};
  }

  .image-container {
    backface-visibility: hidden;
    background-color: black;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 10s linear;

    .image-transition {
      backface-visibility: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 200px;
      background: linear-gradient(to top, #000 0%, #000 25%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0) 70%, #000 100%);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0,0,0,0.4);
      transition: opacity .4s ease;
    }
  }

  .content {
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: padding .4s ease;
  }

  &:hover {
    .card {
      z-index: 1000;

      &::after {
        opacity: 1;
      }
    }

    .image-container::after {
      opacity: 0;
    }

    .image-transition {
      background: linear-gradient(to top, #000 0%, #000 25%, rgba(0,0,0,0) 50%);
      transform: translateY(5px);
    }

    .content {
      justify-content: flex-end;
    }

    .cta {
      opacity: 1;
      height: 50px;
    }

    .stats {
      height: 75px;
      opacity: 1;
      padding: 15px;

      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    h2 {
      font-size: 3.3rem;
    }
  }

  h2 {
    padding: 15px 30px 15px 15px;
    font-size: ${props => props.headingSize};
    text-transform: uppercase;
    z-index: 50;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.8);
    transition: font-size .4s ease;

    span {
      color: ${props => props.color};
    }
  }

  .cta {
    opacity: 0;
    height: 0;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    transition-delay: 1s;
    transition: opacity .4s ease;

    span {
      display: inline-block;
      padding: 5px 7px;
      text-decoration: none;
      text-transform: uppercase;
      background-color: ${props => props.color};
      color: white;
      transition: transform .3s ease;
      border-radius: 3px;
      cursor: pointer;
    }
  }

  .stats {
    position: relative;
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition-delay: 1s;
    transition: opacity .4s ease;

    div {
      height: 50px;
      width: 75px;
      border-radius: 5px;
      color: white;
      text-align: center;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        display: block;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  .lesson-details {
    padding: 15px;

    span {
      display: block;
    }

    span.highlight {
      color: ${props => props.color}
    }
  }

  .topics {
    padding: 15px;
    text-align: center;

    span {
      position: relative;
      letter-spacing: 1px;
      text-shadow: 2px 2px 5px rgba(0,0,0,0.8);
      display: inline-block;

      & + span {
        margin-left: 5px;
      }

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        opacity: 0.7;
        background-color: ${props => props.color};
        left: 0;
        bottom: 0;
      }
    }
  }

  @media screen and (max-width: 750px){
    height: 400px;
    margin-bottom: 25px;

    .card {
      height: 400px;

      &::after {
        opacity: 0;
      }
    }

    .image-container::after {
      opacity: 0;
    }

    .content {
      justify-content: flex-end;
    }

    .cta {
      opacity: 1;
      height: 50px;
    }

    .stats {
      height: 75px;
      opacity: 1;
      padding: 15px;

      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    h2 {
      font-size: 3.3rem;
    }
  }

`