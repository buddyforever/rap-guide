import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Loader from '../Loader'

import { useQuery } from '@apollo/react-hooks'
import { GET_PLAYLISTS_FOR_FILTER } from '../../queries/playlist'

export const Filter = () => {

  const [playlists, setPlaylists] = useState([])

  const { loading, data } = useQuery(GET_PLAYLISTS_FOR_FILTER)

  useEffect(() => {
    if (!data) return
    setPlaylists(data.playlists)
  }, [data])

  if (loading) return <Loader />
  return (
    <StyledFilter>
      <p>Filter by Topic</p>
      <div className="filters">
        {data.playlists.map(playlist => (
          <Link to={`/playlist/${playlist.slug}`} className="link">
            {playlist.slug === "videos-by-baba-brinkman" ? "All" : playlist.title}
          </Link>
        ))}
      </div>
    </StyledFilter>
  )
}

const StyledFilter = styled.div`
  margin-bottom: 25px;

  .filters {
    display: flex;
    flex-flow: wrap;

    a {
      margin-top: 5px;
    }

    a + a {
      margin-left: 5px;
    }
  }


`