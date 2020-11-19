import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom'

import { StyledContent, Heading, FullSection, MediumSpace, ThreeGrid } from '../../styles/PageStyles'
import Loader from '../Loader'
import { DotWave } from '../ui/Loader'
import { Filter } from '../../components/Playlist/Filter'

import { useQuery } from '@apollo/react-hooks'
import { GET_PLAYLIST_BY_SLUG } from '../../queries/playlist'

export const Playlist = () => {

  const [videos, setVideos] = useState([])
  const [usedTokens, setUsedTokens] = useState([])
  const [nextPageToken, setNextPageToken] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  let { slug } = useParams();

  const { loading, data } = useQuery(GET_PLAYLIST_BY_SLUG, {
    variables: {
      slug: slug
    }
  });

  function checkLoadMore() {
    if (nextPageToken && !isFetching) {
      getVideos()
    } else {
      setIsLoaded(true)
    }
  }
  function getVideos() {
    if (usedTokens.includes(data.nextPageToken)) return
    setIsFetching(true)
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${data.playlist.playlistId}&part=snippet&pageToken=${nextPageToken}&maxResults=6&key=AIzaSyD_b1o8tKgFuUlYJrzmrUI8lVEHk_2Sukk`)
      .then(response => response.json())
      .then(data => {
        const newVideos = data.items.map(video => ({
          title: video.snippet.title,
          videoId: video.snippet.resourceId.videoId
        }))
        setNextPageToken(data.nextPageToken)
        setUsedTokens([
          data.nextPageToken,
          ...usedTokens
        ])
        setVideos([
          ...videos,
          ...newVideos
        ])
        setIsFetching(false)
        if (!data.nextPageToken || !data.nextPageToken.length) {
          setNextPageToken(null)
          setIsLoaded(true)
        }
      })
  }
  useEffect(() => {
    if (data) {
      getVideos()
    }
  }, [data])
  if (loading) return <Loader />
  const { playlist } = data
  return (
    <FullSection style={{ display: "flex", alignItems: "center" }}>
      <StyledContent style={{ width: "100%" }}>
        <Heading>
          <h1>{playlist.title}</h1>
          <h3>Please <Link to="/contact">contact</Link> us if you would like to build a lesson around one of these videos</h3>
        </Heading>
        {playlist.isShowFilter && <Filter />}
        <MediumSpace>
          <InfiniteScroll
            dataLength={videos.length}
            next={checkLoadMore}
            hasMore={!isLoaded}
            loader={<Loader />}
          >
            <ThreeGrid>
              {
                videos.map(video => (
                  <StyledYouTube key={video.videoId}>
                    <div className="youtube-container">
                      <div className="loading"><DotWave /></div>
                      <iframe
                        title={video.title}
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        frameBorder='0'
                        allowFullScreen
                      ></iframe>
                    </div>
                    <h3>{video.title}</h3>
                  </StyledYouTube>
                ))
              }
            </ThreeGrid>
          </InfiniteScroll>
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
    animation: fadeIn 3s linear forwards;

    .loading {
      padding-top: 25%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @keyframes fadeIn {
    0% {
      background-color: rgba(0,0,0,0);
    }
    100% {
      background-color: rgba(0,0,0,1);
    }
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