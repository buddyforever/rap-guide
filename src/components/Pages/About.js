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
          <StyledColumns>
            <MediumSpace style={{ fontSize: "18px" }}>
              <Heading>
                <h1>What's This About?</h1>
              </Heading>
              <p>The concept of a “Rap Guide” was devised by New York-based Canadian rapper Baba Brinkman, who has been producing albums and live shows under the Rap Guide banner since 2009.  <button className="showNextLink" onClick={showNextDiv}>read more...</button></p>
              <div className="hidden">
                <p>A “Rap Guide” is a hip-hop song or music video (or live performance) that both entertains and also serves as a roadmap or guide to a larger body of knowledge, beyond the experience of the artist. Most of Baba Brinkman’s Rap Guide productions so far have been about the life sciences, but some have been about works of literature, and the concept is applicable to technology, philosophy, economics, history, politics, education, mathematics, and any other domain of human understanding.</p>

                <p>Baba’s music videos have been used by teachers at the high school and university level for more than ten years to help students understand and engage with complicated academic information. Usually this would involve playing the video for the class prior to the class lecture or discussion, to break the ice.</p>

                <p>RapGuide.com was designed to give teachers an interactive education platform to engage student interest and enhance their understanding of class material, by having them annotate and cite references to explain the lyrics, share and critique each others’ annotations, and create their own Rap Guides to new topics.</p>
              </div>
            </MediumSpace>
            <MediumSpace style={{ textAlign: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 233"><title>baba-rapguide-com</title><g id="Layer_1" data-name="Layer 1"><path d="M122.66,111.32C146.43,92.46,157,66,157.16,27H140.83c0,3-.1,5.89-.24,8.74H66.72C66.57,32.9,66.5,30,66.49,27H50.16c.12,36.22,9.27,61.63,29.61,80.18a155.23,155.23,0,0,1,17.4-11.07A72.29,72.29,0,0,1,81.31,81.29h44.81c-7,9-17.05,16.88-31.41,23.83-44.54,21.55-45.4,89.56-45.34,97.82H65.7q0-6.47.7-12.87H141c.42,4.27.64,8.57.64,12.87H158C158,195.36,157.25,137.43,122.66,111.32ZM69,54.29a103.19,103.19,0,0,1-1.8-11.44h72.83a100.86,100.86,0,0,1-1.78,11.44Zm7.45,19.89A65.05,65.05,0,0,1,70.9,61.4h65.55a64.9,64.9,0,0,1-5.63,12.78Zm23.89,50.94c1.13-.54,2.17-1.13,3.27-1.69,1.09.56,2.16,1.14,3.29,1.69a47.84,47.84,0,0,1,18.19,16H82.29A47.43,47.43,0,0,1,100.38,125.12ZM77.93,148.21h51.59a89.22,89.22,0,0,1,6.21,14.86h-64a89.15,89.15,0,0,1,6.19-14.86ZM140.14,183H67.25c.63-4.32,1.46-8.59,2.49-12.78h68C138.71,174.37,139.53,178.64,140.14,183Z" /></g></svg>
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
          <StyledColumns>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 233"><title>baba-rapguide-com</title><g id="Layer_1" data-name="Layer 1"><path fill="#FFFFFF" d="M122.66,111.32C146.43,92.46,157,66,157.16,27H140.83c0,3-.1,5.89-.24,8.74H66.72C66.57,32.9,66.5,30,66.49,27H50.16c.12,36.22,9.27,61.63,29.61,80.18a155.23,155.23,0,0,1,17.4-11.07A72.29,72.29,0,0,1,81.31,81.29h44.81c-7,9-17.05,16.88-31.41,23.83-44.54,21.55-45.4,89.56-45.34,97.82H65.7q0-6.47.7-12.87H141c.42,4.27.64,8.57.64,12.87H158C158,195.36,157.25,137.43,122.66,111.32ZM69,54.29a103.19,103.19,0,0,1-1.8-11.44h72.83a100.86,100.86,0,0,1-1.78,11.44Zm7.45,19.89A65.05,65.05,0,0,1,70.9,61.4h65.55a64.9,64.9,0,0,1-5.63,12.78Zm23.89,50.94c1.13-.54,2.17-1.13,3.27-1.69,1.09.56,2.16,1.14,3.29,1.69a47.84,47.84,0,0,1,18.19,16H82.29A47.43,47.43,0,0,1,100.38,125.12ZM77.93,148.21h51.59a89.22,89.22,0,0,1,6.21,14.86h-64a89.15,89.15,0,0,1,6.19-14.86ZM140.14,183H67.25c.63-4.32,1.46-8.59,2.49-12.78h68C138.71,174.37,139.53,178.64,140.14,183Z" /></g></svg>
            </div>
            <MediumSpace>
              <Heading>
                <h1>FAQ</h1>
              </Heading>
              <p>In 2004, Baba Brinkman had recently graduated with a masters degree in English Literature and was on tour in the UK performing his one man show based on his thesis: The Rap Canterbury Tales. What follows is the timeline of improbable events that lead to the inception of RapGuide.com as a teaching and learning platform.</p>
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>
    </>
  )
}

export default About;

