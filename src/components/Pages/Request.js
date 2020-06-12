import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { StyledContent, Heading, MediumSpace, FullSection, StyledColumns } from '../../styles/PageStyles'

export const Request = () => {

  const [rapGuideName, setRapGuideName] = useState("")

  return (
    <>
      {/* PANEL 1 */}
      <FullSection className="centered">
        <StyledContent style={{ width: "100%" }}>
          <Heading>
            <h1>
              {
                rapGuideName.length
                  ? rapGuideName
                  : 'I wish there was a Rap Guide to ...'
              }
            </h1>
            <MediumSpace>
              <Search>
                <input
                  type="text"
                  placeholder="Enter you Rap Guide Name..."
                  value={rapGuideName}
                  onChange={(e) => setRapGuideName(e.target.value)} />
                <button>REQUEST</button>
              </Search>
            </MediumSpace>
          </Heading>
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
        <StyledContent>
          <Heading>
            <h1>Commission a Video</h1>
          </Heading>
          <StyledColumns>
            <MediumSpace style={{ fontSize: "18px" }}>
              <p>If a Rap Guide song and video doesn’t exist for a topic you wish the world knew more about, <Link to="/contact">contact us</Link> with the details and we can work together to produce it.</p>
            </MediumSpace>
            <MediumSpace style={{ textAlign: "center" }}>
              <img src="https://via.placeholder.com/400/400" />
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>

      {/* PANEL 3 */}
      <FullSection
        style={{
          display: "flex",
          alignItems: "center"
        }}>
        <StyledContent>
          <Heading>
            <h1>Request an Existing Music Video</h1>
          </Heading>
          <StyledColumns>
            <MediumSpace style={{ textAlign: "center" }}>
              <img src="https://via.placeholder.com/400/400" />
            </MediumSpace>
            <MediumSpace style={{ fontSize: "18px" }}>
              <p>We can add any existing music video to this teaching platform, along with annotatable lyrics. Teachers, if you would like to use an existing video for a class assignment please <Link to="/contact">contact us</Link> to request it be added.</p>

              <p>Not sure where to start? Baba Brinkman has close to <strong>40 Rap Guide music videos</strong> on a range of life science and earth science topics you can select from.
              </p>
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>

      {/* PANEL 4 */}
      <FullSection
        bgColor="black"
        color="white"
        style={{
          display: "flex",
          alignItems: "center"
        }}>
        <StyledContent>
          <Heading>
            <h1>Request a Video for an Existing Song</h1>
          </Heading>
          <StyledColumns>
            <MediumSpace style={{ fontSize: "18px" }}>
              <p>We can make videos for existing songs, either lyric videos or music videos, with a combination of animation, motion graphics, and green screen. <Link to="/contact">contact us</Link> to inquire about making a video for an existing song and adding it to this site.</p>

              <p>Not sure where to start? Here are 40 songs with science content that Baba Brinkman has released as audio tracks but which have no video produced as yet. <Link to="/">[currently the link is a PDF, but it should be a pop-up window]</Link>
              </p>
            </MediumSpace>
            <MediumSpace style={{ textAlign: "center" }}>
              <img src="https://via.placeholder.com/400/400" />
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>

      {/* PANEL 5 */}
      <FullSection
        style={{
          display: "flex",
          alignItems: "center"
        }}>
        <StyledContent style={{ width: "100%" }}>
          <Heading>
            <h1>Submitted Requests</h1>
          </Heading>
          <MediumSpace style={{ fontSize: "18px" }}>
            <p>Below are Rap Guides that users of this site have requested, which we hope to be able to make before too long.</p>
          </MediumSpace>
        </StyledContent>
      </FullSection>
    </>
  )
}

export default Request;

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

