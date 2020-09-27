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
import Explore from "../Pages/Explore"

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
      <FullSection
        className="small-hide-background"
        space="5rem"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundImage: "url('images/illustration1.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "40%",
          backgroundPosition: "80% center"
        }}>
        <StyledContent
          className="small-600"
          style={{
            maxWidth: "1400px",
            width: "100%"
          }}
        >
          <MediumSpace>
            <Heading>
              <h1><span>Informative</span> Music Videos</h1>
            </Heading>
            <p>
              A "Rap Guide" is a hip-hop song or music video about something beyond the subjective views and experiences of the artist.
              </p>
            <p>
              Rap Guides are corroborated, citing information drawn from reliable sources, to the best of the artist's knowledge. If a song is developed in consultation with an academic expert, it can also be called a "Peer Reviewed Rap".
              </p>
            <p>
              These songs integrate the creative and editorial perspective of the artist, but they do not knowingly communicate falsehoods.
              </p>
            <p>
              Rap Guides make complex topics accessible and entertaining.
              </p>
          </MediumSpace>
          <div
            className="small"
            style={{
              maxWidth: "600px",
              paddingTop: "25px",
              width: "90%",
              margin: "0 auto",
            }}
          >
            <img style={{ width: "100%" }} src="images/illustration1.svg" alt="Illustration 1" />
          </div>
        </StyledContent>
      </FullSection>
      <FullSection
        bgColor="black"
        color="white"
        space="5rem"
        style={{
          display: "flex",
          alignItems: "center"
        }}>
        <StyledContent>
          <StyledColumns>
            <MediumSpace style={{ textAlign: "center" }}>
              <img src="images/illustration3.svg" alt="Rap Guide | Lessons" style={{ maxHeight: "600px" }} />
            </MediumSpace>
            <MediumSpace style={{ fontSize: "18px" }}>
              <Heading>
                <h1>Lessons</h1>
              </Heading>
              <p>
                Teachers can use existing Rap Guides to develop Lessons and share them with a class, and gather student responses via annotations attached to the lyrics.
              </p>

              <p>
                Lessons are developed and run in private class-only digital spaces, but you can also opt to share the results on the public site.
              </p>

              <p>
                Resources to help students write, record, and film their own Rap Guide videos are also available on the <Link to="/lessons">lesson page</Link>.
              </p>
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>
      <FullSection space="5rem" style={{ display: "flex", alignItems: "center" }}>
        <StyledContent>
          <StyledColumns>
            <MediumSpace style={{ fontSize: "18px" }}>
              <Heading>
                <h1>Request</h1>
              </Heading>
              <p>
                If you don’t find a music video on this site about a topic you’re teaching or want to learn about, use the <Link to="/request">request page</Link> and if it exists we’ll try to add it, or if it doesn’t exist we’ll try to produce it. Approved requests are displayed publicly to help us gauge (and attract) popular support for the topic.
              </p>
            </MediumSpace>
            <MediumSpace style={{ textAlign: "center" }}>
              <img src="images/illustration5.png" alt="Rap Guide | Requests" style={{ maxHeight: "600px" }} />
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>
      <Explore />
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

