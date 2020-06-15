import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { StyledContent, Heading, ThreeGrid, FullSection, MediumSpace, StyledColumns } from '../../styles/PageStyles'
import VideoThumb from '../Guide/VideoThumb'
import TagCloud from '../Guide/TagCloud'
import Loader from '../Loader'
import { DotWave } from '../ui/Loader'

import { useQuery } from '@apollo/react-hooks'
import { GET_ALL_GUIDES } from '../../queries/guides'

export const Home = () => {

  /* Queries */
  const { loading, data: guides } = useQuery(GET_ALL_GUIDES);

  /* State */
  const [topics, setTopics] = useState([]);

  /* Functions */
  function selectTag(tag) {

  }

  function showNextDiv(e) {
    e.currentTarget.parentNode.nextSibling.classList.toggle("hidden");
  }

  /* Effects */
  useEffect(() => {
    if (!guides) return
    let topicsArr = []
    guides.guides.map(guide => {
      return topicsArr = [
        ...topicsArr,
        ...guide.topics
      ]
    })
    setTopics(topicsArr);
  }, [guides])

  if (loading) return <Loader />
  return (
    <>
      <FullSection style={{ display: "flex", alignItems: "center" }}>
        <StyledContent>
          <Heading>
            <h1>Informative Music Videos</h1>
          </Heading>
          <StyledColumns>
            <MediumSpace style={{ fontSize: "18px" }}>
              <p>A “Rap Guide” is a hip-hop song or music video about something beyond the subjective views and experiences of the artist. <button className="showNextLink" onClick={showNextDiv}>read more...</button></p>
              <div className="hidden">
                <p>Rap Guides can be enjoyed by anyone, but they also points towards a body of knowledge that can only be fully understood through reading and study.</p>

                <p>Rap Guide are corroborated, citing information drawn from reliable sources, to the best of the artist’s knowledge. If a song is developed in consultation with an academic expert, it can also be called a “peer reviewed rap”.</p>

                <p>These songs integrate the editorial perspective, creative vision, and stylistic and rhetorical choices of the artist, but they do not knowingly communicate falsehoods.</p>

                <p>Rap Guides make difficult topics accessible and entertaining.</p>
              </div>
            </MediumSpace>
            <MediumSpace style={{ textAlign: "center" }}>
              <img src="https://via.placeholder.com/400/400" />
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>
      <FullSection
        bgColor="black"
        color="white"
        style={{
          display: "flex",
          alignItems: "center"
        }}>
        <StyledContent>
          <Heading>
            <h1>Teachers and Learners</h1>
          </Heading>
          <StyledColumns>
            <MediumSpace style={{ textAlign: "center" }}>
              <img src="https://via.placeholder.com/400/400" />
            </MediumSpace>
            <MediumSpace style={{ fontSize: "18px" }}>
              <p>You can use existing Rap Guides to develop lessons and class projects, or work with students to create their own. <button className="showNextLink" onClick={showNextDiv}>read more...</button></p>
              <div className="hidden">
                One of the most popular lessons challenges students to research the meaning of lyrics and write their own annotations with explanatory notes, graphs, images, and links to sources, your own Rap Wikipedia.

                Lessons are developed and run in private class-only digital spaces, but you can also opt to share the results on the public site.

                Lesson plans and resources to help students write, record, and film their own Rap Guide videos are in development and will be added soon.

                <Link to="/contact">Contact us</Link> to request an “Educator Account” and get started.
              </div>
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>
      <FullSection style={{ paddingBottom: "5rem" }}>
        <StyledContent>
          <Heading>
            <h1>Explore</h1>
            <Search>
              <input type="text" placeholder="What are you looking for?..." />
              <button><FontAwesomeIcon icon={faSearch} /></button>
            </Search>
          </Heading>

          <TagCloud selectTag={selectTag} tags={topics} />

          <Heading>
            <h1>Videos</h1>
          </Heading>

          <ThreeGrid>
            {guides.guides.map(guide => {
              return (<VideoThumb
                key={guide.id}
                guide={guide} />)
            })}
          </ThreeGrid>
        </StyledContent>
      </FullSection>
    </>
  )
}

export default Home;

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

