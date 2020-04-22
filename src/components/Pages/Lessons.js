import React, { useContext } from 'react'
import styled from 'styled-components'
import { StyledContent, Heading } from '../../styles/PageStyles'
import { FourGrid } from '../../styles/PageStyles'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { UserContext } from '../../context/UserContext'

export const Lessons = () => {

  /* Context */
  const { user } = useContext(UserContext);

  /* Queries */
  const { loading, data } = useQuery(GET_LESSONS_BY_ACCOUNT, {
    variables: {
      id: user.id
    }
  });

  if (loading) return null
  return (
    <StyledContent>
      <Heading>
        <h1>Lessons</h1>
      </Heading>
      {data.lessons.length === 0 && <p>There are no lessons available.</p>}
      <FourGrid>
        {data.lessons.map(lesson => (
          <StyledVideoThumb key={lesson.id}>
            <h4>{lesson.lessonTitle}</h4>
            <Link className="video_link" to={`/lesson/${lesson.id}`}>
              <div className="video_thumbnail">
                <img src={lesson.guide.videoThumb} alt={lesson.guide.videoTitle} />
              </div>
              <h4>{lesson.guide.videoTitle}</h4>
            </Link>
            <div className="video_details">
              <div style={{ marginBottom: "1rem" }}>
                <p><strong>Students</strong> <span>{lesson.lessonStudents.length}/{lesson.maxStudents}</span></p>
                <p><strong>Lyrics</strong> <span>{lesson.lessonLyrics.filter(lyric => lyric.lyric.isAssigned).length}/{lesson.guide.lyrics.length}</span></p>
              </div>
              {
                lesson.topics.map(({ id, topic }) => {
                  return (<a href="#" key={id}>{topic}</a>)
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

const GET_LESSONS_BY_ACCOUNT = gql`
  query getLessons($id: ID!) {
    lessons(where: {
      OR: [
        { account: { id: $id } }
        { lessonStudents_some: {
            account: {
              id: $id
            }
        }}
      ]
    }) {
      id
      lessonTitle
      lessonDescription
      maxStudents
      lessonStudents {
        account {
          id
        }
      }
      account {
        id
      }
      guide {
        videoTitle
        videoThumb
        lyrics {
          id
          lyric
        }
      }
      lessonLyrics {
        lyric {
          id
          lyric
        }
        isAssigned
      }
      lessonStudents {
        account {
          email
        }
      }
      topics {
        id
        topic
      }
    }
  }
`