import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import { Button } from "../../styles/FormStyles"
import { Heading, StyledContent, LargeSpace, StyledVideo } from "../../styles/PageStyles"
import auth from '../../auth/auth'
import { getLocalStorage } from '../../utilities/LocalStorage'
import { Modal } from "../../styles/ModalStyles"
import AddAnnotation from '../Annotation/AddAnnotation'
import { motion } from 'framer-motion'
import useGlobal from '../../store/Store'
import Lyric from '../Guide/Lyric'

const variants = {
  open: { x: "-50vw" },
  closed: { x: "100%" },
}

export const Guide = () => {

  const [globalState, globalActions] = useGlobal();

  let { id } = useParams();
  const [guide, setGuide] = useState();

  const [isAnnotationOpen, setIsAnnotationOpen] = useState(false);

  function closeModal() {
    setIsAnnotationOpen(false);
  }

  useEffect(() => {
    // TODO Get from actual datasource
    const selectedGuide = getLocalStorage("guides").filter(guide => guide.videoId === id)[0];
    setGuide(selectedGuide);
  }, [])


  return (
    <StyledContent>
      {!guide ? <div>LOADING...</div> : (
        <div>
          <Heading>
            <h1>{guide.title}</h1>
          </Heading>
          <StyledVideo>
            <div className="video">
              <iframe title={guide.title} width="100%" src={guide.embedUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            {
              auth.isAuthenticated() && globalState.type === 'educator' &&
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
                <Lyric onHandleClick={() => setIsAnnotationOpen(!isAnnotationOpen)}>{lyric.lyric}</Lyric>
              ))}
            </div>
            <div>
              <h3>Annotations</h3>
            </div>
          </StyledColumns>
          <Modal
            variants={variants}
            initial="closed"
            animate={isAnnotationOpen ? "open" : "closed"}
            transition={{ damping: 300 }} >
            <AddAnnotation closeModal={closeModal} />
          </Modal>
        </div>
      )}
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

