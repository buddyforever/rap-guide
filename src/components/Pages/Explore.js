import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { StyledContent, Heading, ThreeGrid, FullSection } from '../../styles/PageStyles'
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
    console.log(tag);
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
    <FullSection space="5rem">
      <StyledContent style={{ paddingBottom: "5rem" }}>
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

