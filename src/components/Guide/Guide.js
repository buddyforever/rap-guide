import React, { useContext } from 'react'
import { useParams, Link } from "react-router-dom"
import { UserContext } from '../../context/UserContext'

import { Button } from "../ui/Button"
import { Heading, StyledContent, StyledColumns } from "../../styles/PageStyles"
import Loader from '../Loader'
import Video from '../Guide/Video'
import PublicLyrics from '../Lyric/PublicLyrics'
import { SocialShare } from '../SocialShare'

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
  const shareUrl = `https://www.rapguide.com/guide/${id}`
  return (
    <StyledContent>
      <Heading>
        <h1>{guide.videoTitle}</h1>
      </Heading>

      <Video guide={guide} />

      <StyledColumns style={{ margin: "25px 0" }}>
        <SocialShare
          url={shareUrl}
          title={guide.videoTitle}
        />
        <div style={{ textAlign: "right" }}>
          {
            user && (user.type === 'educator' || user.type === 'educator view') &&
            <Link className="button" to={'/lesson/add/' + id}>
              <Button>Create a Lesson</Button>
            </Link>
          }
        </div>
      </StyledColumns>

      <PublicLyrics guideID={guide.id} />
    </StyledContent>
  )
}

export default Guide;

