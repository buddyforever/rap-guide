import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import { FullSection, StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'

export const MakeARapGuide = () => {

  const [step, setStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  return (
    <Panels>
      <AnimatePresence
        initial={false}
        exitBeforeEnter>
        {step === 0 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step0"
            bgColor="black"
            color="white"
            style={{ paddingBottom: "20rem" }}
            className="centered">
            <StyledContent>
              <Heading>
                <h1>Bonus Lesson: How to Make a Rap Guide</h1>
              </Heading>
              <MediumSpace>
                <p>Anyone can make a Rap Guide by following these 10 easy steps. Okay, maybe not so easy, but definitely fun.</p>

                <p>Research, write, record, and film your own rap music video about a topic people should know more about, and we’ll showcase the best examples. The following songwriting lesson can be done solo or as a group collaboration.</p>

                <p>Get started with <button style={{ color: "white", backgroundColor: "black", border: "none", textDecoration: "underline", "cursor": "pointer", fontSize: "inherit" }}>Step 1</button>.</p>
              </MediumSpace>
            </StyledContent>
          </FullSection>)}
        {step === 1 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step1"
            bgColor="black"
            color="white"
            style={{ paddingBottom: "10rem" }}
            className="centered">
            <StyledContent>
              <h1>Step 1</h1>
              <p>What is your rap going to be about? Write down the topic or idea you are going to explore in your lyrics. It should be big enough that you could write an essay on it or talk about it for 3-5 minutes, but small enough that you can capture its central message in a song.</p>

              <em>Example: “Meiosis"</em>

              <p>Hint: not sure what topic to rap about? Check out some of the suggestions posted on the <Link to="/request">Request page</Link>.</p>
            </StyledContent>
          </FullSection>)}
        {step === 2 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step2"
            bgColor="black"
            color="white"
            className="centered">
            <StyledContent>
              <h1>Step 2</h1>
              <p>Select a beat that suits the mood of the topic you plan to write about. Search "rap instrumentals" on YouTube, or choose a beat from one of the playlists below.</p>

              <p>
                <iframe title="Volume 1" style={{ border: 0, width: "100%", height: "42px" }} src="https://bandcamp.com/EmbeddedPlayer/album=896253204/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="http://litfuserecords.bandcamp.com/album/lit-fuse-instrumentals-vol-1">Lit Fuse Instrumentals Vol. 1 by Lit Fuse Records Artists</a></iframe>
                <iframe title="Volume 2" style={{ border: 0, width: "100%", height: "42px" }} src="https://bandcamp.com/EmbeddedPlayer/album=896253204/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://litfuserecords.bandcamp.com/album/lit-fuse-instrumentals-vol-2">Lit Fuse Instrumentals Vol. 2 by Lit Fuse Records Artists</a></iframe>
                <iframe title="Volume 3" style={{ border: 0, width: "100%", height: "42px" }} src="https://bandcamp.com/EmbeddedPlayer/album=896253204/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://litfuserecords.bandcamp.com/album/lit-fuse-instrumentals-vol-3">Lit Fuse Instrumentals Vol. 3 by Lit Fuse Records Artists</a></iframe>
              </p>
            </StyledContent>
          </FullSection>)}
        {step === 3 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step3"
            bgColor="black"
            color="white"
            className="centered">
            <StyledContent>
              <h1>Step 3</h1>
              <p>Research your topic, writing down words and phrases with central relevance and their definitions.</p>

              <p>Example words and phrases: Cell division, gametogenesis, daughter cell, chromosome, haplotype, polar bodies, etc.</p>

              <p>Hint: don't worry about rhyming yet, just look for interesting phrases that roll off the tongue.</p>
            </StyledContent>
          </FullSection>)}
        {step === 4 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step4"
            bgColor="black"
            color="white"
            className="centered">
            <StyledContent>
              <h1>Step 4</h1>
              <p>Choose 15-20 keywords and phrases from your notes, without worrying about the story or structure of the song yet. This is a stream-of-consciousness "word cloud" of related terms that could potentially be referenced in your lyrics.</p>

              <p>Next to each keyword or phrase, write down 5-10 words that rhyme with each word or stressed syllable in the phrase. These can either be “perfect” rhymes that sound exactly like the original word, or “slant” rhymes that sound similar but different.</p>

              <h3>Example Rhymes:</h3>

              <p>
                Phrase: “Cell Division”
                Perfect: Cell, swell, well, shell, bell, fell
                Slant: Skill, feel, real, kill, felt, held
              </p>

              <p>Perfect: Division, incision, precision, decision, vision
              Slant: Wishin’, hit ‘em, rhythm, mission, livin’, system</p>

              <p>Hint: don’t worry about how the rhymes fit into your song yet, just generate a set of options you can choose from later.</p>
            </StyledContent>
          </FullSection>)}
        {step === 5 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step5"
            bgColor="black"
            color="white"
            className="centered">
            <StyledContent>
              <h1>Step 5</h1>
              <p>Combine the rhymes that go with your favorite words or phrases from the list above. Try to rhyme multiple-stress patterns where possible, emphasizing vowel sounds more than consonant sounds and embracing “sound-alike” slant rhymes over perfect rhymes.</p>

              <h3>Example:</h3>

              <ul className="step5">
                <li><span>Cell</span> <span>Division</span></li>
                <li><span>Tel</span>e<span>vision</span></li>
                <li><span>Hell</span>-a-<span>frickin’</span></li>
                <li><span>Real</span>ly <span>livin’</span></li>
                <li><span>Fail</span> the <span>mission</span></li>
                <li><span>El</span>ec<span>trician</span></li>
                <li><span>Skill</span> I’m <span>bringin’</span></li>
                <li><span>Feel</span> the <span>friction</span></li>
              </ul>

              <p>Hint: Use the RhymeWave website to generate interesting rhyming patterns.</p>

            </StyledContent>
          </FullSection>)}
      </AnimatePresence>
      <StyledControls>
        <h3>Step</h3>
        <div className="buttons">
          <button
            className={step === 1 ? 'active' : ''}
            onClick={() => setStep(1)}>1</button>
          <button
            className={step === 2 ? 'active' : ''}
            onClick={() => setStep(2)}>2</button>
          <button
            className={step === 3 ? 'active' : ''}
            onClick={() => setStep(3)}>3</button>
          <button
            className={step === 4 ? 'active' : ''}
            onClick={() => setStep(4)}>4</button>
          <button
            className={step === 5 ? 'active' : ''}
            onClick={() => setStep(5)}>5</button>
          <button
            className={step === 6 ? 'active' : ''}
            onClick={() => setStep(6)}>6</button>
          <button
            className={step === 7 ? 'active' : ''}
            onClick={() => setStep(7)}>7</button>
          <button
            className={step === 8 ? 'active' : ''}
            onClick={() => setStep(8)}>8</button>
          <button
            className={step === 9 ? 'active' : ''}
            onClick={() => setStep(9)}>9</button>
          <button
            className={step === 10 ? 'active' : ''}
            onClick={() => setStep(10)}>10</button>
        </div>
      </StyledControls>
    </Panels >
  )
}

const Panels = styled.div`
  background-color: black;
  min-height: 90vh;
  width: 100vw;
  position: relative;

  .step5 {
    list-style: none;
  }

  .step5 li span:nth-child(1){
    color: red;
  }
  .step5 li span:nth-child(2){
    color: blue;
  }
`

const StyledControls = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding-bottom: 2.5rem;

    h3 {
      padding-bottom: 1rem;
    }

    .buttons {
      display: flex;
    }

    button {
      position: relative;
      width: 4.4rem;
      height: 4.4rem;
      margin: 2px;
      border: 2px solid white;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: black;
      color: white;
      cursor: pointer;
      transition: all .3s ease;

      &:hover,
      &.active {
        background-color: white;
        color: black;
      }
    }
  `
