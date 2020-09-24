import React from 'react'
import styled from 'styled-components'

function splitFirstWord(string) {
  return [string.split(" ")[0], string.substr(string.indexOf(' '))]
}

export const Card = ({
  title,
  topics,
  status,
  stats,
  image
}) => {

  const [titleA, titleB] = splitFirstWord(title)

  return (
    <StyledCard>
      <div className="content" style={{ backgroundImage: `url(${image})` }}>
        <h2><span>{titleA}</span>{titleB}</h2>
        <div className="topics">
          {topics.map(topic => (
            <span>{topic.topic}</span>
          ))}
        </div>
      </div>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  background-size: contain;
  background-color: black;
  width: 100%;
  color: white;
  position: relative;

  &:hover {
    z-index: 1000;

    .content-hover {
      z-index: 1050;
      transform: scale(1);
      opacity: 1;
    }

    .content {
      h3, .topics {
        opacity: 0;
      }
    }
  }

  .content {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all .3s ease;
  }

  .content-hover {
    position: absolute;
    height: 300px;
    width: 110%;
    background-color: black;
    top: -50%;
    left: -5%;
    transform: scale(0);
    opacity: 0;
    transition: all .3s ease;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
  }

  h2 {
    padding: 15px;
    font-size: 2em;
    text-transform: uppercase;

    span {
      color: #249FD7;
    }
  }

  .topics {
    padding: 15px;
    text-align: center;

    span {
      position: relative;

      & + span {
        margin-left: 5px;
      }

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: rgba(36, 159, 215,0.7);
        left: 0;
        bottom: 0;
      }
    }
  }
`