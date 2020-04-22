import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import { Button } from "../../styles/FormStyles"
import { Heading, StyledContent, LargeSpace, StyledVideo } from "../../styles/PageStyles"
import auth from '../../auth/auth'
import { getLocalStorage } from '../../utilities/LocalStorage'
import { Modal } from "../../styles/ModalStyles"
import AddAnnotation from '../Annotation/AddAnnotation'
import { motion } from 'framer-motion'
import Lyric from '../Guide/Lyric'
import { UserContext } from '../../context/UserContext'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'


const variants = {
  open: { x: "-50vw" },
  closed: { x: "100%" },
}

export const Guide = () => {

  /* Context */
  const { user } = useContext(UserContext);

  /* Paramaters */
  let { id } = useParams();

  /* Queries */
  const { loading, data } = useQuery(GET_GUIDE_BY_ID, {
    variables: {
      id: id
    }
  });


  if (loading) return false;
  const { guide } = data;
  console.log(data);
  return (
    <StyledContent>
      <div>
        <Heading>
          <h1>{guide.title}</h1>
        </Heading>
        <StyledVideo>
          <div className="video">
            <iframe title={guide.title} width="100%" src={guide.videoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          {
            user && user.type === 'educator' &&
            <LargeSpace>
              <Link className="button" to={'/lesson/add/' + id}>
                <Button>Create a Lesson</Button>
              </Link>
            </LargeSpace>
          }
        </StyledVideo>

        <StyledColumns>
          <div>
            <h3>Lyrics</h3>
            {guide.lyrics.map(lyric => (
              <StyledLyric>{lyric.lyric}</StyledLyric>
            ))}
          </div>
          <div>
            <h3>Annotations</h3>
          </div>
        </StyledColumns>
      </div>
    </StyledContent>
  )
}

export default Guide;

const StyledAnnotation = styled.div`
  border-left: 3px solid #dd3333;
  padding: 2.5rem;
  position: sticky;
  top: 10rem;
`;

const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 5rem;

  strong {
    font-weight: 500;
  }

  em {
    font-style: normal;
    font-weight: 300;
  }

  .lyrics {
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin-bottom: 2.5rem;
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

const StyledLyric = styled.div`
  margin-bottom: 0.5rem;
  transition: all .3s ease;
  padding: .5rem;
  display: block;

  &.annotated:hover {
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
  }

  &.annotated {
    cursor: pointer;
    background-color:  rgba(221, 51, 51, 0.2);
  }

`

const GET_GUIDE_BY_ID = gql`
  query getGuide($id:ID!) {
    guide(where: {id:$id}) {
      id
      videoId
      videoUrl
      videoTitle
      videoThumb
      topics {
        id
        topic
      }
      lyrics {
        id
        lyric
      }
    }
  }
`