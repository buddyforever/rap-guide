import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { RequestForm } from '../Request/RequestForm'
import {
  StyledContent,
  Heading,
  MediumSpace,
  LargeSpace,
  FullSection,
  StyledColumns
} from '../../styles/PageStyles'
import Loader from '../Loader'
import { dateFormat } from '../../utilities/DateFormat'

import { useQuery } from '@apollo/react-hooks'
import { GET_REQUESTS } from '../../queries/requests'

export const Request = () => {

  /* Queries */
  const { loading, data, refetch } = useQuery(GET_REQUESTS)

  if (loading) return <Loader />
  return (
    <>
      {/* PANEL 1 */}
      <FullSection style={{ minHeight: "auto" }}>
        <StyledContent style={{ width: "100%" }}>
          <RequestForm refetchRequests={refetch} />
        </StyledContent>
      </FullSection>

      {/* PANEL 2 */}
      <FullSection
        bgColor="black"
        color="white"
        style={{
          display: "flex",
          alignItems: "center"
        }}>
        <StyledVideoBackground>
          <div className="content-foreground">
            <iframe title="Commission Video" src="https://www.youtube.com/embed/YMYrqOGCQo0?controls=0&autoplay=1&mute=1&loop=1&playlist=YMYrqOGCQo0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </StyledVideoBackground>
        <StyledContent>
          <StyledColumns>
            <MediumSpace style={{ fontSize: "18px" }}>
              <div style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "0 50px 50px 50px"
              }}>
                <Heading>
                  <h1>Commission a Video</h1>
                </Heading>
                <StyledParagraph>If a Rap Guide song and video doesn’t exist for a topic you wish the world knew more about, <Link to="/contact">contact us</Link> with the details and we can work together to produce it.</StyledParagraph>
              </div>
            </MediumSpace>
            <MediumSpace style={{ textAlign: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 233"><title>baba-rapguide-com</title><g id="Layer_1" data-name="Layer 1"><path fill="#FFFFFF" d="M122.66,111.32C146.43,92.46,157,66,157.16,27H140.83c0,3-.1,5.89-.24,8.74H66.72C66.57,32.9,66.5,30,66.49,27H50.16c.12,36.22,9.27,61.63,29.61,80.18a155.23,155.23,0,0,1,17.4-11.07A72.29,72.29,0,0,1,81.31,81.29h44.81c-7,9-17.05,16.88-31.41,23.83-44.54,21.55-45.4,89.56-45.34,97.82H65.7q0-6.47.7-12.87H141c.42,4.27.64,8.57.64,12.87H158C158,195.36,157.25,137.43,122.66,111.32ZM69,54.29a103.19,103.19,0,0,1-1.8-11.44h72.83a100.86,100.86,0,0,1-1.78,11.44Zm7.45,19.89A65.05,65.05,0,0,1,70.9,61.4h65.55a64.9,64.9,0,0,1-5.63,12.78Zm23.89,50.94c1.13-.54,2.17-1.13,3.27-1.69,1.09.56,2.16,1.14,3.29,1.69a47.84,47.84,0,0,1,18.19,16H82.29A47.43,47.43,0,0,1,100.38,125.12ZM77.93,148.21h51.59a89.22,89.22,0,0,1,6.21,14.86h-64a89.15,89.15,0,0,1,6.19-14.86ZM140.14,183H67.25c.63-4.32,1.46-8.59,2.49-12.78h68C138.71,174.37,139.53,178.64,140.14,183Z" /></g></svg>
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>

      {/* PANEL 3 */}
      <FullSection
        bgColor="black"
        color="white"
        style={{
          display: "flex",
          alignItems: "center"
        }}>
        <StyledContent>
          <StyledColumns>
            <MediumSpace style={{ fontSize: "18px" }}>
              <Heading style={{ marginTop: "25px", paddingBottom: "20px" }}>
                <h1>Request an Existing Song or Video</h1>
              </Heading>
              <p className="paragraph-top">We can add any existing song or music video to this teaching platform, along with annotatable lyrics for lesson-building. Teachers, if you would like to use an existing song or video for a class assignment, please <Link to="/contact">contact us</Link> to request it.</p>

              <p style={{ marginTop: `50px`, fontSize: `24px` }} className="paragraph-bottom">Not sure where to start? Check out these...</p>

              <div className="stacked-buttons">
                <Link to="/playlist/videos-by-baba-brinkman" className="link">More Baba Brinkman Videos</Link>
                <Link to="/playlist/more-songs-by-baba-brinkman" className="link">More Baba Brinkman Songs</Link>
                <Link to="/playlist/videos-by-other-artists" className="link">Other Artist Videos</Link>
              </div>
            </MediumSpace>
            <MediumSpace style={{ textAlign: "center" }}>
              <img src="images/illustration5.svg" alt="Rap Guide | Requests" style={{ maxHeight: "600px" }} />
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>

      {/* PANEL 4 */}
      <FullSection
        style={{
          display: "flex",
          alignItems: "center"
        }}>
        <StyledContent style={{ width: "100%" }} id="requests">
          <Heading>
            <h1>Submitted Requests</h1>
          </Heading>
          <MediumSpace style={{ fontSize: "18px" }}>
            <p>Below are Rap Guides that users of this site have requested, which we hope to be able to make before too long.</p>
          </MediumSpace>
          {data && data.requests.length > 0 &&
            <LargeSpace>
              {data.requests.map(request => (
                <StyledRequest key={request.id}>
                  <h2>I Wish There Was a Rap Guide to ~ {request.title}</h2>
                  <span className="date">{dateFormat(request.updatedAt)}</span>
                  <p dangerouslySetInnerHTML={{ __html: request.information }} />
                </StyledRequest>
              ))}
            </LargeSpace>
          }
          {data.requests.length === 0 && <p>There are currently no requests that have been approved. Check back soon!</p>}
        </StyledContent>
      </FullSection>
    </>
  )
}

export default Request;

const StyledRequest = styled.div`
  padding: 20px;
  margin-bottom: 50px;
  background-color: #f5f5f5;
  border-radius: 15px;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  ul, ol {
    padding-left: 5rem;
  }

  .date {
    font-size: 1.4rem;
    color: #666;
  }

`

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

const StyledVideoBackground = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.3;

    .content-foreground {
      width: 100vw;
      height: 100vh;
      pointer-events: none;

      @media only screen and (max-width: 950px){
        display: none;
      }

      iframe {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
`

const StyledParagraph = styled.p`
  text-shadow: 3px 3px 2px rgba(0,0,0,1);
`
