import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import { FullSection, StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { SocialShare } from '../SocialShare'
import { scrollToHashId } from '../../utilities/hash'

export const MakeARapGuide = () => {

  const [step, setStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    scrollToHashId()
  }, [])

  return (
    <Panels name="make-a-rap-guide" id="make-a-rap-guide">
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
              <h1>Step 1 - Choose a Topic</h1>
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
              <h1>Step 2 - Choose a Beat</h1>
              <p>Select a beat that suits the mood of the topic you plan to write about. Search "rap instrumentals" on YouTube, or choose a beat from one of the playlists below.</p>

              <p>
                <iframe title="Volume 1" style={{ border: 0, width: "100%", height: "42px" }} src="https://bandcamp.com/EmbeddedPlayer/album=896253204/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="http://litfuserecords.bandcamp.com/album/lit-fuse-instrumentals-vol-1">Lit Fuse Instrumentals Vol. 1 by Lit Fuse Records Artists</a></iframe>
                <iframe title="Volume 2" style={{ border: 0, width: "100%", height: "42px" }} src="https://bandcamp.com/EmbeddedPlayer/album=2311099027/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://litfuserecords.bandcamp.com/album/lit-fuse-instrumentals-vol-2">Lit Fuse Instrumentals Vol. 2 by Lit Fuse Records Artists</a></iframe>
                <iframe title="Volume 3" style={{ border: 0, width: "100%", height: "42px" }} src="https://bandcamp.com/EmbeddedPlayer/album=48768687/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://litfuserecords.bandcamp.com/album/lit-fuse-instrumentals-vol-3">Lit Fuse Instrumentals Vol. 3 by Lit Fuse Records Artists</a></iframe>
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
              <h1>Step 3 - Read and Take Notes</h1>
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
              <h1>Step 4 - Generate Rhymes</h1>
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
              <h1>Step 5 - Rhyming Patterns</h1>
              <p>Combine the rhymes that go with your favorite words or phrases from the list above. Try to rhyme multiple-stress patterns where possible, emphasizing vowel sounds more than consonant sounds and embracing “sound-alike” slant rhymes over perfect rhymes.</p>

              <h3>Example:</h3>

              <MediumSpace>
                <ul className="step5">
                  <li><span>Cell</span> <span>Division</span></li>
                  <li style={{ textIndent: "10px" }}><span>Tel</span>e<span>vision</span></li>
                  <li style={{ textIndent: "20px" }}><span>Hell</span>-a-<span>frickin’</span></li>
                  <li style={{ textIndent: "30px" }}><span>Real</span>ly <span>livin’</span></li>
                  <li style={{ textIndent: "40px" }}><span>Fail</span> the <span>mission</span></li>
                  <li style={{ textIndent: "50px" }}><span>El</span>ec<span>trician</span></li>
                  <li style={{ textIndent: "60px" }}><span>Skill</span> I’m <span>bringin’</span></li>
                  <li style={{ textIndent: "70px" }}><span>Feel</span> the <span>friction</span></li>
                </ul>
              </MediumSpace>

              <p>Hint: Use the <a href="https://rhymewave.com/" target="_blank" rel="noopener noreferrer">RhymeWave website</a> to generate interesting rhyming patterns.</p>

            </StyledContent>
          </FullSection>)}
        {step === 6 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step6"
            bgColor="black"
            color="white"
            className="centered">
            <StyledContent>
              <h1>Step 6 - Compose Bars</h1>

              <p>Arrange your favorite rhyming patterns into bars. Each bar – or line of the song – is four beats and usually the rhyme comes at the end of each bar, on the fourth beat, and lines are arranged into couplets, or two adjacent lines that rhyme with each other.</p>

              <p>However, feel free to play with internal rhyme, pauses, chiastic rhyme, and synchopation. The most important part is making sure the natural stresses of the words and phrases land on the beats.</p>

              <p>Verses usually consist of 16-32 bars, and songs usually have 2-3 verses separated by the hook.</p>

              <p><strong>Example couplet:</strong></p>

              <p>
                There’s <span className="red">hell</span>-a <span className="blue">tension</span> <strong>in</strong> the <span className="yellow">air – <strong>yeah</strong></span>, I can <span className="red">feel</span> the <span className="blue">friction</span>
                <br />
                <strong>Sep</strong>aration <strong>in</strong>to <span className="blue">different</span> <span className="red">selves</span>, this is <span className="red">cell</span> <span className="blue">division</span>
              </p>

            </StyledContent>
          </FullSection>)}
        {step === 7 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step7"
            bgColor="black"
            color="white"
            className="centered">
            <StyledContent>
              <h1>Step 7 - Compose the Hook</h1>

              <p>The “hook” or chorus is the heart of the song, the part that’s supposed to get stuck in your head on repeat and drive home the central message. If someone only hears ten seconds of the song, you want that to be the hook.</p>

              <p>Often the hook is the hardest part of a song to get right, but sometimes repeating a simple phrase again and again with slight variations in emphasis, such as “Sit down, be humble”, creates the strongest hook.</p>

              <p>Melodic hooks sung by vocalists can also bring the track to another level.</p>

              <p>Hint: If you aren’t sure about which words to use, search through all of your verse lyrics until you find the most memorable or evocative lines, and then build the hook around those lines</p>

            </StyledContent>
          </FullSection>)}
        {step === 8 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step8"
            bgColor="black"
            color="white"
            className="centered">
            <StyledContent>
              <h1>Step 8 - Rehearse and Revise</h1>

              <p>Practice your bars and hook! Play the beat again and again and say the words out loud, changing any words in the lyrics that sound awkward or off-beat. Try out synonyms and alternate phrasing to improve the flow, keep practicing until it sounds as good you want it to sound.</p>

              <p>Hint: Take a few minutes to listen to some mainstream rap songs on YouTube and try your bars out in the style of various rappers until you find a flow that fits what you’ve written.</p>
            </StyledContent>
          </FullSection>)}
        {step === 9 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step9"
            bgColor="black"
            color="white"
            className="centered">
            <StyledContent>
              <h1>Step 9 - Shoot Your Video</h1>

              <p>Once you like how the song is sounding, put the beat on a set of speakers in the background and film yourself on your phone rapping to the camera. If you’re working in a group, take turns delivering lines and try to get through the whole song without messing up any lines. Or if you’re creating solo, either memorize the song or put the lyrics up behind the camera so you can read while still looking at it, teleprompter-style.</p>

              <p>This is the “low budget” version of a music video, with the sound in the room being recorded through the camera audio, and no audio or video editing. With some practice to get the delivery right, it can look and sound excellent considering the time saved.</p>

              <p>Higher production value comes from recording the vocals separately using a studio mic and audio program such as Logic, GarageBand, or Pro Tools, and mixing the vocals so they balance with the beat. Then you can play the track with the mixed vocals when filming, and “lip sync” or rap along with the lines and film multiple takes, which then requires you to edit the video together to fit the track. Performing the rap in front of a green screen gives you the option to put any images you want in the background behind you.</p>

              <p>Make sure you lip sync right on time with the recorded track, or the video won’t look right.</p>
            </StyledContent>
          </FullSection>)}
        {step === 10 && (
          <FullSection
            initial={{ opacity: 0, right: 300 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, left: 100 }}
            transition={{
              opacity: { duration: .5 },
              x: { duration: 1 }
            }}
            key="step10"
            bgColor="black"
            color="white"
            className="centered">
            <StyledContent>
              <h1>Step 10 - Share Your Video</h1>

              <p>Whether you filmed it on your phone in one take or edited the sound and video in post-production, once you have a finished video you like, post it on social media and share your love for hip-hop music and the topic you rapped about.</p>

              <p>Send the link to us and we’ll post the best submissions on the home page of RapGuide.com.</p>
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
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "50px"
      }}>
        <SocialShare
          mode="dark"
          hashtag="MakeARapGuide"
          url="https://www.rapguide.com/lessons#make-a-rap-guide"
          title="Make a Rap Guide" />
      </div>
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

  .step5 li span:nth-child(1), .red {
    color: #DD3333;
  }
  .step5 li span:nth-child(2), .blue{
    color: #23A2D6;
  }
  .yellow {
    color: yellow;
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
