import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import { UserContext } from '../../context/UserContext'
import styled from 'styled-components'

import { Button } from "../ui/Button"
import { Heading, StyledContent, StyledColumns } from "../../styles/PageStyles"
import Loader from '../Loader'
import Video from '../Guide/Video'
import PublicLyrics from '../Lyric/PublicLyrics'
import { SocialShare } from '../SocialShare'
import { splitFirstWord } from '../../utilities/text'

import { useQuery } from '@apollo/react-hooks'
import { GET_GUIDE_BY_ID } from '../../queries/guides'

export const Guide = () => {

  /* Context */
  const { user } = useContext(UserContext);

  /* Paramaters */
  let { id } = useParams();

  /* State */
  const [isScrolled, setIsScrolled] = useState(false)

  /* Queries */
  const { loading, data, refetch } = useQuery(GET_GUIDE_BY_ID, {
    variables: {
      id: id
    }
  });

  function handleScroll(e) {
    if (window.scrollY >= 700) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (loading) return <Loader />;
  const { guide } = data;
  const shareUrl = `https://www.rapguide.com/guide/${id}`
  const [titleA, titleB] = splitFirstWord(guide.videoTitle)
  return (
    <StyledContent>
      <Heading style={{ paddingTop: "75px" }}>
        <h1><span style={{ color: "#DD3333" }}>{titleA}</span>{titleB}</h1>
      </Heading>

      <StyledVideoContainer className={isScrolled ? 'scrolled' : ''}>
        <Video guide={guide} />
      </StyledVideoContainer>

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

const StyledVideoContainer = styled.div`
  @media screen and (min-width: 1100px){
    &.scrolled {
      position: fixed;
      top: 15rem;
      right: 10rem;
      width: 500px;
      animation: fadeIn .5s ease;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
`
