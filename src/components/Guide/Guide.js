import React, { useContext } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import { UserContext } from '../../context/UserContext'

import { Button } from "../ui/Button"
import { Heading, StyledContent, StyledColumns } from "../../styles/PageStyles"
import Loader from '../Loader'
import Video from '../Guide/Video'
import Lyrics from '../Lyric/Lyrics'

import { useQuery } from '@apollo/react-hooks'
import { GET_GUIDE_BY_ID } from '../../queries/guides'

export const Guide = () => {

  /* Context */
  const { user } = useContext(UserContext);

  /* Paramaters */
  let { id } = useParams();

  /* Queries */
  const { loading, data, refetch } = useQuery(GET_GUIDE_BY_ID, {
    variables: {
      id: id
    }
  });

  if (loading) return <Loader />;
  const { guide } = data;
  return (
    <StyledContent>
      <Heading>
        <h1>{guide.videoTitle}</h1>
      </Heading>

      <Video guide={guide} />

      <StyledColumns>
        <Lyrics lyrics={guide.lyrics} refetch={refetch} />
        <div style={{ textAlign: "right" }}>
          {
            user && user.type === 'educator' &&
            <Link className="button" to={'/lesson/add/' + id}>
              <Button>Create a Lesson</Button>
            </Link>
          }
        </div>
      </StyledColumns>
    </StyledContent>
  )
}

export default Guide;

