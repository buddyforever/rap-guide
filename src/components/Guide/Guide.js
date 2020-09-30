import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams, Link } from "react-router-dom"
import { UserContext } from '../../context/UserContext'
import styled from 'styled-components'
import { motion, AnimateSharedLayout } from 'framer-motion'

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

  const videoRef = useRef(null)

  /* Context */
  const { user } = useContext(UserContext);

  /* Paramaters */
  let { id } = useParams();

  /* State */
  const [isScrolled, setIsScrolled] = useState(false)
  const [annotationIsShown, setAnnotationIsShown] = useState(false)
  const [videoHeight, setVideoHeight] = useState(0)

  /* Queries */
  const { loading, data, refetch } = useQuery(GET_GUIDE_BY_ID, {
    variables: {
      id: id
    }
  });

  function handleScroll(e) {
    if (window.scrollY >= 750 && !annotationIsShown) {
      setIsScrolled(true)
    } else {
      if (videoHeight === 0 && videoRef.current) {
        setVideoHeight(videoRef.current.getBoundingClientRect().height)
      }
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
        <motion.h1
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2,
            duration: 0.2
          }}
        >
          <span style={{ color: "#DD3333" }}>{titleA}</span>{titleB}
        </motion.h1>
      </Heading>

      <AnimateSharedLayout>
        <StyledVideoContainer
          layout
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2,
            duration: 0.3
          }}
          ref={videoRef}
          className={isScrolled ? `${annotationIsShown ? 'hidden' : ''} scrolled` : ''}
        >
          <Video guide={guide} />
        </StyledVideoContainer>
      </AnimateSharedLayout>
      {isScrolled &&
        <StyledVideoSpacer height={videoHeight} />
      }

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

      <PublicLyrics annotationIsShown={setAnnotationIsShown} guideID={guide.id} />
    </StyledContent>
  )
}

export default Guide;

const StyledVideoContainer = styled(motion.div)`
  &.hidden {
    opacity: 0!important;
    pointer-events: none;
  }

  @media screen and (min-width: 850px){
    &.scrolled {
      position: fixed;
      top: 15rem;
      right: 10rem;
      width: 300px;
    }
  }

  @media screen and (min-width: 1100px){
    &.scrolled {
      position: fixed;
      top: 15rem;
      right: 10rem;
      width: 500px;
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

const StyledVideoSpacer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height}px
`