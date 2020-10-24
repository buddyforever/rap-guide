import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { MediumSpace } from "../../styles/PageStyles"

/*
*   Notes on Video Player
*   Can't seem to get the onReady or onStateChange events
*   to fire properly so right now it is just loading with
*   the videoUrl src
*/

const Video = ({ videoTitle, videoUrl, videoId = 'O2K0ptoYpuc', getPlayer }) => {

  const [player, setPlayer] = useState(null)

  const videoRef = useRef()

  function loadVideo() {
    if (!videoRef.current) {
      console.log("No Video")
      return
    }

    var playerEmbed;
    playerEmbed = new window.YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': (e) => console.log(e),
        'onStateChange': (e) => console.log(e)
      }
    });
    setPlayer(playerEmbed)
  }

  useEffect(() => {
    if (!window.YT) { // If not, load the script asynchronously
      loadYouTubEmbedAPI(loadVideo)
    } else {
      loadVideo()
    }
  }, [])

  return (
    <StyledVideo>
      <div className="video">
        <iframe title={videoTitle} width="100%" src={videoUrl} ref={videoRef} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </StyledVideo>
  )
}

export default Video

function loadYouTubEmbedAPI(callback) {

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';

  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = callback;
}

export const StyledVideo = styled.div`
  margin-bottom: 5rem;
  border-radius: 5px;
  background-color: black;
  box-shadow: 0 0 40px 0 rgba(0,0,0,0.1),
              0 0 20px 0 rgba(0,0,0,0.2),
              0 0 10px 0 rgba(0,0,0,0.2),
              0 0 5px 0 rgba(0,0,0,0.4);

  .video {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px; height: 0; overflow: hidden;
    background-color: black;
    border-radius: 5px;
  }

  .video iframe,
  .video object,
  .video embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
