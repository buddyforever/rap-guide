import React, { useState, useContext } from 'react'
import { Heading, StyledVideo, MediumSpace } from "../../styles/PageStyles"
import styled from 'styled-components'
import { Modal } from "../../styles/ModalStyles"
import AddAnnotation from '../Annotation/AddAnnotation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const variants = {
  open: { x: "-50vw" },
  closed: { x: "100%" },
}

const DisplayGuide = ({ guide, addAnnotation, refetch }) => {

  const [annotationTop, setAnnotationTop] = useState("15rem");
  const [isAnnotationOpen, setIsAnnotationOpen] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [selectedLyric, setSelectedLyric] = useState(null);

  function closeModal() {
    setIsAnnotationOpen(false);
  }

  async function handleAddAnnotation(annotation) {
    await addAnnotation(annotation);
    refetch();
  }

  function handleLyricClick(lyric) {
    if (!lyric.lessonLyrics.length) return
    let lessonLyric = lyric.lessonLyrics[0]
    let isExample = lessonLyric.isExample
    if (isExample) {
      setSelectedAnnotation({
        annotation: lessonLyric.notes,
      })
    } else {
      setSelectedLyric(lessonLyric);
      setIsAnnotationOpen(true);
    }
  }

  function handleLyricHover(lyric, position) {
    if (!lyric.lessonLyrics.length) return
    let lessonLyric = lyric.lessonLyrics[0]
    let isExample = lessonLyric.isExample
    if (isExample) {
      showAnnotation(lessonLyric.notes, position);
    } else if (lessonLyric.annotations.length) {
      showAnnotation(lessonLyric.annotations[0], position);
    }
  }

  function showAnnotation(annotation, position) {
    setAnnotationTop(position);
    setSelectedAnnotation({ annotation });
  }

  return (
    <div>
      <div>
        <Heading>
          <h1>{guide.videoTitle}</h1>
        </Heading>
        <MediumSpace>
          <StyledVideo>
            <div className="video">
              <iframe title={guide.videoTitle} width="100%" src={guide.videoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </StyledVideo>
        </MediumSpace>
        <StyledColumns>
          <div>
            {guide.lyrics.map(lyric => {
              let isAssigned = false
              let isExample = false
              if (lyric.lessonLyrics.length) {
                isAssigned = lyric.lessonLyrics[0].isAssigned
                isExample = lyric.lessonLyrics[0].isExample
              }
              return (
                <StyledLyric
                  key={lyric.id}
                  onClick={() => handleLyricClick(lyric)}
                  onMouseOver={(e) => {
                    let position = window.pageYOffset + e.target.getBoundingClientRect().top + "px";
                    handleLyricHover(lyric, position);
                  }}
                  className={isAssigned && !isExample ? "assigned" : isExample ? "example" : ""}>
                  {lyric.lyric} {isExample && <FontAwesomeIcon icon={faStar} />}
                </StyledLyric>
              )
            })
            }
          </div>
          <div>
            {selectedAnnotation &&
              // Need to make it so that the annotation only shows up when one is selected or hovering.
              // If you hover over anything else the annotation stays where it is.
              <StyledAnnotation
                top={annotationTop}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                dangerouslySetInnerHTML={{ __html: selectedAnnotation.annotation }}
              />
            }
          </div>
        </StyledColumns>
        <Modal
          variants={variants}
          initial="closed"
          animate={isAnnotationOpen ? "open" : "closed"}
          transition={{ damping: 300 }} >
          {selectedLyric &&
            <AddAnnotation
              lessonLyric={selectedLyric}
              closeModal={closeModal}
              saveAnnotation={handleAddAnnotation} />
          }
        </Modal>
      </div>
    </div >
  )
}

export default DisplayGuide

const StyledAnnotation = styled(motion.div)`
  border-left: 3px solid #dd3333;
  padding: 2.5rem;
  position: absolute;
  top: ${props => props.top};
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

  &.example {
    cursor: pointer;
    background-color:  rgba(35,163,213,0.3);
  }

  &.assigned:hover {
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
  }

  &.assigned {
    cursor: pointer;
    background-color:  rgba(221, 51, 51, 0.2);
  }

`