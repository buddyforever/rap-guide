import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { StyledContent, Heading, ThreeGrid, FullSection, MediumSpace } from '../../styles/PageStyles'
import VideoThumb from '../Guide/VideoThumb'
import { Card } from '../Card'
import TagCloud from '../Guide/TagCloud'
import Loader from '../Loader'
import { DotWave } from '../ui/Loader'
import { escapeRegex } from '../../utilities/regex'

import { useQuery } from '@apollo/react-hooks'
import { GET_ALL_GUIDES } from '../../queries/guides'

export const Explore = () => {

  /* Queries */
  const { loading, data: guides } = useQuery(GET_ALL_GUIDES);

  /* State */
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [hoveredVideo, setHoveredVideo] = useState(null)

  /* Functions */
  function selectTag(tag) {
    console.log(tag)
    setFilteredGuides(guides.guides.filter(guide => {
      return guide.topics.find(topic => topic.topic === tag);
    }))
  }

  function filterGuidesByTitle(e) {
    setSearchQuery(e.target.value)

    if (e.target.value.length === 0) {
      setFilteredGuides(guides.guides)
      return
    }

    var expression = escapeRegex(searchQuery);
    setFilteredGuides(guides.guides.filter(guide => {
      return guide.videoTitle.match(expression);
    }))
  }

  /* Effects */
  useEffect(() => {
    if (!guides) return
    let topicsArr = []
    guides.topics.map(topic => {
      return topicsArr = [
        ...topicsArr,
        {
          id: topic.id,
          topic: topic.topic,
          count: topic.guides.length
        }
      ]
    })
    setTopics(topicsArr);
    setFilteredGuides(guides.guides);
    console.log(guides)
  }, [guides])

  if (loading) return <Loader />
  return (
    <FullSection space="5rem" style={{ background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(28,28,28,1) 50%, rgba(0,0,0,1) 100%)" }}>
      <StyledContent style={{ paddingBottom: "5rem" }}>

        <Heading style={{ color: "white" }}>
          <h1>Videos</h1>
        </Heading>

        <TagCloud selectTag={selectTag} tags={topics} />

        <ThreeGrid style={{ marginTop: "50px" }}>
          {filteredGuides.map(guide => {
            const numLessons = guide.lessons.length
            const numStudents = guide.lessons.reduce((sum, lesson) => lesson.accounts.length, 0)
            const numAnnotations = guide.lessons.reduce((sum, lesson) => lesson.annotations.length, 0)
            const isHovered = guide.id === hoveredVideo
            let badge = null
            if (numLessons > 0) {
              badge = {
                label: "In Session",
                color: "#249FD7"
              }
            }
            return (
              <Card
                key={guide.id}
                title={guide.videoTitle}
                topics={guide.topics}
                link={`/guide/${guide.id}`}
                onMouseOver={() => setHoveredVideo(guide.id)}
                onMouseOut={() => setHoveredVideo(null)}
                classes={hoveredVideo ? !isHovered ? "dimmed" : "" : ""}
                stats={[
                  {
                    label: "lessons",
                    value: numLessons,
                    color: numLessons > 0 ? "#249FD7" : null
                  },
                  {
                    label: "annotations",
                    value: numAnnotations
                  },
                  {
                    label: "students",
                    value: numStudents
                  }
                ]}
                image={guide.videoThumb}
                color="#DD3333"
                buttonText="More..."
                badge={badge}
              />
            )
          })}
        </ThreeGrid>
      </StyledContent>
    </FullSection>
  )
}

export default Explore;

const Search = styled.div`
  padding-right: 4rem;
  display: flex;
  align-items: center;
  margin: 1rem 0 2.5rem 0;

  input[type=text] {
    width: 100%;
    padding: 1rem 2rem;
    height: 5rem;
    border-right: none;
    border-top: 1px solid #999;
    border-left: 1px solid #999;
    border-bottom: 1px solid #999;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    font-size: 1.6rem;
    outline: none;
  }

  button {
    background-color: #333;
    color: white;
    height: 5rem;
    cursor: pointer;
    padding: 1rem 2rem;
    border-left: none;
    border-top: 1px solid #333;
    border-right: 1px solid #333;
    border-bottom: 1px solid #333;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    transition: all .3s ease;
    outline: none;
    font-size: 1.8rem;

    &:hover {
      background-color: #999;
      border-color: #999;
    }
  }
`

