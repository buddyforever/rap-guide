import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import styled from 'styled-components'

import { StyledContent, Heading, FullSection, MediumSpace, ThreeGrid } from '../../styles/PageStyles'
import Loader from '../Loader'

import { useQuery } from '@apollo/react-hooks'
import { GET_PLAYLIST_BY_SLUG } from '../../queries/playlist'

export const Playlist = () => {

  const [videos, setVideos] = useState([])

  let { slug } = useParams();

  const { loading, data } = useQuery(GET_PLAYLIST_BY_SLUG, {
    variables: {
      slug: slug
    }
  });

  useEffect(() => {
    if (data) {
      fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${data.playlist.playlistId}&part=snippet&key=AIzaSyD_b1o8tKgFuUlYJrzmrUI8lVEHk_2Sukk`)
        .then(response => response.json())
        .then(data => setVideos(data.items.map(video => ({
          title: video.snippet.title,
          videoId: video.snippet.resourceId.videoId
        }))))
    }
  }, [data])

  if (loading) return <Loader />
  const { playlist } = data
  return (
    <FullSection style={{ display: "flex", alignItems: "center" }}>
      <StyledContent style={{ width: "100%" }}>
        <Heading>
          <h1>{playlist.title}</h1>
        </Heading>
        <MediumSpace>
          <ThreeGrid>
            {videos.map(video => {
              return (
                <StyledYouTube key={video.videoId}>
                  <div className="youtube-container">
                    <iframe
                      title={video.title}
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      frameBorder='0'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h3>{video.title}</h3>
                </StyledYouTube>
              )
            })}
          </ThreeGrid>
        </MediumSpace>
      </StyledContent>
    </FullSection>
  )
}

export default Playlist;

const StyledYouTube = styled.div`
  .youtube-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }

  .youtube-container iframe,
  .youtube-container object,
  .youtube-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  h3 {
    font-size: 2.2rem;
    text-align: center;
  }
`