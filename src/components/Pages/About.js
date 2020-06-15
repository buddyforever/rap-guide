import React from 'react'

import { StyledContent, Heading, ThreeGrid, FullSection, MediumSpace, StyledColumns } from '../../styles/PageStyles'

export const About = () => {

  function showNextDiv(e) {
    e.currentTarget.parentNode.nextSibling.classList.toggle("hidden");
  }

  return (
    <>
      <FullSection style={{ display: "flex", alignItems: "center" }}>
        <StyledContent>
          <Heading>
            <h1>What's This About?</h1>
          </Heading>
          <StyledColumns>
            <MediumSpace style={{ fontSize: "18px" }}>
              <p>The concept of a “Rap Guide” was devised by New York-based Canadian rapper Baba Brinkman, who has been producing albums and live shows under the Rap Guide banner since 2009.  <button className="showNextLink" onClick={showNextDiv}>read more...</button></p>
              <div className="hidden">
                <p>A “Rap Guide” is a hip-hop song or music video (or live performance) that both entertains and also serves as a roadmap or guide to a larger body of knowledge, beyond the experience of the artist. Most of Baba Brinkman’s Rap Guide productions so far have been about the life sciences, but some have been about works of literature, and the concept is applicable to technology, philosophy, economics, history, politics, education, mathematics, and any other domain of human understanding.</p>

                <p>Baba’s music videos have been used by teachers at the high school and university level for more than ten years to help students understand and engage with complicated academic information. Usually this would involve playing the video for the class prior to the class lecture or discussion, to break the ice.</p>

                <p>RapGuide.com was designed to give teachers an interactive education platform to engage student interest and enhance their understanding of class material, by having them annotate and cite references to explain the lyrics, share and critique each others’ annotations, and create their own Rap Guides to new topics.</p>
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
            <h1>FAQ</h1>
          </Heading>
          <StyledColumns>
            <MediumSpace>
              <p>In 2004, Baba Brinkman had recently graduated with a masters degree in English Literature and was on tour in the UK performing his one man show based on his thesis: The Rap Canterbury Tales. What follows is the timeline of improbable events that lead to the inception of RapGuide.com as a teaching and learning platform.</p>
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>
    </>
  )
}

export default About;

