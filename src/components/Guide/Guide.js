import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom"
import { Button } from "../../styles/FormStyles"
import { Heading, StyledContent } from "../../styles/PageStyles"
import auth from '../../auth/auth'
import { getLocalStorage } from '../../utilities/LocalStorage'
import { Modal } from "../../styles/ModalStyles"
import AddAnnotation from '../Annotation/AddAnnotation'
import { motion } from 'framer-motion'
import useGlobal from '../../store/Store'

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
    const selectedGuide = JSON.parse(getLocalStorage("guides")).filter(guide => guide.videoId === id)[0];
    setGuide(selectedGuide);
  }, [])


  return (
    <div>
      {!guide ? <div>LOADING...</div> : (
        <StyledContent>
          <Heading>
            <h1>{guide.title}</h1>
          </Heading>
          <StyledColumns>
            <div>
              <div className="video">
                <iframe title={guide.title} width="100%" src={guide.embedUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
            <div>
              <h3><strong>From the album</strong> "{guide.album.title}"</h3>
              <div className="credits">
                {guide.credits.map((credit, index) => {
                  return (
                    <span key={index}><em>{credit.what} by</em> <strong>{credit.who}</strong></span>
                  )
                })}
              </div>
              {
                auth.isAuthenticated() && globalState.type === 'educator' &&
                <div className="educator">
                  <Link className="button" to={'/lesson/add/' + id}>
                    <Button>Create a Lesson</Button>
                  </Link>
                </div>
              }
            </div>
          </StyledColumns>

          <StyledColumns>
            <div>
              <h1>LYRICS</h1>
              <Button onClick={() => setIsAnnotationOpen(!isAnnotationOpen)}>Add Annotation</Button>
            </div>
            <div>
              <h1>ANNOTATION</h1>
            </div>
          </StyledColumns>
        </StyledContent>
      )
      }
      <Modal
        variants={variants}
        initial="closed"
        animate={isAnnotationOpen ? "open" : "closed"}
        transition={{ damping: 300 }} >
        <AddAnnotation closeModal={closeModal} />
      </Modal>
    </div >
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

  .video {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px; height: 0; overflow: hidden;
    margin-bottom: 5rem;
  }

  .video iframe,
  .video object,
  .video embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  p {
    line-height: 2.8rem;
  }

  h2 {
    font-weight: 500;
  }

  h3 {
    font-weight: 300;
    margin-bottom: 2.5rem;
  }

  .credits span {
    display: block;
    margin-bottom: 1rem;
  }

  .lyrics {
    display: flex;
    flex-direction: column;
  }

  .educator {
    margin-top: 25px;
    text-align: right;
  }
`;
