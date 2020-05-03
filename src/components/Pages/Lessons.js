import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { UserContext } from '../../context/UserContext'
import { StyledContent, Heading } from '../../styles/PageStyles'
import { ThreeGrid } from '../../styles/PageStyles'
import Loader from '../Loader'
import VideoThumb from '../Guide/VideoThumb'

import { useQuery } from '@apollo/react-hooks'
import { GET_LESSONS_BY_ACCOUNT } from '../../queries/lessons'

export const Lessons = () => {

  /* Context */
  const { user } = useContext(UserContext);

  /* Queries */
  const { loading, data } = useQuery(GET_LESSONS_BY_ACCOUNT, {
    variables: {
      id: user ? user.id : null
    }
  });

  if (loading) return <Loader />
  if (!data) {
    return (
      <StyledContent>
        <Heading>
          <h1>Lessons</h1>
          <p>Currently only students and teachers are able to view lessons. Please <Link to="/login">Login</Link> to access this content.</p>
        </Heading>
      </StyledContent>
    )
  }

  return (
    <StyledContent>
      <Heading>
        <h1>Lessons</h1>
      </Heading>
      {data.lessons.length === 0 && <p>There are no lessons available.</p>}
      <ThreeGrid>
        {data.lessons.map(lesson => {
          return (
            <VideoThumb
              key={lesson.id}
              link={`/lesson/${lesson.id}`}
              lesson={lesson}
              guide={lesson.guide} />
          )
        })}
      </ThreeGrid>
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

