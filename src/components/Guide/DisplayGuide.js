import React, { useState } from 'react'
import { Heading, StyledVideo, MediumSpace } from "../../styles/PageStyles"
import styled from 'styled-components'
import { Modal } from "../../styles/ModalStyles"
import AddAnnotation from '../Annotation/AddAnnotation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faComment, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const variants = {
  open: { x: "-50vw" },
  closed: { x: "100%" },
}

const DisplayGuide = ({ guide, addAnnotation }) => {

  const [annotationTop, setAnnotationTop] = useState("15rem");
  const [isAnnotationOpen, setIsAnnotationOpen] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [selectedLyric, setSelectedLyric] = useState(null);

  function closeModal() {
    setSelectedLyric(null);
    setIsAnnotationOpen(false);
  }

  function handleAddAnnotation(annotation) {
    showAnnotation(annotation.annotation.annotation, annotationTop);
    addAnnotation(annotation);
  }

  function handleLyricClick(lyric) {
    if (!lyric.lessonLyrics.length) return
    let lessonLyric = lyric.lessonLyrics[0]
    let isExample = lessonLyric.isExample
    let hasAnnotations = lessonLyric.annotations.length > 0
    let isSubmitted = false;
    if (hasAnnotations) {
      isSubmitted = lessonLyric.annotations[0].isSubmitted
    }
    if (isSubmitted) return // TODO add a toast message
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
    let hasAnnotation = lessonLyric.annotations.length;
    let isExample = lessonLyric.isExample
    if (!hasAnnotation && !isExample) {
      setSelectedAnnotation(null);
      return
    }
    if (isExample) {
      showAnnotation(lessonLyric.notes, position);
    } else if (hasAnnotation) {
      showAnnotation(lessonLyric.annotations[0].annotation, position);
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
        <MediumSpace>
          <h3>Legend</h3>
          <StyledLegend>
            <li><span className="assigned"></span> Available for Annotation</li>
            <li>
              <span className="example">
                <FontAwesomeIcon icon={faStar} />
              </span> Example Annotation
            </li>
            <li>
              <span className="assigned">
                <FontAwesomeIcon icon={faComment} />
              </span> Saved Annotation
            </li>
            <li>
              <span className="submitted">
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </span> Submitted Annotation
            </li>
          </StyledLegend>
        </MediumSpace>
        <StyledColumns>
          <div>
            {guide.lyrics.map(lyric => {
              let isAssigned = false
              let isExample = false
              let hasAnnotations = false
              let isSubmitted = false
              if (lyric.lessonLyrics.length) {
                isAssigned = lyric.lessonLyrics[0].isAssigned
                isExample = lyric.lessonLyrics[0].isExample
                hasAnnotations = lyric.lessonLyrics[0].annotations.length > 0
                if (hasAnnotations) {
                  isSubmitted = lyric.lessonLyrics[0].annotations[0].isSubmitted
                }
              }
              return (
                <StyledLyric
                  key={lyric.id}
                  title={isSubmitted ? "Lyric has been submitted" : ""}
                  onClick={() => handleLyricClick(lyric)}
                  onMouseOver={(e) => {
                    let position = window.pageYOffset + e.target.getBoundingClientRect().top + "px";
                    handleLyricHover(lyric, position);
                  }}
                  className={isSubmitted ? "submitted" : isAssigned && !isExample ? "assigned" : isExample ? "example" : ""}>
                  {lyric.lyric} {isExample && <FontAwesomeIcon icon={faStar} />} {!isSubmitted && hasAnnotations && <FontAwesomeIcon icon={faComment} />} {isSubmitted && <FontAwesomeIcon icon={faChalkboardTeacher} />}
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

  svg {
    float: right;
  }

  &.example {
    background-color:  rgba(35,163,213,0.3);
  }

  &.assigned:hover {
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
  }

  &.assigned {
    cursor: pointer;
    background-color:  rgba(221, 51, 51, 0.2);
  }

  &.submitted {
    background-color: rgba(244, 247, 46, 0.2);
  }

`

const StyledLegend = styled.ul`
  list-style: none;
  margin-top: 2rem;

  li {
    display: flex;
    align-items: center;
    margin-bottom: .5rem;
  }

  span {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
  }

  span.example {
    cursor: pointer;
    background-color:  rgba(35,163,213,0.3);
  }

  span.assigned {
    cursor: pointer;
    background-color:  rgba(221, 51, 51, 0.2);
  }

  span.submitted {
    background-color: rgba(244, 247, 46, 0.2);
  }
`